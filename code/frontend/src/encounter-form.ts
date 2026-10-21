import type { ContactCard } from "../../src/providers/brain-provider.ts";
import { type MemoryFields, readMemoryFields } from "../../src/memory-fields.ts";
export const emptyFields = (): MemoryFields => ({ person: "", when: "", does: "", discussed: "", contact: "", notes: "" });
export function fieldsFromCard(card: ContactCard, content: string): MemoryFields {
  const recorded = readMemoryFields(content);
  const facts = (kinds: string[]) => card.facts.filter(f => kinds.includes(f.kind)).map(f => f.basis === "inferred" ? `May be: ${f.value}` : f.value).join("; ");
  return { person: card.name ?? recorded?.person ?? "", when: facts(["date", "context"]) || recorded?.when || "", does: facts(["role"]) || recorded?.does || "", discussed: facts(["discussion"]) || recorded?.discussed || "", contact: facts(["contact"]) || recorded?.contact || "", notes: facts(["other", "offer"]) || recorded?.notes || "" };
}
