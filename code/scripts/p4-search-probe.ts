/** Explicit synthetic diagnostic, local TEST_MONGODB_URL only. Never read app notes. */
import { MongoClient } from "mongodb";
import { createGateway } from "@mit-sdg/sync-engine/boundary";
import { assembleApplication } from "../src/assembly.ts";
import { Sessioning } from "../src/concepts.ts";
import { RememberingConcept } from "../src/concepts/Remembering.ts";
import { GraphingConcept, MemoryLimit, MemoryChanged } from "../src/concepts/Graphing.ts";
import { FixtureBrain } from "../tests/support/brain.ts";

const url = process.env.TEST_MONGODB_URL;
if (!url || !["localhost", "127.0.0.1", "[::1]"].includes(new URL(url).hostname)) throw new Error("A local TEST_MONGODB_URL is required.");
const client = new MongoClient(url, { serverSelectionTimeoutMS: 3000 });
const db = client.db(`circle_p4_probe_${crypto.randomUUID().replaceAll("-", "")}`);
const owner = "synthetic-probe";
let application: ReturnType<typeof assembleApplication> | undefined;
const report = (value: object) => console.log(JSON.stringify(value));
try {
  await client.connect();
  const brain = new FixtureBrain();
  const extract = brain.extract.bind(brain), select = brain.select.bind(brain);
  brain.extract = async content => { await Bun.sleep(20); return extract(content); };
  brain.select = async (description, memory) => { await Bun.sleep(20); return select(description, memory); };
  const remembering = new RememberingConcept(db), graph = new GraphingConcept(db, brain);
  const memories: string[] = [];
  for (const name of ["Mira", "Nia", "Leo", "Quinn"]) {
    const { memory } = await remembering.remember({ owner, submission: crypto.randomUUID(), capturedAt: new Date(), content: `Met ${name}. We discussed sensors.` });
    memories.push(memory);
  }
  for (const phase of ["cold", "warm", "edited", "provider-version"] as const) {
    if (phase === "edited") await remembering.edit({ owner, memory: memories[0]!, content: "Met Mira. We discussed sensors and batteries.", revision: 0, submission: crypto.randomUUID(), capturedAt: new Date() });
    if (phase === "provider-version") brain.version = "synthetic-probe-v2";
    const start = performance.now(), before = [brain.extracts.length, brain.selections.length];
    await graph.recall({ owner, description: "sensors", ...(await remembering._corpus({ owner })) });
    report({ phase, milliseconds: Math.round(performance.now() - start), extracts: brain.extracts.length - before[0]!, selections: brain.selections.length - before[1]! });
  }
  const before = brain.extracts.length;
  for (const [phase, notes] of [
    ["original-count-overflow", JSON.stringify(Array.from({ length: 257 }, (_, i) => ({ source: `limit-${i}`, content: "Met Mira." })))],
    ["multibyte-byte-overflow", JSON.stringify([{ source: "multibyte", content: "🪸".repeat(65536) }])],
  ] as const) {
    try { await graph.recall({ owner, description: "sensors", notes }); throw new Error("Expected original bound refusal"); }
    catch (error) { if (!(error instanceof MemoryLimit)) throw error; report({ phase, characters: notes.length, bytes: Buffer.byteLength(notes), error: error.constructor.name, newExtractions: brain.extracts.length - before }); }
  }
  const largeBrain = new FixtureBrain(), long = "a".repeat(1900) + ".";
  largeBrain.extract = async () => ({ name: null, nameQuote: null, facts: Array.from({ length: 32 }, () => ({ kind: "other", value: "a", quote: long })) });
  const large = new GraphingConcept(db, largeBrain), largeOwner = "synthetic-structured";
  try { await large.recall({ owner: largeOwner, description: "anything", notes: JSON.stringify(Array.from({ length: 5 }, (_, i) => ({ source: `large-${i}`, content: long }))) }); throw new Error("Expected structured overflow"); }
  catch (error) {
    if (!(error instanceof MemoryChanged)) throw error;
    report({ phase: "structured-overflow", error: error.constructor.name, organizedRecords: await db.collection("graphing.sources").countDocuments({ owner: largeOwner, card: { $exists: true } }), selections: largeBrain.selections.length });
  }
  // Real 120-second caller budget, with each injected call below the adapter's 45s default.
  // Opt in to the long probe; ordinary test runs never execute this script.
  if (process.env.CIRCLE_LONG_SEARCH_PROBE === "1") {
    const slow = new FixtureBrain(), slowExtract = slow.extract.bind(slow), slowSelect = slow.select.bind(slow);
    const start = performance.now();
    slow.extract = async content => { await Bun.sleep(41_000); const result = await slowExtract(content); report({ phase: "deadline-extraction-complete", milliseconds: Math.round(performance.now() - start), count: slow.extracts.length }); return result; };
    slow.select = async (description, memory) => { await Bun.sleep(41_000); return slowSelect(description, memory); };
    const slowOwner = "synthetic-deadline";
    for (const name of ["Mira", "Nia", "Leo"]) await remembering.remember({ owner: slowOwner, submission: crypto.randomUUID(), capturedAt: new Date(), content: `Met ${name}. We discussed sensors.` });
    application = assembleApplication(db, { brain: slow });
    const { session } = await new Sessioning(db).start({ subject: slowOwner });
    const gateway = createGateway({ application });
    const answer = await gateway.invoke("/needs/seek", { session, description: "sensors" }, { timeoutMs: 120_000 });
    report({ phase: "caller-deadline", milliseconds: Math.round(performance.now() - start), answer, organizedRecords: await db.collection("graphing.sources").countDocuments({ owner: slowOwner, card: { $exists: true } }) });
    await gateway.whenIdle();
    report({ phase: "after-work-idle", milliseconds: Math.round(performance.now() - start), organizedRecords: await db.collection("graphing.sources").countDocuments({ owner: slowOwner, card: { $exists: true } }), recalls: await db.collection("graphing.recalls").countDocuments({ owner: slowOwner }) });
    const beforeRetry = [slow.extracts.length, slow.selections.length], retryStart = performance.now();
    const retry = await gateway.invoke("/needs/seek", { session, description: "sensors" });
    report({ phase: "manual-retry", milliseconds: Math.round(performance.now() - retryStart), ok: retry.ok, extracts: slow.extracts.length - beforeRetry[0]!, selections: slow.selections.length - beforeRetry[1]!, notes: await db.collection("remembering.memories").countDocuments({ owner: slowOwner }), needs: await db.collection("seeking.needs").countDocuments({ owner: slowOwner }) });
  }
} finally {
  if (application) await application.beginDrain();
  try { await db.dropDatabase(); } finally { await client.close(); }
}
