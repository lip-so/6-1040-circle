import { afterAll, afterEach, describe, expect, test } from "bun:test";
import { createGateway } from "@mit-sdg/sync-engine/boundary";
import { createHttpHandler } from "@mit-sdg/sync-engine-http/handler";
import { writeMemoryFields } from "../../src/memory-fields.ts";
import { assembleApplication } from "../../src/assembly.ts";
import { MemoryProvider, type Identity } from "../../src/concepts/Federating/provider.ts";
import { GraphingConcept } from "../../src/concepts/Graphing.ts";
import { circleHttpPolicy } from "../../src/host/http.ts";
import { cleanupDatabases, testDatabase } from "../support/reusable/mongo.ts";

afterAll(cleanupDatabases);

const ORIGIN = "http://localhost:3000";
const SAM = { subject: "commons-sam", username: "sam" };
const LEO = { subject: "commons-leo", username: "leo" };
const NOTE = "Met Faustin, founder of an AI-chip startup. We talked about systems engineering.";
const applications: ReturnType<typeof assembleApplication>[] = [];
afterEach(async () => { for (const app of applications.splice(0)) await app.beginDrain(); });

async function setup(failure?: "ingest" | "trace" | "ingest-once") {
  const database = await testDatabase();
  const commons = new MemoryProvider();
  const graph = new GraphingConcept(database);
  if (failure === "ingest-once") {
    const original = graph.ingest.bind(graph);
    let failed = false;
    graph.ingest = async function ingest(input) {
      if (!failed) { failed = true; throw new Error("index unavailable"); }
      return original(input);
    };
  }
  if (failure === "ingest") graph.ingest = async function ingest() { throw new Error("index unavailable"); };
  if (failure === "trace") graph._trace = async function _trace() { throw new Error("search unavailable"); };
  const application = assembleApplication(database, { commons, instances: { Graphing: graph } });
  applications.push(application);
  const handle = createHttpHandler({ application, gateway: createGateway({ application }), policy: circleHttpPolicy(ORIGIN) });

  // Cookie handling follows Conceptbox's signing-in-http test. Each browser
  // retains only its own credentials, exactly as the HTTP adapter issues them.
  function browser() {
    const jar = new Map<string, string>();
    async function post(path: string, body: object = {}, origin = ORIGIN) {
      if (path === "/memories/remember" && !Object.hasOwn(body, "submission")) body = { ...body, submission: crypto.randomUUID() };
      const response = await handle(new Request(`${ORIGIN}/api${path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Origin: origin, Cookie: [...jar].map(([k, v]) => `${k}=${v}`).join("; ") },
        body: JSON.stringify(body),
      }));
      const cookies = response.headers.getSetCookie();
      for (const line of cookies) {
        const [name, value] = line.split(";")[0]!.split("=");
        if (value) jar.set(name!, value); else jar.delete(name!);
      }
      return { status: response.status, body: await response.json(), cookies };
    }
    async function signIn(identity: Identity) {
      const start = await post("/auth/commons/start");
      expect(start.status).toBe(200);
      const { code, state } = commons.approve(start.body.address, identity);
      const finish = await post("/auth/commons/finish", { code, state });
      expect(finish.status).toBe(200);
      return finish.body.user as string;
    }
    return { jar, post, signIn };
  }
  return { database, commons, browser };
}

describe("Circle authenticated flows", () => {
  test("Commons sign-in, save, index, search, original note, and sign-out work from an empty database", async () => {
    const { browser, database } = await setup();
    const sam = browser();
    const owner = await sam.signIn(SAM);
    expect(await sam.post("/auth/me")).toMatchObject({ status: 200, body: { username: "sam" } });
    const saved = await sam.post("/memories/remember", { content: NOTE });
    expect(saved.status).toBe(200);
    expect(await database.collection("graphing.sources").findOne({ _id: saved.body.memory })).toMatchObject({ owner });
    const found = await sam.post("/needs/seek", { description: "systems engineering at an AI startup" });
    expect(found).toMatchObject({ status: 200, body: { results: { suggestions: [{ label: "Faustin", source: saved.body.memory, content: NOTE }] } } });
    expect(found.body.results.suggestions[0].reason).toContain("systems engineering");
    expect(await sam.post("/auth/logout")).toMatchObject({ status: 200 });
    expect(sam.jar.has("__Host-circle-session")).toBe(false);
    expect(await sam.post("/needs/seek", { description: "systems engineering" })).toMatchObject({ status: 401 });
  });

  test("a guided memo keeps its entered fields through save, indexing, and an owned search", async () => {
    const { browser, database } = await setup();
    const sam = browser();
    const owner = await sam.signIn(SAM);
    const content = writeMemoryFields({ person: "mira chen", when: "October 16, 2026", does: "Marine biologist", discussed: "Ocean sensors" });
    const saved = await sam.post("/memories/remember", { content });
    expect(saved.status).toBe(200);
    expect(await database.collection("remembering.memories").findOne({ owner })).toMatchObject({ content });
    expect(await sam.post("/needs/seek", { description: "ocean sensors" })).toMatchObject({
      status: 200, body: { results: { suggestions: [{ label: "mira chen", source: saved.body.memory, content }] } },
    });
  });

  test("two signed-in users get only their own notes and graph, including the same person's name", async () => {
    const { browser } = await setup();
    const sam = browser(), leo = browser();
    await sam.signIn(SAM);
    await leo.signIn(LEO);
    await sam.post("/memories/remember", { content: NOTE });
    expect(await leo.post("/needs/seek", { description: "systems engineering" })).toMatchObject({ status: 200, body: { results: { suggestions: [] } } });
    const leosNote = "Met Faustin, founder of a marine biology startup. We discussed ocean research.";
    await leo.post("/memories/remember", { content: leosNote });
    expect(await sam.post("/needs/seek", { description: "marine biology" })).toMatchObject({ status: 200, body: { results: { suggestions: [] } } });
    const own = await leo.post("/needs/seek", { description: "marine biology" });
    expect(own.body.results.suggestions).toMatchObject([{ content: leosNote }]);
  });

  test("a body cannot pick the owner or source, supply a session without its cookie, or invoke indexing", async () => {
    const { browser, database } = await setup();
    const sam = browser(), anonymous = browser();
    await sam.signIn(SAM);
    const session = sam.jar.get("__Host-circle-session");
    expect(await anonymous.post("/memories/remember", { content: NOTE, session })).toMatchObject({ status: 401 });
    expect(await sam.post("/memories/remember", { content: NOTE, owner: "commons-leo" })).toMatchObject({ status: 400 });
    expect(await sam.post("/memories/remember", { content: NOTE, source: "another-note" })).toMatchObject({ status: 400 });
    expect(await sam.post("/needs/seek", { description: "systems", owner: "commons-leo" })).toMatchObject({ status: 400 });
    expect((await sam.post("/graphing/ingest", { owner: "commons-leo", source: "another-note", content: NOTE })).status).not.toBe(200);
    expect(await database.collection("remembering.memories").countDocuments()).toBe(0);
    expect(await database.collection("graphing.sources").countDocuments()).toBe(0);
  });

  test("unauthenticated and expired sessions save nothing; blank notes and needs use their declared refusals", async () => {
    const { browser, database } = await setup();
    const sam = browser();
    expect(await sam.post("/memories/remember", { content: NOTE })).toMatchObject({ status: 401 });
    await sam.signIn(SAM);
    expect(await sam.post("/memories/remember", { content: "   " })).toMatchObject({ status: 400 });
    expect(await sam.post("/needs/seek", { description: " " })).toMatchObject({ status: 400 });
    await database.collection("sessioning.sessions").updateMany({}, { $set: { expiresAt: new Date(0) } });
    expect(await sam.post("/needs/seek", { description: "systems" })).toMatchObject({ status: 401 });
    expect(await database.collection("remembering.memories").countDocuments()).toBe(0);
    expect(await database.collection("seeking.needs").countDocuments()).toBe(0);
  });

  test("indexing failure keeps the original note and returns an error", async () => {
    const { browser, database } = await setup("ingest");
    const sam = browser();
    const owner = await sam.signIn(SAM);
    expect(await sam.post("/memories/remember", { content: NOTE })).toMatchObject({ status: 500 });
    expect(await database.collection("remembering.memories").findOne({ owner })).toMatchObject({ content: NOTE });
  });

  test("search failure keeps the saved need and returns an error", async () => {
    const { browser, database } = await setup("trace");
    const sam = browser();
    const owner = await sam.signIn(SAM);
    expect(await sam.post("/needs/seek", { description: "systems engineering" })).toMatchObject({ status: 500 });
    expect(await database.collection("seeking.needs").findOne({ owner })).toMatchObject({ description: "systems engineering" });
  });

  test("a missing original source is omitted from otherwise owned search results", async () => {
    const { browser, database } = await setup();
    const sam = browser();
    await sam.signIn(SAM);
    const saved = await sam.post("/memories/remember", { content: NOTE });
    await database.collection("remembering.memories").deleteOne({ _id: saved.body.memory });
    expect(await sam.post("/needs/seek", { description: "systems engineering" })).toMatchObject({ status: 200, body: { results: { suggestions: [] } } });
  });

  test("Commons' stable subject returns to the same Circle owner after its username changes", async () => {
    const { browser } = await setup();
    const sam = browser();
    const first = await sam.signIn(SAM);
    await sam.post("/memories/remember", { content: NOTE });
    await sam.post("/auth/logout");
    expect(await sam.signIn({ ...SAM, username: "sam-renamed" })).toBe(first);
    const found = await sam.post("/needs/seek", { description: "systems engineering" });
    expect(found.body.results.suggestions).toMatchObject([{ content: NOTE }]);
  });

  test("sign-in is bound to its browser and PKCE verifier; HTTP hides credentials and refuses other origins", async () => {
    const { browser, commons } = await setup();
    const sam = browser(), leo = browser();
    const sams = await sam.post("/auth/commons/start");
    expect(Object.keys(sams.body)).toEqual(["address"]);
    expect(sams.cookies[0]).toContain("HttpOnly");
    expect(sams.cookies[0]).toContain("Secure");
    const theirs = commons.approve(sams.body.address, SAM);
    await leo.post("/auth/commons/start");
    expect(await leo.post("/auth/commons/finish", { ...theirs, attempt: sam.jar.get("__Host-circle-sign-in") })).toMatchObject({ status: 403 });
    const finished = await sam.post("/auth/commons/finish", theirs);
    expect(finished.status).toBe(200);
    expect(Object.keys(finished.body)).toEqual(["user"]);
    expect(sam.jar.has("__Host-circle-sign-in")).toBe(false);
    expect(await sam.post("/memories/remember", { content: NOTE }, "https://unrelated.example")).toMatchObject({ status: 403 });
  });

  test("a duplicate Commons username uses the blueprint's choose flow without linking the wrong user", async () => {
    const { browser, commons } = await setup();
    const sam = browser(), other = browser();
    const original = await sam.signIn(SAM);
    const start = await other.post("/auth/commons/start");
    const approval = commons.approve(start.body.address, { ...LEO, username: "sam" });
    expect(await other.post("/auth/commons/finish", approval)).toMatchObject({ status: 409 });
    expect(await other.post("/auth/commons/choose", { username: "leo" })).toMatchObject({ status: 200 });
    expect(await other.post("/auth/me")).toMatchObject({ body: { username: "leo" } });
    expect(await sam.post("/auth/me")).toMatchObject({ body: { username: "sam" } });
    expect(await other.signIn(LEO)).not.toBe(original);
  });
});


describe("Saved people HTTP edge cases", () => {
  test("listing authenticates first, rejects owner/timestamp input, and never returns another user's notes", async () => {
    const { browser } = await setup();
    const sam = browser(), leo = browser();
    expect(await sam.post("/memories/list", { after: "" })).toMatchObject({ status: 401 });
    await sam.signIn(SAM);
    await leo.signIn(LEO);
    expect(await sam.post("/memories/list", { after: "" })).toMatchObject({ status: 200, body: { memories: [] } });
    const own = await sam.post("/memories/remember", { content: NOTE });
    const other = await leo.post("/memories/remember", { content: "Private note" });
    expect(await sam.post("/memories/list", { after: "" })).toMatchObject({ status: 200, body: { memories: [{ memory: own.body.memory, content: NOTE }] } });
    expect(await sam.post("/memories/list", { after: other.body.memory })).toMatchObject({ status: 200, body: { memories: [] } });
    expect(await sam.post("/memories/list", { after: "", owner: "someone-else" })).toMatchObject({ status: 400 });
    expect(await sam.post("/memories/remember", { content: NOTE, capturedAt: "2020-01-01" })).toMatchObject({ status: 400 });
    expect(await sam.post("/memories/remember", { content: NOTE, submission: "invalid" })).toMatchObject({ status: 400 });
    expect(await sam.post("/memories/remember", { content: NOTE, submission: undefined })).toMatchObject({ status: 400 });
    await sam.post("/auth/logout");
    expect(await sam.post("/memories/list", { after: "" })).toMatchObject({ status: 401 });
  });

  test("a note remains visible after indexing failure and a manual retry does not duplicate it", async () => {
    const { browser, database } = await setup("ingest-once");
    const sam = browser();
    await sam.signIn(SAM);
    const input = { content: NOTE, submission: crypto.randomUUID() };
    expect(await sam.post("/memories/remember", input)).toMatchObject({ status: 500 });
    const listed = await sam.post("/memories/list", { after: "" });
    expect(listed.body.memories).toHaveLength(1);
    expect(listed.body.memories[0].content).toBe(NOTE);
    const retry = await sam.post("/memories/remember", input);
    expect(retry).toMatchObject({ status: 200, body: { memory: listed.body.memories[0].memory } });
    expect(await database.collection("remembering.memories").countDocuments()).toBe(1);
    expect(await database.collection("graphing.sources").countDocuments()).toBe(1);
    expect(await sam.post("/memories/remember", { ...input, content: "Different note" })).toMatchObject({ status: 409 });
  });
});
