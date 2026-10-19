export interface MemoryFields {
  person: string;
  when: string;
  does: string;
  discussed: string;
}

const fields = [
  ["Person", "person"], ["When", "when"], ["Does", "does"], ["Discussed", "discussed"],
] as const;

/** A readable memo; continuation lines cannot turn into a different field. */
export function writeMemoryFields(values: MemoryFields): string {
  return fields.map(([label, key]) => {
    const [first, ...rest] = values[key].trim().replace(/\r\n?/gu, "\n").split("\n");
    return [`${label}:${first ? ` ${first}` : ""}`, ...rest.map(line => `  ${line}`)].join("\n");
  }).join("\n");
}

/** Recognize the complete guided memo format; older free-text notes remain valid. */
export function readMemoryFields(content: string): MemoryFields | undefined {
  const values: MemoryFields = { person: "", when: "", does: "", discussed: "" };
  let index = -1;
  for (const line of content.split(/\r?\n/gu)) {
    const next = fields[index + 1];
    if (next && (line === `${next[0]}:` || line.startsWith(`${next[0]}: `))) {
      index += 1;
      values[next[1]] = line.slice(next[0].length + 1).replace(/^ /u, "");
    } else if (index >= 0 && line.startsWith("  ")) {
      const key = fields[index]![1];
      values[key] += `\n${line.slice(2)}`;
    } else return undefined;
  }
  return index === fields.length - 1 && values.person.trim() ? values : undefined;
}
