import { describe, expect, test } from "bun:test";
import { memorySummary } from "../../frontend/src/memory-summary.ts";

describe("short encounter details", () => {
  test("the demo note gives a role and discussion without inventing an encounter date", () => {
    expect(memorySummary("Met Faustin, founder of an AI-chip startup. We talked about systems engineering.", "Faustin"))
      .toEqual([
        { label: "When", value: "Not recorded" },
        { label: "Does", value: "Founder, AI-chip startup" },
        { label: "Discussed", value: "Systems engineering" },
      ]);
  });

  test("a meeting date is kept as written; a company founding date is not used as the meeting date", () => {
    expect(memorySummary("Met Faustin on October 16, 2026. We discussed systems engineering.", "Faustin")[0])
      .toEqual({ label: "When", value: "October 16, 2026" });
    expect(memorySummary("Met Faustin, founder of a startup founded on October 16, 2020. We discussed systems engineering.", "Faustin")[0])
      .toEqual({ label: "When", value: "Not recorded" });
    expect(memorySummary("When: after the hackathon\nMet Faustin. We discussed systems engineering.", "Faustin")[0])
      .toEqual({ label: "When", value: "after the hackathon" });
  });

  test("discussing a topic does not become employment or expertise", () => {
    expect(memorySummary("Met Mira. We discussed marine biology.", "Mira"))
      .toEqual([
        { label: "When", value: "Not recorded" },
        { label: "Does", value: "Not recorded" },
        { label: "Discussed", value: "Marine biology" },
      ]);
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
