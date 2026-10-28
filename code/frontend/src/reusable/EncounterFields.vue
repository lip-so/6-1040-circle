<script setup lang="ts">
import { computed, nextTick, ref } from "vue";
import { validMemoryDate } from "../../../src/calendar.ts";
import type { MemoryFields } from "../../../src/memory-fields.ts";
const fields = defineModel<MemoryFields>({ required: true });
const props = defineProps<{ prefix: string; disabled: boolean; editing?: boolean; multilinePerson?: boolean; multilineContact?: boolean }>();
const fieldOptions = [
  { key: "person", label: "Person" }, { key: "when", label: "Date (MM/DD/YYYY)" },
  { key: "does", label: "Does" }, { key: "discussed", label: "Discussed" },
  { key: "contact", label: "Contact" }, { key: "notes", label: "Notes" },
] as const;
type FieldKey = typeof fieldOptions[number]["key"];
// Keep a revealed field mounted while typing or clearing it; hide empty fields
// again only when a fresh editor opens from the saved encounter.
const shown = ref<FieldKey[]>(fieldOptions.filter(({key}) => fields.value[key]?.trim()).map(({key}) => key));
const visible = (key: FieldKey) => !props.editing || shown.value.includes(key);
const missing = computed(() => props.editing ? fieldOptions.filter(({key}) => !shown.value.includes(key)) : []);
async function addField(event: Event) {
  if (props.disabled) return;
  const select = event.target as HTMLSelectElement;
  const option = missing.value.find(({key}) => key === select.value);
  if (!option) return;
  shown.value.push(option.key);
  select.value = "";
  await nextTick();
  document.getElementById(`${props.prefix}-${option.key}`)?.focus();
}
function validateDate(event: Event) {
  const input = event.target as HTMLInputElement;
  input.setCustomValidity(input.value === "" || validMemoryDate(input.value) ? "" : "Enter a real date in MM/DD/YYYY format, or leave it blank.");
}
</script>
<template>
  <fieldset class="encounter-fields" :disabled="disabled">
    <div v-if="visible('person') || visible('when')" class="field-pair" :class="{ 'single-field': !visible('person') || !visible('when') }">
      <div v-if="visible('person')"><label :for="`${prefix}-person`">Person</label><textarea v-if="multilinePerson" :id="`${prefix}-person`" v-model="fields.person" rows="2" :maxlength="editing ? undefined : 200" placeholder="Name (optional)" /><input v-else :id="`${prefix}-person`" v-model="fields.person" :required="!editing" :maxlength="editing ? undefined : 200" :placeholder="editing ? 'Name (optional)' : 'Name'" /></div>
      <div v-if="visible('when')"><label :for="`${prefix}-when`">Date (MM/DD/YYYY)</label><input :id="`${prefix}-when`" v-model="fields.when" maxlength="10" pattern="[0-9]{2}/[0-9]{2}/[0-9]{4}" placeholder="MM/DD/YYYY (optional)" @input="validateDate" /></div>
    </div>
    <template v-if="visible('does')"><label :for="`${prefix}-does`">Does</label><textarea :id="`${prefix}-does`" v-model="fields.does" rows="2" :maxlength="editing ? undefined : 4000" placeholder="What they work on or do" /></template>
    <template v-if="visible('discussed')"><label :for="`${prefix}-discussed`">Discussed</label><textarea :id="`${prefix}-discussed`" v-model="fields.discussed" rows="2" :maxlength="editing ? undefined : 4000" placeholder="What you talked about" /></template>
    <template v-if="visible('contact')"><label :for="`${prefix}-contact`">Contact</label><textarea v-if="multilineContact" :id="`${prefix}-contact`" v-model="fields.contact" rows="2" :maxlength="editing ? undefined : 2000" placeholder="Phone, email or link (optional)" /><input v-else :id="`${prefix}-contact`" v-model="fields.contact" :maxlength="editing ? undefined : 2000" placeholder="Phone, email or link (optional)" /></template>
    <template v-if="visible('notes')"><label :for="`${prefix}-notes`">Notes</label><textarea :id="`${prefix}-notes`" v-model="fields.notes" rows="2" :maxlength="editing ? undefined : 4000" placeholder="Anything else you want to add" /></template>
    <div v-if="missing.length" class="edit-add-field">
      <label :for="`${prefix}-add-field`">Add field</label>
      <select :id="`${prefix}-add-field`" value="" @change="addField">
        <option value="" disabled>Choose a field…</option>
        <option v-for="option in missing" :key="option.key" :value="option.key">{{ option.label }}</option>
      </select>
    </div>
  </fieldset>
</template>
