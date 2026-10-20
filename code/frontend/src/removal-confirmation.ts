import { ref } from "vue";

export function useRemovalConfirmation(remove: (memory: string, label: string) => void) {
  const target = ref<{ memory: string; label: string } | null>(null);
  const request = (memory: string, label: string) => { target.value = { memory, label }; };
  const cancel = () => { target.value = null; };
  function confirm() {
    const pending = target.value;
    if (!pending) return;
    target.value = null;
    remove(pending.memory, pending.label);
  }
  return { target, request, cancel, confirm };
}
