import { afterAll, afterEach, beforeAll, describe, expect, test } from "bun:test";
import { MongoClient, type Db } from "mongodb";
import { EmptyContent, RememberingConcept } from "../../src/concepts/Remembering.ts";

const testUrl = process.env.TEST_MONGODB_URL;
if (!testUrl) {
  throw new Error("Set TEST_MONGODB_URL in .env to run the MongoDB tests.");
}

// Each run owns a temporary database; tests never clear the app or practice database.
const databaseName = `circle_remembering_test_${crypto.randomUUID().replaceAll("-", "")}`;
const client = new MongoClient(testUrl, { serverSelectionTimeoutMS: 3_000 });
let db: Db;
let remembering: RememberingConcept;
let connected = false;

beforeAll(async () => {
  await client.connect();
  connected = true;
  db = client.db(databaseName);
  remembering = new RememberingConcept(db);
}, 10_000);

afterEach(async () => {
  if (connected) await db.collection("remembering.memories").deleteMany({});
});

afterAll(async () => {
  try {
    if (connected) await db.dropDatabase();
  } finally {
    await client.close();
  }
});

describe("Remembering", () => {
  test("retrieves an encounter exactly as its owner wrote it", async () => {
    const content = "  Met Faustin at the hackathon.\nWe discussed systems engineering.  ";
    const { memory } = await remembering.remember({ owner: "ralph", content });

    expect(await remembering._get({ owner: "ralph", memory })).toEqual([{ content }]);
  });

  for (const content of ["", " \t\n "]) {
    test(`refuses ${content.length === 0 ? "empty" : "whitespace-only"} content without saving anything`, async () => {
      await expect(remembering.remember({ owner: "ralph", content })).rejects.toThrow(EmptyContent);
      expect(await db.collection("remembering.memories").countDocuments()).toBe(0);
    });
  }

  test("does not return another owner's memory", async () => {
    const { memory } = await remembering.remember({ owner: "ralph", content: "Met Faustin." });

    expect(await remembering._get({ owner: "another-student", memory })).toEqual([]);
  });

  test("returns no row for an unknown memory", async () => {
    expect(await remembering._get({ owner: "ralph", memory: crypto.randomUUID() })).toEqual([]);
  });

  test("creates separate memories for separate saves", async () => {
    const input = { owner: "ralph", content: "Met Faustin." };
    const first = await remembering.remember(input);
    const second = await remembering.remember(input);

    expect(first.memory).not.toBe(second.memory);
    expect(await remembering._get({ owner: input.owner, memory: first.memory })).toEqual([{ content: input.content }]);
    expect(await remembering._get({ owner: input.owner, memory: second.memory })).toEqual([{ content: input.content }]);
  });

  test("keeps the note after closing the writing connection and opening a new one", async () => {
    const writerClient = new MongoClient(testUrl);
    const readerClient = new MongoClient(testUrl);
    const content = "Met Faustin, founder of an AI-chip startup.";

    try {
      await writerClient.connect();
      const writer = new RememberingConcept(writerClient.db(databaseName));
      const { memory } = await writer.remember({ owner: "ralph", content });
      await writerClient.close();

      await readerClient.connect();
      const reader = new RememberingConcept(readerClient.db(databaseName));
      expect(await reader._get({ owner: "ralph", memory })).toEqual([{ content }]);
    } finally {
      await writerClient.close();
      await readerClient.close();
    }
  });
});
