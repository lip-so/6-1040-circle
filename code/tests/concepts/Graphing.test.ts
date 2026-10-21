import { afterAll, expect, test } from "bun:test";
import { GraphingConcept, SourceNotOwned, SourceWithdrawn, MemoryLimit, MemoryChanged, EmptySourceContent } from "../../src/concepts/Graphing.ts";
import { InvalidModelOutput, BrainUnavailable, validateCard, validateSelection, type BrainProvider, type ContactCard } from "../../src/providers/brain-provider.ts";
import { FixtureBrain } from "../support/brain.ts";
import { cleanupDatabases, testDatabase } from "../support/reusable/mongo.ts";
afterAll(cleanupDatabases);
const content = "Met Mira. We discussed ocean sensors.";
const note = { source: "one", content };
const notes = JSON.stringify([note]);
const owner = "alice";
async function fixture(brain: BrainProvider = new FixtureBrain()) {
  const db = await testDatabase(); return { db, brain, graph: new GraphingConcept(db, brain) };
}
function gate<T>() { let resolve!: (value: T) => void; const promise = new Promise<T>(done => { resolve = done; }); return { promise, resolve }; }

test("stores validated JSON once, reuses equivalent searches and persists IDs/evidence", async () => {
  const brain = new FixtureBrain(), { db, graph } = await fixture(brain);
  const first = await graph.recall({ owner, notes, description: "ocean sensors" });
  const matches = await graph._matches({ owner, ...first });
  expect(matches).toMatchObject([{ source: "one", target: "one", label: "Mira", card: { name: "Mira" } }]);
  expect(matches[0]!.reason).toContain("We discussed ocean sensors.");
  expect(await graph.recall({ owner, notes, description: " OCEAN   sensors " })).toEqual(first);
  expect(brain.extracts).toHaveLength(1); expect(brain.selections).toHaveLength(1);
  const reader = new GraphingConcept(db);
  expect(await reader._matches({ owner, ...first })).toEqual(matches);
  const cache = await db.collection("graphing.recalls").findOne({ owner });
  expect(JSON.stringify(cache)).not.toContain(content); expect(JSON.stringify(cache)).not.toContain("Mira");
  expect(await graph._card({ owner, ...note })).toMatchObject({ card: { name: "Mira" } });
  expect(await graph._card({ owner, ...note, content: "changed" })).toEqual({ card: null });
});

test("new contacts change the corpus, repeated names remain separate, foreign memory never reaches provider", async () => {
  const brain = new FixtureBrain(), { graph } = await fixture(brain);
  const first = await graph.recall({ owner, notes, description: "ocean" });
  const changed = await graph.recall({ owner, notes: JSON.stringify([note, { ...note, source: "two" }]), description: "ocean" });
  expect(changed).not.toEqual(first); expect(await graph._matches({ owner, ...changed })).toHaveLength(2);
  expect(await graph._matches({ owner: "bob", ...changed })).toEqual([]);
  expect(await graph._card({ owner: "bob", ...note })).toEqual({ card: null });
  await expect(graph.ingest({ owner: "bob", ...note })).rejects.toThrow(SourceNotOwned);
  const before = brain.extracts.length;
  const empty = await graph.recall({ owner: "bob", notes: "[]", description: "ocean" });
  expect(await graph._matches({ owner: "bob", ...empty })).toEqual([]); expect(brain.extracts).toHaveLength(before);
  expect(brain.selections.flatMap(call => call.memory).every(row => row.source === "one" || row.source === "two")).toBe(true);
});

test("malformed or oversized original corpus refuses before state changes or provider calls", async () => {
  const brain = new FixtureBrain(), { db, graph } = await fixture(brain);
  for (const corpus of ["not json", "{}", JSON.stringify([note, note]), JSON.stringify([{ ...note, owner: "bob" }]), JSON.stringify(Array.from({length:257}, (_, i) => ({ ...note, source: String(i) }))), " ".repeat(262145)]) {
    await expect(graph.recall({ owner, description: "ocean", notes: corpus })).rejects.toThrow(MemoryLimit);
  }
  expect(brain.extracts).toHaveLength(0); expect(await db.collection("graphing.sources").countDocuments()).toBe(0);
});

test("bad evidence and provider failure keep old valid record and reserve ownership", async () => {
  const brain = new FixtureBrain(), { db, graph } = await fixture(brain);
  await graph.ingest({ owner, ...note });
  const before = await db.collection("graphing.sources").findOne({ owner });
  brain.extract = async () => ({ name: "Invented", nameQuote: content, facts: [] });
  await expect(graph.ingest({ owner, ...note, content: content + " More." })).rejects.toThrow(InvalidModelOutput);
  expect(await db.collection("graphing.sources").findOne({ owner })).toEqual(before);
  await expect(graph.ingest({ owner, source: "failed", content })).rejects.toThrow(InvalidModelOutput);
  await expect(graph.ingest({ owner: "bob", source: "failed", content })).rejects.toThrow(SourceNotOwned);
  await expect(graph.ingest({ owner, ...note, content: " " })).rejects.toThrow(EmptySourceContent);
  await expect(new GraphingConcept(db).ingest({ owner, source: "unconfigured", content })).rejects.toThrow(BrainUnavailable);
});

test("literal validation rejects fabricated/partial quotes, schemas and invented selection IDs or indexes", () => {
  const valid: ContactCard = { name: "Mira", nameQuote: "Met Mira.", facts: [{ kind: "discussion", value: "ocean sensors", quote: "We discussed ocean sensors." }] };
  expect(validateCard(valid, content)).toEqual(valid);
  for (const bad of [{ ...valid, name: "Lena" }, { ...valid, extra: true }, { ...valid, facts: [{ kind: "expert", value: "ocean sensors", quote: "We discussed ocean sensors." }] }]) {
    expect(() => validateCard(bad, content + " They do not research robotics.")).toThrow(InvalidModelOutput);
  }
  const memory = [{ source: "one", card: valid as any }];
  for (const matches of [[{ source: "foreign", facts: [0] }], [{ source: "one", facts: [1] }], [{ source: "one", facts: [0,0] }], [{ source: "one", facts: [] }], [{ source: "one", facts: [0] },{ source: "one", facts: [0] }]]) {
    expect(() => validateSelection({ matches }, memory, "ocean")).toThrow(InvalidModelOutput);
  }
  expect(() => validateSelection({ matches: [{ source: "one", facts: [0] }] }, memory, "who is hiring")).toThrow(InvalidModelOutput);
  expect(validateSelection({ matches: [{ source: "one", facts: [] }] }, memory, "Mira")).toHaveLength(1);
});

test("concurrent equivalent extraction/search reuses the first validated stored selection", async () => {
  const brain = new FixtureBrain(), { db, graph } = await fixture(brain);
  await Promise.all([graph.ingest({ owner, ...note }), graph.ingest({ owner, ...note })]);
  const calls = await Promise.all([graph.recall({ owner, notes, description: "ocean" }), graph.recall({ owner, notes, description: "ocean" })]);
  expect(calls[0]).toEqual(calls[1]); expect(await db.collection("graphing.sources").countDocuments()).toBe(1);
  expect(await db.collection("graphing.recalls").countDocuments()).toBe(1);
});

test("withdrawal erases JSON/caches and wins over delayed extraction", async () => {
  const brain = new FixtureBrain(), { db, graph } = await fixture(brain);
  const saved = await graph.recall({ owner, notes, description: "ocean" });
  await expect(graph.withdraw({ owner: "bob", source: "one" })).rejects.toThrow(SourceNotOwned);
  const pending = gate<unknown>(), entered = gate<void>();
  const result = await brain.extract(content);
  brain.extract = async () => { entered.resolve(); return pending.promise as any; };
  const late = graph.ingest({ owner, ...note, content: content + " More." });
  await entered.promise; await graph.withdraw({ owner, source: "one" }); pending.resolve(result);
  await expect(late).rejects.toThrow(SourceWithdrawn);
  expect(await db.collection<{ _id: string; owner: string; withdrawn: true }>("graphing.sources").findOne({ _id: "one" })).toEqual({ _id: "one", owner, withdrawn: true });
  expect(await graph._matches({ owner, ...saved })).toEqual([]); expect(await db.collection("graphing.recalls").countDocuments({ owner })).toBe(0);
  await expect(graph.ingest({ owner, ...note })).rejects.toThrow(SourceWithdrawn);
});

test("withdrawal during selection cannot resurrect a result or save source text in cache", async () => {
  const brain = new FixtureBrain(), { graph, db } = await fixture(brain);
  await graph.ingest({ owner, ...note });
  const pending = gate<unknown>(), entered = gate<void>();
  brain.select = async () => { entered.resolve(); return pending.promise as any; };
  const late = graph.recall({ owner, notes, description: "ocean" });
  await entered.promise; await graph.withdraw({ owner, source: "one" }); pending.resolve({ matches: [{ source: "one", facts: [1] }] });
  await expect(late).rejects.toThrow(MemoryChanged); expect(await db.collection("graphing.recalls").countDocuments()).toBe(0);
});

test("structured overflow keeps organized records but never sends a partial selection corpus", async () => {
  const brain = new FixtureBrain(), { graph, db } = await fixture(brain);
  const long = "a".repeat(1900) + ".";
  brain.extract = async () => ({ name: null, nameQuote: null, facts: Array.from({length:32}, () => ({kind:"other", value:"a", quote:long})) });
  const corpus = JSON.stringify(Array.from({length:5}, (_, i) => ({ source: String(i), content: long })));
  await expect(graph.recall({ owner, notes: corpus, description: "anything" })).rejects.toThrow(MemoryChanged);
  expect(await db.collection("graphing.sources").countDocuments({card:{$exists:true}})).toBe(5); expect(brain.selections).toHaveLength(0);
});

test("short-name evidence from both reported notes expands to the exact complete original without a date", async () => {
  const cases = [
    { content:"I met David Hume who talks about philosophy.", name:"David Hume", activity:"talks about philosophy" },
    { content:"david who does papers", name:"david", activity:"does papers" },
  ];
  for (const [i, example] of cases.entries()) {
    const output = {name:example.name,nameQuote:example.name,facts:[{kind:"role" as const,value:example.activity,quote:example.content}]};
    const card=validateCard(output,example.content);
    expect(card.nameQuote).toBe(example.content);
    expect(output.nameQuote).toBe(example.name); // Validation does not mutate provider data.
    expect(card.facts).toEqual([{kind:"role",value:example.activity,quote:example.content}]);
    const brain=new FixtureBrain();brain.extract=async()=>output;
    const {graph}=await fixture(brain);
    await graph.ingest({owner,source:String(i),content:example.content});
    expect(await graph._card({owner,source:String(i),content:example.content})).toEqual({card});
  }
});

test("expanding name evidence never accepts a fabricated name, fabricated quote or partial fact evidence",()=>{
  const original="I met David Hume who does not write papers.";
  const base={name:"David Hume",nameQuote:"David Hume",facts:[]};
  expect(validateCard(base,original).nameQuote).toBe(original);
  expect(validateCard({...base,facts:[{kind:"role",value:"write papers",quote:"write papers."}]},original).facts).toEqual([]);
  for(const bad of [{...base,name:"Someone Else"},{...base,nameQuote:"Met David Hume."}]) expect(()=>validateCard(bad,original)).toThrow(InvalidModelOutput);
});

test("a cached newer revision returning to A blocks delayed older extraction for B",async()=>{
  const brain=new FixtureBrain(),{graph,db}=await fixture(brain);
  await graph.ingest({owner,...note,revision:0});
  const entered=gate<void>(),pending=gate<unknown>();
  const originalExtract=brain.extract.bind(brain);
  brain.extract=async text=>{entered.resolve();return pending.promise as any;};
  const older=graph.ingest({owner,source:note.source,content:"Met Mira. We discussed robotics.",revision:1});
  await entered.promise;
  await graph.ingest({owner,...note,revision:2});
  pending.resolve(await originalExtract("Met Mira. We discussed robotics."));
  await expect(older).rejects.toThrow(MemoryChanged);
  expect((await graph._card({owner,...note,revision:2})).card?.facts.some(f=>f.value.includes("ocean"))).toBe(true);
  expect(await db.collection("graphing.sources").findOne({owner})).toMatchObject({sourceRevision:2});
});

test("previous JSON cards remain readable only for matching unedited originals, never after a revision changes",async()=>{
  const {db,graph}=await fixture();
  const card=validateCard({name:"Mira",nameQuote:"Met Mira.",facts:[]},content);
  const {createHash}=await import("node:crypto");
  await db.collection<{_id:string;owner:string;digest:string;providerVersion:string;card:ContactCard}>("graphing.sources").insertOne({_id:"old",owner,digest:createHash("sha256").update(JSON.stringify(content)).digest("hex"),providerVersion:"contact-v2:old-model",card});
  expect(await graph._card({owner,source:"old",content,referenceDate:"2026-10-20",revision:0})).toEqual({card});
  expect(await graph._card({owner,source:"old",content,referenceDate:"2026-10-20",revision:1})).toEqual({card:null});
  expect(await graph._card({owner:"foreign",source:"old",content})).toEqual({card:null});
});
