import { createHash } from "node:crypto";
import { MongoServerError, type Collection, type Db } from "mongodb";
import { extractEncounter, isNegativeQuery, requiresOpening, subjectTerms, type EntityKind, type RelationKind } from "./graphing-text.ts";
import { extractionContent, validateExtraction, type EncounterExtractor } from "./graphing-extraction.ts";
interface Entity {
    _id: string;
    kind: EntityKind;
    label: string;
}
interface Claim {
    _id: string;
    from: string;
    relation: RelationKind;
    to: string;
    quote: string;
    usable?: boolean;
}
interface SourceGraph {
    _id: string;
    owner: string;
    entities: Entity[];
    claims: Claim[];
    contentDigest?: string;
    sourceRevision?: number;
    observedAt?: Date;
    retracted?: boolean;
}
interface Suggestion {
    target: string;
    label: string;
    source: string;
    evidence: string[];
    reason: string;
    gaps: string[];
}
export class EmptySourceContent extends Error {
}
export class SourceNotOwned extends Error {
}
export class SourceRetracted extends Error {
}
export class StaleSourceRevision extends Error {
}
export class ClaimRejectionUnavailable extends Error {
}
export class ClaimRestoreUnavailable extends Error {
}
export class RetractNotOwned extends Error {
}
function identity(...parts: string[]): string {
    return createHash("sha256").update(JSON.stringify(parts)).digest("hex");
}
function distinctiveOrganization(label: string): boolean {
    const normalized = label.trim();
    return !/^(?:the\s+)?(?:a\s+|an\s+)?(?:lab|laboratory|startup|company|group|university|institute|research lab|robotics lab|ai lab|ai-chip startup|robotics startup)$/iu.test(normalized) && (/^[A-Z]{2,8}$/u.test(normalized) || /[A-Z][a-z]+/u.test(normalized));
}
function checkVersion(row: SourceGraph | null, owner: string, revision: number) {
    if (row && row.owner !== owner)
        throw new SourceNotOwned();
    if (row?.retracted)
        throw new SourceRetracted();
    if ((row?.sourceRevision ?? 0) > revision)
        throw new StaleSourceRevision();
}
export class GraphingConcept {
    private readonly sources: Collection<SourceGraph>;
    constructor(db: Db, private readonly extractor?: EncounterExtractor) {
        this.sources = db.collection<SourceGraph>("graphing.sources");
    }
    async ingest({ owner, source, content, observedAt, sourceRevision = 0 }: {
        owner: string;
        source: string;
        content: string;
        observedAt?: Date;
        sourceRevision?: number;
    }): Promise<Record<string, never>> {
        if (!content.trim())
            throw new EmptySourceContent();
        const before = await this.sources.findOne({ _id: source });
        checkVersion(before, owner, sourceRevision);
        const input = extractionContent(content);
        const extracted = validateExtraction(this.extractor ? await this.extractor.extract(input) : extractEncounter(input), input);
        if (/\b(?:not|no longer|never)\s+(?:currently\s+)?hiring\b/iu.test(input))
            extracted.claims = extracted.claims.filter(c => c.relation !== "OFFERS");
        const ids = new Map(extracted.entities.map(entity => [entity.key, identity(owner, ...(entity.kind === "TOPIC" || (entity.kind === "ORGANIZATION" && distinctiveOrganization(entity.label)) ? [entity.kind, entity.label.normalize("NFKC").trim().toLocaleLowerCase("en").replace(/\s+/gu, " ")] : [source, entity.key]))]));
        const entities = extracted.entities.map(({ key, ...entity }) => ({ _id: ids.get(key)!, ...entity }));
        const claims = extracted.claims.map(claim => ({ ...claim, _id: identity(owner, source, claim.from, claim.relation, claim.to, claim.quote), from: ids.get(claim.from)!, to: ids.get(claim.to)!, usable: true }));
        try {
            await this.sources.updateOne({ _id: source, owner, retracted: { $ne: true }, $or: [{ sourceRevision: { $lte: sourceRevision } }, { sourceRevision: { $exists: false } }] }, { $set: { owner, entities, claims, contentDigest: createHash("sha256").update(content).digest("hex"), sourceRevision, ...(observedAt ? { observedAt: new Date(observedAt) } : {}) }, $setOnInsert: { retracted: false } }, { upsert: true });
        }
        catch (error) {
            if (!(error instanceof MongoServerError) || error.code !== 11000)
                throw error;
            checkVersion(await this.sources.findOne({ _id: source }), owner, sourceRevision);
            throw error;
        }
        return {};
    }
    async reject({ owner, claim }: {
        owner: string;
        claim: string;
    }): Promise<Record<string, never>> {
        const result = await this.sources.updateOne({ owner, "claims._id": claim }, { $set: { "claims.$.usable": false } });
        if (!result.matchedCount)
            throw new ClaimRejectionUnavailable();
        return {};
    }
    async restore({ owner, claim }: {
        owner: string;
        claim: string;
    }): Promise<Record<string, never>> {
        const result = await this.sources.updateOne({ owner, "claims._id": claim }, { $set: { "claims.$.usable": true } });
        if (!result.matchedCount)
            throw new ClaimRestoreUnavailable();
        return {};
    }
    async remove({ owner, claim }: {
        owner: string;
        claim: string;
    }): Promise<Record<string, never>> {
        await this.sources.updateOne({ owner, "claims._id": claim }, { $pull: { claims: { _id: claim } } });
        return {};
    }
    async retract({ owner, source }: {
        owner: string;
        source: string;
    }): Promise<Record<string, never>> {
        try {
            await this.sources.updateOne({ _id: source, owner }, { $set: { owner, retracted: true, claims: [], entities: [] }, $unset: { contentDigest: "", observedAt: "" } }, { upsert: true });
        }
        catch (error) {
            if (error instanceof MongoServerError && error.code === 11000)
                throw new RetractNotOwned();
            throw error;
        }
        return {};
    }
    async _members({ owner, evidence }: {
        owner: string;
        evidence: string[];
    }): Promise<{
        claim: string;
    }[]> {
        // Enumeration reveals only supplied identities, independent of stored ownership.
        void owner;
        return [...new Set(evidence)].sort().map(claim => ({ claim }));
    }
    async _source({ owner, source }: {
        owner: string;
        source: string;
    }): Promise<{
        contentDigest: string;
    }[]> {
        const row = await this.sources.findOne({ _id: source, owner, retracted: { $ne: true } });
        return row?.contentDigest ? [{ contentDigest: row.contentDigest }] : [];
    }
    async _entity({ owner, entity }: {
        owner: string;
        entity: string;
    }): Promise<{
        label: string;
        kind: EntityKind;
    }[]> {
        const rows = await this.sources.find({ owner, retracted: { $ne: true }, "entities._id": entity }).sort({ _id: 1 }).toArray();
        const row = rows.flatMap(source => source.entities).find(row => row._id === entity);
        return row ? [{ label: row.label, kind: row.kind }] : [];
    }
    async _claims({ owner, source }: {
        owner: string;
        source: string;
    }): Promise<{
        claim: string;
        fromLabel: string;
        relation: RelationKind;
        toLabel: string;
        quote: string;
        usable: boolean;
    }[]> {
        const row = await this.sources.findOne({ _id: source, owner, retracted: { $ne: true } });
        if (!row?.contentDigest)
            return [];
        return row.claims.slice().sort((a, b) => a._id.localeCompare(b._id)).flatMap(claim => {
            const from = row.entities.find(e => e._id === claim.from), to = row.entities.find(e => e._id === claim.to);
            return from && to ? [{ claim: claim._id, fromLabel: from.label, relation: claim.relation, toLabel: to.label, quote: claim.quote, usable: claim.usable !== false }] : [];
        });
    }
    async _evidence({ owner, claim }: {
        owner: string;
        claim: string;
    }): Promise<{
        source: string;
        quote: string;
        contentDigest: string;
    }[]> {
        const row = await this.sources.findOne({ owner, retracted: { $ne: true }, "claims._id": claim });
        const evidence = row?.claims.find(c => c._id === claim && c.usable !== false);
        return row?.contentDigest && evidence && row.entities.some(e => e._id === evidence.from) && row.entities.some(e => e._id === evidence.to) ? [{ source: row._id, quote: evidence.quote, contentDigest: row.contentDigest }] : [];
    }
    async _trace({ owner, description }: {
        owner: string;
        description: string;
    }): Promise<Suggestion[]> {
        const terms = subjectTerms(description), needsOpening = requiresOpening(description);
        if ((!terms.length && !needsOpening) || isNegativeQuery(description))
            return [];
        const graphs = (await this.sources.find({ owner, retracted: { $ne: true }, contentDigest: { $exists: true } }).toArray()).filter(g => g.contentDigest);
        const entities = new Map(graphs.flatMap(g => g.entities.map(e => [e._id, e] as const)));
        const claims = graphs.flatMap(g => g.claims.filter(c => c.usable !== false).map(c => ({ ...c, source: g._id, time: g.observedAt?.getTime() ?? -Infinity }))).sort((a, b) => a._id.localeCompare(b._id));
        type Edge = typeof claims[number];
        const outgoing = new Map<string, Edge[]>();
        for (const c of claims) {
            const list = outgoing.get(c.from) ?? [];
            list.push(c);
            outgoing.set(c.from, list);
        }
        const acquaintance = new Map<string, Edge[]>();
        const queue: {
            id: string;
            path: Edge[];
        }[] = graphs.flatMap(g => g.entities.filter(e => e.kind === "SELF").map(e => ({ id: e._id, path: [] })));
        for (let index = 0; index < queue.length && index < 512; index++) {
            const current = queue[index]!;
            if (current.path.length >= 4)
                continue;
            for (const c of outgoing.get(current.id) ?? []) {
                if (c.relation !== "MET" && c.relation !== "KNOWS")
                    continue;
                if (entities.get(c.to)?.kind !== "PERSON" || acquaintance.has(c.to))
                    continue;
                const path = [...current.path, c];
                acquaintance.set(c.to, path);
                queue.push({ id: c.to, path });
            }
        }
        const matches: (Suggestion & {
            hops: number;
            time: number;
        })[] = [];
        for (const [target, path] of acquaintance) {
            const person = entities.get(target)!;
            const support: Edge[] = [];
            const labels: string[] = [];
            const facts = new Set<string>();
            const hiringProof: Edge[] = [];
            const nameTerms = subjectTerms(person.label);
            if (terms.every(t => nameTerms.includes(t))) {
                path.forEach(c => support.push(c));
                nameTerms.forEach(t => facts.add(t));
                labels.push(person.label);
            }
            let hiring = false;
            let discussed = false;
            const routes: {
                id: string;
                path: Edge[];
            }[] = [{ id: target, path: [] }];
            const visited = new Set<string>();
            for (let i = 0; i < routes.length && i < 128; i++) {
                const route = routes[i]!;
                if (visited.has(route.id) || route.path.length > 3)
                    continue;
                visited.add(route.id);
                for (const c of outgoing.get(route.id) ?? []) {
                    if (c.relation === "MET" || c.relation === "KNOWS")
                        continue;
                    const to = entities.get(c.to);
                    if (!to || to.kind === "PERSON" || to.kind === "SELF")
                        continue;
                    const routeClaims = [...route.path, c];
                    const available = subjectTerms(to.label);
                    if (c.relation === "RESEARCHES")
                        available.push("research");
                    if (c.relation === "OFFERS" && /\b(?:is|are)\s+hiring\b/iu.test(c.quote)) {
                        hiring = true;
                        hiringProof.push(...routeClaims);
                    }
                    if (available.some(t => terms.includes(t)) || (!terms.length && c.relation === "OFFERS")) {
                        available.forEach(t => facts.add(t));
                        support.push(...routeClaims);
                        labels.push(to.label);
                        if (c.relation === "DISCUSSED")
                            discussed = true;
                    }
                    if (to.kind === "ORGANIZATION")
                        routes.push({ id: to._id, path: routeClaims });
                }
            }
            if (!terms.every(term => facts.has(term)) || !support.length || (needsOpening && !hiring))
                continue;
            const all = [...new Map([...path, ...support, ...(needsOpening ? hiringProof : [])].map(c => [c._id, c])).values()];
            const gaps: string[] = [];
            if (!hiring && /\b(?:job|jobs|work|role|roles|position|positions|internship|research|urop)\b/iu.test(description))
                gaps.push("Availability would need to be checked.");
            if (discussed)
                gaps.push("Discussion does not establish expertise.");
            if (path.length > 1)
                gaps.push("An introduction would need to be requested.");
            const source = path[path.length - 1]!.source;
            const explanation = `Your notes connect ${person.label} with ${[...new Set(labels)].join(", ")}.`;
            matches.push({ target, label: person.label, source, evidence: all.map(c => c._id), reason: `${explanation} ${[...new Set(support.map(c => c.quote))].map(q => `“${q}”`).join(" ")}${gaps.length ? " " + gaps.join(" ") : ""}`, gaps, hops: path.length, time: Math.max(...all.map(c => c.time)) });
        }
        return matches.sort((a, b) => a.gaps.length - b.gaps.length || a.hops - b.hops || ((a.time === b.time) ? 0 : b.time - a.time) || a.label.localeCompare(b.label, "en") || a.target.localeCompare(b.target)).slice(0, 5).map(({ hops, time, ...row }) => row);
    }
}
