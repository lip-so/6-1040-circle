import { afterAll, afterEach, beforeAll, describe, expect, test } from "bun:test";
import { MongoClient, type Db } from "mongodb";
import { writeMemoryFields } from "../../src/memory-fields.ts";
import { EmptySourceContent, GraphingConcept, SourceNotOwned } from "../../src/concepts/Graphing.ts";

const testUrl = process.env.TEST_MONGODB_URL;
if (!testUrl) throw new Error("Set TEST_MONGODB_URL in .env to run the MongoDB tests.");

const databaseName = `circle_graphing_test_${crypto.randomUUID().replaceAll("-", "")}`;
const client = new MongoClient(testUrl, { serverSelectionTimeoutMS: 3_000 });
let db: Db;
let graphing: GraphingConcept;
let connected = false;

beforeAll(async () => {
  await client.connect();
  connected = true;
  db = client.db(databaseName);
  graphing = new GraphingConcept(db);
}, 10_000);

afterEach(async () => {
  if (connected) await db.collection("graphing.sources").deleteMany({});
});

afterAll(async () => {
  try {
    if (connected) await db.dropDatabase();
  } finally {
    await client.close();
  }
});

const encounter = "Met Faustin, founder of an AI-chip startup. We talked about systems engineering.";

describe("Graphing", () => {
  test("extracts the encounter and explains a match using its actual source", async () => {
    await graphing.ingest({ owner: "ralph", source: "memory-1", content: encounter });
    const rows = await graphing._trace({ owner: "ralph", description: "I'm looking for systems engineering work at an AI startup." });
    expect(rows).toHaveLength(1);
    expect(rows[0]).toMatchObject({ label: "Faustin", source: "memory-1" });
    expect(rows[0]!.reason).toContain("systems engineering");
    expect(rows[0]!.reason).toContain("Availability would need to be checked.");

    const stored = await db.collection<{ _id: string; claims: { quote: string; relation: string }[] }>("graphing.sources").findOne({ _id: "memory-1" });
    expect(stored).not.toBeNull();
    for (const claim of stored!.claims) expect(encounter.includes(claim.quote)).toBe(true);
    expect(stored!.claims.some((claim: { relation: string }) => claim.relation === "DISCUSSED")).toBe(true);
    expect(stored!.claims.some(claim => claim.relation === "WORKS_ON")).toBe(false);
    expect(stored!.claims.some(claim => claim.relation === "FOUNDED")).toBe(true);
  });

  test("indexes guided fields directly, including names and roles outside the free-text patterns", async () => {
    const content = writeMemoryFields({ person: "mira chen", when: "October 16", does: "Marine biologist", discussed: "Ocean sensors" });
    await graphing.ingest({ owner: "ralph", source: "guided-note", content });
    expect((await graphing._trace({ owner: "ralph", description: "marine biologist" })).map(row => row.label)).toEqual(["mira chen"]);
    expect((await graphing._trace({ owner: "ralph", description: "ocean sensors" })).map(row => row.label)).toEqual(["mira chen"]);
    expect(await graphing._trace({ owner: "another-owner", description: "ocean sensors" })).toEqual([]);
    const saved = await db.collection<{ _id: string; claims: { relation: string; quote: string }[] }>("graphing.sources").findOne({ _id: "guided-note" });
    expect(saved!.claims.some(claim => claim.relation === "DESCRIBED_AS")).toBe(true);
    for (const claim of saved!.claims) expect(content.includes(claim.quote)).toBe(true);
  });

  test("a guided discussion doesn't imply a role, hiring, or a positive fact contradicted by the field", async () => {
    const content = writeMemoryFields({ person: "Mira", when: "", does: "Does not work in robotics", discussed: "Painting" });
    await graphing.ingest({ owner: "ralph", source: "guided-negative", content });
    expect(await graphing._trace({ owner: "ralph", description: "robotics" })).toEqual([]);
    expect(await graphing._trace({ owner: "ralph", description: "hiring" })).toEqual([]);
    expect((await graphing._trace({ owner: "ralph", description: "painting" })).map(row => row.label)).toEqual(["Mira"]);
    const namedOnly = writeMemoryFields({ person: "sol rivera", when: "", does: "", discussed: "" });
    await graphing.ingest({ owner: "ralph", source: "guided-name", content: namedOnly });
    expect((await graphing._trace({ owner: "ralph", description: "sol rivera" })).map(row => row.label)).toEqual(["sol rivera"]);
  });

  test("handles other names and subjects, rather than seeded demo results", async () => {
    await graphing.ingest({ owner: "ralph", source: "marine-note", content: "Met Mira Chen, researcher at Delta Lab. She researches marine biology." });
    const rows = await graphing._trace({ owner: "ralph", description: "marine biology research" });
    expect(rows.map(row => row.label)).toEqual(["Mira Chen"]);
    expect(await graphing._trace({ owner: "ralph", description: "database security" })).toEqual([]);
  });

  test("normalizes supported wording such as engineer/engineering and artificial intelligence/AI", async () => {
    await graphing.ingest({ owner: "ralph", source: "ai-note", content: "Met Sol Rivera. They work on artificial intelligence and systems engineering." });
    expect((await graphing._trace({ owner: "ralph", description: "AI system engineer" })).map(row => row.label)).toEqual(["Sol Rivera"]);
  });

  test("returns no rows for blank descriptions or unsupported note wording", async () => {
    await graphing.ingest({ owner: "ralph", source: "unknown", content: "A memorable evening with interesting ideas." });
    expect(await graphing._trace({ owner: "ralph", description: "interesting ideas" })).toEqual([]);
    expect(await graphing._trace({ owner: "ralph", description: " \t " })).toEqual([]);
    expect(await graphing._trace({ owner: "ralph", description: "Someone who could help me" })).toEqual([]);
  });

  test("does not return another owner's graph", async () => {
    await graphing.ingest({ owner: "ralph", source: "memory-1", content: encounter });
    expect(await graphing._trace({ owner: "another-student", description: "systems engineering" })).toEqual([]);
  });

  test("refuses an attempt to replace another owner's source", async () => {
    await graphing.ingest({ owner: "ralph", source: "memory-1", content: encounter });
    await expect(graphing.ingest({ owner: "another-student", source: "memory-1", content: "Met Nia. She researches geology." })).rejects.toThrow(SourceNotOwned);
    expect((await graphing._trace({ owner: "ralph", description: "systems engineering" }))).toHaveLength(1);
    expect(await graphing._trace({ owner: "another-student", description: "geology" })).toEqual([]);
  });

  test("never reassigns a source even when the first index has no claims", async () => {
    await graphing.ingest({ owner: "ralph", source: "empty-index", content: "An evening of interesting conversations." });
    await expect(graphing.ingest({ owner: "another-student", source: "empty-index", content: "Met Tess. She researches geology." })).rejects.toThrow(SourceNotOwned);
    expect(await graphing._trace({ owner: "another-student", description: "geology" })).toEqual([]);
  });

  test("checks source ownership atomically for simultaneous ingests", async () => {
    const results = await Promise.allSettled([
      graphing.ingest({ owner: "one", source: "shared", content: "Met Tess. She researches geology." }),
      graphing.ingest({ owner: "two", source: "shared", content: "Met Tess. She researches geology." }),
    ]);
    expect(results.filter(result => result.status === "fulfilled")).toHaveLength(1);
    const rejected = results.find(result => result.status === "rejected");
    expect(rejected?.status === "rejected" && rejected.reason instanceof SourceNotOwned).toBe(true);
    const first = await graphing._trace({ owner: "one", description: "geology" });
    const second = await graphing._trace({ owner: "two", description: "geology" });
    expect(first.length + second.length).toBe(1);
  });

  test("replaces a source's old relationships instead of appending duplicates", async () => {
    await graphing.ingest({ owner: "ralph", source: "memory-1", content: encounter });
    const original = (await graphing._trace({ owner: "ralph", description: "systems engineering" }))[0]!;
    await graphing.ingest({ owner: "ralph", source: "memory-1", content: "Met Faustin. We discussed marine biology." });
    expect(await graphing._trace({ owner: "ralph", description: "systems engineering" })).toEqual([]);
    const rows = await graphing._trace({ owner: "ralph", description: "marine biology" });
    expect(rows).toHaveLength(1);
    expect(rows[0]!.target).toBe(original.target);
  });

  test("rejects blank source content without changing the existing graph", async () => {
    await graphing.ingest({ owner: "ralph", source: "memory-1", content: encounter });
    await expect(graphing.ingest({ owner: "ralph", source: "memory-1", content: " \n " })).rejects.toThrow(EmptySourceContent);
    expect(await graphing._trace({ owner: "ralph", description: "systems engineering" })).toHaveLength(1);
  });

  test("keeps same-named people in separate sources separate and does not combine their topics", async () => {
    await graphing.ingest({ owner: "ralph", source: "robotics-note", content: "Met Alex. They research robotics." });
    await graphing.ingest({ owner: "ralph", source: "biology-note", content: "Met Alex. They research biology." });
    const robotics = await graphing._trace({ owner: "ralph", description: "robotics" });
    const biology = await graphing._trace({ owner: "ralph", description: "biology" });
    expect(robotics).toHaveLength(1);
    expect(biology).toHaveLength(1);
    expect(robotics[0]!.target).not.toBe(biology[0]!.target);
    expect(await graphing._trace({ owner: "ralph", description: "robotics biology" })).toEqual([]);
  });

  test("does not turn negated statements or another person's statements into claims", async () => {
    await graphing.ingest({ owner: "ralph", source: "negative-note", content: "Met Noah. He does not research chemistry. Leo researches marine biology. We discussed painting." });
    expect(await graphing._trace({ owner: "ralph", description: "chemistry" })).toEqual([]);
    expect(await graphing._trace({ owner: "ralph", description: "marine biology" })).toEqual([]);
    expect((await graphing._trace({ owner: "ralph", description: "painting" })).map(row => row.label)).toEqual(["Noah"]);
    expect(await graphing._trace({ owner: "ralph", description: "not painting" })).toEqual([]);
  });

  test("requires an explicit hiring statement for hiring searches", async () => {
    await graphing.ingest({ owner: "ralph", source: "memory-1", content: encounter });
    expect(await graphing._trace({ owner: "ralph", description: "hiring systems engineers" })).toEqual([]);
    await graphing.ingest({ owner: "ralph", source: "hiring-note", content: "Met Nora, founder of a robotics startup. The startup is hiring systems engineers." });
    expect((await graphing._trace({ owner: "ralph", description: "hiring systems engineers" })).map(row => row.label)).toEqual(["Nora"]);
    await graphing.ingest({ owner: "ralph", source: "advice-note", content: "Met Omar. He offers career advice." });
    expect((await graphing._trace({ owner: "ralph", description: "who is hiring" })).map(row => row.label)).toEqual(["Nora"]);
  });

  test("orders results by person label regardless of ingestion order", async () => {
    await graphing.ingest({ owner: "ralph", source: "z", content: "Met Zoya. We discussed robotics." });
    await graphing.ingest({ owner: "ralph", source: "a", content: "Met Amina. We discussed robotics." });
    expect((await graphing._trace({ owner: "ralph", description: "robotics" })).map(row => row.label)).toEqual(["Amina", "Zoya"]);
  });

  test("persists extracted relationships across a new database connection", async () => {
    await graphing.ingest({ owner: "ralph", source: "memory-1", content: encounter });
    const readerClient = new MongoClient(testUrl);
    try {
      await readerClient.connect();
      const reader = new GraphingConcept(readerClient.db(databaseName));
      expect((await reader._trace({ owner: "ralph", description: "systems engineering" })).map(row => row.label)).toEqual(["Faustin"]);
    } finally {
      await readerClient.close();
    }
  });
});
