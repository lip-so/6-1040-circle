# Role and objective

Work unit `concept-folders`; role `critic`; phase `contracts`.

# Contract critic

Independently review the complete changed contract set after authored syntax validation. Use the brief, affected approved contracts, and supplied decomposition as authority.

Check scope, sole mechanism ownership, opaque peer identities, action success and refusal state, repetition, lifecycle, query cardinality and ordering, authorization enforcement, effect ownership, acknowledgement order, and recoverable obligations.

Record one compact assessment row per affected obligation covering trigger, closing reaction, visible success, false interval, acknowledgement order, retry identity, whether the owner accepts that identity, recovery action, and duplicate-effect risk. Inventory selected endpoints, internal reactions, views, formers, computations, links, and endpoint paths. Check that every derived value or optional-input branch implied by the prose has exactly one declared computation and that no computation depends on concept state.

Missing authority, bypassable authorization, duplicate ownership, unrecoverable required work, or behavior required for visible success/refusal is a blocker. When the brief or decomposition requires endpoints, links, or cross-concept behavior, the absence of an application contract in supplied or granted design is a blocker. Return a `Blocked` verdict for that absence, not `Approve` with a note. Give other consequential mismatches stable material-finding IDs. Ignore naming polish, parser mechanics, implementation staging, and unrelated pre-existing issues.

Do not edit design, prescribe implementation, or infer missing context.

# Access

Root: "/Users/sofia/6-1040-circle/code". The short native message explicitly authorizes reading this prompt file; all assignment context is inline below. This is already a compiled role assignment: do not load a skill, workflow, harness guide, or another instruction file.

- Read: `design:compositions` ("/Users/sofia/6-1040-circle/code/design/compositions"), `design:concepts` ("/Users/sofia/6-1040-circle/code/design/concepts"), `design:types.md` ("/Users/sofia/6-1040-circle/code/design/types.md"), `application:frontend/src/App.vue` ("/Users/sofia/6-1040-circle/code/frontend/src/App.vue"), `application:frontend/src/memory-summary.ts` ("/Users/sofia/6-1040-circle/code/frontend/src/memory-summary.ts"), `application:src/assembly.ts` ("/Users/sofia/6-1040-circle/code/src/assembly.ts"), `application:src/concepts` ("/Users/sofia/6-1040-circle/code/src/concepts"), `application:src/concepts.ts` ("/Users/sofia/6-1040-circle/code/src/concepts.ts"), `application:src/main.ts` ("/Users/sofia/6-1040-circle/code/src/main.ts"), `application:tests` ("/Users/sofia/6-1040-circle/code/tests").
- Write: none.
- Tools: `repository-read`.
- Shell: `none`; network: no; generated output: no; long-running processes: no.

Inspect only listed files or directories. In coordinator simulation, this grant binds the coordinator itself; broader coordinator access and prior discovery are unavailable to the assignment. Project checks may transitively read other project files, but do not inspect them yourself. Use supplied or task-named package-owned public documentation; do not browse package trees. Never inspect package `dist`, framework internals, caches, sibling applications, or undeclared declarations. Exclude `.git`, `.sync-engine` except this prompt, harness/skill configuration, agent traces, parent directories, and unrelated generated output. Ask for context instead of searching outside the grant. Generated files come only from granted commands. Never grantable: `git-mutation`, `dependency-installation`, `framework-internals`, `workflow-management`, `skill-cli-invocation`, `delegation-or-handoff`.

# Guidance

# Contract design and review

Use the supplied decomposition as boundary authority; without one, use the brief and affected approved contracts. Preserve accepted obligation IDs and their trigger, closing reaction, false interval, retry identity, and recovery.

## Concepts own complete mechanisms

Purpose names one mechanism and rules out a plausible alternative. Principle gives a short event-ordered story with real actors and values. State describes observable identity, relations, lifecycle, order, multiplicity, and invariants—not storage. External identities remain opaque and peer facts are never interpreted locally.

For every action, settle:

- inputs and returned identity;
- successful state transition;
- each expected refusal and the unchanged post-refusal state;
- repetition or deduplication behavior;
- lifecycle stage, deletion, expiry, and repair when applicable; and
- the owner action that enforces each race-sensitive or security-critical invariant.

A refusal has no partial effect. Repetition must succeed again, return the prior result, or refuse. Deduplication requires an operation identity accepted and checked atomically by the owner; a trace correlation ID is not enough.

Queries have no effects. State `one`, `optional`, or `many`, the empty or unknown case, and stable ordering for `many`. Do not invent CRUD symmetry or expose storage operations that are not part of the mechanism.

## Composition coordinates without stealing authority

Composition owns cross-concept policy, coordination, boundary adaptation, and recovery—not concept invariants. For each visible flow, state:

- actor and authenticated authority;
- requested resource and authorization condition;
- enforcement point;
- visible success and refusals;
- effect owner;
- ordering of required effects relative to acknowledgement; and
- material partial-failure and recovery behavior.

Request data is a claim, not authentication. Reject bypassable authorization, duplicate effect ownership, required work deferred after visible success when it can be lost, compensation without an available owner action, and claims of atomic or exactly-once behavior across independent owners.

For each obligation, verify that the trigger can occur, the closing reaction owns the intended effect, the owner accepts the retry identity, the false interval matches visible behavior, and recovery can run from an available action. This applies to synchronously awaited endpoint steps as well as deferred reactions. Never assume rollback between owners or exactly-once network delivery. Choose and state a realizable server-side acknowledgement boundary rather than adding protocol state solely to model whether a client received bytes.

## Select every executable explicitly

Inventory each selected static instance, endpoint, internal reaction, view, former, and computation. Give every executable declaration one exact typed link, and put all concrete types and instances needed by a new application in `design/types.md`. Each endpoint additionally needs exactly one matching `Declaration.Identity at /path` entry. The module, group, declaration, and pathname must agree.

A computation is a pure derivation of its declared inputs, such as normalization, a generated identifier, the current instant, or deciding whether an optional input was supplied. Anything read from concept state belongs in a query, view, or former, never a computation. Declare every computation the composition prose implies before review, including one for each optional-input branch. Implementation blocks on a missing declaration rather than inventing one.

An endpoint-linked reaction may own the full coordination required before its answer. Add a separate internal reaction only for intentionally distinct deferred or independently triggered behavior. Do not duplicate one effect in both declarations.

Contracts specify behavior, ownership, acknowledgement, and failure—not framework stages, trigger syntax, binding flow, host methods, status codes, or storage layout.

---

# Reading Simple State Form

State fences are declarations, not storage. Read them for what they promise:

- `a set of Items` and `a seq of Items` introduce identities; a `seq` also fixes order.
- A plain set holds every individual of its type in the state: with `a set of Users with
a reputation Number`, every User anywhere in the concept has a reputation, whether
  User is owned or external. An external type's set introduces no identity.
- `a set of Completed Items` classifies members of `Items`, and `a set of Late Completed
Items` members of `Completed Items`. A subset declares no second collection and no
  identity, subsets may overlap, and `a reviewer Verified User` holds only members of
  `Verified Users`.
- `an Author` is the field `author`; the type names a field written without a name.
- `an optional owner Person` may be absent. Collections never carry `optional`; empty
  means absent, so a set that must reject duplicates cannot also promise to detect them.
- `a Settings` has exactly one member.
- `alias WorkItem for Items` renames one declaration; it adds nothing.
- A `Rule:` line is prose the checker keeps verbatim and proves nothing.

Which side declares a relation implies no storage, navigation, or ownership.

---

# What a design says about its boundary

An endpoint takes one request and produces one answer. Endpoints are the only way into
the application, and every caller reaches them the same way, regardless of caller.

Say what a caller supplies, what comes back, and every refusal with a stable code and its
meaning. Each selected endpoint separately declares its exact `endpoint(...)` pathname in
an `endpoints` fence. Do not put transport rendering in behavioral prose or that fence: no
methods, status codes, headers, exit codes, or projected external routes.

When two refusals have to be indistinguishable to a caller, say that as behaviour.

A concept needing the current time or a generated identifier says so in its prose and
takes it as an action input; it never reaches for a clock. Composition binds one instant
per flow and passes it in, so no concept reports the time.

# Context

## Review task

**.sync-engine/work/concept-folders/review-task.md**

Review this mechanical concept-folder relocation for compatibility with the existing accepted contracts. No contract or behavior changes are requested. Confirm that the four application concepts now match the reused named-folder pattern, support modules remain with their owning concept, and changed files contain only relocation-related import updates. Read the supplied relocation report and granted source files as needed. Report only defects caused by this change; existing behavior and prior uncommitted work are outside scope. Do not edit files. Return Verdict: Approve, Revise, or Blocked with concise evidence and limitations.

## Brief

**.sync-engine/work/concept-folders/brief.md**

# Organize backend concept folders

## Goal
Match the reused concepts: each application concept has a named folder containing its implementation and supporting files.

## Scope
Relocate Remembering, Seeking, Graphing and Connecting source modules; update importing backend, frontend and test files. Keep current behavior and authored contracts.

## Done when
- All seven backend concepts use named folders with matching implementation filenames.
- Concept-specific support modules live with their concept.
- Imports resolve; existing backend/artifact/Vue checks, tests and frontend build pass.
- Existing user edits and personal design journal are preserved.

## Active decisions
- Existing accepted design applies unchanged; no product, API or ownership changes.
- Coordinator performs mechanical relocation directly. Independent critic checks compatibility with unchanged contracts.
- Existing tests suffice; no new tests for directory layout.
- Use bundled Node 24 for workflow tooling; host Node 25 fails its declared runtime range. No dependency changes.

## Activity
- Inspected reused and application concept layout and current imports.
- Moved nine modules and updated import paths, including two frontend consumers.

## Changed candidate contracts

**design/compositions/Circle.md**

# Circle

Circle composes Remembering, Graphing, Seeking, and Connecting around one authenticated
student. Existing Commons authentication remains unchanged. Every protected endpoint
resolves Sessioning.use before any read, provider request, or mutation. No request
accepts owner, graph source ownership, engine time, source revision, or an arbitrary
entity to index. Unknown and other-owner requested objects have identical observable handling: read,
revision, resolve/reopen, reject/restore, and exclusion requests return the same
unavailable response; the two owner-filtered remove endpoints described below
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
NOT_FOUND response; semantic refusals such as inactive or an oversized explanation remain
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
the connection's complete stored evidence set. Connecting._get excludes targets privately excluded by this owner, regardless of need. It is the inspection and exclusion prerequisite; legacy handled statuses are ignored.
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

The [need-list former](former:Circle.SavedNeeds) returns Seeking._list newest dated
searches first, followed by undated legacy needs, including legacy needs as active.
The client initially shows four active searches and expands the remaining ordered
rows on demand; this display limit never limits refresh or deletes saved needs.
The [list-needs endpoint](reaction:Circle.ListNeeds) uses it as the needs collection.
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
piece of evidence, and includes eligibility without a legacy status field. Ineligible or owner-excluded connections never
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
[exclude-suggestion endpoint](reaction:Circle.ExcludeSuggestion) accepts a connection identity and an explanation string, with empty string denoting the optional explanation left blank. It accepts no owner or arbitrary target identity. Payload validation rejects an explanation longer than 1000 characters before effects. The session owner and CurrentSuggestion determine the target; missing, foreign, ineligible, or already excluded suggestions return the same NOT_FOUND response without effects. Connecting.exclude persists the unique owner-target exclusion and exact explanation before acknowledgement. The endpoint then returns updated CurrentSuggestions, immediately filtering that target from every owned active need without depending on deletion or refresh of stored connections. An identical repeated endpoint request after exclusion is unavailable because the connection is no longer current; the durable first effect remains. Connecting.exclude itself safely repeats while its owned eligible connection remains stored.

This exclusion applies to the saved exact target across all of this owner's searches, including future, reused, revised, or reopened searches. It never combines same-name people, changes notes or claims, or affects another owner. Need lifecycle cleanup cannot erase exclusions. No undo or history interface is selected. Useful, Dismiss, and Remove suggestion actions, statuses, endpoints, and trailing controls are removed, rather than retained as compatibility routes; stored legacy status fields are safely ignored.

The client offers an ellipsis menu beside each suggestion with Do not recommend, an optional explanation field, deliberate confirmation, and cancellation. Copy explains that the person will not be recommended in any of the user's searches and that the optional reason privately guides future recommendations. It does not claim model training or modification of original encounters. The menu, reason form, accordion, and icon controls remain usable on narrow mobile screens, with contextual accessible names, keyboard access, and visible focus.

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
uses current graph data and the recommendation policy below; it does not call extraction or resend originals to that policy. It remains a recovery API, without a Look again control or any other user-facing refresh button. The search arrow always invokes Seek, even for identical text; saved-search selection only opens its current results. Automatic note/claim refresh remains.

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

The [new-need reaction](reaction:Circle.RefreshSoughtNeed) follows Seeking.seek and refreshes its active need, including when an exact query reuses an existing need. A deliberate search reconsiders evidence while preserving every owner-target exclusion. Legacy Useful/Dismissed state has no effect on current matches. The [revised-need reaction](reaction:Circle.RefreshRevisedNeed) follows Seeking.revise, clears old per-need connections, and refreshes that need without touching exclusions. The [resolved-need reaction](reaction:Circle.ClearResolvedNeed) follows Seeking.resolve
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
Connecting.offer once per supported target, passing the current owned need description. Before each offer the refresh queries Connecting._excluded(owner, target); an excluded exact target is skipped before any recommendation provider request. Connecting.offer independently enforces that exclusion at mutation time and after provider completion. The complete evidence set, grounded reason, and explicit gaps are stored only when recommendation policy accepts the candidate. Exclusions survive all refresh and per-need clear operations. The host FIFO above prevents different admitted API flows, including reads, from
overlapping; all reactions of the admitted flow settle before the next flow.
Within one flow refresh work follows deterministic owned-need order and performs
one complete reset/trace/offer sequence per need. A later need resolution or evidence
change must supersede an earlier refresh; before offers are committed, current need
activity and the complete evidence join are rechecked. Failed refresh leaves any not-yet
offered connections ineligible, never old eligible rows. The caller receives an explicit error and can deliberately submit its search again; the recovery API also remains available. Successful mutation responses include or prompt an
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

The interface distinguishes initial loading, genuine emptiness, and stale/failed search. It offers no manual indexing retry or Look again control; a deliberate search arrow can recompute results. It preserves captured original text after downstream errors, supports note
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
Circle.ExcludeSuggestion at /suggestions/exclude
Circle.RefreshSuggestions at /suggestions/refresh
Circle.RefreshSuggestionsWork at /suggestions/refresh
Circle.RejectClaim at /claims/reject
Circle.RestoreClaim at /claims/restore
Circle.RemoveClaim at /claims/remove
```


The current client centers one Remember/Find composer without visible question headings. The Find arrow submits the typed description; there is no New search control. Selecting a saved search opens its suggestions directly beneath that row, moves focus to the panel heading, and can be collapsed. A submitted reused search outside the latest four expands the list to reveal its panel. Encounter inspection places its edit pen beside Close and its delete bin at the far right of the lower action area, with deletion confirmation. It exposes no manual indexing action, extracted relationship/claim disclosure, or interpretation correction controls. The Remember/Find switch occupies the same shared layout anchor in either mode, including narrow mobile screens.


Recommendation policy is an injected Connecting capability separate from Graphing extraction. With the existing server GRAPHING_EXTRACTOR setting selecting OpenAI mode, it uses the existing server key/model and a stateless Responses request with store:false and a strict single boolean recommend result. Local mode is deterministic pass-through for supported unexcluded candidates; tests inject simulated policy rather than calling a provider. Only the owned current search description, candidate target identity, graph-grounded reason/gaps, and Connecting._exclusions for that owner enter policy context. Original note text, source quotes, other owners' feedback, shared conversations, and client-supplied owner claims never enter it. User text is untrusted data, not instructions. The model may suppress a candidate but cannot add a target, rewrite evidence, modify notes, or defeat an exact exclusion.

All of that owner's exclusions and complete explanations are included in stable target identity order. Serialized policy input has a 128 KiB UTF-8 budget and a bounded provider timeout. Oversized context, timeout, malformed output, or provider failure returns an explicit policy failure; it never silently truncates feedback, falls back, or retries. This can leave a refresh partially offered, with reset preventing old eligibility; it cannot erase the saved need, original, or exclusion. Saving an exclusion never invokes policy or depends on its context budget. Owner privacy is enforced both when querying exclusion context and in each mutation; no global feedback pool or shared model conversation is selected.

## Affected existing contracts

**design/types.md**

# Circle types

Circle retains the existing Commons-only sign-in instances. Registering's local user
identity owns every note, need, graph, and suggestion. Request data never chooses
an owner. Source, target, need, and evidence bindings carry identities only.

```types
```

```instances
instantiate Registering

instantiate Federating as CommonsFederating with
  User is Registering.User

instantiate Sessioning with
  Subject is Registering.User

instantiate Remembering with
  User is Registering.User

instantiate Seeking with
  User is Registering.User

instantiate Graphing with
  User is Registering.User
  Source is Remembering.Memory

instantiate Connecting with
  User is Registering.User
  Target is Graphing.Entity
  Need is Seeking.Need
  Evidence is Graphing.Claim
```

The composition compares indexed evidence against current originals with the pure
[digest](computation:sourceDigest) operation. Both sides hash the exact UTF-8 content,
including original guided fields and Contact text; exclusion from provider input
happens after this digest, so changing any account content invalidates old evidence.

```computations
sourceDigest(content: String) : String
  Return lowercase hexadecimal SHA-256 of the exact UTF-8 content without trimming, normalization, or line-ending replacement.
```

## Additional directed context

**.sync-engine/work/concept-folders/relocation-report.md**

# Relocation report

Coordinator comparison against the working files captured immediately before this task (including pre-existing uncommitted changes). All differences below are relative module specifiers; no authored design or generated contract was edited.

```diff
--- code/src/concepts.ts
+++ code/src/concepts.ts
@@ -1,17 +1,17 @@
 import { createHash } from "node:crypto";
 import connectingSpec from "@design/concepts/Connecting.md" with { type: "text" };
-import * as memoryErrors from "./concepts/Remembering.ts";
-import * as needErrors from "./concepts/Seeking.ts";
-import * as graphErrors from "./concepts/Graphing.ts";
-import * as connectionErrors from "./concepts/Connecting.ts";
-import { ConnectingConcept } from "./concepts/Connecting.ts";
+import * as memoryErrors from "./concepts/Remembering/Remembering.ts";
+import * as needErrors from "./concepts/Seeking/Seeking.ts";
+import * as graphErrors from "./concepts/Graphing/Graphing.ts";
+import * as connectionErrors from "./concepts/Connecting/Connecting.ts";
+import { ConnectingConcept } from "./concepts/Connecting/Connecting.ts";
 import { conceptSet, registerConcept } from "@mit-sdg/sync-engine/assembly";
 import rememberingSpec from "@design/concepts/Remembering.md" with { type: "text" };
 import seekingSpec from "@design/concepts/Seeking.md" with { type: "text" };
 import graphingSpec from "@design/concepts/Graphing.md" with { type: "text" };
-import { EmptyContent, SubmissionConflict, RememberingConcept } from "./concepts/Remembering.ts";
-import { EmptyDescription, SeekingConcept } from "./concepts/Seeking.ts";
-import { EmptySourceContent, GraphingConcept, SourceNotOwned } from "./concepts/Graphing.ts";
+import { EmptyContent, SubmissionConflict, RememberingConcept } from "./concepts/Remembering/Remembering.ts";
+import { EmptyDescription, SeekingConcept } from "./concepts/Seeking/Seeking.ts";
+import { EmptySourceContent, GraphingConcept, SourceNotOwned } from "./concepts/Graphing/Graphing.ts";
 import federatingSpec from "@design/concepts/Federating.md" with { type: "text" };
 import registeringSpec from "@design/concepts/Registering.md" with { type: "text" };
 import sessioningSpec from "@design/concepts/Sessioning.md" with { type: "text" };
```

```diff
--- code/src/main.ts
+++ code/src/main.ts
@@ -6,9 +6,9 @@
 import { client, db } from "./db.ts";
 import { circleHttpPolicy } from "./host/http.ts";
 import { serializeApi } from "./host/admission.ts";
-import { configuredTranscriber } from "./concepts/transcription.ts";
-import { configuredExtractor } from "./concepts/openai-extractor.ts";
-import { configuredRecommendationPolicy } from "./concepts/recommendation-policy.ts";
+import { configuredTranscriber } from "./concepts/Remembering/transcription.ts";
+import { configuredExtractor } from "./concepts/Graphing/openai-extractor.ts";
+import { configuredRecommendationPolicy } from "./concepts/Connecting/recommendation-policy.ts";
 const site = resolve(import.meta.dir, "../frontend/dist");
 const port = Number(process.env.PORT ?? 3000);
 const publicOrigin = process.env.PUBLIC_ORIGIN ?? `http://localhost:${port}`;
```

```diff
--- code/src/assembly.ts
+++ code/src/assembly.ts
@@ -3,13 +3,13 @@
 import { composition } from "./compositions/Circle.ts";
 import { composition as accounts } from "./compositions/reusable/accounts.ts";
 import { composition as commons } from "./compositions/reusable/commons.ts";
-import { ConnectingConcept } from "./concepts/Connecting.ts";
-import type { RecommendationPolicy } from "./concepts/recommendation-policy.ts";
-import type { Transcriber } from "./concepts/transcription.ts";
-import { RememberingConcept } from "./concepts/Remembering.ts";
-import { SeekingConcept } from "./concepts/Seeking.ts";
-import { GraphingConcept } from "./concepts/Graphing.ts";
-import type { EncounterExtractor } from "./concepts/graphing-extraction.ts";
+import { ConnectingConcept } from "./concepts/Connecting/Connecting.ts";
+import type { RecommendationPolicy } from "./concepts/Connecting/recommendation-policy.ts";
+import type { Transcriber } from "./concepts/Remembering/transcription.ts";
+import { RememberingConcept } from "./concepts/Remembering/Remembering.ts";
+import { SeekingConcept } from "./concepts/Seeking/Seeking.ts";
+import { GraphingConcept } from "./concepts/Graphing/Graphing.ts";
+import type { EncounterExtractor } from "./concepts/Graphing/graphing-extraction.ts";
 import { RegisteringConcept } from "./concepts/Registering/Registering.ts";
 import { CommonsProvider, type Provider } from "./concepts/Federating/provider.ts";
 import { CommonsFederating, Sessioning, applicationConceptSet } from "./concepts.ts";
```

Moved `code/src/concepts/graphing-text.ts` → `code/src/concepts/Graphing/graphing-text.ts`.

```diff
--- code/src/concepts/graphing-text.ts
+++ code/src/concepts/Graphing/graphing-text.ts
@@ -1,4 +1,4 @@
-import { readMemoryFields } from "../memory-fields.ts";
+import { readMemoryFields } from "../../memory-fields.ts";
 export type EntityKind = "SELF" | "PERSON" | "ORGANIZATION" | "TOPIC" | "OPPORTUNITY";
 export type RelationKind = "MET" | "KNOWS" | "MEMBER_OF" | "WORKS_ON" | "RESEARCHES" | "INTERNED_AT" | "OFFERS" | "SOMETIMES_HOSTS" | "BASED_IN" | "DISCUSSED" | "FOUNDED" | "DESCRIBED_AS";
 export interface ExtractedEntity {
```

```diff
--- code/tests/compositions/Circle.test.ts
+++ code/tests/compositions/Circle.test.ts
@@ -2,7 +2,7 @@
 import { MongoClient, type Db } from "mongodb";
 import { assembleApplication } from "../../src/assembly.ts";
 import { NeedResults } from "../../src/compositions/Circle.ts";
-import { SeekingConcept } from "../../src/concepts/Seeking.ts";
+import { SeekingConcept } from "../../src/concepts/Seeking/Seeking.ts";
 
 const testUrl = process.env.TEST_MONGODB_URL;
 if (!testUrl) throw new Error("Set TEST_MONGODB_URL in .env to run the MongoDB tests.");
```

```diff
--- code/tests/compositions/authenticated-flows.test.ts
+++ code/tests/compositions/authenticated-flows.test.ts
@@ -4,11 +4,11 @@
 import { writeMemoryFields } from "../../src/memory-fields.ts";
 import { assembleApplication } from "../../src/assembly.ts";
 import { MemoryProvider, type Identity } from "../../src/concepts/Federating/provider.ts";
-import { GraphingConcept } from "../../src/concepts/Graphing.ts";
-import type { EncounterExtractor } from "../../src/concepts/graphing-extraction.ts";
-import { OpenAIEncounterExtractor } from "../../src/concepts/openai-extractor.ts";
+import { GraphingConcept } from "../../src/concepts/Graphing/Graphing.ts";
+import type { EncounterExtractor } from "../../src/concepts/Graphing/graphing-extraction.ts";
+import { OpenAIEncounterExtractor } from "../../src/concepts/Graphing/openai-extractor.ts";
 import { serializeApi } from "../../src/host/admission.ts";
-import type { Transcriber } from "../../src/concepts/transcription.ts";
+import type { Transcriber } from "../../src/concepts/Remembering/transcription.ts";
 import { circleHttpPolicy } from "../../src/host/http.ts";
 import { cleanupDatabases, testDatabase } from "../support/reusable/mongo.ts";
 
```

```diff
--- code/tests/providers/transcription.test.ts
+++ code/tests/providers/transcription.test.ts
@@ -1,5 +1,5 @@
 import { expect, test } from "bun:test";
-import { InvalidAudio, OpenAITranscriber, TranscriptionUnavailable, validateAudio } from "../../src/concepts/transcription.ts";
+import { InvalidAudio, OpenAITranscriber, TranscriptionUnavailable, validateAudio } from "../../src/concepts/Remembering/transcription.ts";
 test("voice input validates encoding, MIME and bounded size before provider work", () => {
     expect(validateAudio("AQID", "audio/webm")).toEqual(new Uint8Array([1, 2, 3]));
     for (const [audio, mime] of [["", "audio/webm"], ["AQI=\n", "audio/webm"], ["AQI=", "audio/ogg"], ["AR==", "audio/webm"]])
```

```diff
--- code/tests/providers/recommendation.test.ts
+++ code/tests/providers/recommendation.test.ts
@@ -1,5 +1,5 @@
 import { expect, test } from "bun:test";
-import { OpenAIRecommendationPolicy, RecommendationUnavailable, serializedPolicyInput } from "../../src/concepts/recommendation-policy.ts";
+import { OpenAIRecommendationPolicy, RecommendationUnavailable, serializedPolicyInput } from "../../src/concepts/Connecting/recommendation-policy.ts";
 const input = { description: "research", target: "candidate", reason: "Supported", gaps: ["Availability unknown"], exclusions: [{ target: "excluded", explanation: "private preference" }] };
 function answer(value: unknown) { return Response.json({ status: "completed", output: [{ type: "message", content: [{ type: "output_text", text: JSON.stringify(value) }] }] }); }
 test("recommendation request is stateless, strict, bounded, and contains only supplied owner context", async () => {
```

```diff
--- code/tests/concepts/Seeking.test.ts
+++ code/tests/concepts/Seeking.test.ts
@@ -1,6 +1,6 @@
 import { afterAll, afterEach, beforeAll, describe, expect, test } from "bun:test";
 import { MongoClient, type Db } from "mongodb";
-import { EmptyDescription, SeekingConcept } from "../../src/concepts/Seeking.ts";
+import { EmptyDescription, SeekingConcept } from "../../src/concepts/Seeking/Seeking.ts";
 
 const testUrl = process.env.TEST_MONGODB_URL;
 if (!testUrl) throw new Error("Set TEST_MONGODB_URL in .env to run the MongoDB tests.");
```

```diff
--- code/tests/concepts/OpenAIExtractor.test.ts
+++ code/tests/concepts/OpenAIExtractor.test.ts
@@ -1,5 +1,5 @@
 import { describe, expect, test } from "bun:test";
-import { ExtractionUnavailable, OpenAIEncounterExtractor } from "../../src/concepts/openai-extractor.ts";
+import { ExtractionUnavailable, OpenAIEncounterExtractor } from "../../src/concepts/Graphing/openai-extractor.ts";
 
 function standIn(answer: (init: RequestInit) => Response | Promise<Response>) {
   const calls: { address: string; init: RequestInit }[] = [];
```

```diff
--- code/tests/concepts/Remembering.test.ts
+++ code/tests/concepts/Remembering.test.ts
@@ -1,6 +1,6 @@
 import { afterAll, afterEach, beforeAll, describe, expect, test } from "bun:test";
 import { MongoClient, type Db } from "mongodb";
-import { EmptyContent, SubmissionConflict, RememberingConcept } from "../../src/concepts/Remembering.ts";
+import { EmptyContent, SubmissionConflict, RememberingConcept } from "../../src/concepts/Remembering/Remembering.ts";
 
 const testUrl = process.env.TEST_MONGODB_URL;
 if (!testUrl) {
```

```diff
--- code/tests/concepts/graphing-extraction.test.ts
+++ code/tests/concepts/graphing-extraction.test.ts
@@ -1,5 +1,5 @@
 import { describe, expect, test } from "bun:test";
-import { InvalidExtraction, validateExtraction } from "../../src/concepts/graphing-extraction.ts";
+import { InvalidExtraction, validateExtraction } from "../../src/concepts/Graphing/graphing-extraction.ts";
 
 const content = "At the seminar I met Mira. Her research focuses on ocean sensors.";
 function extraction() {
```

```diff
--- code/tests/concepts/lifecycle.test.ts
+++ code/tests/concepts/lifecycle.test.ts
@@ -1,7 +1,7 @@
 import { afterAll, expect, test } from "bun:test";
-import { RememberingConcept } from "../../src/concepts/Remembering.ts";
-import { SeekingConcept } from "../../src/concepts/Seeking.ts";
-import { ConnectingConcept } from "../../src/concepts/Connecting.ts";
+import { RememberingConcept } from "../../src/concepts/Remembering/Remembering.ts";
+import { SeekingConcept } from "../../src/concepts/Seeking/Seeking.ts";
+import { ConnectingConcept } from "../../src/concepts/Connecting/Connecting.ts";
 import { cleanupDatabases, testDatabase } from "../support/reusable/mongo.ts";
 afterAll(cleanupDatabases);
 test("memory revision preserves identity and dates; deletion erases text and blocks stale save retries", async () => {
```

```diff
--- code/tests/concepts/Graphing.test.ts
+++ code/tests/concepts/Graphing.test.ts
@@ -1,8 +1,8 @@
 import { afterAll, afterEach, beforeAll, describe, expect, test } from "bun:test";
 import { MongoClient, type Db } from "mongodb";
 import { writeMemoryFields } from "../../src/memory-fields.ts";
-import { EmptySourceContent, GraphingConcept, SourceNotOwned } from "../../src/concepts/Graphing.ts";
-import { InvalidExtraction } from "../../src/concepts/graphing-extraction.ts";
+import { EmptySourceContent, GraphingConcept, SourceNotOwned } from "../../src/concepts/Graphing/Graphing.ts";
+import { InvalidExtraction } from "../../src/concepts/Graphing/graphing-extraction.ts";
 
 const testUrl = process.env.TEST_MONGODB_URL;
 if (!testUrl) throw new Error("Set TEST_MONGODB_URL in .env to run the MongoDB tests.");
```

```diff
--- code/frontend/src/App.vue
+++ code/frontend/src/App.vue
@@ -3,7 +3,7 @@
 import type { CircleWireHttp } from "../../generated/wire.ts";
 import { api } from "./api/client.ts";
 import { readMemoryFields } from "../../src/memory-fields.ts";
-import { extractEncounter } from "../../src/concepts/graphing-text.ts";
+import { extractEncounter } from "../../src/concepts/Graphing/graphing-text.ts";
 import { memorySummary } from "./memory-summary.ts";
 import { useRecentPeople } from "./recent-people.ts";
 import { attempt, RequestScope } from "./request-scope.ts";
```

```diff
--- code/frontend/src/memory-summary.ts
+++ code/frontend/src/memory-summary.ts
@@ -1,5 +1,5 @@
 import { readMemoryFields } from "../../src/memory-fields.ts";
-import { extractEncounter } from "../../src/concepts/graphing-text.ts";
+import { extractEncounter } from "../../src/concepts/Graphing/graphing-text.ts";
 
 export interface MemoryDetail { label: string; value: string }
 
```

Moved `code/src/concepts/Remembering.ts` → `code/src/concepts/Remembering/Remembering.ts`.

Moved `code/src/concepts/transcription.ts` → `code/src/concepts/Remembering/transcription.ts`.

Moved `code/src/concepts/Seeking.ts` → `code/src/concepts/Seeking/Seeking.ts`.

Moved `code/src/concepts/Graphing.ts` → `code/src/concepts/Graphing/Graphing.ts`.

Moved `code/src/concepts/graphing-extraction.ts` → `code/src/concepts/Graphing/graphing-extraction.ts`.

```diff
--- code/src/concepts/graphing-extraction.ts
+++ code/src/concepts/Graphing/graphing-extraction.ts
@@ -1,4 +1,4 @@
-import { readMemoryFields } from "../memory-fields.ts";
+import { readMemoryFields } from "../../memory-fields.ts";
 import type { EntityKind, ExtractedClaim, ExtractedEntity, RelationKind } from "./graphing-text.ts";
 export interface EncounterExtractor {
     extract(content: string): Promise<unknown>;
```

Moved `code/src/concepts/openai-extractor.ts` → `code/src/concepts/Graphing/openai-extractor.ts`.

Moved `code/src/concepts/Connecting.ts` → `code/src/concepts/Connecting/Connecting.ts`.

Moved `code/src/concepts/recommendation-policy.ts` → `code/src/concepts/Connecting/recommendation-policy.ts`.

Validation: `bun run check` passed (all seven concepts; generated artifacts; backend TypeScript; Vue typecheck), with the existing 30 advisories. `bun run test`: 88 passed, zero failed, 590 assertions across 19 files. `bun run build` passed with existing SDK browser-externalization warnings. Providers were simulated by existing tests; disposable Mongo test databases were cleaned by test hooks. No new tests, product changes, dependency changes, live model calls or deployment.

# Result

Unless the task requests another format, return these headings in order. Omit progress narration.

- `## Verdict` — required. First line is exactly `Approve`, `Revise`, or `Blocked`.
- `## Assessments` — required. Compact obligation-by-obligation semantic assessment; do not restate contracts.
- `## Findings` — required. Stable-ID blocker or material findings, or none.
