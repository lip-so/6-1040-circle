<script setup lang="ts">
import { ref } from "vue";
import type { MemoryDetail } from "../memory-summary.ts";
import ActionIcon from "./ActionIcon.vue";
withDefaults(defineProps<{ label: string; content: string; original?: string; details: MemoryDetail[]; busy: boolean; reason?: string; heading?: "h2" | "h3" }>(), { heading: "h3" });
defineEmits<{ remove: []; edit: [] }>();
const notes = ref<HTMLDetailsElement>();
function contactToggled(event: Event) { if (!(event.target as HTMLDetailsElement).open && notes.value) notes.value.open = false; }
</script>

<template>
  <article class="contact-row">
    <details @toggle="contactToggled">
      <summary class="contact-name"><component :is="heading">{{ label }}</component></summary>
      <div class="contact-body">
        <p v-if="reason" class="match-reason">{{ reason }}</p>
        <dl class="memory-details"><div v-for="detail in details" :key="`${detail.label}:${detail.value}`"><dt>{{ detail.label }}</dt><dd>{{ detail.value }}</dd></div></dl>
        <details ref="notes" class="personal-notes">
          <summary>Personal notes</summary>
          <p v-if="original !== undefined && original !== content" class="hint original-note-guidance">This is the first saved wording, kept for reference. Editing changes the current encounter, not this copy.</p>
          <blockquote aria-label="Original note">{{ original ?? content }}</blockquote>
        </details>
      </div>
    </details>
    <div class="contact-actions"><button class="icon-button edit-contact" type="button" :disabled="busy" :aria-label="`Edit ${label}`" :title="`Edit ${label}`" @click="$emit('edit')"><ActionIcon name="edit" /></button>
    <button class="icon-button remove-contact" type="button" :disabled="busy" :aria-label="`Remove ${label}`" :title="`Remove ${label}`" @click="$emit('remove')"><ActionIcon name="trash" /></button></div>
  </article>
</template>
