<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import type { CircleWireHttp } from "../../generated/wire.ts";
import { api } from "./api/client.ts";
import { readMemoryFields } from "../../src/memory-fields.ts";
import { extractEncounter } from "../../src/concepts/Graphing/graphing-text.ts";
import { memorySummary } from "./memory-summary.ts";
import { useRecentPeople } from "./recent-people.ts";
import { attempt, RequestScope } from "./request-scope.ts";
import { VoiceCapture } from "./voice.ts";
import CommonsButton from "./reusable/CommonsButton.vue";
import ActionIcon from "./reusable/ActionIcon.vue";
import AnimatedBackdrop from "./reusable/AnimatedBackdrop.vue";
import SuggestionCard from "./reusable/SuggestionCard.vue";
import CommonsCallback from "./reusable/CommonsCallback.vue";
import { useSession } from "./reusable/session.ts";

type Need = CircleWireHttp["/needs/list"]["output"]["needs"][number];
type Suggestion = CircleWireHttp["/suggestions/list"]["output"]["suggestions"][number];
type Memory = CircleWireHttp["/memories/get"]["output"]["memory"];
const { me, checked, signingOut, error: accountError, load, signOut, sessionEnded } = useSession();
const callback = ref(window.location.pathname === "/auth/commons/callback");
const mode = ref<"remember" | "find">("find");
const artworkGesture = ref(0);
const draft = ref("");
const description = ref("");
const needs = ref<Need[]>([]);
const suggestions = ref<Suggestion[]>([]);
const selectedNeed = ref("");
const working = ref(false);
const workspaceLoading = ref(false);
const workspaceLoaded = ref(false);
const workspaceError = ref("");
const error = ref("");
const notice = ref("");
const recording = ref(false);
const openingMic = ref(false);
const transcribing = ref(false);
const voiceError = ref("");
const inspected = ref<Memory | null>(null);
const inspecting = ref(false);
const editContent = ref("");
const editingMemory = ref(false);
const deletingMemory = ref(false);
const editingNeed = ref("");
const editDescription = ref("");
const deletingNeed = ref("");
const noteField = ref<HTMLTextAreaElement>();
const needField = ref<HTMLInputElement>();
const expandedSearches = ref(false);
const accountScope = new RequestScope();
const workspaceScope = new RequestScope();
const inspectionScope = new RequestScope();
const voiceScope = new RequestScope();
const voice = new VoiceCapture();
let pendingSave: { content: string; submission: string } | null = null;
const recent = useRecentPeople(input => api.memories.list(input), sessionEnded);
const { memories, loading: loadingPeople, loaded: loadedPeople, error: peopleError, hasMore } = recent;
const busy = computed(() => working.value || signingOut.value);
const activeNeeds = computed(() => needs.value.filter(need => need.active));
const visibleNeeds = computed(() => expandedSearches.value ? activeNeeds.value : activeNeeds.value.slice(0, 4));
const resolvedNeeds = computed(() => needs.value.filter(need => !need.active));
const shownSuggestions = computed(() => selectedNeed.value
  ? suggestions.value.filter(suggestion => suggestion.need === selectedNeed.value) : suggestions.value);
const people = computed(() => memories.value.map(memory => {
  const label = readMemoryFields(memory.content)?.person
    ?? extractEncounter(memory.content).entities.find(entity => entity.kind === "PERSON")?.label
    ?? "Saved encounter";
  const guided = Boolean(readMemoryFields(memory.content));
  const longNote = memory.content.length > 220 || memory.content.split("\n").length > 3;
  return { ...memory, label, guided, longNote, preview: longNote ? `${memory.content.slice(0, 220).trimEnd()}…` : memory.content, details: guided ? memorySummary(memory.content, label) : [] };
}));

function code(value: unknown): string {
  if (typeof value === "string") return value;
  return value && typeof value === "object" && "code" in value ? String(value.code) : "INTERNAL_ERROR";
}
function failed(value: unknown, fallback: string) {
  if (code(value) === "UNAUTHORIZED") sessionEnded();
  else error.value = code(value) === "NOT_FOUND" ? "This item is no longer available. Refresh and try again." : fallback;
}
function cancelVoice() {
  voiceScope.invalidate();
  voice.cancel();
  recording.value = openingMic.value = transcribing.value = false;
}
function clearAccount() {
  accountScope.invalidate(); workspaceScope.invalidate(); inspectionScope.invalidate();
  cancelVoice(); recent.clear();
  draft.value = description.value = selectedNeed.value = "";
  needs.value = []; suggestions.value = []; inspected.value = null; inspecting.value = false;
  editingNeed.value = deletingNeed.value = "";
  editingMemory.value = deletingMemory.value = false;
  working.value = workspaceLoading.value = workspaceLoaded.value = false;
  error.value = notice.value = workspaceError.value = voiceError.value = "";
  pendingSave = null; expandedSearches.value = false;
  mode.value = "find";
}
watch([me, signingOut], () => {
  clearAccount();
  if (me.value && !signingOut.value) { void recent.refresh(); void loadWorkspace(); }
}, { flush: "sync", immediate: true });
watch(description, value => {
  if (needs.value.find(need => need.need === selectedNeed.value)?.description !== value) selectedNeed.value = "";
});
watch(draft, () => { error.value = ""; });
onMounted(() => { if (!callback.value) void load(); window.addEventListener("focus", refreshOnFocus); });
onBeforeUnmount(() => { window.removeEventListener("focus", refreshOnFocus); clearAccount(); });
async function refreshOnFocus() {
  if (!me.value || signingOut.value) return;
  const current = accountScope.current();
  if (await load() && current() && me.value && !signingOut.value) {
    void recent.refresh(); void loadWorkspace();
  }
}
function finishedCommons() { callback.value = false; if (!checked.value) void load(); }
async function switchMode(next: "remember" | "find") {
  if (next !== "remember") cancelVoice();
  mode.value = next; notice.value = error.value = "";
  await nextTick();
  (next === "remember" ? noteField.value : needField.value)?.focus();
}

async function loadWorkspace() {
  workspaceScope.invalidate();
  const current = workspaceScope.current();
  workspaceLoading.value = true; workspaceError.value = "";
  suggestions.value = [];
  const [saved, offered] = await Promise.all([
    attempt(() => api.needs.list()), attempt(() => api.suggestions.list()),
  ]);
  if (!current()) return;
  workspaceLoading.value = false;
  if ("error" in saved || "error" in offered) {
    const failure = "error" in saved ? saved.error : "error" in offered ? offered.error : "";
    if (code(failure) === "UNAUTHORIZED") return sessionEnded();
    needs.value = "error" in saved ? [] : saved.needs;
    workspaceError.value = "Couldn't load your searches. Submit a search to try again.";
    return;
  }
  needs.value = saved.needs; suggestions.value = offered.suggestions;
  workspaceLoaded.value = true;
  if (!saved.needs.some(need => need.need === selectedNeed.value && need.active)) selectedNeed.value = "";
}

async function remember() {
  if (busy.value || transcribing.value || recording.value || openingMic.value) return;
  if (!draft.value.trim()) { error.value = "Add a note first."; return; }
  error.value = notice.value = ""; working.value = true;
  const current = accountScope.current();
  if (!pendingSave || pendingSave.content !== draft.value) pendingSave = { content: draft.value, submission: crypto.randomUUID() };
  const answer = await attempt(() => api.memories.remember(pendingSave!));
  if (!current()) return;
  working.value = false;
  if ("error" in answer) {
    failed(answer.error, "Couldn't finish saving this memory. Your note may already be saved below; retrying this unchanged draft won't duplicate it.");
    void recent.refresh(); void loadWorkspace(); return;
  }
  pendingSave = null; draft.value = "";
  notice.value = "Memory saved."; mode.value = "find";
  void recent.refresh(); void loadWorkspace();
}

async function startVoice() {
  if (busy.value || openingMic.value || recording.value || transcribing.value) return;
  cancelVoice(); voiceError.value = ""; openingMic.value = true;
  const current = voiceScope.current();
  try {
    const started = await voice.start(() => {
      cancelVoice(); voiceError.value = "Recording stopped. Try a shorter note (under two minutes), or type it here.";
    });
    if (!current()) return;
    recording.value = started;
  } catch {
    if (current()) voiceError.value = "Couldn't open the microphone. Check permission, or type your note.";
  } finally { if (current()) openingMic.value = false; }
}
async function finishVoice() {
  if (!recording.value) return;
  recording.value = false; transcribing.value = true;
  const current = voiceScope.current();
  try {
    const audio = await voice.finish();
    if (!audio || !current()) return;
    const answer = await attempt(() => api.capture.transcribe(audio));
    if (!current()) return;
    if ("error" in answer) {
      if (code(answer.error) === "UNAUTHORIZED") return sessionEnded();
      voiceError.value = "Couldn't transcribe the recording. Try again or type your note.";
    } else {
      draft.value += `${draft.value.trim() ? "\n" : ""}${answer.content}`;
      notice.value = "Transcribed. Review the text before saving.";
      await nextTick(); noteField.value?.focus();
    }
  } catch { if (current()) voiceError.value = "Couldn't read the recording. Try again or type your note."; }
  finally { if (current()) transcribing.value = false; }
}

async function seek() {
  if (busy.value) return;
  if (!description.value.trim()) { error.value = "Describe what you're looking for first."; return; }
  working.value = true; error.value = notice.value = "";
  const current = accountScope.current();
  const answer = await attempt(() => api.needs.seek({ description: description.value }));
  if (!current()) return;
  working.value = false;
  if ("error" in answer) failed(answer.error, "Couldn't finish the search. Your search is kept; submit the arrow to try again.");
  else if ("results" in answer) selectedNeed.value = answer.results.need;
  await loadWorkspace();
  if (current()) await revealSelectedNeed();
}
async function revealSelectedNeed() {
  const index = activeNeeds.value.findIndex(need => need.need === selectedNeed.value);
  if (index < 0) return;
  if (index >= 4) expandedSearches.value = true;
  await nextTick();
  const heading = document.getElementById(`matches-title-${selectedNeed.value}`);
  heading?.focus({ preventScroll: true });
  heading?.scrollIntoView({ block: "nearest" });
}
async function collapseSelectedNeed() {
  const previous = selectedNeed.value;
  selectedNeed.value = "";
  await nextTick();
  document.getElementById(`search-${previous}`)?.focus({ preventScroll: true });
}
function toggleSearches() {
  expandedSearches.value = !expandedSearches.value;
  if (!expandedSearches.value && activeNeeds.value.findIndex(need => need.need === selectedNeed.value) >= 4) selectedNeed.value = "";
}
async function selectNeed(need: Need) {
  if (selectedNeed.value === need.need) { selectedNeed.value = ""; return; }
  description.value = need.description; selectedNeed.value = need.need; error.value = "";
  await revealSelectedNeed();
}
async function changeNeed(need: Need, action: "resolve" | "reopen" | "delete" | "revise") {
  if (busy.value) return;
  working.value = true; error.value = "";
  const current = accountScope.current();
  const answer = action === "revise" ? await attempt(() => api.needs.revise({ need: need.need, description: editDescription.value }))
    : await attempt(async () => await api.needs[action]({ need: need.need }));
  if (!current()) return;
  working.value = false;
  if ("error" in answer) failed(answer.error, "Couldn't update this search. Try again.");
  else { editingNeed.value = deletingNeed.value = ""; if (selectedNeed.value === need.need && action !== "revise") selectedNeed.value = ""; }
  await loadWorkspace();
}
async function excludeSuggestion(suggestion: Suggestion, explanation: string, done: (success: boolean) => void) {
  if (busy.value) return;
  working.value = true; error.value = "";
  const current = accountScope.current();
  const answer = await attempt(() => api.suggestions.exclude({ connection: suggestion.connection, explanation }));
  if (!current()) return;
  working.value = false;
  if ("error" in answer) { failed(answer.error, "Couldn't save this preference. Your explanation is kept; try again."); done(false); }
  else { done(true); notice.value = "This person won't be recommended in any of your searches."; await loadWorkspace(); if (selectedNeed.value) await revealSelectedNeed(); else { await nextTick(); document.getElementById("suggestions-title")?.focus(); } }
}

async function inspect(memory: string, preserveEdit = false) {
  const unsavedEdit = editContent.value;
  const keepEditing = preserveEdit && editingMemory.value;
  inspectionScope.invalidate();
  const current = inspectionScope.current();
  const accountCurrent = accountScope.current();
  inspected.value = null; inspecting.value = true; error.value = "";
  const answer = await attempt(() => api.memories.get({ memory }));
  if (!current() || !accountCurrent()) return;
  inspecting.value = false;
  if ("error" in answer) return failed(answer.error, "Couldn't open this encounter. Try again.");
  inspected.value = answer.memory; editContent.value = preserveEdit ? unsavedEdit : answer.memory.content;
  editingMemory.value = keepEditing; deletingMemory.value = false;
  if (!preserveEdit) {
    await nextTick();
    if (current() && accountCurrent()) document.getElementById("inspection-title")?.focus({ preventScroll: false });
  }
}
function closeInspection() { inspectionScope.invalidate(); inspected.value = null; inspecting.value = false; editingMemory.value = deletingMemory.value = false; }
async function changeMemory(action: "revise" | "forget") {
  if (!inspected.value || busy.value) return;
  const memory = inspected.value.memory;
  const current = accountScope.current();
  working.value = true; error.value = "";
  suggestions.value = [];
  inspected.value = { ...inspected.value, claims: [] };
  const answer = action === "revise" ? await attempt(() => api.memories.revise({ memory, content: editContent.value }))
    : await attempt(async () => await api.memories[action]({ memory }));
  if (!current()) return;
  if ("error" in answer) {
    const failure = answer.error;
    await inspect(memory, action === "revise");
    if (!current()) return;
    failed(failure, action === "revise"
      ? "Your edit may be saved, but Circle couldn't finish understanding it. Your draft is kept here; try saving again."
      : "Couldn't finish the update. Refresh and try again.");
  }
  else {
    notice.value = action === "forget" ? "Encounter deleted." : "Encounter updated.";
    if (action === "forget") closeInspection(); else await inspect(memory);
  }
  void recent.refresh(); await loadWorkspace();
  if (current()) working.value = false;
}
</script>

<template>
  <a class="skip" href="#main">Skip to content</a>
  <header class="topbar">
    <a class="brand" href="/" aria-label="Circle home">Circle<span class="brand-period" aria-hidden="true">.</span></a>
    <div v-if="me" class="account"><span>{{ me.username }}</span><button class="text-button" :disabled="signingOut" @click="signOut">{{ signingOut ? "Signing out…" : "Sign out" }}</button></div>
  </header>
  <main id="main">
    <CommonsCallback v-if="callback" @done="finishedCommons" />
    <p v-else-if="!checked" class="status" role="status">Opening Circle…</p>
    <section v-else-if="!me" class="sign-in">
      <div class="sign-in-copy"><h1>Remember the<br />people you meet<span class="vermilion">.</span></h1><p class="lead">Find them when you need them.</p><div @click="artworkGesture++"><CommonsButton /></div><p v-if="accountError" class="refusal" role="alert">{{ accountError }}</p></div>
      <AnimatedBackdrop :gesture="artworkGesture" />
    </section>
    <template v-else>
      <p v-if="accountError" class="refusal" role="alert">{{ accountError }}</p>
      <p v-if="notice" class="status" role="status">{{ notice }}</p>
      <p v-if="error" class="refusal" role="alert">{{ error }}</p>
      <div class="workspace-composition" @click="artworkGesture++" @submit="artworkGesture++">
        <div class="mode-toggle" role="group" aria-label="Circle mode">
          <button :aria-pressed="mode === 'remember'" :disabled="busy" @click="switchMode('remember')">Remember</button>
          <button :aria-pressed="mode === 'find'" :disabled="busy" @click="switchMode('find')">Find</button>
        </div>
        <form v-if="mode === 'remember'" class="memory-form" :aria-busy="working || transcribing" @submit.prevent="remember">
          <label for="note" class="sr-only">Remember someone</label>
          <div class="capture-composer" :class="{ 'voice-active': recording || openingMic || transcribing }">
            <textarea id="note" ref="noteField" v-model="draft" rows="3" maxlength="20000" required :disabled="busy" aria-describedby="capture-hint" placeholder="Who did you meet?" />
            <div class="composer-footer">
              <p id="capture-hint" class="hint capture-hint">Name, context, what mattered.<span> Contact if useful.</span></p>
              <div class="composer-actions">
                <button v-if="recording" class="icon-button composer-action mic-action" type="button" aria-label="Stop and transcribe recording" title="Stop & transcribe" @click="finishVoice"><ActionIcon name="stop" /></button>
                <button v-else class="icon-button composer-action mic-action" type="button" :disabled="busy || openingMic || transcribing" :aria-label="openingMic ? 'Opening microphone' : transcribing ? 'Transcribing recording' : 'Record a voice note'" :title="openingMic ? 'Opening microphone…' : transcribing ? 'Transcribing…' : 'Record a voice note'" @click="startVoice"><ActionIcon name="mic" /></button>
                <button class="icon-button composer-action save-action" :disabled="busy || recording || openingMic || transcribing" :aria-label="working ? 'Saving memory' : 'Save memory'" :title="working ? 'Saving…' : 'Save memory'"><ActionIcon name="arrow" /></button>
              </div>
            </div>
          </div>
          <div v-if="recording || openingMic || transcribing" class="voice-status"><p class="hint" role="status">{{ recording ? 'Recording… Stop when you’re ready.' : openingMic ? 'Opening microphone…' : 'Transcribing… Review before saving.' }}</p><button class="text-button" type="button" @click="cancelVoice">Cancel</button></div>
          <p v-if="voiceError" class="refusal" role="alert">{{ voiceError }}</p>
        </form>
        <form v-else class="find-form" role="search" :aria-busy="working" @submit.prevent="seek">
          <label for="need" class="sr-only">What are you looking for?</label>
          <div class="search-composer"><ActionIcon name="search" /><input id="need" ref="needField" v-model="description" type="search" maxlength="2000" required :disabled="busy" placeholder="Someone connected to robotics research…" /><button class="icon-button composer-action save-action" :disabled="busy" :aria-label="working ? 'Looking for connections' : 'Find connections'" :title="working ? 'Looking…' : 'Find'"><ActionIcon name="arrow" /></button></div>
        </form>
        <AnimatedBackdrop :gesture="artworkGesture" />
      </div>
      <template v-if="mode === 'find'">
        <section class="ongoing" aria-label="Saved searches">
          <p v-if="workspaceLoading" class="hint" role="status">Refreshing searches…</p>
          <p v-if="workspaceError" class="refusal" role="alert">{{ workspaceError }}</p>
          <template v-if="activeNeeds.length">
            <h2>Looking for</h2>
            <div v-for="need in visibleNeeds" :key="need.need" class="need-row">
              <form v-if="editingNeed === need.need" class="inline-edit" @submit.prevent="changeNeed(need, 'revise')">
                <label :for="`edit-${need.need}`" class="sr-only">Edit search</label><textarea :id="`edit-${need.need}`" v-model="editDescription" rows="2" required maxlength="2000" :disabled="busy" />
                <div class="small-actions"><button class="text-button" :disabled="busy">Save</button><button class="text-button" type="button" :disabled="busy" @click="editingNeed = ''">Cancel</button></div>
              </form>
              <template v-else><button :id="`search-${need.need}`" class="need-label text-button" :aria-expanded="selectedNeed === need.need" :aria-controls="`matches-${need.need}`" :disabled="busy" @click="selectNeed(need)">{{ need.description }}</button><div class="need-actions"><button class="icon-button" :disabled="busy" :aria-label="`Mark ${need.description} resolved`" title="Mark resolved" @click="changeNeed(need, 'resolve')"><ActionIcon name="check" /></button><button class="icon-button" :disabled="busy" :aria-label="`Edit search: ${need.description}`" title="Edit search" @click="editingNeed = need.need; editDescription = need.description"><ActionIcon name="edit" /></button><button class="icon-button delete-action" :disabled="busy" :aria-label="`Delete search: ${need.description}`" title="Delete search" @click="deletingNeed = need.need"><ActionIcon name="trash" /></button></div></template>
              <div v-if="deletingNeed === need.need" class="confirm">Delete this saved search? <button class="text-button" :disabled="busy" @click="changeNeed(need, 'delete')">Delete</button> <button class="text-button" :disabled="busy" @click="deletingNeed = ''">Keep</button></div>
              <section v-if="selectedNeed === need.need" :id="`matches-${need.need}`" class="inline-matches" :aria-labelledby="`matches-title-${need.need}`">
                <div class="section-heading"><h3 :id="`matches-title-${need.need}`" tabindex="-1">Suggestions for this search</h3><button class="text-button" @click="collapseSelectedNeed">Collapse</button></div>
                <p v-if="workspaceLoading" class="hint" role="status">Refreshing suggestions…</p>
                <p v-else-if="!shownSuggestions.length" class="hint">No new supported matches yet. Saved encounters will be considered as you add or update them.</p>
                <SuggestionCard v-for="suggestion in shownSuggestions" :key="suggestion.connection" :suggestion="suggestion" :busy="busy" @exclude="excludeSuggestion" @inspect="inspect" />
              </section>
            </div>
            <button v-if="activeNeeds.length > 4" class="text-button expand-searches" :aria-expanded="expandedSearches" @click="toggleSearches">{{ expandedSearches ? 'Show latest four' : `Show all ${activeNeeds.length} searches` }}</button>
            <button v-if="selectedNeed" class="text-button all-searches" :disabled="busy" @click="selectedNeed = ''">Show all searches</button>
          </template>
          <details v-if="resolvedNeeds.length"><summary>Resolved searches ({{ resolvedNeeds.length }})</summary><div v-for="need in resolvedNeeds" :key="need.need" class="need-row"><span class="need-label">{{ need.description }}</span><div class="need-actions"><button class="icon-button" :disabled="busy" :aria-label="`Reopen search: ${need.description}`" title="Reopen search" @click="changeNeed(need, 'reopen')"><ActionIcon name="reopen" /></button><button class="icon-button delete-action" :disabled="busy" :aria-label="`Delete search: ${need.description}`" title="Delete search" @click="deletingNeed = need.need"><ActionIcon name="trash" /></button></div><div v-if="deletingNeed === need.need" class="confirm">Delete this search? <button class="text-button" :disabled="busy" @click="changeNeed(need, 'delete')">Delete</button> <button class="text-button" :disabled="busy" @click="deletingNeed = ''">Keep</button></div></div></details>
        </section>
        <section v-if="activeNeeds.length && workspaceLoaded && !selectedNeed" class="results" aria-labelledby="suggestions-title">
          <h2 id="suggestions-title" tabindex="-1">Suggestions</h2>
          <p v-if="!shownSuggestions.length && !workspaceLoading" class="hint">No new supported matches yet. Saved encounters will be considered as you add or update them.</p>
          <SuggestionCard v-for="suggestion in shownSuggestions" :key="suggestion.connection" :suggestion="suggestion" :busy="busy" :search-description="needs.find(need => need.need === suggestion.need)?.description" @exclude="excludeSuggestion" @inspect="inspect" />
        </section>
      </template>
      <p v-if="inspecting" class="status" role="status">Opening encounter…</p>
      <section v-if="inspected" class="inspection" aria-labelledby="inspection-title">
        <div class="section-heading"><h2 id="inspection-title" tabindex="-1">Saved encounter</h2><div class="inspection-header-actions"><button class="icon-button" :disabled="busy" aria-label="Edit note" title="Edit note" @click="editingMemory = true"><ActionIcon name="edit" /></button><button class="text-button" :disabled="busy" @click="closeInspection">Close</button></div></div>
        <form v-if="editingMemory" @submit.prevent="changeMemory('revise')"><label for="edit-note" class="sr-only">Edit note</label><textarea id="edit-note" v-model="editContent" rows="7" maxlength="20000" required :disabled="busy" /><div class="small-actions"><button class="text-button" :disabled="busy">Save changes</button><button class="text-button" type="button" :disabled="busy" @click="editingMemory = false">Cancel</button></div></form>
        <template v-else><blockquote>{{ inspected.content }}</blockquote><div class="encounter-actions"><button class="icon-button delete-action" :disabled="busy" aria-label="Delete encounter" title="Delete encounter" @click="deletingMemory = true"><ActionIcon name="trash" /></button></div></template>
        <div v-if="deletingMemory" class="confirm">Delete this encounter and its suggestions? <button class="text-button" :disabled="busy" @click="changeMemory('forget')">Delete</button> <button class="text-button" :disabled="busy" @click="deletingMemory = false">Keep</button></div>
      </section>
      <section class="recent-people" aria-labelledby="recent-title">
        <div class="section-heading recent-heading"><h2 id="recent-title">Recent people</h2></div>
        <p v-if="loadingPeople && !loadedPeople" class="hint" role="status">Loading encounters…</p><p v-else-if="loadedPeople && !people.length" class="hint">Your saved encounters will appear here.</p>
        <p v-if="peopleError" class="refusal" role="alert">{{ peopleError }} <button class="text-button" :disabled="loadingPeople" @click="recent.refresh">Retry</button></p>
        <div v-if="people.length" class="people-grid">
          <article v-for="person in people" :key="person.memory" class="recent-person">
            <div class="recent-person-heading"><h3>{{ person.label }}</h3><button class="icon-button" :disabled="busy" :aria-label="`Review or edit ${person.label}`" title="Review / edit encounter" @click="inspect(person.memory)"><ActionIcon name="edit" /></button></div>
            <div class="recent-person-body">
              <dl v-if="person.guided" class="memory-details"><div v-for="detail in person.details" :key="detail.label"><dt>{{ detail.label }}</dt><dd>{{ detail.value }}</dd></div></dl>
              <template v-else><p class="note-preview">{{ person.preview }}</p><details v-if="person.longNote"><summary>Full note</summary><blockquote>{{ person.content }}</blockquote></details></template>
            </div>
          </article>
        </div>
        <div v-if="hasMore" class="recent-actions"><button class="text-button" :disabled="loadingPeople" @click="recent.more">{{ loadingPeople ? "Loading…" : "Load more" }}</button></div>
      </section>
    </template>
  </main>
</template>
