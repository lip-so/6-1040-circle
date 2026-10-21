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
