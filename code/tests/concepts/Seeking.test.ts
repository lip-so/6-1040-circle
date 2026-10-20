import { afterAll, afterEach, beforeAll, describe, expect, test } from "bun:test";
import { MongoClient, type Db } from "mongodb";
import { EmptyDescription, SeekingConcept } from "../../src/concepts/Seeking.ts";

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

  for (const description of ["", " \t\n "]) {
    test(`refuses ${description.length === 0 ? "empty" : "whitespace-only"} descriptions without saving`, async () => {
      await expect(seeking.seek({ owner: "ralph", description })).rejects.toThrow(EmptyDescription);
      expect(await db.collection("seeking.needs").countDocuments()).toBe(0);
    });
  }

  test("does not return another owner's need", async () => {
    const { need } = await seeking.seek({ owner: "ralph", description: "Robotics research." });
    expect(await seeking._get({ owner: "another-student", need })).toEqual([]);
  });

  test("returns no row for an unknown need", async () => {
    expect(await seeking._get({ owner: "ralph", need: crypto.randomUUID() })).toEqual([]);
  });

  test("saves separate needs without overwriting earlier ones", async () => {
    const first = await seeking.seek({ owner: "ralph", description: "Robotics research." });
    const second = await seeking.seek({ owner: "ralph", description: "Systems engineering." });
    expect(first.need).not.toBe(second.need);
    expect(await seeking._get({ owner: "ralph", need: first.need })).toEqual([{ description: "Robotics research." }]);
    expect(await seeking._get({ owner: "ralph", need: second.need })).toEqual([{ description: "Systems engineering." }]);
  });

  test("reads a saved need after closing its writing connection", async () => {
    const writerClient = new MongoClient(testUrl);
    const readerClient = new MongoClient(testUrl);
    try {
      await writerClient.connect();
      const writer = new SeekingConcept(writerClient.db(databaseName));
      const { need } = await writer.seek({ owner: "ralph", description: "Systems engineering." });
      await writerClient.close();
      await readerClient.connect();
      const reader = new SeekingConcept(readerClient.db(databaseName));
      expect(await reader._get({ owner: "ralph", need })).toEqual([{ description: "Systems engineering." }]);
    } finally {
      await writerClient.close();
      await readerClient.close();
    }
  });
});
