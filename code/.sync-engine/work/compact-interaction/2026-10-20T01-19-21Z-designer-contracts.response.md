## Status
Complete

Updated contracts for private exclusions across all searches.

## Changed
- `design/concepts/Connecting.md`: replaced Useful/Dismiss/Remove and status with durable owner-target exclusions; added optional explanation, owner-only policy context, legacy-status handling, hard exclusion checks, and explicit provider failure behavior.
- `design/compositions/Circle.md`: replaced old feedback endpoints with `Circle.ExcludeSuggestion at /suggestions/exclude`; specified ellipsis interaction, authenticated ownership, acknowledgement, mobile access, and removal of Look again.

Exact target exclusions always apply. Recommendation policy receives all owner feedback within a 128 KiB input budget; exceeding it fails explicitly without truncation or losing saved exclusions. No notes, claims, other users, or shared conversations are changed.

## Questions
None.

## Checks
`bunx --no-install sync-engine check-design design/concepts/Connecting.md design/compositions/Circle.md` — passed.
