import { afterAll, afterEach, expect, test } from "bun:test";
import { createGateway } from "@mit-sdg/sync-engine/boundary";
import { createHttpHandler } from "@mit-sdg/sync-engine-http/handler";
import { assembleApplication } from "../../src/assembly.ts";
import { circleHttpPolicy } from "../../src/host/http.ts";
import { cleanupDatabases, testDatabase } from "../support/reusable/mongo.ts";
import { FixtureBrain } from "../support/brain.ts";
import { MemoryProvider } from "../../src/concepts/Federating/provider.ts";

const origin = "https://circle.example.test";
const apps: ReturnType<typeof assembleApplication>[] = [];
afterEach(async () => { for (const app of apps.splice(0)) await app.beginDrain(); });
afterAll(cleanupDatabases);
async function setup() {
  const database = await testDatabase(), commons = new MemoryProvider();
  const application = assembleApplication(database, { commons, brain: new FixtureBrain() });
  apps.push(application);
  const handle = createHttpHandler({ application, gateway: createGateway({ application }), policy: circleHttpPolicy(origin) });
  function browser() {
    const jar = new Map<string, string>();
    async function post(path: string, body: object = {}, requestOrigin = origin) {
      const response = await handle(new Request(`${origin}/api${path}`, { method: "POST", headers: {
        "Content-Type": "application/json", Origin: requestOrigin, Cookie: [...jar].map(([key, value]) => `${key}=${value}`).join("; "),
      }, body: JSON.stringify(body) }));
      const cookies = response.headers.getSetCookie();
      for (const line of cookies) { const [name, value] = line.split(";")[0]!.split("="); if (value) jar.set(name!, value); else jar.delete(name!); }
      return { status: response.status, body: await response.json(), cookies };
    }
    return { post, jar };
  }
  return { database, browser, commons };
}

test("public guest entry enforces origin and empty input before effects; ordinary protected cookies clear on logout", async () => {
  const { browser, database } = await setup(), guest = browser();
  expect((await guest.post("/auth/test", {}, "https://foreign.example.test")).status).toBe(403);
  for (const field of ["username", "user", "owner", "session", "content"]) {
    expect(await guest.post("/auth/test", { [field]: "injected" })).toMatchObject({ status: 400, body: { error: "INVALID_REQUEST" } });
  }
  expect(await database.collection("registering.users").countDocuments()).toBe(0);
  const entry = await guest.post("/auth/test");
  expect(entry.status).toBe(200); expect(entry.body.username).toMatch(/^test_[a-f0-9]{24}$/u);
  expect(entry.body).not.toHaveProperty("session"); expect(entry.body).not.toHaveProperty("expiresAt");
  expect(entry.cookies).toHaveLength(1);
  expect(entry.cookies[0]!.startsWith("__Host-circle-session=")).toBe(true);
  for (const setting of ["HttpOnly", "Secure", "SameSite=Strict", "Path=/", "Expires="]) expect(entry.cookies[0]!.includes(setting)).toBe(true);
  expect(await guest.post("/auth/me")).toMatchObject({ status: 200, body: { username: entry.body.username } });
  expect(await guest.post("/auth/logout")).toMatchObject({ status: 200 });
  expect(guest.jar.has("__Host-circle-session")).toBe(false);
  expect((await guest.post("/memories/list", { after: "" })).status).toBe(401);
});

test("two fresh guests and an ordinary Commons account cannot list, edit or remove each other's encounters", async () => {
  const { browser, commons, database } = await setup();
  const one = browser(), two = browser(), personal = browser();
  const first = await one.post("/auth/test"), second = await two.post("/auth/test");
  expect(first.body.user).not.toBe(second.body.user); expect(first.body.username).not.toBe(second.body.username);
  const start = await personal.post("/auth/commons/start");
  const approval = commons.approve(start.body.address, { subject: "personal-subject", username: "personal" });
  expect((await personal.post("/auth/commons/finish", approval)).status).toBe(200);
  const browsers = [one, two, personal];
  const memories: string[] = [];
  for (const [index, client] of browsers.entries()) {
    const saved = await client.post("/memories/remember", { content: `Met person ${index}. We discussed sensors.`, submission: crypto.randomUUID() });
    expect(saved.status).toBe(200); memories.push(saved.body.memory);
  }
  for (const [index, client] of browsers.entries()) {
    const listed = await client.post("/memories/list", { after: "" });
    expect(listed.body.memories.map((row: { memory: string }) => row.memory)).toEqual([memories[index]]);
    for (const [other, memory] of memories.entries()) if (other !== index) {
      expect((await client.post("/memories/edit", { memory, content: "Foreign edit", revision: 0, submission: crypto.randomUUID() })).status).toBe(404);
      expect((await client.post("/memories/forget", { memory })).status).toBe(404);
    }
  }
  expect(await database.collection("remembering.memories").countDocuments({ removed: { $ne: true } })).toBe(3);
});
