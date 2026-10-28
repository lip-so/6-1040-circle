/** Keep keyboard traversal within the modal's enabled controls. */
export function trapDialogFocus(event: KeyboardEvent) {
  if (event.key !== "Tab") return;
  const dialog = event.currentTarget as HTMLDialogElement;
  const controls = [...dialog.querySelectorAll<HTMLElement>('button:not(:disabled), input:not(:disabled), textarea:not(:disabled), select:not(:disabled), [tabindex="0"]')];
  const first = controls[0], last = controls.at(-1);
  if (!first || !last) { event.preventDefault(); dialog.focus(); return; }
  if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
  else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
}
