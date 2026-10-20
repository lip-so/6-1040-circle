import { afterAll, afterEach, beforeAll, describe, expect, test } from "bun:test";
import { MongoClient, type Db } from "mongodb";
import { assembleApplication } from "../../src/assembly.ts";
import { NeedResults } from "../../src/compositions/Circle.ts";
import { SeekingConcept } from "../../src/concepts/Seeking/Seeking.ts";

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

describe("Circle result composition", () => {

  test("does not form results for another owner's need", async () => {
    const { need } = await new SeekingConcept(db).seek({ owner: "another-student", description: "private need" });
    await expect(application().form(NeedResults({ owner: "ralph", need }))).rejects.toThrow();
  });

});
