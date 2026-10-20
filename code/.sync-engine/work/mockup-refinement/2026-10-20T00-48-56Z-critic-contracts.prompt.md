# Role and objective

Continue work unit `mockup-refinement`; role `critic`; phase `contracts`. The prior same-phase role contract remains authoritative.

# Access

This grant replaces prior access; other rules remain.

Current grant:

```json
{"readableAreas":[{"area":"design","path":"compositions/Circle.md"},{"area":"design","path":"types.md"},{"area":"application","path":"frontend/src/App.vue"},{"area":"application","path":"frontend/src/assets/fonts/MadInk-License.txt"},{"area":"application","path":"frontend/src/assets/fonts/Urbanist-OFL.txt"},{"area":"application","path":"frontend/src/reusable/CommonsButton.vue"},{"area":"application","path":"frontend/src/style.css"}],"writableAreas":[],"toolKinds":["repository-read"],"projectShell":"none","network":false,"generatedOutput":false,"longRunningProcesses":false}
```

# Guidance

Unchanged from the prior same-agent context. Apply it to the task and changed context below.

# Context

## Review task

**.sync-engine/work/mockup-refinement/review-resume-task.md**

Continue the same interrupted bounded review and resolve only R01 (remaining review evidence unavailable). The unchanged style.css, CommonsButton.vue and two font license contents are now inlined as context, so no tool/file reads are necessary. Retain the already completed App.vue/contract assessment; complete the remaining typography/responsiveness/accessibility/source assessment from the provided contents. Coordinator browser evidence confirms real MadInk-shaped headings, Urbanist controls, transparent art loaded, no root overflow at 320/390/1280 widths; interaction checks remain coordinator-owned. Do not introduce new scope or require cosmetic tests. Return Verdict: Approve/Revise/Blocked; explicitly state disposition of R01. This supplies the originally granted data, not additional access. No repository mutation or shell is needed.

## Brief

**.sync-engine/work/mockup-refinement/brief.md**

Unchanged from the prior same-agent context.

## Changed candidate contracts

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

## Affected existing contracts

**design/types.md**

Unchanged from the prior same-agent context.

## Additional directed context

**frontend/src/assets/fonts/MadInk-License.txt**

License: Demo for Personal Use
Link: https://ifonts.xyz/madink-script-font.html

**frontend/src/assets/fonts/Urbanist-OFL.txt**

Copyright 2021 The Urbanist Project Authors (https://github.com/coreyhu/Urbanist)

This Font Software is licensed under the SIL Open Font License, Version 1.1.
This license is copied below, and is also available with a FAQ at:
https://openfontlicense.org


-----------------------------------------------------------
SIL OPEN FONT LICENSE Version 1.1 - 26 February 2007
-----------------------------------------------------------

PREAMBLE
The goals of the Open Font License (OFL) are to stimulate worldwide
development of collaborative font projects, to support the font creation
efforts of academic and linguistic communities, and to provide a free and
open framework in which fonts may be shared and improved in partnership
with others.

The OFL allows the licensed fonts to be used, studied, modified and
redistributed freely as long as they are not sold by themselves. The
fonts, including any derivative works, can be bundled, embedded, 
redistributed and/or sold with any software provided that any reserved
names are not used by derivative works. The fonts and derivatives,
however, cannot be released under any other type of license. The
requirement for fonts to remain under this license does not apply
to any document created using the fonts or their derivatives.

DEFINITIONS
"Font Software" refers to the set of files released by the Copyright
Holder(s) under this license and clearly marked as such. This may
include source files, build scripts and documentation.

"Reserved Font Name" refers to any names specified as such after the
copyright statement(s).

"Original Version" refers to the collection of Font Software components as
distributed by the Copyright Holder(s).

"Modified Version" refers to any derivative made by adding to, deleting,
or substituting -- in part or in whole -- any of the components of the
Original Version, by changing formats or by porting the Font Software to a
new environment.

"Author" refers to any designer, engineer, programmer, technical
writer or other person who contributed to the Font Software.

PERMISSION & CONDITIONS
Permission is hereby granted, free of charge, to any person obtaining
a copy of the Font Software, to use, study, copy, merge, embed, modify,
redistribute, and sell modified and unmodified copies of the Font
Software, subject to the following conditions:

1) Neither the Font Software nor any of its individual components,
in Original or Modified Versions, may be sold by itself.

2) Original or Modified Versions of the Font Software may be bundled,
redistributed and/or sold with any software, provided that each copy
contains the above copyright notice and this license. These can be
included either as stand-alone text files, human-readable headers or
in the appropriate machine-readable metadata fields within text or
binary files as long as those fields can be easily viewed by the user.

3) No Modified Version of the Font Software may use the Reserved Font
Name(s) unless explicit written permission is granted by the corresponding
Copyright Holder. This restriction only applies to the primary font name as
presented to the users.

4) The name(s) of the Copyright Holder(s) or the Author(s) of the Font
Software shall not be used to promote, endorse or advertise any
Modified Version, except to acknowledge the contribution(s) of the
Copyright Holder(s) and the Author(s) or with their explicit written
permission.

5) The Font Software, modified or unmodified, in part or in whole,
must be distributed entirely under this license, and must not be
distributed under any other license. The requirement for fonts to
remain under this license does not apply to any document created
using the Font Software.

TERMINATION
This license becomes null and void if any of the above conditions are
not met.

DISCLAIMER
THE FONT SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO ANY WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT
OF COPYRIGHT, PATENT, TRADEMARK, OR OTHER RIGHT. IN NO EVENT SHALL THE
COPYRIGHT HOLDER BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
INCLUDING ANY GENERAL, SPECIAL, INDIRECT, INCIDENTAL, OR CONSEQUENTIAL
DAMAGES, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF THE USE OR INABILITY TO USE THE FONT SOFTWARE OR FROM
OTHER DEALINGS IN THE FONT SOFTWARE.

**frontend/src/reusable/CommonsButton.vue**

<!-- Reused from mit-sdg/conceptbox (MIT); see ../../third-party/Conceptbox-LICENSE. -->
<script setup lang="ts">
import { ref } from "vue";
import { api } from "../api/client.ts";
import CommonsMark from "./CommonsMark.vue";
import { useSession } from "./session.ts";

const { error } = useSession();
const working = ref(false);

async function start() {
  working.value = true;
  const result = await api.auth.commons.start();
  if ("error" in result) {
    error.value = "Commons sign-in isn't available right now. Try again.";
    working.value = false;
    return;
  }
  window.location.assign(result.address);
}
</script>

<template>
  <button type="button" class="commons-button" :disabled="working" @click="start">
    <CommonsMark :size="26" />
    {{ working ? "Opening Commons…" : "Sign in with Commons" }}
  </button>
</template>

<!-- A darker vermilion retains the study palette with readable light text. -->
<style scoped>
.commons-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 48px;
  padding: 0 var(--space-4);
  border: 0;
  border-radius: var(--radius-md);
  background: var(--action);
  color: #fefcf4;
  font-weight: 700;
}
.commons-button:hover:not(:disabled) {
  background: var(--action-hover);
}
.commons-button:focus-visible {
  outline-color: var(--blue);
}
.commons-button svg {
  border-radius: 7px;
  box-shadow: 0 0 0 1.5px rgba(254, 252, 244, 0.35);
}
</style>

**frontend/src/style.css**

@font-face {
  font-family: "Urbanist";
  src: url("./assets/fonts/Urbanist.ttf") format("truetype");
  font-style: normal;
  font-weight: 100 900;
  font-display: swap;
}
@font-face {
  font-family: "MadInk";
  src: url("./assets/fonts/MadInk.ttf") format("truetype");
  font-style: normal;
  font-weight: 400;
  font-display: swap;
}
:root {
  font-family: "Urbanist", sans-serif;
  color: #252525;
  background: #f6f2e9;
  font-synthesis: none;
  line-height: 1.55;
  --ink: #20231f;
  --paper: #f6f2e9;
  --muted: #62615d;
  --blue: #2455a4;
  --vermilion: #e74735;
  --action: #b83225;
  --action-hover: #97271d;
  --line: #d9d6ce;
  --space-3: 12px;
  --space-4: 16px;
  --radius-md: 12px;
}
* { box-sizing: border-box; }
body {
  margin: 0;
  min-width: 280px;
  background-image: radial-gradient(ellipse at 75% 18%, #e9dfc823, transparent 60%), radial-gradient(#8576500b .7px, transparent .8px);
  background-size: auto, 5px 5px;
}
button, input, textarea { font: inherit; }
button { cursor: pointer; touch-action: manipulation; }
button:disabled { cursor: wait; opacity: .58; }
a { color: inherit; }
:focus-visible { outline: 3px solid var(--blue); outline-offset: 4px; }
.sr-only, .skip { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); }
.skip:focus { left: 16px; top: 12px; width: auto; height: auto; clip-path: none; padding: 10px 16px; background: var(--ink); color: white; z-index: 10; border-radius: 8px; }
.topbar { position: relative; z-index: 1; max-width: 1380px; margin: auto; padding: 32px 64px; display: flex; justify-content: space-between; align-items: center; gap: 20px; }
.brand { display: inline-flex; align-items: flex-start; gap: 5px; font-family: "MadInk", serif; font-size: 47px; font-weight: 400; line-height: 1.1; text-decoration: none; padding: 4px 0; }
.brand-period { display: inline-block; width: 10px; height: 10px; margin-top: 10px; border-radius: 50%; background: var(--vermilion); font-size: 0; }
.account { display: flex; align-items: center; gap: 20px; color: var(--muted); font-size: 14px; min-width: 0; }
.account > span { overflow: hidden; text-overflow: ellipsis; max-width: 200px; }
.account > button { flex-shrink: 0; }
main { max-width: 1380px; margin: 12px auto 100px; padding: 0 64px; }
h1, h2 { font-family: "MadInk", serif; font-weight: 400; }
h1 { font-size: clamp(54px, 5.5vw, 76px); letter-spacing: 0; line-height: 1.13; margin: 0 0 26px; text-wrap: balance; overflow-wrap: break-word; }
h1 label { font: inherit; margin: 0; }
h2 { font-size: 39px; letter-spacing: 0; margin: 0 0 18px; line-height: 1.2; }
h3 { font-weight: 650; }
p { margin: 0; }
label { display: block; margin-bottom: 12px; font-weight: 650; }
.vermilion { color: var(--vermilion); }
.lead { color: var(--muted); font-size: 17px; line-height: 1.6; }
.workspace-composition { position: relative; display: flex; flex-direction: column; align-items: flex-start; min-height: 570px; padding: 36px 0 46px; }
.workspace-composition > :not(.workspace-collage) { position: relative; z-index: 1; width: 55%; min-width: 0; }
.workspace-composition > .mode-toggle { width: fit-content; }
.workspace-intro { padding-top: 12px; }
.intro-copy { padding: 0 0 2px; }
.workspace-collage, .welcome-collage { display: block; pointer-events: none; user-select: none; object-fit: contain; }
.workspace-collage { position: absolute; width: 49%; height: 100%; max-height: 670px; right: -32px; top: -30px; object-position: center top; }
textarea, input { display: block; width: 100%; border: 1px solid #d6cfc2; border-radius: 14px; background: #fffdf8e8; padding: 20px 22px; color: var(--ink); font-size: 17px; line-height: 1.55; box-shadow: 0 8px 26px #5e473708; }
textarea { resize: vertical; min-height: 130px; }
textarea::placeholder, input::placeholder { color: #73716a; opacity: 1; }
textarea:disabled, input:disabled { background: #efede6; }
.button { display: inline-flex; justify-content: center; align-items: center; min-height: 48px; border: 0; border-radius: 100px; padding: 11px 28px; font-weight: 700; font-size: 15px; }
.primary { background: var(--action); color: white; }
.primary:hover:not(:disabled) { background: var(--action-hover); }
.text-button { min-height: 44px; background: none; border: 0; color: var(--blue); padding: 9px 2px; font-size: 14px; font-weight: 650; line-height: 1.45; }
.text-button:hover:not(:disabled) { text-decoration: underline; text-underline-offset: 4px; }
.form-actions { display: flex; align-items: center; flex-wrap: wrap; gap: 12px 28px; margin-top: 20px; }
.mode-toggle { display: flex; width: fit-content; padding: 4px; margin: 2px 0 24px; border: 1px solid var(--line); border-radius: 100px; background: #eee8dd; gap: 3px; }
.mode-toggle button { min-width: 112px; min-height: 42px; padding: 8px 22px; border: 0; border-radius: 100px; color: #5a5954; background: transparent; font-size: 14px; font-weight: 650; }
.mode-toggle button[aria-pressed="true"] { background: var(--blue); color: #fffefa; box-shadow: 0 2px 5px #25252512; }
.mode-toggle button:hover:not([aria-pressed="true"]) { color: var(--blue); background: #e7e5de; }
.memory-form fieldset { border: 0; margin: 0; padding: 0; min-width: 0; }
.field-pair { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.memory-form label { margin-bottom: 7px; font-size: 14px; }
.memory-form input { margin-bottom: 19px; }
.required { font-weight: 400; color: var(--muted); }
.refusal { color: #9f2e23; margin: 14px 0; padding: 13px 16px; border-left: 3px solid var(--action); border-radius: 0 8px 8px 0; background: #f9dfd866; font-size: 15px; overflow-wrap: anywhere; }
.status { color: var(--blue); margin-bottom: 18px; font-size: 15px; }
.hint { color: var(--muted); font-size: 14px; line-height: 1.6; font-weight: 450; }
.capture-hint { margin-top: 12px; max-width: 650px; }
.results { margin-top: 40px; }
.person { padding: 27px 0 24px; border-top: 1px solid var(--line); }
.person h2 { font-family: "Urbanist", sans-serif; font-weight: 650; overflow-wrap: anywhere; font-size: 27px; margin: 4px 0 12px; }
.person > .hint:first-child { font-size: 12px; margin-bottom: 8px; }
.memory-details { margin: 0; font-size: 15px; }
.memory-details div { display: grid; grid-template-columns: 78px minmax(0, 1fr); gap: 16px; margin-top: 8px; }
.memory-details dt { color: var(--muted); }
.memory-details dd { margin: 0; color: var(--ink); overflow-wrap: anywhere; }
details { margin-top: 17px; font-size: 14px; color: var(--muted); }
summary { cursor: pointer; width: fit-content; min-height: 36px; padding: 7px 0; color: var(--blue); font-weight: 600; }
summary:hover { text-decoration: underline; text-underline-offset: 4px; }
blockquote { white-space: pre-wrap; overflow-wrap: anywhere; margin: 12px 0 0; padding: 10px 0 10px 18px; border-left: 2px solid #b6c8e2; color: #4d4c47; line-height: 1.7; }
.sign-in { position: relative; display: grid; grid-template-columns: minmax(0, 1.03fr) minmax(0, 1fr); align-items: center; gap: 0; min-height: 680px; margin: 12px auto 40px; }
.sign-in-copy { position: relative; z-index: 1; align-self: start; padding: 60px 0 70px; }
.sign-in h1 { font-size: clamp(52px, 4.5vw, 68px); letter-spacing: 0; line-height: 1.14; margin: 12px 0 24px; }
.sign-in .lead { max-width: 390px; }
.sign-in .commons-button { width: fit-content; min-width: 250px; border-radius: 100px; margin-top: 30px; }
.welcome-collage { width: calc(100% + 40px); height: 710px; margin-left: -8px; object-position: center; }
.form-card { display: flex; flex-direction: column; gap: 22px; max-width: 460px; margin: 64px auto; padding: 30px; border: 1px solid var(--line); border-radius: 20px; background: #fffefa; }
.form-card h1 { font-size: 44px; }
.field { display: flex; flex-direction: column; gap: 8px; }
.recent-people { margin-top: 58px; padding-top: 28px; border-top: 1px solid var(--line); }
.recent-heading { margin-bottom: 20px; }
.recent-person { border: 1px solid var(--line); border-radius: 17px; padding: 24px 26px 16px; margin-top: 14px; min-width: 0; background: #fffefa; }
.recent-person h3 { margin: 0 0 13px; font-size: 23px; letter-spacing: -.5px; overflow-wrap: anywhere; }
.recent-person .memory-details dd { display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; overflow: hidden; }
.recent-actions { display: flex; justify-content: center; margin-top: 20px; }
.ongoing { margin-top: 35px; }
.ongoing h2 { font-family: "Urbanist", sans-serif; font-size: 13px; color: var(--muted); letter-spacing: .8px; text-transform: uppercase; font-weight: 700; }
.need-row { display: flex; align-items: baseline; flex-wrap: wrap; gap: 5px 22px; padding: 10px 0; border-bottom: 1px solid var(--line); }
.need-label { flex: 1; text-align: left; overflow-wrap: anywhere; min-width: 140px; font-size: 16px; font-weight: 550; }
.need-label[aria-pressed="true"] { font-weight: 750; color: var(--ink); }
.resolved-action { font-size: 12px; border: 1px solid #c9d7e7; border-radius: 100px; padding: 7px 14px; min-height: 36px; }
.resolved-action:hover:not(:disabled) { background: #dce7f3; text-decoration: none; }
.need-options { margin: 0; }
.need-options summary { padding: 8px 0; font-size: 12px; }
.all-searches { margin-left: 24px; }
.inline-edit, .confirm { flex-basis: 100%; }
.small-actions { display: flex; align-items: center; flex-wrap: wrap; gap: 4px 24px; margin-top: 8px; }
.confirm { font-size: 14px; background: #f9dfd880; padding: 14px 18px; border-radius: 12px; margin-top: 10px; color: var(--ink); }
.confirm .text-button { margin-left: 12px; }
.suggestion-reason { font-size: 17px; line-height: 1.7; }
.uncertainty { margin-top: 8px; }
.source-proof { margin-top: 18px; }
.source-proof > details { margin-left: 18px; }
.inspection { margin-top: 38px; padding: 28px; border: 1px solid #b7c9e1; border-radius: 18px; background: #edf2f8; }
.section-heading { display: flex; justify-content: space-between; align-items: center; gap: 16px; }
.section-heading h2 { margin: 0; }
.inspection blockquote { margin-bottom: 12px; }
.claim-row { margin-top: 16px; padding-top: 16px; border-top: 1px solid #cbd7e6; }
.claim-row p { overflow-wrap: anywhere; }
.note-preview { overflow: hidden; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 3; white-space: pre-wrap; overflow-wrap: anywhere; font-size: 15px; }
.inspection textarea { font-size: 16px; }
@media (max-width: 1000px) {
  .topbar { padding: 26px 40px; }
  main { padding: 0 40px; }
  .sign-in { min-height: 600px; }
  .sign-in h1 { font-size: 54px; }
  .sign-in-copy { padding-top: 30px; }
  .welcome-collage { height: 610px; width: calc(100% + 24px); }
  .workspace-composition { min-height: 530px; }
  .workspace-composition h1 { font-size: 60px; }
  .workspace-collage { width: 46%; right: -20px; }
  .lead { font-size: 16px; }
}
@media (max-width: 720px) {
  .topbar { padding: 24px 28px; }
  main { padding: 0 28px; margin-top: 4px; }
  .brand { font-size: 43px; }
  .sign-in { grid-template-columns: minmax(0, 1fr) minmax(0, .9fr); min-height: 520px; }
  .sign-in h1 { font-size: 48px; }
  .sign-in-copy { padding-bottom: 30px; }
  .welcome-collage { height: 500px; }
  .sign-in .commons-button { min-width: 0; padding-inline: 20px; }
  .workspace-composition > :not(.workspace-collage) { width: 59%; }
  .workspace-composition > .mode-toggle { width: fit-content; }
  .workspace-composition h1 { font-size: 50px; }
  .workspace-collage { width: 41%; right: -18px; top: 0; }
}
@media (max-width: 580px) {
  .topbar { padding: 22px 22px 14px; gap: 10px; }
  main { padding: 0 22px; margin-bottom: 65px; }
  .brand { font-size: 40px; }
  .brand-period { width: 8px; height: 8px; margin-top: 8px; }
  .account { gap: 12px; font-size: 12px; }
  .account > span { max-width: 95px; }
  .account .text-button { font-size: 12px; }
  .sign-in { display: flex; flex-direction: column; align-items: stretch; margin-top: 26px; min-height: 0; }
  .sign-in h1 { font-size: clamp(50px, 11vw, 64px); }
  .sign-in-copy { padding: 0 0 4px; }
  .sign-in .commons-button { min-width: 250px; margin-top: 24px; }
  .welcome-collage { align-self: center; width: 100%; height: 410px; margin: 8px 0 0; object-position: center; }
  .workspace-composition { display: grid; grid-template-columns: minmax(0, 1fr) 130px; align-items: center; column-gap: 4px; min-height: 0; padding: 10px 0 28px; }
  .workspace-composition > :not(.workspace-collage) { width: 100%; grid-column: 1 / -1; }
  .workspace-composition > .workspace-intro { grid-column: 1; grid-row: 1; padding-top: 12px; }
  .workspace-composition h1 { font-size: 45px; margin-bottom: 18px; line-height: 1.16; text-wrap: initial; }
  .workspace-collage { position: static; grid-column: 2; grid-row: 1; width: 145px; height: 240px; max-height: none; object-fit: cover; object-position: 47% center; }
  .workspace-composition > .mode-toggle { width: fit-content; margin-top: 14px; margin-bottom: 22px; }
  summary, .resolved-action, .mode-toggle button { min-height: 44px; }
  textarea, input { padding: 16px; font-size: 16px; }
  .form-actions { gap: 8px 22px; }
  .field-pair { grid-template-columns: 1fr; gap: 0; }
  .inspection { padding: 22px 18px; }
  .section-heading { align-items: flex-start; gap: 12px; }
  .section-heading h2 { font-size: 34px; }
  .need-row { column-gap: 12px; }
  .need-label { min-width: 150px; }
  .recent-person { padding: 21px 20px 12px; }
  .recent-people { margin-top: 34px; }
  .ongoing { margin-top: 12px; }
  .form-card { padding: 24px 20px; }
  .form-card h1 { font-size: 40px; }
}
@media (max-width: 360px) {
  .workspace-composition { grid-template-columns: minmax(0, 1fr) 100px; }
  .workspace-collage { width: 110px; height: 220px; }
  .workspace-composition h1 { font-size: 39px; }
  .account > span { max-width: 64px; }
  .mode-toggle button { min-width: 100px; padding-inline: 16px; }
  .sign-in .commons-button { min-width: 0; width: 100%; }
  .welcome-collage { height: 340px; }
}
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { scroll-behavior: auto !important; }
}

# Result

Unless the task requests another format, use these prior fields: `## Verdict`, `## Assessments`, `## Findings`.
