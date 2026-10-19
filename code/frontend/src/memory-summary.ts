import { readMemoryFields } from "../../src/memory-fields.ts";
import { extractEncounter } from "../../src/concepts/graphing-text.ts";

export interface MemoryDetail { label: string; value: string }

/** Format supported facts from this original note; never infer a role from a discussion. */
export function memorySummary(content: string, name: string): MemoryDetail[] {
  const guided = readMemoryFields(content);
  if (guided && guided.person === name) {
    const rows = [
      { label: "When", value: guided.when || "Not recorded" },
      { label: "Does", value: guided.does || "Not recorded" },
    ];
    if (guided.discussed) rows.push({ label: "Discussed", value: guided.discussed });
    return rows;
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
    { label: "Does", value: unique(roles).join("; ") || "Not recorded" },
  ];
  if (discussed.length) rows.push({ label: "Discussed", value: capitalized(unique(discussed).join(", ")) });
  const organizations = new Set(personal.filter(claim => claim.relation === "MEMBER_OF" || claim.relation === "FOUNDED").map(claim => claim.to));
  const offers = person ? claims.filter(claim => claim.relation === "OFFERS" && (claim.from === person.key || organizations.has(claim.from)))
    .map(claim => labels.get(claim.to)).filter((label): label is string => Boolean(label)) : [];
  if (offers.length) rows.push({ label: "Offers", value: capitalized(unique(offers).join(", ")) });
  return rows;
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
  return recorded ? capitalized(recorded) : "Not recorded";
}
