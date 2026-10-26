# P4 task and usability review

October 26, 2026. A6 follows the applied A1–A5 changes. This is an agent inspection with synthetic data, not a claim that unfamiliar participants were tested.

| Observed issue | Refinement | Verified outcome |
| --- | --- | --- |
| Empty Find said only “No saved people yet.” | Explain saving first, give a short example and offer Remember your first encounter after a successful empty read. | Enter opens note entry with focus. Existing Text/Form/Voice choice and drafts survive a return through Find. Nothing is seeded or saved until explicit Save. Loading and failure do not masquerade as an empty account. |
| A corrected encounter still displayed its first wording under Personal notes without explaining the difference. | Add concise AI/current/original guidance and a conditional explanation beside the first saved text. | The edited fixture shows its current details and historical first wording distinctly. Equal-name encounters remain independent; nested notes stay collapsed until opened. |
| The signed-in decorative reserve pushed useful rows down the page. | Reduce that reserve by 80px on desktop and 70px at the narrow breakpoint; let forms grow normally. | The in-app 686×854 view places Recent people at document y519.30 without horizontal overflow. The art, fonts, palette, white rows, red basket, mode toggle and centered Save remain. The sign-in composition is unchanged. |

Ten synthetic encounters cover duplicate names, unnamed and inferred details, missing fields, a 200-character name, long notes, Unicode and multiline contact information. Rendered checks at 320px and 390px retain complete text, scrolling dialogs and keyboard access. The full production-preview Chrome suite passes **69 scenarios**, including eight new [A6 scenarios](../code/frontend/tests/browser/p4-usability.pw.mjs); existing paging, source-preserving editing, account cancellation, errors and voice cancellation remain covered.

The user-requested internal-browser inspection used the built frontend with an isolated in-memory fixture API, visibly named synthetic-preview. It made no MongoDB, Commons or external AI calls. Manual checks confirmed the empty action, keyboard entry focus, Form draft retention, explicit save, conditional first-original explanation and a visible 3px keyboard focus outline. The impossible date 02/30/2026 retained its draft and showed correction guidance in the baseline check. This is client evidence, separate from live integration.

Rendered guidance text is 14px. Localized checks combined computed text colors with actual screenshot background pixels: AI guidance 5.54:1, first-original guidance 6.20:1, and the visible focus-ring sample 7.56:1. These samples and screenshots support the inspected states; they do not establish complete accessibility conformance.

Generation, source/artifact/backend/Vue checks and production build pass. The worker also ran 111 UI helper tests with 441 assertions. Thirteen advisories assessed in the [access review](p4-access-review.md) and three existing browser externalization warnings remain. No dependency, backend, provider, authentication or endpoint/input change was made. An independent critic approved both the final contract and source/test implementation without findings; broader execution evidence was supplied by the coordinator.

## Coverage limits

The suite tests 200%/400% CSS zoom, reduced-motion preference and emulated touch; it does not establish real browser zoom, a physical phone, screen-reader operation or microphone capture. Native Chrome control was not approved by the computer-use tool; the requested internal browser was used successfully, but offers no browser-zoom control. Human unfamiliar-user and hardware checks remain in the handoff. Screenshots and raw logs are retained in the A6 evidence set for the final P4 verification index.
