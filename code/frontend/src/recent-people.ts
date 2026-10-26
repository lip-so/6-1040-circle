import { ref } from "vue";
import type { CircleWireHttp } from "../../generated/wire.ts";
import { attempt, RequestScope } from "./request-scope.ts";

export type SavedMemory = CircleWireHttp["/memories/list"]["output"]["memories"][number];
type PageReader = (input: { after: string }) => Promise<{ memories: SavedMemory[] } | { error: string }>;

export function useRecentPeople(read: PageReader, unauthorized: () => void) {
  const memories = ref<SavedMemory[]>([]);
  const loading = ref(false);
  const loaded = ref(false);
  const error = ref("");
  const hasMore = ref(false);
  const scope = new RequestScope();
  let failedPage: { after: string; append: boolean } | null = null;

  function clear() {
    scope.invalidate();
    failedPage = null;
    memories.value = [];
    error.value = "";
    loading.value = false;
    loaded.value = false;
    hasMore.value = false;
  }

  function remove(memory: string) {
    scope.invalidate();
    failedPage = null;
    error.value = "";
    loading.value = false;
    memories.value = memories.value.filter(row => row.memory !== memory);
  }

  async function page(after: string, append: boolean) {
    scope.invalidate();
    failedPage = null;
    const current = scope.current();
    loading.value = true;
    error.value = "";
    const answer = await attempt(() => read({ after }));
    if (!current()) return;
    loading.value = false;
    if ("error" in answer) {
      if (answer.error === "UNAUTHORIZED") { clear(); unauthorized(); return; }
      failedPage = { after, append };
      error.value = "Couldn't load your saved people. Try again.";
      return;
    }
    const rows = answer.memories.slice(0, 20);
    const combined = append ? [...memories.value, ...rows] : rows;
    memories.value = [...new Map(combined.map(row => [row.memory, row])).values()];
    hasMore.value = answer.memories.length > 20;
    loaded.value = true;
  }

  const refresh = () => page("", false);
  const more = () => loading.value || !hasMore.value ? Promise.resolve()
    : page(memories.value.at(-1)?.memory ?? "", true);
  const retry = () => loading.value || !failedPage ? Promise.resolve() : page(failedPage.after, failedPage.append);
  return { memories, loading, loaded, error, hasMore, clear, remove, refresh, more, retry };
}
