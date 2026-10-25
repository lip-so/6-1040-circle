# Circle: P4 audit and comprehensive to-do list

Audited October 22, 2026. Repository: `/Users/sofia/6-1040-circle`, commit `8dfc7f24d1ff8a41698e7a5d6178f700f738187f` (`p3 clean2`).

**Deadline: Monday, October 26, 2026, 11:59 PM Eastern.**

## Assessment

Circle has a substantial P3 implementation: Commons authentication; text, voice and form capture; owner-scoped notes and search; validated model output; editing; confirmed removal; generated contracts; and meaningful automated tests. P4 should concentrate on finishing and demonstrating this scope. Restoring every deferred P1 feature is not a P4 requirement.

The most consequential concrete code finding is that editing can silently replace saved form details with a shorter model summary. The largest submission gaps are the missing final design summary, missing final video, broken verification links, and incomplete evidence for the deployed authenticated app. The public homepage and database health endpoint responded during this audit, so deployment is present; successful end-to-end behavior is still unverified.

This document is an audit and work plan. Unchecked items are future work, including verification of existing behavior; they do not all imply missing functionality. No application code, user data, notebook, deployment or provider configuration was changed during the audit.

## Requirement and evidence map

The [P4 assignment](https://61040.github.io/fa26/assignments/p4/) requires finishing the code and current specifications/reactions/tests/design notes; reviewing authentication and access control; polishing behavior and visuals; testing deployed persistence/access control/errors; a coherent one-to-two-page design document; a narrated video of at most three minutes; user-testing readiness; and a concise, reproducible README linking the deliverables.

| P4 requirement | Evidence found | Remaining work |
| --- | --- | --- |
| Final frontend/backend and current contracts | Six concept implementations, authored specifications, compositions and generated wire/readback; fresh checks pass | Resolve editing defect; assess remaining risks; regenerate after any contract changes; validate final release |
| Authentication/access-control review | Session-derived owner in all seven private endpoints; owner-scoped database queries; extensive isolation and cookie tests | Record an explicit endpoint review and live two-account checks |
| Polish and understandable interactions | Responsive interface, status/error messages, focus handling, text/voice/form controls, edit and removal dialogs | Address recovery/friction items below; try plausible mixed data and first-use tasks |
| Deployed app URL and validation | README links `https://circle.mit-sdg.dev/`; public `/` and `/health` both returned 200 on October 22 | Establish release identity and verify authenticated persistence, isolation and errors |
| One-to-two-page final design document | P1 documents, P3 visual study and P3 journey exist | Final synthesis absent from the audited tracked files; compare final design with P1 and P3, using commit links |
| Final narrated video, ≤3 minutes | README still says updated video pending, with a stale P3 two-minute limit | Record, upload, verify access, add a Markdown link |
| README links and reproducibility | Setup/test instructions and material index exist | Lead with P4; fix four broken verification references; clarify prerequisites and runtime versions |
| Preparation for P5 | P3 journey provides a useful starting point | Prepare independent participant tasks, account access, plausible data and observations |

## What was actually checked

| Check | Audit result | Interpretation |
| --- | --- | --- |
| `bun run check` | Passed after allowing normal ignored TypeScript cache writes; 13 framework advisories remain | Concept checks, generated artifact consistency and backend/frontend types pass. Advisories require assessment, not an assumption of failure |
| Database-independent tests: `bun test tests/ui tests/providers tests/concepts/calendar.test.ts` from `code/` | 36 passed, 0 failed, 140 assertions, eight files | Fresh evidence for UI helpers, dates and deterministic provider contracts |
| Full backend suite: `bun run test` from `code/` | Failed: 38 pass, 68 fail, one error; local MongoDB connection refused at `127.0.0.1:27017` | Environmental blocker. Does not establish application regressions or a fresh full-suite pass |
| Production build | Passed in an isolated copy; existing Node-module externalization warnings remain | Build succeeds; runtime browser checks are separately necessary |
| Chrome interaction suite | 16 passed in an isolated copy | Real Vue/browser behavior, with API and microphone mocked; does not prove server, provider or hardware integration |
| Production-preview Chrome suite | 16 passed in an isolated copy | Uses the production frontend build, still with mocked API/microphone |
| Existing saved P3 output | Records 134 Bun tests and 16 Chrome tests passing on the previous verification run | Historical evidence, not a fresh database test run |
| Public production HTTP checks | Homepage 200; `/health` 200 with `ok`; same deployment header on both | Public reachability and the health endpoint pass; no signed-in journey was exercised |
| Production frontend asset names | Match fresh local build names: `index-l64jE0TV.js` and `index-DlZbdJms.css` | Suggests the frontend corresponds to this build; does not identify the deployed backend commit |
| Editor round-trip reproduction | Saved `Does: Builds solar panels and designs batteries` became `Does: Builds solar panels` | Confirmed data-fidelity defect in form preparation/serialization; first original survives, current searchable detail can be lost |
| Pagination recovery reproduction | After 40 rows loaded, a third-page failure followed by the UI's refresh-style Retry left 20 rows | Confirmed recovery regression in pagination context; stored notes are not deleted |
| Documentation links | Four references point to absent `design-docs/verification.md` | Confirmed broken links |
| Repository status before documentation output | Clean | Existing manual modifications were not overwritten |

The isolated copy kept browser screenshots/build output away from the repository's saved P3 evidence. No live model-quality check, microphone hardware recording, authenticated production test, deployment restart or private notebook inspection was performed.

## Priorities

- **P0 — submission essentials / correctness:** fix silent edit detail loss; provide design summary and final video; complete deployed authenticated validation; repair verification evidence and README navigation; obtain a fresh full test run with MongoDB.
- **P1 — finish before release where practical:** investigate cold-search timing, make limit/conflict failures actionable, improve pagination recovery and first-use clarity, verify relative-date and uncertainty behavior through editing.
- **P2 — optional improvements:** modest internal cleanup, convenience improvements and further resilience. Do not let these displace required deliverables.

Each task below has an ID for tracking. “Done” means its stated outcome has been checked, not merely that code or prose was added.

## A. Lock the release scope and evidence baseline

- [ ] **A01 · P0 · Freeze the P4 supported journey.** State it as Commons sign-in → Remember with Text/Voice/Form → retrieve real saved encounters → inspect evidence/original → edit through Form → confirmed removal. Preserve the current visual decisions in `AGENTS.md`.
- [ ] **A02 · P0 · Keep deferred features explicit.** Record that recommendations, exclusions, saved/active search management, reminders, automatic rediscovery, Connecting history and identity merging remain deferred. Update the final pitch/journey accordingly; do not present those P1 ideas as working.
- [ ] **A03 · P0 · Record the final release commit.** Capture the backend/frontend commit, deployment identifier, validation date, model/prompt version and configuration names without secret values. Use this same release in the README, evidence report and video.
- [ ] **A04 · P0 · Establish a safe test environment.** Start a documented MongoDB test service and validate `TEST_MONGODB_URL`. Use existing uniquely named disposable databases. Keep app databases and existing notes intact.
- [ ] **A05 · P0 · Track findings by outcome.** For each defect/risk below, record fixed, verified acceptable, or explicitly deferred with rationale. Do not mark code-inspection risks as reproduced bugs.
- [ ] **A06 · P1 · Keep a small plausible fixture set.** Include 8–15 synthetic encounters covering complete and incomplete notes, duplicate names, discussion versus work, an unknown name, relative dates, contact details and a negative hiring statement. Keep these distinct from personal data.

## B. Correctness and error-recovery work

### B1. Editing: highest-priority concrete defect

Evidence: [`encounter-form.ts`](../code/frontend/src/encounter-form.ts#L4) chooses model-derived facts before saved guided fields. [`App.vue`](../code/frontend/src/App.vue#L245) uses those fields to prepare an edit and serializes the whole form on save. A shorter model role summary therefore overwrites a longer saved role even if the user changes nothing. Immutable first-original preservation does not preserve the current search corpus's omitted details.

- [ ] **B01 · P0 · Preserve authored form fields during editing.** For recognized guided notes, initialize from saved fields rather than lossy summaries. Done when the batteries example survives an open/save cycle and an edit to Contact alone.
- [ ] **B02 · P0 · Define a loss-aware free-text-to-form conversion.** For free-text notes, retain useful text that the model did not extract, for example in Notes, while preserving the form-only editor. Decide and document how current content differs from the immutable first original.
- [ ] **B03 · P0 · Add focused editor regression checks.** Cover unchanged save, editing one unrelated field, multiline values and a current note that was already edited. Assert retained meaning/content, not just a successful response.
- [ ] **B04 · P1 · Preserve uncertainty across the edit cycle.** `fieldsFromCard` writes inferred values as `May be: …`; verify subsequent extraction keeps them uncertain. An unrelated user edit must not turn an inferred claim into a stated fact.
- [ ] **B05 · P1 · Resolve unnamed-note editing.** Text/voice permit null names, while the form requires Person (`App.vue` and `EncounterFields.vue`). Decide how a user corrects an unnamed encounter without inventing a name. Check accessible validation and document the chosen behavior.
- [ ] **B06 · P1 · Verify long-note editability.** Inputs allow up to 20,000 characters overall, but individual form fields have smaller limits. Check that legitimate saved values do not become impossible to submit, disappear, or require unexplained shortening.
- [ ] **B07 · P1 · Verify dates during unrelated edits.** Remembering resets the current reference day on edit; canonicalized dates should remain stable. Check “today/yesterday” captured before midnight, later-day edits, context-only dates and raw residual text. Preserve intended calendar meaning and update specifications if policy changes.
- [ ] **B08 · P1 · Consider unchanged-save behavior.** Prefer leaving a truly unchanged encounter's revision/current representation alone, or explain why normalization counts as an edit. Check retry identity and timestamps for whichever policy is chosen.

### B2. Search, model processing and limits

Evidence: [`Graphing.recall`](../code/src/concepts/Graphing.ts#L50) sequentially ingests all notes before selection. The adapter allows 45 seconds per provider request; the root flow has a 120-second deadline in [`execution.ts`](../code/src/execution.ts). Multiple slow uncached notes can exceed that budget. This is a static risk, not a measured production failure.

- [ ] **B09 · P1 · Measure cold and warm search.** Use a realistic small corpus with uncached cards, then repeated searches, an edit and a prompt-version change. Record elapsed time and extraction/selection counts without private content.
- [ ] **B10 · P1 · Fit processing into the request budget.** Exercise multiple delayed extractions with an injected provider. Choose a bounded approach or a clear manual continuation/retry policy. Preserve concept boundaries, complete-corpus semantics and the rule against silent truncation.
- [ ] **B11 · P1 · Check late completion after timeout.** Determine whether timed-out work continues storing cards and how the next retry behaves. Confirm no stale update overwrites a newer edit or revives a deletion. Explain the user-visible outcome.
- [ ] **B12 · P1 · Make corpus-limit errors actionable.** Original count/byte overflow maps to generic INVALID_REQUEST; structured overflow throws `MemoryChanged` and stays opaque. Explain the actual limitation and next action without suggesting that the search text alone is invalid.
- [ ] **B13 · P1 · Distinguish real edit conflicts from service failures.** `MemoryChanged` is not in the public mapping in `host/http.ts`. Decide which cases warrant a safe typed conflict/limit message; retain opaque internal/provider errors. Synchronize refusal declarations, generated contracts and UI handling.
- [ ] **B14 · P1 · Verify both sides of supported bounds.** Test notes/searches/audio/corpus counts/corpus bytes just inside and outside limits, including UTF-8 multibyte text. Inspect messages and retained data, not only status codes.
- [ ] **B15 · P1 · Exercise a failed extraction followed by a successful same-token retry.** Existing integration tests cover this deterministically. Confirm the real interface preserves the draft and reveals exactly one saved original, then makes it searchable after recovery.
- [ ] **B16 · P1 · Validate model quality with synthetic cases.** Use the existing explicit `check:brain` only in a configured disposable test environment. Record actual results for ambiguity, negation, discussion versus expertise and relative dates; investigate mistakes instead of treating schema compliance as semantic proof.
- [ ] **B17 · P1 · Check adversarial note/query text.** Synthetic notes that contain instructions to ignore rules must remain data. Validate real source IDs/evidence and owner isolation. Keep the distinction between prompt guidance and server-enforced guarantees clear.
- [ ] **B18 · P1 · Explain result boundaries.** Selection returns at most five encounters. Decide whether a quiet “up to five” hint is useful; avoid wording that promises all matching people or verified expertise.

### B3. Recovery and pagination

Evidence: [`recent-people.ts`](../code/frontend/src/recent-people.ts#L31) preserves rows on a failed page, but the UI Retry calls `recent.refresh`, which replaces all loaded pages with the first 20. The audit reproduced 40 displayed rows becoming 20 after retry.

- [ ] **B19 · P1 · Retry the failed pagination operation.** Preserve the failed cursor/append intent so a failed Load more can resume without discarding already loaded rows. Keep first-load retry behavior intact.
- [ ] **B20 · P1 · Add a pagination-recovery regression check.** Load two pages, fail the third, retry, and assert retained rows, ordering and no duplicates. Include a row removed before retry.
- [ ] **B21 · P1 · Clarify refresh behavior after edits and tab focus.** Current refresh collapses the visible list to page one. Assess whether preserving the user's list position is necessary; make a deliberate decision rather than introducing a larger pagination redesign.
- [ ] **B22 · P1 · Check a deleted pagination anchor.** `_list` returns no rows when the cursor record disappears. Verify another-tab deletion does not make remaining older notes appear permanently exhausted; provide a safe refresh/recovery route.
- [ ] **B23 · P1 · Verify removal-retry wording and visibility.** A partial Graphing cleanup hides the original and shows Retry removal. Confirm the user can complete cleanup even after navigation/reload, or clearly record the remaining limitation and recovery procedure.
- [ ] **B24 · P1 · Review the first-load network failure state.** `useSession.load` settles with an error but the main signed-out view can still look like an ordinary sign-in prompt. Provide an understandable retry action if the app cannot determine authentication state.
- [ ] **B25 · P2 · Review voice interruption feedback.** At two minutes or an audio-size limit, capture is discarded; recorder errors share the limit callback. Consider distinguishing technical errors from limits and warning users before discarding a long recording.

## C. Authentication, reactions and access-control review

Starting point: [`Circle.ts`](../code/src/compositions/Circle.ts), [`host/http.ts`](../code/src/host/http.ts), [`inputs.ts`](../code/src/compositions/inputs.ts), reusable auth compositions, and [`authenticated-flows.test.ts`](../code/tests/compositions/authenticated-flows.test.ts). Current composition derives private ownership from `Sessioning.use`; no obvious unscoped private note/card query was found in the inspected code. This is useful evidence, not a security certification.

| Endpoint under `/api` | Authentication/ownership obligation | Main failure scenario to verify |
| --- | --- | --- |
| `/memories/remember` | Cookie session supplies owner; server supplies time | Forged owner/session/timestamp; duplicate token; saved note with failed organization |
| `/memories/list` | Owner-scoped enumeration, records and cards | Foreign cursor; expired session; deletion during formation |
| `/memories/transcribe` | Authenticate before external transcription | Anonymous/malformed/oversized audio; cancellation; no automatic note creation |
| `/memories/prepare-edit` | Owned inspection before organization and again before response | Foreign ID; disappearance/change during processing; provider failure |
| `/memories/edit` | Owned record, expected revision and submission token | Cross-user write; stale edit; retry; removal during delayed extraction |
| `/memories/forget` | Owned original erased before owned graph withdrawal | Foreign ID; duplicate calls; partial failure and retry |
| `/needs/seek` | Owner from cookie; only that owner's corpus/results | Forged corpus/IDs; failed selection; late deletion/edit; unsupported need |

- [ ] **C01 · P0 · Record a reaction-by-reaction review.** For each endpoint above, identify authentication, owner provenance, participating actions/queries, side effects before failure, and returned data. Include auth endpoints separately.
- [ ] **C02 · P0 · Verify unauthenticated and expired access.** No private notes, cards or provider calls should occur when authentication fails. Include transcription and edit preparation, not just list/search.
- [ ] **C03 · P0 · Verify two-account isolation across every private route.** Use IDs/cursors from account A while signed into B. Assert no read, edit, removal or provider-context leak; check same-name encounters remain separate.
- [ ] **C04 · P0 · Verify ownership cannot come from the request body.** Exercise forged owner, credentials, session, corpus, source and timestamp fields through the HTTP boundary. Reuse existing checks and add only meaningful coverage gaps.
- [ ] **C05 · P0 · Review query-level scoping.** Inspect each private `find`, update, replacement and delete in Remembering/Graphing/Seeking. Retain owner in the database predicate itself, including retries and erasure paths.
- [ ] **C06 · P0 · Review all auth routes.** Check Commons start/finish/choose, unknown/expired attempts, wrong state/verifier, username collision, stable Commons subject and session expiry/logout. Preserve the reused auth protocol.
- [ ] **C07 · P0 · Verify deployed cookie/origin behavior.** Inspect HttpOnly/Secure/SameSite behavior, callback cleanup, sign-out clearing, cross-origin rejection and forged body credentials. Test through the actual deployed reverse proxy.
- [ ] **C08 · P1 · Assess all 13 framework advisories.** There are 11 missing-fallback warnings and two order-sensitive former notices. Existing disappearing-record tests already check several prompt error responses and order tests exist. Map each advisory to evidence; fix only real uncovered paths or document why the behavior is total.
- [ ] **C09 · P1 · Inspect deletion and edit races.** Retain tests where source enumeration, extraction, selection or result formation overlaps deletion/editing. Check final joins hide stale/removed records even if another concept has already committed work.
- [ ] **C10 · P1 · Verify browser state clearing.** Account switch/sign-out/session expiry must clear drafts, dialogs, lists, results and microphone activity; late replies must not restore them. Existing browser tests exercise different usernames; check actual deployed account transitions too.
- [ ] **C11 · P1 · Review private data in logs and provider payloads.** Confirm credentials stay out of model input, audio is ephemeral, request/flow errors do not print notes, and new log fields remain covered by assembly redaction. State the actual external AI use in participant-facing guidance.
- [ ] **C12 · P2 · Review development-only infrastructure exposure.** Ensure test provider injection, diagnostic tooling and test fixtures are not available as public production APIs. If deployed usage needs quotas, define modest limits separately from global execution caps.

## D. Verify the deployed application end to end

These are explicit P4 completion checks. A local pass, static homepage or MongoDB ping cannot substitute for them. Use clearly labeled synthetic data in test accounts, and clean up only records created for testing.

- [ ] **D01 · P0 · Identify the deployed release.** Record the actual backend commit and deployment identifier; matching frontend filenames alone are insufficient. Check PUBLIC_ORIGIN and Commons callback match the live URL.
- [ ] **D02 · P0 · Test first and returning Commons sign-in.** Cover successful callback, cancellation/denial and readable recovery. Confirm someone other than the developer can obtain the required Commons access.
- [ ] **D03 · P0 · Test text capture through the live UI.** Save one plausible note, see it immediately, inspect organized fields and exact original, and refresh to confirm persistence.
- [ ] **D04 · P0 · Test form capture through the live UI.** Include optional contact/context/notes, non-ASCII text and a repeated person name. Verify each encounter remains independent.
- [ ] **D05 · P0 · Test real microphone capture over HTTPS.** Grant permission, record briefly, transcribe, review/correct and explicitly save. Also deny permission, cancel recording and cancel pending transcription. Check the microphone indicator stops.
- [ ] **D06 · P0 · Test positive and unsupported searches.** Find a person using a real saved activity and inspect the explanation. A genuinely unsupported need should return an empty state; a service failure must show an error instead.
- [ ] **D07 · P0 · Test edit → refreshed card → changed search behavior.** Correct the activity, verify unchanged details and first original survive, and confirm current searches use the new content rather than the old original.
- [ ] **D08 · P0 · Test Cancel and confirmed removal.** Cancel/Escape sends no deletion; explicit Remove deletes exactly the selected encounter. Refresh and search again; same-name unrelated encounters remain.
- [ ] **D09 · P0 · Test persistence across sessions/devices.** Sign out/in and open a second browser/device. Notes, edits and deletions should persist. If a controlled restart is available, repeat after restart and record the result; do not claim restart durability from a refresh alone.
- [ ] **D10 · P0 · Test live two-account isolation.** Use distinct accounts and separate browser contexts. Check lists/searches plus direct attempts to use the other's record ID through approved test tooling. Verify private fields never reach the wrong browser.
- [ ] **D11 · P0 · Exercise recoverable failures safely.** Test offline/network interruption, malformed client input and expired login. Use staging or injected failure tooling for provider/database outages; do not break the shared live service just to manufacture an error.
- [ ] **D12 · P0 · Test double-submit and delayed responses.** Check repeated Save/Remove, an interrupted save followed by retry, and a sign-out with an operation pending. Confirm sensible feedback and no duplicate/foreign data.
- [ ] **D13 · P0 · Save legible deployed evidence.** Record release/date, steps, expected/observed outcomes, pass/fail, synthetic fixture labels and limitations in a P4 verification report. Remove tokens/cookies/private data from any screenshots or request captures.
- [ ] **D14 · P1 · Check service readiness honestly.** `/health` only pings MongoDB; missing AI credentials can coexist with `ok`. Verify deployed processing/transcription configuration through actual synthetic operations, or add a non-secret readiness check if useful.
- [ ] **D15 · P1 · Verify public access to submission links.** Open deployed app, final design file and video from a clean browser context. Clearly describe any Commons prerequisite rather than leaving graders/testers to discover it late.

## E. Interaction and visual polish

Preserve the intended Urbanist/Handlee pairing, rounded controls, white contact rows, Remember/Find toggle, centered Save and hover-only artwork. The existing study and browser checks are a strong starting point. Use the [interaction](https://61040.github.io/fa26/rubrics/interaction-design/) and [visual](https://61040.github.io/fa26/rubrics/visual-design/) rubrics to assess actual tasks, hierarchy, feedback and readability.

- [ ] **E01 · P1 · Try the empty account as a new user.** The initial mode is Find and the empty state says “No saved people yet.” Verify a newcomer understands they need Remember first; add a small hint/example only if needed.
- [ ] **E02 · P1 · Explain what to write and what search can do.** A short, useful example should demonstrate work versus discussion without promising expertise, availability or automatic rediscovery.
- [ ] **E03 · P1 · Review all asynchronous states together.** Opening, loading, organizing, preparing edit, recording, transcribing, finding, saving changes, removing and signing out must all settle with an understandable next step.
- [ ] **E04 · P1 · Review error messages by recovery action.** Check invalid input, saved-but-unorganized, conflict, disappeared record, corpus limit, network error and partial removal. A generic “try again” is insufficient when the user must reopen or shorten saved data.
- [ ] **E05 · P1 · Test mixed, realistic data density.** Include long names, missing names, multiple facts, Unicode, URLs/phone/email, long original notes and 20+ encounters. Assess scanning and evidence readability, not just overflow assertions.
- [ ] **E06 · P1 · Review original/current wording after edits.** Personal notes intentionally displays the first original. Make that clear enough that users do not mistake old wording for current searchable information.
- [ ] **E07 · P1 · Review duplicate-name clarity.** Encounters stay separate by design; see whether brief context/date makes two identical names understandable without introducing identity merging.
- [ ] **E08 · P1 · Walk the entire app with keyboard only.** Include sign-in/callback username choice, modes, disclosures, form fields, dialogs, cancel/escape, retry and Load more. Check focus after errors and after the triggering row disappears.
- [ ] **E09 · P1 · Check screen-reader announcements.** Verify accessible names, headings, pressed states, progress, results count and alerts in an actual assistive-technology pass if available. Status attributes alone do not prove understandable announcements.
- [ ] **E10 · P1 · Inspect actual zoom and small-screen layouts.** Existing tests use CSS zoom and widths 320/390/640/1280. Add a manual browser zoom/mobile pass for dialogs, scrolling, touch controls, sign-in and long content.
- [ ] **E11 · P1 · Inspect rendered contrast and focus.** Existing solid-color ratios are useful but exclude transparency, disabled opacity, gradients and decorative overlaps. Check real surfaces and control boundaries before making accessibility claims.
- [ ] **E12 · P1 · Verify reduced motion and touch behavior.** Decorative hover artwork should respect reduced-motion settings and leave every task usable on devices without hover.
- [ ] **E13 · P1 · Test one additional browser/device if available.** Prioritize Safari/mobile for real voice/media-type support and dialog behavior, since automated runs use Chrome. Record actual coverage and unsupported cases.
- [ ] **E14 · P2 · Assess contact convenience.** If rendering email/phone/URL as links would help the main journey, use safe protocol handling and clear labels; plain text is acceptable for P4 if usable.

## F. Current specifications, generated contracts and modularity

- [ ] **F01 · P0 · Compare the six current concepts with implementation.** Review Remembering, Seeking, Graphing, Registering, Sessioning and CommonsFederating, using `code/design/` as the current source rather than historical P1 concepts.
- [ ] **F02 · P0 · Explain Graphing's actual role.** It currently stores source-local cards and recall selections, rather than implementing the broader initial relationship graph. Keep purpose/principle/state/actions accurate.
- [ ] **F03 · P0 · Preserve boundaries while fixing issues.** Concepts must not call peers or query peer collections; auth and cross-concept sequencing belong in compositions. Keep provider transport as injected infrastructure.
- [ ] **F04 · P0 · Update affected refusal and partial-failure branches.** After a fix, document what may already be persisted and what retry does, including save/edit organization failure and two-stage deletion.
- [ ] **F05 · P0 · Regenerate after authored changes.** Use `bun run --cwd code generate`; inspect readback/wire diffs, then run artifact and type checks. Never hand-edit generated files.
- [ ] **F06 · P1 · Review form semantics in the design record.** Explain current content versus first original, user-entered fields versus model interpretation, unknown names, relative-date anchoring and source-local evidence.
- [ ] **F07 · P1 · Review cache claims.** Same prompt/model/corpus may reuse a stored selection; new notes, edits and versions change the relevant cache. Do not promise deterministic live model interpretation or exactly-once cross-concept execution.
- [ ] **F08 · P2 · Consider only targeted readability cleanup.** Some core concept methods and browser tests compress many operations onto single lines; improve the specific code being changed if it helps review. Avoid a broad rewrite before submission.

## G. Tests and a credible P4 verification report

The [testing rubric](https://61040.github.io/fa26/rubrics/testing-validating/) rewards meaningful behavioral checks and honest integration evidence. Existing coverage is substantive: ownership, prompt transport, malformed output, relative dates, revision/retry semantics, erasure, cache versions, ordering, persistence, dialogs and stale browser replies. Extend gaps rather than replacing or duplicating the suite.

- [ ] **G01 · P0 · Obtain a fresh full backend pass with MongoDB available.** Diagnose real failures separately from service/setup failures. Record command, runtime, commit, timestamp, totals and exit status.
- [ ] **G02 · P0 · Run the final checks, test suite and build after fixes.** Cover the actual final source state, not an earlier successful snapshot. Preserve test-only database cleanup and avoid external provider calls in normal tests.
- [ ] **G03 · P0 · Run Chrome checks against the production build.** Use the existing `CIRCLE_BROWSER_PREVIEW=1` mode after building. Keep API-mocked evidence labeled correctly.
- [ ] **G04 · P0 · Repair the missing verification document.** Create `design-docs/verification.md` with authentic historical/current distinctions, or replace all four references with a real new report. Do not invent the contents of the missing report.
- [ ] **G05 · P0 · Save P4 output separately.** Add concise P4 logs/report rather than overwriting P3 evidence. Keep injected failure logs identified and strip secrets/private data.
- [ ] **G06 · P1 · Add regression tests for B01 and B19.** These are the two directly reproduced defects. Add further tests only for meaningful decisions/fixes, such as unnamed editing or deadline behavior.
- [ ] **G07 · P1 · Preserve deterministic provider versus quality distinctions.** Fake HTTP/authored JSON tests verify transport/validation; live synthetic checks assess model behavior; real microphone tests assess hardware integration.
- [ ] **G08 · P1 · Summarize advisories and build warnings.** Link the retained diagnostics and explain evidence for accepting or correcting them. Passing exit status does not mean no warnings exist.
- [ ] **G09 · P1 · Perform a fresh-clone setup check.** Use a clean copy and the README exactly. Verify locked installs, environment setup, MongoDB, Chrome, build, start, dev proxy and tests; record any missing prerequisite.
- [ ] **G10 · P1 · Check submission links systematically.** Validate repository-relative files, image paths, Markdown anchors, final commit links and externally accessible URLs. The old link-audit log does not supersede today's four missing references.

## H. Write the required one-to-two-page design summary

This is a separate deliverable from the comprehensive audit. Suggested final path: `design-docs/p4-design-summary.md`. The [technical writing rubric](https://61040.github.io/fa26/rubrics/technical-writing/) calls for precise, coherent, concise explanations. Use bullets/subheadings; explain decisions and tradeoffs rather than listing files.

- [ ] **H01 · P0 · Recover the actual design rationale.** Consult the private notebook and relevant dated design/work records that you can access. Do not invent intentions or retrofit an agent-generated story as a historical fact. The private notebook was not inspected in this audit.
- [ ] **H02 · P0 · Describe the final problem and supported scope.** Use one short opening paragraph about recalling people when needs emerge, followed by the actual final journey.
- [ ] **H03 · P0 · Compare final concept design with P1.** Explain the move to source-local cards, current use of Seeking, added reusable account concepts, and deferral of Connecting/rediscovery/merging. State why those choices fit the final scope.
- [ ] **H04 · P0 · Explain significant behavioral decisions.** Choose a few consequential examples: exact original versus current note, evidence-linked retrieval, uncertainty, ownership, retry/revision rules, and ordered erasure with partial-failure recovery.
- [ ] **H05 · P0 · Compare final visuals with the P3 visual study.** Explain what stayed, what changed and why. If little changed, say so; do not fabricate a redesign. Discuss hierarchy, typography, white rows, visible input choices and feedback where relevant.
- [ ] **H06 · P0 · Explain one difficult refinement concretely.** For example, preventing stale extraction after an edit/removal, or fixing summary-driven edit data loss. Give trigger → decision → observed result → tradeoff, using verified evidence.
- [ ] **H07 · P0 · Link particular commits for specifications and prompts.** Use immutable commit URLs for initial and final relevant files, including `brain-provider.ts` prompt instructions. Avoid relying only on mutable branch URLs.
- [ ] **H08 · P0 · Include validation and honest limitations.** Briefly state deployed checks, current inference limits, search bounds and deferred functionality. Link to the detailed report rather than reproducing logs.
- [ ] **H09 · P0 · Edit to one or two pages.** Keep only significant decisions; verify length in a readable rendered form. A short diagram or annotated screenshot is optional and must earn its space.
- [ ] **H10 · P0 · Place it in the project repository and link it prominently.** A private-notebook link or this audit alone does not satisfy the required public project design document.

## I. Produce the final narrated demo, at most three minutes

P4's limit is three minutes, which supersedes the current README's P3 two-minute label. Use the actual final deployed app and synthetic data. Suggested link wrapper: `design-docs/p4-demo.md`.

- [ ] **I01 · P0 · Choose one intelligible journey.** A student remembers someone who builds solar panels, later needs that skill, finds the saved encounter, checks evidence and corrects/removes it. Keep it grounded in the supported product.
- [ ] **I02 · P0 · Prepare authentic demo data.** Add it through the actual app; do not erase existing notes or manually manufacture database results. Ensure unrelated account data is out of frame.
- [ ] **I03 · P0 · Prepare a compact narration.** Suggested timing: 0:00–0:20 purpose/sign-in context; 0:20–1:00 Remember; 1:00–1:40 Find/evidence; 1:40–2:20 edit; 2:20–2:45 confirmation/removal and outcome. Adjust to actual network latency and finish before 3:00.
- [ ] **I04 · P0 · Narrate throughout.** Explain the user's intention and visible consequences. Speak during waits; make text legible and audio clear. Do not spend the recording reading architecture or source code.
- [ ] **I05 · P0 · Highlight other key inputs without overloading the journey.** Show Text/Voice/Form choices; if demonstrating voice, use an actual recording and explicit review/save. It is acceptable to point to secondary features without fully exercising them.
- [ ] **I06 · P0 · Check final behavior before recording.** In particular, verify the edit defect is resolved, examples match live interpretation, unsupported searches behave honestly and removed data does not reappear.
- [ ] **I07 · P0 · Upload and verify access.** Check duration, narration and playback from a clean browser context. Use a viewing permission appropriate for graders; no accidental private-only link.
- [ ] **I08 · P0 · Put the URL in a repository Markdown file and README.** Identify the demonstrated release, date and journey. Replace the P3 pending placeholder and preserve older demo links as historical material.

## J. README, repository organization and reproducibility

Use the [professionalism rubric](https://61040.github.io/fa26/rubrics/professionalism/) to check whether a fresh reader can find the work and run it without the author's machine.

- [ ] **J01 · P0 · Lead with the final P4 state.** Keep the overview to one or two sentences and provide obvious links to app, design summary, demo, current specs, tests and verification. Move detailed milestone history below current essentials.
- [ ] **J02 · P0 · Repair the four missing report links.** Sources: README line 16, visual study line 49, P3 journey line 21 and test-output README line 3. Confirm the replacement paths resolve from each document.
- [ ] **J03 · P0 · Document all local prerequisites.** State a tested Bun version, MongoDB availability/auth setup, Chrome for browser tests, required server environment variables and the Commons account requirement. Do not assume an already-running database.
- [ ] **J04 · P1 · Resolve runtime-version ambiguity deliberately.** Root says Bun 1.4.2; backend/frontend manifests say 1.3.4. Establish a tested supported version and document or align those declarations without upgrading engine packages or rewriting lockfiles unnecessarily.
- [ ] **J05 · P0 · Verify environment instructions match code.** Distinguish app/test database URLs, PUBLIC_ORIGIN, COMMONS_ORIGIN and server-only provider keys. Explain development port 5173 versus built app port 3000 and normal callback behavior.
- [ ] **J06 · P1 · Explain missing-provider behavior.** The server starts and `/health` can pass without an API key, while organization/voice fail. Help a new developer recognize this state and configure the service.
- [ ] **J07 · P1 · Use reproducible dependency installs.** Confirm both existing Bun lockfiles install cleanly with the tested runtime; document frozen installs where appropriate. Preserve the BSON override, engine 1.1.0 pins and third-party licenses.
- [ ] **J08 · P1 · Explain test modes and their dependencies.** Root test includes Bun and Chrome; MongoDB is needed for database tests, while normal providers are fake. Label live synthetic evaluation as a separate explicit external call.
- [ ] **J09 · P1 · Review tracked work artifacts.** Of 472 tracked files, 327 were under `code/.sync-engine/work/`; that directory occupied about 22 MB locally. Decide what evidence must remain and index it clearly. Archive/remove only reviewed redundant material, retaining useful intentional-development history.
- [ ] **J10 · P1 · Review tracked files for accidental content.** `.env` is ignored and was not tracked. Check newly added logs/screenshots/work records for credentials, private notes, machine-specific dependencies and unnecessary generated clutter before committing.
- [ ] **J11 · P1 · Use meaningful incremental commits from here.** Recent commit titles include “p3 clean2” and “p3 cleanup 1.” Make P4 commits identify the behavior/documentation changed and validation performed. Do not rewrite submitted history merely for appearance.
- [ ] **J12 · P1 · Add a concise validation entry point.** A lightweight documented checklist or CI job is useful if it reliably supplies dependencies; CI is optional, not an assignment requirement. Do not introduce a fragile deployment pipeline to satisfy this item.

## K. Prepare for P5 user testing

P4 asks for readiness; it does not require pretending that P5 testing has already happened.

- [ ] **K01 · P0 · Verify participant access.** Determine whether intended testers can sign into Commons and reach Circle independently. Resolve access prerequisites before scheduling sessions.
- [ ] **K02 · P1 · Write three neutral task prompts.** Example tasks: save someone you met; find a useful person for a new need; correct an encounter and remove a mistaken one. Avoid naming the exact controls to click.
- [ ] **K03 · P1 · Prepare a short synthetic-data exercise.** Give testers enough people/details to make retrieval meaningful without asking them to disclose real contact information.
- [ ] **K04 · P1 · Identify observations to record.** Track completion, hesitation, wrong turns, misunderstood fields, confidence in results, evidence/original use and recovery from mistakes. Separate observed behavior from interpretation.
- [ ] **K05 · P1 · State data/AI handling plainly.** Explain that saved notes are account-specific and that organization/search/transcription use an external AI service. Describe implemented removal accurately without claiming immediate deletion from all external systems.
- [ ] **K06 · P1 · Rehearse with an unfamiliar person if available.** Watch whether they understand Remember versus Find and the effect of editing/removing. Fix high-impact confusion; do not label a casual rehearsal as completed P5 research.
- [ ] **K07 · P1 · Prepare a session checklist and notes sheet.** Include device/browser, account access, task prompts, observations, issues, severity and follow-up. Keep participant identity/consent details out of public repository artifacts.

## Suggested execution order through October 26

| When | Focus | Exit condition |
| --- | --- | --- |
| Oct 22 | Confirm scope, restore test MongoDB, fix edit data loss, start design-summary outline | Core edit fidelity restored and tested; full suite can run; deliverable owners/paths clear |
| Oct 23 | Access-control review, search/recovery risks, contracts and targeted regressions | Consequential behavior findings resolved or justified; current artifacts/checks consistent |
| Oct 24 | Validate deployed release, mixed-data polish and participant access | Live persistence/isolation/error evidence recorded; app understandable to a new user |
| Oct 25 | Finish one-to-two-page summary, record/upload final narrated demo, simplify README | All required submission artifacts exist and can be opened independently |
| Oct 26 | Final source/deployment checks, fresh-clone instructions and link audit; retain time before 11:59 PM Eastern | Final checklist below fully satisfied; no unsupported claims or placeholders |

If time is tight, complete the P0 items first. Defer convenience work and broad refactoring. Do not sacrifice deployed validation, the final design document or the narrated video to add features outside the supported journey.

## Final submission gate

- [ ] The final supported journey works on the deployed app, with persistence, access-control and error evidence for the same release.
- [ ] Silent edit detail loss is fixed; other consequential findings have a checked outcome and rationale.
- [ ] Final frontend/backend, current specifications/reactions and meaningful tests are committed; generated artifacts agree.
- [ ] A fresh full database-backed suite and production frontend checks have recorded outcomes, including any genuine limitations.
- [ ] A coherent one-to-two-page design summary compares the final design with P1 and P3 and uses relevant immutable commit links.
- [ ] A final video is at most three minutes, narrated throughout, useful, legible and accessible.
- [ ] Design summary and video link live in repository Markdown and are prominently linked from the concise README.
- [ ] Local build/run/test instructions work in a clean environment with explicit prerequisites.
- [ ] Broken verification links and pending final-deliverable placeholders are resolved.
- [ ] Testers can access and understand the app; no personal data or secrets are exposed in submission materials.

## Sources and audit boundaries

Assignment: [P4: Code complete](https://61040.github.io/fa26/assignments/p4/). Rubrics reviewed: [concept implementation](https://61040.github.io/fa26/rubrics/implementing-concepts/), [testing](https://61040.github.io/fa26/rubrics/testing-validating/), [interaction](https://61040.github.io/fa26/rubrics/interaction-design/), [visual design](https://61040.github.io/fa26/rubrics/visual-design/), [technical writing](https://61040.github.io/fa26/rubrics/technical-writing/), [professionalism](https://61040.github.io/fa26/rubrics/professionalism/).

Repository evidence: README, root/repository instructions, current `code/design/` specifications, generated configuration/artifacts, concept implementations, compositions, HTTP host/validators, provider adapter, frontend state/components/styles, tests and saved output, P1 framing/design, P3 journey and visual study. Course pages and historical/reference documents were treated as requirements/evidence for this audit, not authorization to implement changes or perform unrelated actions. The user's requested output was the audit and comprehensive to-do list.

Suggested file paths in unchecked tasks are proposed deliverables, not claims that those files already exist. Findings distinguish direct reproduction, static risk and unverified live behavior. Private notebook content, authenticated production behavior, provider quality, actual microphone hardware and database-restart durability remain outside this audit's completed verification.
