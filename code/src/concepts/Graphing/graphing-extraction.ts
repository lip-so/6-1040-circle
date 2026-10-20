import { readMemoryFields } from "../../memory-fields.ts";
import type { EntityKind, ExtractedClaim, ExtractedEntity, RelationKind } from "./graphing-text.ts";
export interface EncounterExtractor {
    extract(content: string): Promise<unknown>;
}
export const entityKinds = ["SELF", "PERSON", "ORGANIZATION", "TOPIC", "OPPORTUNITY"] as const satisfies readonly EntityKind[];
export const relationKinds = ["MET", "KNOWS", "MEMBER_OF", "WORKS_ON", "RESEARCHES", "INTERNED_AT", "OFFERS", "SOMETIMES_HOSTS", "BASED_IN", "DISCUSSED", "FOUNDED", "DESCRIBED_AS"] as const satisfies readonly RelationKind[];
export class InvalidExtraction extends Error {
    constructor() {
        super("The extracted graph could not be validated.");
    }
}
/** Contact is the last optional guided field. Keep it out of model input and evidence. */
export function extractionContent(content: string): string {
    return readMemoryFields(content) ? content.split(/\r?\nContact:/u)[0]! : content;
}
function record(value: unknown, keys: string[]): value is Record<string, unknown> {
    return typeof value === "object" && value !== null && !Array.isArray(value) &&
        Object.keys(value).length === keys.length && keys.every(key => Object.hasOwn(value, key));
}
function text(value: unknown, limit: number): value is string {
    return typeof value === "string" && value.trim().length > 0 && value.length <= limit;
}
function completeEvidence(content: string, quote: string): boolean {
    let start = content.indexOf(quote);
    while (start >= 0) {
        const before = content.slice(0, start), after = content.slice(start + quote.length);
        if ((start === 0 || /[.!?\n]\s*$/u.test(before)) &&
            (!after.trim() || /[.!?]$/u.test(quote) || /^[ \t]*(?:[.!?]|\r?\n)/u.test(after)))
            return true;
        start = content.indexOf(quote, start + 1);
    }
    return false;
}
/** Model output is untrusted. Validate the whole replacement before any database write. */
export function validateExtraction(value: unknown, content: string): {
    entities: ExtractedEntity[];
    claims: ExtractedClaim[];
} {
    if (!record(value, ["entities", "claims"]) || !Array.isArray(value.entities) || !Array.isArray(value.claims) ||
        value.entities.length > 64 || value.claims.length > 128)
        throw new InvalidExtraction();
    const entities: ExtractedEntity[] = [];
    const keys = new Map<string, ExtractedEntity>();
    for (const entry of value.entities) {
        if (!record(entry, ["key", "kind", "label"]) || !text(entry.key, 128) || !text(entry.label, 300) ||
            !entityKinds.includes(entry.kind as EntityKind) || keys.has(entry.key))
            throw new InvalidExtraction();
        const kind = entry.kind as EntityKind;
        if (entry.label !== entry.label.trim() ||
            (kind === "SELF" ? entry.label !== "You" : !content.includes(entry.label)))
            throw new InvalidExtraction();
        // Provider-chosen keys must not change persistent identities between retries.
        const entity = { key: `${kind}:${entry.label.toLowerCase()}`, kind, label: entry.label };
        if (entities.some(other => other.key === entity.key))
            throw new InvalidExtraction();
        entities.push(entity);
        keys.set(entry.key, entity);
    }
    if (entities.filter(entity => entity.kind === "SELF").length > 1)
        throw new InvalidExtraction();
    const claims: ExtractedClaim[] = [];
    for (const entry of value.claims) {
        if (!record(entry, ["from", "relation", "to", "quote"]) || !text(entry.from, 128) || !text(entry.to, 128) ||
            !relationKinds.includes(entry.relation as RelationKind) || !text(entry.quote, content.length) ||
            !completeEvidence(content, entry.quote))
            throw new InvalidExtraction();
        const from = keys.get(entry.from), to = keys.get(entry.to);
        if (!from || !to || from.key === to.key || !entry.quote.includes(to.label) ||
            /\b(?:not|never|no longer)\b|n['’]t\b/iu.test(entry.quote))
            throw new InvalidExtraction();
        if (from.kind === "PERSON" && !entry.quote.includes(from.label)) {
            const usedPeople = entities.filter(person => person.kind === "PERSON" && (value.claims as unknown[]).some((raw: unknown) => {
                if (!record(raw, ["from", "relation", "to", "quote"])) return false;
                return keys.get(raw.from as string)?.key === person.key || keys.get(raw.to as string)?.key === person.key;
            }));
            const metPeople = new Set((value.claims as unknown[]).flatMap((raw: unknown) => {
                if (!record(raw, ["from", "relation", "to", "quote"]) || raw.relation !== "MET") return [];
                const target = keys.get(raw.to as string); return target ? [target.key] : [];
            }));
            const clearEncounterPronoun = metPeople.size === 1 && metPeople.has(from.key) && /^(?:He|She|They|We|His|Her|Their)\b/u.test(entry.quote);
            if (usedPeople.some(person => person.key !== from.key && (entry.quote as string).includes(person.label)) ||
                (usedPeople.length > 1 && !clearEncounterPronoun)) throw new InvalidExtraction();
        }
        const relation = entry.relation as RelationKind;
        const validPair = relation === "MET" || relation === "KNOWS"
            ? (from.kind === "SELF" || (relation === "KNOWS" && from.kind === "PERSON")) && to.kind === "PERSON"
            : relation === "OFFERS" || relation === "SOMETIMES_HOSTS"
                ? (from.kind === "PERSON" || from.kind === "ORGANIZATION") && to.kind === "OPPORTUNITY"
                : relation === "MEMBER_OF" || relation === "INTERNED_AT" || relation === "FOUNDED"
                    ? from.kind === "PERSON" && to.kind === "ORGANIZATION"
                    : (from.kind === "PERSON" || from.kind === "ORGANIZATION") && to.kind === "TOPIC";
        if (!validPair)
            throw new InvalidExtraction();
        const claim = { from: from.key, relation, to: to.key, quote: entry.quote };
        if (!claims.some(other => JSON.stringify(other) === JSON.stringify(claim)))
            claims.push(claim);
    }
    // Unconnected labels must never become searchable facts.
    const used = new Set(claims.flatMap(claim => [claim.from, claim.to]));
    return { entities: entities.filter(entity => used.has(entity.key)), claims };
}
