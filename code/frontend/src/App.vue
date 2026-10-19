<script setup lang="ts">
import { computed, nextTick, onMounted, reactive, ref, watch } from "vue";
import type { CircleWireHttp } from "../../generated/wire.ts";
import { api } from "./api/client.ts";
import { memorySummary } from "./memory-summary.ts";
import { writeMemoryFields } from "../../src/memory-fields.ts";
import CommonsButton from "./reusable/CommonsButton.vue";
import CommonsCallback from "./reusable/CommonsCallback.vue";
import { useSession } from "./reusable/session.ts";

const { me, checked, signingOut, error: accountError, load, signOut, sessionEnded } = useSession();
const callback = ref(window.location.pathname === "/auth/commons/callback");
const mode = ref<"remember" | "find">("find");
const draft = reactive({ person: "", when: "", does: "", discussed: "" });
const description = ref("");
const saving = ref(false);
const searching = ref(false);
const saveError = ref("");
const searchError = ref("");
const notice = ref("");
const personField = ref<HTMLInputElement>();
const needField = ref<HTMLTextAreaElement>();
type Results = CircleWireHttp["/needs/seek"]["output"]["results"];
const results = ref<Results | null>(null);
const suggestions = computed(() => results.value?.suggestions.map(suggestion => ({
  ...suggestion, details: memorySummary(suggestion.content, suggestion.label),
})) ?? []);

onMounted(() => { if (!callback.value) void load(); });
watch(description, () => { results.value = null; searchError.value = ""; });
watch(draft, () => { saveError.value = ""; });
watch(me, () => {
  clearDraft();
  description.value = "";
  results.value = null;
  notice.value = "";
  saveError.value = "";
  searchError.value = "";
  mode.value = "find";
});

function finishedCommons() {
  callback.value = false;
  if (!checked.value) void load();
}

function clearDraft() {
  Object.assign(draft, { person: "", when: "", does: "", discussed: "" });
}

async function switchMode(next: "remember" | "find") {
  mode.value = next;
  notice.value = "";
  await nextTick();
  if (next === "remember") personField.value?.focus();
  else needField.value?.focus();
}

async function remember() {
  saveError.value = "";
  notice.value = "";
  if (!draft.person.trim()) { saveError.value = "Enter the person’s name."; return; }
  saving.value = true;
  const answer = await api.memories.remember({ content: writeMemoryFields(draft) });
  saving.value = false;
  if ("error" in answer) {
    if (answer.error === "UNAUTHORIZED") return sessionEnded();
    saveError.value = answer.error === "INVALID_REQUEST"
      ? "The note couldn't be accepted. Check the text and try again."
      : "We couldn't finish saving this memory. Your note may already be saved; your entries are still here.";
    return;
  }
  clearDraft();
  mode.value = "find";
  notice.value = "Memory saved.";
  await nextTick();
  needField.value?.focus();
}

async function seek() {
  searchError.value = "";
  notice.value = "";
  if (!description.value.trim()) { searchError.value = "Describe what you need help with first."; return; }
  searching.value = true;
  results.value = null;
  const answer = await api.needs.seek({ description: description.value });
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
      <button class="text-button" type="button" :disabled="saving || searching || signingOut" @click="signOut">{{ signingOut ? "Signing out…" : "Sign out" }}</button>
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
        <button type="button" :aria-pressed="mode === 'remember'" :disabled="saving || searching" @click="switchMode('remember')">Remember</button>
        <button type="button" :aria-pressed="mode === 'find'" :disabled="saving || searching" @click="switchMode('find')">Find</button>
      </div>

      <form v-if="mode === 'remember'" class="memory-form" :aria-busy="saving" @submit.prevent="remember">
        <h1>Remember someone</h1>
        <fieldset :disabled="saving">
          <div class="field-pair">
            <div><label for="person">Person <span class="required" aria-hidden="true">*</span></label><input id="person" ref="personField" v-model="draft.person" required placeholder="Name" /></div>
            <div><label for="when">When</label><input id="when" v-model="draft.when" placeholder="e.g. October 16, 2026" /></div>
          </div>
          <label for="does">What they do</label>
          <input id="does" v-model="draft.does" placeholder="e.g. Founder of an AI-chip startup" />
          <label for="discussed">What you discussed</label>
          <textarea id="discussed" v-model="draft.discussed" rows="2" placeholder="e.g. Systems engineering" />
        </fieldset>
        <p v-if="saveError" class="refusal" role="alert">{{ saveError }}</p>
        <div class="form-actions">
          <button class="button primary" type="submit" :disabled="saving">{{ saving ? "Saving…" : "Save" }}</button>
        </div>
      </form>

      <form v-else class="search-form" :aria-busy="searching" @submit.prevent="seek">
        <h1><label for="need">Who could help?</label></h1>
        <textarea id="need" ref="needField" v-model="description" rows="2" :disabled="searching || saving" required placeholder="What do you need help with?" />
        <p v-if="searchError" class="refusal" role="alert">{{ searchError }}</p>
        <div class="form-actions">
          <button class="button primary" type="submit" :disabled="searching || saving">{{ searching ? "Finding…" : "Find" }}</button>
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
    </template>
  </main>
</template>
