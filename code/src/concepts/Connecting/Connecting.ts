import { createHash } from "node:crypto";
import type { Collection, Db } from "mongodb";
import { localRecommendationPolicy, serializedPolicyInput, type RecommendationPolicy } from "./recommendation-policy.ts";
interface Connection { _id: string; owner: string; need: string; target: string; evidence: string[]; reason: string; gaps: string[]; eligible: boolean; }
interface Exclusion { _id: string; owner: string; target: string; explanation: string; }
export class EmptyEvidence extends Error {}
export class EmptyReason extends Error {}
export class EmptySearchDescription extends Error {}
export class ExcludeUnavailable extends Error {}
export class ExcludeIneligible extends Error {}
export class ExcludeReasonTooLong extends Error {}
export class ConnectingConcept {
    private readonly connections: Collection<Connection>;
    private readonly exclusions: Collection<Exclusion>;
    constructor(db: Db, private readonly policy: RecommendationPolicy = localRecommendationPolicy) {
        this.connections = db.collection<Connection>("connecting.connections");
        this.exclusions = db.collection<Exclusion>("connecting.exclusions");
    }
    async reset({ owner, need }: { owner: string; need: string }): Promise<Record<string, never>> {
        await this.connections.updateMany({ owner, need }, { $set: { eligible: false } }); return {};
    }
    async offer({ owner, need, target, description, evidence, reason, gaps }: { owner: string; need: string; target: string; description: string; evidence: string[]; reason: string; gaps: string[] }): Promise<Record<string, never>> {
        if (!evidence.length) throw new EmptyEvidence();
        if (!reason.trim()) throw new EmptyReason();
        if (!description.trim()) throw new EmptySearchDescription();
        if ((await this._excluded({ owner, target })).length) return {};
        const input = { description, target, reason, gaps: [...new Set(gaps)], exclusions: await this._exclusions({ owner }) };
        serializedPolicyInput(input);
        if (!await this.policy.recommend(input) || (await this._excluded({ owner, target })).length) return {};
        const _id = createHash("sha256").update(JSON.stringify([owner, need, target])).digest("hex");
        await this.connections.updateOne({ _id, owner }, { $set: { evidence: [...new Set(evidence)], reason, gaps: [...new Set(gaps)], eligible: true }, $setOnInsert: { owner, need, target } }, { upsert: true });
        return {};
    }
    async exclude({ owner, connection, explanation }: { owner: string; connection: string; explanation: string }): Promise<Record<string, never>> {
        const row = await this.connections.findOne({ _id: connection, owner });
        if (!row) throw new ExcludeUnavailable();
        if (!row.eligible) throw new ExcludeIneligible();
        if (explanation.length > 1000) throw new ExcludeReasonTooLong();
        const _id = createHash("sha256").update(JSON.stringify([owner, row.target])).digest("hex");
        await this.exclusions.updateOne({ _id, owner }, { $set: { explanation }, $setOnInsert: { owner, target: row.target } }, { upsert: true }); return {};
    }
    async clear({ owner, need }: { owner: string; need: string }): Promise<Record<string, never>> { await this.connections.deleteMany({ owner, need }); return {}; }
    async _suggestions({ owner }: { owner: string }): Promise<{ connection: string; target: string; need: string; evidence: string[]; reason: string; gaps: string[] }[]> {
        const excluded = (await this._exclusions({ owner })).map(row => row.target);
        return (await this.connections.find({ owner, eligible: true, target: { $nin: excluded } }).sort({ need: 1, _id: 1 }).toArray()).map(({ _id, target, need, evidence, reason, gaps }) => ({ connection: _id, target, need, evidence, reason, gaps }));
    }
    async _get({ owner, connection }: { owner: string; connection: string }): Promise<{ target: string; need: string; evidence: string[]; reason: string; gaps: string[]; eligible: boolean }[]> {
        const row = await this.connections.findOne({ _id: connection, owner });
        return row && !(await this._excluded({ owner, target: row.target })).length ? [{ target: row.target, need: row.need, evidence: row.evidence, reason: row.reason, gaps: row.gaps, eligible: row.eligible }] : [];
    }
    async _excluded({ owner, target }: { owner: string; target: string }): Promise<{ target: string; explanation: string }[]> {
        const row = await this.exclusions.findOne({ owner, target }); return row ? [{ target: row.target, explanation: row.explanation }] : [];
    }
    async _exclusions({ owner }: { owner: string }): Promise<{ target: string; explanation: string }[]> {
        return (await this.exclusions.find({ owner }).sort({ target: 1 }).toArray()).map(({ target, explanation }) => ({ target, explanation }));
    }
}
