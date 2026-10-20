import { expect, test } from "bun:test";
import { useRecentPeople } from "../../frontend/src/recent-people.ts";

const row = (memory: string, content = "Met Alex. We discussed robotics.") => ({ memory, content });
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

test("expired sessions clear previous results and request sign-in", async () => {
  let expired = false, ended = 0;
  const recent = useRecentPeople(async () => expired ? { error: "UNAUTHORIZED" } : { memories: [row("old")] }, () => { ended++; });
  await recent.refresh();
  expired = true;
  await recent.refresh();
  expect(recent.memories.value).toEqual([]);
  expect(ended).toBe(1);
});
