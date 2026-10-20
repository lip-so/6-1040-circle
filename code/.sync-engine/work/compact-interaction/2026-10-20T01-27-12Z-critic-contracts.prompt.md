# Role and objective

Continue work unit `compact-interaction`; role `critic`; phase `contracts`. The prior same-phase role contract remains authoritative.

# Access

This grant replaces prior access; other rules remain.

Current grant:

```json
{"readableAreas":[{"area":"design","path":"compositions/Circle.md"},{"area":"design","path":"concepts/Connecting.md"},{"area":"design","path":"concepts/Seeking.md"},{"area":"design","path":"types.md"},{"area":"application","path":"frontend/src"},{"area":"application","path":"generated/wire.ts"},{"area":"application","path":"src/assembly.ts"},{"area":"application","path":"src/compositions/Circle.ts"},{"area":"application","path":"src/compositions/inputs.ts"},{"area":"application","path":"src/concepts.ts"},{"area":"application","path":"src/concepts/Connecting.ts"},{"area":"application","path":"src/concepts/Seeking.ts"},{"area":"application","path":"src/concepts/recommendation-policy.ts"},{"area":"application","path":"src/host/http.ts"},{"area":"application","path":"src/main.ts"},{"area":"application","path":"tests/compositions/authenticated-flows.test.ts"},{"area":"application","path":"tests/concepts/Seeking.test.ts"},{"area":"application","path":"tests/concepts/lifecycle.test.ts"},{"area":"application","path":"tests/providers"}],"writableAreas":[],"toolKinds":["repository-read"],"projectShell":"none","network":false,"generatedOutput":false,"longRunningProcesses":false}
```

# Guidance

Unchanged from the prior same-agent context. Apply it to the task and changed context below.

# Context

## Review task

**.sync-engine/work/compact-interaction/final-review-task.md**

Full final contract review is warranted because user materially expanded recommendation behavior after prior snapshot review. Same retained critic; inspect revised Connecting/Circle/Seeking/types and bounded source/test grants. Assess global exact-target per-owner exclusion persistence, old status actions/endpoints fully removed, optional reason private stateless LLM context, hard DB exclusion before/after policy, no evidence fabrication or cross-user context, explicit failures and generated declarations. No new concept boundary: Connecting owns preferences, Graphing facts, Seeking searches, Remembering original note. Model policy separate injected capability. Review source agreement and high-priority tests. Verify prior CI-01 now fixed (arrow always seeks); all latest UI choices in final prose: stable toggle/mobile, no Look again/New search/manual indexing/claim disclosure, pen beside Close, inline accordion focus/collapse, menu optional reason. Do not require old compatibility routes or statuses; latest user removed them. No publication or live model validation. Report Verdict Approve/Revise/Blocked; concrete actionable findings only. Do not edit files. Coordinator browser evidence320 no overflow/stable switch, menu exclusion survives repeat search, original note preserved. Existing30 framework advisories known.

## Brief

**.sync-engine/work/compact-interaction/brief.md**

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

**design/concepts/Connecting.md**

# Connecting

## Purpose

Keep evidence-backed suggestions and a user's private recommendation exclusions without interpreting opaque people, needs, or evidence supplied by other mechanisms.

## Principle

Sofia sees Toni suggested for a research search and chooses Do not recommend, optionally explaining that their interests no longer align. Toni stops appearing in all of Sofia's searches. Her explanation can guide recommendation policy for other candidates, while another student's suggestions and Sofia's original notes remain unchanged.

## Types

```types
external User
external Target
external Need
external Evidence
opaque Set
  Finite unordered collection of values of its type argument; repeated elements have no meaning.
```

## State

```state
a set of Connections with
  an owner User
  a target Target
  a need Need
  an evidence set of Evidence
  a reason String
  a gaps set of String
  an eligible Flag
  unique owner and need and target

a set of Exclusions with
  an owner User
  a target Target
  an explanation String
  unique owner and target

Rule: offer atomically enforces owner, need, target uniqueness. No target, need, or evidence identity is interpreted or merged by name. Legacy connection status fields have no meaning and never suppress otherwise eligible unexcluded suggestions.
Rule: exclusions apply to exact target identity for their owner across every need. They survive reset, clear, need revision, deletion, reopening, and repeat search. They are not note text, extraction facts, or shared learning.
Rule: every explanation has at most 1000 characters; the empty string means no explanation. All exclusions and explanations remain owner-private.
Rule: reset disables the prior set before recomputation; only successful offers reenable supported rows. An interrupted refresh cannot keep old rows eligible.
Rule: offer and all public suggestion queries enforce absence of an owner-target exclusion, including after provider completion; correctness never depends on clearing matching connection rows.
Rule: the injected recommendation policy is separate from evidence extraction. It receives only the supplied search description, candidate target, reason, gaps, and this owner's exclusion targets and explanations. It may reject a supported candidate but cannot invent candidates, alter evidence, or modify notes.
Rule: configured model policy uses a stateless strict boolean response, no retained provider response or shared conversation, and treats all supplied text as untrusted data. Missing, invalid, timed-out, or failed provider output faults explicitly without offering that candidate; there is no silent fallback or automatic retry. Local policy passes supported unexcluded candidates without a provider call.
Rule: policy context includes all owner exclusions in target identity ascending order with complete explanations. The complete serialized policy input is bounded to 128 KiB UTF-8; exceeding this budget faults explicitly before a provider call and never truncates feedback. Hard exclusion checks always use all owner exclusions. Exclusion saving is independent of this budget and succeeds without a policy call. No other owner's feedback can enter the policy call.
Rule: exclude and clear enforce ownership inside mutations; refusals leave complete state unchanged. Exclusion is durable before success is returned; a policy fault cannot erase it.
```

## Actions

```actions
reset(owner: User, need: Need) : returns ()
  where true
  then
    set eligible false on all connections with owner and need
    leave an empty set or repeated reset unchanged
    returns

offer(owner: User, need: Need, target: Target, description: String, evidence: Set<Evidence>, reason: String, gaps: Set<String>) : returns ()
  where evidence is empty
  then
    refuses EMPTY_EVIDENCE "A suggestion requires supporting evidence."
  where evidence is not empty and reason is blank
  then
    refuses EMPTY_REASON "A suggestion requires an explanation."
  where evidence is not empty and reason is not blank and description is blank
  then
    refuses EMPTY_SEARCH_DESCRIPTION "A suggestion requires its search description."
  where evidence is not empty and reason is not blank and description is not blank and an exclusion has owner and target
  then
    leave connections and exclusions unchanged and do not invoke policy
    returns
  where evidence is not empty and reason is not blank and description is not blank and no exclusion has owner and target
  then
    evaluate injected recommendation policy with description, target, reason, gaps, and only owner's complete exclusion context within the explicit input budget
    if policy rejects or an owner-target exclusion is present at commit, leave connections and exclusions unchanged
    otherwise create or replace the unique connection with owner, need, target, evidence, reason, gaps, and eligible true, preserving any existing connection identity
    leave all exclusions unchanged
    returns

exclude(owner: User, connection: Connection, explanation: String) : returns ()
  where connection is not in Connections or connection.owner is not owner
  then
    refuses EXCLUDE_UNAVAILABLE "This suggestion is not available."
  where connection is in Connections and connection.owner is owner and connection.eligible is false
  then
    refuses EXCLUDE_INELIGIBLE "This suggestion is no longer current."
  where connection is in Connections and connection.owner is owner and connection.eligible is true and explanation has more than 1000 characters
  then
    refuses EXCLUDE_REASON_TOO_LONG "The explanation must be at most 1000 characters."
  where connection is in Connections and connection.owner is owner and connection.eligible is true and explanation has at most 1000 characters
  then
    atomically create or replace the exclusion with owner, connection.target, and exact supplied explanation
    preserve an existing exclusion identity and leave an identical repeat unchanged
    leave all original connections and their evidence unchanged
    returns

clear(owner: User, need: Need) : returns ()
  where true
  then
    remove every connection with owner and need, leaving an empty set or repetition unchanged
    leave all exclusions unchanged
    returns
```

## Queries

```queries
_suggestions(owner: User) : many (connection: Connection, target: Target, need: Need, evidence: Set<Evidence>, reason: String, gaps: Set<String>)
  Answer owner's eligible connections whose exact target has no exclusion for owner, with supplied explanation and evidence; ignore legacy status fields.
  Answer no rows when none qualify.
  Order by need identity then connection identity ascending; composition may retain graph ranking when presenting one refreshed need.

_get(owner: User, connection: Connection) : optional (target: Target, need: Need, evidence: Set<Evidence>, reason: String, gaps: Set<String>, eligible: Flag)
  Answer owner's unexcluded connection and its opaque identities, explanation, and eligibility; ignore legacy status fields.
  Answer no row for an unknown connection, another owner's connection, or a target excluded by owner.

_excluded(owner: User, target: Target) : optional (target: Target, explanation: String)
  Answer owner's exclusion for the exact target and its explanation.
  Answer no row when owner has not excluded target, irrespective of another owner's exclusion.

_exclusions(owner: User) : many (target: Target, explanation: String)
  Answer all owner's exclusions with complete explanations, without applying the model-context limit.
  Answer no rows when owner has none.
  Order by target identity ascending.
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
  Order dated needs by createdAt descending then identity ascending, followed by undated legacy needs by identity ascending. This exposes the latest created searches first without inventing dates for older records.

_active(owner: User) : many (need: Need, description: String)
  Answer only owner's needs whose active field is not false, including legacy needs without that field.
  Answer no rows when owner has no active needs.
  Order by createdAt descending then identity ascending, placing undated active needs last by identity.
```

## Affected existing contracts

**design/types.md**

Unchanged from the prior same-agent context.

# Result

Unless the task requests another format, use these prior fields: `## Verdict`, `## Assessments`, `## Findings`.
