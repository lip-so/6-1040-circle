<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import type { CircleWireHttp } from "../../generated/wire.ts";
import { api } from "./api/client.ts";
import { memoryLabel, memorySummary } from "./memory-summary.ts";
import { validMemoryDate } from "../../src/calendar.ts";
import { hasMemoryFieldContent, writeMemoryFields } from "../../src/memory-fields.ts";
import { editDateReviewMessage, editSizeMessage, emptyFields, hasRelativeEditDate, prepareEncounterEdit, type RawEditReview } from "./encounter-form.ts";
import EncounterFields from "./reusable/EncounterFields.vue";
import EditEncounter from "./reusable/EditEncounter.vue";
import { VoiceCapture } from "./voice.ts";
import { useRemovalConfirmation } from "./removal-confirmation.ts";
import { useRecentPeople } from "./recent-people.ts";
import { attempt, RequestScope } from "./request-scope.ts";
import ActionIcon from "./reusable/ActionIcon.vue";
import AnimatedBackdrop from "./reusable/AnimatedBackdrop.vue";
import RemovalConfirmation from "./reusable/RemovalConfirmation.vue";
import ContactRow from "./reusable/ContactRow.vue";
import CommonsButton from "./reusable/CommonsButton.vue";
import CommonsCallback from "./reusable/CommonsCallback.vue";
import { useSession } from "./reusable/session.ts";

const { me, checked, signingOut, error: accountError, load, signOut, sessionEnded } = useSession();
const callback = ref(window.location.pathname === "/auth/commons/callback");
const mode = ref<"remember" | "find">("find");
const draft = ref("");
const inputMode = ref<"text" | "voice" | "form">("text");
const formDraft = ref(emptyFields());
const editing = ref<{ memory: string; revision: number; fields: ReturnType<typeof emptyFields>; grouped: boolean; rawReview: RawEditReview | null; referenceDate: string } | null>(null);
const preparingEdit = ref(false);
const editingBusy = ref(false);
const editError = ref("");
let pendingEdit: { memory: string; revision: number; content: string; submission: string } | null = null;
const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || "America/New_York";
const recording = ref(false);
const openingMic = ref(false);
const transcribing = ref(false);
const capture = new VoiceCapture();
const voiceScope = new RequestScope();
const description = ref("");
const saving = ref(false);
const searching = ref(false);
const saveError = ref("");
const searchError = ref("");
const removing = ref(false);
const removal = ref<{ memory: string; label: string } | null>(null);
const removalError = ref("");
const confirmation = useRemovalConfirmation(removeConnection);
const { target: removalTarget } = confirmation;
const busy = computed(() => saving.value || searching.value || removing.value || preparingEdit.value || editingBusy.value || signingOut.value || recording.value || openingMic.value || transcribing.value);
const notice = ref("");
const noteField = ref<HTMLTextAreaElement>();
const rememberForm = ref<HTMLFormElement>();
const needField = ref<HTMLInputElement>();
const sessionScope = new RequestScope();
let pendingSave: { submission: string; content: string } | null = null;
const recent = useRecentPeople(input => api.memories.list(input), sessionEnded);
const { memories, loading: loadingPeople, loaded: loadedPeople, error: peopleError, hasMore } = recent;
const people = computed(() => memories.value.map(memory => {
  const label = memoryLabel(memory.content, memory.card);
  return { ...memory, label, details: memorySummary(memory.content, label, memory.card) };
}));
type Results = CircleWireHttp["/needs/seek"]["output"]["results"];
const results = ref<Results | null>(null);
const suggestions = computed(() => results.value?.suggestions.map(suggestion => ({
  ...suggestion, label: memoryLabel(suggestion.content, suggestion.card), details: memorySummary(suggestion.content, suggestion.label, suggestion.card),
})) ?? []);

onMounted(() => {
  if (!callback.value) void load();
  window.addEventListener("focus", refreshOnFocus);
});
onBeforeUnmount(() => {
  window.removeEventListener("focus", refreshOnFocus);
  cancelVoice();
  sessionScope.invalidate();
  recent.clear();
});
watch(description, () => { results.value = null; searchError.value = ""; });
watch(draft, () => { saveError.value = ""; });
watch([me, signingOut], () => {
  cancelVoice();
  sessionScope.invalidate();
  recent.clear();
  saving.value = false;
  searching.value = false;
  removing.value = false;
  removal.value = null;
  confirmation.cancel();
  removalError.value = "";
  editing.value = null; preparingEdit.value = false; editingBusy.value = false; pendingEdit = null; editError.value = "";
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
  draft.value = "";
  inputMode.value = "text";
  formDraft.value = emptyFields();
}

async function switchMode(next: "remember" | "find") {
  if (saving.value || searching.value || removing.value || preparingEdit.value || editingBusy.value || signingOut.value) return;
  cancelVoice();
  mode.value = next;
  notice.value = "";
  await nextTick();
  if (next === "find") needField.value?.focus();
  else if (inputMode.value === "text") noteField.value?.focus();
  else if (inputMode.value === "form") rememberForm.value?.querySelector<HTMLInputElement>("input")?.focus();
  else rememberForm.value?.querySelector<HTMLButtonElement>(".voice-record")?.focus();
}

async function remember() {
  if (busy.value) return;
  saveError.value = "";
  notice.value = "";
  if (inputMode.value === "form" && formDraft.value.when !== "" && !validMemoryDate(formDraft.value.when)) { saveError.value = "Enter a real date in MM/DD/YYYY format, or leave it blank."; return; }
  const content = inputMode.value === "form" ? writeMemoryFields(formDraft.value) : draft.value;
  if (!(inputMode.value === "form" ? formDraft.value.person.trim() : content.trim())) { saveError.value = "Add a note or person first."; return; }
  if (content.length > 20_000) { saveError.value = "Please shorten this note before saving."; return; }
  saving.value = true;
  const current = sessionScope.current();
  if (!pendingSave || pendingSave.content !== content) pendingSave = { submission: crypto.randomUUID(), content };
  const answer = await attempt(() => api.memories.remember({ ...pendingSave!, timeZone }));
  if (!current()) return;
  saving.value = false;
  if ("error" in answer) {
    if (answer.error === "UNAUTHORIZED") return sessionEnded();
    saveError.value = answer.error === "INVALID_REQUEST"
      ? "The note couldn't be accepted. Check the text and try again."
      : answer.error === "CONFLICT" ? "This save token was already used. Edit the note before saving again."
      : "Your note may be saved, but we couldn’t organize it. Check Recent people or retry this same note.";
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
  if (busy.value) return;
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
      : answer.error === "CONFLICT"
        ? "Your saved collection is too large to search together. In Recent people, shorten long notes or remove encounters you no longer need, then retry. Changing this description won't fix the limit. Your need may already be saved."
        : "We couldn't finish this search. Your need may already be saved, and note processing may still finish. Retry this search. If it keeps failing, review long saved notes or try again after the service recovers.";
    return;
  }
  results.value = answer.results;
}
async function chooseInput(next: "text" | "voice" | "form") {
  if (saving.value || searching.value || removing.value || preparingEdit.value || editingBusy.value || signingOut.value) return;
  if (next !== inputMode.value) cancelVoice();
  inputMode.value = next;
  await nextTick();
  if (next === "text") noteField.value?.focus();
}
function cancelVoice() {
  voiceScope.invalidate();
  capture.cancel();
  openingMic.value = false;
  recording.value = false;
  transcribing.value = false;
}
async function startVoice() {
  if (busy.value) return;
  saveError.value = "";
  openingMic.value = true;
  const current = voiceScope.current();
  try {
    const started = await capture.start(() => { cancelVoice(); saveError.value = "Recording stopped. Keep it under two minutes and try again."; });
    if (!current()) return;
    recording.value = started;
  } catch { capture.cancel(); if (current()) saveError.value = "Couldn't open the microphone. Allow microphone access or type your note."; }
  finally { if (current()) openingMic.value = false; }
}
async function finishVoice() {
  if (!recording.value) return;
  recording.value = false;
  transcribing.value = true;
  const current = voiceScope.current();
  const accountCurrent = sessionScope.current();
  try {
    const audio = await capture.finish();
    if (!current() || !accountCurrent() || !audio) return;
    const answer = await attempt(() => api.memories.transcribe(audio));
    if (!current() || !accountCurrent()) return;
    if ("error" in answer) {
      if (answer.error === "UNAUTHORIZED") return sessionEnded();
      saveError.value = "Couldn't transcribe this recording. Try again or type your note.";
    } else {
      const combined = [draft.value, answer.content].filter(Boolean).join("\n");
      if (combined.length > 20_000) { saveError.value = "This note is too long. Shorten it before adding more audio."; return; }
      draft.value = combined;
      inputMode.value = "text";
      notice.value = "Transcribed. Review your note before saving.";
      await nextTick();
      noteField.value?.focus();
    }
  } catch { if (current()) saveError.value = "Couldn't use this recording. Try again or type your note."; }
  finally { if (current()) { capture.cancel(); transcribing.value = false; } }
}
let editOpener: HTMLElement | null = null;
async function openEdit(memory: string) {
  if (busy.value) return;
  editOpener = document.activeElement as HTMLElement;
  cancelVoice(); preparingEdit.value = true; editError.value = ""; saveError.value = "";
  const loaded = memories.value.find(row => row.memory === memory);
  const snapshot = loaded ? { ...loaded } : undefined;
  const current = sessionScope.current();
  const answer = await attempt(() => api.memories["prepare-edit"]({ memory }));
  if (!current()) return;
  preparingEdit.value = false;
  let source: CircleWireHttp["/memories/prepare-edit"]["output"];
  let recoveryWarning = "";
  if ("error" in answer) {
    if (answer.error === "UNAUTHORIZED") return sessionEnded();
    if (answer.error === "NOT_FOUND") { editError.value = "This encounter was removed. Reload Recent people before editing another encounter."; return; }
    if (answer.error === "CONFLICT") { editError.value = "This encounter changed elsewhere. Reload Recent people and reopen it before editing."; return; }
    if (answer.error === "FORBIDDEN" || answer.error === "INVALID_REQUEST" || !snapshot) {
      editError.value = "Couldn't prepare this encounter for editing. Reload Recent people and try again."; return;
    }
    source = snapshot;
    recoveryWarning = "Couldn't refresh this encounter. This form uses the last version loaded in Recent people; it may have changed since then. If saving says it changed elsewhere, close this form, reload Recent people and reopen it.";
  } else {
    source = answer;
  }
  pendingEdit = null;
  const prepared = prepareEncounterEdit(source.card ?? { name: null, nameQuote: null, facts: [] }, source.content, source.referenceDate);
  editing.value = { memory, revision: source.revision, fields: prepared.fields, grouped: prepared.grouped, rawReview: prepared.rawReview, referenceDate: source.referenceDate };
  editError.value = [recoveryWarning, prepared.dateReview ? editDateReviewMessage : ""].filter(Boolean).join(" ");
}
function closeEdit() {
  if (editingBusy.value) return;
  editing.value = null;
  pendingEdit = null;
  editError.value = "";
  void nextTick(() => {
    if (editOpener?.isConnected && !editOpener.matches(":disabled")) editOpener.focus();
    else document.getElementById("recent-heading")?.focus();
  });
}
async function saveEdit() {
  if (!editing.value || editingBusy.value) return;
  const { memory, revision, fields } = editing.value;
  const sizeError = editSizeMessage(fields);
  if (sizeError) { editError.value = ""; return; }
  if (hasRelativeEditDate(fields, editing.value.rawReview)) { editError.value = editDateReviewMessage; return; }
  if (fields.when !== "" && !validMemoryDate(fields.when)) { editError.value = "Enter a real date in MM/DD/YYYY format, or leave it blank."; return; }
  if (!hasMemoryFieldContent(fields)) { editError.value = "Add at least one encounter detail before saving. A name is optional."; return; }
  const content = writeMemoryFields(fields);
  if (!pendingEdit || pendingEdit.memory !== memory || pendingEdit.content !== content) pendingEdit = { memory, revision, content, submission: crypto.randomUUID() };
  editingBusy.value = true; editError.value = "";
  const current = sessionScope.current();
  const answer = await attempt(() => api.memories.edit({ ...pendingEdit!, timeZone }));
  if (!current()) return;
  editingBusy.value = false;
  results.value = null; recent.remove(memory); void recent.refresh();
  if ("error" in answer) {
    if (answer.error === "UNAUTHORIZED") return sessionEnded();
    editError.value = answer.error === "CONFLICT" ? "This encounter changed elsewhere. Close and reopen it before editing." : answer.error === "NOT_FOUND" ? "This encounter was removed. Close this form." : answer.error === "INVALID_REQUEST" ? "The changes couldn't be accepted. Check the form and try again." : answer.error === "NETWORK_ERROR" ? "Couldn't confirm your changes because the connection failed. Retry the same form to finish." : "Your changes may be saved, but processing didn't finish. Retry the same form to finish.";
    return;
  }
  closeEdit(); notice.value = "Encounter updated.";
}
function requestRemoval(memory: string, label: string) {
  if (!busy.value) confirmation.request(memory, label);
}

async function removeConnection(memory: string, label: string) {
  if (busy.value) return;
  removal.value = { memory, label };
  removalError.value = "";
  notice.value = "";
  removing.value = true;
  const current = sessionScope.current();
  const answer = await attempt(() => api.memories.forget({ memory }));
  if (!current()) return;
  removing.value = false;
  if ("error" in answer && answer.error === "UNAUTHORIZED") return sessionEnded();
  // Never allow a list reply accepted before removal to restore the old row.
  recent.remove(memory);
  if (results.value) results.value = { ...results.value, suggestions: results.value.suggestions.filter(row => row.source !== memory) };
  if ("error" in answer && answer.error !== "NOT_FOUND") {
    removalError.value = "Couldn't finish removing this connection. Try again.";
  } else {
    removal.value = null;
    notice.value = "Connection removed.";
    await nextTick();
    document.getElementById("recent-heading")?.focus({ preventScroll: true });
  }
  void recent.refresh();
}
</script>

<template>
  <EditEncounter v-if="editing" v-model="editing.fields" :grouped="editing.grouped" :reference-date="editing.referenceDate" :busy="editingBusy" :error="editError" @save="saveEdit" @cancel="closeEdit" />
  <RemovalConfirmation v-if="removalTarget" :label="removalTarget.label" @confirm="confirmation.confirm" @cancel="confirmation.cancel" />
  <a class="skip" href="#main">Skip to content</a>
  <header class="topbar">
    <a class="brand" href="/" aria-label="Circle home">Circle<span class="brand-period" aria-hidden="true">.</span></a>
    <div v-if="me" class="account">
      <span>{{ me.username }}</span>
      <button class="text-button" type="button" :disabled="signingOut" @click="signOut">{{ signingOut ? "Signing out…" : "Sign out" }}</button>
    </div>
  </header>

  <main id="main">
    <CommonsCallback v-if="callback" @done="finishedCommons" />
    <p v-else-if="!checked" class="status" role="status">Opening Circle…</p>
    <section v-else-if="!me" class="sign-in">
      <div class="sign-in-copy">
        <h1>Remember the<br />people you meet<span class="vermilion">.</span></h1>
        <p class="lead">Find them when you need them.</p>
        <CommonsButton />
        <p v-if="accountError" class="refusal" role="alert">{{ accountError }}</p>
      </div>
      <AnimatedBackdrop />
    </section>

    <template v-else>
      <p v-if="accountError" class="refusal" role="alert">{{ accountError }}</p>
      <p v-if="notice" class="status" role="status">{{ notice }}</p>
      <p v-if="preparingEdit" class="status" role="status">Preparing encounter…</p>
      <p v-if="editError && !editing" class="refusal" role="alert">{{ editError }}</p>
      <p v-if="removalError && removal" class="refusal" role="alert">{{ removalError }} <button class="text-button" :disabled="busy" @click="removeConnection(removal.memory, removal.label)">Retry removal</button></p>

      <div class="workspace-composition">
      <div class="mode-toggle" role="group" aria-label="Circle mode">
        <button type="button" :aria-pressed="mode === 'remember'" :disabled="saving || searching || removing || preparingEdit || editingBusy || signingOut" @click="switchMode('remember')">Remember</button>
        <button type="button" :aria-pressed="mode === 'find'" :disabled="saving || searching || removing || preparingEdit || editingBusy || signingOut" @click="switchMode('find')">Find</button>
      </div>

      <form v-if="mode === 'remember'" ref="rememberForm" class="memory-form" aria-label="Remember someone" :aria-busy="saving || transcribing" @submit.prevent="remember">
        <div class="input-choice" role="group" aria-label="Note input">
          <button type="button" aria-label="Text input" title="Text input" :aria-pressed="inputMode === 'text'" :disabled="saving || searching || removing || preparingEdit || editingBusy || signingOut" @click="chooseInput('text')"><ActionIcon name="text" /><span>Text</span></button>
          <button type="button" aria-label="Voice input" title="Voice input" :aria-pressed="inputMode === 'voice'" :disabled="saving || searching || removing || preparingEdit || editingBusy || signingOut" @click="chooseInput('voice')"><ActionIcon name="mic" /><span>Voice</span></button>
          <button type="button" aria-label="Form input" title="Form input" :aria-pressed="inputMode === 'form'" :disabled="busy && !recording && !transcribing && !openingMic" @click="chooseInput('form')"><ActionIcon name="form" /><span>Form</span></button>
        </div>
        <div v-if="inputMode === 'text'" class="note-composer">
          <label for="note" class="sr-only">Encounter note</label>
          <textarea id="note" ref="noteField" v-model="draft" :disabled="busy" maxlength="20000" rows="4" required placeholder="Who did you meet? What would you like to remember?" />
        </div>
        <EncounterFields v-else-if="inputMode === 'form'" v-model="formDraft" prefix="remember" :disabled="busy" />
        <div v-else class="voice-composer" :aria-busy="openingMic || transcribing">
          <p class="hint" role="status">{{ openingMic ? "Opening microphone…" : recording ? "Recording…" : transcribing ? "Transcribing…" : "Tell us who you met and what they do." }}</p>
          <button v-if="recording" class="button voice-record" type="button" @click="finishVoice"><ActionIcon name="stop" />Stop and transcribe</button>
          <button v-else-if="!openingMic && !transcribing" class="button voice-record" type="button" :disabled="busy" @click="startVoice"><ActionIcon name="mic" />Start recording</button>
          <button v-if="recording || openingMic || transcribing" class="text-button" type="button" @click="cancelVoice">Cancel</button>
          <button v-else-if="draft.trim()" class="text-button" type="button" @click="chooseInput('text')">Review your draft</button>
        </div>
        <p v-if="saveError" class="refusal" role="alert">{{ saveError }}</p>
        <div class="form-actions">
          <button class="button primary" type="submit" :disabled="busy || !(inputMode === 'form' ? formDraft.person.trim() : draft.trim())">{{ saving ? "Organizing…" : "Save" }}</button>
        </div>
      </form>

      <form v-else class="search-form" role="search" @submit.prevent="seek">
        <label for="need" class="sr-only">Who could help?</label>
        <div class="search-composer" :aria-busy="searching">
          <ActionIcon name="search" />
          <input id="need" ref="needField" v-model="description" type="search" maxlength="2000" :disabled="busy" required placeholder="What do you need help with?" />
          <button class="icon-button composer-action save-action" type="submit" :disabled="busy" :aria-label="searching ? 'Finding connections' : 'Find connections'" :title="searching ? 'Finding…' : 'Find'"><ActionIcon name="arrow" /></button>
        </div>
        <p v-if="searching" class="status search-status" role="status" aria-live="polite">Finding connections…</p>
        <p v-if="searchError" class="refusal" role="alert">{{ searchError }}</p>
      </form>

      <AnimatedBackdrop />
      </div>

      <section v-if="mode === 'find' && results" class="results" aria-label="Suggestions">
        <p class="status" role="status">{{ results.suggestions.length ? `Found ${results.suggestions.length} connection${results.suggestions.length === 1 ? "" : "s"}.` : "No saved encounters matched this need." }}</p>
        <ContactRow v-for="suggestion in suggestions" :key="`${suggestion.target}:${suggestion.source}`" :label="suggestion.label" :content="suggestion.content" :original="suggestion.original" :details="suggestion.details" :reason="suggestion.reason" :busy="busy" heading="h2" @edit="openEdit(suggestion.source)" @remove="requestRemoval(suggestion.source, suggestion.label)" />
      </section>

      <section class="recent-people" aria-labelledby="recent-heading" :aria-busy="loadingPeople">
        <div class="recent-heading"><h2 id="recent-heading" tabindex="-1">Recent people</h2><button class="text-button" type="button" :disabled="loadingPeople || busy" title="Reload the newest encounters; this resets the list position." @click="recent.refresh">Reload from start</button></div>
        <p v-if="loadingPeople && !loadedPeople" class="status" role="status">Loading saved people…</p>
        <p v-if="peopleError" class="refusal" role="alert">{{ peopleError }} <button class="text-button" type="button" :disabled="loadingPeople" @click="recent.retry">Retry</button></p>
        <div v-else-if="loadedPeople && !people.length && !loadingPeople" class="empty-people">
          <p class="status">No saved people yet.</p>
          <template v-if="mode === 'find'">
            <p class="hint">Save an encounter first, then find people when you need them. For example: “Met Mira at a workshop. She builds sensors.”</p>
            <button class="text-button" type="button" :disabled="busy" @click="switchMode('remember')">Remember your first encounter</button>
          </template>
        </div>
        <p v-if="people.length" class="hint recent-guidance">AI summaries can be mistaken. Use Edit to review the current encounter; Personal notes shows the first saved wording.</p>
        <div v-if="people.length" class="contact-list">
          <ContactRow v-for="person in people" :key="person.memory" :label="person.label" :content="person.content" :original="person.original" :details="person.details" :busy="busy" @edit="openEdit(person.memory)" @remove="requestRemoval(person.memory, person.label)" />
        </div>
        <div v-if="hasMore" class="recent-actions"><button class="text-button" type="button" :disabled="loadingPeople" @click="recent.more">{{ loadingPeople ? "Loading…" : "Load more" }}</button></div>
      </section>
    </template>
  </main>
</template>
