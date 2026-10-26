/** Explicit live quality evaluation: synthetic fixtures only, one disposable database. */
import { MongoClient } from "mongodb";
import { GraphingConcept } from "../src/concepts/Graphing.ts";
import { OpenAIProvider } from "../src/providers/brain-provider.ts";
import { syntheticCases } from "./synthetic-brain-cases.ts";
const apiKey = process.env.OPENAI_API_KEY?.trim();
if (!apiKey || !process.env.TEST_MONGODB_URL) throw new Error("Configure OPENAI_API_KEY and TEST_MONGODB_URL locally before explicitly running this live check.");
const client = new MongoClient(process.env.TEST_MONGODB_URL, {serverSelectionTimeoutMS:3000});
const database = client.db(`circle_brain_check_${crypto.randomUUID().replaceAll("-", "")}`);
const brain = new OpenAIProvider({apiKey,textModel:process.env.OPENAI_TEXT_MODEL,transcriptionModel:process.env.OPENAI_TRANSCRIBE_MODEL});
const graph = new GraphingConcept(database,brain);
let connected=false;
try {
  await client.connect(); connected=true;
  for(const example of syntheticCases) {
    const owner=`synthetic-${example.id}`,source=`synthetic-source-${example.id}`;
    const notes=JSON.stringify([{source,content:example.content,referenceDate:example.referenceDate,revision:0}]);
    await graph.ingest({owner,source,content:example.content,referenceDate:example.referenceDate,revision:0});
    const {card}=await graph._card({owner,source,content:example.content,referenceDate:example.referenceDate,revision:0});
    if(!card || card.name!==example.card.name) throw new Error(`${example.id}: name interpretation failed`);
    if(example.id==="relative-date" && !card.facts.some(f=>f.kind==="date" && f.value==="2026-10-19")) throw new Error("Relative date failed");
    if(example.id==="discussion-not-expertise" && card.facts.some(f=>f.kind==="role" && /quantum/iu.test(f.value))) throw new Error("Discussion became expertise");
    if(example.id==="prompt-injection" && card.facts.some(f=>f.kind==="offer" && /hiring/iu.test(f.value))) throw new Error("Untrusted note instructions became a hiring offer");
    let lastRecall="";
    for(const query of example.queries) {
      const input={owner,notes,description:query.description};
      const first=await graph.recall(input),second=await graph.recall(input);lastRecall=first.recall;
      const results=await graph._matches({owner,...first});
      if(first.recall!==second.recall || results.length!==(query.match?1:0) || results.some(r=>r.source!==source)) throw new Error(`${example.id}: retrieval or cache check failed`);
      if((await graph._matches({owner:"another-owner",...first})).length) throw new Error("Isolation check failed");
    }
    await graph.withdraw({owner,source});
    if((await graph._matches({owner,recall:lastRecall})).length) throw new Error("Removal check failed");
    console.log(`PASS ${example.id}: interpretation, recall, repeat, isolation and removal`);
  }
  console.log("Only hand-authored synthetic notes were sent. No existing user notes were read.");
} finally { try { if(connected) await database.dropDatabase(); } finally { await client.close(); } }
