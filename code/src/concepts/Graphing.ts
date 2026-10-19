import { createHash } from "node:crypto";
import { MongoServerError, type Collection, type Db } from "mongodb";
import { extractEncounter, isNegativeQuery, requiresOpening, subjectTerms, type EntityKind, type RelationKind } from "./graphing-text.ts";

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
}
interface SourceGraph {
  _id: string;
  owner: string;
  entities: Entity[];
  claims: Claim[];
}
interface Suggestion {
  target: string;
  label: string;
  source: string;
  reason: string;
}

export class EmptySourceContent extends Error {}
export class SourceNotOwned extends Error {}

function identity(...parts: string[]): string {
  return createHash("sha256").update(JSON.stringify(parts)).digest("hex");
}

export class GraphingConcept {
  private readonly sources: Collection<SourceGraph>;

  constructor(db: Db) {
    this.sources = db.collection<SourceGraph>("graphing.sources");
  }

  async ingest({ owner, source, content }: { owner: string; source: string; content: string }): Promise<Record<string, never>> {
    if (content.trim().length === 0) {
      throw new EmptySourceContent("Source content must not be blank.");
    }
    const extracted = extractEncounter(content);
    const ids = new Map(extracted.entities.map(entity => [entity.key, identity(owner, source, entity.key)]));
    const entities = extracted.entities.map(({ key, ...entity }) => ({ _id: ids.get(key)!, ...entity }));
    const claims = extracted.claims.map(claim => ({
      ...claim,
      _id: identity(owner, source, claim.from, claim.relation, claim.to, claim.quote),
      from: ids.get(claim.from)!,
      to: ids.get(claim.to)!,
    }));

    try {
      // One document makes ownership checking and replacement atomic on standalone MongoDB.
      await this.sources.updateOne(
        { _id: source, owner },
        { $set: { owner, entities, claims } },
        { upsert: true },
      );
    } catch (error) {
      if (error instanceof MongoServerError && error.code === 11000) {
        throw new SourceNotOwned("The source belongs to another user.");
      }
      throw error;
    }
    return {};
  }

  async _trace({ owner, description }: { owner: string; description: string }): Promise<Suggestion[]> {
    const terms = subjectTerms(description);
    const needsOpening = requiresOpening(description);
    if ((!terms.length && !needsOpening) || isNegativeQuery(description)) return [];

    const suggestions: Suggestion[] = [];
    for (const graph of await this.sources.find({ owner }).toArray()) {
      for (const person of graph.entities.filter(entity => entity.kind === "PERSON")) {
        const connected = new Set([person._id]);
        let changed = true;
        while (changed) {
          changed = false;
          for (const claim of graph.claims) {
            if (connected.has(claim.from) || connected.has(claim.to)) {
              for (const id of [claim.from, claim.to]) {
                if (!connected.has(id)) { connected.add(id); changed = true; }
              }
            }
          }
        }
        const claims = graph.claims.filter(claim => connected.has(claim.from) && connected.has(claim.to));
        const hiring = claims.some(claim => claim.relation === "OFFERS" && /\b(?:is|are)\s+hiring\b/iu.test(claim.quote));
        if (!claims.length || (needsOpening && !hiring)) continue;
        const entities = graph.entities.filter(entity => connected.has(entity._id) && entity.kind !== "SELF");
        const available = new Set(subjectTerms(entities.map(entity => entity.label).join(" ")));
        if (claims.some(claim => claim.relation === "RESEARCHES")) available.add("research");
        if (!terms.every(term => available.has(term))) continue;

        const relevant = entities.filter(entity => entity.kind !== "PERSON" &&
          (terms.length === 0 || subjectTerms(entity.label).some(term => terms.includes(term))));
        const labels = [...new Set(relevant.map(entity => entity.label))];
        const quotes = [...new Set(claims.filter(claim => relevant.some(entity =>
          entity._id === claim.from || entity._id === claim.to)).map(claim => claim.quote))];
        const explanation = labels.length
          ? `Your note connects ${person.label} with ${labels.join(", ")}.`
          : `Your note records an encounter with ${person.label}.`;
        const evidence = (quotes.length ? quotes : [claims[0]!.quote]).map(quote => `“${quote}”`).join(" ");
        const availability = /\b(?:job|jobs|work|role|roles|position|positions)\b/iu.test(description) && !hiring
          ? " Availability would need to be checked." : "";
        suggestions.push({ target: person._id, label: person.label, source: graph._id, reason: `${explanation} ${evidence}${availability}` });
      }
    }
    return suggestions.sort((a, b) => a.label.localeCompare(b.label, "en") || a.target.localeCompare(b.target) || a.source.localeCompare(b.source));
  }
}
