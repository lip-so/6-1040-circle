import { test, expect } from "@playwright/test";
import { readFile, mkdir } from "node:fs/promises";
const fixtures = JSON.parse(await readFile(new URL("../../../../design-docs/p5/data/encounters.json", import.meta.url), "utf8"));
const username = `test_${"a".repeat(24)}`;
const output = "/private/tmp/circle-p5-cleanup";
function deferred() { let resolve; const promise = new Promise(done => resolve = done); return { promise, resolve }; }
async function setup(page) {
  const state = { username: null, calls: [], rows: [], remember: null, logout: null, entry: null };
  await page.route("**/api/**", async route => {
    if (!new URL(route.request().url()).pathname.startsWith("/api/")) return route.continue();
    const path = new URL(route.request().url()).pathname.slice(4), input = route.request().postDataJSON();
    state.calls.push({ path, input });
    let answer;
    if (path === "/auth/me") answer = state.username ? { username: state.username } : { error: "UNAUTHORIZED" };
    else if (path === "/auth/test") { answer = state.entry ? await state.entry() : { user: "guest", username }; if (!answer.error) state.username = answer.username; }
    else if (path === "/auth/logout") { answer = state.logout ? await state.logout() : {}; if (!answer.error || answer.error === "UNAUTHORIZED") state.username = null; }
    else if (path === "/memories/list") answer = { memories: state.rows };
    else if (path === "/memories/remember") {
      answer = state.remember ? await state.remember(input) : { memory: `memory-${state.calls.length}` };
      if (!answer.error) state.rows.unshift({ memory: answer.memory, content: input.content, original: input.content, revision: 0, referenceDate: "2026-11-02", card: null });
    } else throw Error(`Unexpected API path: ${path}`);
    await route.fulfill({ status: answer.error === "UNAUTHORIZED" ? 401 : answer.error ? 500 : 200, json: answer }).catch(() => {});
  });
  await page.goto("/");
  await expect(page.getByRole("button", { name: "Try test mode", exact: true })).toBeVisible();
  return state;
}
const saves = state => state.calls.filter(call => call.path === "/memories/remember");
const entries = state => state.calls.filter(call => call.path === "/auth/test");
async function settle(page) { await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))); }

test("explicit entry guards duplicate clicks and organizes 24 exact sample notes sequentially with honest progress", async ({ page }) => {
  const state = await setup(page), entry = deferred(), note = deferred();
  await mkdir(output, { recursive: true });
  await page.screenshot({ path: `${output}/test-mode-sign-in.png`, fullPage: true });
  state.entry = () => entry.promise;
  state.remember = input => saves(state).length === 1 ? note.promise : { memory: crypto.randomUUID() };
  await page.getByRole("button", { name: "Try test mode", exact: true }).evaluate(button => { button.click(); button.click(); });
  await expect(page.getByRole("button", { name: "Opening test mode…" })).toBeDisabled();
  expect(entries(state)).toHaveLength(1);
  entry.resolve({ user: "guest", username });
  await expect(page.getByRole("status").filter({ hasText: "0 of 24" })).toBeVisible();
  await expect.poll(() => saves(state).length).toBe(1);
  await settle(page); expect(saves(state)).toHaveLength(1);
  expect(state.calls.filter(call => call.path === "/memories/list")).toHaveLength(0);
  note.resolve({ memory: "first" });
  await expect(page.getByRole("heading", { name: "Recent people" })).toBeVisible();
  expect(saves(state)).toHaveLength(24);
  expect(saves(state).map(call => call.input.content)).toEqual(fixtures.encounters.map(note => note.content));
  expect(new Set(saves(state).map(call => call.input.submission)).size).toBe(24);
  expect(saves(state).every(call => Object.keys(call.input).sort().join(",") === "content,submission,timeZone")).toBe(true);
  await expect(page.getByText("Test mode — 24 fictional encounters", { exact: true })).toBeVisible();
  await expect(page.getByText("Test account", { exact: true })).toBeVisible();
  await page.screenshot({ path: `${output}/test-mode-workspace.png`, fullPage: false });
});

test("processing failure stops setup; deliberate retry keeps account, exact request and completed position", async ({ page }) => {
  const state = await setup(page), retry = deferred();
  let failed = false;
  state.remember = () => {
    if (saves(state).length === 3) { failed = true; return { error: "INTERNAL_ERROR" }; }
    if (failed && saves(state).length === 4) return retry.promise;
    return { memory: crypto.randomUUID() };
  };
  await page.getByRole("button", { name: "Try test mode" }).click();
  await expect(page.getByRole("alert")).toContainText("may already be saved");
  await expect(page.getByRole("status").filter({ hasText: "2 of 24" })).toBeVisible();
  await settle(page); expect(saves(state)).toHaveLength(3);
  const exact = saves(state)[2].input;
  await page.getByRole("button", { name: "Retry setup", exact: true }).evaluate(button => { button.click(); button.click(); });
  await expect.poll(() => saves(state).length).toBe(4);
  expect(saves(state)[3].input).toEqual(exact); expect(entries(state)).toHaveLength(1);
  retry.resolve({ memory: "retried" });
  await expect(page.getByRole("heading", { name: "Recent people" })).toBeVisible();
  expect(saves(state)).toHaveLength(25);
  expect(saves(state).slice(4).map(call => call.input.content)).toEqual(fixtures.encounters.slice(3).map(note => note.content));
});

test("reload confirms the normal cookie account and resumes the persisted exact failed request", async ({ page }) => {
  const state = await setup(page);
  state.remember = () => saves(state).length === 3 ? { error: "INTERNAL_ERROR" } : { memory: crypto.randomUUID() };
  await page.getByRole("button", { name: "Try test mode" }).click();
  await expect(page.getByRole("alert")).toContainText("may already be saved");
  const exact = saves(state)[2].input, beforeReload = state.calls.length;
  const stored = await page.evaluate(() => JSON.parse(sessionStorage.getItem("circle-test-setup-v1")));
  expect(stored.completed).toBe(2); expect(stored.username).toBe(username);
  expect(Object.keys(stored).sort()).toEqual(["completed", "notes", "username", "version"]);
  await page.reload();
  await expect(page.getByRole("heading", { name: "Recent people" })).toBeVisible();
  expect(state.calls[beforeReload].path).toBe("/auth/me");
  expect(saves(state)[3].input).toEqual(exact); expect(entries(state)).toHaveLength(1);
  expect(saves(state)).toHaveLength(25);
});

test("an account change during setup invalidates late replies and reload never seeds the other account", async ({ page }) => {
  const state = await setup(page), gate = deferred();
  state.remember = () => gate.promise;
  await page.getByRole("button", { name: "Try test mode" }).click();
  await expect.poll(() => saves(state).length).toBe(1);
  state.username = "personal";
  await page.evaluate(() => window.dispatchEvent(new Event("focus")));
  await expect(page.getByRole("alert")).toContainText("account changed");
  await expect(page.getByText("personal", { exact: true })).toBeVisible();
  gate.resolve({ memory: "late" }); await settle(page);
  expect(saves(state)).toHaveLength(1);
  await page.reload();
  await expect(page.getByRole("alert")).toContainText("account changed");
  await expect(page.getByText("Test mode — 24 fictional encounters", { exact: true })).toHaveCount(0);
  await settle(page); expect(saves(state)).toHaveLength(1);
});

test("exit while a save is pending stops dispatch; logout failure preserves the account until explicit retry succeeds", async ({ page }) => {
  const state = await setup(page), gate = deferred();
  state.remember = () => gate.promise;
  state.logout = () => ({ error: "INTERNAL_ERROR" });
  await page.getByRole("button", { name: "Try test mode" }).click();
  await expect.poll(() => saves(state).length).toBe(1);
  await page.getByRole("button", { name: "Exit test mode", exact: true }).click();
  await expect(page.getByRole("alert").filter({ hasText: "couldn't sign you out" })).toBeVisible();
  expect(await page.evaluate(() => !!sessionStorage.getItem("circle-test-setup-v1"))).toBe(true);
  await expect(page.getByText("Test account", { exact: true })).toBeVisible();
  gate.resolve({ memory: "late" }); await settle(page); expect(saves(state)).toHaveLength(1);
  state.logout = null;
  await page.getByRole("button", { name: "Exit test mode", exact: true }).click();
  await expect(page.getByRole("button", { name: "Try test mode", exact: true })).toBeVisible();
  expect(await page.evaluate(() => sessionStorage.getItem("circle-test-setup-v1"))).toBe(null);
  expect(saves(state)).toHaveLength(1); expect(entries(state)).toHaveLength(1);
});

test("unconfirmed entry and an ended reload never create replacement accounts or continue saving", async ({ page }) => {
  const state = await setup(page);
  state.entry = () => ({ error: "INTERNAL_ERROR" });
  await page.getByRole("button", { name: "Try test mode", exact: true }).click();
  await expect(page.getByRole("alert")).toContainText("account or session may already exist");
  await expect(page.getByRole("button", { name: "Sign in with Commons" })).toBeDisabled();
  await settle(page); expect(entries(state)).toHaveLength(1); expect(saves(state)).toHaveLength(0);
  state.entry = null;
  state.remember = () => ({ error: "INTERNAL_ERROR" });
  await page.getByRole("button", { name: "Retry test entry", exact: true }).click();
  await expect(page.getByRole("alert")).toContainText("may already be saved");
  state.username = null;
  await page.reload();
  await expect(page.getByRole("alert")).toContainText("session could not be confirmed");
  await expect(page.getByText("Test mode — 24 fictional encounters", { exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "Try test mode", exact: true })).toHaveCount(0);
  await settle(page); expect(entries(state)).toHaveLength(2); expect(saves(state)).toHaveLength(1);
  state.logout = () => ({ error: "UNAUTHORIZED" });
  await page.getByRole("button", { name: "Exit test mode", exact: true }).click();
  await expect(page.getByRole("button", { name: "Try test mode", exact: true })).toBeVisible();
  expect(await page.evaluate(() => sessionStorage.getItem("circle-test-setup-v1"))).toBe(null);
});
