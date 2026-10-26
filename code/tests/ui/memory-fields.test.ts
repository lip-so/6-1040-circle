import { describe, expect, test } from "bun:test";
import { hasMemoryFieldContent, memoryFieldsLength, readMemoryFields, writeMemoryFields } from "../../src/memory-fields.ts";
import { memorySummary } from "../../frontend/src/memory-summary.ts";

describe("guided memories", () => {
  test("the fields preserve a standardized encounter date", () => {
    const fields = { person: "mira chen", when: "10/24/2026", does: "Marine biologist", discussed: "Ocean sensors" };
    const note = writeMemoryFields(fields);
    expect(readMemoryFields(note)).toEqual(fields);
    expect(memorySummary(note, fields.person)).toEqual([
      { label: "When", value: fields.when },
      { label: "Does", value: fields.does },
      { label: "Discussed", value: fields.discussed },
    ]);
  });

  test("multiline entries cannot overwrite the person or another field", () => {
    const fields = { person: "Mira", when: "", does: "Biologist", discussed: "Ocean sensors\nPerson: Noah\nDoes: Engineer" };
    expect(readMemoryFields(writeMemoryFields(fields))).toEqual(fields);
  });

  test("only a person's name is needed, and older free-text notes are still recognized separately", () => {
    const note = writeMemoryFields({ person: "Mira", when: "", does: "", discussed: "" });
    expect(memorySummary(note, "Mira")).toEqual([]);
    expect(readMemoryFields("Met Faustin, founder of an AI-chip startup.")).toBeUndefined();
  });
});

describe("optional contact information", () => {
  for (const contact of ["+1 (617) 555-0142", "https://www.linkedin.com/in/mira-example"]) {
    test(`preserves and displays ${contact.startsWith("https:") ? "a LinkedIn URL" : "a phone number"}`, () => {
      const fields = { person: "Mira", when: "10/24/2026", does: "Biologist", discussed: "Ocean sensors", contact };
      const note = writeMemoryFields(fields);
      expect(readMemoryFields(note)).toEqual(fields);
      expect(memorySummary(note, "Mira")).toContainEqual({ label: "Contact", value: contact });
    });
  }

  test("reads the original four-field format and keeps contact optional", () => {
    const old = "Person: Mira\nWhen: yesterday\nDoes: Biologist\nDiscussed: Ocean sensors";
    expect(readMemoryFields(old)).toEqual({ person: "Mira", when: "yesterday", does: "Biologist", discussed: "Ocean sensors" });
    const blank = writeMemoryFields({ person: "Mira", when: "", does: "", discussed: "", contact: "  " });
    expect(blank).not.toContain("Contact:");
    expect(memorySummary(blank, "Mira").some(row => row.label === "Contact")).toBe(false);
    expect(readMemoryFields("Person: Mira\nWhen:\nDoes:\nContact: 123")).toBeUndefined();
  });

  test("contact text cannot overwrite the person or other fields", () => {
    const fields = { person: "Mira", when: "", does: "Biologist", discussed: "", contact: "+1 617 555 0142\nPerson: Noah\nDoes: Engineer" };
    expect(readMemoryFields(writeMemoryFields(fields))).toEqual(fields);
  });
});

test("form notes stay separate from headers and optional contact can be absent",()=>{
  const input={person:"Quinn",when:"",does:"Builds solar panels",discussed:"",notes:"More detail\nPerson: Injected"};
  expect(readMemoryFields(writeMemoryFields(input))).toEqual(input);
});

test("A2 complete unnamed memos round-trip details and continuation lines", () => {
  const fields = { person: "", when: "", does: "Builds ocean sensors\nPerson: Not a new identity", discussed: "", contact: "new@example.test" };
  expect(readMemoryFields(writeMemoryFields(fields))).toEqual(fields);
  expect(readMemoryFields("Person:\nWhen:\nDoes:\nDiscussed:")).toEqual({ person: "", when: "", does: "", discussed: "" });
  expect(readMemoryFields("Person:\nWhen:\nDoes: Not complete")).toBeUndefined();
});

test("A2 an unnamed memo displays all authored details without guessing an identity", () => {
  const fields = { person: "", when: "10/24/2026", does: "Builds ocean sensors", discussed: "Met Dana or Daria; not sure", contact: "new@example.test", notes: "Send the paper" };
  expect(memorySummary(writeMemoryFields(fields), "Unnamed encounter")).toEqual([
    { label: "When", value: fields.when }, { label: "Does", value: fields.does },
    { label: "Discussed", value: fields.discussed }, { label: "Contact", value: fields.contact }, { label: "Note", value: fields.notes },
  ]);
});

test("A2 meaningful fields and exact size account for formatting without validating an unfinished date", () => {
  const empty = { person: " \n", when: "", does: "", discussed: "", contact: " \t", notes: "" };
  expect(hasMemoryFieldContent(empty)).toBe(false);
  expect(hasMemoryFieldContent({ ...empty, notes: "One useful detail" })).toBe(true);
  const draft = { ...empty, person: "", when: "not a date", does: "First line\r\nPerson: literal continuation", contact: "x@example.test" };
  const memo = "Person:\nWhen: not a date\nDoes: First line\n  Person: literal continuation\nDiscussed:\nContact: x@example.test";
  expect(memoryFieldsLength(draft)).toBe(memo.length);
  expect(() => writeMemoryFields(draft)).toThrow("MM/DD/YYYY");
  expect(memoryFieldsLength({ ...draft, when: "" })).toBe(writeMemoryFields({ ...draft, when: "" }).length);
});
