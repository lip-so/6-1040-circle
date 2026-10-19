// Adapted from mit-sdg/conceptbox (MIT); see ../../third-party/Conceptbox-LICENSE.
import { ref } from "vue";
import { attempt } from "../request-scope.ts";
import { api } from "../api/client.ts";

interface Me {
  username: string;
}

const me = ref<Me | null>(null);
const checked = ref(false);
const signingOut = ref(false);
const error = ref<string | null>(null);
let revision = 0;

async function load() {
  const request = ++revision;
  const result = await attempt(() => api.auth.me());
  if (request !== revision || signingOut.value) return false;
  if ("error" in result) {
    if (result.error === "UNAUTHORIZED") me.value = null;
    else error.value = "Circle couldn't connect. Try again in a moment.";
  } else {
    if (me.value?.username !== result.username) me.value = result;
    error.value = null;
  }
  checked.value = true;
  return !("error" in result);
}

/**
 * Awaits a sign-in request. On success, loads the signed-in person and returns null. On a refusal, sets
 * `error` to the sentence `messages` gives for the HTTP category, and returns the category.
 */
async function enter(answer: Promise<object>, messages: Record<string, string>): Promise<string | null> {
  const result = await answer;
  if ("error" in result && typeof result.error === "string") {
    error.value = messages[result.error] ?? "Something went wrong. Try again.";
    return result.error;
  }
  error.value = null;
  await load();
  return null;
}

/** Signs out, then reloads the page so that the tab's uploads, polling, and requests stop. */
async function signOut() {
  revision += 1;
  signingOut.value = true;
  const result = await attempt(() => api.auth.logout());
  signingOut.value = false;
  if ("error" in result && result.error !== "UNAUTHORIZED") {
    error.value = "We couldn't sign you out. Try again.";
    return;
  }
  me.value = null;
  window.location.assign("/");
}

/** Shows the sign-in screen when an endpoint call is refused because the session ended. */
function sessionEnded() {
  revision += 1;
  error.value = "Your session has ended. Sign in again.";
  me.value = null;
}

/** The signed-in person, and the functions that call `/auth/me` and `/auth/logout`, shared by every component and every way of signing in. */
export function useSession() {
  return { me, checked, signingOut, error, load, enter, signOut, sessionEnded };
}
