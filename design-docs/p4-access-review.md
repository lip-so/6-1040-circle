# P4 access-control and reaction review

Reviewed October 26, 2026. Local source after A1–A3, based on Git HEAD `ad4d2412b1c1a43ea813526abafb8244352eb2e8` plus uncommitted P4 changes. Independent reviewer: `/root/a4_access`. Diagnostic command: `bun x --no-install sync-engine check --show-advisories` (exit 0). No source changes or new execution claims from this review.

## Verdict

Approve

## Assessments

The current source enforces session-derived ownership before private reads, writes or provider work. No bypassable authorization or unresolved response-path defect was found. This is a source and existing-test review; it does not establish deployed security.

Evidence supplied by the coordinator reports 227 passing tests, 1,215 assertions and 52 production-preview Chrome scenarios. This role inspected the implementation and corresponding tests without changing source or rerunning database/provider checks.

### Protected-route matrix

All paths below have the `/api` prefix. The HTTP policy binds `session` to its cookie; each private reaction calls `Sessioning.use` before proceeding. The resulting subject supplies `owner`. Successful authentication updates session `lastUsed`, including when a later application step refuses.

| Route | Authorized actions and reads | Effects, acknowledgement and recovery | Evidence |
|---|---|---|---|
| `/memories/remember` | `Sessioning.use` → `Remembering.remember(owner,…)` → owned `inspect` → `Graphing.ingest` | Exact original may persist before organization fails. Success waits for ingestion. Same owner/submission/content retries reuse the memory; changed or removed-token retries conflict. Disappearance after save returns NOT_FOUND promptly. | `code/src/compositions/Circle.ts:46`; `code/src/concepts/Remembering.ts:29`; `code/tests/compositions/authenticated-flows.test.ts:151,165,178,266,516` |
| `/memories/list` | `Sessioning.use` → `SavedMemories`; `_list`, `_record` and `_card` all receive owner | No private-content mutation or provider call. Foreign, missing or deleted cursor returns an empty page. Missing rows during formation are omitted. Retry retains its failed operation; explicit reload intentionally restarts position. | `Circle.ts:9,18`; `Remembering.ts:78,86`; authenticated-flow tests `:247`; `code/tests/compositions/Circle.test.ts:85,107`; pagination UI tests |
| `/memories/transcribe` | `Sessioning.use` → `Remembering.transcribe` | Authentication precedes external transcription. Audio/result are ephemeral; no memory or graph record is saved. Invalid audio refuses; provider faults remain opaque. The user must explicitly save returned editable text. | `Circle.ts:80`; `Remembering.ts:21`; authenticated-flow tests `:381` |
| `/memories/prepare-edit` | `Sessioning.use` → owned `inspect` → ingest → fresh owned `inspect` → matching `_card` | Foreign/missing memory returns NOT_FOUND before provider work. Preparation may update organization but never authored content. A concurrent correction can yield fresh content with a null card; disappearance returns NOT_FOUND. Cancel makes no edit. | `Circle.ts:89`; authenticated-flow tests `:410,516`; browser edit/cancel scenario |
| `/memories/edit` | `Sessioning.use` → owner/revision-checked `edit` → owned `inspect` → ingest | Current text may persist before organization fails; first original and initial capture time survive. Success waits for ingestion. Same-token/content retries acknowledge the applied edit without incrementing twice; stale revision or changed token reuse conflicts. Missing/foreign memory is NOT_FOUND. | `Circle.ts:100`; `Remembering.ts:47`; authenticated-flow tests `:410,434,442,516` |
| `/memories/forget` | `Sessioning.use` → owned `Remembering.forget` → `Graphing.withdraw` | Original/current text is erased first; graph JSON and owner selection caches follow. Success acknowledges both. During failed cleanup, final owned joins hide the removed source. Repeating the same owned identity finishes cleanup; foreign/missing identity remains NOT_FOUND. Tombstones prevent resurrection. | `Circle.ts:70`; `Remembering.ts:69`; `Graphing.ts:86`; authenticated-flow tests `:285,312,328`; delayed-work tests in Graphing |
| `/needs/seek` | `Sessioning.use` → `Seeking.seek` → owner-only `_corpus` → `Graphing.recall` → owned need/matches/current-original joins | Submitted need persists before search faults. Cold search can organize sources before a later error; no rollback is promised. Success waits for selection and result formation. Retry creates another need identity, while equivalent validated graph selection can be reused. Missing/stale/withdrawn sources are omitted; disappearing required need faults promptly. | `Circle.ts:33,58`; `code/src/concepts/Seeking.ts:18,27`; `Graphing.ts:50,101`; authenticated-flow tests `:137,186,194,516`; composition tests `:61,66,74` |

Private query predicates enforce ownership at the database operation, rather than relying on a later display filter:

- Remembering reads/edits/removal use owner with memory identity; corpus/list enumeration uses owner.
- Seeking `_get` uses owner with need identity.
- Graphing source/card/recall reads and writes use owner. A competing source identity belonging to another owner causes the unique-identity conflict before extraction.
- Final result joins check the current owned original and matching content/reference date/revision, preventing stale organization from restoring corrected or removed information.

### Commons and account routes

| Route | Authority and closing action | Partial effects, repetition and recovery | Evidence |
|---|---|---|---|
| `/auth/commons/start` | No existing account required. `Federating.start` creates fresh attempt/nonce/verifier and returns the provider address. | Attempt is stored before acknowledgement; a lost response can leave an expiring attempt. Starting again creates a fresh attempt and browser cookie. No private memory is read. | `code/src/compositions/reusable/commons.ts:10`; `code/src/concepts/Federating/Federating.ts:62`; Federating tests `:77`; CommonsProvider tests `:32` |
| `/auth/commons/finish` | Cookie attempt plus returned state/code → `finish` → one `resolve` snapshot → exactly one returning/new branch | Returning branch starts a session for the linked stable subject. New branch registers, links, then starts a session. These are separate owners: registration/link may survive a later fault. Restarting sign-in recovers a completed link. Confirmed/expired attempts cannot be replayed through `finish`. Username conflict preserves the attempt for Choose. | reusable `commons.ts:19`; `Federating.ts:72,103`; authenticated-flow tests `:203,214,231`; Federating tests `:92,112,122,173` |
| `/auth/commons/choose` | Cookie attempt → `requireLinkable` before registration → link → session start | Missing/unconfirmed/expired/already-linked attempts refuse before registration. Concurrent registrations for one external subject can leave an unlinked local username after link conflict; this documented limitation does not link the wrong account. No cross-concept rollback is claimed. | reusable `commons.ts:40`; `Federating.ts:89,110`; authenticated-flow tests `:231`; Federating tests `:136,154,173` |
| `/auth/me` | Cookie session → `Sessioning.use` → `Registering.identify` | Unknown/expired session and a disappeared account return UNAUTHORIZED. No private memory is returned. Account disappearance does not silently drop the response. | `code/src/compositions/reusable/accounts.ts:9`; `code/src/concepts/Registering/Registering.ts:52`; authenticated-flow tests `:107,533` |
| `/auth/logout` | Cookie session → atomic `Sessioning.end` → answer/cookie clearing | Ends this session only. Repeating an ended/expired session returns UNAUTHORIZED. Work authorized before sign-out may already be running; logout is not a promise to cancel backend effects. Frontend scopes discard late private replies. | reusable `accounts.ts:19`; `Sessioning.ts:59`; authenticated-flow tests `:107`; Sessioning tests `:90,101`; frontend scope checks |

The inspected boundary retains PKCE S256, server-held verifiers, fresh 32-byte attempt/nonce/session identities, ten-minute sign-in attempts and stable external-subject linking. Session use enforces both seven-day inactivity and 90-day absolute expiry directly; asynchronous database TTL cleanup is not the authorization check.

Existing HTTP tests verify HttpOnly/Secure cookie output, `__Host-` credential cookies, credential removal from JSON, cookie authority over forged body credentials and cross-origin refusal. `main.ts:25,40` supplies `Referrer-Policy: no-referrer`; `CommonsCallback.vue:17` removes callback parameters before posting them. No localStorage credential mechanism was found in the inspected frontend. SameSite behavior and actual production cookie attributes were not independently exercised by this role.

### Adversarial cases and provider boundary

| Case | Assessment and coverage |
|---|---|
| Anonymous/expired request | Every protected source reaction has the mandatory initial `Sessioning.use` gate. HTTP tests exercise anonymous save/list/prepare/forget/transcribe and expired search; Sessioning tests exercise expiry/refused-use invariants. The supplied suite is not an exhaustive expired-session case for every endpoint. |
| Account B supplies A’s memory/cursor | Foreign prepare/edit/forget return the same NOT_FOUND category as missing identities; foreign cursor returns empty. Tests explicitly cover these routes and owner-scoped result formation. |
| Forged owner/session/source/corpus/time | Private validators require exact allowed fields. Owner/source/extra time fields are rejected; session comes from the cookie. Seek admits description only, so a body corpus cannot replace `_corpus`. Remember/edit admit validated timezone with the documented omission default, never caller timestamps/reference dates. See `code/src/compositions/inputs.ts:5–53` and authenticated-flow tests `:151,247,299,410,434`. |
| Equal names | Identity keys remain separate; no name-based ownership or merging. Tests cover same names across accounts, multiple same-name encounters and independent removal. |
| Sign-out/account change with pending work | `App.vue` synchronously invalidates scopes, clears private drafts/results/editor state and cancels voice when account/sign-out state changes. Browser tests deliver late save/edit/search/transcription replies after account change and verify they do not repopulate the UI. This establishes client isolation, not cancellation of already-authorized server work. |
| Unauthorized provider context | Composition obtains corpus only from the authenticated owner. Foreign source reservation refuses before extraction. Provider transport accepts note/reference day or owned cards/query, not session/account credentials. Tests inspect stateless strict-schema payloads and server-only Authorization headers. See Graphing tests `:32,54,67`; `code/tests/providers/BrainProvider.test.ts:5`. |
| Removal/delayed work | Withdrawal and source-revision comparisons defeat delayed extraction/selection; final owned joins hide erased originals during cleanup failure. Existing Graphing race tests cover both delayed extraction and selection. External requests already sent before deletion are not retractable by these mechanisms. |

### Disposition of all 13 advisories

The diagnostic command passed while retaining these advisories. Retention is justified by the following concrete paths; it is not a claim that the analyzer proves totality.

| # | Diagnostic target | Disposition |
|---|---|---|
| 1 | MISSING_ENDPOINT_FALLBACK — `Circle.Edit` | Sequential mandatory actions return success or faults/refusals; owned `inspect` explicitly refuses disappearance. No optional answer guard remains. Disappear-edit and partial-organization/retry tests support termination. |
| 2 | MISSING_ENDPOINT_FALLBACK — `Circle.Forget` | Ordered forget/withdraw actions answer only after both succeed; either action faults/refuses instead of silently eliminating the response. Partial withdrawal/manual retry is tested. |
| 3 | MISSING_ENDPOINT_FALLBACK — `Circle.ListMemories` | `_list` returns many, including empty; the former returns an array. Missing individual owned rows are omitted while the endpoint still answers. Missing-cursor and disappearance-during-list tests support this. |
| 4 | MISSING_ENDPOINT_FALLBACK — `Circle.PrepareEdit` | Both inspections explicitly refuse absence; `_card` returns one nullable value rather than zero rows. Disappear-prepare has a two-second test bound. |
| 5 | MISSING_ENDPOINT_FALLBACK — `Circle.Remember` | Save → explicit inspect → ingestion → answer; disappeared saved record refuses promptly. Disappear-save and organization failure tests cover the material false intervals. |
| 6 | MISSING_ENDPOINT_FALLBACK — `Circle.Seek` | `_corpus` always returns one serialized collection; recall returns or faults. Empty matches remain an empty array. A missing required need produces prompt opaque INTERNAL_ERROR, covered by disappear-need. Missing sources are omitted without dropping the answer. |
| 7 | MISSING_ENDPOINT_FALLBACK — `Circle.Transcribe` | Authentication and transcription each return or fault/refuse; final answer has no optional state-read guard. Invalid audio and anonymous-route tests exercise refusal paths. |
| 8 | MISSING_ENDPOINT_FALLBACK — `reusable.accounts.identifying.Me` | `Registering.identify` explicitly returns username or USER_NOT_FOUND, mapped UNAUTHORIZED. Account-disappearance test verifies prompt failure. |
| 9 | MISSING_ENDPOINT_FALLBACK — `reusable.commons.finishing.ChooseUsername` | `requireLinkable` explicitly succeeds/refuses before registration. No pair of independent positive/negative queries controls routing. Routing-action expiry and username-collision tests support closure. |
| 10 | MISSING_ENDPOINT_FALLBACK — `reusable.commons.finishing.FinishCommons` | One `resolve` result supplies boolean `linked`; true/false branches exhaust that result. Missing/expired state refuses explicitly. Stable-subject, collision and routing-snapshot tests cover the branches. |
| 11 | MISSING_ENDPOINT_FALLBACK — `reusable.commons.starting.StartCommons` | Unconditional start action then answer; dependency/database failure faults rather than dropping an answer guard. Attempt creation and provider-address tests support the intended path. |
| 12 | ORDER_SENSITIVE_FORMER — `NeedResults` | Intentional: Graphing `_matches` follows stored validated relevance order; former joins preserve that order while omitting invalid sources. `code/tests/compositions/Circle.test.ts:95` explicitly tests reversed provider relevance order. |
| 13 | ORDER_SENSITIVE_FORMER — `SavedMemories` | Intentional: `_list` sorts capture time descending, then identity ascending; former preserves enumeration order. `Circle.test.ts:85,107` verifies stable paging order and omission of disappeared rows. |

A provider can still exceed the root request budget during sequential cold organization. That is a separate A5 latency/recovery concern; these structural fallback dispositions do not prove every request completes before its deadline.

### Selected-executable inventory

Six static concept instances remain, with user/source bindings in `design/types.md`. Selected endpoints comprise seven Circle endpoints, Me, SignOut, StartCommons, FinishCommons and ChooseUsername. Circle selects one optional `OwnedMemory` view and two ordered formers, `SavedMemories` and `NeedResults`; there are no separate deferred internal reactions. Remember/edit use the existing clock derivation. Optional timezone defaults are declared at their endpoint boundaries. The inspected compositions introduce no state-reading computation or second authorization mechanism.

### Remaining evidence limits

Deployed HTTPS sign-in/returning-session behavior, actual production cookie settings, two real accounts, real microphone permissions and external-provider quality remain pending A9/B2. Local injected-provider results do not establish those outcomes. The reusable auth contract also contains a stale sentence saying callback codes remain in browser history despite its earlier cleanup description; align that prose with `replaceState` during A7.

## Findings

None requiring a source or contract change for A4.
