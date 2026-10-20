<script setup lang="ts">
defineProps<{ name: "arrow" | "search" | "trash" | "mic" | "stop" | "text" }>();
const paths = {
  text: "M4 5h16M12 5v15M8 20h8",
  mic: "M9 5a3 3 0 0 1 6 0v7a3 3 0 0 1-6 0ZM5 10v2a7 7 0 0 0 14 0v-2M12 19v3M8 22h8",
  stop: "M6 6h12v12H6Z",
  arrow: "M5 12h14M13 6l6 6-6 6",
  search: "M10.5 18a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15ZM16 16l5 5",
  trash: "M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7M14 10v7",
};
</script>
<template><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path :d="paths[name]" /></svg></template>
