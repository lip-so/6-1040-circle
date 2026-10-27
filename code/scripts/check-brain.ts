/** Explicit live quality evaluation: synthetic fixtures only, one disposable database. */
import { MongoClient } from "mongodb";
import { GraphingConcept } from "../src/concepts/Graphing.ts";
import { OpenAIProvider } from "../src/providers/brain-provider.ts";
import { recallQualityCases, recallQualityQueries } from "./recall-quality-cases.ts";
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
  for(const example of process.argv.includes("--quality-only") ? [] : syntheticCases) {
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
  // One shared corpus tests discrimination and ranking across plausible distractors.
  const owner="synthetic-recall-quality";
  const originals=recallQualityCases.map(example=>({source:example.id,content:example.content,referenceDate:"2026-10-20",revision:0}));
  for(const example of recallQualityCases) {
    const note=originals.find(note=>note.source===example.id)!;
    await graph.ingest({owner,...note});
    const {card}=await graph._card({owner,...note});
    if(!card || card.name!==example.name) throw new Error(`${example.id}: quality name failed`);
    for(const required of example.required) if(!card.facts.some(f=>f.kind===required.kind && required.terms.every(term=>term.test(f.value)))) throw new Error(`${example.id}: missing concise ${required.kind} specifics`);
    if(card.facts.some(f=>f.value.length>180 || /^(?:Discussed|Notes?|Offers):?\s/iu.test(f.value))) throw new Error(`${example.id}: summary is verbose or repeats its label`);
    if(example.id==="omar" && card.facts.some(f=>f.kind==="offer" && !/not/iu.test(f.value))) throw new Error("Negated hiring became an offer");
    if(example.id==="tessa" && card.facts.some(f=>f.kind==="offer")) throw new Error("User interest became contact availability");
    console.log(`PASS ${example.id}: concise card and retained search specifics`);
  }
  for(const query of recallQualityQueries) {
    const input={owner,notes:JSON.stringify(originals),description:query.description};
    const first=await graph.recall(input),repeat=await graph.recall(input);
    const matches=await graph._matches({owner,...first});
    if(first.recall!==repeat.recall || JSON.stringify(matches.map(m=>m.source))!==JSON.stringify(query.sources)) throw new Error(`Quality recall failed: ${query.description}; got ${matches.map(m=>m.source).join(",")}`);
    if(matches.some(m=>m.reason.includes("— “") || m.reason.length>300)) throw new Error("Result reason is not concise");
    console.log(`PASS quality recall: ${query.description}`);
  }
  console.log("Only hand-authored synthetic notes were sent. No existing user notes were read.");
} finally { try { if(connected) await database.dropDatabase(); } finally { await client.close(); } }
