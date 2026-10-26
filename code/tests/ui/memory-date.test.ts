import { expect, test } from "bun:test";
import { formatMemoryDate, validMemoryDate } from "../../src/calendar.ts";
import { readMemoryFields, writeMemoryFields } from "../../src/memory-fields.ts";
import { rememberInput, editInput } from "../../src/compositions/inputs.ts";
import { fieldsFromCard } from "../../frontend/src/encounter-form.ts";
import { memorySummary } from "../../frontend/src/memory-summary.ts";

const fields = { person: "Mira", when: "", does: "", discussed: "" };
const input = (when: string) => ({ session: "session", submission: crypto.randomUUID(), timeZone: "America/New_York", content: `Person: Mira\nWhen: ${when}\nDoes:\nDiscussed:` });
for (const date of ["10/24/2026", "02/29/2024", "02/29/2000", "01/01/2026", "12/31/2026"]) {
  test(`accepts a real standardized date: ${date}`, () => {
    expect(validMemoryDate(date)).toBe(true);
    expect(readMemoryFields(writeMemoryFields({ ...fields, when: date }))?.when).toBe(date);
    expect(rememberInput(input(date)).ok).toBe(true);
    expect(editInput({ ...input(date), memory: "a", revision: 0 }).ok).toBe(true);
  });
}
for (const date of ["2/3/2026", "2026-10-24", "October 24, 2026", "yesterday", "02/30/2026", "02/29/2026", "02/29/1900", "04/31/2026", "13/01/2026", "00/12/2026", "01/00/2026", "10/24/26", "10/24/2026\nNotes: injected", " 10/24/2026 "]) {
  test(`rejects malformed or impossible dates in new saves and edits: ${date}`, () => {
    expect(validMemoryDate(date)).toBe(false);
    expect(() => writeMemoryFields({ ...fields, when: date })).toThrow("MM/DD/YYYY");
    // Serializer-independent callers cannot bypass the shared endpoint check.
    if (!date.includes("\n")) {
      expect(rememberInput(input(date)).ok).toBe(false);
      expect(editInput({ ...input(date), memory: "a", revision: 0 }).ok).toBe(false);
    }
  });
}

test("date remains optional; free text and older guided originals remain readable", () => {
  expect(rememberInput(input("")).ok).toBe(true);
  expect(editInput({ ...input(""), memory: "a", revision: 0 }).ok).toBe(true);
  expect(rememberInput({ ...input(""), content: "Met Mira yesterday." }).ok).toBe(true);
  expect(readMemoryFields("Person: Mira\nWhen: after the workshop\nDoes:\nDiscussed:")?.when).toBe("after the workshop");
});

for (const when of ["02/30/2026", "yesterday", "2026-10-24"]) test(`A2 an empty Person cannot bypass guided date validation: ${when}`, () => {
  const value = { ...input(when), content: `Person:\nWhen: ${when}\nDoes: Builds sensors\nDiscussed:` };
  expect(rememberInput(value).ok).toBe(false);
  expect(editInput({ ...value, memory: "a", revision: 0 }).ok).toBe(false);
});

test("A2 headers alone are not meaningful guided content but an unnamed detail is", () => {
  const value = { ...input(""), content: "Person:\nWhen:\nDoes:\nDiscussed:\nContact:   \nNotes:" };
  expect(rememberInput(value).ok).toBe(false);
  expect(editInput({ ...value, memory: "a", revision: 0 }).ok).toBe(false);
  expect(editInput({ ...value, memory: "a", revision: 0, content: "Person:\nWhen:\nDoes:\nDiscussed:\nContact: new@example.test" }).ok).toBe(true);
});

test("edit preparation and card display use MM/DD/YYYY; context survives in Notes", () => {
  const card = { name: "Mira", nameQuote: "Person: Mira", facts: [
    { kind: "date" as const, value: "2026-10-24", quote: "When: today", basis: "stated" as const },
    { kind: "context" as const, value: "At the workshop", quote: "At the workshop" },
  ] };
  const content = "Person: Mira\nWhen: after the workshop\nDoes:\nDiscussed:\nNotes: Keep this note";
  const edited = fieldsFromCard(card, content);
  expect(edited.when).toBe("10/24/2026");
  expect(edited.notes).toContain("Keep this note");
  expect(edited.notes).toContain("after the workshop");
  expect(edited.notes).not.toContain("At the workshop");
  expect(memorySummary(content, "Mira", card)[0]).toEqual({ label: "When", value: "10/24/2026" });
  expect(formatMemoryDate("2026-10-24")).toBe("10/24/2026");
  expect(fieldsFromCard({ ...card, facts: [] }, content).when).toBe("");
  expect(fieldsFromCard({ ...card, facts: [] }, content).notes).toContain("after the workshop");
  expect(fieldsFromCard({ ...card, facts: [] }, content.replace("after the workshop", "2026-10-24")).when).toBe("10/24/2026");
});
