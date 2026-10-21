<script setup lang="ts">
import { trapDialogFocus } from "./dialog-focus.ts";
import { onMounted, onBeforeUnmount, ref } from "vue";
import type { MemoryFields } from "../../../src/memory-fields.ts";
import EncounterFields from "./EncounterFields.vue";
const fields = defineModel<MemoryFields>({ required: true });
const props = defineProps<{ busy: boolean; error: string }>();
const emit = defineEmits<{ save: []; cancel: [] }>();
const dialog = ref<HTMLDialogElement>();
onMounted(() => { dialog.value?.showModal(); dialog.value?.querySelector<HTMLInputElement>("input")?.focus(); });
onBeforeUnmount(() => dialog.value?.close());
function cancel(event: Event) { event.preventDefault(); if (!props.busy) emit("cancel"); }
</script>
<template>
  <dialog ref="dialog" @keydown="trapDialogFocus" class="edit-dialog" aria-labelledby="edit-title" @cancel="cancel">
    <h2 id="edit-title">Edit encounter</h2>
    <form :aria-busy="busy" @submit.prevent="$emit('save')">
      <EncounterFields v-model="fields" prefix="edit" :disabled="busy" />
      <p v-if="error" class="refusal" role="alert">{{ error }}</p>
      <div class="dialog-actions"><button class="button cancel-button" type="button" :disabled="busy" @click="$emit('cancel')">Cancel</button><button class="button primary" :disabled="busy">{{ busy ? "Saving…" : "Save changes" }}</button></div>
    </form>
  </dialog>
</template>
