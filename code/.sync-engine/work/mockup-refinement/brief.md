# Correct the typography and use the supplied mockup composition

## Goal
Use Sofia's downloaded MadInk/Urbanist fonts and follow the screenshot's larger, flowing figures, connected curves, layered circles and warm paper composition.

## Scope
Presentation only. Preserve current P3 Remember/Find, auth, drafts, save/voice, search and note lifecycle, evidence and account scopes. No new product features, fake user records, provider calls, navigation promises, backend/design/wire/dependency changes or publication. Do not edit Sofia's desing-journal.md.

## Requirements
Supplied zip files actually live at frontend/fonts/. Extracted exact fonts and included licenses are pre-copied to frontend/src/assets/fonts/. Use MadInk regular for expressive headings/wordmark and Urbanist variable for body, labels, controls and detailed data. Preserve font licenses (MadInk archive says Demo for Personal Use); this task is local implementation, not licensing interpretation or deployment. The screenshot's heading happens to look serif, but explicit downloaded study fonts determine the requested pairing.

A built-in image-generation edit has reconstructed the screenshot's decorative right-hand collage without screenshot UI, text or sample-note annotations, on transparent alpha. It is at frontend/src/assets/circle/connection-collage.png. Use this actual asset prominently: spacious left content, sweeping blue cut-paper figures and circular campus/photo vignettes on the right, cream paper and warm red actions. The signed-out view may be a broad editorial split hero; signed-in screens should echo it without obstructing fields or burying lifecycle controls. Use actual existing product actions, not invented About/For students/Try Circle pages. Do not use the entire screenshot as UI. Background texture can be subtle CSS. Keep phone layouts usable; art stays decorative, out of the accessibility tree, does not cover actions, and should fit/crop intentionally.

Replace the small articulated mannequin treatment. Optional restrained drift must have pause control, reduced-motion behavior and hidden/offscreen suspension/cleanup; static artwork is acceptable. Avoid excessive slogans and repeated explanations. Remove unused runtime copies/components from previous figure implementation if replaced; never alter original design-docs artwork, user font zip archives, backend or tests. No new cosmetic tests.

## Done when
- Downloaded MadInk loads for headings/brand and downloaded Urbanist loads for text/controls, retaining both license files.
- The transparent collage appears as a substantial composition based on the screenshot, across sign-in and current working views, without fake content or blocked controls.
- Desktop/tablet/phone layouts, focus and draft/save/evidence controls are usable. Relevant existing UI tests, Vue typecheck and build pass; browser validation uses disposable simulated responses.
- Reviewed frontend/asset changes are applied to the actual checkout with hash guards; agent notes are appended only to agent-journal.md.

## Active decisions
- Accepted P3 canonical design remains unchanged. Continue directly to frontend implementation, with independent scoped review of contract preservation and visuals.
- Staging copy avoids restricted writes and preserves concurrent edits; no dependency versions changed. Tooling uses bundled Node 24.
- Imagegen skill used to edit the user screenshot into a transparent art-only asset. This is reconstructed artwork, not a claim that the exact original layered source was supplied. Original screenshot and original generated file remain intact.
- Native Codex delegation; supplied fonts/licenses are read-only inputs. User said code/design/fonts, but file discovery found code/frontend/fonts.

## Activity
- Inspected current frontend, visual study, screenshot and font archives. Supplied assets are staged before role preparation.
- Frontend worker /root/mockup_frontend completed. Validation-cache write grant was solely for Vue's existing incremental checker; no package/config versions changed. Built output stays outside the staging application.
- Coordinator adjusted sign-in heading sizes after browser rendering so the real MadInk glyphs fit the desktop split. Body, controls, evidence and encounter names remain Urbanist.
- Critic /root/mockup_review initially hit an account-limit failure in approval tooling for read-only file access (R01). The run was finalized blocked; the same critic continued with the already granted source/license contents inlined and approved. R01 is resolved; no implementation or design blocker remains.
- Browser verified desktop 1280px, phone 320/390px and 620px boundary; no root horizontal overflow, decorative art loaded, MadInk-shaped headings and Urbanist data/controls. Tested draft preservation across Remember/Find, save/list refresh, expandable evidence, encounter inspection/editor/cancel and sign-out. Final browser warnings/errors empty. Preview uses disposable simulated API responses, not live backend persistence/Commons/microphone/provider checks.
- Vue typecheck/build passed. Existing 12 UI tests passed (34 assertions); no tests added/deleted. Known SDK browser-externalization build warnings remain. Supplied fonts and license files are preserved exactly. Original design-docs assets, screenshot, generated image, source zip archives, backend/contracts/wire and Sofia's design journal are untouched.
- Public interface reconciliation: generated wire and original App event-handler body are byte-for-byte unchanged; no required, optional, defaulted or cookie-injected endpoint inputs change. All Done When outcomes are covered by source/build/test/browser evidence and guarded application to the real checkout.
