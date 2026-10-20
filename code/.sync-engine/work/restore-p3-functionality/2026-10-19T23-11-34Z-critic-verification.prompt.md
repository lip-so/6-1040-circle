# Role and objective

Continue work unit `restore-p3-functionality`; role `critic`; phase `verification`. The prior same-phase role contract remains authoritative.

# Access

This grant replaces prior access; other rules remain.

Current grant:

```json
{"readableAreas":[{"area":"work-unit","path":"context"},{"area":"application","path":"design"}],"writableAreas":[],"toolKinds":["repository-read"],"projectShell":"project-validation","network":false,"generatedOutput":false,"longRunningProcesses":false}
```

# Guidance

Unchanged from the prior same-agent context. Apply it to the task and changed context below.

# Context

## Verification task

**.sync-engine/work/restore-p3-functionality/critic-final-task.md**

Verify only the five routed canonical alignment items in supplied blocked-worker report against final revised Circle/Seeking. These are supported helper-view coverage, zero/many refresh work/reply endpoints sharing one causal request, user-authorized exact normalized active-need reuse, nested memory inspection wrapper, and string NOT_FOUND HTTP projection. Confirm no regression to already-resolved C01-C04/D01 guarantees. Do not do another full design or source review. Public semantics: ordinary branches drain before initial receive.afterFlowSettles reply; work branch alone fans out, one reply authenticates and responds, one declaration owns input validator. No coordination-pulse action or extra concept/state was added. Return concise Verdict and disposition for supplied items. No edits.

## Brief

**.sync-engine/work/restore-p3-functionality/brief.md**

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

## Original finding or routed blocker IDs

**.sync-engine/work/restore-p3-functionality/2026-10-19T22-59-00Z-application-worker-implementation.response.md**

## Status
Blocked

Backend implementation is complete and tested. Artifact generation and final contract checks await the canonical documentation updates below.

## Changed
- Restored Remembering, Seeking, Graphing and Connecting lifecycle behavior.
- Added complete owned-evidence validation, directed cross-note retrieval, automatic refresh, corrections, source retraction and revision protection.
- Implemented all 22 endpoint paths, including separate work/reply declarations for refresh.
- Added injected OpenAI transcription, bounded input validation and complete-settlement FIFO admission.
- Repeated normalized searches reuse an existing active need; new needs use UUIDs.
- Formatted changed TypeScript and added focused tests without restoring deleted low-priority cases.
- Updated `.env.example` with transcription configuration.

Frontend response shapes:
- `/memories/get`: `{ memory: { memory, content, claims } }`
- `/needs/list`: `{ needs: [{ need, description, active }] }`
- Need mutation/search results: `{ results: { need, description, active, suggestions } }`
- Suggestion lists: `{ suggestions: [{ need, description, connection, target, label, source, content, evidence, reason, gaps, sources }] }`
- Each source: `{ claim, source, quote, content }`
- Inspection: `{ suggestion: { ...suggestionFields, status, eligible } }`

## Checks
- `bun test` — **84 passed, 0 failed**, across 17 files; 539 assertions.
- `bunx tsc --noEmit` — passed.
- `bun run generate` — blocked by five canonical coverage declarations.
- `bun run check` — blocked by the same five declarations.

Outputs:
- `/private/tmp/circle-restoration-backend-tests.log`
- `/private/tmp/circle-restoration-generate.log`
- `/private/tmp/circle-restoration-check.log`

## Blockers
**Design/documentation only:**

1. Add endpoint declaration and reaction link for `Circle.RefreshSuggestionsWork` at `/suggestions/refresh`.
2. Add view links for `Circle.ValidEvidence`, `Circle.CurrentSuggestion` and `Circle.SuggestionTrace`.
3. Update Seeking.seek and Circle repetition semantics: reuse a deterministic existing active normalized-description match; preserve legacy duplicates; create a new UUID when none exists.
4. Document `/memories/get`’s nested `memory` record.
5. Replace unavailable-response wording with HTTP404 `{ error: "NOT_FOUND" }`. The selected HTTP transport permits string domain errors and exposes only `{ error }`.

No canonical design files were modified during this run.

## Concerns
OpenAI checks used simulated responses only, as requested. Deployment uses the documented single-process FIFO guarantee; concurrent independent application processes remain outside scope.

## Revised candidate context

**design/compositions/Circle.md**

# Circle

Circle composes Remembering, Graphing, Seeking, and Connecting around one authenticated
student. Existing Commons authentication remains unchanged. Every protected endpoint
resolves Sessioning.use before any read, provider request, or mutation. No request
accepts owner, graph source ownership, engine time, source revision, or an arbitrary
entity to index. Unknown and other-owner requested objects have identical observable handling: read,
revision, resolve/reopen, reject/restore, and dismiss/use requests return the same
unavailable response; the three owner-filtered remove endpoints described below
return the same successful no-op response. Unexpected fields and malformed identifiers or payloads are
refused before effects. Concept mutations independently enforce ownership; a prior
view check never substitutes for that enforcement. Every endpoint with an
owned-record prerequisite has complementary observable branches: when the owned
query returns a row it continues; when it returns no row it immediately answers
`{error: "NOT_FOUND"}`. This same
shape and code cover missing and foreign identities, including InspectMemory,
RetryMemoryIndex, InspectSuggestion, and any mutation requiring an owned-current
suggestion. Empty prerequisite branches never remain unanswered. Concept refusal
codes expressing missing-or-foreign unavailability are normalized to that same
NOT_FOUND response; semantic refusals such as inactive or already handled remain
distinct. The owner-filtered remove endpoints have the successful no-op policy
below instead, and ForgetMemory can repeat its owned tombstone action without a
live-memory read prerequisite. The selected HTTP transport maps this unavailable
response to HTTP 404 and exposes only the string error field, never an error
object or a detailed message.

The [owned-memory view](view:Circle.OwnedMemory) uses Remembering._get with the
session owner. The [saved-memory former](former:Circle.SavedMemories) reads
Remembering._list directly and retains the owner-scoped 21-row cursor order. The
[list endpoint](reaction:Circle.ListMemories) accepts the existing cursor contract;
the interface displays 20 accounts with one lookahead. All live original accounts
remain visible even when indexing failed. Forgotten metadata never appears.

The [owned-evidence view](view:Circle.OwnedEvidence) first reads Graphing._evidence
under the same owner, then reads its source through OwnedMemory. It retains the
claim, source identity, exact quote, indexed contentDigest, and current original
content only when [the digest of that content](computation:sourceDigest) equals the
indexed digest. OwnedEvidence relies on Graphing's full-quote validation invariant for both
local and model extraction, together with exact current-original digest equality;
it performs no additional quote parsing or eligibility computation. This check applies to every claim of the entire path, including intermediate
claims from other notes. Missing, rejected, withdrawn, undigested, or stale evidence
makes the whole candidate unavailable, rather than dropping a bad quote and retaining
its conclusion. Concept peers never call one another.

The [invalid-evidence view](view:Circle.InvalidEvidence) enumerates the complete
supplied evidence set through Graphing._members(owner, evidence) and answers each
member for which no OwnedEvidence(owner, claim) row exists. Enumeration includes
absent and foreign claim identities, so an invalid intermediate member cannot
silently disappear. This view reveals no foreign graph facts: Graphing._members
only echoes supplied identities and the actual proof still comes exclusively from
_evidence and the owned original join. A candidate passes full proof only when
_members yields at least one row and InvalidEvidence yields none. Empty evidence
never qualifies for an offer or current display. The full sources collection is
built by enumerating those same _members rows and joining every member through
OwnedEvidence; it never starts from a query that lists only existing valid claims.

The [valid-evidence view](view:Circle.ValidEvidence) holds exactly when the count
of Graphing._members(owner, evidence) is greater than zero and InvalidEvidence
answers no rows. This is the selected nonempty universal proof used by offers,
suggestion formers, and inspection; it adds no stored state or computation.
The [current-suggestion view](view:Circle.CurrentSuggestion) holds for an owned
Connecting._get record with eligible true, an owned active Seeking._record need,
a matching current Graphing._trace target for that need, and ValidEvidence for
the connection's complete stored evidence set. It is the inspection and handling
prerequisite, independent of whether a suggestion was already handled.
The [suggestion-trace view](view:Circle.SuggestionTrace) joins an owned active
Seeking._record need to Graphing._trace under the same owner and supplied target,
returning its current person label and primary source. SuggestionDetails uses this
view for those fields, alongside its complete ValidEvidence proof. Each helper
is composed solely from the selected queries and views; none consults a peer
inside a concept or introduces an unlinked computation.

The [memory-details former](former:Circle.MemoryDetails) returns an owned original
and its owned Graphing._claims, including rejected claims with their usable flags.
It displays claims only if Graphing._source has the same digest as that current
original. The [inspection endpoint](reaction:Circle.InspectMemory) serves this
record inside the memory field: `{memory: {memory, content, claims}}`. A missing or other-owner original is unavailable,
including when a graph source happens to exist. Graph entities are interpreted by Graphing; the composition obtains person
labels with Graphing._entity and never infers them from contact text.

The [need-list former](former:Circle.SavedNeeds) returns Seeking._list, including
legacy needs as active. The [list-needs endpoint](reaction:Circle.ListNeeds) uses it as the needs collection.
The [need-results former](former:Circle.NeedResults) combines the owned Seeking
record, Connecting suggestions for that need, the person label, and every validated
OwnedEvidence row. Each suggestion includes connection identity, target identity,
label, reason, gaps, and a sources collection containing each original source,
its exact quote, and full original content; evidence claim identities remain available
for inspection. Each suggestion also retains the compatible primary `source` and
`content` fields: Graphing._trace identifies the source of the target person's final
MET or KNOWS acquaintance proof, and content is that source's validated original.
That primary source must occur in the fully validated evidence set. These aliases
never replace or truncate the authoritative sources collection. SuggestionDetails
uses the same deterministic primary-source selection for its need and target. NeedResults retains the current Graphing._trace ordering while selecting the
corresponding eligible stored suggestions; candidates failing a complete proof join
are omitted. Ranking is limited to five graph candidates before this join, so the
validated result may contain fewer than five without refilling from uncertain paths.
Existing top-level results with need, description, and suggestions are retained. Active status is additive. A resolved need yields no current suggestions.
The [suggestions former](former:Circle.CurrentSuggestions) supplies the same records
across the owner's active needs. The [suggestion-details former](former:Circle.SuggestionDetails)
uses Connecting._get for an owned connection, validates the owned need and every
piece of evidence, and includes status and eligibility. Ineligible connections never
appear as current suggestions. Missing dependent records are omitted without exposing
another owner's existence. Empty results are an empty collection, not an error.

The [remember endpoint](reaction:Circle.Remember) accepts exact free-form content
and the existing UUID submission token. It binds one current engine instant, saves
through Remembering.remember, and acknowledges the memory identity only after the
indexing and active-need refresh obligations below have settled. The frontend keeps
the same token for retries of the same draft; changing the draft creates a new token.
A retry never duplicates a live original, overwrites a revision, or resurrects a
forgotten tombstone. Old guided accounts remain readable and editable as ordinary
free-form text. New capture uses one note field with a gentle reminder to include
whom, when, and what mattered. Contact information remains ordinary text, never an
executed link; literal encounter dates are never parsed into guessed instants.

The [revise-memory endpoint](reaction:Circle.ReviseMemory) checks an owned live note,
changes exact content through Remembering.revise, and waits for indexing and refresh.
The revision changes atomically with content. The saved original is the authority:
its digest immediately makes old evidence ineligible for public results even when
subsequent extraction fails. The [forget-memory endpoint](reaction:Circle.ForgetMemory)
uses Remembering.forget and waits for source retraction and refresh. Its owner-scoped
metadata-only tombstone makes repeat deletion safe and blocks stale save-token retries.
The [retry-index endpoint](reaction:Circle.RetryMemoryIndex) reads the current owned
Remembering._record, never client content, then indexes that exact content and revision
with a fresh engine instant and waits for refresh. Remember, ReviseMemory, and RetryMemoryIndex return the memory identity;
ForgetMemory returns an acknowledgement of deletion. An absent or forgotten original
cannot be reindexed. There is no automatic external reindexing of legacy notes.

The [transcription endpoint](reaction:Circle.Transcribe) authenticates, validates the
recording size and supported media type, and invokes Remembering.transcribe with the
injected server-configured provider. Only the recording and media type reach the
provider. Its returned content is an editable draft; the endpoint returns the content field. Neither transcription nor
recording auto-saves, indexes, or creates a need. A user deliberately saves through
Remember. Browser cancellation and leaving capture discard pending audio and invalidate
transcription replies; switching between Remember and Find preserves the already
typed unsaved note. Account changes and sign-out clear both the text draft and
audio, and invalidate every pending capture reply. Provider errors leave no saved note.
Credentials and provider configuration remain server-side, and production provider
quality is distinct from injectable stand-in evidence.

The [seek endpoint](reaction:Circle.Seek) retains its description input and results
wrapper. It binds a current engine instant, invokes Seeking.seek, and waits for its
reset/offer refresh before forming NeedResults. Repeated case- and whitespace-normalized exact lookups reuse an existing owned
ongoing need; if several old records match, ascending need identity deterministically
chooses one while preserving every duplicate. Reuse keeps its original description
and timestamp. A resolved need is not ongoing, and a new UUID is created only
when no ongoing normalized exact match exists. Normalization trims outer whitespace,
collapses repeated whitespace, and lowercases using the English locale; it never
merges paraphrases. Neither the UI nor a new concept introduces a separate Goal identity.
Legacy needs are also ongoing until explicitly resolved. The experience remains a
lookup with a small ongoing-needs area and a quick Resolved action. The
[revise-need endpoint](reaction:Circle.ReviseNeed), [resolve-need endpoint](reaction:Circle.ResolveNeed),
[reopen-need endpoint](reaction:Circle.ReopenNeed), and [delete-need endpoint](reaction:Circle.DeleteNeed)
invoke the corresponding owned Seeking action and await their lifecycle obligations.
An inactive need must be reopened before revision. Repeated resolve/reopen calls keep
the same need identity and active state. ReviseNeed, ResolveNeed, and ReopenNeed return the results wrapper for that need;
DeleteNeed always invokes owner-filtered Seeking.delete. If the need belongs to the
owner it is deleted; if it is absent or foreign the action succeeds unchanged. Every
branch triggers ClearDeletedNeed for that owner and opaque need identity, then returns
the same deletion acknowledgement. A retry after a failed clear therefore repairs
cleanup even after the need is absent. Owner-filtered Connecting.clear cannot alter
any foreign owner's connections.

The [suggestion-list endpoint](reaction:Circle.ListSuggestions) forms CurrentSuggestions
as the suggestions collection.
The [suggestion-inspection endpoint](reaction:Circle.InspectSuggestion) forms
SuggestionDetails as the suggestion record only after the full owned-evidence join. The
[dismiss endpoint](reaction:Circle.DismissSuggestion) and [use endpoint](reaction:Circle.UseSuggestion)
invoke Connecting.dismiss or Connecting.use after owned-current inspection. The
[remove-suggestion endpoint](reaction:Circle.RemoveSuggestion) invokes Connecting.remove
for an owned connection. Each returns updated current suggestions. Dismissed/useful
status survives evidence refresh for the same owner, need, and target, but removed
connections have no continuing handled history. Ineligible or differently handled
suggestions use the concept's specified refusals without partial effects.

The [reject-claim endpoint](reaction:Circle.RejectClaim), [restore-claim endpoint](reaction:Circle.RestoreClaim),
and [remove-claim endpoint](reaction:Circle.RemoveClaim) call the corresponding owned
Graphing action and await active-need refresh. RemoveClaim always invokes the
owner-filtered Graphing.remove: owned claims are removed; absent and foreign claims
are successful unchanged no-ops. All branches refresh only the authenticated owner
and return the same suggestions collection. RejectClaim and RestoreClaim use their
identical missing/foreign unavailable refusal branches. Claim inspection is part of owned memory
details, so rejected claims can be restored. Rejection never changes the original note.
The refresh path has two intentional endpoint declarations in the same request
and causal flow. The [refresh work declaration](reaction:Circle.RefreshSuggestionsWork)
handles the ordinary request: authenticate, fan out the owned active needs, reset
each, and make the complete-proof offers. The [refresh reply declaration](reaction:Circle.RefreshSuggestions)
uses receive.afterFlowSettles to wait for that ordinary work to drain, then
authenticates and sends one current-suggestions response, including when there
are zero active needs. RefreshSuggestionsWork alone owns the path's input validator;
the reply does not install another validator. Both declarations use the exact same
/suggestions/refresh pathname and no coordination pulse, independent request, or
additional deferred work is introduced at their reply settlement frontier. Refresh
uses current graph data; it does not call extraction or resend originals to a
provider. It is the explicit recovery operation after a partial refresh failure.

The deployed host wraps every complete application API handler invocation in one
single-process FIFO admission queue. This includes authentication APIs, protected
reads, mutations, provider calls, and all dependent engine work. One admitted
invocation holds admission until BOTH its handler response or fault is ready
and the public assembly lifecycle `application.whenIdle()` has confirmed that all
accepted application work actually settled. A handler timeout or early error
alone never releases the queue. With one admitted API root, whenIdle covers its
complete dependent flow before the next invocation enters. Refusals and faults release admission in
a finally-equivalent host path; a disconnected client does not admit the next call
until accepted server work settles. No deployed API path bypasses this wrapper.
A bounded provider request consequently delays later API calls until it completes
or reaches its configured timeout. This conservative host responsibility is not
an engine extension or a new concept and makes no multiple-process guarantee.
Callers invoking assembled roots directly must admit those complete root flows
sequentially themselves; concurrent direct-root invocation is outside the selected
application guarantee. Internal reactions remain inside their admitted flow and
do not reacquire API admission.

The following action-triggered DSL reactions are the sole owners of cross-concept
effects. Endpoints do not duplicate their work. Their settlement is part of the
server acknowledgement boundary; visible success is issued only after all required
index/retract/reset/offer/clear effects for that request have completed, without claiming
that the browser received the response. There is no fire-and-forget required work.

The [remembered-source reaction](reaction:Circle.IndexRemembered) follows a completed
Remembering.remember and reads its current owned _record before Graphing.ingest.
The [revised-source reaction](reaction:Circle.IndexRevised) does the same after
Remembering.revise. Each passes exact content, current source revision, and an engine
instant. If a later edit won the race, the current version is indexed; Graphing's
atomic version check prevents an older provider completion replacing a newer version.
The [forgotten-source reaction](reaction:Circle.RetractForgotten) follows
Remembering.forget and calls Graphing.retract. Retraction tombstones the source and
atomically prevents an in-flight extraction from reintroducing its claims.

The [new-need reaction](reaction:Circle.RefreshSoughtNeed) follows Seeking.seek and
refreshes its active need. The [revised-need reaction](reaction:Circle.RefreshRevisedNeed)
follows Seeking.revise, clears old connections, and refreshes that need. The
[resolved-need reaction](reaction:Circle.ClearResolvedNeed) follows Seeking.resolve
and clears its connections. The [deleted-need reaction](reaction:Circle.ClearDeletedNeed)
follows Seeking.delete and clears its connections even though the need no longer
exists. The [reopened-need reaction](reaction:Circle.RefreshReopenedNeed) follows
Seeking.reopen and refreshes the active need.

The [ingested-evidence reaction](reaction:Circle.RefreshAfterIngest),
[rejected-evidence reaction](reaction:Circle.RefreshAfterReject),
[restored-evidence reaction](reaction:Circle.RefreshAfterRestore),
[removed-evidence reaction](reaction:Circle.RefreshAfterRemove), and
[retracted-evidence reaction](reaction:Circle.RefreshAfterRetract) each follow their
corresponding completed Graphing action and reconsider every currently owned active
need. All use one shared refresh policy rather than triggering duplicate reset trees.

Claim mutation responses and RefreshSuggestions return the current suggestions
collection after required refresh settles; the frontend separately reloads the inspected
memory record to display the new usable flags.

The explicitly requested-posture [pre-index invalidation reaction](reaction:Circle.InvalidateBeforeIndex)
observes each Graphing.ingest request, before its extraction action body starts,
and calls Connecting.reset for every currently active need of that request's owner.
It completes those resets before admitting the ingest body. Provider refusal, invalid
output, or failure can therefore stop the completed-posture refresh without leaving
old eligible suggestions. Successful ingest still invokes RefreshAfterIngest for
its existing reset/trace/offer policy; endpoints perform no duplicate invalidation
or refresh work and no unspecified fault hook is required.

A refresh first rechecks the owned active need, calls Connecting.reset for that need,
reads Graphing._trace, validates every candidate's nonempty complete evidence set through _members and
the absence of InvalidEvidence, and calls
Connecting.offer once per supported target. The complete evidence set, grounded reason,
and explicit gaps are stored. Handling status survives offers; goal revision clears
it deliberately. The host FIFO above prevents different admitted API flows, including reads, from
overlapping; all reactions of the admitted flow settle before the next flow.
Within one flow refresh work follows deterministic owned-need order and performs
one complete reset/trace/offer sequence per need. A later need resolution or evidence
change must supersede an earlier refresh; before offers are committed, current need
activity and the complete evidence join are rechecked. Failed refresh leaves any not-yet
offered connections ineligible, never old eligible rows. The caller receives an error
and can invoke RefreshSuggestions. Successful mutation responses include or prompt an
immediate refresh of current needs/suggestions; the browser does not need a page reload.

Original saves and revisions are never rolled back if extraction or search fails.
Before an extraction failure response, stale suggestion sets are reset; digest checks
also prevent stale evidence from appearing through concurrent reads. Extraction failure
retains the original graph internally for recovery, but it cannot be presented as current
when its indexed content differs. Successful extraction does not silently restore deleted
sources. If a retraction step fails after forgetting, the owned-original join still hides
every affected path, and retrying ForgetMemory completes the idempotent retraction.
If a clear after need resolve/delete fails, current suggestions still require a live
active owned need. Repeating ResolveNeed repairs resolved-need cleanup; repeating
DeleteNeed always triggers its owner-filtered clear, including for an absent need.
RefreshSuggestions repairs current active-needs eligibility and offers; it does not
claim to sweep orphaned connections for absent or resolved needs.
No cross-owner rollback, cross-concept atomic transaction, or exactly-once delivery is
claimed. The same actor can retry safe source mutations and refresh; seek reuses an ongoing normalized exact match under the selected sequential
admission guarantee, preserving legacy duplicates.

The interface distinguishes initial loading, genuine emptiness, stale/failed refresh,
and Retry. It preserves captured original text after downstream errors, supports note
edit/delete and goal lifecycle controls, shows uncertainty alongside all source quotes,
and never implies a job or opening merely from a discussion or a possible hosting claim.
Account changes invalidate pending lists, searches, edits, and transcription replies;
older responses cannot restore another account's data or replace a newer request.
This does not cancel already accepted server mutations.

```endpoints
Circle.Remember at /memories/remember
Circle.ListMemories at /memories/list
Circle.InspectMemory at /memories/get
Circle.ReviseMemory at /memories/revise
Circle.ForgetMemory at /memories/forget
Circle.RetryMemoryIndex at /memories/reindex
Circle.Transcribe at /capture/transcribe
Circle.Seek at /needs/seek
Circle.ListNeeds at /needs/list
Circle.ReviseNeed at /needs/revise
Circle.ResolveNeed at /needs/resolve
Circle.ReopenNeed at /needs/reopen
Circle.DeleteNeed at /needs/delete
Circle.ListSuggestions at /suggestions/list
Circle.InspectSuggestion at /suggestions/inspect
Circle.DismissSuggestion at /suggestions/dismiss
Circle.UseSuggestion at /suggestions/use
Circle.RemoveSuggestion at /suggestions/remove
Circle.RefreshSuggestions at /suggestions/refresh
Circle.RefreshSuggestionsWork at /suggestions/refresh
Circle.RejectClaim at /claims/reject
Circle.RestoreClaim at /claims/restore
Circle.RemoveClaim at /claims/remove
```

**design/concepts/Seeking.md**

# Seeking

## Purpose

Keep a user's ongoing needs available for reconsideration until resolved, including searches saved before the lifecycle existed.

## Principle

Sofia records a robotics research goal, refines it, and sees it remain active across visits. Resolving it stops reconsideration; reopening starts it again. A search saved before ongoing goals existed also appears as an ongoing need, and she can resolve it with one action.

## Types

```types
external User
```

## State

```state
a set of Needs with
  an owner User
  a description String
  an optional createdAt DateTime
  an optional active Flag

Rule: every new need has active true; application endpoints supply createdAt from the engine, while direct legacy invocations may omit it. A legacy need without active is interpreted as active and retains its original description and identity.
Rule: missing legacy createdAt remains unknown. Ordering never invents dates.
Rule: every mutation enforces owner membership within its atomic update. Unknown and other-owner needs have indistinguishable refusals or empty reads.
Rule: seek compares descriptions by trimming outer whitespace, collapsing each internal whitespace run to one space, and applying English-locale lowercase. Only normalized exact equality reuses a need; paraphrases are never merged. Legacy duplicate needs remain separate records.
Rule: reuse is guaranteed for sequential admitted invocations and the concept action queue in one assembly. Independent raw concurrent concept instances and multiple processes have no additional deduplication guarantee.
```

## Actions

```actions
seek(owner: User, description: String, createdAt?: DateTime) : returns (need: Need)
  where description is blank
  then
    refuses EMPTY_DESCRIPTION "The need description must not be blank."
  where description is not blank and at least one owned ongoing need has the same normalized description
  then
    bind the matching ongoing need with smallest identity in ascending identity order as need
    preserve its original description, createdAt, active interpretation, and every existing duplicate record
    returns need
  where description is not blank and no owned ongoing need has the same normalized description
  then
    create need with a new UUID identity, owner, exact supplied description, supplied createdAt if any, and active true
    treat explicitly resolved needs as nonmatching even when their descriptions normalize identically
    returns need

revise(owner: User, need: Need, description: String) : returns ()
  where need is not in Needs or need.owner is not owner
  then
    refuses NEED_REVISION_UNAVAILABLE "This goal is not available."
  where need is in Needs and need.owner is owner and need.active is false
  then
    refuses NEED_REVISION_INACTIVE "Reopen this goal before editing it."
  where need is in Needs and need.owner is owner and need.active is not false and description is blank
  then
    refuses EMPTY_NEED_REVISION "The need description must not be blank."
  where need is in Needs and need.owner is owner and need.active is not false and description is not blank
  then
    replace description and preserve need identity and createdAt
    leave an identical description unchanged
    returns

resolve(owner: User, need: Need) : returns ()
  where need is not in Needs or need.owner is not owner
  then
    refuses NEED_RESOLUTION_UNAVAILABLE "This goal is not available."
  where need is in Needs and need.owner is owner
  then
    set active to false, leaving an already inactive need unchanged
    returns

reopen(owner: User, need: Need) : returns ()
  where need is not in Needs or need.owner is not owner
  then
    refuses NEED_REOPEN_UNAVAILABLE "This goal is not available."
  where need is in Needs and need.owner is owner
  then
    set active to true, leaving an already active need unchanged
    returns

delete(owner: User, need: Need) : returns ()
  where true
  then
    atomically remove the need only when it belongs to owner
    leave an absent or other-owner need unchanged with the same successful result
    repeating deletion succeeds unchanged and can trigger owner-scoped downstream cleanup
    returns
```

## Queries

```queries
_get(owner: User, need: Need) : optional (description: String)
  Answer owner's need description.
  Answer no row for an unknown need or another owner's need.

_record(owner: User, need: Need) : optional (description: String, active: Flag)
  Answer owner's need description and active status, interpreting absent legacy active as true.
  Answer no row for an unknown need or another owner's need.

_list(owner: User) : many (need: Need, description: String, active: Flag)
  Answer all owner's needs, interpreting absent legacy active as true.
  Answer no rows when owner has no needs.
  Order dated needs by createdAt ascending then identity ascending, followed by undated legacy needs by identity ascending.

_active(owner: User) : many (need: Need, description: String)
  Answer only owner's needs whose active field is not false, including legacy needs without that field.
  Answer no rows when owner has no active needs.
  Order by createdAt ascending then identity ascending, placing undated active needs last by identity.
```

## Retained review guidance

**node_modules/@mit-sdg/sync-engine-http/public-surface.md**

# Public API

`@mit-sdg/sync-engine-http` has no root export or supported deep imports. The
registers below are exact; generated declarations define complete structural
types.

Install the HTTP companion and core at the same exact release version. The HTTP
package is ESM-only and supports Node.js 24 (`>=24 <25`).

| Package path                                    | Role                                  |
| ----------------------------------------------- | ------------------------------------- |
| [`@mit-sdg/sync-engine-http/policy`](#policy)   | Validated immutable deployment policy |
| [`@mit-sdg/sync-engine-http/handler`](#handler) | Fetch handler                         |
| [`@mit-sdg/sync-engine-http/client`](#client)   | Fetch transport and typed client      |
| [`@mit-sdg/sync-engine-http/tooling`](#tooling) | Generated HTTP wire projection        |

Policy supplies public and browser origins, public error mappings, and cookie
bindings. The package derives CORS, request-origin checks, cookie attributes,
and wire projection; it does not authenticate users or authorize operations.

## `policy`

<!-- register:http-policy:start -->

`HttpBrowserPolicy`, `HttpCookieBinding`, `HttpDirectRoute`, `HttpLimits`, `HttpPolicy`, `HttpPolicyBrand`, `HttpPolicyInit`, `HttpPublicErrorCategory`, `HttpRequestOriginPolicy`, `httpPolicy`

<!-- register:http-policy:end -->

### Direct routes

`direct` declares routes served outside POST/JSON, for clients that cannot post — a
browser following a link. The endpoint is unchanged: it still declares a value, and the
route declares how that value reaches the client.

```ts
httpPolicy({
  direct: [
    { method: "GET", path: "/{code}", endpoint: "/resolve", redirect: "target" },
    { method: "GET", path: "/{code}/stats", endpoint: "/report", status: 200 },
  ],
});
```

Each `{name}` segment fills the endpoint input of that name, percent-decoded, and an empty
segment does not match. `redirect` names a response field carrying an absolute URL and
answers `302` by default; `status` alone answers that status with the JSON body. A route
must state one of them. Only `GET` is supported, parameter names may not repeat, and two
routes may not share a method and shape. Malformed percent encoding does not match.
POST/JSON remains the default for everything else, and a declared route does not remove
its endpoint's POST path.

### `httpPolicy`

```ts
httpPolicy(init: HttpPolicyInit): HttpPolicy
```

`httpPolicy` validates and copies deployment facts into a frozen snapshot marked
with `HttpPolicyBrand`. Consumers reject raw structural objects.

```ts
interface HttpPolicyInit {
  readonly publicOrigin?: string;
  readonly basePath?: string;
  readonly publicErrors?: Readonly<Record<string, HttpPublicErrorCategory>>;
  readonly browser?: HttpBrowserPolicy;
  readonly requestOrigins?: HttpRequestOriginPolicy | false;
  readonly cookies?: Readonly<Record<string, HttpCookieBinding>>;
  readonly limits?: HttpLimits;
}
```

| Field                     | Accepted form and effect                                                                                                                            |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `publicOrigin`            | Exact absolute HTTP or HTTPS origin. Required for cookies and for `browser.credentials: true`; in either case it must use HTTPS or a loopback host. |
| `basePath`                | Portable absolute route prefix. Omission, `""`, and `"/"` select the origin root; trailing slashes are removed.                                     |
| `publicErrors`            | Own domain refusal code to public HTTP category. Unmapped, inherited, malformed, and non-string errors remain private.                              |
| `browser`                 | Exact browser origins and CORS facts.                                                                                                               |
| `requestOrigins`          | Cookie-path request-origin allowlist, or `false` to disable that control where permitted.                                                           |
| `cookies`                 | Nonempty record of named cookie bindings.                                                                                                           |
| `limits.requestBodyBytes` | Positive safe integer; defaults to 1,048,576 in the handler.                                                                                        |

`HttpPublicErrorCategory` is `INVALID_REQUEST`, `UNAUTHORIZED`, `FORBIDDEN`,
`NOT_FOUND`, or `CONFLICT`. Those categories map to status 400, 401, 403, 404,
and 409. `INTERNAL_ERROR` is package-derived and cannot be assigned in
`publicErrors`.

`publicOrigin` and every configured browser or request origin must contain only
an HTTP or HTTPS origin: no credentials, non-root path, query, or fragment.
Origins are normalized through `URL.origin` and must be distinct after
normalization. The accepted HTTP loopback hosts are `localhost`, `127.0.0.1`,
and `[::1]`.

### Browser policy and CORS

```ts
interface HttpBrowserPolicy {
  readonly origins: readonly string[];
  readonly credentials?: boolean;
  readonly allowedHeaders?: readonly string[];
  readonly exposedHeaders?: readonly string[];
  readonly maxAgeSeconds?: number;
}
```

`origins` is an exact allowlist. Wildcards are not accepted. Header names must
be valid and distinct without regard to case. `Content-Type` is added to
`allowedHeaders` when absent. `maxAgeSeconds` must be a non-negative safe
integer.

For an allowed request origin, the handler emits
`Access-Control-Allow-Origin`; it also emits
`Access-Control-Allow-Credentials: true` when `credentials` is true and emits
configured exposed headers. Every response processed under a browser policy
varies on `Origin`, including responses for missing or disallowed origins.

An `OPTIONS` request is treated as preflight only when a browser policy exists.
The path must name an application endpoint, the origin must be allowed, the
requested method must be `POST`, and every requested header must be allowed. An
accepted preflight returns 204 and advertises `POST, OPTIONS`; a rejected
preflight returns `FORBIDDEN`/403. Preflight responses also vary on
`Access-Control-Request-Method` and `Access-Control-Request-Headers`.

CORS controls browser response access, not authorization of cookie-bearing
requests; request-origin protection is separate.

### Request-origin protection

```ts
interface HttpRequestOriginPolicy {
  readonly allowed: readonly string[];
  readonly requireOrigin?: boolean;
}
```

The handler applies request-origin protection only to paths touched by a cookie
binding: protected, issue, and clear paths. When `requestOrigins` is omitted,
`allowed` defaults to `publicOrigin` plus `browser.origins`. An explicit
`allowed` list replaces that default and must include every browser origin.

A present `Origin` outside the allowlist returns `FORBIDDEN`/403. A missing
`Origin` is allowed by default. When `requireOrigin` is true, a missing `Origin`
on a cookie-touched path returns `FORBIDDEN`/403. Other paths are not checked by
this control.

`requestOrigins: false` disables request-origin protection. Policy construction
rejects that setting when a cookie uses derived or explicit `SameSite=None`.

### Cookie bindings

```ts
interface HttpCookieBinding {
  readonly name: string;
  readonly input: string;
  readonly issue: readonly {
    readonly path: string;
    readonly value: string;
    readonly expires: string;
  }[];
  readonly clear: readonly string[];
  readonly sameSite?: "Strict" | "Lax" | "None";
  readonly path?: string;
  readonly domain?: string;
}
```

Each binding must have a nonempty record key, a valid cookie `name`, a
JavaScript-style `input`, and at least one issue declaration. Issue `value` and
`expires` fields must be valid and distinct. Issue paths must be distinct,
clear paths must be distinct, and one binding cannot issue and clear on the same
path. Effective cookie names and logical inputs must be unique across bindings.
Cookie paths use the portable route-path grammar and cannot contain `;`, which
delimits cookie attributes. Domains must be plain domain names without a leading
dot.

Cookies always include `HttpOnly` and `Secure`. These attributes cannot be
overridden. `path` defaults to `/`; `domain` defaults to absent. A cookie whose
path is `/` and domain is absent receives `__Host-` unless its name already has
a valid secure prefix. Other cookies receive `__Secure-`. An explicit `__Host-`
name is rejected with an incompatible path or domain.

`SameSite` is derived from the presence of a credentialed browser policy, not by
comparing sites. No browser policy derives `Strict`.
`browser.credentials: true` derives `None`. Declaring cookies with a browser
policy whose `credentials` is absent or false is rejected. An explicit
`sameSite` override is accepted only when a browser policy is present.

`httpPolicy` does not know the application's endpoint contracts. The following
checks occur synchronously when `createHttpHandler` binds an application and
when `httpWire(...).project` projects one:

- issue and clear paths must name application endpoints;
- the bound input must be required by at least one endpoint;
- an endpoint cannot mention the bound input without requiring it;
- two cookies cannot protect the same endpoint;
- every issue endpoint output alternative must contain the declared value and
  expiry fields; and
- a direct route cannot serve a protected, issuing, or clearing endpoint.

## `handler`

<!-- register:http-handler:start -->

`HttpCorrelationOptions`, `HttpHandlerOptions`, `HttpResponseHeadersContext`, `createHttpHandler`

<!-- register:http-handler:end -->

### `createHttpHandler`

```ts
createHttpHandler(options: HttpHandlerOptions):
  (request: Request) => Promise<Response>

interface HttpHandlerOptions {
  readonly gateway: Gateway<ContractShape>;
  readonly application: Assembly<Record<string, new (...args: never[]) => object>>;
  readonly policy?: HttpPolicy;
  readonly correlation?: HttpCorrelationOptions;
  readonly responseHeaders?: HeadersInit | (
    (context: HttpResponseHeadersContext) =>
      HeadersInit | PromiseLike<HeadersInit>
  );
}
```

Omitting `policy` is equivalent to an empty policy. Supplying a non-branded raw
object throws. Handler construction binds `gateway` to `application`; binding
errors and application-dependent cookie-policy errors throw synchronously.

### Request handling

The handler accepts `POST` only. An `OPTIONS` request receives preflight
handling only under a browser policy. Every other method returns
`INVALID_REQUEST`/400; the handler does not emit an `Allow` header.

Routing uses `URL.pathname` after removing `basePath`. Query parameters do not
select a route. A path outside the base, a request for the base itself, or an
unknown POST path returns `NOT_FOUND`/404 without buffering a request body and
cancels the unread stream. Other rejections before body reading do the same. A
present `Content-Type` must be `application/json`, optionally with parameters;
omission is accepted. An empty body becomes `{}`. Malformed JSON or UTF-8,
unreadable, aborted, or oversized bodies return `INVALID_REQUEST`/400.

The handler buffers at most `limits.requestBodyBytes` request bytes, default
1,048,576. A numeric `Content-Length` larger than the limit fails before full
buffering; streamed bytes are counted independently. `Request.signal` stops a
pending body read and is passed with the effective correlation id to invocation.
Abort stops waiting but does not establish rollback or cancellation of accepted
application work.

A successful invocation returns status 200 and a JSON body. Serialization uses
core portable JSON serialization. An invocation throw, invalid cookie issue
value, invalid or non-future expiry, oversized serialized cookie, or response
serialization failure returns opaque `INTERNAL_ERROR`/500.

### Handler errors

| Result            | Status | Condition                                                                                                               |
| ----------------- | ------ | ----------------------------------------------------------------------------------------------------------------------- |
| `INVALID_REQUEST` | 400    | Invalid method, media type, body, body size, or framework input admission                                               |
| `UNAUTHORIZED`    | 401    | Domain refusal explicitly mapped to `UNAUTHORIZED`                                                                      |
| `FORBIDDEN`       | 403    | Domain mapping, rejected origin, or rejected preflight                                                                  |
| `NOT_FOUND`       | 404    | Route not found, including outside `basePath`                                                                           |
| `CONFLICT`        | 409    | Domain refusal explicitly mapped to `CONFLICT`                                                                          |
| `INTERNAL_ERROR`  | 500    | Private domain refusal, other framework failure, callback failure, serialization failure, or unexpected handler failure |

Public failure bodies contain only `{ error }`; domain details are not exposed.
Framework `INVALID_INPUT` maps to `INVALID_REQUEST`, and framework `NOT_FOUND`
maps to `NOT_FOUND`. Other framework failures are private.

### Cookie runtime behavior

For each protected path, the handler replaces the body field named by
`binding.input` with the decoded cookie or `null`. A non-object body on such a
path returns `INVALID_REQUEST`. Cookie headers larger than 16,384 bytes,
duplicate effective names, malformed percent encoding, and decoded values
outside printable ASCII are treated as an absent cookie.

On a successful issue path, the cookie value must be a printable ASCII string.
The expiry must be a `Date` or have a date-parsable string representation, and
must be in the future. The complete serialized cookie is limited to 4,096
bytes. The handler removes every issuing binding's value and expiry fields from
the JSON result. Successful issue and clear responses set
`Cache-Control: no-store`.

A successful clear path expires the configured cookie. An `UNAUTHORIZED`
response clears each binding that protects that path, whether or not a valid
cookie was present. `FORBIDDEN` and other failures do not clear cookies.

### Correlation and response headers

```ts
interface HttpCorrelationOptions {
  resolve(request: Request): string | undefined;
  responseHeader?: string;
}

interface HttpResponseHeadersContext {
  readonly request: Request;
  readonly path: string | undefined;
  readonly status: number;
  readonly correlationId?: string;
}
```

`resolve` runs synchronously once per request. A valid result is a nonempty
ByteString of at most 128 code units, contains no control character, and has no
leading or trailing space. A missing, invalid, or throwing result is replaced
with `crypto.randomUUID()`. When configured, `responseHeader` receives the
effective id unless the response already contains that header. The header name
must be valid and must not be reserved by HTTP policy.

`responseHeaders` may be static or computed asynchronously. An invalid static
header initializer throws during handler construction. A provider runs for
handled successes and failures. The handler drops cookie, cache, CORS,
representation, redirect, framing, and hop-by-hop headers from its result. This
includes `Set-Cookie`, `Cache-Control`, `Content-Type`, `Content-Encoding`,
`Content-Length`, `Location`, `Vary`, every `Access-Control-*` header, and
connection-specific fields. A provider throw, rejection, or invalid returned
initializer replaces the response with `INTERNAL_ERROR`/500; CORS and
correlation are then applied to that failure response.

Wrap the Fetch handler for preprocessing or response decoration. Wrappers are
outside the package's security boundary and can invalidate header and error
guarantees.

Handler calls may overlap. The handler has no disposal method. The caller owns
the application, gateway, and concept stores. The host owns the listener, static
files, TLS, process lifecycle, and other host resources. The host must route
complete Fetch requests to the handler, return its responses, and close every
resource that the host creates.

## `client`

<!-- register:http-client:start -->

`HeadersOption`, `HttpClientError`, `HttpClientErrorCode`, `HttpClientOptions`, `HttpRequestContext`, `createHttpClient`, `createHttpTransport`

<!-- register:http-client:end -->

```ts
createHttpTransport(options?: HttpClientOptions): ClientTransport<HttpClientError>
createHttpClient<Contract extends ContractShape>(
  options?: HttpClientOptions,
): Client<Contract, HttpClientError>
```

The client takes no policy and uses the generated projected wire type.

| `HttpClientOptions` field | Default and effect                                                                     |
| ------------------------- | -------------------------------------------------------------------------------------- |
| `baseUrl`                 | `API_BASE_URL`, then `/api`; `/` selects the origin root; trailing slashes are removed |
| `fetch`                   | `globalThis.fetch`                                                                     |
| `headers`                 | Header record or per-request synchronous/async provider                                |
| `credentials`             | `"same-origin"`; accepted values are `"include"`, `"omit"`, and `"same-origin"`        |
| `validateResponse`        | `createHttpClient` only; synchronous validation of the complete parsed result          |
| `maxResponseBytes`        | No cap; otherwise a positive finite integer                                            |

Options are resolved when the client or transport is constructed. Later changes
to `API_BASE_URL` do not alter the instance. The transport sends `POST`, adds
`Content-Type: application/json`, serializes `input ?? {}`, and passes the
configured credentials mode. Extra headers are merged afterward and may replace
`Content-Type`. Fetch redirects are rejected rather than followed, so configured
headers are not forwarded and the POST is not replayed at another URL.

`HeadersOption` providers receive `HttpRequestContext`: path, effective signal,
and the call's timeout and correlation id when supplied. The package does not
create a correlation request header. Header providers for concurrent calls may
run concurrently.

An empty response body becomes `{}`. A nonempty body must be valid UTF-8 and
parse as JSON; response `Content-Type` is not consulted. A non-2xx JSON object
with an `error` property is returned as the server result. A non-2xx response
without that envelope returns `BAD_STATUS`.

| `HttpClientErrorCode`      | Condition                                                          |
| -------------------------- | ------------------------------------------------------------------ |
| `HEADER_RESOLUTION_FAILED` | The header provider threw or rejected.                             |
| `NETWORK_ERROR`            | Fetch failed before a response was obtained, including a redirect. |
| `BAD_JSON`                 | The response body could not be read or parsed.                     |
| `BAD_STATUS`               | A non-2xx response lacked a JSON error envelope.                   |
| `RESPONSE_TOO_LARGE`       | Declared or streamed response bytes exceeded `maxResponseBytes`.   |

Abort and timeout use core error codes `ABORTED` and `TIMED_OUT`. `timeoutMs`
must be a positive finite integer no greater than 2,147,483,647; another value
returns core `INVALID_INPUT` before header resolution or Fetch. The timer covers
header resolution, Fetch, and body reading. Abort or timeout can settle while a
header provider or custom Fetch remains pending; neither proves that accepted
server work stopped.

A valid `maxResponseBytes` cap rejects an oversized numeric `Content-Length`
before buffering and counts streamed bytes. Overflow attempts to cancel the
response stream without waiting for cancellation. An invalid cap throws during
construction.

`createHttpClient` passes `validateResponse` to the core client. A false, thrown,
or asynchronous validation result returns core `TRANSPORT_ERROR`.
`createHttpTransport` alone does not apply that validator. The client does not
manage a Node cookie jar. The client and transport have no disposal method and
do not own Fetch agent resources.

## `tooling`

<!-- register:http-tooling:start -->

`HttpWireOptions`, `httpWire`

<!-- register:http-tooling:end -->

```ts
interface HttpWireOptions {
  readonly policy?: HttpPolicy;
  readonly name: string;
}

httpWire(options: HttpWireOptions): WireProjection
```

Omitting `policy` projects a plain JSON wire. A supplied policy must be a branded
value returned by `httpPolicy(...)`; a raw object throws when `httpWire` is
constructed. The projection name must satisfy core generated-contract naming
rules.

Projection maps each known refusal through `publicErrors`; an unmapped code and
an open domain-error branch contribute `INTERNAL_ERROR`. Cookie projection
removes each bound input from protected endpoints and removes value and expiry
fields from every issue endpoint. Application-dependent cookie validation runs
when the projection's `project(facts)` method executes, before artifacts are
compared or written.

Use the same policy for `createHttpHandler(...)` and `httpWire(...)`; the client
receives only the resulting generated type.

The [package README](README.md) provides tiered setup and the supported custom
transport building blocks. Core [execution semantics](https://github.com/mit-sdg/sync-engine/blob/main/docs/user/reference/semantics.md#boundary-gateway-and-client)
define invocation settlement and accepted-work cancellation. The package
[README](README.md#host-responsibilities-and-unsupported-features) defines HTTP
host responsibilities.

**node_modules/@mit-sdg/sync-engine/docs/user/reference/public-api.md**

Unchanged from the prior same-agent context.

**node_modules/@mit-sdg/sync-engine/docs/user/reference/semantics.md**

Unchanged from the prior same-agent context.

# Result

Unless the task requests another format, use these prior fields: `## Verdict`, `## Findings`.
