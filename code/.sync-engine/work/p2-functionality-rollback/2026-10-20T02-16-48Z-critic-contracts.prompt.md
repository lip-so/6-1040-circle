# Role and objective

Work unit `p2-functionality-rollback`; role `critic`; phase `contracts`.

# Contract critic

Independently review the complete changed contract set after authored syntax validation. Use the brief, affected approved contracts, and supplied decomposition as authority.

Check scope, sole mechanism ownership, opaque peer identities, action success and refusal state, repetition, lifecycle, query cardinality and ordering, authorization enforcement, effect ownership, acknowledgement order, and recoverable obligations.

Record one compact assessment row per affected obligation covering trigger, closing reaction, visible success, false interval, acknowledgement order, retry identity, whether the owner accepts that identity, recovery action, and duplicate-effect risk. Inventory selected endpoints, internal reactions, views, formers, computations, links, and endpoint paths. Check that every derived value or optional-input branch implied by the prose has exactly one declared computation and that no computation depends on concept state.

Missing authority, bypassable authorization, duplicate ownership, unrecoverable required work, or behavior required for visible success/refusal is a blocker. When the brief or decomposition requires endpoints, links, or cross-concept behavior, the absence of an application contract in supplied or granted design is a blocker. Return a `Blocked` verdict for that absence, not `Approve` with a note. Give other consequential mismatches stable material-finding IDs. Ignore naming polish, parser mechanics, implementation staging, and unrelated pre-existing issues.

Do not edit design, prescribe implementation, or infer missing context.

# Access

Root: "/private/tmp/circle-p2-rollback/code". The short native message explicitly authorizes reading this prompt file; all assignment context is inline below. This is already a compiled role assignment: do not load a skill, workflow, harness guide, or another instruction file.

- Read: `design:compositions` ("/private/tmp/circle-p2-rollback/code/design/compositions"), `design:concepts` ("/private/tmp/circle-p2-rollback/code/design/concepts"), `design:types.md` ("/private/tmp/circle-p2-rollback/code/design/types.md").
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

**.sync-engine/work/p2-functionality-rollback/review-task.md**

Review the restored P2 contracts for the user's explicit rollback. The canonical files are restored byte for byte from the accepted latest P2 commit 6d6b431. Confirm the six-concept registration inventory, Commons ownership boundaries, local save/ingest/read/search ordering, saved-data/retry behavior, and absent Connecting/lifecycle/voice/provider surfaces. No new behavior or contract design is requested. Review only the supplied contracts. Return Verdict: Approve, Revise, or Blocked with evidence and limitations. This is a coordinator simulation and is not an independent review.

## Brief

**.sync-engine/work/p2-functionality-rollback/brief.md**

# Restore P2 functionality and retain current visuals

## Goal
Restore behavior from commit 6d6b431, retaining current artwork, colors and fonts.

## Scope
Exact P2 backend, authored contracts, tests, package configuration and guided field serialization. Frontend uses the P2 script and data with presentational wrappers only. Keep existing notes and environment untouched.

## Requirements
Commons sign-in, guided save with only person required, retry safety, owned recent encounters and immediate local Find results. No P3 endpoints, LLM/external model providers, voice, note editing/deletion, search lifecycle, Connecting or exclusions.

## Active decisions
- Explicit user rollback supersedes earlier P3 scope in repository notes.
- Restore the accepted P2 contracts directly; no new product decomposition.
- Coordinator performs implementation and simulated contract review. Review is not independent; no delegation requested for this mechanical baseline restoration.
- Validate in an isolated copy before guarded application to the original checkout. Keep historical journal, personal journal, original visual references, and existing workflow artifacts.
- Restore P2 dependencies exactly after workflow handback; the workflow tool remains available in existing development installations.

## Done when
- Backend source and design match 6d6b431 byte for byte; generated contracts agree.
- Guided save, local search and ownership/retry regression tests pass.
- No P3 provider or lifecycle endpoints remain in generated public interface or frontend consumers.
- Existing visuals and fonts remain, and guided fields/cards display on desktop and phone.
- Type checks, production build and relevant tests pass; report limitations.

## Open questions
None.

## Activity
- Isolated current checkout, identified latest P2 commit, restored accepted baseline and applied visual-only frontend wrappers.

## Changed candidate contracts

**design/compositions/Circle.md**

# Circle

All reads use the user returned by `Sessioning.use` for the browser session. A request cannot supply an owner
or ask Graphing to index an arbitrary source identity.

The [saved memories](former:Circle.SavedMemories) read `Remembering._list` directly,
preserving its order. The [list endpoint](reaction:Circle.ListMemories) authenticates
first and supplies that owner. It accepts only a cursor, never a user identity.
It returns at most 21 memories: 20 visible encounters and one lookahead row for
Load more. A cursor is resolved only within that owner's notes. Pagination never
loads another user's data and remains stable when newer notes arrive.

The [owned-memory view](view:Circle.OwnedMemory) reads a note through
`Remembering._get(owner, memory)`. Ownership is part of the database query;
the view does not load another owner's note and filter its content afterward.

The [need results](former:Circle.NeedResults) first read the owner's saved need
through `Seeking._get`, then read `Graphing._trace` with that same owner. Each
suggestion contains the person's target identity, label, source identity,
explanation, and original note content. It includes a suggestion only when the
owned-memory view can read the source under that same owner. Missing or
unreadable source notes are omitted, as agreed. No matches gives an empty list.
The trace query's ordering is preserved.

The [remember endpoint](reaction:Circle.Remember) resolves the session first,
saves the note, then reads the saved note through the owned-memory view before
passing its returned memory identity and exact content to Graphing. The browser
supplies content and a UUID submission token; it cannot supply an owner, timestamp,
or source to index. The engine's `now(capturedAt)` supplies the save time, independently
of the user's free-text encounter date. The request
returns the memory identity after indexing succeeds, so an immediately following
search can use it.

The frontend retains a submission token when retrying the same draft after a
lost response or indexing failure. Remembering atomically reuses the existing
memory for that owner and token; a conflicting text is refused. A retry may run
indexing again for that same source, without duplicating the original note.
New successful saves and edited drafts get new tokens. There is no automatic retry.

The [seek endpoint](reaction:Circle.Seek) resolves the session, saves the need
for that user, then forms its results under the same user. It accepts only the
need description. The response contains `results` with the need, description,
and suggestions described above.

Both write endpoints require a valid session before saving anything. Extra request
fields, including owner and source, are refused. Blank text uses the concept's
specified refusal. If indexing or forming results fails after saving, the saved
note or need stays in MongoDB and the request returns an error, as agreed.
There is no rollback or automatic retry.

The Recent people section uses one card per memory, as chosen. Two different
people with the same name, or repeated encounters with one person, remain separate.
Cards show recorded context and an expandable original note; old unparsed notes
use “Saved encounter” rather than a guessed person. Optional fields remain optional.
Long labels wrap and previews are limited to two lines; the complete note stays
available. The optional Contact field accepts a phone number, LinkedIn URL, or
other contact text and is shown on saved and matching cards. It stays in the
owner's original memo, using the existing content API; old four-field memos
remain readable. Contact values are displayed as text, without guessing phone
formats or interpreting arbitrary text as executable links. Edit, delete, and
automatic identity-merging features remain deferred.

The list distinguishes loading, a failed request with Retry, and a genuinely empty
account. It refreshes after save attempts, so a saved note remains visible when
indexing failed, and on returning to the tab after rechecking the account.
Account changes and sign-out clear displayed data and invalidate pending replies.
An older response cannot repopulate cleared data or replace a newer list request.
This protects the UI; it does not cancel a backend action already accepted.

```endpoints
Circle.Remember at /memories/remember
Circle.Seek at /needs/seek
Circle.ListMemories at /memories/list
```

**design/concepts/Graphing.md**

# Graphing

## Purpose

Make relationships in saved accounts retrievable together with the evidence supporting them.

## Principle

If a source reports that a user met a person who works on AI hardware and discussed systems engineering, tracing a need for systems engineering work can return that person, an explanation, and the supporting source.

## Types

```types
external User
external Source

EntityKind is SELF or PERSON or ORGANIZATION or TOPIC or OPPORTUNITY
RelationKind is MET or KNOWS or MEMBER_OF or WORKS_ON or RESEARCHES or INTERNED_AT or OFFERS or SOMETIMES_HOSTS or BASED_IN or DISCUSSED or FOUNDED or DESCRIBED_AS
```

## State

```state
a set of Sources with
  an owner User

a set of Entities with
  an owner User
  a kind EntityKind
  a label String

a set of Claims with
  an owner User
  a from Entity
  a relation RelationKind
  a to Entity
  a source Source
  a quote String
```

## Actions

```actions
ingest(owner: User, source: Source, content: String) : returns ()
  where content is blank (empty or whitespace-only)
  then
    refuses EMPTY_SOURCE_CONTENT "Source content must not be blank."
  where content is not blank and source is in Sources and source.owner is not owner
  then
    refuses SOURCE_NOT_OWNED "The source belongs to another user."
  where content is not blank and (source is not in Sources or source.owner is owner)
  then
    add source to Sources with owner if it is not already present
    replace the claims for source with claims supported by content
    create or reuse entities for owner, keeping ambiguous identities separate
    give every new claim owner, source, and a supporting quote from content
    use DISCUSSED for conversational topics and FOUNDED for founding a company; do not treat either as employment or expertise
    for the local MVP, recognize one named person per note using introductions or a named profile, with positive affiliation, work, research, discussion, and offer statements
    also recognize guided memories containing Person, When, Does, and Discussed fields; take the explicit person name as written, record Does as DESCRIBED_AS and Discussed as DISCUSSED, and keep When as source context without treating it as a subject relationship
    optional Contact text stays in the supporting source; do not create relationships or searchable subject terms from phone numbers or profile URLs
    do not infer employment or expertise from a discussion; leave a negated Does or Discussed field unindexed
    leave unsupported or negated relationship statements unindexed
    returns
```

## Queries

```queries
_trace(owner: User, description: String) : many (target: Entity, label: String, source: Source, reason: String)
  Return people relevant to description, using only owner's entities and claims.
  Each row identifies a person, their label, one supporting source, and an explanation justified by that source's claims.
  Match normalized subject terms within one source at a time, including supported aliases such as engineer/engineering and artificial intelligence/AI.
  Require all substantive search terms to match that source's entity labels or explicit research relationships. Hiring searches require an explicit positive hiring statement.
  Combining paths across sources and interpreting negative search requirements are deferred; return no rows for negative queries.
  Do not invent relationships or imply an opportunity exists when the source only establishes relevance.
  Return one row per matching person and source, ordered by label, target identity, and source identity.
  Return no rows for a blank description or no supported match.
```

**design/concepts/Remembering.md**

# Remembering

## Purpose

Prevent the context of an encounter from being lost before the user has a reason to revisit it.

## Principle

If a user records an encounter in their own words, they can later retrieve that account and recover what they discussed, even if they did not classify the encounter when recording it.

## Types

```types
external User
```

## State

```state
a set of Memories with
  an owner User
  a content String
  an optional capturedAt DateTime

Rule: new memories use an identity derived from owner and submission. Names and note text are not identities. A different submission creates a separate encounter, even for the same person or the same text.
Rule: older memories may have no capturedAt; do not invent their save times.
Rule: guided memo content may include optional contact information such as a phone number or LinkedIn URL. Keep it with the original account; existing memories without it remain valid.
```

## Actions

```actions
remember(owner: User, content: String, submission: String, capturedAt: DateTime) : returns (memory: Memory)
  where content is blank (empty or whitespace-only)
  then
    refuses EMPTY_CONTENT "Encounter content must not be blank."
  where content is not blank and owner and submission identify an existing memory with different content
  then
    refuses SUBMISSION_CONFLICT "This save token was already used for a different note."
  where content is not blank and owner and submission identify an existing memory with the same content
  then
    keep that memory and leave its content and capturedAt unchanged
    returns memory
  where content is not blank and owner and submission do not identify an existing memory
  then
    create a memory with owner, the exact supplied content, and capturedAt
    returns memory
```

## Queries

```queries
_get(owner: User, memory: Memory) : optional (content: String)
  Return the content if memory exists and belongs to owner.
  Return no row otherwise.

_list(owner: User, after: String) : many (memory: Memory, content: String)
  Read only owner's memories, including notes that have no graph matches or failed indexing.
  An empty after starts at the beginning; otherwise continue after that owned memory.
  Return no rows if a nonempty cursor is missing or is not owned by owner.
  Order by capturedAt descending, with memory identity ascending to break ties. Memories without a capturedAt follow dated saves, ordered by identity; their actual save order is unknown.
  Return at most 21 rows. The frontend displays 20 and uses the extra row to detect another page, continuing after the last displayed memory.
  Cursor paging keeps older rows reachable when a newer memory is inserted between page requests.
  Return no rows for an empty page. Never merge matching names or identical content.
```

**design/concepts/Seeking.md**

# Seeking

## Purpose

Keep a user's need available without having to re-enter it.

## Principle

If a user records a need, they can later retrieve its description without having to enter it again.

## Types

```types
external User
```

## State

```state
a set of Needs with
  an owner User
  a description String
```

## Actions

```actions
seek(owner: User, description: String) : returns (need: Need)
  where description is blank (empty or whitespace-only)
  then
    refuses EMPTY_DESCRIPTION "The need description must not be blank."
  where description is not blank
  then
    create a need with owner and description
    returns need
```

## Queries

```queries
_get(owner: User, need: Need) : optional (description: String)
  Return the description if need exists and belongs to owner.
  Return no row otherwise.
```

**design/types.md**

# Circle types

Circle reuses Conceptbox's Commons-only sign-in modules. Registering gives each
person a local user identity; CommonsFederating links Commons' stable identity
to that user. Sessioning resolves the user for every protected request. That
same user owns their notes, needs, and graph. A request cannot choose its owner.

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
```

# Result

Unless the task requests another format, return these headings in order. Omit progress narration.

- `## Verdict` — required. First line is exactly `Approve`, `Revise`, or `Blocked`.
- `## Assessments` — required. Compact obligation-by-obligation semantic assessment; do not restate contracts.
- `## Findings` — required. Stable-ID blocker or material findings, or none.
