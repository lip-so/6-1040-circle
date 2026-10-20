import { afterAll, expect, test } from "bun:test";
import { RememberingConcept } from "../../src/concepts/Remembering/Remembering.ts";
import { SeekingConcept } from "../../src/concepts/Seeking/Seeking.ts";
import { ConnectingConcept } from "../../src/concepts/Connecting/Connecting.ts";
import { cleanupDatabases, testDatabase } from "../support/reusable/mongo.ts";
afterAll(cleanupDatabases);
test("memory revision preserves identity and dates; deletion erases text and blocks stale save retries", async () => {
    const db = await testDatabase();
    const memories = new RememberingConcept(db, { transcribe: async () => "Met Mira." });
    const capturedAt = new Date("2026-10-19T12:00:00Z");
    const saved = await memories.remember({ owner: "sam", content: "Original", submission: "token", capturedAt });
    await memories.revise({ owner: "sam", memory: saved.memory, content: "Edited" });
    await memories.revise({ owner: "sam", memory: saved.memory, content: "Edited" });
    expect(await memories._record({ owner: "sam", memory: saved.memory })).toEqual([{ content: "Edited", revision: 1 }]);
    expect(await db.collection<{
        _id: string;
    }>("remembering.memories").findOne({ _id: saved.memory })).toMatchObject({ capturedAt });
    await expect(memories.revise({ owner: "leo", memory: saved.memory, content: "Forged" })).rejects.toThrow();
    expect(await memories.transcribe({ owner: "sam", audio: "AQID", mediaType: "audio/webm" })).toEqual({ content: "Met Mira." });
    expect(await db.collection("remembering.memories").countDocuments()).toBe(1);
    await memories.forget({ owner: "sam", memory: saved.memory });
    await memories.forget({ owner: "sam", memory: saved.memory });
    expect(await memories._list({ owner: "sam", after: "" })).toEqual([]);
    expect(await db.collection<{
        _id: string;
    }>("remembering.memories").findOne({ _id: saved.memory })).not.toHaveProperty("content");
    await expect(memories.remember({ owner: "sam", content: "Original", submission: "token", capturedAt })).rejects.toThrow();
});
test("all legacy needs are ongoing, exact repeat lookups reuse them, and lifecycle mutations stay owned", async () => {
    const db = await testDatabase();
    await db.collection<{
        _id: string;
        owner: string;
        description: string;
    }>("seeking.needs").insertMany([
        { _id: "legacy-a", owner: "sam", description: "Robotics research" },
        { _id: "legacy-b", owner: "sam", description: "Robotics research" },
    ]);
    const needs = new SeekingConcept(db);
    const fresh = await needs.seek({ owner: "sam", description: "chemistry" });
    await needs.revise({ owner: "sam", need: fresh.need, description: "biology" });
    expect((await needs.seek({ owner: "sam", description: "chemistry" })).need).not.toBe(fresh.need);
    expect(await needs.seek({ owner: "sam", description: "  ROBOTICS   research " })).toEqual({ need: "legacy-a" });
    expect((await new SeekingConcept(db)._active({ owner: "sam" })).map(r => r.need)).toContain("legacy-a");
    expect((await needs._active({ owner: "sam" })).map(r => r.need)).toContain("legacy-b");
    expect((await needs.seek({ owner: "leo", description: "Robotics research" })).need).not.toBe("legacy-a");
    await expect(needs.resolve({ owner: "leo", need: "legacy-a" })).rejects.toThrow();
    await needs.revise({ owner: "sam", need: "legacy-a", description: "Ocean research" });
    expect((await needs.seek({ owner: "sam", description: "Robotics research" })).need).toBe("legacy-b");
    await needs.resolve({ owner: "sam", need: "legacy-a" });
    await expect(needs.revise({ owner: "sam", need: "legacy-a", description: "Other" })).rejects.toThrow();
    expect((await needs.seek({ owner: "sam", description: "Ocean research" })).need).not.toBe("legacy-a");
    await needs.reopen({ owner: "sam", need: "legacy-a" });
    expect(await needs._record({ owner: "sam", need: "legacy-a" })).toEqual([{ description: "Ocean research", active: true }]);
    await needs.delete({ owner: "leo", need: "legacy-a" });
    expect(await needs._get({ owner: "sam", need: "legacy-a" })).toHaveLength(1);
    await needs.delete({ owner: "sam", need: "legacy-a" });
    await needs.delete({ owner: "sam", need: "legacy-a" });
    expect(await needs._get({ owner: "sam", need: "legacy-a" })).toEqual([]);
});
test("global exclusions survive refresh and cleanup, remain private, and supply complete policy context", async () => {
    const db = await testDatabase();
    const contexts: unknown[] = [];
    const policy = { async recommend(input: unknown) { contexts.push(input); return true; } };
    const connections = new ConnectingConcept(db, policy);
    const offer = { owner: "sam", need: "need", target: "target", description: "research", evidence: ["proof"], reason: "Evidence", gaps: [] };
    await expect(connections.offer({ ...offer, evidence: [] })).rejects.toThrow();
    await expect(connections.offer({ ...offer, description: " " })).rejects.toThrow();
    await connections.offer(offer);
    const [row] = await connections._suggestions({ owner: "sam" });
    await expect(connections.exclude({ owner: "leo", connection: row!.connection, explanation: "private" })).rejects.toThrow();
    await expect(connections.exclude({ owner: "sam", connection: row!.connection, explanation: "x".repeat(1001) })).rejects.toThrow();
    expect(await connections._exclusions({ owner: "sam" })).toEqual([]);
    await connections.exclude({ owner: "sam", connection: row!.connection, explanation: "No longer aligned" });
    await connections.exclude({ owner: "sam", connection: row!.connection, explanation: "No longer aligned" });
    expect(contexts).toHaveLength(1);
    expect(await connections._get({ owner: "sam", connection: row!.connection })).toEqual([]);
    await connections.offer({ ...offer, need: "other" });
    expect(contexts).toHaveLength(1);
    await connections.clear({ owner: "sam", need: "need" });
    await connections.reset({ owner: "sam", need: "other" });
    const reloaded = new ConnectingConcept(db, policy);
    await reloaded.offer(offer);
    expect(await reloaded._suggestions({ owner: "sam" })).toEqual([]);
    await reloaded.offer({ ...offer, target: "different" });
    expect(contexts.at(-1)).toMatchObject({ exclusions: [{ target: "target", explanation: "No longer aligned" }] });
    await reloaded.offer({ ...offer, owner: "leo" });
    expect(contexts.at(-1)).toMatchObject({ exclusions: [] });
    expect(await reloaded._suggestions({ owner: "leo" })).toHaveLength(1);
    const other = (await reloaded._suggestions({ owner: "sam" }))[0]!;
    await db.collection<{_id:string; status:string}>("connecting.connections").updateOne({ _id: other.connection }, { $set: { status: "DISMISSED" } });
    expect(await reloaded._suggestions({ owner: "sam" })).toHaveLength(1);
    await reloaded.exclude({ owner: "sam", connection: other.connection, explanation: "" });
    expect(await reloaded._exclusions({ owner: "sam" })).toEqual([{ target: "different", explanation: "" }, { target: "target", explanation: "No longer aligned" }]);
    await reloaded.offer({ ...offer, target: "stale" });
    const stale = (await reloaded._suggestions({ owner: "sam" }))[0]!;
    await reloaded.reset({ owner: "sam", need: "need" });
    await expect(reloaded.exclude({ owner: "sam", connection: stale.connection, explanation: "" })).rejects.toThrow();
    // A newly saved exclusion still wins over an already running model decision.
    let finish!: (allowed: boolean) => void;
    const delayed = new ConnectingConcept(db, { recommend: () => new Promise(resolve => { finish = resolve; }) });
    await reloaded.offer({ ...offer, target: "racing", need: "race" });
    const racing = (await reloaded._suggestions({ owner: "sam" }))[0]!;
    const pending = delayed.offer({ ...offer, target: "racing", need: "race-other" });
    while (!finish) await new Promise(resolve => setTimeout(resolve, 0));
    await reloaded.exclude({ owner: "sam", connection: racing.connection, explanation: "" });
    finish(true); await pending;
    expect(await reloaded._suggestions({ owner: "sam" })).toEqual([]);
    expect(await db.collection("connecting.connections").countDocuments({ owner: "sam", need: "race-other" })).toBe(0);

});
