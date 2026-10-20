# Role and objective

Continue work unit `compact-interaction`; role `frontend-worker`; phase `implementation`. The prior same-phase role contract remains authoritative.

# Access

This grant replaces prior access; other rules remain.

Current grant:

```json
{"readableAreas":[{"area":"application","path":"frontend/src"},{"area":"application","path":"generated/wire.ts"},{"area":"application","path":"src/memory-fields.ts"}],"writableAreas":[{"area":"owned-configuration","path":"frontend/node_modules/.tmp"},{"area":"owned-frontend","path":"frontend/src/App.vue"},{"area":"owned-frontend","path":"frontend/src/assets/articulated/motion.d.ts"},{"area":"owned-frontend","path":"frontend/src/reusable"},{"area":"owned-frontend","path":"frontend/src/style.css"}],"toolKinds":["repository-read","repository-write"],"projectShell":"project-validation","network":false,"generatedOutput":false,"longRunningProcesses":false}
```

# Guidance

Unchanged from the prior same-agent context. Apply it to the task and changed context below.

# Context

## Task

**.sync-engine/work/compact-interaction/gesture-task.md**

Continue the same frontend assignment with latest user steering. Replace AnimatedBackdrop's whole-picture drift with TWO articulated cut-paper figures: arms/forearms/head move independently, with a clear hand-wave on main control interaction; circles and connecting lines stay fixed. Supplied original renderer and two atlases/rig manifest have been copied read-only into frontend/src/assets/articulated/. Read motion.js/rigs.json there for the renderer's public functions; add local .d.ts if needed. These are the user's original imagegen assets, not new placeholder silhouettes. Compose them as a centered decorative low-contrast scene BEHIND the existing centered forms, using fixed SVG rings/circles/curves with no photographs. Do not animate a flat whole illustration. The new abstract bitmap is not needed for this animated scene; preserve image/font bytes, and use the same animated scene on sign-in if appropriate so photos cannot reappear there. Artwork needs pause, reduced-motion, hidden/offscreen suspension and cleanup as before. Give each inline figure a unique filter ID; renderer updates joint transforms rather than innerHTML each frame. When switching poses, keep an always-open forearm mesh or rerender as needed so target parts exist; do not silently miss forearms. A subtle idle pose plus a distinct triggered wave is enough. Trigger on main mode/mic/submit clicks (local presentation state only), keep paused/reduced-motion behavior respected. No new data/provider actions.
Remove the visible “Remember someone” and “What are you looking for?” headings COMPLETELY as user explicitly requested. Retain accessible input labels using sr-only labels/aria-label; no giant blank heading spacing. Keep all completed compact controls/four-row SVG actions/source-appropriate cards and deliberate voice save behavior.
Coordinator now applied Handlee font (exact supplied archive) and no-photo asset; do not revert these font references or alter asset bytes. Capture copy is already shortened. You may edit App/style/reusable components plus add assets/articulated/motion.d.ts only. Do not alter supplied motion.js, rig or PNG files. No backend, design or tests edits. Run `bun run --cwd frontend typecheck` and `bun run --cwd frontend build -- --outDir /private/tmp/circle-compact-preview-dist`. Return Status Complete/Blocked with real articulation and trigger evidence; browser checks remain coordinator-owned.

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
- User resolved pending assets: Handlee.zip was added under frontend/fonts; coordinator extracted exact Handlee regular and OFL license and replaced MadInk font references. User explicitly requested removing photo circles; an imagegen edit made an abstract photo-free version, retaining original files.
- Latest steering supersedes whole-image drift: figures themselves must move (such as a hand wave on interaction), with fixed circles/lines; use the original supplied articulated cut-paper rigs/atlases copied into frontend/src/assets/articulated. No animation of a flattened image. User also explicitly removed both working headings completely; inputs must instead have visually hidden labels. Existing field prompt/reminder copy is shortened further by coordinator.

## Assembled public interface

**.sync-engine/work/compact-interaction/interface.md**

Unchanged from the prior same-agent context.

## Frontend starting paths

**.sync-engine/work/compact-interaction/frontend-paths.md**

frontend/src/App.vue; frontend/src/style.css; frontend/src/reusable/; existing voice.ts, recent-people.ts, request-scope.ts and memory-summary.ts; ../src/memory-fields.ts is supplied as a read grant at application:src/memory-fields.ts. Runtime artwork frontend/src/assets/circle/connection-collage.png; font assets remain coordinator-owned. Validation scripts supplied in task.

# Result

Unless the task requests another format, use these prior fields: `## Status`, `## Changed`, `## Checks`, `## Blockers`, `## Concerns` (optional).
