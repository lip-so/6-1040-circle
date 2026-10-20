# Role and objective

Continue work unit `restore-p3-functionality`; role `application-worker`; phase `implementation`. The prior same-phase role contract remains authoritative.

# Access

This grant replaces prior access; other rules remain.

Current grant:

```json
{"readableAreas":[{"area":"work-unit","path":"context"},{"area":"application","path":"design"},{"area":"application","path":"generated.config.ts"},{"area":"application","path":"package.json"},{"area":"application","path":"src"},{"area":"application","path":"tests"},{"area":"application","path":"tsconfig.json"}],"writableAreas":[{"area":"owned-concept","path":"src/concepts"},{"area":"owned-integration","path":"src/assembly.ts"},{"area":"owned-integration","path":"src/compositions/Circle.ts"},{"area":"owned-integration","path":"src/compositions/inputs.ts"},{"area":"owned-integration","path":"src/concepts.ts"},{"area":"owned-integration","path":"src/host"},{"area":"owned-integration","path":"src/main.ts"},{"area":"owned-integration","path":"src/proof.ts"},{"area":"owned-configuration","path":".env.example"},{"area":"owned-configuration","path":"generated"},{"area":"owned-configuration","path":"generated.config.ts"},{"area":"owned-test","path":"tests/compositions"},{"area":"owned-test","path":"tests/concepts"},{"area":"owned-test","path":"tests/host"},{"area":"owned-test","path":"tests/providers"}],"toolKinds":["repository-read","repository-write"],"projectShell":"project-validation","network":true,"generatedOutput":true,"longRunningProcesses":false}
```

# Guidance

Unchanged from the prior same-agent context. Apply it to the task and changed context below.

# Context

## Task

**.sync-engine/work/restore-p3-functionality/backend-final-task.md**

Resume and close the backend assignment. All supplied canonical alignment blockers are now repaired and independently approved at final digest. Generate artifacts and run backend check/types plus full tests. Coordinator applied frontend and two voice cancellation tests AFTER your preceding run finalized; do not edit frontend/tests/ui. Backend tsc may transitively read voice helper, but Vue checking/build/browser are coordinator-owned afterward. No further feature/test expansion is needed. Fix actual backend defects only within existing grant; report complete final status with exact commands/counts/advisories/generated changes. If a new material blocker exists report precise evidence; do not invent framework APIs or edit design. Keep final response concise for capture.

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

## Authored types

**design/types.md**

Unchanged from the prior same-agent context.

## Compositions

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

## Concept specifications

**design/concepts/Connecting.md**

Unchanged from the prior same-agent context.

**design/concepts/Graphing.md**

Unchanged from the prior same-agent context.

**design/concepts/Remembering.md**

Unchanged from the prior same-agent context.

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

## Concept public surfaces

**src/concepts/Graphing.ts**

import { createHash } from "node:crypto";
import { MongoServerError, type Collection, type Db } from "mongodb";
import { extractEncounter, isNegativeQuery, requiresOpening, subjectTerms, type EntityKind, type RelationKind } from "./graphing-text.ts";
import { extractionContent, validateExtraction, type EncounterExtractor } from "./graphing-extraction.ts";
interface Entity {
    _id: string;
    kind: EntityKind;
    label: string;
}
interface Claim {
    _id: string;
    from: string;
    relation: RelationKind;
    to: string;
    quote: string;
    usable?: boolean;
}
interface SourceGraph {
    _id: string;
    owner: string;
    entities: Entity[];
    claims: Claim[];
    contentDigest?: string;
    sourceRevision?: number;
    observedAt?: Date;
    retracted?: boolean;
}
interface Suggestion {
    target: string;
    label: string;
    source: string;
    evidence: string[];
    reason: string;
    gaps: string[];
}
export class EmptySourceContent extends Error {
}
export class SourceNotOwned extends Error {
}
export class SourceRetracted extends Error {
}
export class StaleSourceRevision extends Error {
}
export class ClaimRejectionUnavailable extends Error {
}
export class ClaimRestoreUnavailable extends Error {
}
export class RetractNotOwned extends Error {
}
function identity(...parts: string[]): string {
    return createHash("sha256").update(JSON.stringify(parts)).digest("hex");
}
function distinctiveOrganization(label: string): boolean {
    const normalized = label.trim();
    return !/^(?:the\s+)?(?:a\s+|an\s+)?(?:lab|laboratory|startup|company|group|university|institute|research lab|robotics lab|ai lab|ai-chip startup|robotics startup)$/iu.test(normalized) && (/^[A-Z]{2,8}$/u.test(normalized) || /[A-Z][a-z]+/u.test(normalized));
}
function checkVersion(row: SourceGraph | null, owner: string, revision: number) {
    if (row && row.owner !== owner)
        throw new SourceNotOwned();
    if (row?.retracted)
        throw new SourceRetracted();
    if ((row?.sourceRevision ?? 0) > revision)
        throw new StaleSourceRevision();
}
export class GraphingConcept {
    private readonly sources: Collection<SourceGraph>;
    constructor(db: Db, private readonly extractor?: EncounterExtractor) {
        this.sources = db.collection<SourceGraph>("graphing.sources");
    }
    async ingest({ owner, source, content, observedAt, sourceRevision = 0 }: {
        owner: string;
        source: string;
        content: string;
        observedAt?: Date;
        sourceRevision?: number;
    }): Promise<Record<string, never>> {
        if (!content.trim())
            throw new EmptySourceContent();
        const before = await this.sources.findOne({ _id: source });
        checkVersion(before, owner, sourceRevision);
        const input = extractionContent(content);
        const extracted = validateExtraction(this.extractor ? await this.extractor.extract(input) : extractEncounter(input), input);
        if (/\b(?:not|no longer|never)\s+(?:currently\s+)?hiring\b/iu.test(input))
            extracted.claims = extracted.claims.filter(c => c.relation !== "OFFERS");
        const ids = new Map(extracted.entities.map(entity => [entity.key, identity(owner, ...(entity.kind === "TOPIC" || (entity.kind === "ORGANIZATION" && distinctiveOrganization(entity.label)) ? [entity.kind, entity.label.normalize("NFKC").trim().toLocaleLowerCase("en").replace(/\s+/gu, " ")] : [source, entity.key]))]));
        const entities = extracted.entities.map(({ key, ...entity }) => ({ _id: ids.get(key)!, ...entity }));
        const claims = extracted.claims.map(claim => ({ ...claim, _id: identity(owner, source, claim.from, claim.relation, claim.to, claim.quote), from: ids.get(claim.from)!, to: ids.get(claim.to)!, usable: true }));
        try {
            const result = await this.sources.updateOne({ _id: source, owner, retracted: { $ne: true }, $or: [{ sourceRevision: { $lte: sourceRevision } }, { sourceRevision: { $exists: false } }] }, { $set: { owner, entities, claims, contentDigest: createHash("sha256").update(content).digest("hex"), sourceRevision, ...(observedAt ? { observedAt: new Date(observedAt) } : {}) }, $setOnInsert: { retracted: false } }, { upsert: true });
        }
        catch (error) {
            if (!(error instanceof MongoServerError) || error.code !== 11000)
                throw error;
            checkVersion(await this.sources.findOne({ _id: source }), owner, sourceRevision);
            throw error;
        }
        return {};
    }
    async reject({ owner, claim }: {
        owner: string;
        claim: string;
    }): Promise<Record<string, never>> {
        const result = await this.sources.updateOne({ owner, "claims._id": claim }, { $set: { "claims.$.usable": false } });
        if (!result.matchedCount)
            throw new ClaimRejectionUnavailable();
        return {};
    }
    async restore({ owner, claim }: {
        owner: string;
        claim: string;
    }): Promise<Record<string, never>> {
        const result = await this.sources.updateOne({ owner, "claims._id": claim }, { $set: { "claims.$.usable": true } });
        if (!result.matchedCount)
            throw new ClaimRestoreUnavailable();
        return {};
    }
    async remove({ owner, claim }: {
        owner: string;
        claim: string;
    }): Promise<Record<string, never>> {
        await this.sources.updateOne({ owner, "claims._id": claim }, { $pull: { claims: { _id: claim } } });
        return {};
    }
    async retract({ owner, source }: {
        owner: string;
        source: string;
    }): Promise<Record<string, never>> {
        try {
            await this.sources.updateOne({ _id: source, owner }, { $set: { owner, retracted: true, claims: [], entities: [] }, $unset: { contentDigest: "", observedAt: "" } }, { upsert: true });
        }
        catch (error) {
            if (error instanceof MongoServerError && error.code === 11000)
                throw new RetractNotOwned();
            throw error;
        }
        return {};
    }
    async _members({ owner, evidence }: {
        owner: string;
        evidence: string[];
    }): Promise<{
        claim: string;
    }[]> {
        return [...new Set(evidence)].sort().map(claim => ({ claim }));
    }
    async _source({ owner, source }: {
        owner: string;
        source: string;
    }): Promise<{
        contentDigest: string;
    }[]> {
        const row = await this.sources.findOne({ _id: source, owner, retracted: { $ne: true } });
        return row?.contentDigest ? [{ contentDigest: row.contentDigest }] : [];
    }
    async _entity({ owner, entity }: {
        owner: string;
        entity: string;
    }): Promise<{
        label: string;
        kind: EntityKind;
    }[]> {
        const rows = await this.sources.find({ owner, retracted: { $ne: true }, "entities._id": entity }).sort({ _id: 1 }).toArray();
        const row = rows.flatMap(source => source.entities).find(row => row._id === entity);
        return row ? [{ label: row.label, kind: row.kind }] : [];
    }
    async _claims({ owner, source }: {
        owner: string;
        source: string;
    }): Promise<{
        claim: string;
        fromLabel: string;
        relation: RelationKind;
        toLabel: string;
        quote: string;
        usable: boolean;
    }[]> {
        const row = await this.sources.findOne({ _id: source, owner, retracted: { $ne: true } });
        if (!row?.contentDigest)
            return [];
        return row.claims.slice().sort((a, b) => a._id.localeCompare(b._id)).flatMap(claim => {
            const from = row.entities.find(e => e._id === claim.from), to = row.entities.find(e => e._id === claim.to);
            return from && to ? [{ claim: claim._id, fromLabel: from.label, relation: claim.relation, toLabel: to.label, quote: claim.quote, usable: claim.usable !== false }] : [];
        });
    }
    async _evidence({ owner, claim }: {
        owner: string;
        claim: string;
    }): Promise<{
        source: string;
        quote: string;
        contentDigest: string;
    }[]> {
        const row = await this.sources.findOne({ owner, retracted: { $ne: true }, "claims._id": claim });
        const evidence = row?.claims.find(c => c._id === claim && c.usable !== false);
        return row?.contentDigest && evidence && row.entities.some(e => e._id === evidence.from) && row.entities.some(e => e._id === evidence.to) ? [{ source: row._id, quote: evidence.quote, contentDigest: row.contentDigest }] : [];
    }
    async _trace({ owner, description }: {
        owner: string;
        description: string;
    }): Promise<Suggestion[]> {
        const terms = subjectTerms(description), needsOpening = requiresOpening(description);
        if ((!terms.length && !needsOpening) || isNegativeQuery(description))
            return [];
        const graphs = (await this.sources.find({ owner, retracted: { $ne: true }, contentDigest: { $exists: true } }).toArray()).filter(g => g.contentDigest);
        const entities = new Map(graphs.flatMap(g => g.entities.map(e => [e._id, e] as const)));
        const claims = graphs.flatMap(g => g.claims.filter(c => c.usable !== false).map(c => ({ ...c, source: g._id, time: g.observedAt?.getTime() ?? -Infinity }))).sort((a, b) => a._id.localeCompare(b._id));
        type Edge = typeof claims[number];
        const outgoing = new Map<string, Edge[]>();
        for (const c of claims) {
            const list = outgoing.get(c.from) ?? [];
            list.push(c);
            outgoing.set(c.from, list);
        }
        const acquaintance = new Map<string, Edge[]>();
        const queue: {
            id: string;
            path: Edge[];
        }[] = graphs.flatMap(g => g.entities.filter(e => e.kind === "SELF").map(e => ({ id: e._id, path: [] })));
        for (let index = 0; index < queue.length && index < 512; index++) {
            const current = queue[index]!;
            if (current.path.length >= 4)
                continue;
            for (const c of outgoing.get(current.id) ?? []) {
                if (c.relation !== "MET" && c.relation !== "KNOWS")
                    continue;
                if (entities.get(c.to)?.kind !== "PERSON" || acquaintance.has(c.to))
                    continue;
                const path = [...current.path, c];
                acquaintance.set(c.to, path);
                queue.push({ id: c.to, path });
            }
        }
        const matches: (Suggestion & {
            hops: number;
            time: number;
        })[] = [];
        for (const [target, path] of acquaintance) {
            const person = entities.get(target)!;
            const support: Edge[] = [];
            const labels: string[] = [];
            const facts = new Set<string>();
            const hiringProof: Edge[] = [];
            const nameTerms = subjectTerms(person.label);
            if (terms.every(t => nameTerms.includes(t))) {
                path.forEach(c => support.push(c));
                nameTerms.forEach(t => facts.add(t));
                labels.push(person.label);
            }
            let hiring = false;
            let discussed = false;
            const routes: {
                id: string;
                path: Edge[];
            }[] = [{ id: target, path: [] }];
            const visited = new Set<string>();
            for (let i = 0; i < routes.length && i < 128; i++) {
                const route = routes[i]!;
                if (visited.has(route.id) || route.path.length > 3)
                    continue;
                visited.add(route.id);
                for (const c of outgoing.get(route.id) ?? []) {
                    if (c.relation === "MET" || c.relation === "KNOWS")
                        continue;
                    const to = entities.get(c.to);
                    if (!to || to.kind === "PERSON" || to.kind === "SELF")
                        continue;
                    const routeClaims = [...route.path, c];
                    const available = subjectTerms(to.label);
                    if (c.relation === "RESEARCHES")
                        available.push("research");
                    if (c.relation === "OFFERS" && /\b(?:is|are)\s+hiring\b/iu.test(c.quote)) {
                        hiring = true;
                        hiringProof.push(...routeClaims);
                    }
                    if (available.some(t => terms.includes(t)) || (!terms.length && c.relation === "OFFERS")) {
                        available.forEach(t => facts.add(t));
                        support.push(...routeClaims);
                        labels.push(to.label);
                        if (c.relation === "DISCUSSED")
                            discussed = true;
                    }
                    if (to.kind === "ORGANIZATION")
                        routes.push({ id: to._id, path: routeClaims });
                }
            }
            if (!terms.every(term => facts.has(term)) || !support.length || (needsOpening && !hiring))
                continue;
            const all = [...new Map([...path, ...support, ...(needsOpening ? hiringProof : [])].map(c => [c._id, c])).values()];
            const gaps: string[] = [];
            if (!hiring && /\b(?:job|jobs|work|role|roles|position|positions|internship|research|urop)\b/iu.test(description))
                gaps.push("Availability would need to be checked.");
            if (discussed)
                gaps.push("Discussion does not establish expertise.");
            if (path.length > 1)
                gaps.push("An introduction would need to be requested.");
            const source = path[path.length - 1]!.source;
            const explanation = `Your notes connect ${person.label} with ${[...new Set(labels)].join(", ")}.`;
            matches.push({ target, label: person.label, source, evidence: all.map(c => c._id), reason: `${explanation} ${[...new Set(support.map(c => c.quote))].map(q => `“${q}”`).join(" ")}${gaps.length ? " " + gaps.join(" ") : ""}`, gaps, hops: path.length, time: Math.max(...all.map(c => c.time)) });
        }
        return matches.sort((a, b) => a.gaps.length - b.gaps.length || a.hops - b.hops || ((a.time === b.time) ? 0 : b.time - a.time) || a.label.localeCompare(b.label, "en") || a.target.localeCompare(b.target)).slice(0, 5).map(({ hops, time, ...row }) => row);
    }
}

**src/concepts/Remembering.ts**

import { createHash } from "node:crypto";
import { MongoServerError, type Collection, type Db, type Filter } from "mongodb";
import { validateAudio, type Transcriber } from "./transcription.ts";
interface Memory {
    _id: string;
    owner: string;
    content?: string;
    capturedAt?: Date;
    submission?: string;
    revision?: number;
    forgotten?: boolean;
}
export class EmptyContent extends Error {
}
export class SubmissionConflict extends Error {
}
export class SubmissionForgotten extends Error {
}
export class RevisionUnavailable extends Error {
}
export class EmptyRevision extends Error {
}
export class ForgetNotOwned extends Error {
}
export { InvalidAudio } from "./transcription.ts";
export class RememberingConcept {
    private readonly memories: Collection<Memory>;
    constructor(db: Db, private readonly transcriber?: Transcriber) {
        this.memories = db.collection<Memory>("remembering.memories");
    }
    async remember({ owner, content, submission, capturedAt }: {
        owner: string;
        content: string;
        submission: string;
        capturedAt: Date;
    }): Promise<{
        memory: string;
    }> {
        if (!content.trim())
            throw new EmptyContent();
        const memory = createHash("sha256").update(JSON.stringify([owner, submission])).digest("hex");
        try {
            await this.memories.insertOne({ _id: memory, owner, content, submission, capturedAt: new Date(capturedAt), revision: 0, forgotten: false });
        }
        catch (error) {
            if (!(error instanceof MongoServerError) || error.code !== 11000)
                throw error;
            const row = await this.memories.findOne({ _id: memory, owner });
            if (row?.forgotten)
                throw new SubmissionForgotten();
            if (!row || row.content !== content)
                throw new SubmissionConflict();
        }
        return { memory };
    }
    async revise({ owner, memory, content }: {
        owner: string;
        memory: string;
        content: string;
    }): Promise<Record<string, never>> {
        const row = await this.memories.findOne({ _id: memory, owner, forgotten: { $ne: true } });
        if (!row)
            throw new RevisionUnavailable();
        if (!content.trim())
            throw new EmptyRevision();
        if (row.content !== content) {
            const result = await this.memories.updateOne({ _id: memory, owner, forgotten: { $ne: true }, content: { $ne: content } }, { $set: { content }, $inc: { revision: 1 } });
            if (!result.matchedCount && !(await this.memories.findOne({ _id: memory, owner, forgotten: { $ne: true } })))
                throw new RevisionUnavailable();
        }
        return {};
    }
    async forget({ owner, memory }: {
        owner: string;
        memory: string;
    }): Promise<Record<string, never>> {
        const row = await this.memories.findOne({ _id: memory, owner });
        if (!row)
            throw new ForgetNotOwned();
        await this.memories.updateOne({ _id: memory, owner, forgotten: { $ne: true } }, { $set: { forgotten: true }, $unset: { content: "" }, $inc: { revision: 1 } });
        return {};
    }
    async transcribe({ owner, audio, mediaType }: {
        owner: string;
        audio: string;
        mediaType: string;
    }): Promise<{
        content: string;
    }> {
        const bytes = validateAudio(audio, mediaType);
        if (!this.transcriber)
            throw new Error("Transcription is unavailable.");
        const content = await this.transcriber.transcribe(bytes, mediaType);
        if (typeof content !== "string" || !content.trim() || content.length > 20000)
            throw new Error("Transcription is unavailable.");
        return { content };
    }
    async _get({ owner, memory }: {
        owner: string;
        memory: string;
    }): Promise<{
        content: string;
    }[]> {
        const row = await this.memories.findOne({ _id: memory, owner, forgotten: { $ne: true } });
        return row?.content !== undefined ? [{ content: row.content }] : [];
    }
    async _record({ owner, memory }: {
        owner: string;
        memory: string;
    }): Promise<{
        content: string;
        revision: number;
    }[]> {
        const row = await this.memories.findOne({ _id: memory, owner, forgotten: { $ne: true } });
        return row?.content !== undefined ? [{ content: row.content, revision: row.revision ?? 0 }] : [];
    }
    async _list({ owner, after }: {
        owner: string;
        after: string;
    }): Promise<{
        memory: string;
        content: string;
    }[]> {
        const filter: Filter<Memory> = { owner, forgotten: { $ne: true } };
        if (after) {
            const row = await this.memories.findOne({ _id: after, owner, forgotten: { $ne: true } });
            if (!row)
                return [];
            filter.$or = row.capturedAt ? [{ capturedAt: { $lt: row.capturedAt } }, { capturedAt: row.capturedAt, _id: { $gt: after } }, { capturedAt: { $exists: false } }] : [{ capturedAt: { $exists: false }, _id: { $gt: after } }];
        }
        return (await this.memories.find(filter).sort({ capturedAt: -1, _id: 1 }).limit(21).toArray()).flatMap(row => row.content === undefined ? [] : [{ memory: row._id, content: row.content }]);
    }
}

**src/concepts/Seeking.ts**

import { type Collection, type Db } from "mongodb";
interface Need {
    _id: string;
    owner: string;
    description: string;
    createdAt?: Date;
    active?: boolean;
}
export class EmptyDescription extends Error {
}
export class NeedRevisionUnavailable extends Error {
}
export class NeedRevisionInactive extends Error {
}
export class EmptyNeedRevision extends Error {
}
export class NeedResolutionUnavailable extends Error {
}
export class NeedReopenUnavailable extends Error {
}
export class SeekingConcept {
    private readonly needs: Collection<Need>;
    constructor(db: Db) {
        this.needs = db.collection<Need>("seeking.needs");
    }
    async seek({ owner, description, createdAt }: {
        owner: string;
        description: string;
        createdAt?: Date;
    }): Promise<{
        need: string;
    }> {
        if (!description.trim())
            throw new EmptyDescription();
        const normalized = description.trim().replace(/\s+/gu, " ").toLocaleLowerCase("en");
        const rows = (await this.needs.find({ owner, active: { $ne: false } }).toArray())
            .filter(row => row.description.trim().replace(/\s+/gu, " ").toLocaleLowerCase("en") === normalized);
        const existing = rows.sort((a, b) => a._id.localeCompare(b._id))[0];
        if (existing)
            return { need: existing._id };
        const need = crypto.randomUUID();
        await this.needs.insertOne({ _id: need, owner, description, active: true,
            ...(createdAt ? { createdAt: new Date(createdAt) } : {}) });
        return { need };
    }
    async revise({ owner, need, description }: {
        owner: string;
        need: string;
        description: string;
    }): Promise<Record<string, never>> {
        const row = await this.needs.findOne({ _id: need, owner });
        if (!row)
            throw new NeedRevisionUnavailable();
        if (row.active === false)
            throw new NeedRevisionInactive();
        if (!description.trim())
            throw new EmptyNeedRevision();
        const result = await this.needs.updateOne({ _id: need, owner, active: { $ne: false } }, { $set: { description } });
        if (!result.matchedCount)
            throw new NeedRevisionUnavailable();
        return {};
    }
    async resolve({ owner, need }: {
        owner: string;
        need: string;
    }): Promise<Record<string, never>> {
        if (!(await this.needs.updateOne({ _id: need, owner }, { $set: { active: false } })).matchedCount)
            throw new NeedResolutionUnavailable();
        return {};
    }
    async reopen({ owner, need }: {
        owner: string;
        need: string;
    }): Promise<Record<string, never>> {
        if (!(await this.needs.updateOne({ _id: need, owner }, { $set: { active: true } })).matchedCount)
            throw new NeedReopenUnavailable();
        return {};
    }
    async delete({ owner, need }: {
        owner: string;
        need: string;
    }): Promise<Record<string, never>> {
        await this.needs.deleteOne({ _id: need, owner });
        return {};
    }
    async _get({ owner, need }: {
        owner: string;
        need: string;
    }): Promise<{
        description: string;
    }[]> {
        const row = await this.needs.findOne({ _id: need, owner });
        return row ? [{ description: row.description }] : [];
    }
    async _record({ owner, need }: {
        owner: string;
        need: string;
    }): Promise<{
        description: string;
        active: boolean;
    }[]> {
        const row = await this.needs.findOne({ _id: need, owner });
        return row ? [{ description: row.description, active: row.active !== false }] : [];
    }
    async _list({ owner }: {
        owner: string;
    }): Promise<{
        need: string;
        description: string;
        active: boolean;
    }[]> {
        const rows = await this.needs.find({ owner }).toArray();
        rows.sort((a, b) => (a.createdAt ? b.createdAt ? a.createdAt.getTime() - b.createdAt.getTime() : -1 : b.createdAt ? 1 : 0) || a._id.localeCompare(b._id));
        return rows.map(row => ({ need: row._id, description: row.description, active: row.active !== false }));
    }
    async _active({ owner }: {
        owner: string;
    }): Promise<{
        need: string;
        description: string;
    }[]> {
        return (await this._list({ owner })).filter(row => row.active).map(({ need, description }) => ({ need, description }));
    }
}

## Existing wiring and configuration

**src/assembly.ts**

import { assemble } from "@mit-sdg/sync-engine/assembly";
import type { Db } from "mongodb";
import { composition } from "./compositions/Circle.ts";
import { composition as accounts } from "./compositions/reusable/accounts.ts";
import { composition as commons } from "./compositions/reusable/commons.ts";
import { ConnectingConcept } from "./concepts/Connecting.ts";
import type { Transcriber } from "./concepts/transcription.ts";
import { RememberingConcept } from "./concepts/Remembering.ts";
import { SeekingConcept } from "./concepts/Seeking.ts";
import { GraphingConcept } from "./concepts/Graphing.ts";
import type { EncounterExtractor } from "./concepts/graphing-extraction.ts";
import { RegisteringConcept } from "./concepts/Registering/Registering.ts";
import { CommonsProvider, type Provider } from "./concepts/Federating/provider.ts";
import { CommonsFederating, Sessioning, applicationConceptSet } from "./concepts.ts";
export function assembleApplication(database: Db, options: {
    commons?: Provider;
    extractor?: EncounterExtractor;
    transcriber?: Transcriber;
    instances?: Partial<{
        Registering: RegisteringConcept;
        CommonsFederating: CommonsFederating;
        Sessioning: Sessioning;
        Remembering: RememberingConcept;
        Seeking: SeekingConcept;
        Graphing: GraphingConcept;
        Connecting: ConnectingConcept;
    }>;
} = {}) {
    return assemble({
        conceptSet: applicationConceptSet,
        instances: {
            Registering: new RegisteringConcept(database),
            CommonsFederating: new CommonsFederating(database, options.commons ?? new CommonsProvider({
                origin: process.env.COMMONS_ORIGIN ?? "https://class.mit-sdg.dev",
                app: process.env.PUBLIC_ORIGIN ?? "http://localhost:3000",
            }), "CommonsFederating"),
            Sessioning: new Sessioning(database),
            Remembering: new RememberingConcept(database, options.transcriber),
            Seeking: new SeekingConcept(database),
            Graphing: new GraphingConcept(database, options.extractor),
            Connecting: new ConnectingConcept(database),
            ...options.instances,
        },
        redaction: { fields: ["attempt", "nonce", "state", "code", "audio", "content", "quote"] },
        composition: { reusable: { accounts, commons }, Circle: composition },
    });
}

**src/concepts.ts**

import { createHash } from "node:crypto";
import connectingSpec from "@design/concepts/Connecting.md" with { type: "text" };
import * as memoryErrors from "./concepts/Remembering.ts";
import * as needErrors from "./concepts/Seeking.ts";
import * as graphErrors from "./concepts/Graphing.ts";
import * as connectionErrors from "./concepts/Connecting.ts";
import { ConnectingConcept } from "./concepts/Connecting.ts";
import { conceptSet, registerConcept } from "@mit-sdg/sync-engine/assembly";
import rememberingSpec from "@design/concepts/Remembering.md" with { type: "text" };
import seekingSpec from "@design/concepts/Seeking.md" with { type: "text" };
import graphingSpec from "@design/concepts/Graphing.md" with { type: "text" };
import { EmptyContent, SubmissionConflict, RememberingConcept } from "./concepts/Remembering.ts";
import { EmptyDescription, SeekingConcept } from "./concepts/Seeking.ts";
import { EmptySourceContent, GraphingConcept, SourceNotOwned } from "./concepts/Graphing.ts";
import federatingSpec from "@design/concepts/Federating.md" with { type: "text" };
import registeringSpec from "@design/concepts/Registering.md" with { type: "text" };
import sessioningSpec from "@design/concepts/Sessioning.md" with { type: "text" };
import { AlreadyLinked, FederatingConcept, NotConfirmed, SignInExpired, SignInRefused } from "./concepts/Federating/Federating.ts";
import { InvalidUsername, RegisteringConcept, UsernameTaken } from "./concepts/Registering/Registering.ts";
import { NotSignedIn, SessioningConcept } from "./concepts/Sessioning/Sessioning.ts";
export class CommonsFederating extends FederatingConcept<string> {
}
export class Sessioning extends SessioningConcept<string> {
}
const registering = registerConcept({
    class: RegisteringConcept,
    spec: registeringSpec,
    refusals: { INVALID_USERNAME: InvalidUsername, USERNAME_TAKEN: UsernameTaken },
});
const commonsFederating = registerConcept({
    class: CommonsFederating,
    spec: federatingSpec,
    refusals: { SIGN_IN_EXPIRED: SignInExpired, SIGN_IN_REFUSED: SignInRefused, NOT_CONFIRMED: NotConfirmed, ALREADY_LINKED: AlreadyLinked },
});
const sessioning = registerConcept({
    class: Sessioning,
    spec: sessioningSpec,
    refusals: { NOT_SIGNED_IN: NotSignedIn },
});
const remembering = registerConcept({
    class: RememberingConcept,
    spec: rememberingSpec,
    refusals: { EMPTY_CONTENT: EmptyContent, SUBMISSION_CONFLICT: SubmissionConflict, SUBMISSION_FORGOTTEN: memoryErrors.SubmissionForgotten, REVISION_UNAVAILABLE: memoryErrors.RevisionUnavailable, EMPTY_REVISION: memoryErrors.EmptyRevision, FORGET_NOT_OWNED: memoryErrors.ForgetNotOwned, INVALID_AUDIO: memoryErrors.InvalidAudio },
});
const seeking = registerConcept({
    class: SeekingConcept,
    spec: seekingSpec,
    refusals: { EMPTY_DESCRIPTION: EmptyDescription, NEED_REVISION_UNAVAILABLE: needErrors.NeedRevisionUnavailable, NEED_REVISION_INACTIVE: needErrors.NeedRevisionInactive, EMPTY_NEED_REVISION: needErrors.EmptyNeedRevision, NEED_RESOLUTION_UNAVAILABLE: needErrors.NeedResolutionUnavailable, NEED_REOPEN_UNAVAILABLE: needErrors.NeedReopenUnavailable },
});
const graphing = registerConcept({
    class: GraphingConcept,
    spec: graphingSpec,
    refusals: { EMPTY_SOURCE_CONTENT: EmptySourceContent, SOURCE_NOT_OWNED: SourceNotOwned, SOURCE_RETRACTED: graphErrors.SourceRetracted, STALE_SOURCE_REVISION: graphErrors.StaleSourceRevision, CLAIM_REJECTION_UNAVAILABLE: graphErrors.ClaimRejectionUnavailable, CLAIM_RESTORE_UNAVAILABLE: graphErrors.ClaimRestoreUnavailable, RETRACT_NOT_OWNED: graphErrors.RetractNotOwned },
});
const connecting = registerConcept({ class: ConnectingConcept, spec: connectingSpec, refusals: { EMPTY_EVIDENCE: connectionErrors.EmptyEvidence, EMPTY_REASON: connectionErrors.EmptyReason, DISMISS_UNAVAILABLE: connectionErrors.DismissUnavailable, DISMISS_INELIGIBLE: connectionErrors.DismissIneligible, DISMISS_HANDLED: connectionErrors.DismissHandled, USE_UNAVAILABLE: connectionErrors.UseUnavailable, USE_INELIGIBLE: connectionErrors.UseIneligible, USE_HANDLED: connectionErrors.UseHandled } });
export const applicationConceptSet = conceptSet({ Registering: registering, CommonsFederating: commonsFederating, Sessioning: sessioning, Remembering: remembering, Seeking: seeking, Graphing: graphing, Connecting: connecting }, { sourceDigest: ({ content }: {
        content: string;
    }) => createHash("sha256").update(content).digest("hex") });
export const { concepts } = applicationConceptSet;

## Exact starting paths

**.sync-engine/work/restore-p3-functionality/backend-paths.md**

src/concepts/Remembering.ts, src/concepts/Seeking.ts, src/concepts/Graphing.ts, src/concepts/graphing-text.ts, src/concepts/graphing-extraction.ts, src/concepts/openai-extractor.ts, src/compositions/Circle.ts, src/concepts.ts, src/assembly.ts, src/host/http.ts, src/main.ts, tests/concepts, tests/compositions, generated.config.ts. Use supplied grant for precise bounds.

## Additional directed context

**.sync-engine/work/restore-p3-functionality/2026-10-19T23-11-34Z-critic-verification.response.md**

## Verdict
Approve

## Findings

All five routed alignment items are resolved:

| Item | Disposition |
|---|---|
| Helper views | ValidEvidence, CurrentSuggestion, and SuggestionTrace have explicit links and preserve complete owned-proof validation. |
| Refresh work/reply | Both declarations select the same path and causal request. Ordinary work alone fans out; the deferred reply answers once after settlement, including zero active needs. One declaration owns validation. |
| Repeated lookups | Seeking reuses the deterministic smallest-identity active exact normalized match, preserves legacy duplicates, excludes resolved needs, and creates a UUID otherwise. Its concurrency scope is explicit. |
| Memory inspection | The nested `{memory: {memory, content, claims}}` wrapper is documented. |
| Unavailable responses | Missing and foreign objects share the string `NOT_FOUND` response and selected HTTP 404 projection. |

These revisions do not regress the supplied C01–C04 or D01 guarantees. This verifies the revised contracts, not source implementation or test results.

# Result

Unless the task requests another format, use these prior fields: `## Status`, `## Changed`, `## Checks`, `## Blockers`, `## Concerns` (optional).
