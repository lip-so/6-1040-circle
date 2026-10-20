import { afterAll, afterEach, beforeAll, describe, expect, test } from "bun:test";
import { MongoClient, type Db } from "mongodb";
import { EmptyDescription, SeekingConcept } from "../../src/concepts/Seeking/Seeking.ts";

const testUrl = process.env.TEST_MONGODB_URL;
if (!testUrl) throw new Error("Set TEST_MONGODB_URL in .env to run the MongoDB tests.");

const databaseName = `circle_seeking_test_${crypto.randomUUID().replaceAll("-", "")}`;
const client = new MongoClient(testUrl, { serverSelectionTimeoutMS: 3_000 });
let db: Db;
let seeking: SeekingConcept;
let connected = false;

beforeAll(async () => {
  await client.connect();
  connected = true;
  db = client.db(databaseName);
  seeking = new SeekingConcept(db);
}, 10_000);

afterEach(async () => {
  if (connected) await db.collection("seeking.needs").deleteMany({});
});

afterAll(async () => {
  try {
    if (connected) await db.dropDatabase();
  } finally {
    await client.close();
  }
});

describe("Seeking", () => {
  test("saves and retrieves the owner's exact need description", async () => {
    const description = "  Looking for systems engineering work.\nPrefer a small company.  ";
    const { need } = await seeking.seek({ owner: "ralph", description });
    expect(await seeking._get({ owner: "ralph", need })).toEqual([{ description }]);
  });

  test("refuses blank descriptions without saving", async () => {
    await expect(seeking.seek({ owner: "ralph", description: " \t\n " })).rejects.toThrow(EmptyDescription);
    expect(await db.collection("seeking.needs").countDocuments()).toBe(0);
  });

  test("does not return another owner's need", async () => {
    const { need } = await seeking.seek({ owner: "ralph", description: "Robotics research." });
    expect(await seeking._get({ owner: "another-student", need })).toEqual([]);
  });

  test("saves separate needs without overwriting earlier ones", async () => {
    const first = await seeking.seek({ owner: "ralph", description: "Robotics research.", createdAt: new Date("2026-10-01T10:00:00Z") });
    const second = await seeking.seek({ owner: "ralph", description: "Systems engineering.", createdAt: new Date("2026-10-02T10:00:00Z") });
    expect(first.need).not.toBe(second.need);
    expect(await seeking._get({ owner: "ralph", need: first.need })).toEqual([{ description: "Robotics research." }]);
    expect(await seeking._get({ owner: "ralph", need: second.need })).toEqual([{ description: "Systems engineering." }]);
    await db.collection<{ _id: string; owner: string; description: string; createdAt?: Date }>("seeking.needs").insertMany([
      { _id: "legacy-b", owner: "ralph", description: "Older undated search" },
      { _id: "legacy-a", owner: "ralph", description: "Another undated search" },
      { _id: "foreign", owner: "another-student", description: "Private search", createdAt: new Date("2026-10-03T10:00:00Z") },
    ]);
    expect((await seeking._list({ owner: "ralph" })).map(row => row.need)).toEqual([second.need, first.need, "legacy-a", "legacy-b"]);
    expect((await seeking._active({ owner: "ralph" })).map(row => row.need)).toEqual([second.need, first.need, "legacy-a", "legacy-b"]);
  });

});
