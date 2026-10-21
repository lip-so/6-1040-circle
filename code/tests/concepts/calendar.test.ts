import { expect, test } from "bun:test";
import { calendarDate, relativeDate, validDate, validTimeZone } from "../../src/calendar.ts";
import { validateCard } from "../../src/providers/brain-provider.ts";
test("calendar anchoring respects local midnight, DST, month/year and leap boundaries",()=>{
  expect(calendarDate(new Date("2026-10-20T02:00:00Z"),"America/New_York")).toBe("2026-10-19");
  expect(calendarDate(new Date("2026-10-20T02:00:00Z"),"Asia/Tokyo")).toBe("2026-10-20");
  for(const [day,previous] of [["2026-01-01","2025-12-31"],["2024-03-01","2024-02-29"],["2026-03-09","2026-03-08"],["2026-11-02","2026-11-01"]])expect(relativeDate("Met Mira yesterday.",day!)).toBe(previous);
  expect(validTimeZone("Mars/Crater")).toBe(false);expect(validDate("2026-02-30")).toBe(false);
  expect(relativeDate("Met Mira yesterday.","")).toBeUndefined();
});
test("relative date canonicalization uses the original reference day and omits unanchored dates",()=>{
  const content="Met Mira yesterday.";
  const output={name:"Mira",nameQuote:"Mira",facts:[{kind:"date",value:"2029-01-01",quote:content,basis:"stated"}]};
  expect(validateCard(output,content,"2026-10-20").facts[0]!.value).toBe("2026-10-19");
  expect(validateCard(output,content,"").facts).toEqual([]);
  expect(validateCard({name:"Mira",nameQuote:"Mira",facts:[]},content,"2026-10-20").facts).toEqual([]);
});
test("summaries and marked conclusions retain their exact source evidence",()=>{
  const content="david works on making tools for scientists.";
  const card=validateCard({name:"David",nameQuote:"david",facts:[{kind:"role",value:"Builds scientific tools",quote:"works on making tools for scientists",basis:"stated"},{kind:"other",value:"May be interested in research software",quote:content,basis:"inferred"}]},content);
  expect(card.name).toBe("David");expect(card.nameQuote).toBe(content);
  expect(card.facts[0]!.quote).toBe(content);expect(card.facts[1]!.basis).toBe("inferred");
});
