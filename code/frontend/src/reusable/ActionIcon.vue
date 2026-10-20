<script setup lang="ts">
defineProps<{ name: 'mic' | 'arrow' | 'search' | 'check' | 'edit' | 'trash' | 'stop' | 'reopen' | 'pause' | 'play' | 'more' }>();
const paths = {
  more: 'M12 5h.01M12 12h.01M12 19h.01',
  mic: 'M12 15a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3ZM5 11v1a7 7 0 0 0 14 0v-1M12 19v3M8 22h8',
  arrow: 'M5 12h14M13 6l6 6-6 6',
  search: 'M10.5 18a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15ZM16 16l5 5',
  check: 'm5 12 4 4L19 6',
  edit: 'm15 4 5 5M4 20l5-1L21 7a2.1 2.1 0 0 0-4-4L5 15l-1 5Z',
  trash: 'M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7M14 10v7',
  stop: 'M6 6h12v12H6Z',
  reopen: 'M4 10a8 8 0 1 1 1 8M4 4v6h6',
  pause: 'M8 5v14M16 5v14',
  play: 'm8 4 12 8-12 8V4Z',
};
</script>
<template><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path :d="paths[name]" /></svg></template>
