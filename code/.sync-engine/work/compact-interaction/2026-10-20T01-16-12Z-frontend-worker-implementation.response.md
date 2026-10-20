## Status
Complete

## Changed

- `SuggestionCard.vue`: removed Useful and Dismiss; retained bin and source inspection.
- `App.vue`: dedicated remove handler; removed usefulness/dismiss API calls and messages.
- `ActionIcon.vue`: removed unused feedback icons.

## Checks

- `bun run --cwd frontend typecheck` — passed.
- `bun run --cwd frontend build -- --outDir /private/tmp/circle-compact-preview-dist` — passed.

## Blockers

None.
