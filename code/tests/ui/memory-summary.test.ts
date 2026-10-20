import { describe, expect, test } from "bun:test";
import { memorySummary } from "../../frontend/src/memory-summary.ts";

describe("short encounter details", () => {
  test("discussion and membership do not invent employment or expertise", () => {
    expect(memorySummary("Met Mira. We discussed marine biology.", "Mira"))
      .toEqual([
        { label: "When", value: "Not recorded" },
        { label: "Does", value: "Not recorded" },
        { label: "Discussed", value: "Marine biology" },
      ]);
    expect(memorySummary("Met Toni. Toni belongs to Improbable AI Lab.", "Toni"))
      .toContainEqual({ label: "Does", value: "Member of Improbable AI Lab" });
  });

  test("another person's role and negated work are not attributed to the person", () => {
    expect(memorySummary("Met Mira. She does not work on robotics. Noah works at Delta Lab. We discussed painting.", "Mira"))
      .toEqual([
        { label: "When", value: "Not recorded" },
        { label: "Does", value: "Not recorded" },
        { label: "Discussed", value: "Painting" },
      ]);
  });
});
