<script setup lang="ts">
import type { MemoryDetail } from "../memory-summary.ts";
import ActionIcon from "./ActionIcon.vue";
withDefaults(defineProps<{ label: string; content: string; details: MemoryDetail[]; busy: boolean; reason?: string; heading?: "h2" | "h3" }>(), { heading: "h3" });
defineEmits<{ remove: [] }>();
</script>

<template>
  <article class="contact-row">
    <details>
      <summary class="contact-name"><component :is="heading">{{ label }}</component></summary>
      <div class="contact-body">
        <p v-if="reason" class="match-reason">{{ reason }}</p>
        <dl class="memory-details"><div v-for="detail in details" :key="`${detail.label}:${detail.value}`"><dt>{{ detail.label }}</dt><dd>{{ detail.value }}</dd></div></dl>
        <blockquote aria-label="Original note">{{ content }}</blockquote>
      </div>
    </details>
    <button class="icon-button remove-contact" type="button" :disabled="busy" :aria-label="`Remove ${label}`" :title="`Remove ${label}`" @click="$emit('remove')"><ActionIcon name="trash" /></button>
  </article>
</template>
