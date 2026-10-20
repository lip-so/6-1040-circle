## Verdict
Revise

## Assessments

| Obligation | Assessment |
|---|---|
| Authenticated authority | All five Circle endpoints authenticate before protected effects. Owner and corpus come from server-controlled state; callers cannot supply either. |
| Remember and organize | The original closes before extraction; success waits for validated JSON. Failed extraction preserves the original and reserves ownership. The submission token supports deliberate retry without creating another encounter. |
| Voice draft | Authenticated transcription produces editable text without saving. Cancellation, account changes and mode changes invalidate late results. Audio limits and unsupported input have declared refusals. |
| Recall and isolation | Recall receives only the authenticated owner's original corpus. Selected identities and fact indexes are validated; owned-original joins close the visibility obligation before returning cards. |
| Stable repeated results | Query, complete corpus and provider version determine recall identity. First stored selection wins; changed memory changes that identity. |
| Removal | Original erasure precedes graph withdrawal and acknowledgement. Owned-original reads hide the source during the false interval. Repeating the same memory identity closes failed withdrawal; tombstones prevent resurrection. |
| Read surfaces | SavedMemories preserves list order and nullable organization; NeedResults preserves stored selection order. Missing, foreign, removed or stale sources produce no result. |
| Executable inventory | Six static instances; endpoints Remember, Seek, ListMemories, Transcribe and Forget; view OwnedMemory; formers SavedMemories and NeedResults. Each has a typed link, and every Circle endpoint has a matching path. No separate deferred reaction is selected. |
| Bounds and refusal state | The structured-memory bound may be discovered only after recall has organized sources. The resulting refusal currently conflicts with unchanged-state refusal semantics; see PB-01. |

## Findings

**PB-01 — Material: structured-memory limit can refuse after partial effects.**  
`Graphing.recall` promises to enforce the combined original/structured 256 KiB bound before provider calls, but the structured records for missing or outdated sources do not exist until extraction runs. Its success branch first ingests those records and can then discover that the resulting structured memory exceeds the bound. Returning `MEMORY_LIMIT` at that point leaves modified Graphing state despite a declared refusal; the general permission to retain organization after provider faults does not cover this refusal.

Settle this boundary explicitly: establish a sufficient bound before any mutating extraction, or distinguish a later budget failure that permits retained organization from the no-effect `MEMORY_LIMIT` refusal. State when the bound is checked relative to extraction and selection calls so the acknowledgement and retry behavior are realizable.
