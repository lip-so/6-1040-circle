import { computed, ref, watch } from "vue";
import fixtures from "../../../design-docs/p5/data/encounters.json";
import { api } from "./api/client.ts";
import { attempt } from "./request-scope.ts";
import { useSession } from "./reusable/session.ts";

const storageKey = "circle-test-setup-v1";
interface Plan {
  version: string;
  username: string;
  completed: number;
  notes: { content: string; submission: string; timeZone: string }[];
}
const token = /^[\da-f]{8}-[\da-f]{4}-4[\da-f]{3}-[89ab][\da-f]{3}-[\da-f]{12}$/iu;
function readPlan(): Plan | null {
  try {
    const value = JSON.parse(sessionStorage.getItem(storageKey) ?? "null");
    if (!value || value.version !== fixtures.version || !/^test_[a-f0-9]{24}$/u.test(value.username) ||
      !Number.isInteger(value.completed) || value.completed < 0 || value.completed > fixtures.encounters.length ||
      !Array.isArray(value.notes) || value.notes.length !== fixtures.encounters.length ||
      !value.notes.every((note: Plan["notes"][number], index: number) => note && note.content === fixtures.encounters[index]!.content && token.test(note.submission) && typeof note.timeZone === "string")) return null;
    return value;
  } catch { return null; }
}

/** Local setup bookkeeping is never a credential; every write uses the normal cookie. */
export function useTestMode(onReady: () => void) {
  const session = useSession();
  const plan = ref<Plan | null>(readPlan());
  const entering = ref(false), running = ref(false), error = ref("");
  const unconfirmed = ref(false), stopped = ref(false);
  const storageWarning = ref("");
  let revision = 0;
  const matches = computed(() => !!plan.value && session.me.value?.username === plan.value.username);
  const active = computed(() => matches.value);
  const ready = computed(() => matches.value && plan.value!.completed === fixtures.encounters.length);
  const setupVisible = computed(() => matches.value && !ready.value);
  const hasRun = computed(() => !!plan.value || unconfirmed.value || entering.value);
  const completed = computed(() => plan.value?.completed ?? 0);
  const total = fixtures.encounters.length;
  function persist() {
    try {
      if (plan.value) sessionStorage.setItem(storageKey, JSON.stringify(plan.value));
      else sessionStorage.removeItem(storageKey);
      storageWarning.value = "";
    } catch { storageWarning.value = "This tab couldn't retain setup progress for a reload. Keep it open to finish."; }
  }
  function invalidate() { revision += 1; running.value = false; }
  watch(session.me, () => {
    if (plan.value && !matches.value) {
      invalidate(); stopped.value = true;
      error.value = session.me.value ? "Setup stopped because the signed-in account changed. No more fictional encounters will be saved." : "Your test session has ended. Exit test mode before starting again.";
    }
  }, { flush: "sync" });

  async function run() {
    if (running.value || entering.value || stopped.value || session.signingOut.value || !plan.value) return;
    running.value = true; error.value = "";
    const request = ++revision;
    const current = () => request === revision && !session.signingOut.value;
    try {
      while (plan.value.completed < total) {
        // Confirm the live cookie again before dispatch, including reload and retry.
        const confirmed = await session.load();
        if (!current()) return;
        if (!confirmed || !matches.value) {
          if (!session.me.value && !session.error.value) {
            stopped.value = true;
            error.value = "Your test session has ended. Exit test mode before starting again.";
          } else error.value = "Couldn't confirm this test account. Retry to check its session before continuing.";
          return;
        }
        const note = plan.value.notes[plan.value.completed]!;
        const answer = await attempt(() => api.memories.remember({ ...note }));
        if (!current() || !matches.value) return;
        if ("error" in answer) {
          if (answer.error === "UNAUTHORIZED") { session.sessionEnded(); return; }
          error.value = answer.error === "CONFLICT"
            ? "This sample encounter conflicts with an earlier save request. Your account and progress are kept; exit if you cannot continue."
            : "We couldn't finish organizing this encounter. It may already be saved. Retry continues in this same test account with the same note and save request.";
          return;
        }
        plan.value.completed += 1;
        persist();
      }
      onReady();
    } finally { if (current()) running.value = false; }
  }
  async function start() {
    if (entering.value || running.value || plan.value || session.me.value || session.signingOut.value) return;
    entering.value = true; error.value = ""; unconfirmed.value = false;
    const request = ++revision;
    const answer = await attempt(() => api.auth.test());
    if (request !== revision) return;
    entering.value = false;
    if ("error" in answer) {
      unconfirmed.value = true;
      error.value = "We couldn't confirm test entry. An account or session may already exist. Retry entry deliberately, or exit; a retry creates another account.";
      return;
    }
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || "America/New_York";
    plan.value = { version: fixtures.version, username: answer.username, completed: 0,
      notes: fixtures.encounters.map(({ content }) => ({ content, submission: crypto.randomUUID(), timeZone })) };
    persist(); stopped.value = false;
    await run();
  }
  async function resume() {
    if (!plan.value) return;
    if (!matches.value) {
      if (!session.me.value && session.error.value) {
        error.value = "Couldn't confirm this test account. Retry setup to check its session before continuing.";
        return;
      }
      stopped.value = true;
      error.value = session.me.value ? "Setup stopped because the signed-in account changed. No more fictional encounters will be saved." : "Your test session could not be confirmed. Exit test mode before starting again.";
      return;
    }
    if (!ready.value) await run();
  }
  function dismiss() {
    invalidate(); plan.value = null; unconfirmed.value = false; entering.value = false;
    error.value = ""; stopped.value = false; persist();
  }
  async function exit() {
    if (session.signingOut.value || entering.value) return;
    invalidate();
    if (plan.value && !ready.value) error.value = "Setup paused. Retry setup to continue in this account, or retry Exit test mode.";
    // Failure leaves the plan and account intact, with explicit ordinary logout retry.
    await session.signOut(dismiss);
  }
  return { active, ready, setupVisible, hasRun, plan, completed, total, entering, running, error, unconfirmed, stopped, storageWarning, start, run, resume, dismiss, exit, invalidate };
}
