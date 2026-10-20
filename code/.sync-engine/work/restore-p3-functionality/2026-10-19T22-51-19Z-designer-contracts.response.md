## Status

Complete

Repaired C01–C04 without implementation changes.

## Changed

- `design/compositions/Circle.md`
- `design/concepts/Seeking.md`
- `design/concepts/Graphing.md`
- `design/concepts/Connecting.md`

Exact repairs:

| Finding | Repair |
|---|---|
| C01 | One **single-process FIFO** admits every complete API invocation, including authentication and reads. Admission releases only after both the handler response/fault and `application.whenIdle()` confirm settlement. Refusals/faults release safely; bounded provider calls delay later requests. No bypass or multiple-process guarantee. Direct-root callers must serialize complete flows themselves. |
| C02 | Added linked requested-posture `Circle.InvalidateBeforeIndex` on Graphing.ingest. It resets the owner’s active needs **before extraction begins**. Existing completed-posture refresh remains the sole successful refresh owner. |
| C03 | Seeking.delete, Graphing.remove, and Connecting.remove now perform **owner-filtered idempotent removal**: absent and foreign identities both succeed unchanged. DeleteNeed always triggers owner-scoped ClearDeletedNeed, so retry repairs cleanup after the need has disappeared. |
| C04 | OwnedEvidence relies on Graphing’s validated full-quote invariant plus exact original-content digest equality. Both local and model extractors must enforce that invariant; no undeclared quote computation remains. |

Endpoint fallback policy:

- Every owned-record prerequisite has complementary branches: owned row → continue; no row → immediately respond with `{error: {code: "NOT_FOUND", message: "This item is not available."}}`.
- Missing and foreign identities use identical response shape/code.
- This covers source/suggestion inspection, reindexing, and mutations requiring a current owned record.
- Missing/foreign concept refusal mappings normalize to the same `NOT_FOUND`; semantic refusals remain distinct.
- Owner-filtered removal endpoints instead return identical successful responses.
- ForgetMemory may repeat its owned metadata tombstone action without requiring a live original.

Additional requested compatibility:

- `_trace` retains primary `source` alongside complete evidence.
- Suggestions retain primary `source/content` aliases, selected from the target person’s final MET/KNOWS proof. Full `sources` remains authoritative.
- Remember/Find switching preserves typed unsaved text. Leaving capture discards pending audio/transcription replies; sign-out/account changes clear text and audio.

## Questions

None.

## Checks

Passed:

```text
bunx --no-install sync-engine check-design design/concepts/Remembering.md design/concepts/Seeking.md design/concepts/Graphing.md design/concepts/Connecting.md design/types.md design/compositions/Circle.md
```

Result: `Design form check passed for 6 files.`
