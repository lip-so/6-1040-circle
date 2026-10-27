import { expect, test } from "bun:test";
import { formatMatchSummary } from "../../src/match-summary.ts";
import type { ContactCard } from "../../src/providers/brain-provider.ts";

const quote = "Knows people in Chicago who are looking for interns for this summer.";
const card: ContactCard = { name: "Rowan", nameQuote: "Met Rowan.", facts: [{kind:"offer",value:quote,quote}] };

test("blue referral summary is compact even with an old verbatim evidence trailer", () => {
  expect(formatMatchSummary(`${quote} — “${quote}”`,card)).toBe("Chicago internship contacts · this summer");
  expect(formatMatchSummary(quote,card)).toBe("Chicago internship contacts · this summer");
  expect(formatMatchSummary("Knows people in Paris looking for interns for Summer 2029.")).toBe("Paris internship contacts · Summer 2029");
  expect(formatMatchSummary("Knows someone who is hiring interns.")).toBe("Internship contacts");
  expect(card.facts[0]!.quote).toBe(quote);
  expect(card.facts[0]!.value).toBe(quote);
});

test("keeps uncertainty, negation and unrelated quoted content", () => {
  for (const reason of [
    "Knows people in Chicago who are not looking for interns for this summer.",
    "May know people in Chicago looking for interns.",
    "Knows people in Chicago who may be looking for interns.",
    "Knows people in Chicago looking for interns, if funding is approved.",
    "Knows people in Chicago who used to be looking for interns.",
    "Knows people in Chicago with friends looking for interns.",
    "Discussed “internship contacts” with a friend",
    "Plans to recruit UROP students · Spring 2029",
  ]) expect(formatMatchSummary(reason,card)).toBe(reason);
  expect(formatMatchSummary(`May be relevant: ${quote}`,card)).toBe("May be relevant: Chicago internship contacts · this summer");
});

test("handles multiple legacy reasons without dropping distinct support or reprocessing compact text", () => {
  const second = {kind:"role" as const,value:"Food engineering, Google",quote:"Works in food engineering at Google."};
  const multiple = {...card,facts:[card.facts[0]!,second]};
  expect(formatMatchSummary(`${quote} — “${quote}” ${second.value} — “${second.quote}”`,multiple)).toBe("Chicago internship contacts · this summer · Food engineering, Google");
  expect(formatMatchSummary("Chicago internship contacts · this summer · Chicago internship contacts")).toBe("Chicago internship contacts · this summer");
  expect(formatMatchSummary(formatMatchSummary(quote,card),card)).toBe(formatMatchSummary(quote,card));
});
