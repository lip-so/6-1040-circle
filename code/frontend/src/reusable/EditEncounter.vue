<script setup lang="ts">
import { trapDialogFocus } from "./dialog-focus.ts";
import { computed, onMounted, onBeforeUnmount, ref } from "vue";
import type { MemoryFields } from "../../../src/memory-fields.ts";
import { editSizeMessage } from "../encounter-form.ts";
import EncounterFields from "./EncounterFields.vue";
const fields = defineModel<MemoryFields>({ required: true });
const props = defineProps<{ busy: boolean; error: string; grouped: boolean }>();
const emit = defineEmits<{ save: []; cancel: [] }>();
const dialog = ref<HTMLDialogElement>();
const multilineContact = /[\r\n]/u.test(fields.value.contact ?? "");
const multilinePerson = /[\r\n]/u.test(fields.value.person);
const sizeError = computed(() => editSizeMessage(fields.value));
onMounted(() => { dialog.value?.showModal(); dialog.value?.querySelector<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>("input, textarea, select")?.focus(); });
onBeforeUnmount(() => dialog.value?.close());
function cancel(event: Event) { event.preventDefault(); if (!props.busy) emit("cancel"); }
</script>
<template>
  <dialog ref="dialog" @keydown="trapDialogFocus" class="edit-dialog" aria-labelledby="edit-title" @cancel="cancel">
    <h2 id="edit-title">Edit encounter</h2>
    <form :aria-busy="busy" @submit.prevent="$emit('save')">
      <p v-if="grouped" class="hint">Some details from your note are kept together in one field. Review the whole field before replacing it; all text shown there will be changed together.</p>
      <EncounterFields v-model="fields" prefix="edit" :disabled="busy" editing :multiline-person="multilinePerson" :multiline-contact="multilineContact" />
      <p v-if="sizeError" class="refusal" role="alert">{{ sizeError }}</p>
      <p v-if="error" class="refusal" role="alert">{{ error }}</p>
      <div class="dialog-actions"><button class="button cancel-button" type="button" :disabled="busy" @click="$emit('cancel')">Cancel</button><button class="button primary" :disabled="busy">{{ busy ? "Saving…" : "Save changes" }}</button></div>
    </form>
  </dialog>
</template>
