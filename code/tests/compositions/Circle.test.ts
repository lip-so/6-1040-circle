import { afterAll, afterEach, beforeAll, describe, expect, test } from "bun:test";
import { MongoClient, type Db } from "mongodb";
import type { CircleWireHttp } from "../../generated/wire.ts";
import { assembleApplication } from "../../src/assembly.ts";
import { NeedResults, SavedMemories } from "../../src/compositions/Circle.ts";
import { RememberingConcept } from "../../src/concepts/Remembering.ts";
import { SeekingConcept } from "../../src/concepts/Seeking.ts";
import { GraphingConcept } from "../../src/concepts/Graphing.ts";

import { FixtureBrain } from "../support/brain.ts";

const testUrl = process.env.TEST_MONGODB_URL;
if (!testUrl) throw new Error("Set TEST_MONGODB_URL in .env to run the MongoDB tests.");
const databaseName = `circle_flow_test_${crypto.randomUUID().replaceAll("-", "")}`;
const client = new MongoClient(testUrl, { serverSelectionTimeoutMS: 3_000 });
let db: Db;
let connected = false;
const applications: ReturnType<typeof assembleApplication>[] = [];

beforeAll(async () => {
  await client.connect();
  connected = true;
  db = client.db(databaseName);
}, 10_000);

afterEach(async () => {
  for (const app of applications.splice(0)) await app.beginDrain();
  if (connected) await db.dropDatabase();
});

afterAll(async () => {
  try { if (connected) await db.dropDatabase(); }
  finally { await client.close(); }
});

function application() {
  const app = assembleApplication(db);
  applications.push(app);
  return app;
}

const encounter = "Met Faustin, founder of an AI-chip startup. We talked about systems engineering.";

describe("Circle result composition", () => {
  test("joins an owned need, graph match, and exact original note", async () => {
    const memories = new RememberingConcept(db);
    const { memory } = await memories.remember({ capturedAt: new Date("2026-10-18T12:00:00Z"), submission: crypto.randomUUID(), owner: "ralph", content: encounter });
    await new GraphingConcept(db, new FixtureBrain()).ingest({ owner: "ralph", source: memory, content: encounter });
    const description = "systems engineering at an AI startup";
    const { need } = await new SeekingConcept(db).seek({ owner: "ralph", description });
    const { recall } = await new GraphingConcept(db, new FixtureBrain()).recall({ owner: "ralph", description, ...(await memories._corpus({ owner: "ralph" })) });
    const result = await application().form(NeedResults({ owner: "ralph", need, recall }));
    expect(result).toMatchObject({ need, description, suggestions: [{ label: "Faustin", source: memory, content: encounter }] });
  });

  test("returns an empty list when an owned need has no matching encounters", async () => {
    const { need } = await new SeekingConcept(db).seek({ owner: "ralph", description: "marine biology" });
    expect(await application().form(NeedResults({ owner: "ralph", need, recall: "unknown" }))).toMatchObject({ need, suggestions: [] });
  });

  test("does not form results for another owner's need", async () => {
    const { need } = await new SeekingConcept(db).seek({ owner: "another-student", description: "private need" });
    await expect(application().form(NeedResults({ owner: "ralph", need, recall: "unknown" }))).rejects.toThrow();
  });

  test("does not read another owner's graph", async () => {
    const { memory } = await new RememberingConcept(db).remember({ capturedAt: new Date("2026-10-18T12:00:00Z"), submission: crypto.randomUUID(), owner: "another-student", content: encounter });
    await new GraphingConcept(db, new FixtureBrain()).ingest({ owner: "another-student", source: memory, content: encounter });
    const { need } = await new SeekingConcept(db).seek({ owner: "ralph", description: "systems engineering" });
    expect(await application().form(NeedResults({ owner: "ralph", need, recall: "unknown" }))).toMatchObject({ need, suggestions: [] });
  });
});

test("results hide stale organization while an edited current original awaits reprocessing",async()=>{
  const owner="ralph",memories=new RememberingConcept(db),graph=new GraphingConcept(db,new FixtureBrain());
  const {memory}=await memories.remember({owner,content:encounter,submission:crypto.randomUUID(),capturedAt:new Date()});
  const {need}=await new SeekingConcept(db).seek({owner,description:"systems engineering"});
  const {recall}=await graph.recall({owner,description:"systems engineering",...(await memories._corpus({owner}))});
  expect(await application().form(NeedResults({owner,need,recall}))).toMatchObject({suggestions:[{source:memory}]});
  await memories.edit({owner,memory,content:"Person: Faustin\nWhen:\nDoes: Marine biologist\nDiscussed:",revision:0,submission:crypto.randomUUID(),capturedAt:new Date()});
  expect(await application().form(NeedResults({owner,need,recall}))).toMatchObject({suggestions:[]});
});


test("saved former preserves timestamp/identity paging order and drops disappeared rows",async()=>{
  const memories=new RememberingConcept(db),owner="ordering";
  for(const [memory,capturedAt] of [["z",new Date("2026-10-20")],["b",new Date("2026-10-19")],["a",new Date("2026-10-19")]] as const) await db.collection<{_id:string;owner:string;content:string;capturedAt:Date}>("remembering.memories").insertOne({_id:memory,owner,content:"Met Mira.",capturedAt});
  const app=application();
  const result=await app.form(SavedMemories({owner,after:""})) as CircleWireHttp["/memories/list"]["output"]["memories"];
  expect(result.map(row=>row.memory)).toEqual(["z","a","b"]);
  await memories.forget({owner,memory:"a"});
  expect((await app.form(SavedMemories({owner,after:""})) as CircleWireHttp["/memories/list"]["output"]["memories"]).map(row=>row.memory)).toEqual(["z","b"]);
});

test("results former retains provider relevance order through joins",async()=>{
  const owner="ordering",memories=new RememberingConcept(db),brain=new FixtureBrain(),graph=new GraphingConcept(db,brain);
  const notes=[];
  for(const name of ["Mira","Nia","Leo"]) {const content=`Met ${name}. We discussed sensors.`;const {memory}=await memories.remember({owner,content,submission:crypto.randomUUID(),capturedAt:new Date()});notes.push(memory);}
  brain.select=async(_description,rows)=>({matches:[...rows].reverse().map(row=>({source:row.source,facts:[1]}))});
  const {need}=await new SeekingConcept(db).seek({owner,description:"sensors"});
  const {recall}=await graph.recall({owner,description:"sensors",...(await memories._corpus({owner}))});
  const result=await application().form(NeedResults({owner,need,recall})) as CircleWireHttp["/needs/seek"]["output"]["results"];
  expect(result.suggestions.map(row=>row.source)).toEqual(notes.sort().reverse());
});


test("list formation omits a record removed after enumeration without dropping the whole answer",async()=>{
  const owner="ordering",memories=new RememberingConcept(db);
  await memories.remember({owner,content:"Met Mira.",submission:crypto.randomUUID(),capturedAt:new Date()});
  const originalList=memories._list.bind(memories);
  memories._list=async function _list(input){const rows=await originalList(input);if(rows[0]) await memories.forget({owner,memory:rows[0].memory});return rows;};
  const app=assembleApplication(db,{instances:{Remembering:memories}});applications.push(app);
  expect(await app.form(SavedMemories({owner,after:""}))).toEqual([]);
});
