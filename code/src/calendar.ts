/** Calendar arithmetic uses the saved local day, never the later search clock. */
export const defaultTimeZone = "America/New_York";
export function validTimeZone(value: unknown): value is string {
  if (typeof value !== "string" || value.length > 80) return false;
  try { new Intl.DateTimeFormat("en", { timeZone: value }).format(0); return true; } catch { return false; }
}
export function calendarDate(at: Date, timeZone = defaultTimeZone): string {
  const parts = new Intl.DateTimeFormat("en-US", { timeZone, year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(at);
  const part = (type: string) => parts.find(p => p.type === type)!.value;
  return `${part("year")}-${part("month")}-${part("day")}`;
}
export function validDate(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/u.test(value) && !Number.isNaN(Date.parse(value)) && new Date(value + "T12:00:00Z").toISOString().slice(0, 10) === value;
}
export function relativeDate(quote: string, referenceDate: string): string | undefined {
  if (!validDate(referenceDate)) return;
  const today = /\btoday\b/iu.test(quote), yesterday = /\byesterday\b/iu.test(quote);
  if (today === yesterday) return;
  const date = new Date(referenceDate + "T12:00:00Z");
  if (yesterday) date.setUTCDate(date.getUTCDate() - 1);
  return date.toISOString().slice(0, 10);
}
