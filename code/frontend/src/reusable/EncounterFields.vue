<script setup lang="ts">
import { validMemoryDate } from "../../../src/calendar.ts";
import type { MemoryFields } from "../../../src/memory-fields.ts";
const fields = defineModel<MemoryFields>({ required: true });
defineProps<{ prefix: string; disabled: boolean; editing?: boolean; multilinePerson?: boolean; multilineContact?: boolean }>();
function validateDate(event: Event) {
  const input = event.target as HTMLInputElement;
  input.setCustomValidity(input.value === "" || validMemoryDate(input.value) ? "" : "Enter a real date in MM/DD/YYYY format, or leave it blank.");
}
</script>
<template>
  <fieldset class="encounter-fields" :disabled="disabled">
    <div class="field-pair">
      <div><label :for="`${prefix}-person`">Person</label><textarea v-if="multilinePerson" :id="`${prefix}-person`" v-model="fields.person" rows="2" :maxlength="editing ? undefined : 200" placeholder="Name (optional)" /><input v-else :id="`${prefix}-person`" v-model="fields.person" :required="!editing" :maxlength="editing ? undefined : 200" :placeholder="editing ? 'Name (optional)' : 'Name'" /></div>
      <div><label :for="`${prefix}-when`">Date (MM/DD/YYYY)</label><input :id="`${prefix}-when`" v-model="fields.when" maxlength="10" pattern="[0-9]{2}/[0-9]{2}/[0-9]{4}" placeholder="MM/DD/YYYY (optional)" @input="validateDate" /></div>
    </div>
    <label :for="`${prefix}-does`">Does</label><textarea :id="`${prefix}-does`" v-model="fields.does" rows="2" :maxlength="editing ? undefined : 4000" placeholder="What they work on or do" />
    <label :for="`${prefix}-discussed`">Discussed</label><textarea :id="`${prefix}-discussed`" v-model="fields.discussed" rows="2" :maxlength="editing ? undefined : 4000" placeholder="What you talked about" />
    <label :for="`${prefix}-contact`">Contact</label><textarea v-if="multilineContact" :id="`${prefix}-contact`" v-model="fields.contact" rows="2" :maxlength="editing ? undefined : 2000" placeholder="Phone, email or link (optional)" /><input v-else :id="`${prefix}-contact`" v-model="fields.contact" :maxlength="editing ? undefined : 2000" placeholder="Phone, email or link (optional)" />
    <label :for="`${prefix}-notes`">Notes</label><textarea :id="`${prefix}-notes`" v-model="fields.notes" rows="2" :maxlength="editing ? undefined : 4000" placeholder="Anything else you want to add" />
  </fieldset>
</template>
