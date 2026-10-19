import { readMemoryFields } from "../memory-fields.ts";

export type EntityKind = "SELF" | "PERSON" | "ORGANIZATION" | "TOPIC" | "OPPORTUNITY";
export type RelationKind = "MET" | "KNOWS" | "MEMBER_OF" | "WORKS_ON" | "RESEARCHES" | "INTERNED_AT" | "OFFERS" | "SOMETIMES_HOSTS" | "BASED_IN" | "DISCUSSED" | "FOUNDED" | "DESCRIBED_AS";

export interface ExtractedEntity {
  key: string;
  kind: EntityKind;
  label: string;
}

export interface ExtractedClaim {
  from: string;
  relation: RelationKind;
  to: string;
  quote: string;
}

const namePattern = String.raw`[\p{Lu}][\p{L}'’\-]*(?:\s+[\p{Lu}][\p{L}'’\-]*){0,2}`;
const nameAtStart = new RegExp(`^(${namePattern})`, "u");
const negative = /\b(?:not|never|no longer)\b|n['’]t\b/iu;

function cleanLabel(text: string): string {
  return text.split(/[,;]|\s+and\s+(?=(?:is|are|works?|researches|studies)\b)/iu)[0]!
    .replace(/^(?:a|an|the)\s+/iu, "").replace(/[.!?]+$/u, "").trim();
}

export function extractEncounter(content: string): { entities: ExtractedEntity[]; claims: ExtractedClaim[] } {
  const guided = readMemoryFields(content);
  if (guided) {
    const person = { key: `PERSON:${guided.person.toLowerCase()}`, kind: "PERSON" as const, label: guided.person };
    const self = { key: "SELF:you", kind: "SELF" as const, label: "You" };
    const entities: ExtractedEntity[] = [self, person];
    const claims: ExtractedClaim[] = [{ from: self.key, relation: "MET", to: person.key, quote: content }];
    // These are explicit user fields, not roles inferred from a discussion.
    for (const [relation, label] of [["DESCRIBED_AS", guided.does], ["DISCUSSED", guided.discussed]] as const) {
      if (!label.trim() || negative.test(label)) continue;
      const key = `TOPIC:${label.toLowerCase()}`;
      if (!entities.some(entity => entity.key === key)) entities.push({ key, kind: "TOPIC", label });
      claims.push({ from: person.key, relation, to: key, quote: content });
    }
    const opening = !negative.test(guided.does) && /\b(?:is|are)\s+hiring\s+(.+)/iu.exec(guided.does)?.[1];
    if (opening) {
      const label = cleanLabel(opening);
      if (label) {
        const key = `OPPORTUNITY:${label.toLowerCase()}`;
        entities.push({ key, kind: "OPPORTUNITY", label });
        claims.push({ from: person.key, relation: "OFFERS", to: key, quote: content });
      }
    }
    return { entities, claims };
  }

  const entities = new Map<string, ExtractedEntity>();
  const claims: ExtractedClaim[] = [];
  const sentences = (content.match(/[^.!?\n]+(?:[.!?]+|(?=\n|$))/gu) ?? []).map(text => text.trim());
  const intro = /(?:^|[.!?\n])\s*(?:I\s+)?(?:met|spoke with|talked to|chatted with)\s+/iu.exec(content);
  const remaining = intro ? content.slice(intro.index + intro[0].length) : content.trim();
  const name = nameAtStart.exec(remaining)?.[1];
  const profile = name && /^(?:,|\s+is\b)/u.test(remaining.slice(name.length));
  const secondPerson = name && /^\s+and\s+/iu.exec(remaining.slice(name.length));
  if (!name || (!intro && !profile) || (secondPerson && nameAtStart.test(remaining.slice(name.length + secondPerson[0].length)))) {
    return { entities: [], claims: [] };
  }

  function entity(kind: EntityKind, label: string): string {
    const key = `${kind}:${label.toLowerCase()}`;
    entities.set(key, { key, kind, label });
    return key;
  }
  function claim(from: string, relation: RelationKind, to: string, quote: string): void {
    if (!claims.some(c => c.from === from && c.relation === relation && c.to === to && c.quote === quote)) {
      claims.push({ from, relation, to, quote });
    }
  }

  const person = entity("PERSON", name);
  const first = sentences.find(sentence => sentence.includes(name));
  if (intro && first) claim(entity("SELF", "You"), "MET", person, first);
  let organization: string | undefined;

  for (const sentence of sentences) {
    const personal = sentence === first || sentence.startsWith(name) || /^(?:he|she|they|we|his|her|their|talked|spoke|chatted|discussed)\b/iu.test(sentence);
    const organizational = organization !== undefined && /^(?:the\s+)?(?:company|startup|lab)\b/iu.test(sentence);
    if ((!personal && !organizational) || negative.test(sentence)) continue;

    const founder = /\b(?:co-founder|cofounder|founder)\s+(?:of|at)\s+(.+)/iu.exec(sentence);
    const affiliation = founder
      ?? /\bwork(?:s|ing)?\s+(?:at|for)\s+(.+)/iu.exec(sentence)
      ?? /\b(?:researcher|engineer|student|PhD)\s+at\s+(.+)/u.exec(sentence);
    if (affiliation?.[1]) {
      const label = cleanLabel(affiliation[1]);
      if (label) {
        organization = entity("ORGANIZATION", label);
        claim(person, founder ? "FOUNDED" : "MEMBER_OF", organization, sentence);
      }
    }

    const topics: [RelationKind, RegExpExecArray | null][] = [
      ["DISCUSSED", /\b(?:talked|spoke|chatted)\s+about\s+(.+)|\bdiscussed\s+(.+)/iu.exec(sentence)],
      ["WORKS_ON", /\bwork(?:s|ing)?\s+on\s+(.+)/iu.exec(sentence)],
      ["RESEARCHES", /\b(?:research|researches|researching|studies|studying)\s+(.+)/iu.exec(sentence)],
    ];
    for (const [relation, match] of topics) {
      const text = match?.[1] ?? match?.[2];
      if (!text || /^(?:is|are|was|were)\b/iu.test(text)) continue;
      for (const item of text.split(/\s+and\s+|,/iu)) {
        const label = cleanLabel(item.split(/\s+(?:at|with)\s+/iu)[0]!);
        if (label) claim(person, relation, entity("TOPIC", label), sentence);
      }
    }

    const offer = /\b(?:is|are)\s+hiring\s+(.+)|\boffers?\s+(.+)/iu.exec(sentence);
    const opening = offer?.[1] ?? offer?.[2];
    if (opening) {
      const label = cleanLabel(opening);
      if (label) claim(organization ?? person, "OFFERS", entity("OPPORTUNITY", label), sentence);
    }
  }
  return { entities: [...entities.values()], claims };
}

const stopWords = new Set("i im m am a an the to of at for in on with and or as my me we our who whom do does is are be someone somebody people person know find looking look want wants need needs seeking seek help could can would like work job jobs position positions role roles opportunity opportunities hiring opening openings vacancy vacancies".split(" "));
const aliases: Record<string, string> = {
  engineer: "engineering", engineers: "engineering", system: "systems",
  researcher: "research", researchers: "research", researching: "research", researches: "research",
  robots: "robotics", robot: "robotics", startups: "startup", companies: "company",
  chips: "chip", internships: "internship",
};

export function subjectTerms(text: string): string[] {
  const normalized = text.toLowerCase().replace(/\bartificial[ -]intelligence\b/gu, "ai").replace(/\bmachine[ -]learning\b/gu, "ml");
  const terms = [...new Set((normalized.match(/[\p{L}\p{N}]+/gu) ?? [])
    .map(word => aliases[word] ?? word).filter(word => !stopWords.has(word)))];
  if (terms.includes("chip") && !terms.includes("hardware")) terms.push("hardware");
  return terms;
}

export function requiresOpening(description: string): boolean {
  return /\b(?:hiring|openings?|vacanc(?:y|ies))\b/iu.test(description);
}

export function isNegativeQuery(description: string): boolean {
  return negative.test(description);
}
