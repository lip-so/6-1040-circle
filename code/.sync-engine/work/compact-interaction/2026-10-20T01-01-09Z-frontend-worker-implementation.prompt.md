# Role and objective

Work unit `compact-interaction`; role `frontend-worker`; phase `implementation`.

# Frontend worker

Implement and test the assigned client surface against the assembled public endpoint contract. Keep backend design, policy, and production source read-only unless the task explicitly expands ownership.

Use the typed client rather than importing concepts or bypassing validation and authorization. Keep authoritative facts behind endpoints. Report a design blocker for missing public behavior, a context blocker for a missing interface or reference, or an environment blocker when checks cannot run.

# Access

Root: "/private/tmp/circle-compact-interaction/code". The short native message explicitly authorizes reading this prompt file; all assignment context is inline below. This is already a compiled role assignment: do not load a skill, workflow, harness guide, or another instruction file.

- Read: `application:frontend/src` ("/private/tmp/circle-compact-interaction/code/frontend/src"), `application:generated/wire.ts` ("/private/tmp/circle-compact-interaction/code/generated/wire.ts"), `application:src/memory-fields.ts` ("/private/tmp/circle-compact-interaction/code/src/memory-fields.ts").
- Write: `owned-configuration:frontend/node_modules/.tmp` ("/private/tmp/circle-compact-interaction/code/frontend/node_modules/.tmp"), `owned-frontend:frontend/src/App.vue` ("/private/tmp/circle-compact-interaction/code/frontend/src/App.vue"), `owned-frontend:frontend/src/reusable` ("/private/tmp/circle-compact-interaction/code/frontend/src/reusable"), `owned-frontend:frontend/src/style.css` ("/private/tmp/circle-compact-interaction/code/frontend/src/style.css").
- Tools: `repository-read`, `repository-write`.
- Shell: `project-validation`; network: no; generated output: no; long-running processes: no.

Inspect only listed files or directories. In coordinator simulation, this grant binds the coordinator itself; broader coordinator access and prior discovery are unavailable to the assignment. Project checks may transitively read other project files, but do not inspect them yourself. Use supplied or task-named package-owned public documentation; do not browse package trees. Never inspect package `dist`, framework internals, caches, sibling applications, or undeclared declarations. Exclude `.git`, `.sync-engine` except this prompt, harness/skill configuration, agent traces, parent directories, and unrelated generated output. Ask for context instead of searching outside the grant. Generated files come only from granted commands. Never grantable: `git-mutation`, `dependency-installation`, `framework-internals`, `workflow-management`, `skill-cli-invocation`, `delegation-or-handoff`.

# Guidance

# Framework use

Implement from supplied public references, named package-owned public documentation or examples, generated caller contracts, and ordinary project diagnostics. Do not browse package trees for alternatives.

Never inspect package `dist`, framework internals, runtime exports, caches, sibling applications, or declarations not explicitly supplied as public context. Never import from `node_modules/` or `dist/` paths. A diagnostic may name an internal file; use the diagnostic without opening it.

Repair ordinary diagnostics through the project checks. When supplied material does not determine the next API shape, try at most one directly supported repair, then report a context or design blocker instead of trying speculative variants.

---

# Frontend implementation

Use the generated typed endpoint client. Do not call raw `fetch`, import backend concepts or composition, or bypass validation and authorization. Treat endpoint results as success-or-error unions; distinguish declared refusals from transport faults, timeout, and cancellation.

Keep authoritative facts and policy behind endpoints. Test the requested success and refusal paths plus material loading, empty, and transport-failure states.

# Context

## Task

**.sync-engine/work/compact-interaction/frontend-task.md**

Implement the compact centered interaction described in the supplied brief. Own frontend/src presentation/state only; do not edit fonts or image asset bytes because replacement font/photo questions are pending with coordinator. Preserve API call behavior, scopes, retry identity, source/evidence and all lifecycle/confirmation controls. Introduce small reusable SVG icon and animated-backdrop components if useful, not icon dependencies. Find input ref needs HTMLInputElement support; its form should have search semantics and keyboard submit. Initial four-row display must use supplied ordered activeNeeds; local expansion must reset on account changes and not limit other data. Direct row icon actions need specific aria-label/title and 44px usable targets. Recognize guided vs freeform via readMemoryFields; no fake source provenance. Compact freeform note preview must keep full text available on demand. Artwork gentle motion plus pause/reduced-motion/hidden/offscreen handling; same image path allows coordinator to substitute photo choice later. Work headings must be discreet and the toggle/form centered. Textarea can be compact but must allow review/edit of long transcriptions. Treat mic as equal first-class action next to save, support stop/transcribe/cancel and errors without automatic save or new WebAudio/provider features. Avoid nested interactive elements and excessive copy. Run `bun run --cwd frontend typecheck` and `bun run --cwd frontend build -- --outDir /private/tmp/circle-compact-preview-dist`. No dependencies, backend edits or new cosmetic tests. Return Status: Complete/Blocked, files/checks/remaining questions. Do not edit coordinator work artifacts.

## Brief

**.sync-engine/work/compact-interaction/brief.md**

# Compact centered capture and search

## Goal
Implement Sofia's nine UI refinements: replacement font, compact equal text/voice capture, search-shaped Find, animated graphic centered behind the main interaction, discreet headings, four latest searches with expansion, direct icon actions, source-appropriate recent-note display, compact people cards.

## Scope
Preserve Commons, owner/session boundaries, deliberate editable transcription/save, cancel and late-response scopes, manual save retry identity, original notes/evidence, note/search/suggestion lifecycle and confirmations. No extra product features, provider calls, dependency changes, fake records, publication, or personal design-journal edits.

## Requirements
- New font is not yet discoverable: only existing MadInk/Urbanist archives are present. Coordinator asked user for the replacement font path/name; final font replacement must wait for supplied file/answer. Frontend worker should not choose an unsolicited replacement or overwrite font assets. Quiet working headings can use Urbanist; retain current brand font until coordinator resolves this.
- Replace repeated long capture copy with compact prompt/reminder. Microphone and deliberate-save/next icon buttons are peers in the same composer, equally prominent and keyboard accessible. Existing recording/stop/transcribe/cancel/error behavior remains. Siri inspiration: a restrained luminous microphone/active capture edge and easy type/talk choice, not fabricated voice meters or automatic save. Source reference: https://www.apple.com/apple-intelligence/ (current type/talk and microphone/orb imagery).
- Find uses a single-line type=search field, search affordance and submit control, not a textarea. Preserve description limits and exact query content, keyboard submission and selection/New search behavior. Only Remember needs the existing voice capture behavior.
- Center Remember/Find and form in the page. Keep question headings discreet. Decorative artwork is centered behind this interaction, lower contrast where needed, cannot block pointer/text controls. Animate gently; provide pause, reduced-motion, document-hidden/offscreen suspension/cleanup. User was asked whether the circular photos should be removed; coordinator resolves asset choice, worker can keep current collage path for now. Original design assets remain untouched.
- Looking for initially shows first four active needs; expand/collapse on demand without discarding hidden needs or limiting matching. Backend list is now newest CREATED dated records first, stable identity ties and undated legacy last; repeat search still preserves original identity/time. All active needs remain available through expansion; reset local expansion on account changes. Icons for resolve/check, edit/pen, delete/bin appear together on each row, no More disclosure or visible text action labels. Include context-specific accessible names and title hints; preserve delete confirmation and edit flow. Resolved rows may use reopen/delete icons similarly.
- Recent cards: readMemoryFields identifies older structured guided notes; those show When/Does/Discussed/Contact summary without the raw serialization. Free-form text/voice notes should show their original content (compact preview with full-note expansion if long) rather than redundant summary+note copies. No new persisted origin metadata is required. Inspection and suggestion proof retain complete originals. Compact card spacing/type; all encounters remain accessible, including unsupported/unindexed notes.

## Done when
- Supplied replacement font is applied after user resolves file availability; exact file and license retained.
- Centered responsive composer supports text and equally prominent mic, clear stop/transcribe/cancel/error states; Find looks and behaves as a search bar.
- Centered decorative graphic animates with usable pause/reduced-motion and never blocks input; photo choice follows user reply.
- Only four latest active searches show by default; expand/collapse works; direct SVG actions edit/resolve/delete correctly with accessible names and confirmations.
- Guided recent cards show summary only; free-form recent cards show original text with long-note access; cards remain compact.
- Appropriate existing backend/UI tests, types/generation/build and actual browser scenarios pass, using simulated providers and isolated test data.
- Reviewed changes applied to the real checkout with concurrent-edit guards; notes only in agent-journal.md.

## Active decisions
- Existing concept decomposition is accepted. Coordinator translates the explicit latest-first requirement into Seeking._list/_active ordering and canonical prose; no API fields, date backfills, identities or timestamps change. Independent final contract review will bind this small contract change.
- Work in isolated staging; preserve manual edits, personal journal, current runtime env and original art/font archives. Native Codex delegation, bundled Node 24 for skill bootstrap. No dependency updates.
- One existing Seeking test is strengthened for dated/undated/newest/owner ordering; no new test count or cosmetic cases.
- Pending font and photo questions do not block independent interaction/layout work. Do not claim those parts complete until user answers.

## Activity
- Inspected current App, voice, summary/guided reader, Seeking order/spec/tests and installed skill workflow. Newest-first source/spec change authored by coordinator; artifacts regenerated with supported tooling.

## Assembled public interface

**.sync-engine/work/compact-interaction/interface.md**

Current typed client remains frontend/src/api/client.ts against generated/wire.ts. This UI change adds no endpoint/input/output fields. Keep the existing event handlers and wire call signatures in App.vue. Relevant methods: auth.me/logout; memories.remember/list/get/revise/forget/reindex; capture.transcribe; needs.list/seek/revise/resolve/reopen/delete; suggestions.list/refresh/use/dismiss/remove; claims.reject/restore/remove. Needs list rows are {need,description,active}, newest dated first then undated legacy. Memory list rows are {memory,content}. Memory get returns {memory:{memory,content,claims}}. readMemoryFields recognizes original structured four/five-field memo; free-form typed/voice notes have plain content and no separate origin flag. Voice produces editable note text; saving remains explicit and retry token-bound. No hidden rows may be deleted or omitted from suggestion processing.

## Frontend starting paths

**.sync-engine/work/compact-interaction/frontend-paths.md**

frontend/src/App.vue; frontend/src/style.css; frontend/src/reusable/; existing voice.ts, recent-people.ts, request-scope.ts and memory-summary.ts; ../src/memory-fields.ts is supplied as a read grant at application:src/memory-fields.ts. Runtime artwork frontend/src/assets/circle/connection-collage.png; font assets remain coordinator-owned. Validation scripts supplied in task.

# Result

Unless the task requests another format, return these headings in order. Omit progress narration.

- `## Status` — required. First line is exactly `Complete` or `Blocked`; explanation goes below.
- `## Changed` — required. Paths changed, or none.
- `## Checks` — required. Exact command and pass/fail outcome.
- `## Blockers` — required. Categorize as design, context, or environment.
- `## Concerns` — optional. Material non-blocking uncertainty only.
