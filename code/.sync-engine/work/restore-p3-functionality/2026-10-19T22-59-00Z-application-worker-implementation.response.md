## Status
Blocked

Backend implementation is complete and tested. Artifact generation and final contract checks await the canonical documentation updates below.

## Changed
- Restored Remembering, Seeking, Graphing and Connecting lifecycle behavior.
- Added complete owned-evidence validation, directed cross-note retrieval, automatic refresh, corrections, source retraction and revision protection.
- Implemented all 22 endpoint paths, including separate work/reply declarations for refresh.
- Added injected OpenAI transcription, bounded input validation and complete-settlement FIFO admission.
- Repeated normalized searches reuse an existing active need; new needs use UUIDs.
- Formatted changed TypeScript and added focused tests without restoring deleted low-priority cases.
- Updated `.env.example` with transcription configuration.

Frontend response shapes:
- `/memories/get`: `{ memory: { memory, content, claims } }`
- `/needs/list`: `{ needs: [{ need, description, active }] }`
- Need mutation/search results: `{ results: { need, description, active, suggestions } }`
- Suggestion lists: `{ suggestions: [{ need, description, connection, target, label, source, content, evidence, reason, gaps, sources }] }`
- Each source: `{ claim, source, quote, content }`
- Inspection: `{ suggestion: { ...suggestionFields, status, eligible } }`

## Checks
- `bun test` — **84 passed, 0 failed**, across 17 files; 539 assertions.
- `bunx tsc --noEmit` — passed.
- `bun run generate` — blocked by five canonical coverage declarations.
- `bun run check` — blocked by the same five declarations.

Outputs:
- `/private/tmp/circle-restoration-backend-tests.log`
- `/private/tmp/circle-restoration-generate.log`
- `/private/tmp/circle-restoration-check.log`

## Blockers
**Design/documentation only:**

1. Add endpoint declaration and reaction link for `Circle.RefreshSuggestionsWork` at `/suggestions/refresh`.
2. Add view links for `Circle.ValidEvidence`, `Circle.CurrentSuggestion` and `Circle.SuggestionTrace`.
3. Update Seeking.seek and Circle repetition semantics: reuse a deterministic existing active normalized-description match; preserve legacy duplicates; create a new UUID when none exists.
4. Document `/memories/get`’s nested `memory` record.
5. Replace unavailable-response wording with HTTP404 `{ error: "NOT_FOUND" }`. The selected HTTP transport permits string domain errors and exposes only `{ error }`.

No canonical design files were modified during this run.

## Concerns
OpenAI checks used simulated responses only, as requested. Deployment uses the documented single-process FIFO guarantee; concurrent independent application processes remain outside scope.
