<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref, watch } from "vue";
import type { CircleWireHttp } from "../../generated/wire.ts";
import { api } from "./api/client.ts";
import { memorySummary } from "./memory-summary.ts";
import { readMemoryFields, writeMemoryFields } from "../../src/memory-fields.ts";
import { extractEncounter } from "../../src/concepts/graphing-text.ts";
import { useRecentPeople } from "./recent-people.ts";
import { attempt, RequestScope } from "./request-scope.ts";
import CommonsButton from "./reusable/CommonsButton.vue";
import CommonsCallback from "./reusable/CommonsCallback.vue";
import { useSession } from "./reusable/session.ts";

const { me, checked, signingOut, error: accountError, load, signOut, sessionEnded } = useSession();
const callback = ref(window.location.pathname === "/auth/commons/callback");
const mode = ref<"remember" | "find">("find");
const draft = reactive({ person: "", when: "", does: "", discussed: "", contact: "" });
const description = ref("");
const saving = ref(false);
const searching = ref(false);
const saveError = ref("");
const searchError = ref("");
const notice = ref("");
const personField = ref<HTMLInputElement>();
const needField = ref<HTMLTextAreaElement>();
const sessionScope = new RequestScope();
let pendingSave: { submission: string; content: string } | null = null;
const recent = useRecentPeople(input => api.memories.list(input), sessionEnded);
const { memories, loading: loadingPeople, loaded: loadedPeople, error: peopleError, hasMore } = recent;
const people = computed(() => memories.value.map(memory => {
  const label = readMemoryFields(memory.content)?.person
    ?? extractEncounter(memory.content).entities.find(entity => entity.kind === "PERSON")?.label
    ?? "Saved encounter";
  return { ...memory, label, details: memorySummary(memory.content, label) };
}));
type Results = CircleWireHttp["/needs/seek"]["output"]["results"];
const results = ref<Results | null>(null);
const suggestions = computed(() => results.value?.suggestions.map(suggestion => ({
  ...suggestion, details: memorySummary(suggestion.content, suggestion.label),
})) ?? []);

onMounted(() => {
  if (!callback.value) void load();
  window.addEventListener("focus", refreshOnFocus);
});
onBeforeUnmount(() => {
  window.removeEventListener("focus", refreshOnFocus);
  sessionScope.invalidate();
  recent.clear();
});
watch(description, () => { results.value = null; searchError.value = ""; });
watch(draft, () => { saveError.value = ""; });
watch([me, signingOut], () => {
  sessionScope.invalidate();
  recent.clear();
  saving.value = false;
  searching.value = false;
  clearDraft();
  description.value = "";
  results.value = null;
  notice.value = "";
  saveError.value = "";
  searchError.value = "";
  mode.value = "find";
  if (me.value && !signingOut.value) void recent.refresh();
}, { flush: "sync" });

async function refreshOnFocus() {
  if (!me.value || signingOut.value) return;
  const current = sessionScope.current();
  const authenticated = await load();
  if (authenticated && current() && me.value && !signingOut.value) void recent.refresh();
}

function finishedCommons() {
  callback.value = false;
  if (!checked.value) void load();
}

function clearDraft() {
  pendingSave = null;
  Object.assign(draft, { person: "", when: "", does: "", discussed: "", contact: "" });
}

async function switchMode(next: "remember" | "find") {
  mode.value = next;
  notice.value = "";
  await nextTick();
  if (next === "remember") personField.value?.focus();
  else needField.value?.focus();
}

async function remember() {
  if (saving.value || signingOut.value) return;
  saveError.value = "";
  notice.value = "";
  if (!draft.person.trim()) { saveError.value = "Enter the person’s name."; return; }
  saving.value = true;
  const current = sessionScope.current();
  const content = writeMemoryFields(draft);
  if (!pendingSave || pendingSave.content !== content) pendingSave = { submission: crypto.randomUUID(), content };
  const answer = await attempt(() => api.memories.remember(pendingSave!));
  if (!current()) return;
  saving.value = false;
  if ("error" in answer) {
    if (answer.error === "UNAUTHORIZED") return sessionEnded();
    saveError.value = answer.error === "INVALID_REQUEST"
      ? "The note couldn't be accepted. Check the text and try again."
      : answer.error === "CONFLICT" ? "This save token was already used. Edit the note before saving again."
      : "We couldn't finish saving or indexing. Check Recent people; retrying this same note won't create a duplicate.";
    void recent.refresh();
    return;
  }
  clearDraft();
  mode.value = "find";
  notice.value = "Memory saved.";
  void recent.refresh();
  await nextTick();
  needField.value?.focus();
}

async function seek() {
  if (searching.value || signingOut.value) return;
  searchError.value = "";
  notice.value = "";
  if (!description.value.trim()) { searchError.value = "Describe what you need help with first."; return; }
  searching.value = true;
  results.value = null;
  const current = sessionScope.current();
  const answer = await attempt(() => api.needs.seek({ description: description.value }));
  if (!current()) return;
  searching.value = false;
  if ("error" in answer) {
    if (answer.error === "UNAUTHORIZED") return sessionEnded();
    searchError.value = answer.error === "INVALID_REQUEST"
      ? "The search couldn't be accepted. Check your description and try again."
      : "We couldn't finish this search. Your need may already be saved. Try searching again.";
    return;
  }
  results.value = answer.results;
}
</script>

<template>
  <a class="skip" href="#main">Skip to content</a>
  <header class="topbar">
    <a class="brand" href="/" aria-label="Circle home">Circle</a>
    <div v-if="me" class="account">
      <span>{{ me.username }}</span>
      <button class="text-button" type="button" :disabled="signingOut" @click="signOut">{{ signingOut ? "Signing out…" : "Sign out" }}</button>
    </div>
  </header>

  <main id="main">
    <CommonsCallback v-if="callback" @done="finishedCommons" />
    <p v-else-if="!checked" class="status" role="status">Opening Circle…</p>
    <section v-else-if="!me" class="sign-in">
      <h1 class="sr-only">Sign in to Circle</h1>
      <CommonsButton />
      <p v-if="accountError" class="refusal" role="alert">{{ accountError }}</p>
    </section>

    <template v-else>
      <p v-if="accountError" class="refusal" role="alert">{{ accountError }}</p>
      <p v-if="notice" class="status" role="status">{{ notice }}</p>

      <div class="mode-toggle" role="group" aria-label="Circle mode">
        <button type="button" :aria-pressed="mode === 'remember'" :disabled="saving || searching || signingOut" @click="switchMode('remember')">Remember</button>
        <button type="button" :aria-pressed="mode === 'find'" :disabled="saving || searching || signingOut" @click="switchMode('find')">Find</button>
      </div>

      <form v-if="mode === 'remember'" class="memory-form" :aria-busy="saving" @submit.prevent="remember">
        <h1>Remember someone</h1>
        <fieldset :disabled="saving || signingOut">
          <div class="field-pair">
            <div><label for="person">Person <span class="required" aria-hidden="true">*</span></label><input id="person" ref="personField" v-model="draft.person" required placeholder="Name" /></div>
            <div><label for="when">When</label><input id="when" v-model="draft.when" placeholder="e.g. October 16, 2026" /></div>
          </div>
          <label for="does">What they do</label>
          <input id="does" v-model="draft.does" placeholder="e.g. Founder of an AI-chip startup" />
          <label for="contact">Contact</label>
          <input id="contact" v-model="draft.contact" placeholder="Phone number or LinkedIn URL" :spellcheck="false" />
          <label for="discussed">What you discussed</label>
          <textarea id="discussed" v-model="draft.discussed" rows="2" placeholder="e.g. Systems engineering" />
        </fieldset>
        <p v-if="saveError" class="refusal" role="alert">{{ saveError }}</p>
        <div class="form-actions">
          <button class="button primary" type="submit" :disabled="saving || signingOut">{{ saving ? "Saving…" : "Save" }}</button>
        </div>
      </form>

      <form v-else class="search-form" :aria-busy="searching" @submit.prevent="seek">
        <h1><label for="need">Who could help?</label></h1>
        <textarea id="need" ref="needField" v-model="description" rows="2" :disabled="searching || saving || signingOut" required placeholder="What do you need help with?" />
        <p v-if="searchError" class="refusal" role="alert">{{ searchError }}</p>
        <div class="form-actions">
          <button class="button primary" type="submit" :disabled="searching || saving || signingOut">{{ searching ? "Finding…" : "Find" }}</button>
        </div>
      </form>

      <section v-if="mode === 'find' && results" class="results" aria-label="Suggestions" aria-live="polite">
        <p v-if="results.suggestions.length === 0" class="status">No saved encounters matched this need.</p>
        <article v-for="suggestion in suggestions" :key="`${suggestion.target}:${suggestion.source}`" class="person">
          <h2>{{ suggestion.label }}</h2>
          <dl class="memory-details">
            <div v-for="detail in suggestion.details" :key="detail.label"><dt>{{ detail.label }}</dt><dd>{{ detail.value }}</dd></div>
          </dl>
          <details><summary>Original note</summary><blockquote>{{ suggestion.content }}</blockquote></details>
        </article>
      </section>

      <section class="recent-people" aria-labelledby="recent-heading" :aria-busy="loadingPeople">
        <h2 id="recent-heading">Recent people</h2>
        <p v-if="loadingPeople && !loadedPeople" class="status" role="status">Loading saved people…</p>
        <p v-if="peopleError" class="refusal" role="alert">{{ peopleError }} <button class="text-button" type="button" :disabled="loadingPeople" @click="recent.refresh">Retry</button></p>
        <p v-else-if="loadedPeople && !people.length && !loadingPeople" class="status">No saved people yet.</p>
        <article v-for="person in people" :key="person.memory" class="recent-person">
          <h3>{{ person.label }}</h3>
          <dl class="memory-details">
            <div v-for="detail in person.details" :key="detail.label"><dt>{{ detail.label }}</dt><dd>{{ detail.value }}</dd></div>
          </dl>
          <details><summary>Your note <span aria-hidden="true">›</span></summary><blockquote>{{ person.content }}</blockquote></details>
        </article>
        <div v-if="hasMore" class="recent-actions"><button class="text-button" type="button" :disabled="loadingPeople" @click="recent.more">{{ loadingPeople ? "Loading…" : "Load more" }}</button></div>
      </section>
    </template>
  </main>
</template>
