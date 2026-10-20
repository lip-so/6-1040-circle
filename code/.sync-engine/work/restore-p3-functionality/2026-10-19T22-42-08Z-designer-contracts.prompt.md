# Role and objective

Work unit `restore-p3-functionality`; role `designer`; phase `contracts`.

# Contract designer

Author the complete affected concept and application contract set needed by the work item. A supplied decomposition fixes boundaries, placement, and obligation IDs; otherwise use the brief and approved contracts. Preserve unaffected and catalog-unchanged surfaces.

Apply the supplied authored-format, SSF, boundary, and contract guidance exactly. Put mechanism state and invariants in concept contracts. Author application contracts for every required endpoint, link, and cross-concept behavior; include selected executable identities, cross-concept policy, acknowledgement order, and recovery. Cover action success, refusal state, repetition, lifecycle, query cardinality/order, authorization, and every affected obligation.

Edit design only. Run `bunx --no-install sync-engine check-design <changed files>` and repair its diagnostics before returning. Do not run generation or the full project check: source agreement cannot pass until implementation exists, and it is not contract syntax. Ask one focused question for a missing product choice; report a blocker when required behavior would change accepted boundaries or obligations.

# Access

Root: "/private/tmp/circle-p3-complete/code". The short native message explicitly authorizes reading this prompt file; all assignment context is inline below. This is already a compiled role assignment: do not load a skill, workflow, harness guide, or another instruction file.

- Read: `work-unit:context` ("/private/tmp/circle-p3-complete/code/.sync-engine/work/restore-p3-functionality/context"), `application:design` ("/private/tmp/circle-p3-complete/code/design"), `application:src/compositions/Circle.ts` ("/private/tmp/circle-p3-complete/code/src/compositions/Circle.ts"), `application:src/concepts` ("/private/tmp/circle-p3-complete/code/src/concepts"), `application:src/concepts.ts` ("/private/tmp/circle-p3-complete/code/src/concepts.ts").
- Write: `assigned-design:compositions/Circle.md` ("/private/tmp/circle-p3-complete/code/design/compositions/Circle.md"), `assigned-design:concepts/Connecting.md` ("/private/tmp/circle-p3-complete/code/design/concepts/Connecting.md"), `assigned-design:concepts/Graphing.md` ("/private/tmp/circle-p3-complete/code/design/concepts/Graphing.md"), `assigned-design:concepts/Remembering.md` ("/private/tmp/circle-p3-complete/code/design/concepts/Remembering.md"), `assigned-design:concepts/Seeking.md` ("/private/tmp/circle-p3-complete/code/design/concepts/Seeking.md"), `assigned-design:types.md` ("/private/tmp/circle-p3-complete/code/design/types.md").
- Tools: `repository-read`, `repository-write`.
- Shell: `project-validation`; network: no; generated output: no; long-running processes: no.

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

# Authored formats

Write each concept to `design/concepts/<Gerund>.md`, each application composition to `design/compositions/<Name>.md`, and application-owned concrete types to `design/types.md`. These are the only authored-design locations; decomposition remains the work-unit `decomposition.md`.

Each concept has one gerund identifier H1 naming its mechanism and these H2s, in order;
no other headings or fences:

````text
# Tasking

## Purpose
Unfenced prose.

## Principle
Unfenced prose.

## Types
```types
external Owner
  Optional explanation.
```

## State
```state
<SSF declarations>
```

## Actions
```actions
create (owner: Owner, title: String, dueAt?: DateTime) : returns (item: Item)
  where title is invalid
  then
    refuses INVALID_TITLE "A valid title is required."
  where title is valid
  then
    create the item
    returns item

delete (item: Item) : returns ()
  where true
  then
    delete the item
    returns
```

## Queries
```queries
_items (owner: Owner) : many (item: Item, title: String)
  answers the owner's items with their titles
  answers no rows when the owner has none
  orders rows by Item identity
```
````

A concept's Types section contains `external Name`, `opaque Name`, and
`Name is VALUE or VALUE` declarations, or is empty. State uses supplied SSF; keep every
State line inside its fence and prefix every invariant prose line with exact `Rule:`.
Actions use `name: Type`, optional `name?: Type`, `: returns`, parenthesized named results,
and one or more `where`/`then` branches. Indent `where` and `then` equally and each branch
body deeper. Terminal success `returns` exactly the declared names. Declare an empty result
`: returns ()` and end its branches with bare `returns`. Refuse with
`refuses CODE "Normative sentence."`; keep codes unique within an action and never shared
across actions. A returned name is a declared parameter, the row the branch created or
changed, or a value an earlier line in that branch binds, as in
`count the Tallies with subject as total`. Order an action's branches with its refusals
first and its terminal success last, and give each branch a condition the others cannot
also match.

Actions start with a letter; queries start `_` and use `one`, `optional`, or `many`
before the named row. Mark optional State values in the row `field?: Type`. A `one` body
always promises one row; only `optional` may say no row. Write a query body as one line
per fact: what it answers, then the empty or unknown case, then—for `many` alone—its
stable ordering.

```types
concrete Person
  Stable application identity.
```

```instances
instantiate Tasking with
  Owner is Person
instantiate Noting as Notes with
  Task is Tasking.Task
```

Bare `instantiate D` means `instantiate D as D`, for a definition with no external to
bind. Bind every external inline on its own instance, as above.

Concept files carry no application links, endpoint entries, instances, bindings, or
computations.

## Application files

Inventory exact selected static instances in `design/types.md`, whose `concrete`
declarations are application-owned; never declare core-owned `RequestBoundary`. A
definition may have zero or more instances, none carrying its name. Write an alias only as
`alias Alias for Target`, and leave no concrete unused; config checking rejects the rest.
Bindings convey identity only.

Put exact `reaction:`, `view:`, `former:`, and `computation:` links beside prose, never
wildcards. Every selected endpoint is a reaction declaration and therefore needs its own
`reaction:` link, in addition to links for internal reaction trees. It also needs exactly
one boundary declaration in an `endpoints` fence. Cover every selected endpoint, internal
reaction, named view, and former; declare each executable computation once. A composition
document reads as prose carrying its links and endpoint declarations:

````text
Submitting a response [enters the application](reaction:Circle.Reading.AddResponse).

```endpoints
Circle.Reading.AddResponse at /circle/respond
```

Choosing a reading [opens a discussion](reaction:Circle.Reading.SelectedOpensDiscussion)
about it. A circle page shows the circle, its members and that discussion
[as one record](former:Circle.Pages.CirclePage), and only a member
[may respond](view:Circle.Reading.MemberMayRespond).
````

Give each composition document a nonempty H1 and decision prose. An `endpoints` fence
contains declarations only, one per line in exact `Declaration.Identity at /path` form.
The identity is the same module, group, and declaration selected by the endpoint's
`reaction:` link. The portable absolute path is the exact path implementation passes to
`endpoint(...)`. Different endpoint identities may share a path only when they are
intentional alternatives.

Declare each computation once as `name(inputs) : Result`, no space before its inputs, with
an indented body where it is used, or in `design/types.md` when shared, and reference it as
`[normalization](computation:normalizeTitle)`. Its result is one bare type; a list or record
read from concept state is not a computation result:

```computations
normalizeTitle(raw: String) : String
  Produces the canonical task title used by endpoint adaptation.
```

The endpoint entry fixes the executable endpoint pathname; its `reaction:` link separately
fixes trace identity. Neither prescribes trigger syntax, stage structure, or variable
flow. If either declaration is absent, implementation must not create that endpoint. Do
not add an internal reaction link for a consequence the endpoint-linked declaration may
perform unless separate deferred behavior is an intentional design decision.

An application document does not duplicate endpoint input, return, or refusal listings:
the concept specifications and composition prose own that behavior, and a second copy
drifts from the contracts the checker reads. Transport methods, status codes, headers, and
external route projections remain outside the `endpoints` fence.

`check-design` proves grammar and authored form only. Config checking proves shapes,
bindings, links, endpoint identity/path agreement, computations, and source agreement. Neither proves boundaries, prose truth,
persistence, transactions, authorization, repair, or behavior; review and test.

---

# Simple State Form (SSF)

```text
document := (setDecl|subsetDecl|aliasDecl|ruleLine)*
setDecl := (a|an) [(set|seq) [of]] Type [with] declarationBody?
subsetDecl := (a|an) [set [of]] Qualifier+ Type [condition] [with] declarationBody?
condition := where fieldName is VALUE (or VALUE)*
declarationBody := (INDENT (field|uniqueLine|ruleLine))+
aliasDecl := alias Alias for Type
field := [a|an] modifier* [fieldName] (named|collection)
modifier := optional|unique
uniqueLine := unique fieldName (and fieldName)*
named := Qualifier* Type|Parameter|Local|primitive
collection := (set|seq) [of] named
primitive := Number|String|Flag|Date|DateTime
ruleLine := Rule: TEXT

typesLine := (external Name|opaque Name|Name is VALUE (or VALUE)+) [INDENT TEXT]
```

Start Type, Qualifier, Alias, Parameter, and Local uppercase ASCII and fieldName
lowercase; continue each with ASCII letters, digits, or `_`. Start VALUE uppercase and
continue with uppercase ASCII letters, digits, or `_` only. A field without a fieldName
is named for its type's words joined, with a lowercase first letter: `an Author` is
`author`, `a set of Tags` is `tags`, `a Verified User` is `verifiedUser`. Write names
when two fields share a type, and prefer a role name (`a sponsor Verified User`) when
the role matters.

Declare every type in the Types fence: `external Name` for an application-supplied
parameter, `Name is A or B` for an enumeration, `opaque Name` when the representation is
deliberately the implementer's. A name that is none of these, nor owned, nor primitive, nor
(in a State field) a declared subset, fails
with `SSF_UNDECLARED_TYPE`, in a State field or anywhere in an action or query signature,
including inside a type argument or union. Owned, external, concept-local, and primitive
names are one namespace. Never name a type for a primitive—write the primitive on the
field and state what narrows it where it is enforced.

Make every nonblank line parse or start with `Rule:`. Put a `Rule:` line at top level or
indented under a declaration; SSF keeps its TEXT verbatim and proves nothing. A top-level
rule ends the preceding declaration body. End a first line with `with` only when a field
or `unique` line follows, and always then; a `Rule:` line attaches without `with`.

A plain top-level set contains every individual of its type in the concept's state, and
each has its fields: with `a set of Users with a reputation Number`, every User any field
refers to is in `Users` and has a reputation. That holds whether the concept owns User or
takes it as `external User`; a set named for an external type's plural holds its
individuals and introduces no identity. Write the plural—`a set of User` collides with
the external name. The actions carry the obligation: storing a User makes it a member
with its fields, and removing a member removes or refuses every reference to it. Taking a
member out of a subset likewise removes or refuses every field of that subset's type that
holds it; type the field by the parent when it should outlive membership.

Declare a subset by qualifying its parent: `a set of Verified Users`, `a set of Trusted
Verified Users`, `a Root Folder`. One capitalized type word is a top-level set, sequence,
or singleton; more are a subset of the set the remaining words name, which must be declared unless it is an external type's plural (`a set of Read Posts` beside `external
Post` needs no `a set of Posts`). The name is the whole phrase, `Verified Users` or `Verified User`, never the
qualifier alone. Use a qualified subset instead of a plain set, or instead of `optional`
fields, when only some individuals carry fields. A qualifier may qualify different sets
(`Pending Invitations`, `Pending Users`) but appears once among one set's subsets. Use a
subset as a State field type (`a sponsor Verified User`); in action and query signatures
take the parent type and state membership in a condition, such as `where sponsor is in
Verified Users`. Name the set for membership in any condition: `user is in Users`, not
`user exists`. Never write `a Verified set of Users` or `a verified set of Users`.

SSF accepts automatic singular/plural aliases for owned sets and sequences, and for
external types, when an authored State field, subset line, or action/query signature
supplies one unambiguous matching name; a subset phrase joins through its last word.
Declare an explicit `alias` for a synonym or an ambiguous singular/plural relationship of
an owned set; the explicit declaration takes precedence. An external type cannot be an
alias target, so when a spelling pairs with several external types, write the exact
external name or rename one of them.

An alias targets one unique owned top-level declaration: a set, sequence, or singleton. It
cannot target another alias, a subset, an external or a set of one, an opaque or enum type,
a primitive, a duplicate, or an unresolved name. Automatic singular/plural joins never
reach singletons; only an explicit alias names one. Alias collisions and chains, ambiguous automatic
relationships, duplicate subsets, repeated qualifiers, and undeclared parents are
rejected.

Structures, aliases, externals, local types, and primitives share one type universe, and
a subset's joined identifier (`VerifiedUsers`, `VerifiedUser`) may not collide with it. A
field cannot be named `optional`, `unique`, `set`, or `seq`. Keep fieldNames unique per
declaration and VALUEs per enum. Every State type must resolve to an owned, external,
subset, local, or primitive type, and every signature type to one that is not a subset.

Mark a field `unique` when its values must be unique among members of that declaration; a
unique collection field compares the whole collection. A `unique` line names the fields of
one constraint; the modifier is shorthand for a line naming that field alone, so use the
line where the field is inherited rather than declared. Order does not distinguish a
combination; a declaration may carry several. A subset's constraints bind only its own
members and may name ancestor fields. Condition a subset on a field whose type is a
declared enumeration to state which members it classifies. Write each modifier
at most once, in either order, between any article and the fieldName; `a` and `an` both
read. Case separates the forms: `unique Email` is a unique field named `email`, and
`unique email` a constraint line; `a Verified User` holds a Verified User, while `a
verified User` is a field named `verified` holding any User. Collections are never `optional` (empty means absent)
or nested; named-type unions are invalid. Owned sets and sequences introduce
identities—never add ID fields. Subsets add no identity; they classify parent members,
may overlap, and add relations. `a Type` or `an Type` has one member. Either article is
accepted; indentation distinguishes a declaration from an implicitly named field.
Which side declares a relation implies no storage, navigation, or ownership.

```state
a set of Items with
  a unique title String
  an item Item
  an optional owner Person
  a watchers set of Person
  an updates seq of Update
  a Status

a set of Votes with
  an Item
  a Voter
  unique item and voter

a set of Completed Items where status is DONE with
  a completedAt DateTime

a set of Reviews with
  a Completed Item
  a reviewer Person

a set of Muted People

a Settings with
  a retentionDays Number

alias WorkItem for Items

Rule: an Item's owner must be active
```

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

## Task

**.sync-engine/work/restore-p3-functionality/designer-task.md**

Translate the accepted full P1 Circle design into installed-version canonical contracts for the restored beta. Own only design/concepts/{Remembering,Seeking,Graphing,Connecting}.md, design/types.md, design/compositions/Circle.md. Preserve generic independence and existing auth contracts. Use existing implementation/public surfaces only as context. Design the exact action/query signatures and endpoint/former/reaction inventory so independent lifecycle, graph, and frontend workers can implement it consistently. Include safe old-record handling, source and claim ownership, failure invalidation, per-need reset/offer ordering, latest engine-provided times, literal encounter dates, cross-note identity rules, and typed source inspection. Audio should use an injectable transcription provider and produce a draft; avoid an unnecessary new concept or parallel HTTP router. Define concrete API signatures for all required UI behavior, retaining existing /memories/remember,/memories/list,/needs/seek contracts compatibly where practical. Keep raw source records and old needs; do not require bulk migrations. Provide a concise exact API table and ownership split in the final response for workers. This is contract design only: no application source/test/config changes. Run only check-design syntax. The full P1 design is accepted decomposition; no new product features. Questions/assumptions in brief are authoritative and may be updated before completion. Finish with Status: Complete or Status: Blocked, explaining actual unresolved questions.

## Brief

**.sync-engine/work/restore-p3-functionality/brief.md**

# Restore the functionality deferred from P2

## Goal
Deliver the full intended Circle beta: editable/deletable encounter memory, voice/text capture, evidence-backed cross-note retrieval, persistent ongoing goals and handled suggestions, and automatic rediscovery.

## Scope
Restore the four P1 concepts Remembering, Graphing, Seeking, Connecting and their composition/UI. Preserve Commons auth, original notes, safe manual retries, owner-scoped reads, guided data compatibility, separate same-name encounters, literal encounter context. No password auth, demo seeds, inferred dates, automatic people merges, external outreach, contact link execution, graph dashboard, or unrelated deployment/submission work.

## Requirements
Use existing P1 design as accepted product intent; translate it into strict installed-version canonical contracts. Add original lifecycle actions and grounded graph trace/gaps/ranking, with input validation, refusal mappings, owned source joins, and deterministic updates across changes. Voice transcription produces an editable draft, never an automatically saved note. Existing records remain readable. No global database clearing or automatic external reindexing. A failed downstream index/search keeps original saved data and reports an error. Invalidated/deleted evidence cannot continue to be shown as current. Concept classes cannot import peers. Use sync-engine DSL for cross-concept behavior. Provider settings/credentials are server-side and injectable for tests. Tests remain lean, cover actions/principles and privacy/data integrity; no cosmetic test expansion. Preserve all manual changes and Sofia's design journal.

## Active decisions
- Latest user request explicitly authorizes implementing every feature P2 temporarily deferred. Permanent product choices remain in force.
- Use the current accepted four-concept P1 design; no fresh decomposition is needed unless a real boundary defect is identified. A designer will translate contracts, followed by independent contract review.
- Work in a temporary complete copy because the actual repository is outside the writable sandbox; apply reviewed changes back only after checking baseline hashes. No external data writes other than isolated test databases.
- Skill CLI uses the bundled Node 24 on PATH, retaining system Node 25. Matching analysis/catalog 1.1.0 tools are now direct dev dependencies as bootstrap requires; no framework version upgrades.
- Optional clarifications were asked about capture modes, legacy needs, and cross-note identities. Conservative draft assumptions pending any reply: keep guided capture and add free-text/voice; legacy searches remain inactive and can be reopened; people remain source-local while unambiguous organizations/topics can connect notes. No new manual person merging unless requested.
- Runtime OpenAI key is not configured; all provider calls remain injectable. Actual OpenAI quality cannot be asserted from stand-in tests.
- Scope is implementation; it does not authorize publishing, deployment, recording/submission, or editing the user's design journal.

## Done when
- Signed-in users can create, edit, list/read, and delete their own encounters, including old guided notes; downstream failures preserve saved data without duplicate retries.
- Voice input can be recorded, transcribed with a server provider, reviewed/edited, and intentionally saved; cancellation and account changes discard pending capture safely.
- Users can create/list/update/resolve/reopen/delete ongoing needs, and old one-off search records are preserved without silently turning into active goals.
- Evidence-backed suggestions traverse safe cross-note paths, show source quotes and uncertainty, rank at most five, and avoid inferred jobs or identity merges.
- Users can inspect owned claims and reject/restore/remove them; forgetting a source withdraws its claims.
- Connecting stores suggestion status; repeated offers refresh evidence while preserving handled status; goal revision/resolve/delete clears suggestions as P1 specifies.
- New/changed/deleted memories or claims update relevant active-goal suggestions automatically, and the frontend shows the updated result without a page reload.
- Every changed boundary is owner-scoped and runtime validated. Required auth remains intact. Syntax, generated artifact/type/frontend checks, lean Mongo/provider/HTTP tests, build, and feasible real UI checks pass, with limitations explicit.

## Open questions
The three optional clarification questions are pending; use the conservative draft assumptions above and incorporate replies before finalizing implementation. A real provider smoke test will require the user to configure an API key locally; never ask them to paste it in chat.

## Activity
- Inspected P1 product/design and P2 reductions; confirmed permanent decisions versus temporary deferrals.
- Created a complete staged copy, pinned workflow setup, and selected contract translation plus independent review before implementation.

## Affected existing contracts

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

For P3, the server may explicitly select OpenAI extraction for Graphing. Only the
saved note read through OwnedMemory is supplied to the extractor; guided Contact
text is excluded. No account identity, session, other notes, or graph database is
sent to the model. Graphing validates the proposed graph before a single atomic
replacement. Provider failure or invalid output follows the same save-then-error
policy above, and an existing graph remains intact. The local parser remains an
explicit configuration choice; model failure never switches to it silently.
Search still uses the existing owner-scoped, within-source term matching. There
is no background reindexing, semantic query expansion, or cross-source traversal.

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
    extract proposed relationships using the configured extractor before changing stored state
    with the local extractor, use the bounded parser described below
    with a model extractor, validate the entire proposed graph before replacing it: allowed kinds and relation endpoints, unique keys, source-literal labels, resolvable references, and complete supporting quotes from content
    validate that evidence is neither malformed nor negated, and is not cropped from the middle of a sentence to hide negation
    keep extraction to one named person per source until tracing supports separating multiple people's paths
    if extraction is unavailable or invalid, fail without changing the source's existing graph; do not silently fall back or retry
    replace the claims for source with the validated claims supported by content
    create or reuse entities for owner, keeping ambiguous identities separate
    give every new claim owner, source, and a supporting quote from content
    use DISCUSSED for conversational topics and FOUNDED for founding a company; do not treat either as employment or expertise
    for the local MVP, recognize one named person per note using introductions or a named profile, with positive affiliation, work, research, discussion, and offer statements
    also recognize guided memories containing Person, When, Does, and Discussed fields; take the explicit person name as written, record Does as DESCRIBED_AS and Discussed as DISCUSSED, and keep When as source context without treating it as a subject relationship
    optional Contact text stays in the supporting source; do not create relationships or searchable subject terms from phone numbers or profile URLs
    exclude the optional guided Contact field from model input and from eligible extraction evidence
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

## Additional directed context

**.sync-engine/work/restore-p3-functionality/context/p1-concepts.md**

# Concepts

## Role of the concepts

Circle is composed of four concepts.

**Remembering [User]** stores raw encounter accounts. *User* is the student who owns the notes. Capture, revision, and deletion happen only here.

**Graphing [User, Source]** turns those accounts into a navigable set of usable claims. In Circle, *Source* is bound to Remembering’s *Memory*. Graphing does not know that a source is a memory; reactions pass the memory identity as an opaque source (making sure concepts are truly modular). Rejected claims stay in the graph but are not usable for tracing until restored, the same way a used nonce stays recorded until it is released.

**Seeking [User]** stores the student’s current needs. A need stays active until the student resolves or deletes it.

**Connecting [User, Target, Need, Evidence]** holds explained suggestions and the student’s responses. In Circle, *Target* is a Graphing *Entity* of kind person, *Need* is a Seeking *Need*, and *Evidence* is a Graphing *Claim*. Connecting never inspects those objects; it only stores the identities and explanations supplied to it.

User-facing requests are modeled with the pseudo-concept **Request**. Reactions that start from a student action include `Request`; reactions that only chain concept actions do not.

---

## 1. Remembering

```
concept Remembering [User]

purpose
  prevent the context of an encounter from being lost before
  the user has a reason to revisit it

principle
  If a user records an encounter in their own words, they can
  later retrieve that account and recover what they discussed,
  even if they did not classify the encounter when recording it.

state
  a set of Memories with
    an owner User
    a content String
    an occurredAt Time
    a capturedAt Time
    an optional contact String

actions
  remember (owner: User, content: String, occurredAt: Time,
            contact?: String)
    : (memory: Memory)
    where content is not blank
    then
      create memory with owner, content, occurredAt, and contact
      set capturedAt to now
      return memory

  remember (owner: User, content: String, contact?: String)
    : (memory: Memory)
    where content is not blank
    then
      create memory with owner, content, and contact
      set capturedAt to now
      set occurredAt to capturedAt
      return memory

  revise (owner: User, memory: Memory, content: String)
    where memory exists
          memory.owner = owner
          content is not blank
    then replace memory.content with content

  forget (owner: User, memory: Memory)
    where memory exists
          memory.owner = owner
    then remove memory
```

Notes. The two `remember` cases split the optional occurrence time: one `where` requires a supplied time, the other does not. `forget` is the delete that pairs with `remember`.

---

## 2. Graphing

```
concept Graphing [User, Source]

purpose
  make relationships spread across separate accounts retrievable
  together with the evidence supporting them

principle
  If one source reports that a user met a person at a lab,
  and another reports that the same lab hosts undergraduate
  researchers, tracing a research need can recover the route
  through that person to the lab and both supporting sources.

types
  EntityKind = {self, person, organization, topic, opportunity}
  RelationKind = {met, knows, member_of, works_on, researches,
                  interned_at, offers, sometimes_hosts, based_in}

state
  a set of Entities with
    an owner User
    a kind EntityKind
    a label String
    an optional identityHint String

  a set of Claims with
    an owner User
    a from Entity
    a relation RelationKind
    a to Entity
    a source Source
    a quote String
    an observedAt Time
    a usable Boolean

actions
  ingest (owner: User, source: Source,
          content: String, observedAt: Time)
    where content is not blank
          every existing claim with this source has owner
    then
      remove every claim with this source
      add usable claims extracted from content
        owned by owner, attributed to source, at observedAt

  reject (owner: User, claim: Claim)
    where claim exists
          claim.owner = owner
          claim.usable
    then set claim.usable to false

  restore (owner: User, claim: Claim)
    where claim exists
          claim.owner = owner
          claim.usable is false
    then set claim.usable to true

  remove (owner: User, claim: Claim)
    where claim exists
          claim.owner = owner
    then remove claim

  retract (owner: User, source: Source)
    where every existing claim with this source has owner
    then remove every claim with this source

queries
  _trace (owner: User, description: String)
    : many (target: Entity, evidence: set of Claim,
            reason: String, gaps: set of String)
    Return explained suggestions of people using only the owner's
    usable claims, under the tracing rules below.
    Return no rows for a blank description or no qualifying route.
```

### Tracing rules

1. Start with someone the user knows, and combine evidence across sources when useful.
2. Match by meaning without inventing facts. Explain what kind of help the evidence supports.
3. Show uncertainty. Exclude known conflicts and identify missing or disputed information.
4. Return at most five people, preferring fewer gaps, fewer acquaintance hops, and more recent evidence.

Notes. Extraction may create or reuse entities for this owner; it records only relationships the content supports (for example, *sometimes hosts* is not *offers*). Ambiguous identities stay separate. `reject` makes a claim unusable for tracing without deleting it; `restore` returns it to the usable set; `remove` deletes it. `retract` deletes every claim from one source.

---

## 3. Seeking

```
concept Seeking [User]

purpose
  keep needs active and available for reconsideration until
  the user resolves or deletes them

principle
  If a user records a need, it remains active without being
  re-entered. The user can refine it as their plans change,
  and resolve or delete it when they stop pursuing it.

state
  a set of Needs with
    an owner User
    a description String
    a createdAt Time
    an active Boolean

actions
  seek (owner: User, description: String)
    : (need: Need)
    where description is not blank
    then
      create need with owner and description
      set createdAt to now
      set active to true
      return need

  revise (owner: User, need: Need, description: String)
    where need exists
          need.owner = owner
          need.active
          description is not blank
    then replace need.description with description

  resolve (owner: User, need: Need)
    where need exists
          need.owner = owner
          need.active
    then set need.active to false

  reopen (owner: User, need: Need)
    where need exists
          need.owner = owner
          need.active is false
    then set need.active to true

  delete (owner: User, need: Need)
    where need exists
          need.owner = owner
    then remove need

queries
  _active (owner: User)
    : many (need: Need, description: String)
    Return the owner's active needs, oldest first.
    Return no rows if none exist.
```

Notes. `seek` records a need and returns its identity as a `Need`. A need stays active when the student closes the app. Multiple needs can coexist. `delete` pairs with `seek`. `reopen` returns a resolved need to the active set.

---

## 4. Connecting

```
concept Connecting [User, Target, Need, Evidence]

purpose
  let users act on explained suggestions without repeatedly
  reconsidering ones they have already handled

principle
  If explained suggestions are supplied for a user's need,
  the user can inspect them and dismiss or mark one useful.
  Later offers update explanations without presenting handled
  suggestions as new.

types
  Status = {suggested, dismissed, useful}

state
  a set of Connections with
    an owner User
    a target Target
    a need Need
    an evidence set of Evidence
    a reason String
    a gaps set of String
    a status Status
    an eligible Boolean

actions
  reset (owner: User, need: Need)
    then set eligible to false
         for every connection with this owner and need

  offer (owner: User, need: Need, target: Target,
         evidence: set of Evidence, reason: String,
         gaps: set of String)
    where evidence is nonempty
          reason is not blank
          no connection exists with this owner, need, and target
    then
      create a connection with the given fields
      set status to suggested
      set eligible to true

  offer (owner: User, need: Need, target: Target,
         evidence: set of Evidence, reason: String,
         gaps: set of String)
    where evidence is nonempty
          reason is not blank
          a connection c exists with this owner, need, and target
    then
      replace c.evidence, c.reason, and c.gaps
      set c.eligible to true

  dismiss (owner: User, connection: Connection)
    where connection exists
          connection.owner = owner
          connection.eligible
          connection.status = suggested
    then set connection.status to dismissed

  use (owner: User, connection: Connection)
    where connection exists
          connection.owner = owner
          connection.eligible
          connection.status = suggested
    then set connection.status to useful

  remove (owner: User, connection: Connection)
    where connection exists
          connection.owner = owner
    then remove connection

  clear (owner: User, need: Need)
    then remove every connection with this owner and need

queries
  _suggestions (owner: User)
    : many (connection: Connection, target: Target, need: Need,
            evidence: set of Evidence, reason: String,
            gaps: set of String)
    Return this owner's explained suggestions: connections that
    are eligible and have status suggested.
    Return no rows if none exist. Order is unspecified.
```

Notes. Each connection stores one explained suggestion for a need. The two `offer` cases split insert from update: the `where` says whether a connection for that target already exists. `then` never branches. `remove` deletes one connection; `clear` deletes every connection for a need.

---

## Essential reactions

Format: `when` an action completes, `where` any extra condition or query, `then` the next action. `where` may bind query results; each bound row is a separate firing. `then` only invokes actions.

### A. Capture from a user request

```
sync rememberOnRequest
  when Request.remember (u, content, occurredAt, contact)
  then Remembering.remember (u, content, occurredAt, contact)

sync rememberNowOnRequest
  when Request.remember (u, content, contact)
  then Remembering.remember (u, content, contact)

sync ingestOnRemember
  when Remembering.remember (u, content, ...): (m)
  where Remembering contains m
        m.owner = u
  then Graphing.ingest (u, m, m.content, m.occurredAt)

sync ingestOnRevise
  when Remembering.revise (u, m, content)
  where Remembering contains m
        m.owner = u
  then Graphing.ingest (u, m, m.content, m.occurredAt)
```

The first two reactions are fired by user requests.
Ingest is not: it follows Remembering, so it does not mention Request.

### B. A new need from a user request

```
sync seekOnRequest
  when Request.seek (u, description)
  then Seeking.seek (u, description)

sync resetOnSeek
  when Seeking.seek (u, description): (need)
  then Connecting.reset (u, need)

sync offerOnSeek
  when Connecting.reset (u, need)
  where Seeking contains need
        need.owner = u
        need.active
        Graphing._trace (u, need.description):
          (target, evidence, reason, gaps)
  then Connecting.offer (u, need, target, evidence, reason, gaps)
```

`Request.seek` is included because a student started the need. Reset and offer chain from Seeking, not from Request.

### C. New or corrected evidence reconsiders ongoing needs

```
sync resetOnIngest
  when Graphing.ingest (u, source, content, observedAt)
  where Seeking._active (u): (need, description)
  then Connecting.reset (u, need)

sync resetOnReject
  when Graphing.reject (u, claim)
  where Seeking._active (u): (need, description)
  then Connecting.reset (u, need)

sync resetOnRestore
  when Graphing.restore (u, claim)
  where Seeking._active (u): (need, description)
  then Connecting.reset (u, need)

sync resetOnRemoveClaim
  when Graphing.remove (u, claim)
  where Seeking._active (u): (need, description)
  then Connecting.reset (u, need)

sync resetOnRetract
  when Graphing.retract (u, source)
  where Seeking._active (u): (need, description)
  then Connecting.reset (u, need)
```

Offering after these resets uses the same `offerOnSeek` rule, which already fires when `Connecting.reset` completes.

### D. Deleting a memory withdraws its evidence

```
sync retractOnForget
  when Remembering.forget (u, m)
  then Graphing.retract (u, m)
```

### E. Changed and completed needs

```
sync clearOnRevise
  when Seeking.revise (u, need, description)
  then Connecting.clear (u, need)

sync resetOnRevise
  when Seeking.revise (u, need, description)
  then Connecting.reset (u, need)

sync clearOnResolve
  when Seeking.resolve (u, need)
  then Connecting.clear (u, need)

sync clearOnDeleteNeed
  when Seeking.delete (u, need)
  then Connecting.clear (u, need)

sync resetOnReopen
  when Seeking.reopen (u, need)
  then Connecting.reset (u, need)
```

### F. Evidence inspection is restricted to the owner

```
sync inspectConnection
  when Request.inspect (u, connection)
  where Connecting contains connection
        connection.owner = u
        every claim in connection.evidence
          is a Graphing claim owned by u
        every source of those claims
          is a Remembering memory owned by u
  then
    Request.respond (reason: connection.reason,
                     gaps: connection.gaps,
                     evidence: connection.evidence)
```

This reaction does not change concept state. It is the access-control pattern: a request is answered only when every referenced object belongs to the same owner.

**.sync-engine/work/restore-p3-functionality/context/pitch.md**

# Circle
*Remember the people you didn’t know you’d need.*

Students meet people who could become future mentors, collaborators, or employers, but often forget the conversation before its relevance becomes clear.

Circle is a relationship memory for college students: explore research, technology, and startups. It preserves the context of brief encounters and helps students rediscover those connections when their goals change.

In September, you might save: “Toni, robotics PhD at Improbable AI Lab. Talked about world models. Her lab sometimes takes undergrads.” Months later, when you start looking for a robotics UROP, Circle circles back to Toni with the original note explaining why she might be worth contacting.

Circle makes this possible through three core features:

**1. Remember Someone.**

Capture an encounter with a quick text or voice note: whom you met, what you discussed, and what stood out. Circle connects people, topics, and opportunities across your notes without requiring tags or detailed profiles. Students preserve valuable context with little effort, while the people they meet remain connected to an actual conversation.

**2. Find a Connection.**

Ask a question such as “Who do I know who understands robotics?” Circle searches your saved encounters and follows connections across them—including someone who mentioned knowing a relevant person. Each suggestion includes an explanation and the original notes. This helps you judge whether to reach out and giving your contact a clear reason for the conversation.

**3. Rediscover Someone.**

Save an ongoing goal, such as finding a spring UROP. Circle revisits earlier encounters when you add or update goals and memories, surfacing people who may now be relevant without requiring another search. Students recover overlooked opportunities, and potential mentors or collaborators receive more purposeful outreach.

You decide whom to contact and what to say. Circle’s promise is simple: a few seconds of remembering today can reveal the right connection months or years later.

# Result

Unless the task requests another format, return these headings in order. Omit progress narration.

- `## Status` — required. First line is exactly `Complete` or `Blocked`; explanation goes below.
- `## Changed` — required. Paths changed, or none.
- `## Questions` — required. Material questions, or none.
- `## Checks` — optional. Command and outcome when applicable.
