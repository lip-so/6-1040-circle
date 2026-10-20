# Role and objective

Continue work unit `restore-p3-functionality`; role `designer`; phase `contracts`. The prior same-phase role contract remains authoritative.

# Access

This grant replaces prior access; other rules remain.

Current grant:

```json
{"readableAreas":[{"area":"work-unit","path":"context"},{"area":"application","path":"design"},{"area":"application","path":"src/compositions/Circle.ts"},{"area":"application","path":"src/concepts"},{"area":"application","path":"src/concepts.ts"}],"writableAreas":[{"area":"assigned-design","path":"compositions/Circle.md"},{"area":"assigned-design","path":"concepts/Connecting.md"},{"area":"assigned-design","path":"concepts/Graphing.md"},{"area":"assigned-design","path":"concepts/Remembering.md"},{"area":"assigned-design","path":"concepts/Seeking.md"},{"area":"assigned-design","path":"types.md"}],"toolKinds":["repository-read","repository-write"],"projectShell":"project-validation","network":false,"generatedOutput":false,"longRunningProcesses":false}
```

# Guidance

Unchanged from the prior same-agent context. Apply it to the task and changed context below.

# Context

## Task

**.sync-engine/work/restore-p3-functionality/designer-repair-task.md**

Repair all four supplied critic findings C01-C04 in one batch. Keep scope and contracts otherwise stable.

C01: explicitly choose a single-process FIFO wrapper around complete settled API handler invocations (including reads and auth), releases on refusal/fault, no bypass in the deployed host. Direct assembled roots are required to be admitted sequentially by their caller; no multiple-process guarantee. State that a provider request delays later API calls until its bounded timeout. This is a documented host responsibility, no engine extension or new concept.

C02: choose an explicitly linked requested-posture InvalidateBeforeIndex reaction on Graphing.ingest to reset the owner's active needs before extraction body starts. Successful completion's existing refresh remains. Do not rely on unspecified fault hooks or endpoint work that duplicates successful reaction ownership.

C03: select concrete observable endpoint branches so absent/foreign requested objects get the same response, and delete retry after a failed clear can repair cleanup even when need absent. Prefer scoped reads and complementary fallback branches; fallback owner-scoped clear for missing/foreign Need is safe. You may simplify concept idempotent removal policy instead if it preserves ownership and P1 intent, but describe chosen exact behavior/API to worker. No extra product features or permission request.

C04: rely explicitly on Graphing's validated full-quote invariant plus exact original digest equality, rather than add another quote operation. Ensure local extractor is held to that invariant too. All legacy undigested sources remain ineligible until explicit reindex.

Run check-design syntax only. Return Status and exact repair summary, including endpoint fallback policy. Do not edit implementation.

## Brief

**.sync-engine/work/restore-p3-functionality/brief.md**

# Restore the functionality deferred from P2

## Goal
Deliver the full intended Circle beta: editable/deletable encounter memory, voice/text capture, evidence-backed cross-note retrieval, persistent ongoing goals and handled suggestions, and automatic rediscovery.

## Scope
Restore the four P1 concepts Remembering, Graphing, Seeking, Connecting and their composition/UI. Preserve Commons auth, original notes, safe manual retries, owner-scoped reads, legacy guided-data readability, separate same-name encounters, literal encounter context. No password auth, demo seeds, inferred dates, automatic people merges, external outreach, contact link execution, graph dashboard, or unrelated deployment/submission work.

## Requirements
Use existing P1 design as accepted product intent; translate it into strict installed-version canonical contracts. Add original lifecycle actions and grounded graph trace/gaps/ranking, with input validation, refusal mappings, owned source joins, and deterministic updates across changes. Voice transcription produces an editable draft, never an automatically saved note. Existing records remain readable. No global database clearing or automatic external reindexing. A failed downstream index/search keeps original saved data and reports an error. Invalidated/deleted evidence cannot continue to be shown as current. Concept classes cannot import peers. Use sync-engine DSL for cross-concept behavior. Provider settings/credentials are server-side and injectable for tests. Tests remain lean, cover actions/principles and privacy/data integrity; no cosmetic test expansion. Preserve all manual changes and Sofia's design journal.

## Active decisions
- Latest user request explicitly authorizes implementing every feature P2 temporarily deferred. Permanent product choices remain in force.
- Use the current accepted four-concept P1 design; no fresh decomposition is needed unless a real boundary defect is identified. A designer will translate contracts, followed by independent contract review.
- The contract designer may read bounded existing application concept/composition source beyond its normal design-only recommendation to preserve wire compatibility, persistence semantics, and owner boundaries during translation.
- Work in a temporary complete copy because the actual repository is outside the writable sandbox; apply reviewed changes back only after checking baseline hashes. No external data writes other than isolated test databases.
- Skill CLI uses the bundled Node 24 on PATH, retaining system Node 25. Matching analysis/catalog 1.1.0 tools are now direct dev dependencies as bootstrap requires; no framework version upgrades.
- Superseded draft assumptions: initially proposed retaining guided capture and leaving old searches inactive. User explicitly selected one free-form note with seamless reminders, every existing and new Need treated as ongoing, a quick Resolved action near it, and no separate Goal type. Use Looking for/search terminology in the UI rather than a to-do dashboard. People remain source-local; only unambiguous organizations/topics may connect notes. Legacy guided notes must still display and be editable.
- Runtime OpenAI key is not configured; all provider calls remain injectable. Actual OpenAI quality cannot be asserted from stand-in tests.
- Scope is implementation; it does not authorize publishing, deployment, recording/submission, or editing the user's design journal.

## Done when
- Signed-in users can create, edit, list/read, and delete their own encounters, including old guided notes; downstream failures preserve saved data without duplicate retries.
- Voice input can be recorded, transcribed with a server provider, reviewed/edited, and intentionally saved; cancellation and account changes discard pending capture safely.
- Users can create/list/update/resolve/reopen/delete ongoing needs; ALL legacy searches are ongoing unless explicitly resolved. Need and goal are one stored type. Resolved is a quick nearby action.
- Evidence-backed suggestions traverse safe cross-note paths, show source quotes and uncertainty, rank at most five, and avoid inferred jobs or identity merges.
- Users can inspect owned claims and reject/restore/remove them; forgetting a source withdraws its claims.
- Connecting stores suggestion status; repeated offers refresh evidence while preserving handled status; goal revision/resolve/delete clears suggestions as P1 specifies.
- New/changed/deleted memories or claims update relevant active-goal suggestions automatically, and the frontend shows the updated result without a page reload.
- Every changed boundary is owner-scoped and runtime validated. Required auth remains intact. Syntax, generated artifact/type/frontend checks, lean Mongo/provider/HTTP tests, build, and feasible real UI checks pass, with limitations explicit.

## Open questions
The user answered the initial three scope questions. A follow-up asks whether identical repeated searches should reuse the existing active Need; retain current create semantics until answered. A real provider smoke test will require the user to configure an API key locally; never ask them to paste it in chat.

## Activity
- Inspected P1 product/design and P2 reductions; confirmed permanent decisions versus temporary deferrals.
- Created a complete staged copy, pinned workflow setup, and selected contract translation plus independent review before implementation.
- User answered capture, legacy-search, and identity questions; authoritative decisions updated before contract completion.

## Resolved decomposition findings

**.sync-engine/work/restore-p3-functionality/2026-10-19T22-48-38Z-critic-contracts.response.md**

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

# Result

Unless the task requests another format, use these prior fields: `## Status`, `## Changed`, `## Questions`, `## Checks` (optional).
