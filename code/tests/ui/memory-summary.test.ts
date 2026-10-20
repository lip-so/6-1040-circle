import { describe, expect, test } from "bun:test";
import { memoryLabel, memorySummary } from "../../frontend/src/memory-summary.ts";

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

// Explicit names in lowercase originals remain readable.
test("explicit lowercase encounter names remain visible without guessing unnamed notes", () => {
  expect(memoryLabel("met ralph - founder of a biotech company that works on replicating plant DNA")).toBe("ralph");
  expect(memoryLabel("I spoke with mira chen at the workshop.")).toBe("mira chen");
  expect(memoryLabel("Met Anne-Marie, researcher at Delta Lab.")).toBe("Anne-Marie");
  expect(memoryLabel("Person: 李明\nWhen:\nDoes:\nDiscussed:")).toBe("李明");
  expect(memoryLabel("met someone at the workshop")).toBe("Unnamed encounter");
  expect(memoryLabel("Discussed robot design at a workshop.")).toBe("Unnamed encounter");
});

test("literal activities display under Does without requiring or inventing a date or profession",()=>{
  for(const [name,activity,content] of [["David Hume","talks about philosophy","I met David Hume who talks about philosophy."],["david","does papers","david who does papers"]]) {
    expect(memorySummary(content!,name!,{name:name!,nameQuote:content!,facts:[{kind:"role",value:activity!,quote:content!}]})).toEqual([{label:"Does",value:activity!}]);
  }
});
