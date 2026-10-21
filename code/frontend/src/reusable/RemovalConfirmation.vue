<script setup lang="ts">
import { trapDialogFocus } from "./dialog-focus.ts";
import { onBeforeUnmount, onMounted, ref } from "vue";
defineProps<{ label: string }>();
defineEmits<{ confirm: []; cancel: [] }>();
const dialog = ref<HTMLDialogElement>();
onMounted(() => dialog.value?.showModal());
onBeforeUnmount(() => dialog.value?.close());
</script>

<template>
  <dialog ref="dialog" @keydown="trapDialogFocus" class="removal-dialog" aria-labelledby="removal-title" aria-describedby="removal-description" @cancel.prevent="$emit('cancel')">
    <h2 id="removal-title">Remove {{ label }}?</h2>
    <p id="removal-description">This deletes this saved encounter and its search evidence. It cannot be undone.</p>
    <div class="dialog-actions">
      <button class="button cancel-button" type="button" autofocus @click="$emit('cancel')">Cancel</button>
      <button class="button primary" type="button" @click="$emit('confirm')">Remove</button>
    </div>
  </dialog>
</template>
