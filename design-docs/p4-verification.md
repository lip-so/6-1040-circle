# P4 verification

## Release and scope

Verified October 26, 2026, **15:30–15:31 EDT / 19:30–19:31 UTC**. Git base: `ad4d2412b1c1a43ea813526abafb8244352eb2e8`, with uncommitted A1–A7 refinements. [Source fingerprints](../code/tests/p4-output/source-hashes.json) identify 97 source/configuration files; application/design/generated/test/script trees matched the actual repository byte-for-byte. Checks ran in an isolated candidate to preserve existing local/P3 output. Two review-only development dependencies exist only there; application dependencies/lockfiles remain unchanged. A11 will verify a clean installation from the actual manifests.

This is local candidate evidence. **Final deployed frontend/backend identity, deployment ID and authenticated live validation are pending A9/B2.** No restart durability or successful deployment is inferred from `/health`, build assets or the results below.

## Fresh final local checks

Bun **1.4.2**, Playwright **1.64.1**, Google Chrome **153.0.8010.48**, Vite **8.3.4**; sync-engine and HTTP packages **1.1.0**. Requirements: existing lockfiles/dependencies, authenticated local MongoDB via ignored `TEST_MONGODB_URL`, Chrome and local preview port 4173. Tests create uniquely named disposable databases, drain work, then drop only those databases. No app database, real notes, Commons account or external AI is used by the ordinary suite. All commands below exited **0**; each linked capture retains exact directory, argv and UTC start/end.

| Command (from repository root unless noted) | Outcome and evidence |
| --- | --- |
| `bun run --cwd code generate` | Artifacts generated; caller wire unchanged from A6. [Log](../code/tests/p4-output/generation.txt). |
| `bun run check` | Six concept source checks, artifact checks, TypeScript and Vue types pass. Thirteen retained advisories. [Log](../code/tests/p4-output/checks.txt). |
| `bun test` from `code/` | **231 pass, 0 fail; 1,245 assertions, 19 files.** [Log](../code/tests/p4-output/backend.txt). |
| `bun run build` | Production build passes, with three existing externalization notices. [Log](../code/tests/p4-output/build.txt). |
| `CIRCLE_BROWSER_PREVIEW=1 bun run test:browser` from `code/frontend/` | **69 pass**, one worker, 31.9 seconds, final built assets served through Vite preview. API and microphone transport are mocked; actual components/events/layout run in Chrome. [Log](../code/tests/p4-output/production-browser.txt). |

Generation and checks completed against the same unchanged artifacts; the generated wire remained byte-identical. The source manifest separates source equality from candidate-only review tools. Commit hashes after documentation/package metadata work must be reconciled without relabeling these timestamps.

## What the tests establish

| Surface / reaction | Evidence and practical limit |
| --- | --- |
| Remember → owned original → organization | Authenticated HTTP and concept tests cover owner injection, exact source persistence, same-token retry, processing failure retaining the original, disappearance and bounds. Fake provider outputs are explicit. |
| Prepare/edit → current source → ingest | Contact-only editing retains all six authored fields, raw details/reminders and complete multiline values; intentional clears and replacement do not resurrect first-original content. Unnamed/long drafts, exact 20,000 limit, immutable source day, date/name handling, stale revisions, duplicate tokens and delayed ingestion are covered. |
| Seek → need → owned corpus → joined evidence | Unsupported/empty differs from faults. Tests cover per-owner provider inputs, malformed evidence/IDs, discussion/negation, corpus/cache/provider-version changes, count/UTF-8 limits and late partial overflow. Model semantic correctness is not proven. |
| List → ordered rows and retry | Two-page failure retries the actual cursor and preserves forty visible rows; deduplicates IDs while equal names remain separate. Deleted-anchor empty response has explicit Reload from start recovery. Account changes invalidate late replies. |
| Forget → text erasure → card/cache withdrawal | Cancel/Escape send no request; explicit action runs once. Partial cleanup is retryable; joins hide removed sources, tombstones block resurrection and other same-name encounters remain. No whole-route rollback guarantee. |
| Transcribe → draft | Validation, cancellation, mode/account changes, late replies, explicit save and denial/retry UI are tested with injected audio transport. **Physical microphone/OS permissions: NOT RUN.** |
| Commons / accounts | Local mocked provider and cookie/HTTP tests cover PKCE, state/expiry, stable subject, collisions, session cutoffs, unauthorized routes and body-forged credentials. **Real HTTPS Commons and two-account integration: PENDING.** |

The [access review](p4-access-review.md#protected-route-matrix) provides the seven-route owner predicate/effect/refusal matrix and auth/adversarial analysis. Its [thirteen individual advisory dispositions](p4-access-review.md#disposition-of-all-13-advisories) cover eleven fallback warnings and two intentionally ordered formers. They remain visible, not suppressed. Fallback tests exercise disappearance/partial-failure paths; analysis does not prove every request finishes before a deadline.

Expected error output includes injected ingest/recall/withdraw faults, deliberately invalid model output, the vanished-need FormerFault, and local Commons refusal/malformed/timeout/unreachable-provider cases. These are asserted error paths; the enclosing suites pass. The three build notices externalize `node:util` once and `node:crypto` twice in existing framework browser imports. Current production-browser execution passes; this is bounded evidence, not a guarantee for unused runtime paths. No framework internals were inspected or patched.

## Separate evidence modes

- **Deterministic database/providers:** fresh A8 full suite above.
- **Rendered mocked API:** fresh A8 69 scenarios, including narrow 320/390 layouts, keyboard dialogs/focus, loading/empty/error, draft retention, dense data, uncertainty, original/current meaning, touch and reduced-motion emulation. [Selected screenshots](../code/tests/p4-output/screenshots/). CSS-enlarged content is not native browser zoom.
- **Manual internal browser:** October 26 A6/A7 isolated in-memory preview: explicit save, Form draft/focus retention, invalid date recovery, preserved first original and named removal/Escape/focus. No MongoDB, Commons or AI. [Notes](../code/tests/p4-output/internal-browser-notes.md). Localized rendered guidance contrast was 5.54:1/6.20:1 and focus 7.56:1; no full accessibility certification.
- **Real external AI:** A5 on October 26, **14:01:27–14:01:48 UTC**: five hand-authored synthetic ambiguity/negation/date/discussion/instruction cases passed interpretation, cached repeat, isolation and withdrawal. [Original log](../code/tests/p4-output/live-brain-a5.txt). Not rerun in A8; provider prompt/runtime source is unchanged. Default text model `gpt-5.4-2026-03-05`, prompt/cache version `contact-v4:gpt-5.4-2026-03-05`; no secret values published. This small sample does not establish general model quality.
- **Cold work / capacity:** [A5 injected probe](../code/tests/p4-output/search-probe-a5.txt), [analysis](p4-search-recovery.md): 257 entries and UTF-8 overflow refuse before extraction; late structured overflow can preserve organization. Three 41-second extracts plus selection exceeded the actual 120-second caller deadline; accepted work finished around 164 seconds, warm manual retry around 30 ms. **Timeout does not cancel accepted work.**
- **Deployed integration, actual browser zoom, physical devices/microphone, assistive technology, unfamiliar participants:** **NOT RUN/PENDING**. Native Chrome UI control was unavailable; internal browser checks do not substitute for these.

## Release validation — A9 / B2

| Required observation | Status |
| --- | --- |
| Exact deployed source revision and frontend/backend deployment identifiers | PENDING |
| HTTPS Commons sign-in, returning session and secure cookie behavior | PENDING |
| Synthetic text/form save → visible row → refresh / another session | PENDING |
| Positive/unsupported recall; edit changes current search, original retained | PENDING |
| Cancel and confirmed removal; other same-name note remains | PENDING |
| Sign-out/in persistence; two-account foreign-ID attempts/provider isolation | PENDING |
| Recoverable offline/expired-session handling on live release | PENDING |
| HTTPS microphone grant/denial/cancellation and hardware stop | PENDING — Sofia/device required |
| Controlled restart durability | NOT RUN |

The final design summary, authentic rationale, narrated video, participant access and course submission are separate deliverables. This report does not mark the older 127-item audit complete. Historical P3 execution remains in [its original evidence directory](../code/tests/output/); no absent historical report was fabricated.

## A9 live inspection and ownership

October 26, 19:36 UTC / 15:36 EDT: the internal browser’s existing signed-in session reached the live app and its Form still showed the older **When / where** field. Public homepage returned 200, `/health` returned `ok`, and no-referrer/no-store headers were observed. [Public fingerprints](../code/tests/p4-output/live-public-a9.json) identify old frontend assets only; backend/model/prompt/release identity remains unknown. No saved notes were changed, no fresh Commons login was attempted, and no persistence/isolation/hardware result is inferred. Sofia explicitly retained deployment herself. The agent leaves [concrete release and validation steps](p4-release-handoff.md); the table above stays pending until the final release is actually tested.

## A11 clean-install confirmation

October 26, 19:40–19:44 UTC: fresh project installs from both existing lockfiles passed without the review-only development tools. Root source/artifact/types/build checks and the actual combined test command passed again (231 tests/1,245 assertions; 69 production-preview Chrome scenarios). Locks and runtime source are unchanged; only backend packageManager metadata is aligned to the already-tested Bun 1.4.2. Built 3000 and development localhost:5173 startup/proxy checks passed with a fresh index-only disposable database and no AI key. The first probe’s wrong-host timeout and the successful corrected probe are both retained. [Reproduction details](p4-reproducibility.md), [final source/config fingerprints](../code/tests/p4-output/release-source-hashes.json). Final deployment and human checks remain pending.
