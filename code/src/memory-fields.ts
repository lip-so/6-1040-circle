import { validMemoryDate } from "./calendar.ts";

export interface MemoryFields {
  person: string;
  when: string;
  does: string;
  discussed: string;
  contact?: string;
  notes?: string;
}

const fields = [
  ["Person", "person"], ["When", "when"], ["Does", "does"], ["Discussed", "discussed"], ["Contact", "contact"], ["Notes", "notes"],
] as const;

/** A readable memo; continuation lines cannot turn into a different field. */
export function writeMemoryFields(values: MemoryFields): string {
  if (values.when !== "" && !validMemoryDate(values.when)) throw new Error("Enter a real date in MM/DD/YYYY format, or leave it blank.");
  return fields.filter(([, key]) => !["contact", "notes"].includes(key) || values[key]?.trim()).map(([label, key]) => {
    const [first, ...rest] = (values[key] ?? "").trim().replace(/\r\n?/gu, "\n").split("\n");
    return [`${label}:${first ? ` ${first}` : ""}`, ...rest.map(line => `  ${line}`)].join("\n");
  }).join("\n");
}

/** Recognize the complete guided memo format; older free-text notes remain valid. */
export function readMemoryFields(content: string): MemoryFields | undefined {
  const values: MemoryFields = { person: "", when: "", does: "", discussed: "" };
  let index = -1;
  for (const line of content.split(/\r?\n/gu)) {
    const position = fields.findIndex(([label]) => line === `${label}:` || line.startsWith(`${label}: `));
    if (position > index && (position === index + 1 || (index >= 3 && position >= 4))) {
      index = position;
      const next = fields[index]!;
      values[next[1]] = line.slice(next[0].length + 1).replace(/^ /u, "");
    } else if (index >= 0 && line.startsWith("  ")) {
      const key = fields[index]![1];
      values[key] += `\n${line.slice(2)}`;
    } else return undefined;
  }
  // Contact is optional; the original four-field format remains readable.
  return index >= 3 && values.person.trim() ? values : undefined;
}
