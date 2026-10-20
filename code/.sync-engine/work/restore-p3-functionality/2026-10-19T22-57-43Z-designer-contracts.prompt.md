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

**.sync-engine/work/restore-p3-functionality/designer-d01-task.md**

Repair concrete routed Design D01 only. Public installed docs do not establish is.among enumeration for an unbound claim; add Graphing._members(owner: User, evidence: Set<Claim>) : many (claim: Claim), enumerating every DISTINCT supplied identity including absent/foreign references, sorted by identity. It reveals no state or facts beyond its input; authentication/ownership validation still occurs exclusively through _evidence and owned original joins. Add linked InvalidEvidence view defined as _members output plus no(OwnedEvidence(owner,claim)); full proof rejects candidates whenever any member invalid, and empty evidence never offers. Use _members for full sources collection, so missing intermediate references cannot disappear silently. No additional state or new computation. Keep other contracts stable. Run syntax only; return concise Status with exact edits.

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
- Independent critic found and verified repairs for C01-C04. Deployed API uses a single-process complete-settlement FIFO including reads; callers admitting direct roots must serialize them. This conservative beta tradeoff avoids unsupported cross-concept concurrency guarantees. Multi-process use is outside this design.
- Backend concept and application implementation are deliberately combined in one worker with bounded source/tests/configuration grants, because revisions, complete proof and refresh ordering need coordinated edits. Network grants cover isolated test Mongo and local provider stand-ins only. No real provider key currently available. Frontend follows afterward against generated wire.

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
- Authored restored four-concept contracts passed syntax. Independent contract critic reviewed all obligations, requested four concrete repairs, and approved the repaired design after verification.

## Resolved decomposition findings

**.sync-engine/work/restore-p3-functionality/2026-10-19T22-53-56Z-application-worker-implementation.response.md**

## Status
Blocked

Lifecycle, graph, provider, registration, and host changes are retained. Composition restoration awaits the approved evidence-enumeration contract.

## Changed
- `src/concepts/Remembering.ts`: revisions, deletion tombstones, injected transcription.
- `src/concepts/Seeking.ts`: ongoing-need lifecycle and legacy active interpretation.
- `src/concepts/Connecting.ts`: persistent suggestions and handled status.
- `src/concepts/Graphing.ts`: source digests/version checks, corrections/retraction, directed cross-note tracing.
- `src/concepts/graphing-text.ts`, `graphing-extraction.ts`, `openai-extractor.ts`: multiple explicitly named people, directed KNOWS, organization facts, common validation.
- `src/concepts/transcription.ts`: bounded audio validation and injected OpenAI transcription.
- `src/concepts.ts`, `src/assembly.ts`: registrations, refusal mappings, sourceDigest, provider injection.
- `src/compositions/inputs.ts`: reusable protected payload validation.
- `src/host/http.ts`, `src/host/admission.ts`, `src/main.ts`: audio body limit, error categories, complete-settlement FIFO admission.
- `tests/concepts/graphing-extraction.test.ts`: replaced obsolete one-person restriction test.
- `tests/providers/transcription.test.ts`, `tests/host/admission.test.ts`: focused provider and admission checks.

## Checks
- `bunx tsc --noEmit` — passed.
- `bun test tests/providers/transcription.test.ts tests/host/admission.test.ts tests/concepts/graphing-extraction.test.ts` — passed: 7 tests.

Full MongoDB suite, artifact generation, contract/source checks, restored endpoint validation, and browser integration remain unfinished.

## Blockers
**Design D01:** The approved contract requires validating every claim identity in a candidate’s evidence set, including missing identities. Supplied public DSL documentation establishes membership comparisons but does not establish enumeration of an unbound variable over `Set<Evidence>`.

Add an approved pure query such as `Graphing._members(owner, evidence)` that enumerates every distinct supplied claim identity—including absent claims—plus an `InvalidEvidence` composition view. Full proof then excludes a candidate whenever any enumerated identity lacks `OwnedEvidence`.

Composition endpoints, automatic reset/offer reactions, universal proof joins, and generated artifacts remain unchanged pending that repair.

## Concerns
- No live OpenAI request was made; no configured key was available.
- The full existing graph suite may expose parser compatibility issues; only extraction validation tests have run so far.
- HTTP refusal category mappings are present, but exact normalized missing/foreign response bodies still require composition and HTTP verification.

# Result

Unless the task requests another format, use these prior fields: `## Status`, `## Changed`, `## Questions`, `## Checks` (optional).
