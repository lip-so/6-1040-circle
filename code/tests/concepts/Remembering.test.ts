import { afterAll, afterEach, beforeAll, describe, expect, test } from "bun:test";
import { MongoClient, type Db } from "mongodb";
import { EmptyContent, SubmissionConflict, RememberingConcept } from "../../src/concepts/Remembering.ts";

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
  if (connected) await db.collection<{ _id: string; owner: string; content: string; capturedAt?: Date }>("remembering.memories").deleteMany({});
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
    const { memory } = await remembering.remember({ capturedAt: new Date("2026-10-18T12:00:00Z"), submission: crypto.randomUUID(), owner: "ralph", content });

    expect(await remembering._get({ owner: "ralph", memory })).toEqual([{ content }]);
  });

  for (const content of ["", " \t\n "]) {
    test(`refuses ${content.length === 0 ? "empty" : "whitespace-only"} content without saving anything`, async () => {
      await expect(remembering.remember({ capturedAt: new Date("2026-10-18T12:00:00Z"), submission: crypto.randomUUID(), owner: "ralph", content })).rejects.toThrow(EmptyContent);
      expect(await db.collection<{ _id: string; owner: string; content: string; capturedAt?: Date }>("remembering.memories").countDocuments()).toBe(0);
    });
  }

  test("does not return another owner's memory", async () => {
    const { memory } = await remembering.remember({ capturedAt: new Date("2026-10-18T12:00:00Z"), submission: crypto.randomUUID(), owner: "ralph", content: "Met Faustin." });

    expect(await remembering._get({ owner: "another-student", memory })).toEqual([]);
  });

  test("returns no row for an unknown memory", async () => {
    expect(await remembering._get({ owner: "ralph", memory: crypto.randomUUID() })).toEqual([]);
  });

  test("creates separate memories for separate saves", async () => {
    const input = { owner: "ralph", content: "Met Faustin." };
    const first = await remembering.remember({ ...input, capturedAt: new Date("2026-10-18T12:00:00Z"), submission: crypto.randomUUID() });
    const second = await remembering.remember({ ...input, capturedAt: new Date("2026-10-18T12:00:00Z"), submission: crypto.randomUUID() });

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
      const { memory } = await writer.remember({ capturedAt: new Date("2026-10-18T12:00:00Z"), submission: crypto.randomUUID(), owner: "ralph", content });
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


describe("Remembering saved-list edge cases", () => {
  const savedAt = new Date("2026-10-18T12:00:00Z");
  const save = (content: string, owner = "ralph", submission = crypto.randomUUID(), capturedAt = savedAt) =>
    remembering.remember({ owner, content, submission, capturedAt });

  test("concurrent retries make one note and keep the original timestamp", async () => {
    const submission = crypto.randomUUID();
    const copies = await Promise.all(Array.from({ length: 8 }, () => save("Met Alex.", "ralph", submission)));
    expect(new Set(copies.map(copy => copy.memory)).size).toBe(1);
    expect(await db.collection<{ _id: string; owner: string; content: string; capturedAt?: Date }>("remembering.memories").countDocuments()).toBe(1);
    await save("Met Alex.", "ralph", submission, new Date("2026-10-19T12:00:00Z"));
    expect(await db.collection<{ _id: string; owner: string; content: string; capturedAt?: Date }>("remembering.memories").findOne({ _id: copies[0]!.memory })).toMatchObject({ capturedAt: savedAt });
    await expect(save("Different note", "ralph", submission)).rejects.toThrow(SubmissionConflict);
    expect(await remembering._get({ owner: "ralph", memory: copies[0]!.memory })).toEqual([{ content: "Met Alex." }]);
  });

  test("the same token from different owners cannot collide or reveal another user's note", async () => {
    const submission = crypto.randomUUID();
    const a = await save("Met Alex, engineer.", "ralph", submission);
    const b = await save("Met Alex, biologist.", "someone-else", submission);
    expect(a.memory).not.toBe(b.memory);
    expect(await remembering._list({ owner: "ralph", after: "" })).toEqual([{ memory: a.memory, content: "Met Alex, engineer." }]);
    expect(await remembering._list({ owner: "ralph", after: b.memory })).toEqual([]);
    expect(await remembering._list({ owner: "ralph", after: "missing" })).toEqual([]);
  });

  test("same-name encounters remain separate; legacy notes and exact text stay available without graph extraction", async () => {
    const first = await save("Met Alex, engineer.");
    const second = await save("Met Alex, biologist.");
    await db.collection<{ _id: string; owner: string; content: string; capturedAt?: Date }>("remembering.memories").insertOne({ _id: "00000000-0000-4000-8000-000000000001", owner: "ralph", content: "  unstructured legacy note\nunchanged  " });
    const listed = await remembering._list({ owner: "ralph", after: "" });
    expect(listed.slice(0, 2).map(row => row.memory)).toEqual([first.memory, second.memory].sort());
    expect(listed[2]).toMatchObject({ content: "  unstructured legacy note\nunchanged  " });
    expect(await db.collection<{ _id: string; owner: string; content: string; capturedAt?: Date }>("remembering.memories").findOne({ _id: listed[2]!.memory })).not.toHaveProperty("capturedAt");
  });

  test("every older note remains reachable when a new save arrives between pages", async () => {
    const originals = await Promise.all(Array.from({ length: 46 }, (_, i) => save(`Met Alex. Encounter ${i}`, "ralph", crypto.randomUUID(), new Date(savedAt.getTime() + i))));
    const first = await remembering._list({ owner: "ralph", after: "" });
    expect(first).toHaveLength(21);
    const seen = first.slice(0, 20).map(row => row.memory);
    const newer = await save("Met New Person.", "ralph", crypto.randomUUID(), new Date(savedAt.getTime() + 1000));
    while (true) {
      const page = await remembering._list({ owner: "ralph", after: seen.at(-1)! });
      seen.push(...page.slice(0, 20).map(row => row.memory));
      if (page.length <= 20) break;
    }
    expect(new Set(seen).size).toBe(46);
    expect([...seen].sort()).toEqual(originals.map(row => row.memory).sort());
    expect(seen).not.toContain(newer.memory);
  });
});
