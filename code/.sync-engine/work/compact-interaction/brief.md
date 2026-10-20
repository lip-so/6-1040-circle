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

## Final active refinements (supersede initial pending choices)
- Handlee is supplied and installed with license; no photographs. Working question headings removed. Continuous native SVG dancers replace failed raster articulation; limbs dance/wave while motifs remain fixed; smooth bottom fade. Vertical compact contact cards use Circle blue/coral header and white body, no avatars.
- Saved-search accordion focuses inline suggestions and supports collapse; repeated arrow submissions reveal old searches beyond four. No New search button. Pen/bin encounter controls, no user-facing retry indexing.
- User removed Useful/Dismiss feedback. Client offers only bin removal. Deliberate seek clears prior connections before recomputing, so legacy handled matches reappear on a new search. Dormant feedback API retained for compatibility, not used by client; no preference learning.

## Current recommendation decision (supersedes prior feedback removal)
- User chose ellipsis menu → Do not recommend → optional reason; applies across ALL this owner's searches. Remove legacy Useful/Dismiss/Remove completely. Connecting owns durable exact-target owner exclusions and optional reasons; recommendation-only LLM context is strictly per user, independent of note extraction. New stateless model policy can veto supported candidates; local/simulated checks make no remote calls. No new concept or person merging.
- Remove Look again. Arrow runs seek; keep automatic note-driven refresh. Anchor Remember/Find switch to a stable shared position across mode changes, including mobile. Full mobile flow verification requested.
- Application worker grant spans Connecting, portable composition/wiring,frontend and priority tests to complete this one cross-layer change; no auth implementation ownership. Final critic receives expanded design for full review because user materially changed feedback semantics; prior CI-01 will be checked.

- Final user steering: encounter edit pen beside Close; no What Circle understood/claim controls. Mobile320px browser found2px decorative overflow, corrected by bounding artwork; no blanket body clipping. Switch anchor exact same rectangle between modes. Expanded implementation passed20 priority tests including two new provider-boundary cases; previous cosmetic work added no tests.

## Final evidence reconciliation
- Canonical final-manifest.json generated via artifacts manifest and generated/wire.ts provide endpoint/input inventory when work CLI prints Public interface not generated. Exclude requires session plus connection and explanation (empty allowed); owner/target cannot be client supplied. All other boundary shapes unchanged except removed legacy feedback endpoints/status field. Critic confirms21 endpoint declarations and full source/wire agreement.
- Final browser evidence320/430 no overflow, exact stable toggle rectangles, menu/Escape/reason/focus, durable exclusion after repeat seek, preserved original notes and editable simulated voice. Earlier four-row/expand/inline collapse/guided-freeform checks retained. Final source applied only after hash guards; original assets/fonts/journal preserved. Live providers/Commons/hardware omitted as requested.
