# Role and objective

Work unit `name-evidence-fix`; role `critic`; phase `contracts`.

# Contract critic

Independently review the complete changed contract set after authored syntax validation. Use the brief, affected approved contracts, and supplied decomposition as authority.

Check scope, sole mechanism ownership, opaque peer identities, action success and refusal state, repetition, lifecycle, query cardinality and ordering, authorization enforcement, effect ownership, acknowledgement order, and recoverable obligations.

Record one compact assessment row per affected obligation covering trigger, closing reaction, visible success, false interval, acknowledgement order, retry identity, whether the owner accepts that identity, recovery action, and duplicate-effect risk. Inventory selected endpoints, internal reactions, views, formers, computations, links, and endpoint paths. Check that every derived value or optional-input branch implied by the prose has exactly one declared computation and that no computation depends on concept state.

Missing authority, bypassable authorization, duplicate ownership, unrecoverable required work, or behavior required for visible success/refusal is a blocker. When the brief or decomposition requires endpoints, links, or cross-concept behavior, the absence of an application contract in supplied or granted design is a blocker. Return a `Blocked` verdict for that absence, not `Approve` with a note. Give other consequential mismatches stable material-finding IDs. Ignore naming polish, parser mechanics, implementation staging, and unrelated pre-existing issues.

Do not edit design, prescribe implementation, or infer missing context.

# Access

Root: "/private/tmp/circle-private-brain/code". The short native message explicitly authorizes reading this prompt file; all assignment context is inline below. This is already a compiled role assignment: do not load a skill, workflow, harness guide, or another instruction file.

- Read: `design:compositions` ("/private/tmp/circle-private-brain/code/design/compositions"), `design:concepts` ("/private/tmp/circle-private-brain/code/design/concepts"), `design:types.md` ("/private/tmp/circle-private-brain/code/design/types.md").
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

**.sync-engine/work/name-evidence-fix/review-task.md**

Review the scoped Graphing/Circle clarifications against the brief: canonical full name evidence, literal Does activity versus discussion, optional date, equal text/voice controls. Existing boundaries, per-user isolation and strict full fact evidence must remain intact. Read only, report actionable semantic defects.

## Brief

**.sync-engine/work/name-evidence-fix/brief.md**

# Repair short-note organization and equal text/voice controls

## Goal
Fix two reported failures: “I met David Hume who talks about philosophy.” and “david who does papers”. Valid notes need no date. Preserve existing saved originals and retry identity. Make Text and Voice equally prominent in Remember, drawing on P3 controls without its deferred functions.

## Active decisions
- Reproduced first model output: correct literal name David Hume, nameQuote only David Hume; complete fact quotes. Existing validator rejected a partial name quote and faulted the card. Canonicalize literal name evidence to an enclosing complete source sentence/line before storage; fact quote validation stays strict. Never fabricate names/facts or suppress real faults.
- Explicit stated habitual activity belongs in Does, retaining literal wording. A conversation between the user and contact remains Discussed; neither implies expertise/employment. No inferred occupation for vague papers, philosophy or historical names. No required or invented encounter date.
- Text/Voice selector has equal visual controls. Voice has explicit start/stop/cancel and returns editable text before deliberate Save. Switching cancels pending voice and preserves typed draft; account/privacy guards remain.
- Existing design boundaries and routes remain unchanged. Coordinator implements; independent contract critic reviews scoped clarifications. Final tests include captured model-output regressions, exact notes with real provider, saved-token retry and UI browser validation. Only disposable MongoDB for tests; no private-note dumps.

## Done when
- Both exact notes organize with literal names/Does details and no date requirement; invalid/fabricated facts still reject.
- Same-token retry of failed organization keeps one original and succeeds; per-user isolation and removal guards pass.
- Text/Voice equal controls work, voice cancellation remains guarded and draft survives mode changes.
- Specs, generated artifacts, typechecks, relevant/full tests and local browser agree; restart localhost and recover the existing draft without creating another contact.

## Activity
- Reproduced Hume output and located nameQuote validator mismatch; second exact-note reproduction underway.

## Changed candidate contracts

**design/compositions/Circle.md**

# Circle

All protected reads and effects use Sessioning.use from the host-injected session. Request bodies cannot select owner, arbitrary index sources or credentials. Missing/expired sessions refuse NOT_SIGNED_IN (public UNAUTHORIZED); malformed or extra inputs refuse INVALID_REQUEST. Concepts keep independent mechanisms; no direct peer calls.

The [owned original](view:Circle.OwnedMemory) reads Remembering._get for owner and memory; missing/removed/foreign originals have no row. The [saved encounters](former:Circle.SavedMemories) preserves Remembering._list order and joins Graphing._card under the same owner and exact original content. Each row contains memory, original content and a nullable structured card, so failed organization still leaves the original visible. Read/list never calls a model. The [list endpoint](reaction:Circle.ListMemories) authenticates and accepts only after. Twenty rows plus one lookahead retain cursor paging. Separate same-name encounters stay separate.

The [remember endpoint](reaction:Circle.Remember) accepts free-form content and a UUID submission token, authenticates, saves the exact original with the engine-supplied capturedAt, then reads it back through OwnedMemory and calls Graphing.ingest on that identity/content. Success returns memory only after strict JSON organization succeeds. Extraction uses this one note, never another user's memory. Source ownership, digest/version caching, literal quote validation and withdrawal guards belong to Graphing. Repeating the unchanged draft/token reuses the original and already-current extraction; changed text under the token or a removed token refuses SUBMISSION_CONFLICT (public CONFLICT). Blank text refuses EMPTY_CONTENT. A provider error after saving preserves the original, refreshes its visible row and retains the token for deliberate retry; no rollback or hidden local fallback. Graphing's ownership reservation may remain after failed extraction, without replacing prior valid facts.

The [transcription endpoint](reaction:Circle.Transcribe) accepts only bounded base64 audio and a supported media type plus the host session. It authenticates before Remembering.transcribe, and responds with content. INVALID_AUDIO means unsupported/malformed/oversized recording. Provider faults remain opaque errors. No recording is stored or added to a memory automatically. Text and voice share one editable draft; switching modes, cancellation, account changes and unmount stop microphone tracks and invalidate late transcription. Voice is bounded to two minutes or 4 MiB. Saving remains explicit.

The [seek endpoint](reaction:Circle.Seek) authenticates, saves the need through Seeking, then reads Remembering._corpus for that owner and passes its JSON notes to Graphing.recall. The corpus comes only from this owned query, never from the request or a client-supplied user. Missing/outdated records for existing owned notes are organized as part of this explicit search; the process is bounded and may preserve completed organization if a later provider call fails. Graphing refuses MEMORY_LIMIT (public INVALID_REQUEST) above 256 notes or 256 KiB of original corpus before effects or provider calls. A structured corpus above 256 KiB discovered after organization raises an ordinary processing error before selection; completed organization remains for manual retry. No partial or truncated corpus is sent to selection. Recall uses a server-owned JSON memory assembled only from this corpus; requests use store:false, no remote conversation/response continuation, strict schemas, a configurable pinned model and deterministic first-writer caching. Stable query+corpus+provider version reuses the stored validated selection. A changed or added contact changes the corpus identity for the next search. There is no global memory, cross-user retrieval, identity merging or cross-note fact transfer.

The [need results](former:Circle.NeedResults) reads Seeking._get under owner/need and Graphing._matches under owner/recall. Every match is joined again with OwnedMemory before returning its source, target, stored label, server-composed reason, stored structured card and exact original. A model can select only validated owned source IDs and fact indexes; it cannot supply the card or arbitrary database content. Missing/removed/unreadable/changed sources are omitted. Empty matches return an empty suggestions list. Results preserve the validated stored order. This final join also blocks a removed card from an in-flight selection. Model interpretation can still be wrong; semantic relevance is not asserted as a mathematical guarantee.

Find failure after saving preserves the need and all originals; manual retry starts a new explicit search. There is no automatic provider retry or silent local matching fallback. New model requests never include notes outside the authenticated owner's current corpus. A request already sent while an encounter existed cannot be unsent; deletion prevents its result from recreating a card. Provider credentials, private originals, corpus, audio, cards and model output are redacted from engine traces and never placed in frontend configuration.

The [forget endpoint](reaction:Circle.Forget) accepts memory and the host session. It authenticates, calls Remembering.forget, then Graphing.withdraw, acknowledging success after both finish. Missing and foreign originals share MEMORY_NOT_FOUND (public NOT_FOUND). The original is erased first; during the false interval its missing owned read hides old graph results. If withdrawal fails, return an error and retain Retry removal for the same identity. Repeated owned forget/withdraw succeed. Original and graph markers block stale save/ingest resurrection. Withdrawal also erases per-user search selection caches. Other same-name sources and all other owners remain unchanged; no cross-concept rollback is promised.

Contact rows are plain white and show the structured stored name, falling back conservatively for older/unorganized originals. Expanded rows show systematized literal facts, the exact original and, for results, supported reasons. A separately labeled red basket at top right opens a confirmation naming that encounter. Cancel/Escape makes no request, starts focus on Cancel and restores it to the basket. Only Remove starts deletion; repeated confirmation cannot submit twice and account changes dismiss it. The same row component is used for Recent people and Find. Original text remains available if no name/facts can be supported.

The Remember surface uses equally prominent Text and Voice selectors with the P3 compact entry design. Voice has explicit start/stop/cancel and returns to the editable text draft for review. Switching input choice preserves the draft and cancels any pending recording/transcript. It keeps current Urbanist/Handlee, hover-only dancing artwork and a centered deliberate Save control. There are no guided-field entry requirements or automatic audio saves. Pending save/search/removal/transcription are mutually guarded in handlers and controls. Mode changes preserve a typed draft while cancelling voice; account changes clear draft/results/confirmation/retries and invalidate late requests. Removing a source invalidates old list replies and clears all displayed suggestions for that source before refreshing the list without a page reload.

```endpoints
Circle.Remember at /memories/remember
Circle.Seek at /needs/seek
Circle.ListMemories at /memories/list
Circle.Transcribe at /memories/transcribe
Circle.Forget at /memories/forget
```

**design/concepts/Graphing.md**

# Graphing

## Purpose

Organize encounter evidence into private structured contact memory and retrieve relevant saved sources from it.

## Principle

After a user records a note about Mira and ocean sensors, ingest preserves a structured JSON card whose facts quote that note. Recall can select Mira for a relevant need using only this user's contact memory. Repeating the same need against unchanged memory reuses the selected sources. Withdrawing a source erases its contact evidence and prevents old ingestion or cached selections from bringing it back.

## Types

```types
external User
external Source
opaque ContactCard
opaque Selection
```

## State

```state
a set of Sources with
  an owner User
  an optional digest String
  an optional providerVersion String
  an optional card ContactCard

a set of Withdrawn Sources

a set of Recalls with
  an owner User
  a corpusDigest String
  a selection Selection

Rule: source owner is immutable, including while extraction is pending or failed. Sources never share a contact identity merely by matching names.
Rule: ContactCard is validated JSON containing one primary name and nameQuote (both nullable), and at most 32 facts with kind, value and quote. Kinds are context, role, discussion, contact, offer and other. Names/values are literal source text; quotes are complete supporting source sentences or guided lines. Unsupported, negated and ambiguous claims are omitted, never invented. Null name is valid. A literal partial nameQuote may be deterministically expanded to its complete enclosing original sentence or line before validation/storage; no model words are added. Fact quotes still must be complete. Explicit habitual activity uses role/Does with literal wording; a conversation with the user uses discussion/Discussed. Vague activity never implies a more specific occupation or expertise. Encounter date is optional and never invented.
Rule: digest identifies the exact original content. Provider version identifies the extraction/search schema, prompt and configured model. Source-local JSON is the durable memory; there is no shared external conversation, remote thread or provider-held per-user memory.
Rule: selection stores only source identities, their exact record digests and fact indexes, never original text or generated card content. Recall identity derives from owner, normalized query, complete ordered corpus and provider version. Concurrent equivalent recalls use the first validated stored selection.
Rule: Withdrawn sources retain only owner and identity/classification. They have no card, digest, facts, quotes or labels. Withdrawal also erases the owner's cached recalls. Reads always include owner in their database query.
```

## Actions

```actions
ingest(owner: User, source: Source, content: String) : returns ()
  where content is blank
  then
    refuses EMPTY_SOURCE_CONTENT "Source content must not be blank."
  where source is present and its owner differs from owner
  then
    refuses SOURCE_NOT_OWNED "The source belongs to another user."
  where source is in Withdrawn and source.owner is owner
  then
    refuses SOURCE_WITHDRAWN "The source was withdrawn."
  where source is absent or belongs to owner outside Withdrawn, and content is not blank
  then
    reserve source ownership without changing existing evidence
    if content digest and provider version are already current, return without another model call
    otherwise request strict structured extraction for this original only, treating note text as untrusted data
    validate names, exact values, full quotes, kinds, limits and schema before atomically replacing this source's JSON
    commit only if source remains owned and not withdrawn; concurrent equivalent extraction reuses the first committed record
    leave the original outside this concept unchanged; provider faults keep any previous valid evidence and the ownership reservation, return an error and never silently retry or use a local fallback
    returns

recall(owner: User, description: String, notes: String) : returns (recall: Recall)
  where description is blank
  then
    refuses EMPTY_QUERY "Describe the search first."
  where notes exceeds the complete-memory bounds or is not a valid original-note corpus
  then
    refuses MEMORY_LIMIT "Contact memory exceeds the supported search limit."
  where description is not blank and notes is a valid bounded corpus
  then
    parse the supplied JSON list of source identities and exact originals, supplied by the application for this owner
    enforce at most 256 originals and 256 KiB of original corpus, refusing before provider calls or state changes rather than silently truncating
    ingest missing or outdated owned records using the same validation and source guards; this makes older owned originals available without a global migration
    build a canonical complete JSON memory for only these source identities, excluding withdrawn or digest-mismatched records
    if structured memory exceeds 256 KiB after organization, raise an ordinary processing error before selection; retain completed organization and permit manual retry, never emit the no-effect MEMORY_LIMIT refusal at this late stage
    reuse an existing equivalent owned recall without a model call
    otherwise ask the model for at most five source identities and supporting fact indexes; no account identity, credentials, other-user notes or external conversation state is sent
    validate every chosen identity and index against the supplied memory, reject duplicates or invented choices, and verify source versions again before storing only the selection
    require explicit offer evidence for hiring; discussion never proves employment or expertise; name-only matches require literal name support
    order validated matches by relevance selection order then stable source identity, and preserve stored order on repeats
    produce an empty selection for an empty corpus without a model call
    provider faults preserve saved originals, successfully organized records and the saved need; return an error with manual retry, never fallback or fabricated cards
    returns recall

withdraw(owner: User, source: Source) : returns ()
  where source is present and its owner differs from owner
  then
    refuses SOURCE_NOT_OWNED "The source belongs to another user."
  where source is absent or belongs to owner
  then
    retain only source identity and owner and classify it as Withdrawn
    erase all of its contact JSON and evidence, and erase the owner's cached recalls
    keep withdrawal durable so delayed ingestion cannot recreate evidence
    repeated withdrawal succeeds; a downstream failure may be manually retried with the same source
    returns
```

## Queries

```queries
_card(owner: User, source: Source, content: String) : one (card: ContactCard)
  Return the validated contact JSON only if the source belongs to owner, is not withdrawn and matches the exact content digest. Otherwise return card as null. No model call or state change.

_matches(owner: User, recall: Recall) : many (target: Source, label: String, source: Source, reason: String, card: ContactCard)
  Read only the owned recall and owned current sources referenced by it. Omit withdrawn, missing or version/digest-mismatched sources.
  Return the real source identity as target/source, stored name or Unnamed encounter as label, its validated card and a deterministic reason assembled from the selected literal facts/quotes. Never return a model-authored card.
  Preserve the stored selection order. Unknown/foreign recalls, erased recalls and empty selections return no rows. No external calls or state changes.
```

# Result

Unless the task requests another format, return these headings in order. Omit progress narration.

- `## Verdict` — required. First line is exactly `Approve`, `Revise`, or `Blocked`.
- `## Assessments` — required. Compact obligation-by-obligation semantic assessment; do not restate contracts.
- `## Findings` — required. Stable-ID blocker or material findings, or none.
