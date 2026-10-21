import type { BrainProvider, ContactMemory, ContactCard } from "../../src/providers/brain-provider.ts";
/** Explicit test stand-in. It is never imported by the application or runtime configuration. */
export class FixtureBrain implements BrainProvider {
  version = "test-fixture-v1";
  extracts: string[] = [];
  selections: { description: string; memory: ContactMemory[] }[] = [];
  async extract(content: string): Promise<ContactCard> {
    this.extracts.push(content);
    const lines = content.match(/[^.!?\n]+(?:[.!?]|(?=\n)|$)/gu)?.map(s => s.trim()).filter(Boolean) ?? [];
    const intro = lines.find(s => /^Met /u.test(s));
    const guided = lines.find(s => /^Person:/u.test(s));
    const name = guided?.slice(7).trim() ?? /^Met ([^,.]+)/u.exec(intro ?? "")?.[1]?.trim() ?? null;
    return { name, nameQuote: name ? guided ?? intro! : null, facts: lines.map(quote => ({ kind: /discussed|talked/u.test(quote) ? "discussion" : /hiring/u.test(quote) ? "offer" : "other", value: quote, quote })) };
  }
  async select(description: string, memory: ContactMemory[]) {
    this.selections.push(structuredClone({ description, memory }));
    const terms = description.toLowerCase().match(/[a-z]+/gu)?.filter(x => !new Set("i im looking for work at an a the who could help with in systems".split(" ")).has(x)) ?? [];
    return { matches: memory.filter(row => terms.every(term => JSON.stringify(row.card).toLowerCase().includes(term))).slice(0, 5).map(row => ({ source: row.source, facts: row.card.facts.map((_, i) => i) })) };
  }
}
