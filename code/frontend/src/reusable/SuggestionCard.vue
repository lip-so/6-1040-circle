<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue';
import type { CircleWireHttp } from '../../../generated/wire.ts';
import ActionIcon from './ActionIcon.vue';
type Suggestion = CircleWireHttp['/suggestions/list']['output']['suggestions'][number];
const props = defineProps<{ suggestion: Suggestion; busy: boolean; searchDescription?: string }>();
const emit = defineEmits<{ exclude: [suggestion: Suggestion, explanation: string, done: (success: boolean) => void]; inspect: [source: string] }>();
const menu = ref(false), explaining = ref(false), explanationText = ref('');
const root = ref<HTMLElement>(), trigger = ref<HTMLButtonElement>(), reasonField = ref<HTMLTextAreaElement>(), menuItem = ref<HTMLButtonElement>();
async function close() { menu.value = false; explaining.value = false; await nextTick(); trigger.value?.focus(); }
async function toggle() { menu.value = !menu.value; await nextTick(); if (menu.value) menuItem.value?.focus(); }
async function explain() { menu.value = false; explaining.value = true; await nextTick(); reasonField.value?.focus(); }
function outside(event: PointerEvent) { if (!root.value?.contains(event.target as Node)) menu.value = false; }
function escape(event: KeyboardEvent) { if (event.key === 'Escape' && (menu.value || explaining.value) && !props.busy) { event.preventDefault(); void close(); } }
function submit() { emit('exclude', props.suggestion, explanationText.value, success => { if (success) { explanationText.value = ''; void close(); } }); }
onMounted(() => { document.addEventListener('pointerdown', outside); document.addEventListener('keydown', escape); });
onBeforeUnmount(() => { document.removeEventListener('pointerdown', outside); document.removeEventListener('keydown', escape); });
function proofSources(suggestion: Suggestion) {
  const grouped = new Map<string, { source: string; content: string; quotes: string[] }>();
  for (const row of suggestion.sources) {
    const source = grouped.get(row.source) ?? { source: row.source, content: row.content, quotes: [] };
    if (!source.quotes.includes(row.quote)) source.quotes.push(row.quote);
    grouped.set(row.source, source);
  }
  return [...grouped.values()];
}
function explanation(suggestion: Suggestion) {
  const uncertainty = suggestion.gaps.join(' ');
  return uncertainty && suggestion.reason.endsWith(uncertainty)
    ? suggestion.reason.slice(0, -uncertainty.length).trim() : suggestion.reason;
}
</script>
<template>
  <article ref="root" class="person">
    <p v-if="searchDescription" class="hint">For {{ searchDescription }}</p>
    <div class="suggestion-heading"><h2>{{ suggestion.label }}</h2><div class="suggestion-actions"><button ref="trigger" class="icon-button" :disabled="busy" :aria-label="`Options for ${suggestion.label}`" aria-haspopup="menu" :aria-expanded="menu" title="Suggestion options" @click="toggle"><ActionIcon name="more" /></button><div v-if="menu" class="suggestion-menu" role="menu"><button ref="menuItem" role="menuitem" @click="explain">Do not recommend</button></div></div></div>
    <form v-if="explaining" class="exclusion-form" @submit.prevent="submit"><label :for="`reason-${suggestion.connection}`">Why? <span class="hint">(optional)</span></label><p class="hint">Applies to all your searches. Your explanation is private and helps guide future recommendations.</p><textarea :id="`reason-${suggestion.connection}`" ref="reasonField" v-model="explanationText" rows="2" maxlength="1000" :disabled="busy" /><div class="small-actions"><button class="text-button" :disabled="busy">Do not recommend</button><button class="text-button" type="button" :disabled="busy" @click="close">Cancel</button></div></form>
    <p class="suggestion-reason">{{ explanation(suggestion) }}</p>
    <p v-for="gap in suggestion.gaps" :key="gap" class="hint uncertainty">{{ gap }}</p>
    <details><summary>Why this person · original notes</summary><div v-for="source in proofSources(suggestion)" :key="source.source" class="source-proof"><blockquote v-for="quote in source.quotes" :key="quote">{{ quote }}</blockquote><details><summary>Full original note</summary><blockquote>{{ source.content }}</blockquote></details><button class="text-button" :disabled="busy" @click="$emit('inspect', source.source)">Review encounter</button></div></details>
  </article>
</template>
