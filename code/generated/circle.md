<!-- Generated from the Circle assembly. Do not edit. -->
<!-- Manifest producer: @mit-sdg/sync-engine@1.1.0; concept specification: sync-engine.concept-specification@1; renderer: @mit-sdg/sync-engine@1.1.0. -->

# Circle — assembled read-back

_Assembled by sync-engine from registered concepts and composition. Edit the concept_
_specifications and composition source, then regenerate this file._

## Concepts

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

- `CommonsFederating` — instance of `Federating` — [Circle types](../design/types.md), line 14.
  - `User` is `Registering.User` — [Circle types](../design/types.md), line 15.

### Graphing

Defined in [Graphing](../design/concepts/Graphing.md), line 1.

#### Actions

- `ingest(owner: User, source: Source, content: String) : returns ()`
  - Refuses `EMPTY_SOURCE_CONTENT`: Source content must not be blank.
  - Refuses `SOURCE_NOT_OWNED`: The source belongs to another user.

#### Queries

- `_trace(owner: User, description: String) : many (target: Entity, label: String, source: Source, reason: String)`

#### Instances

- `Graphing` — instance of `Graphing` — [Circle types](../design/types.md), line 26.
  - `Source` is `Remembering.Memory` — [Circle types](../design/types.md), line 28.
  - `User` is `Registering.User` — [Circle types](../design/types.md), line 27.

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

- `Registering` — instance of `Registering` — [Circle types](../design/types.md), line 12.

### Remembering

Defined in [Remembering](../design/concepts/Remembering.md), line 1.

#### Actions

- `remember(owner: User, content: String) : returns (memory: Memory)`
  - Refuses `EMPTY_CONTENT`: Encounter content must not be blank.

#### Queries

- `_get(owner: User, memory: Memory) : optional (content: String)`

#### Instances

- `Remembering` — instance of `Remembering` — [Circle types](../design/types.md), line 20.
  - `User` is `Registering.User` — [Circle types](../design/types.md), line 21.

### Seeking

Defined in [Seeking](../design/concepts/Seeking.md), line 1.

#### Actions

- `seek(owner: User, description: String) : returns (need: Need)`
  - Refuses `EMPTY_DESCRIPTION`: The need description must not be blank.

#### Queries

- `_get(owner: User, need: Need) : optional (description: String)`

#### Instances

- `Seeking` — instance of `Seeking` — [Circle types](../design/types.md), line 23.
  - `User` is `Registering.User` — [Circle types](../design/types.md), line 24.

### Sessioning

Defined in [Sessioning](../design/concepts/Sessioning.md), line 1.

#### Actions

- `start(subject: Subject) : returns (session: Session, expiresAt: DateTime)`
- `use(session: Session) : returns (subject: Subject)`
  - Refuses `NOT_SIGNED_IN`: Your session has ended. Sign in again.
- `end(session: Session) : returns (session: Session)`
  - Refuses `NOT_SIGNED_IN`: Your session has ended. Sign in again.

#### Instances

- `Sessioning` — instance of `Sessioning` — [Circle types](../design/types.md), line 17.
  - `Subject` is `Registering.User` — [Circle types](../design/types.md), line 18.

## Views

_Views name reusable conditions. Multiple `where` blocks are alternatives._

### the memory (memory) owned by (owner)

Authored path: `Circle.OwnedMemory`.
- Covered by [Circle](../design/compositions/Circle.md), line 6.

```view
the memory (memory) owned by (owner) — inputs (owner, memory); outputs (content); bindings () — answers at most one (content)
  where Remembering._get (memory, owner) has (content)
```

## Formers

_Formers name result shapes evaluated when asked. The source former owns_
_the authored explanation; this section records the generated shape._

### results for (owner)'s need (need)

Authored path: `Circle.NeedResults`.
- Covered by [Circle](../design/compositions/Circle.md), line 10.

```former
Former "results for (owner)'s need (need)" — inputs (owner, need); bindings (description, target, label, source, reason, content); promises exactly one record — forms:
  a record of
    where Seeking._get (need, owner) has (description)
    description
    need
    suggestions: each Graphing._trace (description, owner) has (label, reason, source, target)
      where view "the memory (memory) owned by (owner)" with (memory: source, owner) has (content)
      form a record of
        content
        label
        reason
        source
        target
```

## Reactions

### Circle.Remember

Authored path: `Circle.Remember`.
- Covered by [Circle](../design/compositions/Circle.md), line 18.
- Covered by [Circle](../design/compositions/Circle.md), line 37.

```reaction
when RequestBoundary.request (content, path: "/memories/remember", requestId, session)
then
  Sessioning.use (session)
```

### Circle.Remember#2

Authored path: `Circle.Remember`.
- Covered by [Circle](../design/compositions/Circle.md), line 18.
- Covered by [Circle](../design/compositions/Circle.md), line 37.

```reaction
when Sessioning.use (session, subject: owner), asked by Circle.Remember
where
  earlier, RequestBoundary.request (content, path: "/memories/remember", requestId, session)
then
  Remembering.remember (content, owner)
```

### Circle.Remember#3

Authored path: `Circle.Remember`.
- Covered by [Circle](../design/compositions/Circle.md), line 18.
- Covered by [Circle](../design/compositions/Circle.md), line 37.

```reaction
when Remembering.remember (content, owner, memory), asked by Circle.Remember#2
where
  view "the memory (memory) owned by (owner)" with (memory, owner) has (content: savedContent)
then
  Graphing.ingest (content: savedContent, owner, source: memory)
```

### Circle.Remember#4

Authored path: `Circle.Remember`.
- Covered by [Circle](../design/compositions/Circle.md), line 18.
- Covered by [Circle](../design/compositions/Circle.md), line 37.

```reaction
when Graphing.ingest (content: savedContent, owner, source: memory), asked by Circle.Remember#3
where
  earlier, RequestBoundary.request (content, path: "/memories/remember", requestId, session)
then
  RequestBoundary.respond (memory, requestId)
```

### Circle.Seek

Authored path: `Circle.Seek`.
- Covered by [Circle](../design/compositions/Circle.md), line 25.
- Covered by [Circle](../design/compositions/Circle.md), line 38.

```reaction
when RequestBoundary.request (description, path: "/needs/seek", requestId, session)
then
  Sessioning.use (session)
```

### Circle.Seek#2

Authored path: `Circle.Seek`.
- Covered by [Circle](../design/compositions/Circle.md), line 25.
- Covered by [Circle](../design/compositions/Circle.md), line 38.

```reaction
when Sessioning.use (session, subject: owner), asked by Circle.Seek
where
  earlier, RequestBoundary.request (description, path: "/needs/seek", requestId, session)
then
  Seeking.seek (description, owner)
```

### Circle.Seek#3

Authored path: `Circle.Seek`.
- Covered by [Circle](../design/compositions/Circle.md), line 25.
- Covered by [Circle](../design/compositions/Circle.md), line 38.

```reaction
when Seeking.seek (description, owner, need), asked by Circle.Seek#2
where
  earlier, RequestBoundary.request (description, path: "/needs/seek", requestId, session)
then
  RequestBoundary.respond (requestId, results: former "results for (owner)'s need (need)" with (need, owner))
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
- `/memories/remember` — requires `session`, `content`
- `/needs/seek` — requires `session`, `description`
