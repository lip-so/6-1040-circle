# Integrate Circle's visual study

## Goal
Apply Sofia's added visual study and original motion assets to the existing Circle application.

## Scope
Frontend presentation only: warm ivory/ink, blue figures, vermilion actions, bundled Urbanist, restrained circular motifs, responsive hierarchy, motion integrated with Remember/Find and sign-in. Preserve every existing P3 flow, endpoint, wording needed for accessibility, auth/ownership, original data, unsaved drafts and confirmations. No new product features, provider calls, backend contracts, dependency changes, publishing, or personal design-journal edits.

## Requirements
Use the supplied files from design-docs/visual-study-assets/circle-motion, copying only required runtime files into frontend assets. Keep Urbanist's OFL. MadInk is not supplied: use truthful Urbanist fallback and record limitation. Motion must respect reduced-motion, pause when hidden/offscreen, clean up on unmount, and offer an accessible pause control for ongoing animation. Text/buttons must meet contrast, retain visible keyboard focus and usable mobile controls. Decorative illustrations must stay out of the accessibility tree and never cover content. Keep the app quiet and skimmable; do not add preview controls or marketing sections from the asset demo.

## Done when
- Sign-in, Remember, Find, saved searches, suggestions, note review/edit and recent encounters share the visual study's palette and typography.
- Supplied artwork appears as restrained, responsive contextual illustrations with functional pause/reduced-motion handling.
- Existing typed drafts, deliberate voice save, source evidence and lifecycle controls continue to function.
- Vue typecheck and build pass; actual browser checks cover desktop/mobile, keyboard focus, reduced motion, loading/error states, and core signed-in interactions using local simulated data.
- Only reviewed frontend/runtime assets, completed scoped work records and an agent-journal entry are applied to the real repository; Sofia's design journal and unrelated edits are preserved.

## Active decisions
- Reuse the accepted P3 contracts without authored design changes. This is a visual implementation of the supplied study, not a new product decomposition.
- Work in an isolated temporary copy, then check baseline hashes before applying to the actual checkout outside the writable sandbox.
- Use native Codex role delegation. No provider credentials or live external model calls; any browser data must be local simulated data.
- Body uses bundled Urbanist. MadInk cannot be claimed or downloaded without its supplied font/license. Local MadInk may be offered as a heading fallback only if explicitly identified.
- Exact vermilion may need a darker action shade for readable white button text; retain the original palette for decorative marks.
- Coordinator may run validation and add agent journal after roles finalize; no extra cosmetic unit tests.

## Activity
- Reviewed AGENTS.md, current frontend, visual study, motion README/renderer, color board and asset preview.
- Used bundled Node 24 for skill tooling and copied existing dependencies into temporary staging; no dependency versions changed.
- Frontend worker /root/visual_frontend completed; delegated critic /root/visual_review approved unchanged contract digest. Critic read bounded changed frontend files in addition to contracts to check interaction preservation; this deliberately expands normal design-review read scope.
- Coordinator removed added marketing copy, retained the concrete existing headings, reused the supplied memory-ring symbol in the brand, and widened the single-column sign-in breakpoint to avoid cramped columns at 511 CSS px. No application semantics changed.
- Frontend typecheck/build pass; 12 existing UI tests pass (34 assertions), no tests added/deleted. Known SDK browser-externalization build warnings remain.
- Disposable frontend-only browser fixture used because local Mongo was unavailable. Checked desktop (~1422 CSS px), phone (390 CSS px), 511px sign-in boundary, labels/focus, note draft toggle/save/list refresh, evidence expansion, note editor/cancel, resolve/reopen, sign-out, error/Retry presentation, paused transform stability and static transforms with a simulated reduced-motion preference. Final console errors/warnings empty. Browser observations verify client behavior against local simulated API responses, not current backend persistence, live Commons, microphone hardware or provider quality.
- Runtime source/font/atlas/license copied unchanged from supplied study. MadInk remains unavailable. Full-page final screenshot saved outside repository. Existing personal journal, provider keys, backend/contracts/dependencies and study source assets stay untouched.
