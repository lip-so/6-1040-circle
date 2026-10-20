## Status

Complete

## Changed

- `design/concepts/Seeking.md`: Repeated normalized exact lookups reuse an existing ongoing Need. Normalization changes only case and whitespace. Matching duplicates are preserved; ascending identity selects deterministically. Resolved needs do not match; new needs receive UUIDs.
- `design/compositions/Circle.md`: Added links for `ValidEvidence`, `CurrentSuggestion`, and `SuggestionTrace`.
- Added `Circle.RefreshSuggestionsWork` endpoint declaration at `/suggestions/refresh`, alongside the existing reply declaration. Documented ordinary work versus same-flow settlement reply, including zero active needs and one input validator.
- Corrected `/memories/get` to `{memory: {memory, content, claims}}`.
- Corrected unavailable responses to HTTP 404 `{error: "NOT_FOUND"}`.
- Preserved FIFO settlement, pre-index invalidation, complete evidence validation, tombstones, and ownership protections.

No implementation, frontend, tests, configuration, or journal changes.

## Questions

None.

## Checks

`bunx --no-install sync-engine check-design design/concepts/Remembering.md design/concepts/Seeking.md design/concepts/Graphing.md design/concepts/Connecting.md design/types.md design/compositions/Circle.md`

Passed: `Design form check passed for 6 files.`
