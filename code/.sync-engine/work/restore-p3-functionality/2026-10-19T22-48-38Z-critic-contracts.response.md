## Verdict
Revise

## Assessments

The four concept boundaries, legacy data interpretation, separate same-name people, editable transcription, conservative graph traversal, handled suggestion states, and exact-content digest checks match the approved intent.

| Obligation | Trigger and closing reaction | Visible success / false interval | Acknowledgement, retry, and recovery |
|---|---|---|---|
| Save encounter | Remember → Remembering.remember → IndexRemembered → Graphing.ingest → refresh | Saved original exists before indexing completes; old or absent evidence cannot substitute for it. | Wait for dependent work. Owner accepts submission identity atomically. Retry retains identity; reindex repairs downstream failure. |
| Revise encounter | ReviseMemory → Remembering.revise → IndexRevised → refresh | Content/revision change together; digest mismatch hides old evidence. | Identical-content retries are safe. Reindex repairs extraction failure. Pre-extraction invalidation ownership needs repair, C02. |
| Forget encounter | ForgetMemory → Remembering.forget → RetractForgotten → refresh | Original disappears immediately; joins hide evidence before retraction finishes. | Metadata tombstone prevents resurrection. Repeated forget can repair retraction without restoring content. |
| Transcribe | Transcribe → Remembering.transcribe | Editable text only; no automatic persistence. | Auth precedes provider call. Repetition may repeat external transcription; cancellation invalidates browser replies without claiming server cancellation. |
| Create ongoing need | Seek → Seeking.seek → RefreshSoughtNeed | New active need exists before suggestions finish. | Explicit distinct-create repetition; no deduplication promise. Legacy missing active means active. |
| Revise/reopen need | Seeking.revise/reopen → RefreshRevisedNeed/RefreshReopenedNeed | Revision clears handled history deliberately; reopening restores reconsideration. | Clear must precede refresh. Concurrent stale refresh suppression needs C01. |
| Resolve/delete need | Seeking.resolve/delete → ClearResolvedNeed/ClearDeletedNeed | Active-need joins hide suggestions before cleanup finishes. | Owner actions accept repeated lifecycle requests. Endpoint normalization and missing-delete recovery need C03. |
| Change graph evidence | Completed ingest/reject/restore/remove/retract → corresponding RefreshAfter reaction | Changed claims affect proof eligibility immediately; stored suggestions follow reset and offers. | Action completion triggers are appropriate. Owner-wide ordering is presently unsupported, C01. |
| Recompute suggestions | RefreshSuggestions or lifecycle/evidence refresh → reset → complete proof check → offer | Reset disables prior suggestions; supported offers become eligible. | Explicit refresh recovers partial failure. No cross-concept rollback claimed. C01 and C02 remain. |
| Inspect/display suggestions | NeedResults/CurrentSuggestions/SuggestionDetails → full owned proof join | Any missing intermediate proof omits the whole candidate. Five-before-proof filtering is conservative and acceptable. | Reads must participate in the selected concurrency boundary. Universal proof must test absence of **any invalid member**, rather than merely collect successful joins. |
| Handle suggestion | Owned-current inspection → Connecting.dismiss/use/remove | Handled status survives later offers; removal discards history. | Atomic Connecting guards enforce its owned state. Whole-operation admission is needed to close inspection-to-mutation races, C01. |
| Inspect/correct claims | MemoryDetails → owned claims; RejectClaim/RestoreClaim/RemoveClaim → Graphing action → refresh | Rejected claims remain inspectable; originals remain unchanged. | Owned source/digest joins are appropriate. Missing/foreign normalization needs C03. |
| Account changes | Browser account/request scope invalidation | Old replies cannot repopulate another account’s UI. | Does not cancel accepted server mutations. This limitation is correctly stated. |

Executable inventory is complete for the described success paths:

- **7 instances:** Registering, CommonsFederating, Sessioning, Remembering, Seeking, Graphing, Connecting.
- **22 endpoints:** every entry in Circle’s endpoint fence has a matching reaction link and exact path.
- **13 internal reactions:** IndexRemembered, IndexRevised, RetractForgotten; five Seeking lifecycle reactions; five Graphing completion reactions.
- **2 views:** OwnedMemory, OwnedEvidence.
- **6 formers:** SavedMemories, MemoryDetails, SavedNeeds, NeedResults, CurrentSuggestions, SuggestionDetails.
- **1 computation:** sourceDigest.

The digest operation is pure. Engine time is supplied rather than read inside concepts. No additional optional-input branch computation is required by the current composition: legacy defaults belong to their owning concept actions/queries.

## Findings

**C01 — Blocker: owner-wide serialization and refresh supersession lack an owner.**  
`design/compositions/Circle.md` promises deterministic serial work for each owner, including overlapping requests. The supplied public semantics serialize individual concept action bodies, while different concepts and root flows overlap. A current-read check followed by Connecting.offer is not atomic: a need can change or resolve between those steps, and an older refresh can offer after a newer clear/reset. Name a realizable admission boundary or an owned stale-work guard, and state its scope and failure behavior. A single-process FIFO around **complete settled API invocations**, including reads, is a valid conservative boundary; it must cover every application API entry, release after failure, and explicitly limit direct-root and multi-process guarantees. `afterFlowSettles` alone does not provide this ordering.

**C02 — Material: promised reset before extraction failure has no selected closing reaction.**  
Circle says stale suggestion sets are reset before an extraction failure response, but its declared Graphing refresh reactions follow successful completion. Provider failure stops that success path. Explicitly assign and order pre-extraction invalidation, or remove the blanket reset guarantee while preserving digest-safe display and available recovery. A selected requested-posture reaction before Graphing.ingest is a plausible owner; the complete acknowledgement/error behavior must still be stated.

**C03 — Material: missing-object retry behavior conflicts with indistinguishable ownership refusals.**  
Circle requires unknown and foreign objects to be indistinguishable, while Seeking.delete, Connecting.remove, and Graphing.remove succeed for missing objects and refuse foreign ones. The relevant endpoints need an explicit common observable policy. This also affects recovery: after Seeking.delete succeeds but clear fails, the need is absent; a blanket owned-record prerequisite would prevent retrying the delete to repair ClearDeletedNeed. Resolve the endpoint branches and cleanup recovery together, preserving ownership without exposing object existence.

**C04 — Material if retained as an independent check: undeclared literal-quote derivation.**  
OwnedEvidence promises to test that a quote remains literal evidence in eligible non-Contact content, but sourceDigest is the only selected computation. Either declare that pure eligibility operation and its link, or explicitly rely on Graphing’s validated-quote invariant plus exact digest equality. Do not introduce an undeclared ad hoc computation during implementation.
