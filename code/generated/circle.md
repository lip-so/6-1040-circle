<!-- Generated from the Circle assembly. Do not edit. -->
<!-- Manifest producer: @mit-sdg/sync-engine@1.1.0; concept specification: sync-engine.concept-specification@1; renderer: @mit-sdg/sync-engine@1.1.0. -->

# Circle — assembled read-back

_Assembled by sync-engine from registered concepts and composition. Edit the concept_
_specifications and composition source, then regenerate this file._

## Concepts

### Connecting

Defined in [Connecting](../design/concepts/Connecting.md), line 1.

#### Actions

- `reset(owner: User, need: Need) : returns ()`
- `offer(owner: User, need: Need, target: Target, description: String, evidence: Set<Evidence>, reason: String, gaps: Set<String>) : returns ()`
  - Refuses `EMPTY_EVIDENCE`: A suggestion requires supporting evidence.
  - Refuses `EMPTY_REASON`: A suggestion requires an explanation.
  - Refuses `EMPTY_SEARCH_DESCRIPTION`: A suggestion requires its search description.
- `exclude(owner: User, connection: Connection, explanation: String) : returns ()`
  - Refuses `EXCLUDE_UNAVAILABLE`: This suggestion is not available.
  - Refuses `EXCLUDE_INELIGIBLE`: This suggestion is no longer current.
  - Refuses `EXCLUDE_REASON_TOO_LONG`: The explanation must be at most 1000 characters.
- `clear(owner: User, need: Need) : returns ()`

#### Queries

- `_suggestions(owner: User) : many (connection: Connection, target: Target, need: Need, evidence: Set<Evidence>, reason: String, gaps: Set<String>)`
- `_get(owner: User, connection: Connection) : optional (target: Target, need: Need, evidence: Set<Evidence>, reason: String, gaps: Set<String>, eligible: Flag)`
- `_excluded(owner: User, target: Target) : optional (target: Target, explanation: String)`
- `_exclusions(owner: User) : many (target: Target, explanation: String)`

#### Instances

- `Connecting` — instance of `Connecting` — [Circle types](../design/types.md), line 29.
  - `Evidence` is `Graphing.Claim` — [Circle types](../design/types.md), line 33.
  - `Need` is `Seeking.Need` — [Circle types](../design/types.md), line 32.
  - `Target` is `Graphing.Entity` — [Circle types](../design/types.md), line 31.
  - `User` is `Registering.User` — [Circle types](../design/types.md), line 30.

### Federating

Defined in [Federating](../design/concepts/Federating.md), line 1.

#### Actions

- `start() : returns (attempt: Attempt, expiresAt: DateTime, address: String)`
- `finish(attempt: Attempt, nonce: String, code: String) : returns (username: String)`
  - Refuses `SIGN_IN_EXPIRED`: This sign-in has expired. Start again.
  - Refuses `SIGN_IN_REFUSED`: The other site didn't confirm this sign-in. Start again.
- `link(attempt: Attempt, user: User) : returns (user: User)`
  - Refuses `NOT_CONFIRMED`: This sign-in hasn't been confirmed.
  - Refuses `ALREADY_LINKED`: This account on the other site is already linked.

#### Queries

- `_user(attempt: Attempt) : optional (user: User)`
- `_linkable(attempt: Attempt) : one (linkable: Flag)`

#### Instances

- `CommonsFederating` — instance of `Federating` — [Circle types](../design/types.md), line 13.
  - `User` is `Registering.User` — [Circle types](../design/types.md), line 14.

### Graphing

Defined in [Graphing](../design/concepts/Graphing.md), line 1.

#### Actions

- `ingest(owner: User, source: Source, content: String, observedAt?: DateTime, sourceRevision?: Number) : returns ()`
  - Refuses `EMPTY_SOURCE_CONTENT`: Source content must not be blank.
  - Refuses `SOURCE_NOT_OWNED`: The source belongs to another user.
  - Refuses `SOURCE_RETRACTED`: This source has been withdrawn.
  - Refuses `STALE_SOURCE_REVISION`: A newer source revision has already been indexed.
- `reject(owner: User, claim: Claim) : returns ()`
  - Refuses `CLAIM_REJECTION_UNAVAILABLE`: This claim is not available.
- `restore(owner: User, claim: Claim) : returns ()`
  - Refuses `CLAIM_RESTORE_UNAVAILABLE`: This claim is not available.
- `remove(owner: User, claim: Claim) : returns ()`
- `retract(owner: User, source: Source) : returns ()`
  - Refuses `RETRACT_NOT_OWNED`: The source belongs to another user.

#### Queries

- `_trace(owner: User, description: String) : many (target: Entity, label: String, source: Source, evidence: Set<Claim>, reason: String, gaps: Set<String>)`
- `_claims(owner: User, source: Source) : many (claim: Claim, fromLabel: String, relation: RelationKind, toLabel: String, quote: String, usable: Flag)`
- `_members(owner: User, evidence: Set<Claim>) : many (claim: Claim)`
- `_evidence(owner: User, claim: Claim) : optional (source: Source, quote: String, contentDigest: String)`
- `_entity(owner: User, entity: Entity) : optional (label: String, kind: EntityKind)`
- `_source(owner: User, source: Source) : optional (contentDigest: String)`

#### Instances

- `Graphing` — instance of `Graphing` — [Circle types](../design/types.md), line 25.
  - `Source` is `Remembering.Memory` — [Circle types](../design/types.md), line 27.
  - `User` is `Registering.User` — [Circle types](../design/types.md), line 26.

### Registering

Defined in [Registering](../design/concepts/Registering.md), line 1.

#### Actions

- `register(username: String) : returns (user: User)`
  - Refuses `INVALID_USERNAME`: A username must have 3 to 32 letters, digits, underscores, or hyphens.
  - Refuses `USERNAME_TAKEN`: That username is taken.

#### Queries

- `_byUsername(username: String) : optional (user: User)`
- `_username(user: User) : optional (username: String)`

#### Instances

- `Registering` — instance of `Registering` — [Circle types](../design/types.md), line 11.

### Remembering

Defined in [Remembering](../design/concepts/Remembering.md), line 1.

#### Actions

- `remember(owner: User, content: String, submission: String, capturedAt: DateTime) : returns (memory: Memory)`
  - Refuses `EMPTY_CONTENT`: Encounter content must not be blank.
  - Refuses `SUBMISSION_FORGOTTEN`: This encounter was deleted; use a new save token for a new encounter.
  - Refuses `SUBMISSION_CONFLICT`: This save token was already used for a different note.
- `revise(owner: User, memory: Memory, content: String) : returns ()`
  - Refuses `REVISION_UNAVAILABLE`: This encounter is not available.
  - Refuses `EMPTY_REVISION`: Encounter content must not be blank.
- `forget(owner: User, memory: Memory) : returns ()`
  - Refuses `FORGET_NOT_OWNED`: This encounter is not available.
- `transcribe(owner: User, audio: String, mediaType: String) : returns (content: String)`
  - Refuses `INVALID_AUDIO`: Provide a supported audio recording within the size limit.

#### Queries

- `_get(owner: User, memory: Memory) : optional (content: String)`
- `_record(owner: User, memory: Memory) : optional (content: String, revision: Number)`
- `_list(owner: User, after: String) : many (memory: Memory, content: String)`

#### Instances

- `Remembering` — instance of `Remembering` — [Circle types](../design/types.md), line 19.
  - `User` is `Registering.User` — [Circle types](../design/types.md), line 20.

### Seeking

Defined in [Seeking](../design/concepts/Seeking.md), line 1.

#### Actions

- `seek(owner: User, description: String, createdAt?: DateTime) : returns (need: Need)`
  - Refuses `EMPTY_DESCRIPTION`: The need description must not be blank.
- `revise(owner: User, need: Need, description: String) : returns ()`
  - Refuses `NEED_REVISION_UNAVAILABLE`: This goal is not available.
  - Refuses `NEED_REVISION_INACTIVE`: Reopen this goal before editing it.
  - Refuses `EMPTY_NEED_REVISION`: The need description must not be blank.
- `resolve(owner: User, need: Need) : returns ()`
  - Refuses `NEED_RESOLUTION_UNAVAILABLE`: This goal is not available.
- `reopen(owner: User, need: Need) : returns ()`
  - Refuses `NEED_REOPEN_UNAVAILABLE`: This goal is not available.
- `delete(owner: User, need: Need) : returns ()`

#### Queries

- `_get(owner: User, need: Need) : optional (description: String)`
- `_record(owner: User, need: Need) : optional (description: String, active: Flag)`
- `_list(owner: User) : many (need: Need, description: String, active: Flag)`
- `_active(owner: User) : many (need: Need, description: String)`

#### Instances

- `Seeking` — instance of `Seeking` — [Circle types](../design/types.md), line 22.
  - `User` is `Registering.User` — [Circle types](../design/types.md), line 23.

### Sessioning

Defined in [Sessioning](../design/concepts/Sessioning.md), line 1.

#### Actions

- `start(subject: Subject) : returns (session: Session, expiresAt: DateTime)`
- `use(session: Session) : returns (subject: Subject)`
  - Refuses `NOT_SIGNED_IN`: Your session has ended. Sign in again.
- `end(session: Session) : returns (session: Session)`
  - Refuses `NOT_SIGNED_IN`: Your session has ended. Sign in again.

#### Instances

- `Sessioning` — instance of `Sessioning` — [Circle types](../design/types.md), line 16.
  - `Subject` is `Registering.User` — [Circle types](../design/types.md), line 17.

## Computations

- `sourceDigest(content: String) : String` — [Circle types](../design/types.md), line 42.

## Views

_Views name reusable conditions. Multiple `where` blocks are alternatives._

### the memory (memory) owned by (owner)

Authored path: `Circle.OwnedMemory`.
- Covered by [Circle](../design/compositions/Circle.md), line 27.

```view
the memory (memory) owned by (owner) — inputs (owner, memory); outputs (content); bindings () — answers at most one (content)
  where Remembering._get (memory, owner) has (content)
```

### current owned evidence (claim) for (owner)

Authored path: `Circle.OwnedEvidence`.
- Covered by [Circle](../design/compositions/Circle.md), line 34.

```view
current owned evidence (claim) for (owner) — inputs (owner, claim); outputs (source, quote, contentDigest, content); bindings () — answers at most one (source, quote, contentDigest, content)
  where
    Graphing._evidence (claim, owner) has (contentDigest, quote, source)
    view "the memory (memory) owned by (owner)" with (memory: source, owner) has (content)
    contentDigest is sourceDigest (content)
```

### invalid members of (evidence) for (owner)

Authored path: `Circle.InvalidEvidence`.
- Covered by [Circle](../design/compositions/Circle.md), line 45.

```view
invalid members of (evidence) for (owner) — inputs (owner, evidence); outputs (claim); bindings () — answers any number of (claim)
  where
    Graphing._members (evidence, owner) has (claim)
    no view "current owned evidence (claim) for (owner)" with (claim, owner)
```

### complete evidence (evidence) for (owner)

Authored path: `Circle.ValidEvidence`.
- Covered by [Circle](../design/compositions/Circle.md), line 57.

```view
complete evidence (evidence) for (owner) — inputs (owner, evidence); outputs (); bindings (total)
  where
    total is the count of Graphing._members (evidence, owner)
    total is greater than 0
    no view "invalid members of (evidence) for (owner)" with (evidence, owner)
```

### current suggestion (connection) for (owner)

Authored path: `Circle.CurrentSuggestion`.
- Covered by [Circle](../design/compositions/Circle.md), line 61.

```view
current suggestion (connection) for (owner) — inputs (owner, connection); outputs (); bindings (need, description, target, evidence)
  where
    Connecting._get (connection, owner) has (eligible: true, evidence, need, target)
    Seeking._record (need, owner) has (active: true, description)
    Graphing._trace (description, owner) has (target)
    view "complete evidence (evidence) for (owner)" with (evidence, owner)
```

### trace of (owner)'s target (target) for need (need)

Authored path: `Circle.SuggestionTrace`.
- Covered by [Circle](../design/compositions/Circle.md), line 65.

```view
trace of (owner)'s target (target) for need (need) — inputs (owner, need, target); outputs (label, source); bindings (description) — answers at most one (label, source)
  where
    Seeking._record (need, owner) has (active: true, description)
    Graphing._trace (description, owner) has (label, source, target)
```

## Formers

_Formers name result shapes evaluated when asked. The source former owns_
_the authored explanation; this section records the generated shape._

### current suggestions for (owner)

Authored path: `Circle.CurrentSuggestions`.
- Covered by [Circle](../design/compositions/Circle.md), line 100.

```former
Former "current suggestions for (owner)" — inputs (owner); bindings (need, description, connection, target, evidence, reason, gaps, label, source, content, claim, evidenceSource, quote, original); promises exactly one record — forms:
  each Seeking._active (owner) has (description, need)
    where Connecting._suggestions (owner) has (connection, evidence, gaps, need, reason, target)
    where Graphing._trace (description, owner) has (evidence, label, source, target)
    where view "complete evidence (evidence) for (owner)" with (evidence, owner)
    where view "the memory (memory) owned by (owner)" with (memory: source, owner) has (content)
    form a record of
      connection
      content
      description
      evidence
      gaps
      label
      need
      reason
      source
      sources: each Graphing._members (evidence, owner) has (claim)
        where view "current owned evidence (claim) for (owner)" with (claim, owner) has (content: original, quote, source: evidenceSource)
        form a record of
          claim
          content: original
          quote
          source: evidenceSource
      target
```

### details of (owner)'s memory (memory)

Authored path: `Circle.MemoryDetails`.
- Covered by [Circle](../design/compositions/Circle.md), line 72.

```former
Former "details of (owner)'s memory (memory)" — inputs (owner, memory); bindings (content, contentDigest, claim, fromLabel, relation, toLabel, quote, usable); promises exactly one record — forms:
  a record of
    where view "the memory (memory) owned by (owner)" with (memory, owner) has (content)
    claims: each Graphing._claims (owner, source: memory) has (claim, fromLabel, quote, relation, toLabel, usable)
      where Graphing._source (owner, source: memory) has (contentDigest)
      where contentDigest is sourceDigest (content)
      form a record of
        claim
        fromLabel
        quote
        relation
        toLabel
        usable
    content
    memory
```

### details of (owner)'s suggestion (connection)

Authored path: `Circle.SuggestionDetails`.
- Covered by [Circle](../design/compositions/Circle.md), line 101.

```former
Former "details of (owner)'s suggestion (connection)" — inputs (owner, connection); bindings (need, description, target, evidence, reason, gaps, eligible, label, source, content, claim, evidenceSource, quote, original); promises exactly one record — forms:
  a record of
    where Connecting._get (connection, owner) has (eligible, evidence, gaps, need, reason, target)
    where eligible is among [true]
    where Seeking._record (need, owner) has (active: true, description)
    where view "trace of (owner)'s target (target) for need (need)" with (need, owner, target) has (label, source)
    where view "complete evidence (evidence) for (owner)" with (evidence, owner)
    where view "the memory (memory) owned by (owner)" with (memory: source, owner) has (content)
    connection
    content
    description
    eligible
    evidence
    gaps
    label
    need
    reason
    source
    sources: each Graphing._members (evidence, owner) has (claim)
      where view "current owned evidence (claim) for (owner)" with (claim, owner) has (content: original, quote, source: evidenceSource)
      form a record of
        claim
        content: original
        quote
        source: evidenceSource
    target
```

### results for (owner)'s need (need)

Authored path: `Circle.NeedResults`.
- Covered by [Circle](../design/compositions/Circle.md), line 85.

```former
Former "results for (owner)'s need (need)" — inputs (owner, need); bindings (description, active, target, label, source, evidence, reason, gaps, connection, content, claim, evidenceSource, quote, original); promises exactly one record — forms:
  a record of
    where Seeking._record (need, owner) has (active, description)
    active
    description
    need
    suggestions: each Graphing._trace (description, owner) has (evidence, gaps, label, reason, source, target)
      where active is among [true]
      where Connecting._suggestions (owner) has (connection, evidence, need, target)
      where view "complete evidence (evidence) for (owner)" with (evidence, owner)
      where view "the memory (memory) owned by (owner)" with (memory: source, owner) has (content)
      form a record of
        connection
        content
        evidence
        gaps
        label
        reason
        source
        sources: each Graphing._members (evidence, owner) has (claim)
          where view "current owned evidence (claim) for (owner)" with (claim, owner) has (content: original, quote, source: evidenceSource)
          form a record of
            claim
            content: original
            quote
            source: evidenceSource
        target
```

### saved memories of (owner) after (after)

Authored path: `Circle.SavedMemories`.
- Covered by [Circle](../design/compositions/Circle.md), line 28.

```former
Former "saved memories of (owner) after (after)" — inputs (owner, after); bindings (memory, content); promises exactly one record — forms:
  each Remembering._list (after, owner) has (content, memory)
    form a record of
      content
      memory
```

### saved needs of (owner)

Authored path: `Circle.SavedNeeds`.
- Covered by [Circle](../design/compositions/Circle.md), line 80.

```former
Former "saved needs of (owner)" — inputs (owner); bindings (need, description, active); promises exactly one record — forms:
  each Seeking._list (owner) has (active, description, need)
    form a record of
      active
      description
      need
```

## Reactions

### Circle.ClearDeletedNeed

Authored path: `Circle.ClearDeletedNeed`.
- Covered by [Circle](../design/compositions/Circle.md), line 231.

```reaction
when Seeking.delete (need, owner)
then
  Connecting.clear (need, owner)
```

### Circle.ClearResolvedNeed

Authored path: `Circle.ClearResolvedNeed`.
- Covered by [Circle](../design/compositions/Circle.md), line 230.

```reaction
when Seeking.resolve (need, owner)
then
  Connecting.clear (need, owner)
```

### Circle.DeleteNeed

Authored path: `Circle.DeleteNeed`.
- Covered by [Circle](../design/compositions/Circle.md), line 155.
- Covered by [Circle](../design/compositions/Circle.md), line 305.

```reaction
when RequestBoundary.request (need, path: "/needs/delete", requestId, session)
then
  Sessioning.use (session)
```

### Circle.DeleteNeed#2

Authored path: `Circle.DeleteNeed`.
- Covered by [Circle](../design/compositions/Circle.md), line 155.
- Covered by [Circle](../design/compositions/Circle.md), line 305.

```reaction
when Sessioning.use (session, subject: owner), asked by Circle.DeleteNeed
where
  earlier, RequestBoundary.request (need, path: "/needs/delete", requestId, session)
then
  Seeking.delete (need, owner)
```

### Circle.DeleteNeed#3

Authored path: `Circle.DeleteNeed`.
- Covered by [Circle](../design/compositions/Circle.md), line 155.
- Covered by [Circle](../design/compositions/Circle.md), line 305.

```reaction
when Seeking.delete (need, owner), asked by Circle.DeleteNeed#2
at the flow's settlement frontier
where
  earlier, RequestBoundary.request (need, path: "/needs/delete", requestId, session)
then
  RequestBoundary.respond (deleted: true, requestId)
```

### Circle.ExcludeSuggestion

Authored path: `Circle.ExcludeSuggestion`.
- Covered by [Circle](../design/compositions/Circle.md), line 170.
- Covered by [Circle](../design/compositions/Circle.md), line 308.

```reaction
when RequestBoundary.request (connection, explanation, path: "/suggestions/exclude", requestId, session)
then
  Sessioning.use (session)
```

### Circle.ExcludeSuggestion:found#2

Authored path: `Circle.ExcludeSuggestion`.
- Covered by [Circle](../design/compositions/Circle.md), line 170.
- Covered by [Circle](../design/compositions/Circle.md), line 308.

```reaction
when Sessioning.use (session, subject: owner), asked by Circle.ExcludeSuggestion
where
  earlier, RequestBoundary.request (connection, explanation, path: "/suggestions/exclude", requestId, session)
  view "current suggestion (connection) for (owner)" with (connection, owner)
then
  Connecting.exclude (connection, explanation, owner)
```

### Circle.ExcludeSuggestion:found#3

Authored path: `Circle.ExcludeSuggestion`.
- Covered by [Circle](../design/compositions/Circle.md), line 170.
- Covered by [Circle](../design/compositions/Circle.md), line 308.

```reaction
when Connecting.exclude (connection, explanation, owner), asked by Circle.ExcludeSuggestion:found#2
where
  earlier, RequestBoundary.request (connection, explanation, path: "/suggestions/exclude", requestId, session)
then
  RequestBoundary.respond (requestId, suggestions: former "current suggestions for (owner)" with (owner))
```

### Circle.ExcludeSuggestion:missing#2

Authored path: `Circle.ExcludeSuggestion`.
- Covered by [Circle](../design/compositions/Circle.md), line 170.
- Covered by [Circle](../design/compositions/Circle.md), line 308.

```reaction
when Sessioning.use (session, subject: owner), asked by Circle.ExcludeSuggestion
where
  earlier, RequestBoundary.request (connection, explanation, path: "/suggestions/exclude", requestId, session)
  no view "current suggestion (connection) for (owner)" with (connection, owner)
then
  RequestBoundary.respond (error: "NOT_FOUND", requestId)
```

### Circle.ForgetMemory

Authored path: `Circle.ForgetMemory`.
- Covered by [Circle](../design/compositions/Circle.md), line 122.
- Covered by [Circle](../design/compositions/Circle.md), line 297.

```reaction
when RequestBoundary.request (memory, path: "/memories/forget", requestId, session)
then
  Sessioning.use (session)
```

### Circle.ForgetMemory#2

Authored path: `Circle.ForgetMemory`.
- Covered by [Circle](../design/compositions/Circle.md), line 122.
- Covered by [Circle](../design/compositions/Circle.md), line 297.

```reaction
when Sessioning.use (session, subject: owner), asked by Circle.ForgetMemory
where
  earlier, RequestBoundary.request (memory, path: "/memories/forget", requestId, session)
then
  Remembering.forget (memory, owner)
```

### Circle.ForgetMemory#3

Authored path: `Circle.ForgetMemory`.
- Covered by [Circle](../design/compositions/Circle.md), line 122.
- Covered by [Circle](../design/compositions/Circle.md), line 297.

```reaction
when Remembering.forget (memory, owner), asked by Circle.ForgetMemory#2
at the flow's settlement frontier
where
  earlier, RequestBoundary.request (memory, path: "/memories/forget", requestId, session)
then
  RequestBoundary.respond (deleted: true, requestId)
```

### Circle.IndexRemembered

Authored path: `Circle.IndexRemembered`.
- Covered by [Circle](../design/compositions/Circle.md), line 220.

```reaction
when Remembering.remember (owner, memory)
where
  observedAt is the current flow's instant
  Remembering._record (memory, owner) has (content, revision)
then
  Graphing.ingest (content, observedAt, owner, source: memory, sourceRevision: revision)
```

### Circle.IndexRevised

Authored path: `Circle.IndexRevised`.
- Covered by [Circle](../design/compositions/Circle.md), line 222.

```reaction
when Remembering.revise (memory, owner)
where
  observedAt is the current flow's instant
  Remembering._record (memory, owner) has (content, revision)
then
  Graphing.ingest (content, observedAt, owner, source: memory, sourceRevision: revision)
```

### Circle.InspectMemory

Authored path: `Circle.InspectMemory`.
- Covered by [Circle](../design/compositions/Circle.md), line 75.
- Covered by [Circle](../design/compositions/Circle.md), line 295.

```reaction
when RequestBoundary.request (memory, path: "/memories/get", requestId, session)
then
  Sessioning.use (session)
```

### Circle.InspectMemory:found#2

Authored path: `Circle.InspectMemory`.
- Covered by [Circle](../design/compositions/Circle.md), line 75.
- Covered by [Circle](../design/compositions/Circle.md), line 295.

```reaction
when Sessioning.use (session, subject: owner), asked by Circle.InspectMemory
where
  earlier, RequestBoundary.request (memory, path: "/memories/get", requestId, session)
  view "the memory (memory) owned by (owner)" with (memory, owner)
then
  RequestBoundary.respond (memory: former "details of (owner)'s memory (memory)" with (memory, owner), requestId)
```

### Circle.InspectMemory:missing#2

Authored path: `Circle.InspectMemory`.
- Covered by [Circle](../design/compositions/Circle.md), line 75.
- Covered by [Circle](../design/compositions/Circle.md), line 295.

```reaction
when Sessioning.use (session, subject: owner), asked by Circle.InspectMemory
where
  earlier, RequestBoundary.request (memory, path: "/memories/get", requestId, session)
  no view "the memory (memory) owned by (owner)" with (memory, owner)
then
  RequestBoundary.respond (error: "NOT_FOUND", requestId)
```

### Circle.InspectSuggestion

Authored path: `Circle.InspectSuggestion`.
- Covered by [Circle](../design/compositions/Circle.md), line 168.
- Covered by [Circle](../design/compositions/Circle.md), line 307.

```reaction
when RequestBoundary.request (connection, path: "/suggestions/inspect", requestId, session)
then
  Sessioning.use (session)
```

### Circle.InspectSuggestion:found#2

Authored path: `Circle.InspectSuggestion`.
- Covered by [Circle](../design/compositions/Circle.md), line 168.
- Covered by [Circle](../design/compositions/Circle.md), line 307.

```reaction
when Sessioning.use (session, subject: owner), asked by Circle.InspectSuggestion
where
  earlier, RequestBoundary.request (connection, path: "/suggestions/inspect", requestId, session)
  view "current suggestion (connection) for (owner)" with (connection, owner)
then
  RequestBoundary.respond (requestId, suggestion: former "details of (owner)'s suggestion (connection)" with (connection, owner))
```

### Circle.InspectSuggestion:missing#2

Authored path: `Circle.InspectSuggestion`.
- Covered by [Circle](../design/compositions/Circle.md), line 168.
- Covered by [Circle](../design/compositions/Circle.md), line 307.

```reaction
when Sessioning.use (session, subject: owner), asked by Circle.InspectSuggestion
where
  earlier, RequestBoundary.request (connection, path: "/suggestions/inspect", requestId, session)
  no view "current suggestion (connection) for (owner)" with (connection, owner)
then
  RequestBoundary.respond (error: "NOT_FOUND", requestId)
```

### Circle.InvalidateBeforeIndex

Authored path: `Circle.InvalidateBeforeIndex`.
- Covered by [Circle](../design/compositions/Circle.md), line 248.

```reaction
when requested Graphing.ingest (owner)
where
  Seeking._active (owner) has (need)
then
  Connecting.reset (need, owner)
```

### Circle.ListMemories

Authored path: `Circle.ListMemories`.
- Covered by [Circle](../design/compositions/Circle.md), line 30.
- Covered by [Circle](../design/compositions/Circle.md), line 294.

```reaction
when RequestBoundary.request (after, path: "/memories/list", requestId, session)
then
  Sessioning.use (session)
```

### Circle.ListMemories#2

Authored path: `Circle.ListMemories`.
- Covered by [Circle](../design/compositions/Circle.md), line 30.
- Covered by [Circle](../design/compositions/Circle.md), line 294.

```reaction
when Sessioning.use (session, subject: owner), asked by Circle.ListMemories
where
  earlier, RequestBoundary.request (after, path: "/memories/list", requestId, session)
then
  RequestBoundary.respond (memories: former "saved memories of (owner) after (after)" with (after, owner), requestId)
```

### Circle.ListNeeds

Authored path: `Circle.ListNeeds`.
- Covered by [Circle](../design/compositions/Circle.md), line 84.
- Covered by [Circle](../design/compositions/Circle.md), line 301.

```reaction
when RequestBoundary.request (path: "/needs/list", requestId, session)
then
  Sessioning.use (session)
```

### Circle.ListNeeds#2

Authored path: `Circle.ListNeeds`.
- Covered by [Circle](../design/compositions/Circle.md), line 84.
- Covered by [Circle](../design/compositions/Circle.md), line 301.

```reaction
when Sessioning.use (session, subject: owner), asked by Circle.ListNeeds
where
  earlier, RequestBoundary.request (path: "/needs/list", requestId, session)
then
  RequestBoundary.respond (needs: former "saved needs of (owner)" with (owner), requestId)
```

### Circle.ListSuggestions

Authored path: `Circle.ListSuggestions`.
- Covered by [Circle](../design/compositions/Circle.md), line 166.
- Covered by [Circle](../design/compositions/Circle.md), line 306.

```reaction
when RequestBoundary.request (path: "/suggestions/list", requestId, session)
then
  Sessioning.use (session)
```

### Circle.ListSuggestions#2

Authored path: `Circle.ListSuggestions`.
- Covered by [Circle](../design/compositions/Circle.md), line 166.
- Covered by [Circle](../design/compositions/Circle.md), line 306.

```reaction
when Sessioning.use (session, subject: owner), asked by Circle.ListSuggestions
where
  earlier, RequestBoundary.request (path: "/suggestions/list", requestId, session)
then
  RequestBoundary.respond (requestId, suggestions: former "current suggestions for (owner)" with (owner))
```

### Circle.RefreshAfterIngest

Authored path: `Circle.RefreshAfterIngest`.
- Covered by [Circle](../design/compositions/Circle.md), line 236.

```reaction
when Graphing.ingest (owner)
where
  Seeking._active (owner) has (need)
then
  Connecting.reset (need, owner)
```

### Circle.RefreshAfterIngest#2

Authored path: `Circle.RefreshAfterIngest`.
- Covered by [Circle](../design/compositions/Circle.md), line 236.

```reaction
when Connecting.reset (need, owner), asked by Circle.RefreshAfterIngest
where
  Seeking._record (need, owner) has (active: true, description)
  Graphing._trace (description, owner) has (evidence, gaps, reason, target)
  view "complete evidence (evidence) for (owner)" with (evidence, owner)
  no Connecting._excluded (owner, target)
then
  Connecting.offer (description, evidence, gaps, need, owner, reason, target)
```

### Circle.RefreshAfterReject

Authored path: `Circle.RefreshAfterReject`.
- Covered by [Circle](../design/compositions/Circle.md), line 237.

```reaction
when Graphing.reject (owner)
where
  Seeking._active (owner) has (need)
then
  Connecting.reset (need, owner)
```

### Circle.RefreshAfterReject#2

Authored path: `Circle.RefreshAfterReject`.
- Covered by [Circle](../design/compositions/Circle.md), line 237.

```reaction
when Connecting.reset (need, owner), asked by Circle.RefreshAfterReject
where
  Seeking._record (need, owner) has (active: true, description)
  Graphing._trace (description, owner) has (evidence, gaps, reason, target)
  view "complete evidence (evidence) for (owner)" with (evidence, owner)
  no Connecting._excluded (owner, target)
then
  Connecting.offer (description, evidence, gaps, need, owner, reason, target)
```

### Circle.RefreshAfterRemove

Authored path: `Circle.RefreshAfterRemove`.
- Covered by [Circle](../design/compositions/Circle.md), line 239.

```reaction
when Graphing.remove (owner)
where
  Seeking._active (owner) has (need)
then
  Connecting.reset (need, owner)
```

### Circle.RefreshAfterRemove#2

Authored path: `Circle.RefreshAfterRemove`.
- Covered by [Circle](../design/compositions/Circle.md), line 239.

```reaction
when Connecting.reset (need, owner), asked by Circle.RefreshAfterRemove
where
  Seeking._record (need, owner) has (active: true, description)
  Graphing._trace (description, owner) has (evidence, gaps, reason, target)
  view "complete evidence (evidence) for (owner)" with (evidence, owner)
  no Connecting._excluded (owner, target)
then
  Connecting.offer (description, evidence, gaps, need, owner, reason, target)
```

### Circle.RefreshAfterRestore

Authored path: `Circle.RefreshAfterRestore`.
- Covered by [Circle](../design/compositions/Circle.md), line 238.

```reaction
when Graphing.restore (owner)
where
  Seeking._active (owner) has (need)
then
  Connecting.reset (need, owner)
```

### Circle.RefreshAfterRestore#2

Authored path: `Circle.RefreshAfterRestore`.
- Covered by [Circle](../design/compositions/Circle.md), line 238.

```reaction
when Connecting.reset (need, owner), asked by Circle.RefreshAfterRestore
where
  Seeking._record (need, owner) has (active: true, description)
  Graphing._trace (description, owner) has (evidence, gaps, reason, target)
  view "complete evidence (evidence) for (owner)" with (evidence, owner)
  no Connecting._excluded (owner, target)
then
  Connecting.offer (description, evidence, gaps, need, owner, reason, target)
```

### Circle.RefreshAfterRetract

Authored path: `Circle.RefreshAfterRetract`.
- Covered by [Circle](../design/compositions/Circle.md), line 240.

```reaction
when Graphing.retract (owner)
where
  Seeking._active (owner) has (need)
then
  Connecting.reset (need, owner)
```

### Circle.RefreshAfterRetract#2

Authored path: `Circle.RefreshAfterRetract`.
- Covered by [Circle](../design/compositions/Circle.md), line 240.

```reaction
when Connecting.reset (need, owner), asked by Circle.RefreshAfterRetract
where
  Seeking._record (need, owner) has (active: true, description)
  Graphing._trace (description, owner) has (evidence, gaps, reason, target)
  view "complete evidence (evidence) for (owner)" with (evidence, owner)
  no Connecting._excluded (owner, target)
then
  Connecting.offer (description, evidence, gaps, need, owner, reason, target)
```

### Circle.RefreshReopenedNeed

Authored path: `Circle.RefreshReopenedNeed`.
- Covered by [Circle](../design/compositions/Circle.md), line 233.

```reaction
when Seeking.reopen (need, owner)
then
  Connecting.reset (need, owner)
```

### Circle.RefreshReopenedNeed#2

Authored path: `Circle.RefreshReopenedNeed`.
- Covered by [Circle](../design/compositions/Circle.md), line 233.

```reaction
when Connecting.reset (need, owner), asked by Circle.RefreshReopenedNeed
where
  Seeking._record (need, owner) has (active: true, description)
  Graphing._trace (description, owner) has (evidence, gaps, reason, target)
  view "complete evidence (evidence) for (owner)" with (evidence, owner)
  no Connecting._excluded (owner, target)
then
  Connecting.offer (description, evidence, gaps, need, owner, reason, target)
```

### Circle.RefreshRevisedNeed

Authored path: `Circle.RefreshRevisedNeed`.
- Covered by [Circle](../design/compositions/Circle.md), line 230.

```reaction
when Seeking.revise (need, owner)
then
  Connecting.clear (need, owner)
```

### Circle.RefreshRevisedNeed#2

Authored path: `Circle.RefreshRevisedNeed`.
- Covered by [Circle](../design/compositions/Circle.md), line 230.

```reaction
when Connecting.clear (need, owner), asked by Circle.RefreshRevisedNeed
then
  Connecting.reset (need, owner)
```

### Circle.RefreshRevisedNeed#3

Authored path: `Circle.RefreshRevisedNeed`.
- Covered by [Circle](../design/compositions/Circle.md), line 230.

```reaction
when Connecting.reset (need, owner), asked by Circle.RefreshRevisedNeed#2
where
  Seeking._record (need, owner) has (active: true, description)
  Graphing._trace (description, owner) has (evidence, gaps, reason, target)
  view "complete evidence (evidence) for (owner)" with (evidence, owner)
  no Connecting._excluded (owner, target)
then
  Connecting.offer (description, evidence, gaps, need, owner, reason, target)
```

### Circle.RefreshSoughtNeed

Authored path: `Circle.RefreshSoughtNeed`.
- Covered by [Circle](../design/compositions/Circle.md), line 230.

```reaction
when Seeking.seek (owner, need)
then
  Connecting.clear (need, owner)
```

### Circle.RefreshSoughtNeed#2

Authored path: `Circle.RefreshSoughtNeed`.
- Covered by [Circle](../design/compositions/Circle.md), line 230.

```reaction
when Connecting.clear (need, owner), asked by Circle.RefreshSoughtNeed
then
  Connecting.reset (need, owner)
```

### Circle.RefreshSoughtNeed#3

Authored path: `Circle.RefreshSoughtNeed`.
- Covered by [Circle](../design/compositions/Circle.md), line 230.

```reaction
when Connecting.reset (need, owner), asked by Circle.RefreshSoughtNeed#2
where
  Seeking._record (need, owner) has (active: true, description)
  Graphing._trace (description, owner) has (evidence, gaps, reason, target)
  view "complete evidence (evidence) for (owner)" with (evidence, owner)
  no Connecting._excluded (owner, target)
then
  Connecting.offer (description, evidence, gaps, need, owner, reason, target)
```

### Circle.RefreshSuggestions

Authored path: `Circle.RefreshSuggestions`.
- Covered by [Circle](../design/compositions/Circle.md), line 187.
- Covered by [Circle](../design/compositions/Circle.md), line 309.

```reaction
when RequestBoundary.request (path: "/suggestions/refresh", requestId, session)
at the flow's settlement frontier
then
  Sessioning.use (session)
```

### Circle.RefreshSuggestions#2

Authored path: `Circle.RefreshSuggestions`.
- Covered by [Circle](../design/compositions/Circle.md), line 187.
- Covered by [Circle](../design/compositions/Circle.md), line 309.

```reaction
when Sessioning.use (session, subject: owner), asked by Circle.RefreshSuggestions
where
  earlier, RequestBoundary.request (path: "/suggestions/refresh", requestId, session)
then
  RequestBoundary.respond (requestId, suggestions: former "current suggestions for (owner)" with (owner))
```

### Circle.RefreshSuggestionsWork

Authored path: `Circle.RefreshSuggestionsWork`.
- Covered by [Circle](../design/compositions/Circle.md), line 185.
- Covered by [Circle](../design/compositions/Circle.md), line 310.

```reaction
when RequestBoundary.request (path: "/suggestions/refresh", requestId, session)
then
  Sessioning.use (session)
```

### Circle.RefreshSuggestionsWork#2

Authored path: `Circle.RefreshSuggestionsWork`.
- Covered by [Circle](../design/compositions/Circle.md), line 185.
- Covered by [Circle](../design/compositions/Circle.md), line 310.

```reaction
when Sessioning.use (session, subject: owner), asked by Circle.RefreshSuggestionsWork
where
  Seeking._active (owner) has (need)
then
  Connecting.reset (need, owner)
```

### Circle.RefreshSuggestionsWork#3

Authored path: `Circle.RefreshSuggestionsWork`.
- Covered by [Circle](../design/compositions/Circle.md), line 185.
- Covered by [Circle](../design/compositions/Circle.md), line 310.

```reaction
when Connecting.reset (need, owner), asked by Circle.RefreshSuggestionsWork#2
where
  Seeking._record (need, owner) has (active: true, description)
  Graphing._trace (description, owner) has (evidence, gaps, reason, target)
  view "complete evidence (evidence) for (owner)" with (evidence, owner)
  no Connecting._excluded (owner, target)
then
  Connecting.offer (description, evidence, gaps, need, owner, reason, target)
```

### Circle.RejectClaim

Authored path: `Circle.RejectClaim`.
- Covered by [Circle](../design/compositions/Circle.md), line 176.
- Covered by [Circle](../design/compositions/Circle.md), line 311.

```reaction
when RequestBoundary.request (claim, path: "/claims/reject", requestId, session)
then
  Sessioning.use (session)
```

### Circle.RejectClaim#2

Authored path: `Circle.RejectClaim`.
- Covered by [Circle](../design/compositions/Circle.md), line 176.
- Covered by [Circle](../design/compositions/Circle.md), line 311.

```reaction
when Sessioning.use (session, subject: owner), asked by Circle.RejectClaim
where
  earlier, RequestBoundary.request (claim, path: "/claims/reject", requestId, session)
then
  Graphing.reject (claim, owner)
```

### Circle.RejectClaim#3

Authored path: `Circle.RejectClaim`.
- Covered by [Circle](../design/compositions/Circle.md), line 176.
- Covered by [Circle](../design/compositions/Circle.md), line 311.

```reaction
when Graphing.reject (claim, owner), asked by Circle.RejectClaim#2
at the flow's settlement frontier
where
  earlier, RequestBoundary.request (claim, path: "/claims/reject", requestId, session)
then
  RequestBoundary.respond (requestId, suggestions: former "current suggestions for (owner)" with (owner))
```

### Circle.Remember

Authored path: `Circle.Remember`.
- Covered by [Circle](../design/compositions/Circle.md), line 107.
- Covered by [Circle](../design/compositions/Circle.md), line 293.

```reaction
when RequestBoundary.request (content, path: "/memories/remember", requestId, session, submission)
where
  capturedAt is the current flow's instant
then
  Sessioning.use (session)
```

### Circle.Remember#2

Authored path: `Circle.Remember`.
- Covered by [Circle](../design/compositions/Circle.md), line 107.
- Covered by [Circle](../design/compositions/Circle.md), line 293.

```reaction
when Sessioning.use (session, subject: owner), asked by Circle.Remember
where
  earlier, RequestBoundary.request (content, path: "/memories/remember", requestId, session, submission)
  capturedAt is the current flow's instant
then
  Remembering.remember (capturedAt, content, owner, submission)
```

### Circle.Remember#3

Authored path: `Circle.Remember`.
- Covered by [Circle](../design/compositions/Circle.md), line 107.
- Covered by [Circle](../design/compositions/Circle.md), line 293.

```reaction
when Remembering.remember (capturedAt, content, owner, submission, memory), asked by Circle.Remember#2
at the flow's settlement frontier
where
  earlier, RequestBoundary.request (content, path: "/memories/remember", requestId, session, submission)
then
  RequestBoundary.respond (memory, requestId)
```

### Circle.RemoveClaim

Authored path: `Circle.RemoveClaim`.
- Covered by [Circle](../design/compositions/Circle.md), line 177.
- Covered by [Circle](../design/compositions/Circle.md), line 313.

```reaction
when RequestBoundary.request (claim, path: "/claims/remove", requestId, session)
then
  Sessioning.use (session)
```

### Circle.RemoveClaim#2

Authored path: `Circle.RemoveClaim`.
- Covered by [Circle](../design/compositions/Circle.md), line 177.
- Covered by [Circle](../design/compositions/Circle.md), line 313.

```reaction
when Sessioning.use (session, subject: owner), asked by Circle.RemoveClaim
where
  earlier, RequestBoundary.request (claim, path: "/claims/remove", requestId, session)
then
  Graphing.remove (claim, owner)
```

### Circle.RemoveClaim#3

Authored path: `Circle.RemoveClaim`.
- Covered by [Circle](../design/compositions/Circle.md), line 177.
- Covered by [Circle](../design/compositions/Circle.md), line 313.

```reaction
when Graphing.remove (claim, owner), asked by Circle.RemoveClaim#2
at the flow's settlement frontier
where
  earlier, RequestBoundary.request (claim, path: "/claims/remove", requestId, session)
then
  RequestBoundary.respond (requestId, suggestions: former "current suggestions for (owner)" with (owner))
```

### Circle.ReopenNeed

Authored path: `Circle.ReopenNeed`.
- Covered by [Circle](../design/compositions/Circle.md), line 155.
- Covered by [Circle](../design/compositions/Circle.md), line 304.

```reaction
when RequestBoundary.request (need, path: "/needs/reopen", requestId, session)
then
  Sessioning.use (session)
```

### Circle.ReopenNeed#2

Authored path: `Circle.ReopenNeed`.
- Covered by [Circle](../design/compositions/Circle.md), line 155.
- Covered by [Circle](../design/compositions/Circle.md), line 304.

```reaction
when Sessioning.use (session, subject: owner), asked by Circle.ReopenNeed
where
  earlier, RequestBoundary.request (need, path: "/needs/reopen", requestId, session)
then
  Seeking.reopen (need, owner)
```

### Circle.ReopenNeed#3

Authored path: `Circle.ReopenNeed`.
- Covered by [Circle](../design/compositions/Circle.md), line 155.
- Covered by [Circle](../design/compositions/Circle.md), line 304.

```reaction
when Seeking.reopen (need, owner), asked by Circle.ReopenNeed#2
at the flow's settlement frontier
where
  earlier, RequestBoundary.request (need, path: "/needs/reopen", requestId, session)
then
  RequestBoundary.respond (requestId, results: former "results for (owner)'s need (need)" with (need, owner))
```

### Circle.ResolveNeed

Authored path: `Circle.ResolveNeed`.
- Covered by [Circle](../design/compositions/Circle.md), line 154.
- Covered by [Circle](../design/compositions/Circle.md), line 303.

```reaction
when RequestBoundary.request (need, path: "/needs/resolve", requestId, session)
then
  Sessioning.use (session)
```

### Circle.ResolveNeed#2

Authored path: `Circle.ResolveNeed`.
- Covered by [Circle](../design/compositions/Circle.md), line 154.
- Covered by [Circle](../design/compositions/Circle.md), line 303.

```reaction
when Sessioning.use (session, subject: owner), asked by Circle.ResolveNeed
where
  earlier, RequestBoundary.request (need, path: "/needs/resolve", requestId, session)
then
  Seeking.resolve (need, owner)
```

### Circle.ResolveNeed#3

Authored path: `Circle.ResolveNeed`.
- Covered by [Circle](../design/compositions/Circle.md), line 154.
- Covered by [Circle](../design/compositions/Circle.md), line 303.

```reaction
when Seeking.resolve (need, owner), asked by Circle.ResolveNeed#2
at the flow's settlement frontier
where
  earlier, RequestBoundary.request (need, path: "/needs/resolve", requestId, session)
then
  RequestBoundary.respond (requestId, results: former "results for (owner)'s need (need)" with (need, owner))
```

### Circle.RestoreClaim

Authored path: `Circle.RestoreClaim`.
- Covered by [Circle](../design/compositions/Circle.md), line 176.
- Covered by [Circle](../design/compositions/Circle.md), line 312.

```reaction
when RequestBoundary.request (claim, path: "/claims/restore", requestId, session)
then
  Sessioning.use (session)
```

### Circle.RestoreClaim#2

Authored path: `Circle.RestoreClaim`.
- Covered by [Circle](../design/compositions/Circle.md), line 176.
- Covered by [Circle](../design/compositions/Circle.md), line 312.

```reaction
when Sessioning.use (session, subject: owner), asked by Circle.RestoreClaim
where
  earlier, RequestBoundary.request (claim, path: "/claims/restore", requestId, session)
then
  Graphing.restore (claim, owner)
```

### Circle.RestoreClaim#3

Authored path: `Circle.RestoreClaim`.
- Covered by [Circle](../design/compositions/Circle.md), line 176.
- Covered by [Circle](../design/compositions/Circle.md), line 312.

```reaction
when Graphing.restore (claim, owner), asked by Circle.RestoreClaim#2
at the flow's settlement frontier
where
  earlier, RequestBoundary.request (claim, path: "/claims/restore", requestId, session)
then
  RequestBoundary.respond (requestId, suggestions: former "current suggestions for (owner)" with (owner))
```

### Circle.RetractForgotten

Authored path: `Circle.RetractForgotten`.
- Covered by [Circle](../design/compositions/Circle.md), line 226.

```reaction
when Remembering.forget (memory, owner)
then
  Graphing.retract (owner, source: memory)
```

### Circle.RetryMemoryIndex

Authored path: `Circle.RetryMemoryIndex`.
- Covered by [Circle](../design/compositions/Circle.md), line 125.
- Covered by [Circle](../design/compositions/Circle.md), line 298.

```reaction
when RequestBoundary.request (memory, path: "/memories/reindex", requestId, session)
where
  observedAt is the current flow's instant
then
  Sessioning.use (session)
```

### Circle.RetryMemoryIndex:found#2

Authored path: `Circle.RetryMemoryIndex`.
- Covered by [Circle](../design/compositions/Circle.md), line 125.
- Covered by [Circle](../design/compositions/Circle.md), line 298.

```reaction
when Sessioning.use (session, subject: owner), asked by Circle.RetryMemoryIndex
where
  earlier, RequestBoundary.request (memory, path: "/memories/reindex", requestId, session)
  Remembering._record (memory, owner) has (content, revision)
  observedAt is the current flow's instant
then
  Graphing.ingest (content, observedAt, owner, source: memory, sourceRevision: revision)
```

### Circle.RetryMemoryIndex:found#3

Authored path: `Circle.RetryMemoryIndex`.
- Covered by [Circle](../design/compositions/Circle.md), line 125.
- Covered by [Circle](../design/compositions/Circle.md), line 298.

```reaction
when Graphing.ingest (content, observedAt, owner, source: memory, sourceRevision: revision), asked by Circle.RetryMemoryIndex:found#2
at the flow's settlement frontier
where
  Remembering._record (memory, owner)
  earlier, RequestBoundary.request (memory, path: "/memories/reindex", requestId, session)
then
  RequestBoundary.respond (memory, requestId)
```

### Circle.RetryMemoryIndex:missing#2

Authored path: `Circle.RetryMemoryIndex`.
- Covered by [Circle](../design/compositions/Circle.md), line 125.
- Covered by [Circle](../design/compositions/Circle.md), line 298.

```reaction
when Sessioning.use (session, subject: owner), asked by Circle.RetryMemoryIndex
where
  earlier, RequestBoundary.request (memory, path: "/memories/reindex", requestId, session)
  no Remembering._record (memory, owner)
then
  RequestBoundary.respond (error: "NOT_FOUND", requestId)
```

### Circle.RetryMemoryIndex:missing#3

Authored path: `Circle.RetryMemoryIndex`.
- Covered by [Circle](../design/compositions/Circle.md), line 125.
- Covered by [Circle](../design/compositions/Circle.md), line 298.

```reaction
when RequestBoundary.respond (error: "NOT_FOUND", requestId), asked by Circle.RetryMemoryIndex:missing#2
at the flow's settlement frontier
where
  earlier, Sessioning.use (session, subject: owner), asked by Circle.RetryMemoryIndex
  earlier, RequestBoundary.request (memory, path: "/memories/reindex", requestId, session)
  Remembering._record (memory, owner)
then
  RequestBoundary.respond (memory, requestId)
```

### Circle.ReviseMemory

Authored path: `Circle.ReviseMemory`.
- Covered by [Circle](../design/compositions/Circle.md), line 118.
- Covered by [Circle](../design/compositions/Circle.md), line 296.

```reaction
when RequestBoundary.request (content, memory, path: "/memories/revise", requestId, session)
then
  Sessioning.use (session)
```

### Circle.ReviseMemory#2

Authored path: `Circle.ReviseMemory`.
- Covered by [Circle](../design/compositions/Circle.md), line 118.
- Covered by [Circle](../design/compositions/Circle.md), line 296.

```reaction
when Sessioning.use (session, subject: owner), asked by Circle.ReviseMemory
where
  earlier, RequestBoundary.request (content, memory, path: "/memories/revise", requestId, session)
then
  Remembering.revise (content, memory, owner)
```

### Circle.ReviseMemory#3

Authored path: `Circle.ReviseMemory`.
- Covered by [Circle](../design/compositions/Circle.md), line 118.
- Covered by [Circle](../design/compositions/Circle.md), line 296.

```reaction
when Remembering.revise (content, memory, owner), asked by Circle.ReviseMemory#2
at the flow's settlement frontier
where
  earlier, RequestBoundary.request (content, memory, path: "/memories/revise", requestId, session)
then
  RequestBoundary.respond (memory, requestId)
```

### Circle.ReviseNeed

Authored path: `Circle.ReviseNeed`.
- Covered by [Circle](../design/compositions/Circle.md), line 154.
- Covered by [Circle](../design/compositions/Circle.md), line 302.

```reaction
when RequestBoundary.request (description, need, path: "/needs/revise", requestId, session)
then
  Sessioning.use (session)
```

### Circle.ReviseNeed#2

Authored path: `Circle.ReviseNeed`.
- Covered by [Circle](../design/compositions/Circle.md), line 154.
- Covered by [Circle](../design/compositions/Circle.md), line 302.

```reaction
when Sessioning.use (session, subject: owner), asked by Circle.ReviseNeed
where
  earlier, RequestBoundary.request (description, need, path: "/needs/revise", requestId, session)
then
  Seeking.revise (description, need, owner)
```

### Circle.ReviseNeed#3

Authored path: `Circle.ReviseNeed`.
- Covered by [Circle](../design/compositions/Circle.md), line 154.
- Covered by [Circle](../design/compositions/Circle.md), line 302.

```reaction
when Seeking.revise (description, need, owner), asked by Circle.ReviseNeed#2
at the flow's settlement frontier
where
  earlier, RequestBoundary.request (description, need, path: "/needs/revise", requestId, session)
then
  RequestBoundary.respond (requestId, results: former "results for (owner)'s need (need)" with (need, owner))
```

### Circle.Seek

Authored path: `Circle.Seek`.
- Covered by [Circle](../design/compositions/Circle.md), line 143.
- Covered by [Circle](../design/compositions/Circle.md), line 300.

```reaction
when RequestBoundary.request (description, path: "/needs/seek", requestId, session)
where
  createdAt is the current flow's instant
then
  Sessioning.use (session)
```

### Circle.Seek#2

Authored path: `Circle.Seek`.
- Covered by [Circle](../design/compositions/Circle.md), line 143.
- Covered by [Circle](../design/compositions/Circle.md), line 300.

```reaction
when Sessioning.use (session, subject: owner), asked by Circle.Seek
where
  earlier, RequestBoundary.request (description, path: "/needs/seek", requestId, session)
  createdAt is the current flow's instant
then
  Seeking.seek (createdAt, description, owner)
```

### Circle.Seek#3

Authored path: `Circle.Seek`.
- Covered by [Circle](../design/compositions/Circle.md), line 143.
- Covered by [Circle](../design/compositions/Circle.md), line 300.

```reaction
when Seeking.seek (createdAt, description, owner, need), asked by Circle.Seek#2
at the flow's settlement frontier
where
  earlier, RequestBoundary.request (description, path: "/needs/seek", requestId, session)
then
  RequestBoundary.respond (requestId, results: former "results for (owner)'s need (need)" with (need, owner))
```

### Circle.Transcribe

Authored path: `Circle.Transcribe`.
- Covered by [Circle](../design/compositions/Circle.md), line 131.
- Covered by [Circle](../design/compositions/Circle.md), line 299.

```reaction
when RequestBoundary.request (audio, mediaType, path: "/capture/transcribe", requestId, session)
then
  Sessioning.use (session)
```

### Circle.Transcribe#2

Authored path: `Circle.Transcribe`.
- Covered by [Circle](../design/compositions/Circle.md), line 131.
- Covered by [Circle](../design/compositions/Circle.md), line 299.

```reaction
when Sessioning.use (session, subject: owner), asked by Circle.Transcribe
where
  earlier, RequestBoundary.request (audio, mediaType, path: "/capture/transcribe", requestId, session)
then
  Remembering.transcribe (audio, mediaType, owner)
```

### Circle.Transcribe#3

Authored path: `Circle.Transcribe`.
- Covered by [Circle](../design/compositions/Circle.md), line 131.
- Covered by [Circle](../design/compositions/Circle.md), line 299.

```reaction
when Remembering.transcribe (audio, mediaType, owner, content), asked by Circle.Transcribe#2
where
  earlier, RequestBoundary.request (audio, mediaType, path: "/capture/transcribe", requestId, session)
then
  RequestBoundary.respond (content, requestId)
```

### DeliverFaultToAsker

```reaction
when any action is faulted, not asked by DeliverFaultToAsker
where
  earlier, RequestBoundary.request (requestId)
then
  RequestBoundary.respondFramework (error: "INTERNAL_ERROR", requestId)
```

### DeliverRefusalToAsker

```reaction
when any action is refused (message), except RequestBoundary
where
  earlier, RequestBoundary.request (requestId)
then
  RequestBoundary.respond (error: message, requestId)
```

### reusable.accounts.identifying.Me

Authored path: `reusable.accounts.identifying.Me`.
- Covered by [Accounts](../design/compositions/reusable/accounts.md), line 5.
- Covered by [Accounts](../design/compositions/reusable/accounts.md), line 8.

```reaction
when RequestBoundary.request (path: "/auth/me", requestId, session)
then
  Sessioning.use (session)
```

### reusable.accounts.identifying.Me#2

Authored path: `reusable.accounts.identifying.Me`.
- Covered by [Accounts](../design/compositions/reusable/accounts.md), line 5.
- Covered by [Accounts](../design/compositions/reusable/accounts.md), line 8.

```reaction
when Sessioning.use (session, subject: user), asked by reusable.accounts.identifying.Me
where
  Registering._username (user) has (username)
  earlier, RequestBoundary.request (path: "/auth/me", requestId, session)
then
  RequestBoundary.respond (requestId, username)
```

### reusable.accounts.leaving.SignOut

Authored path: `reusable.accounts.leaving.SignOut`.
- Covered by [Accounts](../design/compositions/reusable/accounts.md), line 11.
- Covered by [Accounts](../design/compositions/reusable/accounts.md), line 14.

```reaction
when RequestBoundary.request (path: "/auth/logout", requestId, session)
then
  Sessioning.end (session)
```

### reusable.accounts.leaving.SignOut#2

Authored path: `reusable.accounts.leaving.SignOut`.
- Covered by [Accounts](../design/compositions/reusable/accounts.md), line 11.
- Covered by [Accounts](../design/compositions/reusable/accounts.md), line 14.

```reaction
when Sessioning.end (session), asked by reusable.accounts.leaving.SignOut
where
  earlier, RequestBoundary.request (path: "/auth/logout", requestId, session)
then
  RequestBoundary.respond (requestId)
```

### reusable.commons.finishing.ChooseUsername:expired

Authored path: `reusable.commons.finishing.ChooseUsername`.
- Covered by [Signing in with Commons](../design/compositions/reusable/commons.md), line 22.
- Covered by [Signing in with Commons](../design/compositions/reusable/commons.md), line 26.

```reaction
when RequestBoundary.request (attempt, path: "/auth/commons/choose", requestId, username)
where
  CommonsFederating._linkable (attempt) has (linkable: false)
then
  RequestBoundary.respond (error: "SIGN_IN_EXPIRED", requestId)
```

### reusable.commons.finishing.ChooseUsername:linkable

Authored path: `reusable.commons.finishing.ChooseUsername`.
- Covered by [Signing in with Commons](../design/compositions/reusable/commons.md), line 22.
- Covered by [Signing in with Commons](../design/compositions/reusable/commons.md), line 26.

```reaction
when RequestBoundary.request (attempt, path: "/auth/commons/choose", requestId, username)
where
  CommonsFederating._linkable (attempt) has (linkable: true)
then
  Registering.register (username)
```

### reusable.commons.finishing.ChooseUsername:linkable#2

Authored path: `reusable.commons.finishing.ChooseUsername`.
- Covered by [Signing in with Commons](../design/compositions/reusable/commons.md), line 22.
- Covered by [Signing in with Commons](../design/compositions/reusable/commons.md), line 26.

```reaction
when Registering.register (username, user), asked by reusable.commons.finishing.ChooseUsername:linkable
where
  earlier, RequestBoundary.request (attempt, path: "/auth/commons/choose", requestId, username)
then
  CommonsFederating.link (attempt, user)
```

### reusable.commons.finishing.ChooseUsername:linkable#3

Authored path: `reusable.commons.finishing.ChooseUsername`.
- Covered by [Signing in with Commons](../design/compositions/reusable/commons.md), line 22.
- Covered by [Signing in with Commons](../design/compositions/reusable/commons.md), line 26.

```reaction
when CommonsFederating.link (attempt, user), asked by reusable.commons.finishing.ChooseUsername:linkable#2
then
  Sessioning.start (subject: user)
```

### reusable.commons.finishing.ChooseUsername:linkable#4

Authored path: `reusable.commons.finishing.ChooseUsername`.
- Covered by [Signing in with Commons](../design/compositions/reusable/commons.md), line 22.
- Covered by [Signing in with Commons](../design/compositions/reusable/commons.md), line 26.

```reaction
when Sessioning.start (subject: user, expiresAt, session), asked by reusable.commons.finishing.ChooseUsername:linkable#3
where
  earlier, RequestBoundary.request (attempt, path: "/auth/commons/choose", requestId, username)
then
  RequestBoundary.respond (expiresAt, requestId, session, user)
```

### reusable.commons.finishing.FinishCommons

Authored path: `reusable.commons.finishing.FinishCommons`.
- Covered by [Signing in with Commons](../design/compositions/reusable/commons.md), line 15.
- Covered by [Signing in with Commons](../design/compositions/reusable/commons.md), line 25.

```reaction
when RequestBoundary.request (attempt, code, path: "/auth/commons/finish", requestId, state)
then
  CommonsFederating.finish (attempt, code, nonce: state)
```

### reusable.commons.finishing.FinishCommons:new#2

Authored path: `reusable.commons.finishing.FinishCommons`.
- Covered by [Signing in with Commons](../design/compositions/reusable/commons.md), line 15.
- Covered by [Signing in with Commons](../design/compositions/reusable/commons.md), line 25.

```reaction
when CommonsFederating.finish (attempt, code, nonce: state, username), asked by reusable.commons.finishing.FinishCommons
where
  no CommonsFederating._user (attempt)
then
  Registering.register (username)
```

### reusable.commons.finishing.FinishCommons:new#3

Authored path: `reusable.commons.finishing.FinishCommons`.
- Covered by [Signing in with Commons](../design/compositions/reusable/commons.md), line 15.
- Covered by [Signing in with Commons](../design/compositions/reusable/commons.md), line 25.

```reaction
when Registering.register (username, user), asked by reusable.commons.finishing.FinishCommons:new#2
where
  earlier, CommonsFederating.finish (attempt, code, nonce: state, username), asked by reusable.commons.finishing.FinishCommons
then
  CommonsFederating.link (attempt, user)
```

### reusable.commons.finishing.FinishCommons:new#4

Authored path: `reusable.commons.finishing.FinishCommons`.
- Covered by [Signing in with Commons](../design/compositions/reusable/commons.md), line 15.
- Covered by [Signing in with Commons](../design/compositions/reusable/commons.md), line 25.

```reaction
when CommonsFederating.link (attempt, user), asked by reusable.commons.finishing.FinishCommons:new#3
then
  Sessioning.start (subject: user)
```

### reusable.commons.finishing.FinishCommons:new#5

Authored path: `reusable.commons.finishing.FinishCommons`.
- Covered by [Signing in with Commons](../design/compositions/reusable/commons.md), line 15.
- Covered by [Signing in with Commons](../design/compositions/reusable/commons.md), line 25.

```reaction
when Sessioning.start (subject: user, expiresAt, session), asked by reusable.commons.finishing.FinishCommons:new#4
where
  earlier, RequestBoundary.request (attempt, code, path: "/auth/commons/finish", requestId, state)
then
  RequestBoundary.respond (expiresAt, requestId, session, user)
```

### reusable.commons.finishing.FinishCommons:returning#2

Authored path: `reusable.commons.finishing.FinishCommons`.
- Covered by [Signing in with Commons](../design/compositions/reusable/commons.md), line 15.
- Covered by [Signing in with Commons](../design/compositions/reusable/commons.md), line 25.

```reaction
when CommonsFederating.finish (attempt, code, nonce: state, username), asked by reusable.commons.finishing.FinishCommons
where
  CommonsFederating._user (attempt) has (user)
then
  Sessioning.start (subject: user)
```

### reusable.commons.finishing.FinishCommons:returning#3

Authored path: `reusable.commons.finishing.FinishCommons`.
- Covered by [Signing in with Commons](../design/compositions/reusable/commons.md), line 15.
- Covered by [Signing in with Commons](../design/compositions/reusable/commons.md), line 25.

```reaction
when Sessioning.start (subject: user, expiresAt, session), asked by reusable.commons.finishing.FinishCommons:returning#2
where
  earlier, RequestBoundary.request (attempt, code, path: "/auth/commons/finish", requestId, state)
then
  RequestBoundary.respond (expiresAt, requestId, session, user)
```

### reusable.commons.starting.StartCommons

Authored path: `reusable.commons.starting.StartCommons`.
- Covered by [Signing in with Commons](../design/compositions/reusable/commons.md), line 7.
- Covered by [Signing in with Commons](../design/compositions/reusable/commons.md), line 10.

```reaction
when RequestBoundary.request (path: "/auth/commons/start", requestId)
then
  CommonsFederating.start ()
```

### reusable.commons.starting.StartCommons#2

Authored path: `reusable.commons.starting.StartCommons`.
- Covered by [Signing in with Commons](../design/compositions/reusable/commons.md), line 7.
- Covered by [Signing in with Commons](../design/compositions/reusable/commons.md), line 10.

```reaction
when CommonsFederating.start (address, attempt, expiresAt), asked by reusable.commons.starting.StartCommons
where
  earlier, RequestBoundary.request (path: "/auth/commons/start", requestId)
then
  RequestBoundary.respond (address, attempt, expiresAt, requestId)
```

## Endpoint input contracts

Before recording an action ask, the boundary rejects a body that is not an
object or lacks a required key. The response uses `INVALID_INPUT` and names
the path or missing key. A declared default fills an absent key. Endpoints
not listed here have no explicit input contract.

- `/auth/commons/choose` — requires `attempt`, `username`
- `/auth/commons/finish` — requires `attempt`, `code`, `state`
- `/auth/logout` — requires `session`
- `/auth/me` — requires `session`
- `/capture/transcribe` — requires `audio`, `mediaType`, `session`
- `/claims/reject` — requires `claim`, `session`
- `/claims/remove` — requires `claim`, `session`
- `/claims/restore` — requires `claim`, `session`
- `/memories/forget` — requires `memory`, `session`
- `/memories/get` — requires `memory`, `session`
- `/memories/list` — requires `session`, `after`
- `/memories/reindex` — requires `memory`, `session`
- `/memories/remember` — requires `session`, `content`, `submission`
- `/memories/revise` — requires `content`, `memory`, `session`
- `/needs/delete` — requires `need`, `session`
- `/needs/list` — requires `session`
- `/needs/reopen` — requires `need`, `session`
- `/needs/resolve` — requires `need`, `session`
- `/needs/revise` — requires `description`, `need`, `session`
- `/needs/seek` — requires `description`, `session`
- `/suggestions/exclude` — requires `connection`, `explanation`, `session`
- `/suggestions/inspect` — requires `connection`, `session`
- `/suggestions/list` — requires `session`
- `/suggestions/refresh` — requires `session`
