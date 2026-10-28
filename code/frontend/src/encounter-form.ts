import { formatMemoryDate, relativeDate, validMemoryDate } from "../../src/calendar.ts";
import type { ContactCard } from "../../src/providers/brain-provider.ts";
import { type MemoryFields, memoryContentLimit, memoryFieldsLength, readMemoryFields } from "../../src/memory-fields.ts";
export const emptyFields = (): MemoryFields => ({ person: "", when: "", does: "", discussed: "", contact: "", notes: "" });
export const editDateReviewMessage = "Review today/yesterday wording before saving. Replace dates with an explicit date (MM/DD/YYYY), or remove ambiguous wording from these fields. Keep the person's name in Person.";
export function editSizeMessage(fields: MemoryFields): string {
  const excess = memoryFieldsLength(fields) - memoryContentLimit;
  return excess > 0 ? `This form is ${excess.toLocaleString("en-US")} characters over the 20,000-character limit. Shorten it before saving. No text will be shortened automatically.` : "";
}
export interface RawEditReview {
  referenceDate: string;
  nameEvidence: { field: keyof MemoryFields; name: string; quote: string; ambiguous: boolean }[];
}
// Literal names, email addresses and URLs are identifiers, not date wording.
// Use the same recognizer for preparation and the save gate.
function dateWords(value: string, replace: (word: string, offset: number) => string): string {
  return value.replace(/(?:https?:\/\/|www\.)[^\s<>]+|[^\s<>@]+@[^\s<>@]+|\b(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}(?::\d+)?(?:[/?#][^\s<>]*)?|(\b(?:today|yesterday)\b)/giu, (match, word: string | undefined, offset: number) => word ? replace(word, offset) : match);
}
function occurrences(value: string, text: string): number[] {
  if (!text) return [];
  const found: number[] = [];
  for (let at = value.indexOf(text); at >= 0; at = value.indexOf(text, at + 1)) found.push(at);
  return found;
}
function nameSpans(quote: string, name: string): { start: number; end: number }[] {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&");
  const pattern = new RegExp(`(?<![\\p{L}\\p{N}_])${escaped}(?![\\p{L}\\p{N}_])`, "giu");
  return [...quote.matchAll(pattern)].map(match => ({ start: match.index!, end: match.index! + match[0].length }));
}
/** Exempt only the evidenced occurrence in its original allocated field. */
function nameAt(value: string, field: string, offset: number, review?: RawEditReview): "literal" | "ambiguous" | undefined {
  for (const evidence of review?.nameEvidence ?? []) {
    if (evidence.field !== field) continue;
    const quotes = occurrences(value, evidence.quote), names = nameSpans(evidence.quote, evidence.name);
    if (quotes.some(at => names.some(span => offset >= at + span.start && offset < at + span.end))) {
      return !evidence.ambiguous && quotes.length === 1 && names.length === 1 ? "literal" : "ambiguous";
    }
  }
}
export function hasRelativeEditDate(fields: MemoryFields, review?: RawEditReview | null): boolean {
  // Ordinary guided fields are already authored/reviewed, including after reload.
  if (review === null) return false;
  return Object.entries(fields).some(([key, value]) => {
    if (key === "person") return false;
    let found = false;
    dateWords(value ?? "", (word, offset) => { if (nameAt(value ?? "", key, offset, review) !== "literal") found = true; return word; });
    return found;
  });
}
export interface PreparedEncounter { fields: MemoryFields; grouped: boolean; dateReview: boolean; rawReview: RawEditReview | null }

function cardDate(card: ContactCard): string {
  const date = formatMemoryDate(card.facts.find(f => f.kind === "date" && f.basis !== "inferred")?.value ?? "");
  return validMemoryDate(date) ? date : "";
}

/** Resolve only the supported words, after quote matching against unchanged source. */
function stabilizeText(value: string, key: keyof MemoryFields, referenceDate: string, review?: RawEditReview): string {
  return dateWords(value, (word, offset) => {
    // Ambiguous candidate names remain visible for explicit correction too.
    if (nameAt(value, key, offset, review)) return word;
    const resolved = relativeDate(word, referenceDate);
    const date = formatMemoryDate(resolved ?? "");
    return validMemoryDate(date) ? date : word;
  });
}
function stabilizeDates(fields: MemoryFields, referenceDate: string, review?: RawEditReview): MemoryFields {
  const stable = { ...fields };
  for (const key of Object.keys(stable) as (keyof MemoryFields)[]) {
    if (key === "person") continue;
    stable[key] = stabilizeText(stable[key] ?? "", key, referenceDate, review);
  }
  return stable;
}

/** Match an exact quote once; repeated evidence cannot safely choose source lines. */
function quoteRange(content: string, quote: string): [number, number] | undefined {
  if (!quote) return;
  const start = content.indexOf(quote);
  if (start < 0 || content.indexOf(quote, start + 1) >= 0) return;
  return [content.slice(0, start).split("\n").length - 1, content.slice(0, start + quote.length - 1).split("\n").length - 1];
}

function rawFields(card: ContactCard, content: string): MemoryFields {
  const fields = emptyFields();
  // Adapt only an evidenced literal name and a precise stated date. Source lines
  // remain intact in their allocated field, including the surrounding context.
  fields.person = card.name && card.nameQuote && content.includes(card.nameQuote) && card.nameQuote.toLocaleLowerCase("en").includes(card.name.toLocaleLowerCase("en")) ? card.name : "";
  fields.when = cardDate(card);
  const evidence = [...card.facts.map(fact => ({ kind: fact.kind, range: quoteRange(content, fact.quote) })), ...(card.nameQuote ? [{ kind: "name" as const, range: quoteRange(content, card.nameQuote) }] : [])];
  const activities = evidence.filter(fact => fact.kind === "role");
  if (!activities.length || activities.some(fact => !fact.range)) {
    fields.does = content;
    return fields;
  }

  const lines = content.split("\n");
  const parents = lines.map((_, index) => index);
  const root = (index: number): number => {
    while (parents[index] !== index) index = parents[index]!;
    return index;
  };
  // A cross-line quote joins complete lines; overlapping ranges join transitively.
  for (const { range } of evidence) {
    if (range) for (let index = range[0] + 1; index <= range[1]; index++) parents[root(index)] = root(range[0]);
  }
  const groups = new Map<number, { lines: string[]; kinds: Set<string> }>();
  lines.forEach((line, index) => {
    const id = root(index);
    if (!groups.has(id)) groups.set(id, { lines: [], kinds: new Set() });
    groups.get(id)!.lines.push(line);
  });
  for (const { kind, range } of evidence) if (range) groups.get(root(range[0]))!.kinds.add(kind);
  const allocated = { does: [] as string[], discussed: [] as string[], contact: [] as string[], notes: [] as string[] };
  for (const group of groups.values()) {
    const key = group.kinds.has("role") ? "does" : group.kinds.has("discussion") ? "discussed" : group.kinds.has("contact") ? "contact" : "notes";
    allocated[key].push(group.lines.join("\n"));
  }
  return { ...fields, ...Object.fromEntries(Object.entries(allocated).map(([key, groups]) => [key, groups.join("\n")])) };
}

/** Current guided fields are authoritative; raw source is allocated exactly once. */
export function prepareEncounterEdit(card: ContactCard, content: string, referenceDate = ""): PreparedEncounter {
  const recorded = readMemoryFields(content);
  if (!recorded) {
    const allocated = rawFields(card, content);
    const originalReview: RawEditReview = { referenceDate, nameEvidence: [] };
    if (card.name && card.nameQuote && content.includes(card.nameQuote)) {
      const name = card.name, quote = card.nameQuote;
      for (const key of Object.keys(allocated) as (keyof MemoryFields)[]) {
        if (key !== "person" && key !== "when" && allocated[key]?.includes(quote)) {
          originalReview.nameEvidence.push({ field: key, name, quote, ambiguous: occurrences(content, quote).length !== 1 || nameSpans(quote, name).length !== 1 });
        }
      }
    }
    const fields = stabilizeDates(allocated, referenceDate, originalReview);
    const rawReview: RawEditReview = { referenceDate, nameEvidence: originalReview.nameEvidence.map(evidence => ({ ...evidence, quote: stabilizeText(evidence.quote, evidence.field, referenceDate, originalReview) })) };
    return { fields, grouped: true, dateReview: hasRelativeEditDate(fields, rawReview), rawReview };
  }
  const fields = { ...emptyFields(), ...recorded };
  // Keep the existing legacy When/date adaptation; other guided values remain
  // authoritative and are never scanned as a fresh raw conversion.
  fields.when = stabilizeText(fields.when, "when", referenceDate);
  if (recorded && fields.when) {
    const date = formatMemoryDate(fields.when);
    if (validMemoryDate(date)) fields.when = date;
    else {
      fields.notes = [fields.notes, fields.when].filter(value => value !== "").join("\n");
      fields.when = cardDate(card);
    }
  }
  return { fields, grouped: false, dateReview: false, rawReview: null };
}

/** Compatibility for callers that need only the six reviewed values. */
export function fieldsFromCard(card: ContactCard, content: string, referenceDate = ""): MemoryFields {
  return prepareEncounterEdit(card, content, referenceDate).fields;
}
