import { describe, expect, test } from "bun:test";
import { readMemoryFields, writeMemoryFields } from "../../src/memory-fields.ts";
import { memorySummary } from "../../frontend/src/memory-summary.ts";

describe("guided memories", () => {
  test("the fields display exactly what was entered, without requiring natural-language trigger phrases", () => {
    const fields = { person: "mira chen", when: "after the hackathon", does: "Marine biologist", discussed: "Ocean sensors" };
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
    expect(memorySummary(note, "Mira")).toEqual([
      { label: "When", value: "Not recorded" }, { label: "Does", value: "Not recorded" },
    ]);
    expect(readMemoryFields("Met Faustin, founder of an AI-chip startup.")).toBeUndefined();
  });
});

describe("optional contact information", () => {
  test("preserves and displays contact text", () => {
    const contact = "https://www.linkedin.com/in/mira-example";
    const fields = { person: "Mira", when: "after the hackathon", does: "Biologist", discussed: "Ocean sensors", contact };
    const note = writeMemoryFields(fields);
    expect(readMemoryFields(note)).toEqual(fields);
    expect(memorySummary(note, "Mira")).toContainEqual({ label: "Contact", value: contact });
  });

});
