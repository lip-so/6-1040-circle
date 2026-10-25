import { formatMemoryDate, validMemoryDate } from "../../src/calendar.ts";
import type { ContactCard } from "../../src/providers/brain-provider.ts";
import { type MemoryFields, readMemoryFields } from "../../src/memory-fields.ts";
export const emptyFields = (): MemoryFields => ({ person: "", when: "", does: "", discussed: "", contact: "", notes: "" });
export function fieldsFromCard(card: ContactCard, content: string): MemoryFields {
  const recorded = readMemoryFields(content);
  const facts = (kinds: string[]) => card.facts.filter(f => kinds.includes(f.kind)).map(f => f.basis === "inferred" ? `May be: ${f.value}` : f.value).join("; ");
  const recordedDate = formatMemoryDate(recorded?.when ?? "");
  const date = validMemoryDate(recordedDate) ? recordedDate : formatMemoryDate(card.facts.find(f => f.kind === "date" && f.basis !== "inferred")?.value ?? "");
  const context = recorded?.when && !validMemoryDate(recordedDate) ? recorded.when : "";
  const notes = [...new Set([recorded?.notes || facts(["other", "offer"]), context, facts(["context"])].filter(Boolean))].join("\n");
  return { person: card.name ?? recorded?.person ?? "", when: validMemoryDate(date) ? date : "", does: facts(["role"]) || recorded?.does || "", discussed: facts(["discussion"]) || recorded?.discussed || "", contact: facts(["contact"]) || recorded?.contact || "", notes };
}
