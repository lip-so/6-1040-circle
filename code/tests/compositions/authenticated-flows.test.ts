import { afterAll, afterEach, describe, expect, test } from "bun:test";
import { MongoClient, type Db } from "mongodb";
import { RememberingConcept, SubmissionConflict } from "../../src/concepts/Remembering.ts";
import { createGateway } from "@mit-sdg/sync-engine/boundary";
import { createHttpHandler } from "@mit-sdg/sync-engine-http/handler";
import { writeMemoryFields } from "../../src/memory-fields.ts";
import { assembleApplication } from "../../src/assembly.ts";
import { MemoryProvider, type Identity } from "../../src/concepts/Federating/provider.ts";
import { GraphingConcept } from "../../src/concepts/Graphing.ts";
import { circleHttpPolicy } from "../../src/host/http.ts";
import { cleanupDatabases, testDatabase } from "../support/reusable/mongo.ts";

afterAll(cleanupDatabases);

import { FixtureBrain } from "../support/brain.ts";

const ORIGIN = "http://localhost:3000";
const SAM = { subject: "commons-sam", username: "sam" };
const LEO = { subject: "commons-leo", username: "leo" };
const NOTE = "Met Faustin, founder of an AI-chip startup. We talked about systems engineering.";
const applications: ReturnType<typeof assembleApplication>[] = [];
afterEach(async () => { for (const app of applications.splice(0)) await app.beginDrain(); });

async function setup(failure?: "ingest" | "trace" | "ingest-once" | "withdraw-once" | "edit-ingest-once" | "disappear-save" | "disappear-edit" | "disappear-prepare" | "disappear-results" | "disappear-need", databaseOverride?: Db) {
  const database = databaseOverride ?? await testDatabase();
  const commons = new MemoryProvider();
  const graph = new GraphingConcept(database, new FixtureBrain());
  if (failure === "ingest-once") {
    const original = graph.ingest.bind(graph);
    let failed = false;
    graph.ingest = async function ingest(input) {
      if (!failed) { failed = true; throw new Error("index unavailable"); }
      return original(input);
    };
  }
  if (failure === "edit-ingest-once") {
    const original = graph.ingest.bind(graph); let failed = false;
    graph.ingest = async function ingest(input) { if (!failed && input.content.startsWith("Person:")) { failed = true; throw new Error("edit processing unavailable"); } return original(input); };
  }
  if (failure === "ingest") graph.ingest = async function ingest() { throw new Error("index unavailable"); };
  if (failure === "trace") graph.recall = async function recall() { throw new Error("search unavailable"); };
  if (failure === "withdraw-once") {
    const original = graph.withdraw.bind(graph);
    let failed = false;
    graph.withdraw = async function withdraw(input) {
      if (!failed) { failed = true; throw new Error("withdrawal unavailable"); }
      return original(input);
    };
  }
  const remembering = new RememberingConcept(database);
  if(failure === "disappear-save") {
    const save=remembering.remember.bind(remembering);
    remembering.remember=async function remember(input){const result=await save(input);await remembering.forget({...input,...result});return result;};
  }
  if(failure === "disappear-edit") {
    const save=remembering.edit.bind(remembering);
    remembering.edit=async function edit(input){const result=await save(input);await remembering.forget(input);return result;};
  }
  if(failure === "disappear-prepare") {
    const originalIngest=graph.ingest.bind(graph); let calls=0;
    graph.ingest=async function ingest(input): Promise<Record<string, never>> {const result=await originalIngest(input);if(++calls > 1) await remembering.forget({owner:input.owner,memory:input.source});return result;};
  }
  if(failure === "disappear-results" || failure === "disappear-need") {
    const originalRecall=graph.recall.bind(graph);
    graph.recall=async function recall(input): Promise<{ recall: string }> {const result=await originalRecall(input);if(failure === "disappear-results") for(const row of JSON.parse(input.notes)) await remembering.forget({owner:input.owner,memory:row.source});else await database.collection("seeking.needs").deleteMany({owner:input.owner});return result;};
  }
  const application = assembleApplication(database, { commons, transcriber: { async transcribe() { return "Met Mira. We discussed ocean sensors."; } }, instances: { Graphing: graph, Remembering: failure?.startsWith("disappear") ? remembering : new RememberingConcept(database, {async transcribe(){return "Met Mira. We discussed ocean sensors.";}}) } });
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
  return { database, commons, browser, application };
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
    const content = writeMemoryFields({ person: "mira chen", when: "October 16, 2026", does: "Marine biologist", discussed: "Ocean sensors", contact: "https://www.linkedin.com/in/mira-example" });
    const saved = await sam.post("/memories/remember", { content });
    expect(saved.status).toBe(200);
    expect(await database.collection("remembering.memories").findOne({ owner })).toMatchObject({ content });
    expect(await sam.post("/memories/list", { after: "" })).toMatchObject({ status: 200, body: { memories: [{ content }] } });
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


describe("Connection removal", () => {
  test("the authenticated basket route removes one encounter and its evidence, never another owner's or same-name encounter", async () => {
    const { browser, database } = await setup();
    const sam = browser(), leo = browser(), anonymous = browser();
    const owner = await sam.signIn(SAM);
    await leo.signIn(LEO);
    const input = { content: NOTE, submission: crypto.randomUUID() };
    const first = await sam.post("/memories/remember", input);
    const second = await sam.post("/memories/remember", { content: NOTE });
    const memory = first.body.memory;
    expect(await anonymous.post("/memories/forget", { memory })).toMatchObject({ status: 401 });
    expect(await anonymous.post("/memories/forget", { memory, session: sam.jar.get("__Host-circle-session") })).toMatchObject({ status: 401 });
    expect(await leo.post("/memories/forget", { memory })).toMatchObject({ status: 404, body: { error: "NOT_FOUND" } });
    expect(await sam.post("/memories/forget", { memory: "a".repeat(64) })).toMatchObject({ status: 404, body: { error: "NOT_FOUND" } });
    for (const body of [{ memory, owner }, { memory, source: memory }, { memory: "not a memory" }, { memory: 123 }, {}]) {
      expect(await sam.post("/memories/forget", body)).toMatchObject({ status: 400 });
    }
    expect(await sam.post("/memories/forget", { memory })).toMatchObject({ status: 200, body: {} });
    expect(await sam.post("/memories/forget", { memory })).toMatchObject({ status: 200, body: {} });
    expect((await sam.post("/memories/list", { after: "" })).body.memories.map((row: any) => row.memory)).toEqual([second.body.memory]);
    expect((await sam.post("/needs/seek", { description: "systems engineering" })).body.results.suggestions.map((row: any) => row.source)).toEqual([second.body.memory]);
    expect(await sam.post("/memories/remember", input)).toMatchObject({ status: 409 });
    expect(await database.collection("remembering.memories").findOne({ _id: memory })).toEqual({ _id: memory, owner, removed: true });
    expect(await database.collection("graphing.sources").findOne({ _id: memory })).toEqual({ _id: memory, owner, withdrawn: true });
    await sam.post("/auth/logout");
    expect(await sam.post("/memories/forget", { memory: second.body.memory })).toMatchObject({ status: 401 });
  });

  test("failed withdrawal hides the removed original and same-memory retry finishes cleanup", async () => {
    const { browser, database } = await setup("withdraw-once");
    const sam = browser();
    await sam.signIn(SAM);
    const input = { content: NOTE, submission: crypto.randomUUID() };
    const memory = (await sam.post("/memories/remember", input)).body.memory;
    expect(await sam.post("/memories/forget", { memory })).toMatchObject({ status: 500 });
    expect((await sam.post("/memories/list", { after: "" })).body.memories).toEqual([]);
    expect((await sam.post("/needs/seek", { description: "systems engineering" })).body.results.suggestions).toEqual([]);
    expect(await sam.post("/memories/remember", input)).toMatchObject({ status: 409 });
    expect(await sam.post("/memories/forget", { memory })).toMatchObject({ status: 200 });
    expect(await database.collection("graphing.sources").findOne({ _id: memory })).toMatchObject({ withdrawn: true });
  });
});


test("HTTP removal erases MongoDB data durably across closing and reopening the connection", async () => {
  const databaseName = `circle_delete_persistence_test_${crypto.randomUUID().replaceAll("-", "")}`;
  const writer = new MongoClient(process.env.TEST_MONGODB_URL!, { serverSelectionTimeoutMS: 3_000 });
  const reader = new MongoClient(process.env.TEST_MONGODB_URL!, { serverSelectionTimeoutMS: 3_000 });
  let application: ReturnType<typeof assembleApplication> | undefined;
  try {
    await writer.connect();
    const fixture = await setup(undefined, writer.db(databaseName));
    application = fixture.application;
    const sam = fixture.browser();
    const owner = await sam.signIn(SAM);
    const input = { content: NOTE, submission: crypto.randomUUID() };
    const memory = (await sam.post("/memories/remember", input)).body.memory as string;
    const keptContent = "Met Mira. We discussed ocean sensors.";
    const kept = (await sam.post("/memories/remember", { content: keptContent })).body.memory as string;
    expect((await sam.post("/needs/seek", { description: "systems engineering" })).body.results.suggestions).toHaveLength(1);
    expect(await sam.post("/memories/forget", { memory })).toMatchObject({ status: 200 });
    await application.beginDrain();
    applications.splice(applications.indexOf(application), 1);
    application = undefined;
    await writer.close();

    // A new network connection observes persisted data, not the original app's state.
    await reader.connect();
    const database = reader.db(databaseName);
    expect(await database.collection<{ _id: string; owner: string; removed: true }>("remembering.memories").findOne({ _id: memory }))
      .toEqual({ _id: memory, owner, removed: true });
    expect(await database.collection<{ _id: string; owner: string; withdrawn: true }>("graphing.sources").findOne({ _id: memory }))
      .toEqual({ _id: memory, owner, withdrawn: true });
    expect(await database.collection("remembering.memories").countDocuments({ content: NOTE })).toBe(0);
    expect(await database.collection<{ _id: string }>("graphing.sources").countDocuments({ _id: memory, card: { $exists: true } })).toBe(0);
    const remembering = new RememberingConcept(database);
    const graph = new GraphingConcept(database, new FixtureBrain());
    expect(await remembering._get({ owner, memory })).toEqual([]);
    expect(await remembering._list({ owner, after: "" })).toEqual([{ memory: kept, content: keptContent }]);
    const { recall } = await graph.recall({ owner, description: "ocean sensors", ...(await remembering._corpus({ owner })) });
    expect(await graph._matches({ owner, recall })).toMatchObject([{ label: "Mira", source: kept }]);
    expect(await database.collection("graphing.recalls").countDocuments({ "selection.source": memory })).toBe(0);
    await expect(remembering.remember({ owner, ...input, capturedAt: new Date() })).rejects.toThrow(SubmissionConflict);
  } finally {
    if (application) {
      await application.beginDrain();
      applications.splice(applications.indexOf(application), 1);
    }
    try {
      await reader.connect();
      await reader.db(databaseName).dropDatabase();
    } finally {
      await Promise.all([writer.close(), reader.close()]);
    }
  }
}, 10_000);

test("voice authenticates before transcription, returns editable text and never saves audio or a note", async () => {
  const { browser, database } = await setup();
  const sam = browser();
  const recording = { audio: Buffer.from("synthetic audio").toString("base64"), mediaType: "audio/webm" };
  expect(await sam.post("/memories/transcribe", recording)).toMatchObject({ status:401 });
  await sam.signIn(SAM);
  expect(await sam.post("/memories/transcribe", { ...recording, owner:"foreign" })).toMatchObject({status:400});
  for (const invalid of [{...recording,audio:"bad!"},{...recording,mediaType:"text/plain"},{...recording,audio:""}]) expect(await sam.post("/memories/transcribe",invalid)).toMatchObject({status:400});
  const transcript = await sam.post("/memories/transcribe",recording);
  expect(transcript).toMatchObject({status:200,body:{content:"Met Mira. We discussed ocean sensors."}});
  expect(await database.collection("remembering.memories").countDocuments()).toBe(0);
  expect(await database.collection("graphing.sources").countDocuments()).toBe(0);
  const saved = await sam.post("/memories/remember",{content:transcript.body.content});
  expect(saved.status).toBe(200);
  expect((await sam.post("/memories/list",{after:""})).body.memories).toMatchObject([{memory:saved.body.memory,card:{name:"Mira"}}]);
});

test("an organization failure followed by repaired short-name evidence retries the same token without duplicating the original",async()=>{
  const {browser,database}=await setup("ingest-once");
  const sam=browser();const owner=await sam.signIn(SAM);
  const content="I met David Hume who talks about philosophy.";
  const input={content,submission:crypto.randomUUID()};
  expect(await sam.post("/memories/remember",input)).toMatchObject({status:500});
  const before=await sam.post("/memories/list",{after:""});
  expect(before.body.memories).toHaveLength(1);
  expect(await sam.post("/memories/remember",input)).toMatchObject({status:200,body:{memory:before.body.memories[0].memory}});
  expect(await database.collection("remembering.memories").countDocuments({owner,content})).toBe(1);
});

test("form edit is owner-scoped, prefills JSON, preserves original, rejects stale revisions and invalidates search",async()=>{
  const {browser,database}=await setup();const sam=browser(),leo=browser(),anon=browser();
  const owner=await sam.signIn(SAM);await leo.signIn(LEO);
  const saved=await sam.post("/memories/remember",{content:NOTE,timeZone:"America/New_York"});const memory=saved.body.memory;
  expect(await anon.post("/memories/prepare-edit",{memory})).toMatchObject({status:401});
  expect(await leo.post("/memories/prepare-edit",{memory})).toMatchObject({status:404});
  const prepared=await sam.post("/memories/prepare-edit",{memory});
  expect(prepared).toMatchObject({status:200,body:{memory,revision:0,original:NOTE,card:{name:"Faustin"}}});
  const content="Person: Faustin\nWhen:\nDoes: Marine biologist\nDiscussed: Ocean sensors";
  const input={memory,revision:0,submission:crypto.randomUUID(),content};
  expect(await leo.post("/memories/edit",input)).toMatchObject({status:404});
  expect(await sam.post("/memories/edit",{...input,owner})).toMatchObject({status:400});
  expect(await sam.post("/memories/edit",input)).toMatchObject({status:200,body:{memory}});
  expect(await sam.post("/memories/edit",input)).toMatchObject({status:200});
  expect(await sam.post("/memories/edit",{...input,submission:crypto.randomUUID(),content:"Stale overwrite"})).toMatchObject({status:409});
  const rows=(await sam.post("/memories/list",{after:""})).body.memories;
  expect(rows).toMatchObject([{memory,content,original:NOTE,revision:1,card:{name:"Faustin"}}]);
  expect((await sam.post("/needs/seek",{description:"systems engineering"})).body.results.suggestions).toEqual([]);
  expect((await sam.post("/needs/seek",{description:"ocean sensors"})).body.results.suggestions).toMatchObject([{source:memory,content,original:NOTE}]);
  expect(await database.collection("remembering.memories").countDocuments({owner})).toBe(1);
  expect(await sam.post("/memories/forget",{memory})).toMatchObject({status:200});
  expect(await sam.post("/memories/edit",input)).toMatchObject({status:404});
});

test("invalid timezone/revision inputs fail before effects",async()=>{
  const {browser,database}=await setup();const sam=browser();await sam.signIn(SAM);
  expect(await sam.post("/memories/remember",{content:NOTE,timeZone:"Not/AZone"})).toMatchObject({status:400});
  expect(await database.collection("remembering.memories").countDocuments()).toBe(0);
  const memory=(await sam.post("/memories/remember",{content:NOTE})).body.memory;
  for(const revision of [-1,1.1,"0",null])expect(await sam.post("/memories/edit",{memory,revision,content:"changed",submission:crypto.randomUUID()})).toMatchObject({status:400});
});

test("processing failure after an edit preserves current form and original, same edit retry never increments twice",async()=>{
  const {browser,database}=await setup("edit-ingest-once");const sam=browser();const owner=await sam.signIn(SAM);
  const memory=(await sam.post("/memories/remember",{content:NOTE})).body.memory;
  const content="Person: Faustin\nWhen:\nDoes: Builds solar panels\nDiscussed:";
  const input={memory,revision:0,submission:crypto.randomUUID(),content};
  expect(await sam.post("/memories/edit",input)).toMatchObject({status:500});
  expect((await sam.post("/memories/list",{after:""})).body.memories).toMatchObject([{memory,content,original:NOTE,revision:1,card:null}]);
  expect(await sam.post("/memories/edit",input)).toMatchObject({status:200});
  expect((await sam.post("/memories/list",{after:""})).body.memories).toMatchObject([{memory,content,original:NOTE,revision:1,card:{name:"Faustin"}}]);
  expect(await database.collection("remembering.memories").countDocuments({owner})).toBe(1);
});


for(const stage of ["disappear-save","disappear-edit","disappear-prepare","disappear-results","disappear-need"] as const) {
  test(`${stage} returns a response within two seconds rather than the 120-second deadline`,async()=>{
    const {browser,database}=await setup(stage),sam=browser();const owner=await sam.signIn(SAM);
    const saved=stage === "disappear-save" ? null : await sam.post("/memories/remember",{content:NOTE});
    const memory=saved?.body.memory;
    const endpoint=stage === "disappear-save" ? "/memories/remember" : stage === "disappear-edit" ? "/memories/edit" : stage === "disappear-prepare" ? "/memories/prepare-edit" : "/needs/seek";
    const body=stage === "disappear-save" ? {content:NOTE} : stage === "disappear-edit" ? {memory,content:"Met Mira.",revision:0,submission:crypto.randomUUID()} : stage === "disappear-prepare" ? {memory} : {description:"systems engineering"};
    const response=await sam.post(endpoint,body);
    if(stage === "disappear-results") expect(response).toMatchObject({status:200,body:{results:{suggestions:[]}}});
    else if(stage === "disappear-need") expect(response).toMatchObject({status:500,body:{error:"INTERNAL_ERROR"}});
    else expect(response).toMatchObject({status:404,body:{error:"NOT_FOUND"}});
    expect(response.body.error).not.toBe("TIMEOUT");
    if(stage !== "disappear-need") expect(await database.collection("remembering.memories").countDocuments({owner,removed:{$ne:true}})).toBe(0);
  },2_000);
}



test("account disappearance after sign-in returns UNAUTHORIZED without waiting",async()=>{
  const {browser,database}=await setup(),sam=browser();const owner=await sam.signIn(SAM);
  await database.collection("registering.users").deleteOne({_id:owner} as any);
  expect(await sam.post("/auth/me")).toMatchObject({status:401,body:{error:"UNAUTHORIZED"}});
},2_000);
