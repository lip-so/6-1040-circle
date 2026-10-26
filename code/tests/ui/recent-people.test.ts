import { expect, test } from "bun:test";
import { useRecentPeople } from "../../frontend/src/recent-people.ts";
import { attempt, RequestScope } from "../../frontend/src/request-scope.ts";

const row = (memory: string, content = "Met Alex. We discussed robotics.") => ({ memory, content, original: content, revision: 0, referenceDate: "", card: null });
function deferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>(done => { resolve = done; });
  return { promise, resolve };
}

test("recent people distinguish a failed initial load from a genuinely empty account and can retry", async () => {
  let fail = true;
  const recent = useRecentPeople(async () => {
    if (fail) throw new Error("offline");
    return { memories: [] };
  }, () => {});
  await recent.refresh();
  expect(recent.loaded.value).toBe(false);
  expect(recent.loading.value).toBe(false);
  expect(recent.error.value).not.toBe("");
  fail = false;
  await recent.refresh();
  expect(recent.loaded.value).toBe(true);
  expect(recent.error.value).toBe("");
  expect(recent.memories.value).toEqual([]);
});

test("Load more uses the last displayed identity and keeps different encounters with the same name", async () => {
  const cursors: string[] = [];
  const recent = useRecentPeople(async ({ after }) => {
    cursors.push(after);
    return { memories: after ? [row("20"), row("21")] : Array.from({ length: 21 }, (_, i) => row(String(i))) };
  }, () => {});
  await recent.refresh();
  expect(recent.memories.value).toHaveLength(20);
  expect(recent.hasMore.value).toBe(true);
  await recent.more();
  expect(cursors).toEqual(["", "19"]);
  expect(recent.memories.value).toHaveLength(22);
  expect(recent.hasMore.value).toBe(false);
});

test("a failed refresh retains visible notes and offers retry rather than showing an empty account", async () => {
  let fail = false;
  const recent = useRecentPeople(async () => fail ? { error: "INTERNAL_ERROR" } : { memories: [row("one")] }, () => {});
  await recent.refresh();
  fail = true;
  await recent.refresh();
  expect(recent.memories.value).toEqual([row("one")]);
  expect(recent.loaded.value).toBe(true);
  expect(recent.error.value).not.toBe("");
});

test("sign-out or an account change ignores a pending list response", async () => {
  const pending = deferred<{ memories: ReturnType<typeof row>[] }>();
  const recent = useRecentPeople(() => pending.promise, () => {});
  const loading = recent.refresh();
  recent.clear();
  pending.resolve({ memories: [row("previous-owner")] });
  await loading;
  expect(recent.memories.value).toEqual([]);
  expect(recent.loaded.value).toBe(false);
  expect(recent.loading.value).toBe(false);
});

test("an older refresh cannot replace a newer response", async () => {
  const old = deferred<{ memories: ReturnType<typeof row>[] }>();
  let calls = 0;
  const recent = useRecentPeople(() => ++calls === 1 ? old.promise : Promise.resolve({ memories: [row("new")] }), () => {});
  const first = recent.refresh();
  await recent.refresh();
  old.resolve({ memories: [row("old")] });
  await first;
  expect(recent.memories.value).toEqual([row("new")]);
});

test("expired sessions clear previous results and request sign-in", async () => {
  let expired = false, ended = 0;
  const recent = useRecentPeople(async () => expired ? { error: "UNAUTHORIZED" } : { memories: [row("old")] }, () => { ended++; });
  await recent.refresh();
  expired = true;
  await recent.refresh();
  expect(recent.memories.value).toEqual([]);
  expect(ended).toBe(1);
});

test("the shared request guard invalidates pending save/search replies and network errors settle", async () => {
  const scope = new RequestScope();
  const old = scope.current();
  scope.invalidate();
  expect(old()).toBe(false);
  expect(scope.current()()).toBe(true);
  expect(await attempt(async () => { throw new Error("offline"); })).toEqual({ error: "NETWORK_ERROR" });
});


test("removing a row invalidates a pending page so it cannot restore the deleted encounter", async () => {
  const pending = deferred<{ memories: ReturnType<typeof row>[] }>();
  let calls = 0;
  const recent = useRecentPeople(() => ++calls === 1 ? Promise.resolve({ memories: [row("removed"), row("kept")] }) : pending.promise, () => {});
  await recent.refresh();
  const request = recent.refresh();
  recent.remove("removed");
  expect(recent.loading.value).toBe(false);
  pending.resolve({ memories: [row("removed"), row("kept")] });
  await request;
  expect(recent.memories.value).toEqual([row("kept")]);
});

const numbered = (start: number, count: number) => Array.from({ length: count }, (_, index) => row(String(start + index)));

test("A3 Retry resumes a failed third page without replacing the first forty rows or duplicating requests", async () => {
  const cursors: string[] = [], pending = deferred<{ memories: ReturnType<typeof row>[] }>();
  let fail = true;
  const recent = useRecentPeople(async ({ after }) => {
    cursors.push(after);
    if (after === "39") return fail ? { error: "NETWORK_ERROR" } : pending.promise;
    return { memories: numbered(after ? Number(after) + 1 : 0, 21) };
  }, () => {});
  await recent.refresh(); await recent.more(); await recent.more();
  expect(recent.memories.value.map(value => value.memory)).toEqual(numbered(0, 40).map(value => value.memory));
  fail = false;
  const retry = recent.retry(); await recent.retry(); await recent.more();
  expect(cursors).toEqual(["", "19", "39", "39"]);
  expect(recent.memories.value).toHaveLength(40);
  pending.resolve({ memories: numbered(40, 20) }); await retry;
  expect(recent.memories.value.map(value => value.memory)).toEqual(numbered(0, 60).map(value => value.memory));
  expect(new Set(recent.memories.value.map(value => value.memory)).size).toBe(60);
  expect(recent.error.value).toBe(""); expect(recent.hasMore.value).toBe(false);
});

test("A3 initial and explicit refresh failures retry replacement intent while preserving visible rows until success", async () => {
  const cursors: string[] = []; let fail = true;
  const recent = useRecentPeople(async ({ after }) => {
    cursors.push(after);
    return fail ? { error: "NETWORK_ERROR" } : { memories: numbered(after ? Number(after) + 1 : 0, 21) };
  }, () => {});
  await recent.refresh(); expect(recent.loaded.value).toBe(false);
  fail = false; await recent.retry(); await recent.more();
  expect(recent.memories.value).toHaveLength(40);
  fail = true; await recent.refresh();
  expect(recent.memories.value).toHaveLength(40);
  fail = false; await recent.retry();
  expect(cursors).toEqual(["", "", "19", "", ""]);
  expect(recent.memories.value).toEqual(numbered(0, 20));
});

test("A3 retry deduplicates encounter identities while retaining equal-name encounters", async () => {
  let fail = true;
  const recent = useRecentPeople(async ({ after }) => !after ? { memories: numbered(0, 21) }
    : fail ? { error: "NETWORK_ERROR" } : { memories: [row("19"), row("20"), row("21")] }, () => {});
  await recent.refresh(); await recent.more(); fail = false; await recent.retry();
  expect(recent.memories.value).toEqual(numbered(0, 22));
});

test("A3 account clear discards failed intent and invalidates an in-flight retry", async () => {
  const pending = deferred<{ memories: ReturnType<typeof row>[] }>(); let calls = 0;
  const recent = useRecentPeople(async () => {
    calls++;
    return calls === 1 ? { memories: numbered(0, 21) } : calls === 2 ? { error: "NETWORK_ERROR" }
      : calls === 3 ? pending.promise : { memories: [row("new-owner")] };
  }, () => {});
  await recent.refresh(); await recent.more(); const retry = recent.retry();
  recent.clear(); await recent.refresh(); pending.resolve({ memories: numbered(20, 20) }); await retry;
  await recent.retry();
  expect(calls).toBe(4); expect(recent.memories.value).toEqual([row("new-owner")]); expect(recent.error.value).toBe("");
});

for (const inFlight of [false, true]) test(`A3 removal clears ${inFlight ? "pending" : "failed"} retry state and cannot restore a removed row`, async () => {
  const pending = deferred<{ memories: ReturnType<typeof row>[] }>(); let calls = 0;
  const recent = useRecentPeople(async () => ++calls === 1 ? { memories: numbered(0, 21) }
    : calls === 2 ? { error: "NETWORK_ERROR" } : pending.promise, () => {});
  await recent.refresh(); await recent.more();
  const retry = inFlight ? recent.retry() : Promise.resolve();
  recent.remove("0"); pending.resolve({ memories: [row("0"), row("20")] }); await retry; await recent.retry();
  expect(calls).toBe(inFlight ? 3 : 2);
  expect(recent.memories.value).toEqual(numbered(1, 19)); expect(recent.error.value).toBe("");
});

test("A3 unauthorized retry clears prior rows and cannot be retried with an old cursor", async () => {
  let calls = 0, ended = 0;
  const recent = useRecentPeople(async () => ++calls === 1 ? { memories: numbered(0, 21) }
    : { error: calls === 2 ? "NETWORK_ERROR" : "UNAUTHORIZED" }, () => { ended++; });
  await recent.refresh(); await recent.more(); await recent.retry(); await recent.retry();
  expect(ended).toBe(1); expect(calls).toBe(3); expect(recent.memories.value).toEqual([]); expect(recent.loaded.value).toBe(false);
});

test("A3 a stale retry error cannot replace a newer successful refresh or become retryable", async () => {
  const old = deferred<{ error: string }>(); let calls = 0;
  const recent = useRecentPeople(async () => ++calls === 1 ? { memories: numbered(0, 21) }
    : calls === 2 ? { error: "NETWORK_ERROR" } : calls === 3 ? old.promise : { memories: [row("new")] }, () => {});
  await recent.refresh(); await recent.more(); const retry = recent.retry(); await recent.refresh();
  old.resolve({ error: "NETWORK_ERROR" }); await retry; await recent.retry();
  expect(calls).toBe(4); expect(recent.error.value).toBe(""); expect(recent.memories.value).toEqual([row("new")]);
});
