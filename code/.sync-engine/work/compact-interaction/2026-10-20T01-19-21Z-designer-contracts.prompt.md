# Role and objective

Work unit `compact-interaction`; role `designer`; phase `contracts`.

# Contract designer

Author the complete affected concept and application contract set needed by the work item. A supplied decomposition fixes boundaries, placement, and obligation IDs; otherwise use the brief and approved contracts. Preserve unaffected and catalog-unchanged surfaces.

Apply the supplied authored-format, SSF, boundary, and contract guidance exactly. Put mechanism state and invariants in concept contracts. Author application contracts for every required endpoint, link, and cross-concept behavior; include selected executable identities, cross-concept policy, acknowledgement order, and recovery. Cover action success, refusal state, repetition, lifecycle, query cardinality/order, authorization, and every affected obligation.

Edit design only. Run `bunx --no-install sync-engine check-design <changed files>` and repair its diagnostics before returning. Do not run generation or the full project check: source agreement cannot pass until implementation exists, and it is not contract syntax. Ask one focused question for a missing product choice; report a blocker when required behavior would change accepted boundaries or obligations.

# Access

Root: "/private/tmp/circle-compact-interaction/code". The short native message explicitly authorizes reading this prompt file; all assignment context is inline below. This is already a compiled role assignment: do not load a skill, workflow, harness guide, or another instruction file.

- Read: `design:compositions/Circle.md` ("/private/tmp/circle-compact-interaction/code/design/compositions/Circle.md"), `design:concepts/Connecting.md` ("/private/tmp/circle-compact-interaction/code/design/concepts/Connecting.md"), `design:concepts/Seeking.md` ("/private/tmp/circle-compact-interaction/code/design/concepts/Seeking.md"), `design:types.md` ("/private/tmp/circle-compact-interaction/code/design/types.md").
- Write: `assigned-design:compositions/Circle.md` ("/private/tmp/circle-compact-interaction/code/design/compositions/Circle.md"), `assigned-design:concepts/Connecting.md` ("/private/tmp/circle-compact-interaction/code/design/concepts/Connecting.md").
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

**.sync-engine/work/compact-interaction/recommendation-design-task.md**

User superseded all earlier suggestion response decisions: remove old Useful/Dismiss/Remove trailing functionality completely, including respective concept actions/status and public endpoints (legacy stored statuses ignored safely). Instead each suggestion has ellipsis menu, Do not recommend, optional explanation; durable exclusion applies to that saved target across ALL searches for this authenticated owner, never other users. No person-name merging. Optional reason becomes private owner-only recommendation LLM context, NOT changed notes/claims or extraction facts.
Revise existing Connecting canonical concept and Circle composition, types only if required. Keep concepts independent. Connecting can own unique (owner,target) exclusions with optional explanation (empty string means absent), separate from per-need suggestion lifecycle. Exclude only an owned eligible current connection, refusal missing/foreign; persist exclusion first, then filter all matching suggestions/read details without relying on clearing rows. reset/clear/need deletion do not erase global exclusions. No undo/history UI requested. Existing old status fields on stored rows must not suppress unexcluded matches. Remove Status type and old actions/queries output fields. Client optional reason sent as required string empty when omitted, bounded1000. Server resolves owner from session; reject owner injection.
Actual LLM context integration: extend Connecting.offer with current search description (required string) for an injected recommendation-policy provider. Before offering, owner-scope exclusion query. Hard-filter exact excluded targets deterministically. For remaining candidates, when OpenAI mode configured, use stateless Responses strict boolean recommend result with search description, candidate target/reason/gaps and only this owner's exclusion targets/explanations. The policy may suppress but never invent/edit graph evidence/facts or candidate identities. Keep separate from Graphing extraction. Local default no-model deterministic pass-through plus hard exclusions; tests inject simulated provider. Existing runtime GRAPHING_EXTRACTOR openai selects this provider with same server key/model; no new dependencies or provider calls in tooling/tests. Failure is explicit, original need/feedback persist, no fallback/retry. Bounded feedback context must not silently forget exclusions: all exact exclusions enforced DB; explain practical context cap/truncation if selected. Prefer all feedback under reasonable existing bounds rather than silent cross-user pooling. Prompt data untrusted, store:false, no shared conversation.
Coordinator will implement source alignment. Preserve ownership/evidence validation/FIFO, all compact UI and newest4 ordering. New user scope supersedes prior critic CI-01; ensure arrow always invokes seek and repeated search cannot erase new exclusions. Remove old clear-on-seek if no longer needed (clear removes only ephemeral suggestions, never exclusions). Revise existing design only, no source edits or new docs. Run canonical check-design syntax only. Return Status Complete, changed contracts/important choices, checks and blockers.

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

## Affected existing contracts

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
clears prior connections and refreshes its active need, including when an exact query reuses an existing need. A deliberate search therefore shows current matches again regardless of legacy Useful/Dismissed feedback or a previously removed suggestion. The current client exposes only suggestion removal; usefulness and dismissal endpoints remain compatibility operations and are not client controls. The [revised-need reaction](reaction:Circle.RefreshRevisedNeed)
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


The current client centers one Remember/Find composer without visible question headings. The Find arrow submits the typed description; there is no New search control. Selecting a saved search opens its suggestions directly beneath that row, moves focus to the panel heading, and can be collapsed. A submitted reused search outside the latest four expands the list to reveal its panel. Encounter inspection uses pen/bin controls with deletion confirmation and exposes no manual indexing action.

**design/concepts/Connecting.md**

# Connecting

## Purpose

Remember explained suggestions and the user's responses without interpreting the opaque people, needs, or evidence supplied by other mechanisms.

## Principle

Sofia receives Toni as a suggestion for her research need and marks it useful. Reoffering Toni with fresh evidence updates the explanation while keeping the useful response, so Circle does not present the same handled suggestion as new.

## Types

```types
external User
external Target
external Need
external Evidence
opaque Set
  Finite unordered collection of values of its type argument; repeated elements have no meaning.
Status is SUGGESTED or DISMISSED or USEFUL
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
  a status Status
  an eligible Flag
  unique owner and need and target

Rule: offer atomically enforces the owner, need, target uniqueness and preserves handled status on replacement. No target, need, or evidence identity is interpreted by this concept.
Rule: reset disables the prior set before recomputation; only successful offers reenable supported rows. An interrupted refresh therefore cannot keep old rows eligible.
Rule: dismiss, use, remove, reset, and clear enforce owner conditions in their mutations. All refusals leave the complete state unchanged.
```

## Actions

```actions
reset(owner: User, need: Need) : returns ()
  where true
  then
    set eligible false on all connections with owner and need
    leave an empty set or repeated reset unchanged
    returns

offer(owner: User, need: Need, target: Target, evidence: Set<Evidence>, reason: String, gaps: Set<String>) : returns ()
  where evidence is empty
  then
    refuses EMPTY_EVIDENCE "A suggestion requires supporting evidence."
  where evidence is not empty and reason is blank
  then
    refuses EMPTY_REASON "A suggestion requires an explanation."
  where evidence is not empty and reason is not blank and no connection has owner and need and target
  then
    create a connection with owner, need, target, evidence, reason, gaps, status SUGGESTED, and eligible true
    returns
  where evidence is not empty and reason is not blank and a connection has owner and need and target
  then
    replace its evidence, reason, and gaps and set eligible true while preserving status and identity
    returns

dismiss(owner: User, connection: Connection) : returns ()
  where connection is not in Connections or connection.owner is not owner
  then
    refuses DISMISS_UNAVAILABLE "This suggestion is not available."
  where connection is in Connections and connection.owner is owner and connection.eligible is false
  then
    refuses DISMISS_INELIGIBLE "This suggestion is no longer current."
  where connection is in Connections and connection.owner is owner and connection.eligible is true and connection.status is USEFUL
  then
    refuses DISMISS_HANDLED "This suggestion has already been marked useful."
  where connection is in Connections and connection.owner is owner and connection.eligible is true and connection.status is not USEFUL
  then
    set status DISMISSED, leaving an already dismissed connection unchanged
    returns

use(owner: User, connection: Connection) : returns ()
  where connection is not in Connections or connection.owner is not owner
  then
    refuses USE_UNAVAILABLE "This suggestion is not available."
  where connection is in Connections and connection.owner is owner and connection.eligible is false
  then
    refuses USE_INELIGIBLE "This suggestion is no longer current."
  where connection is in Connections and connection.owner is owner and connection.eligible is true and connection.status is DISMISSED
  then
    refuses USE_HANDLED "This suggestion has already been dismissed."
  where connection is in Connections and connection.owner is owner and connection.eligible is true and connection.status is not DISMISSED
  then
    set status USEFUL, leaving an already useful connection unchanged
    returns

remove(owner: User, connection: Connection) : returns ()
  where true
  then
    atomically remove the connection only when it belongs to owner
    leave an absent or other-owner connection unchanged with the same successful result
    repetition succeeds unchanged
    returns

clear(owner: User, need: Need) : returns ()
  where true
  then
    remove every connection with owner and need, leaving an empty set or repetition unchanged
    returns
```

## Queries

```queries
_suggestions(owner: User) : many (connection: Connection, target: Target, need: Need, evidence: Set<Evidence>, reason: String, gaps: Set<String>)
  Answer owner's eligible connections with status SUGGESTED and their supplied explanation and evidence.
  Answer no rows when none qualify.
  Order by need identity then connection identity ascending; composition may retain graph ranking when presenting one refreshed need.

_get(owner: User, connection: Connection) : optional (target: Target, need: Need, evidence: Set<Evidence>, reason: String, gaps: Set<String>, status: Status, eligible: Flag)
  Answer owner's connection and its supplied opaque identities, explanation, status, and eligibility.
  Answer no row for an unknown connection or another owner's connection.
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

# Result

Unless the task requests another format, return these headings in order. Omit progress narration.

- `## Status` — required. First line is exactly `Complete` or `Blocked`; explanation goes below.
- `## Changed` — required. Paths changed, or none.
- `## Questions` — required. Material questions, or none.
- `## Checks` — optional. Command and outcome when applicable.
