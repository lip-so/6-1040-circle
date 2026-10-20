## Status
Complete

## Changed

- `frontend/src/reusable/AnimatedBackdrop.vue`: two supplied articulated figures, fixed SVG circles/lines, independent joint movement and interaction-triggered hand waves; pause and visibility/motion handling.
- `frontend/src/assets/articulated/motion.d.ts`: renderer types.
- `frontend/src/App.vue`: removed visible working headings, retained accessible labels, connected local interaction triggers, replaced sign-in bitmap.
- `frontend/src/style.css`: articulated scene presentation; removed whole-image drift.

Figures mount once with unique filters and persistent open forearms. Animation updates joint transforms instead of rebuilding their markup. No photograph or flattened illustration remains in the scene.

## Checks

- `bun run --cwd frontend typecheck` — passed.
- `bun run --cwd frontend build -- --outDir /private/tmp/circle-compact-preview-dist` — passed; existing SDK externalization warnings.

## Blockers

None. Browser verification remains coordinator-owned.
