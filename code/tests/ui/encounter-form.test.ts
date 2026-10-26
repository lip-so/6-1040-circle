import { expect, test } from "bun:test";
import { editReferenceDateMessage, editSizeMessage, fieldsFromCard, hasRelativeEditDate, prepareEncounterEdit } from "../../frontend/src/encounter-form.ts";
import { readMemoryFields, writeMemoryFields } from "../../src/memory-fields.ts";
import type { ContactCard } from "../../src/providers/brain-provider.ts";
import { memorySummary } from "../../frontend/src/memory-summary.ts";

const guided = {
  person: "Mira Chen", when: "10/24/2026",
  does: "Builds solar panels and designs batteries\nTests storage prototypes",
  discussed: "Ocean sensors\nA workshop follow-up", contact: "mira@example.test\n555-0100",
  notes: "Send the battery paper\nBring the blue notebook",
};
const shortCard: ContactCard = { name: "Mira", nameQuote: "Person: Mira Chen", facts: [
  { kind: "role", value: "Builds solar panels", quote: "Does: Builds solar panels and designs batteries\n  Tests storage prototypes" },
  { kind: "discussion", value: "Ocean sensors", quote: "Discussed: Ocean sensors\n  A workshop follow-up" },
  { kind: "context", value: "Unrelated card context", quote: "Notes: Send the battery paper" },
] };
const rawCard = (facts: ContactCard["facts"]): ContactCard => ({ name: "Mira Chen", nameQuote: "Met Mira Chen.", facts });
const role = (quote: string): ContactCard["facts"][number] => ({ kind: "role", value: "Builds solar panels", quote });

test("guided unchanged save and Contact-only edit retain every current multiline field despite a shorter card", () => {
  const content = writeMemoryFields(guided);
  const fields = fieldsFromCard(shortCard, content);
  expect(fields).toEqual(guided);
  expect(writeMemoryFields(fields)).toBe(content);
  const edited = { ...fields, contact: "new@example.test" };
  expect(readMemoryFields(writeMemoryFields(edited))).toEqual(edited);
});

test("guided intentional empties and absent optional fields never refill from card facts", () => {
  const content = "Person: Mira Chen\nWhen:\nDoes:\nDiscussed:";
  const card: ContactCard = { ...shortCard, facts: [...shortCard.facts,
    { kind: "date", value: "2026-10-24", quote: "When: today" },
    { kind: "contact", value: "stale@example.test", quote: "stale@example.test" },
    { kind: "other", value: "Stale note", quote: "Stale note" },
  ] };
  expect(fieldsFromCard(card, content)).toEqual({ person: "Mira Chen", when: "", does: "", discussed: "", contact: "", notes: "" });
});

test("a second guided edit uses cleared current values and never restores stale card or original details", () => {
  const first = fieldsFromCard(shortCard, writeMemoryFields(guided));
  const current = writeMemoryFields({ ...first, does: "Builds wind turbines", discussed: "", contact: "", notes: "" });
  expect(fieldsFromCard(shortCard, current)).toEqual({ person: guided.person, when: guided.when, does: "Builds wind turbines", discussed: "", contact: "", notes: "" });
});

test("raw one-line shared evidence retains the omitted reminder once with the activity", () => {
  const content = "Met Mira Chen. Builds solar panels and designs batteries. Send the battery paper.";
  const fields = fieldsFromCard(rawCard([role("Builds solar panels and designs batteries.")]), content);
  expect(fields.does).toBe(content);
  expect(fields.notes).toBe("");
  expect(writeMemoryFields(fields).split("Send the battery paper")).toHaveLength(2);
});

test("raw multiline allocation keeps whole exact lines in source order and omitted reminders in Notes", () => {
  const activity = "Mira builds solar panels and designs batteries.";
  const discussion = "We discussed ocean sensors.";
  const contact = "Email mira@example.test.";
  const content = ["Met Mira Chen.", activity, discussion, contact, "Send the battery paper."].join("\n");
  const fields = fieldsFromCard(rawCard([role(activity), { kind: "discussion", value: "ocean sensors", quote: discussion }, { kind: "contact", value: "mira@example.test", quote: contact }]), content);
  expect(fields).toEqual({ person: "Mira Chen", when: "", does: activity, discussed: discussion, contact, notes: "Met Mira Chen.\nSend the battery paper." });
});

test("cross-line and overlapping evidence joins shared source lines once, with activity priority", () => {
  const lines = ["Met Mira Chen.", "Mira builds solar panels", "and designs batteries. We discussed sensors.", "Email mira@example.test and send the battery paper."];
  const content = lines.join("\n");
  const fields = fieldsFromCard(rawCard([
    role(lines.slice(1, 3).join("\n")),
    { kind: "discussion", value: "sensors", quote: lines.slice(2).join("\n") },
    { kind: "contact", value: "mira@example.test", quote: lines[3]! },
  ]), content);
  expect(fields.does).toBe(lines.slice(1).join("\n"));
  expect(fields.discussed).toBe(""); expect(fields.contact).toBe("");
  expect(fields.notes).toBe(lines[0]);
});

test("discussion/contact shared source goes wholly to Discussed without derivative duplicates", () => {
  const activity = "Mira builds solar panels.";
  const shared = "We discussed sensors. Email mira@example.test; send the battery paper.";
  const fields = fieldsFromCard(rawCard([role(activity), { kind: "discussion", value: "sensors", quote: shared }, { kind: "contact", value: "mira@example.test", quote: shared }]), `${activity}\n${shared}`);
  expect(fields.does).toBe(activity); expect(fields.discussed).toBe(shared);
  expect(fields.contact).toBe(""); expect(fields.notes).toBe("");
});

for (const facts of [[], [role("A quote absent from current text.")], [role("Mira builds solar panels.")]]) {
  test(`raw missing, unmatched or ambiguous role evidence uses the whole current source fallback: ${JSON.stringify(facts)}`, () => {
    const content = "Met Mira Chen.\nMira builds solar panels.\nMira builds solar panels.\nSend the battery paper.";
    const fields = fieldsFromCard(rawCard(facts), content);
    expect(fields.does).toBe(content);
    expect(fields.discussed).toBe(""); expect(fields.contact).toBe(""); expect(fields.notes).toBe("");
  });
}

test("replacing grouped Does removes the old activity and a second edit does not restore it", () => {
  const content = "Met Mira Chen. Builds solar panels and designs batteries. Send the battery paper.";
  const card = rawCard([role("Builds solar panels and designs batteries.")]);
  const fields = fieldsFromCard(card, content);
  const current = writeMemoryFields({ ...fields, does: "Builds wind turbines" });
  expect(current).not.toContain("solar panels"); expect(current).not.toContain("batteries");
  expect(fieldsFromCard(card, current).does).toBe("Builds wind turbines");
  expect(fieldsFromCard(card, current).notes).toBe("");
});

test("retained raw detail is not truncated to a field limit", () => {
  const content = `Met Mira Chen. ${"A long retained detail. ".repeat(250)}`;
  expect(fieldsFromCard(rawCard([]), content).does).toBe(content);
});

test("all raw source allocations explain grouped editing, including discussion/contact shared groups", () => {
  const activity = "Mira builds solar panels.";
  const shared = "We discussed sensors. Email mira@example.test.";
  const prepared = prepareEncounterEdit(rawCard([role(activity), { kind: "discussion", value: "sensors", quote: shared }, { kind: "contact", value: "mira@example.test", quote: shared }]), `${activity}\n${shared}`);
  expect(prepared.grouped).toBe(true);
  expect(prepareEncounterEdit(shortCard, writeMemoryFields(guided)).grouped).toBe(false);
});

test("supported raw dates are stabilized after exact quote allocation in every retained field", () => {
  const lines = ["Met Mira Chen today.", "Mira builds solar panels today.", "We discussed batteries yesterday.", "Email mira@example.test today.", "Send the paper yesterday and the notes TODAY."];
  const card: ContactCard = { name: "Mira Chen", nameQuote: lines[0]!, facts: [
    role(lines[1]!), { kind: "discussion", value: "batteries", quote: lines[2]! },
    { kind: "contact", value: "mira@example.test", quote: lines[3]! },
    { kind: "date", value: "2026-10-24", quote: lines[0]!, basis: "stated" },
  ] };
  const prepared = prepareEncounterEdit(card, lines.join("\n"), "2026-10-24");
  expect(prepared.fields).toEqual({ person: "Mira Chen", when: "10/24/2026", does: "Mira builds solar panels 10/24/2026.", discussed: "We discussed batteries 10/23/2026.", contact: "Email mira@example.test 10/24/2026.", notes: "Met Mira Chen 10/24/2026.\nSend the paper 10/23/2026 and the notes 10/24/2026." });
  expect(prepared.dateReview).toBe(false);
  const submitted = writeMemoryFields(prepared.fields);
  // Absolute reviewed content stays stable on identical retry and even when this
  // helper is deliberately given another anchor. Remembering preserves the initial day.
  expect(writeMemoryFields(prepared.fields)).toBe(submitted);
  expect(fieldsFromCard(card, submitted, "2026-10-26")).toEqual(prepared.fields);
});

test("guided authored prose stays authoritative while legacy When keeps its date adaptation", () => {
  const content = "Person: Mira Chen\nWhen: yesterday\nDoes: Builds batteries today\nDiscussed: Met yesterday\nContact: Email today\nNotes: Send notes today";
  const prepared = prepareEncounterEdit(shortCard, content, "2026-10-24");
  expect(prepared.fields).toEqual({ person: "Mira Chen", when: "10/23/2026", does: "Builds batteries today", discussed: "Met yesterday", contact: "Email today", notes: "Send notes today" });
  expect(prepared.dateReview).toBe(false);
  const context = prepareEncounterEdit(shortCard, content.replace("When: yesterday", "When: yesterday at the workshop"), "2026-10-24");
  expect(context.fields.when).toBe(""); expect(context.fields.notes).toContain("10/23/2026 at the workshop");
});

for (const name of ["Today", "Yesterday"]) for (const anchor of ["", "2026-10-24"]) for (const fallback of [false, true]) {
  test(`evidenced literal ${name} survives raw ${fallback ? "fallback" : "allocation"}, Contact-only edit and guided reopening with ${anchor || "missing"} anchor`, () => {
    const source = `Met ${name}.\nBuilds solar panels.`;
    const card: ContactCard = { name, nameQuote: `Met ${name}.`, facts: fallback ? [] : [role("Builds solar panels.")] };
    const prepared = prepareEncounterEdit(card, source, anchor);
    expect(prepared.fields.person).toBe(name);
    expect(prepared.fields.does).toBe(fallback ? source : "Builds solar panels.");
    expect(prepared.fields.notes).toBe(fallback ? "" : `Met ${name}.`);
    expect(prepared.dateReview).toBe(false);
    const edited = { ...prepared.fields, contact: "new@example.test" };
    expect(hasRelativeEditDate(edited, prepared.rawReview)).toBe(false);
    const submitted = writeMemoryFields(edited);
    expect(submitted).toContain(`Met ${name}.`);
    const freshCard: ContactCard = { ...card, nameQuote: `Person: ${name}` };
    const second = prepareEncounterEdit(freshCard, submitted, "2026-10-26");
    expect(second.fields).toEqual(edited); expect(second.dateReview).toBe(false);
    expect(second.rawReview).toBeNull();
    expect(hasRelativeEditDate(second.fields, second.rawReview)).toBe(false);
  });
}

for (const name of ["Today", "Yesterday"]) for (const anchor of ["", "2026-10-24"]) {
  test(`protect only the evidenced ${name} span while nearby actual today/yesterday receives date handling with ${anchor || "missing"} anchor`, () => {
    const source = `Met ${name}. Builds solar panels today. Send the paper yesterday.`;
    const card: ContactCard = { name, nameQuote: `Met ${name}.`, facts: [role("Builds solar panels today.")] };
    const prepared = prepareEncounterEdit(card, source, anchor);
    expect(prepared.fields.does).toBe(anchor ? `Met ${name}. Builds solar panels 10/24/2026. Send the paper 10/23/2026.` : source);
    expect(prepared.dateReview).toBe(!anchor);
    const corrected = { ...prepared.fields, does: `Met ${name}. Builds solar panels 10/24/2026. Send the paper 10/23/2026.` };
    expect(hasRelativeEditDate(corrected, prepared.rawReview)).toBe(false);
    expect(hasRelativeEditDate({ ...corrected, notes: "Send today" }, prepared.rawReview)).toBe(true);
    // Changing away the exact name evidence cannot acquire a broader exemption.
    expect(hasRelativeEditDate({ ...corrected, does: `Meet ${name}. Builds solar panels.` }, prepared.rawReview)).toBe(true);
  });
}

test("date conversion updates the exact name context while protecting only the uniquely evidenced full name", () => {
  const source = "Met Today Smith yesterday. Builds solar panels today.";
  const card: ContactCard = { name: "Today Smith", nameQuote: "Met Today Smith yesterday.", facts: [] };
  const prepared = prepareEncounterEdit(card, source, "2026-10-24");
  expect(prepared.fields.does).toBe("Met Today Smith 10/23/2026. Builds solar panels 10/24/2026.");
  expect(prepared.dateReview).toBe(false);
  expect(hasRelativeEditDate(prepared.fields, prepared.rawReview)).toBe(false);
});

test("ambiguous name/date occurrences remain visible and require correction even with a valid anchor", () => {
  const source = "Met Today today. Builds solar panels.";
  const card: ContactCard = { name: "Today", nameQuote: "Met Today today.", facts: [] };
  const prepared = prepareEncounterEdit(card, source, "2026-10-24");
  expect(prepared.fields.does).toBe(source); expect(prepared.dateReview).toBe(true);
  expect(hasRelativeEditDate(prepared.fields, prepared.rawReview)).toBe(true);
  expect(hasRelativeEditDate({ ...prepared.fields, does: "Met 10/24/2026. Builds solar panels." }, prepared.rawReview)).toBe(false);
});

test("name evidence does not exempt copied or duplicated occurrences in an edited raw draft", () => {
  const card: ContactCard = { name: "Today", nameQuote: "Met Today.", facts: [] };
  const prepared = prepareEncounterEdit(card, "Met Today. Builds solar panels.", "2026-10-24");
  expect(hasRelativeEditDate({ ...prepared.fields, does: "Builds solar panels.", notes: "Met Today." }, prepared.rawReview)).toBe(true);
  expect(hasRelativeEditDate({ ...prepared.fields, does: "Met Today. Met Today. Builds solar panels." }, prepared.rawReview)).toBe(true);
});

test("cross-line name evidence remains together and preserves its name while stabilizing nearby dates", () => {
  const nameQuote = "Met Today.\nWe shared notes yesterday.";
  const card: ContactCard = { name: "Today", nameQuote, facts: [role("Builds solar panels.")] };
  const prepared = prepareEncounterEdit(card, `${nameQuote}\nBuilds solar panels.`, "2026-10-24");
  expect(prepared.fields.notes).toBe("Met Today.\nWe shared notes 10/23/2026.");
  expect(prepared.dateReview).toBe(false);
  expect(hasRelativeEditDate(prepared.fields, prepared.rawReview)).toBe(false);
});

for (const anchor of ["", "missing", "2026-02-30"]) test(`missing/invalid anchor requires visible correction without changing supported wording: ${anchor}`, () => {
  const content = "Met Mira Chen today. Builds solar panels yesterday. Send the battery paper.";
  const prepared = prepareEncounterEdit(rawCard([]), content, anchor);
  expect(prepared.fields.does).toBe(content); expect(prepared.dateReview).toBe(true);
  expect(hasRelativeEditDate(prepared.fields)).toBe(true);
  expect(hasRelativeEditDate({ ...prepared.fields, does: "Met Mira Chen 10/24/2026. Builds solar panels 10/23/2026. Send the battery paper." })).toBe(false);
});

test("relative date review uses whole words and does not parse other natural-language dates", () => {
  const content = "Met Mira Chen tomorrow at Yesterdayland. Next Thursday's paper is about today's batteries.";
  const prepared = prepareEncounterEdit(rawCard([]), content, "2026-10-24");
  expect(prepared.fields.does).toBe("Met Mira Chen tomorrow at Yesterdayland. Next Thursday's paper is about 10/24/2026's batteries.");
  expect(prepared.dateReview).toBe(false);
  expect(hasRelativeEditDate({ ...prepared.fields, notes: "today" })).toBe(true);
});

for (const person of ["Today", "Yesterday"]) test(`guided literal name ${person} and email/URL identifiers survive date conversion and save review`, () => {
  const fields = { ...guided, person, does: "Builds batteries", discussed: "", contact: "today@example.test\nhttps://example.test/yesterday", notes: "www.example.test/today and yesterday@example.test" };
  for (const anchor of ["", "2026-10-24"]) {
    const prepared = prepareEncounterEdit(shortCard, writeMemoryFields(fields), anchor);
    expect(prepared.fields).toEqual(fields); expect(prepared.dateReview).toBe(false);
    expect(hasRelativeEditDate(prepared.fields)).toBe(false);
  }
});

test("raw source and Contact identifiers stay literal while nearby date wording is stabilized or gated", () => {
  const lines = ["Met Mira Chen.", "Builds solar panels. Read https://example.test/today and email yesterday@example.test today.", "Email today@example.test", "or https://example.test/yesterday", "Send https://example.test/today yesterday."];
  const card = rawCard([role(lines[1]!), { kind: "contact", value: "today@example.test", quote: lines.slice(2, 4).join("\n") }]);
  const prepared = prepareEncounterEdit(card, lines.join("\n"), "2026-10-24");
  expect(prepared.fields.does).toBe("Builds solar panels. Read https://example.test/today and email yesterday@example.test 10/24/2026.");
  expect(prepared.fields.contact).toBe(lines.slice(2,4).join("\n"));
  expect(prepared.fields.notes).toBe("Met Mira Chen.\nSend https://example.test/today 10/23/2026.");
  expect(prepared.dateReview).toBe(false);
  const unanchored = prepareEncounterEdit(card, lines.join("\n"));
  expect(unanchored.dateReview).toBe(true);
  expect(hasRelativeEditDate({ ...unanchored.fields, does: "Read https://example.test/today and email yesterday@example.test.", notes: "" })).toBe(false);
});

for (const anchor of ["", "2026-10-24"]) test(`guided bare domain/path links remain literal with source anchor ${anchor || "missing"}`, () => {
  const fields = { ...guided, person: "Yesterday", contact: "today.example.com/profile\nexample.com/yesterday", notes: "Read today.example.com/profile and example.com/yesterday" };
  const prepared = prepareEncounterEdit(shortCard, writeMemoryFields(fields), anchor);
  expect(prepared.fields).toEqual(fields); expect(prepared.dateReview).toBe(false);
  expect(hasRelativeEditDate(prepared.fields)).toBe(false);
  const wording = prepareEncounterEdit(shortCard, writeMemoryFields({ ...fields, notes: "Call today; read example.com/yesterday" }), anchor);
  expect(wording.fields.notes).toBe("Call today; read example.com/yesterday");
  expect(wording.dateReview).toBe(false);
  expect(hasRelativeEditDate(wording.fields, wording.rawReview)).toBe(false);
});

for (const anchor of ["", "2026-10-24"]) test(`retained raw bare links preserve identifiers and distinguish nearby date wording with anchor ${anchor || "missing"}`, () => {
  const lines = ["Met Mira Chen.", "Builds solar panels. Read today.example.com/profile yesterday.", "Contact example.com/yesterday", "or today.example.com/profile."];
  const card = rawCard([role(lines[1]!), { kind: "contact", value: "example.com/yesterday", quote: lines.slice(2).join("\n") }]);
  const prepared = prepareEncounterEdit(card, lines.join("\n"), anchor);
  expect(prepared.fields.does).toBe(anchor ? "Builds solar panels. Read today.example.com/profile 10/23/2026." : lines[1]!);
  expect(prepared.fields.contact).toBe(lines.slice(2).join("\n"));
  expect(prepared.dateReview).toBe(!anchor);
  const identifierOnly = { ...prepared.fields, does: "Builds solar panels. Read today.example.com/profile." };
  expect(hasRelativeEditDate(identifierOnly)).toBe(false);
});

test("A2 exact 20k raw source stays intact with a specific form-overhead warning", () => {
  const source = "x".repeat(20_000);
  const prepared = prepareEncounterEdit({ name: null, nameQuote: null, facts: [] }, source, "2026-10-24");
  expect(prepared.fields.does).toBe(source);
  expect(prepared.fields.person).toBe("");
  expect(writeMemoryFields(prepared.fields).length).toBe(20_031);
  expect(editSizeMessage(prepared.fields)).toContain("31 characters over");
  expect(editSizeMessage(prepared.fields)).toContain("No text will be shortened automatically");
  const corrected = { ...prepared.fields, does: source.slice(0, -31) };
  expect(writeMemoryFields(corrected).length).toBe(20_000);
  expect(editSizeMessage(corrected)).toBe("");
  expect(editSizeMessage({ ...prepared.fields, when: "bad date" })).toContain("characters over");
});

test("A2 long existing fields and multiline Person preserve current authored values", () => {
  const fields = { person: "Mira\nChen", when: "10/24/2026", does: "a".repeat(5_000), discussed: "b".repeat(4_500), contact: "c".repeat(2_500), notes: "d".repeat(4_500) };
  const prepared = prepareEncounterEdit(shortCard, writeMemoryFields(fields), "2026-10-24");
  expect(prepared.fields).toEqual(fields);
  expect(editSizeMessage(prepared.fields)).toBe("");
});

test("A2 inferred activity conversion retains uncertainty instead of promoting the card summary", () => {
  const source = "Met Mira. She may work on ocean sensors, but I am not sure.";
  const card: ContactCard = { name: "Mira", nameQuote: "Met Mira.", facts: [{ kind: "role", value: "Sensor engineer", quote: "She may work on ocean sensors, but I am not sure.", basis: "inferred" }] };
  const prepared = prepareEncounterEdit(card, source, "2026-10-24");
  const saved = writeMemoryFields({ ...prepared.fields, contact: "mira@example.test" });
  expect(saved).toContain(source);
  expect(saved).not.toContain("Sensor engineer");
  expect(memorySummary(source, "Mira", card)).toEqual([{ label: "Does", value: "May be: Sensor engineer" }]);
  expect(prepareEncounterEdit(card, saved, "2026-10-24").fields.does).toBe(source);
});

test("A2 source-day guidance names the saved day and never fabricates a missing anchor", () => {
  expect(editReferenceDateMessage("2026-10-24")).toContain("10/24/2026");
  expect(editReferenceDateMessage("2026-10-24")).toContain("rather than the day you edit");
  for (const anchor of ["", "2026-02-30", "unknown"]) {
    expect(editReferenceDateMessage(anchor)).toContain("reference day is unavailable");
    expect(editReferenceDateMessage(anchor)).toContain("explicit MM/DD/YYYY");
  }
});
