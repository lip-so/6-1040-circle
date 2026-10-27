import type { ContactCard } from "./providers/brain-provider.ts";

/** Presentation only: never changes stored facts, evidence or search selections. */
export function formatMatchSummary(reason: string, card?: ContactCard | null): string {
  let summary = reason;
  // Older servers included the complete evidence after every selected value.
  // Remove only known evidence trailers, rather than arbitrary quoted text.
  for (const fact of card?.facts ?? []) summary = summary.replaceAll(` — “${fact.quote}”`, " · ");
  const parts = summary.split(/\s*·\s*/u).map(compactReferral).filter(Boolean);
  const seen = new Set<string>();
  return parts.filter(part => {
    const key = part.toLocaleLowerCase("en");
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  }).join(" · ");
}

function compactReferral(phrase: string): string {
  const value = phrase.trim();
  const prefix = /^May be relevant:\s*/iu.exec(value)?.[0] ?? "";
  const body = value.slice(prefix.length).replace(/[.!]+$/u, "");
  // Only rewrite the complete positive referral phrase. Keep qualifications,
  // negation and unfamiliar phrasing intact rather than guessing their meaning.
  if (/\b(?:not|no|never|may|might|maybe|possibly|perhaps|unconfirmed|if)\b|\b(?:isn|aren|wasn|weren|doesn|don)['’]t\b/iu.test(body)) return value;
  const referral = /^Knows (?:people|someone|contacts|connections)(?: in (.+?))? (?:(?:who )?(?:are|is) )?(?:looking for|hiring|recruiting) interns?(?: (?:for|in) (.+))?$/iu.exec(body);
  if (!referral) return value;
  const [, place, timing] = referral;
  if (place && /\b(?:who|whose|that|which|with|is|are|was|were|be|been|used|formerly|previously|looking|hiring|recruiting)\b/iu.test(place)) return value;
  return `${prefix}${place ? `${place} internship contacts` : "Internship contacts"}${timing ? ` · ${timing}` : ""}`;
}
