<script setup lang="ts">
import type { MemoryFields } from "../../../src/memory-fields.ts";
const fields = defineModel<MemoryFields>({ required: true });
defineProps<{ prefix: string; disabled: boolean }>();
</script>
<template>
  <fieldset class="encounter-fields" :disabled="disabled">
    <div class="field-pair">
      <div><label :for="`${prefix}-person`">Person</label><input :id="`${prefix}-person`" v-model="fields.person" required maxlength="200" placeholder="Name" /></div>
      <div><label :for="`${prefix}-when`">When / where</label><input :id="`${prefix}-when`" v-model="fields.when" maxlength="1000" placeholder="Date or context (optional)" /></div>
    </div>
    <label :for="`${prefix}-does`">Does</label><textarea :id="`${prefix}-does`" v-model="fields.does" rows="2" maxlength="4000" placeholder="What they work on or do" />
    <label :for="`${prefix}-discussed`">Discussed</label><textarea :id="`${prefix}-discussed`" v-model="fields.discussed" rows="2" maxlength="4000" placeholder="What you talked about" />
    <label :for="`${prefix}-contact`">Contact</label><input :id="`${prefix}-contact`" v-model="fields.contact" maxlength="2000" placeholder="Phone, email or link (optional)" />
    <label :for="`${prefix}-notes`">Notes</label><textarea :id="`${prefix}-notes`" v-model="fields.notes" rows="2" maxlength="4000" placeholder="Anything else you want to add" />
  </fieldset>
</template>
