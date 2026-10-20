/** Explicit live check: synthetic notes only, uniquely named disposable database. */
import { MongoClient } from "mongodb";
import { GraphingConcept } from "../src/concepts/Graphing.ts";
import { OpenAIProvider } from "../src/concepts/brain-provider.ts";
const apiKey = process.env.OPENAI_API_KEY?.trim();
if (!apiKey || !process.env.TEST_MONGODB_URL) throw new Error("Configure OPENAI_API_KEY and TEST_MONGODB_URL locally before running this check.");
const client = new MongoClient(process.env.TEST_MONGODB_URL, {serverSelectionTimeoutMS:3000});
const database = client.db(`circle_brain_check_${crypto.randomUUID().replaceAll("-", "")}`);
const brain = new OpenAIProvider({apiKey,textModel:process.env.OPENAI_TEXT_MODEL,transcriptionModel:process.env.OPENAI_TRANSCRIBE_MODEL});
const graph = new GraphingConcept(database,brain);
const content = "Met Mira Chen at an ocean science meetup. Mira develops ocean sensors at Delta Lab. We discussed underwater robotics.";
try {
  await client.connect();
  const input={owner:"synthetic-owner",description:"Who works on ocean sensors?",notes:JSON.stringify([{source:"synthetic-source",content}])};
  const first=await graph.recall(input), second=await graph.recall(input);
  const results=await graph._matches({owner:input.owner,...first});
  if(first.recall!==second.recall || results.length!==1 || results[0]!.source!=="synthetic-source" || results[0]!.label!=="Mira Chen") throw new Error("Live extraction or retrieval check failed.");
  if((await graph._matches({owner:"another-owner",...first})).length) throw new Error("Isolation check failed.");
  await graph.withdraw({owner:input.owner,source:"synthetic-source"});
  if((await graph._matches({owner:input.owner,...first})).length) throw new Error("Removal check failed.");
  console.log("Live synthetic contact extraction, retrieval, cached repeat, isolation and removal passed. No existing user notes were used.");
} finally { try { await database.dropDatabase(); } finally { await client.close(); } }
