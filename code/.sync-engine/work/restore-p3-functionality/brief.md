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
- Routed D01 repaired and independently verified: Graphing._members enumerates all supplied claim identities, including missing ones; InvalidEvidence rejects any missing current owned proof. No undocumented enumeration from is.among is assumed. Frontend draft preparation occurs outside the staged application while backend runs, then is applied and checked only after its run is finalized.
- Latest explicit user answer supersedes distinct-create repetition: repeated exact lookups reuse an existing ongoing Need. Normalize only case/outer/repeated whitespace, never merge paraphrases; preserve prior saved duplicate records. Resolved records are not ongoing. User selected simulated OpenAI responses for now; do not make live provider calls or ask for a key again during this increment. Canonical wording will be updated in the final batch after the active implementation record is finalized.
- Final canonical wording now incorporates all user choices and supported helper/work-reply declarations; independent verification approves final digest. Coordinator implemented frontend against generated wire. Root reconciliation used supported artifacts manifest because work show did not print its generated interface: 22 application paths, five auth paths, one extra declaration for refresh work; all application fields required, none optional/defaulted; session is cookie-bound and times/revisions internal.

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
The user answered all current scope questions. Reuse existing ongoing searches for repeated exact lookups and use simulated OpenAI responses for now.

## Activity
- Inspected P1 product/design and P2 reductions; confirmed permanent decisions versus temporary deferrals.
- Created a complete staged copy, pinned workflow setup, and selected contract translation plus independent review before implementation.
- User answered capture, legacy-search, and identity questions; authoritative decisions updated before contract completion.
- Authored restored four-concept contracts passed syntax. Independent contract critic reviewed all obligations, requested four concrete repairs, and approved the repaired design after verification.
- Backend completed after supported DSL/transport repairs; every native run finalized. Full final regression suite: 86 pass, zero fail, 548 assertions across 18 files. Backend/spec/artifact/Vue checks and build pass; 32 framework advisories and existing Vite SDK externalization notices remain.
- Browser fixture with disposable account/database verified free-form save, two-note automatic discovery, all source quotes, handled persistence, search edit/resolve/reopen, claim ignore/restore, source edit withdrawal, deletion confirmation/Keep, typed draft preservation, separate-account isolation and narrow layout without overflow. Browser console clean. Fixture-only session transport adapted WK localhost cookie handling; actual secure-cookie policy checked in HTTP suite. Actual microphone hardware, live Commons browser and live OpenAI quality were not exercised; simulated provider checks requested by user.
- All Done When outcomes reconciled to selected public interface and tests/browser/source evidence; no missing endpoint behavior or required input. Current test inventory records 13 new priority cases, one replaced obsolete restriction and one broadened summary case; original 33 lower-priority removals remain historical. No deployment/commit/push/submission. User's design journal untouched; concurrent visual-study assets/journal entries preserved when applying.
