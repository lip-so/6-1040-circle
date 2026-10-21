import { readMemoryFields } from "../../src/memory-fields.ts";
import { extractEncounter } from "./encounter-text.ts";
import type { ContactCard } from "../../src/providers/brain-provider.ts";

export interface MemoryDetail { label: string; value: string }

/** A display name must be explicit in the original; this fallback only formats older unorganized notes. */
export function memoryLabel(content: string): string {
  const guided = readMemoryFields(content)?.person;
  if (guided?.trim()) return guided.trim();
  const extracted = extractEncounter(content).entities.find(entity => entity.kind === "PERSON")?.label;
  if (extracted?.trim()) return extracted.trim();
  // Older free-form notes may start with a lowercase name. Stop before context,
  // punctuation or a role; do not use an arbitrary first line as a person's name.
  const introduction = /(?:^|[.!?\n])\s*(?:I\s+)?(?:met|spoke with|talked to|chatted with)\s+([\p{L}][\p{L}'’\-]*(?:[ \t]+[\p{L}][\p{L}'’\-]*){0,2}?)(?=[ \t]*(?:[,;:—–-]|[.!?\n]|$)|[ \t]+(?:on|at|during|who|is|was|works?|from)\b)/iu.exec(content)?.[1];
  if (introduction && !/^(?:a|an|the|someone|somebody|person|with)\b/iu.test(introduction)) return introduction;
  const direct = /^\s*([\p{L}][\p{L}’'\-]*(?:[ \t]+[\p{L}][\p{L}’'\-]*){0,2}?)\s+(?:who\s+)?(?:does|works?\s+(?:on|at)|talks?\s+about|researches)\b/iu.exec(content)?.[1];
  return direct && !/^(?:someone|somebody|a|an|the|he|she|they|we|i)$/iu.test(direct) ? direct : "Unnamed encounter";
}

/** Format supported facts from this original note; never infer a role from a discussion. */
export function memorySummary(content: string, name: string, card?: ContactCard | null): MemoryDetail[] {
  if (card) {
    const labels = { date: "When", context: "Context", role: "Does", discussion: "Discussed", contact: "Contact", offer: "Offers", other: "Note" };
    return card.facts.map(fact => ({ label: labels[fact.kind], value: fact.basis === "inferred" ? `May be: ${fact.value}` : fact.value }));
  }
  const guided = readMemoryFields(content);
  if (guided && guided.person === name) {
    const rows = [
      { label: "When", value: guided.when },
      { label: "Does", value: guided.does },
    ];
    if (guided.discussed) rows.push({ label: "Discussed", value: guided.discussed });
    if (guided.contact) rows.push({ label: "Contact", value: guided.contact });
    if (guided.notes) rows.push({ label: "Note", value: guided.notes });
    return rows.filter(row => row.value.trim());
  }
  const { entities, claims } = extractEncounter(content);
  const person = entities.find(entity => entity.kind === "PERSON" && entity.label === name);
  const labels = new Map(entities.map(entity => [entity.key, entity.label]));
  const personal = person ? claims.filter(claim => claim.from === person.key) : [];
  const roles = personal.flatMap(claim => {
    const topic = labels.get(claim.to);
    if (!topic) return [];
    switch (claim.relation) {
      case "FOUNDED": return [`Founder, ${topic}`];
      case "MEMBER_OF": {
        const role = /\b(researcher|engineer|student|PhD)\s+at\b/iu.exec(claim.quote)?.[1];
        return [role ? `${capitalized(role)}, ${topic}` : `Works at ${topic}`];
      }
      case "WORKS_ON": return [`Works on ${topic}`];
      case "RESEARCHES": return [`Researches ${topic}`];
      default: return [];
    }
  });
  const discussed = personal.filter(claim => claim.relation === "DISCUSSED")
    .map(claim => labels.get(claim.to)).filter((label): label is string => Boolean(label));
  const rows = [
    { label: "When", value: encounterWhen(content, name, claims.find(claim => claim.relation === "MET")?.quote ?? "") },
    { label: "Does", value: unique(roles).join("; ") },
  ];
  if (discussed.length) rows.push({ label: "Discussed", value: capitalized(unique(discussed).join(", ")) });
  const organizations = new Set(personal.filter(claim => claim.relation === "MEMBER_OF" || claim.relation === "FOUNDED").map(claim => claim.to));
  const offers = person ? claims.filter(claim => claim.relation === "OFFERS" && (claim.from === person.key || organizations.has(claim.from)))
    .map(claim => labels.get(claim.to)).filter((label): label is string => Boolean(label)) : [];
  if (offers.length) rows.push({ label: "Offers", value: capitalized(unique(offers).join(", ")) });
  return rows.filter(row => row.value.trim());
}

function unique(values: string[]): string[] { return [...new Set(values)]; }
function capitalized(text: string): string { return text.charAt(0).toUpperCase() + text.slice(1); }

function encounterWhen(content: string, name: string, meeting: string): string {
  // A labelled date/context is copied as written, without inventing a year or resolving relative time.
  const labelled = /(?:^|\n)\s*(?:when|date)\s*:\s*([^\n]+)/iu.exec(content)?.[1]?.trim();
  if (labelled) return labelled;
  const month = "(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\\.?";
  const day = "\\d{1,2}(?:st|nd|rd|th)?";
  const date = `(?:${month}\\s+${day}|${day}\\s+${month})(?:,?\\s+\\d{4})?|\\d{4}-\\d{2}-\\d{2}|today|yesterday`;
  // Only a date immediately after the person in the meeting statement counts.
  // A company founding date or future job start is not the encounter date.
  const afterName = meeting.slice(meeting.indexOf(name) + name.length);
  const recorded = new RegExp(`^\\s+(?:on\\s+)?(${date})(?=[,.;!?\\s]|$)`, "iu").exec(afterName)?.[1];
  return recorded ? capitalized(recorded) : "";
}
