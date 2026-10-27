import { test, expect } from "@playwright/test";

// Rendered interface checks only: all accounts, notes and API responses below
// are synthetic. These fixtures do not exercise Commons, MongoDB or an AI model.
const originalMira = "Met Mira Chen. She builds panels.";
const longName = ("Alexandra-Marie del Río ".repeat(9)).slice(0, 200);
const longDetail = "Maps accessible paths through coastal communities. ".repeat(9).trim();
const longNotes = "Bring the workshop notes, café map and 海洋 sensor sketch.\n".repeat(55).trim();
const multilineContact = "quinn@example.test\nhttps://example.test/乔";

function memo(person, does = "", discussed = "", contact = "", notes = "") {
  const field = (label, value) => `${label}:${value ? ` ${value.replaceAll("\n", "\n  ")}` : ""}`;
  return [field("Person", person), "When: 10/25/2026", field("Does", does), field("Discussed", discussed),
    ...(contact ? [field("Contact", contact)] : []), ...(notes ? [field("Notes", notes)] : [])].join("\n");
}

function encounter(index, person, does = "", discussed = "", { contact = "", notes = "", inferred = false, original } = {}) {
  const content = memo(person, does, discussed, contact, notes);
  const facts = [
    ...(does ? [{ kind: "role", value: does, quote: `Does: ${does}`, basis: inferred ? "inferred" : "stated" }] : []),
    ...(discussed ? [{ kind: "discussion", value: discussed, quote: `Discussed: ${discussed}` }] : []),
    ...(contact ? [{ kind: "contact", value: contact, quote: `Contact: ${contact.replaceAll("\n", "\n  ")}` }] : []),
  ];
  return { memory: `00000000-0000-4000-8000-${String(index).padStart(12, "0")}`, content,
    original: original ?? content, revision: original ? 1 : 0, referenceDate: "2026-10-25",
    card: { name: person || null, nameQuote: person ? `Person: ${person}` : null, facts } };
}

const encounters = [
  encounter(1, "Mira Chen", "Builds solar panels and designs batteries", "Storage prototypes", { contact: "mira@example.test", original: originalMira }),
  encounter(2, "Mira Chen", "Marine biologist", "Ocean sensors"),
  encounter(3, "", "May work on acoustic sensors; this is unconfirmed", "Name might be Alex or Alexis", { inferred: true }),
  encounter(4, "Nia", "Develops solar panels; is not hiring", "Workshop follow-up"),
  encounter(5, "Leo", "Graphic designer", "Quantum computing"),
  encounter(6, "Quinn 乔", "Builds acoustic sensors", "Café, 海洋 and 🪸", { contact: multilineContact }),
  encounter(7, longName, "Designs accessible public spaces", "A long follow-up plan"),
  encounter(8, "Jules"),
  encounter(9, "Sasha", longDetail, "A detailed follow-up", { notes: longNotes }),
  encounter(10, "Robin", "Possible robotics work; ask next time", "Unconfirmed paper topic", { inferred: true }),
];

function deferred() { let resolve; const promise = new Promise(done => { resolve = done; }); return { promise, resolve }; }

async function setup(page, { empty = false, initialList } = {}) {
  const state = { rows: empty ? [] : structuredClone(encounters), calls: [], handlers: {} };
  if (initialList) state.handlers["/memories/list"] = initialList;
  await page.route("**/api/**", async route => {
    if (!new URL(route.request().url()).pathname.startsWith("/api/")) return route.continue();
    const path = new URL(route.request().url()).pathname.slice(4), input = route.request().postDataJSON();
    state.calls.push({ path, input });
    let answer;
    if (state.handlers[path]) answer = await state.handlers[path](input);
    else if (path === "/auth/me") answer = { username: "synthetic-tester" };
    else if (path === "/memories/list") answer = { memories: state.rows };
    else if (path === "/memories/prepare-edit") answer = state.rows.find(row => row.memory === input.memory);
    else if (path === "/memories/remember") {
      const memory = `new-synthetic-${state.rows.length}`;
      state.rows.unshift({ memory, content: input.content, original: input.content, revision: 0, referenceDate: "2026-10-26", card: null });
      answer = { memory };
    } else throw new Error(`Unexpected synthetic endpoint ${path}`);
    await route.fulfill({ status: answer?.error ? 500 : 200, json: answer });
  });
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Recent people", exact: true })).toBeVisible();
  if (!initialList) {
    if (empty) await expect(page.getByText("No saved people yet.", { exact: true })).toBeVisible();
    else await expect(page.locator(".contact-list > .contact-row")).toHaveCount(10);
  }
  await page.evaluate(() => document.fonts.ready);
  return state;
}

const writes = state => state.calls.filter(call => ["/memories/remember", "/memories/edit", "/memories/forget"].includes(call.path));
const firstEncounter = page => page.getByRole("button", { name: "Remember your first encounter", exact: true });

test("A6 empty-account keyboard action preserves drafts and saves only after explicit submission", async ({ page }) => {
  const state = await setup(page, { empty: true });
  await expect(page.getByText("Save an encounter first", { exact: false })).toBeVisible();
  await page.screenshot({ path: "../tests/output/browser-artifacts/p4-empty-desktop.png", fullPage: true });
  await page.getByLabel("Who could help?").fill("sensor research");
  await firstEncounter(page).focus(); await page.keyboard.press("Enter");
  const note = page.getByLabel("Encounter note");
  await expect(note).toBeFocused(); expect(writes(state)).toHaveLength(0);
  const content = "Met Taylor at a workshop. Taylor builds sensors.";
  await note.fill(content);
  await page.getByRole("button", { name: "Find", exact: true }).click();
  await expect(page.getByLabel("Who could help?")).toHaveValue("sensor research");
  await firstEncounter(page).focus(); await page.keyboard.press("Space");
  await expect(note).toBeFocused(); await expect(note).toHaveValue(content);
  expect(writes(state)).toHaveLength(0);
  await page.getByRole("button", { name: "Save", exact: true }).click();
  await expect(page.getByText("Memory saved.", { exact: true })).toBeVisible();
  await expect(firstEncounter(page)).toHaveCount(0);
  expect(writes(state)).toHaveLength(1); expect(writes(state)[0].input.content).toBe(content);
});

test("A6 first-encounter action retains Form and Voice choices and focuses their visible entry without opening the microphone", async ({ page }) => {
  await page.addInitScript(() => {
    window.syntheticMicrophoneRequests = 0;
    Object.defineProperty(navigator.mediaDevices, "getUserMedia", { value: async () => {
      window.syntheticMicrophoneRequests++; throw new Error("The synthetic test must not open a microphone.");
    } });
  });
  const state = await setup(page, { empty: true });
  await page.getByRole("button", { name: "Remember", exact: true }).click();
  await page.getByRole("button", { name: "Text input", exact: true }).click();
  await page.getByLabel("Encounter note").fill("Separate text draft");
  await page.getByRole("button", { name: "Form input", exact: true }).click();
  await page.getByLabel("Person", { exact: true }).fill("Draft Mira");
  await page.getByLabel("Notes", { exact: true }).fill("Keep the form reminder");
  await page.getByRole("button", { name: "Find", exact: true }).click();
  await firstEncounter(page).focus(); await page.keyboard.press("Enter");
  await expect(page.getByRole("button", { name: "Form input", exact: true })).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByLabel("Person", { exact: true })).toBeFocused();
  await expect(page.getByLabel("Person", { exact: true })).toHaveValue("Draft Mira");
  await expect(page.getByLabel("Notes", { exact: true })).toHaveValue("Keep the form reminder");
  await page.getByRole("button", { name: "Text input", exact: true }).click();
  await expect(page.getByLabel("Encounter note")).toHaveValue("Separate text draft");
  await page.getByRole("button", { name: "Voice input", exact: true }).click();
  await page.getByRole("button", { name: "Find", exact: true }).click();
  await firstEncounter(page).focus(); await page.keyboard.press("Enter");
  await expect(page.getByRole("button", { name: "Voice input", exact: true })).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByRole("button", { name: "Start recording", exact: true })).toBeFocused();
  expect(await page.evaluate(() => window.syntheticMicrophoneRequests)).toBe(0);
  expect(writes(state)).toHaveLength(0); expect(state.calls.filter(call => call.path === "/memories/transcribe")).toHaveLength(0);
});

test("A6 first-encounter guidance appears only after a successful empty read, not during loading or failure", async ({ page }) => {
  const gate = deferred(); const state = await setup(page, { empty: true, initialList: () => gate.promise });
  try {
    await expect(page.getByText("Loading saved people…", { exact: true })).toBeVisible();
    await expect(firstEncounter(page)).toHaveCount(0);
    await expect(page.getByText("No saved people yet.", { exact: true })).toHaveCount(0);
  } finally { gate.resolve({ error: "INTERNAL_ERROR" }); }
  await expect(page.getByRole("alert")).toBeVisible();
  await expect(firstEncounter(page)).toHaveCount(0);
  await expect(page.getByText("No saved people yet.", { exact: true })).toHaveCount(0);
  state.handlers["/memories/list"] = () => ({ memories: [] });
  await page.getByRole("button", { name: "Retry", exact: true }).click();
  await expect(firstEncounter(page)).toBeVisible(); expect(writes(state)).toHaveLength(0);
});

test("A6 ten distinct encounters retain uncertainty, edited-source meaning and independently collapsed original notes", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 }); const state = await setup(page);
  await expect(page.getByText("AI summaries can be mistaken", { exact: false })).toContainText("current encounter");
  await expect(page.getByRole("heading", { name: "Mira Chen", exact: true })).toHaveCount(2);
  const rows = page.locator(".contact-list > .contact-row"), first = rows.nth(0), second = rows.nth(1);
  await first.locator(".contact-name").focus(); await page.keyboard.press("Enter");
  await expect(first.getByText("Builds solar panels and designs batteries", { exact: true })).toBeVisible();
  await expect(first.locator(".personal-notes")).not.toHaveAttribute("open");
  await first.getByText("Personal notes", { exact: true }).click();
  await expect(first.getByText("This is the first saved wording", { exact: false })).toBeVisible();
  await expect(first.locator("blockquote")).toHaveText(originalMira);
  await expect(second.locator(".personal-notes")).not.toHaveAttribute("open");
  await second.locator(".contact-name").click();
  await expect(second.getByText("Marine biologist", { exact: true })).toBeVisible();
  await second.getByText("Personal notes", { exact: true }).click();
  await expect(second.getByText("This is the first saved wording", { exact: false })).toHaveCount(0);
  await expect(second.locator("blockquote")).toHaveText(encounters[1].content);
  await second.getByRole("button", { name: "Edit Mira Chen", exact: true }).click();
  await expect(page.getByRole("dialog").getByLabel("Does", { exact: true })).toHaveValue("Marine biologist");
  await page.keyboard.press("Escape");
  expect(state.calls.findLast(call => call.path === "/memories/prepare-edit").input.memory).toBe(encounters[1].memory);
  const unnamed = rows.nth(2); await unnamed.locator(".contact-name").click();
  await expect(unnamed.getByRole("heading", { name: "Unnamed encounter", exact: true })).toBeVisible();
  await expect(unnamed.getByText(/^May be: /)).toBeVisible();
  const quinn = rows.nth(5); await quinn.locator(".contact-name").click();
  await expect(quinn.locator(".contact-body")).toContainText("Café, 海洋 and 🪸");
  await expect(quinn.locator(".contact-body")).toContainText("quinn@example.test");
  await expect(quinn.locator(".contact-body")).toContainText("https://example.test/乔");
  await expect(rows.nth(6).getByRole("heading")).toHaveText(longName);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  expect(writes(state)).toHaveLength(0);
  await page.screenshot({ path: "../tests/output/browser-artifacts/p4-dense-desktop.png", fullPage: true });
});

for (const width of [320, 390]) test(`A6 dense ${width}px content and keyboard dialogs keep complete data reachable`, async ({ page }) => {
  await page.setViewportSize({ width, height: 800 }); const state = await setup(page);
  const rows = page.locator(".contact-list > .contact-row"), quinn = rows.nth(5), sasha = rows.nth(8);
  await quinn.locator(".contact-name").click();
  await expect(quinn.locator(".contact-body")).toContainText("https://example.test/乔");
  await expect(rows.nth(6).getByRole("heading")).toHaveText(longName);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await quinn.getByRole("button", { name: "Edit Quinn 乔", exact: true }).click();
  const dialog = page.getByRole("dialog", { name: "Edit encounter", exact: true });
  await expect(dialog.getByLabel("Contact", { exact: true })).toHaveValue(multilineContact);
  await page.keyboard.press("Escape");
  await sasha.getByRole("button", { name: "Edit Sasha", exact: true }).click();
  await expect(dialog.getByLabel("Person", { exact: true })).toBeFocused();
  await expect(dialog.getByLabel("Notes", { exact: true })).toHaveValue(longNotes);
  const cancel = dialog.getByRole("button", { name: "Cancel", exact: true }), save = dialog.getByRole("button", { name: "Save changes", exact: true });
  await cancel.focus(); await expect(cancel).toBeInViewport();
  await page.keyboard.press("Tab"); await expect(save).toBeFocused();
  await page.keyboard.press("Tab"); await expect(dialog.getByLabel("Person", { exact: true })).toBeFocused();
  await page.keyboard.press("Shift+Tab"); await expect(save).toBeFocused();
  expect(await dialog.evaluate(element => element.scrollWidth <= element.clientWidth)).toBe(true);
  await page.screenshot({ path: `../tests/output/browser-artifacts/p4-editor-${width}.png` });
  await page.keyboard.press("Escape"); await expect(dialog).toHaveCount(0);
  await expect(sasha.getByRole("button", { name: "Edit Sasha", exact: true })).toBeFocused();
  await rows.nth(6).getByRole("button", { name: `Remove ${longName}`, exact: true }).click();
  const removal = page.getByRole("dialog");
  await expect(removal.getByRole("button", { name: "Cancel", exact: true })).toBeFocused();
  await page.keyboard.press("Enter"); await expect(removal).toHaveCount(0);
  expect(writes(state)).toHaveLength(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: `../tests/output/browser-artifacts/p4-dense-${width}.png`, fullPage: true });
});

test("A6 reduced motion leaves artwork still while the task works without hovering it", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" }); const state = await setup(page);
  const arm = page.locator('[data-dancer="0"] [data-limb="right-arm"]');
  const before = await arm.getAttribute("d");
  await page.locator(".articulated-scene").hover({ force: true });
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
  expect(await arm.getAttribute("d")).toBe(before);
  await page.getByRole("button", { name: "Remember", exact: true }).click();
  const content = "Met Taylor. Taylor builds accessible sensors.";
  await page.getByLabel("Encounter note").fill(content);
  await page.getByRole("button", { name: "Save", exact: true }).click();
  await expect(page.getByText("Memory saved.", { exact: true })).toBeVisible();
  expect(writes(state)).toHaveLength(1); expect(writes(state)[0].input.content).toBe(content);
  await page.screenshot({ path: "../tests/output/browser-artifacts/p4-reduced-motion.png" });
});

test.describe("A6 touch-only interface", () => {
  test.use({ hasTouch: true, isMobile: true, viewport: { width: 390, height: 844 } });
  test("capture and review controls work without hover", async ({ page }) => {
    const state = await setup(page);
    await page.getByRole("button", { name: "Remember", exact: true }).tap();
    await page.getByRole("button", { name: "Form input", exact: true }).tap();
    await page.getByLabel("Person", { exact: true }).fill("Touch Mira");
    await page.getByLabel("Does", { exact: true }).fill("Builds sensors");
    await page.getByRole("button", { name: "Save", exact: true }).tap();
    await expect(page.getByText("Memory saved.", { exact: true })).toBeVisible();
    expect(writes(state)).toHaveLength(1); expect(writes(state)[0].input.content).toContain("Does: Builds sensors");
    await page.getByRole("button", { name: "Edit Touch Mira", exact: true }).tap();
    await expect(page.getByRole("dialog").getByLabel("Person", { exact: true })).toHaveValue("Touch Mira");
    await page.getByRole("dialog").getByRole("button", { name: "Cancel", exact: true }).tap();
    await expect(page.getByRole("dialog")).toHaveCount(0);
    expect(writes(state)).toHaveLength(1);
    await page.screenshot({ path: "../tests/output/browser-artifacts/p4-touch.png" });
  });
});
