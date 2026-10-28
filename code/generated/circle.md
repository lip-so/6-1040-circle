<!-- Generated from the Circle assembly. Do not edit. -->
<!-- Manifest producer: @mit-sdg/sync-engine@1.1.0; concept specification: sync-engine.concept-specification@1; renderer: @mit-sdg/sync-engine@1.1.0. -->

# Circle — assembled read-back

_Assembled by sync-engine from registered concepts and composition. Edit the concept_
_specifications and composition source, then regenerate this file._

## Concepts

### Federating

Defined in [Federating](../design/concepts/Federating.md), line 1.

#### Actions

- `resolve(attempt: Attempt) : returns (user: User | null, linked: Flag)`
  - Refuses `SIGN_IN_EXPIRED`: This sign-in has expired. Start again.
- `requireLinkable(attempt: Attempt) : returns ()`
  - Refuses `SIGN_IN_EXPIRED`: This sign-in has expired. Start again.
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

- `ingest(owner: User, source: Source, content: String, referenceDate?: String, revision?: Number) : returns ()`
  - Refuses `EMPTY_SOURCE_CONTENT`: Source content must not be blank.
  - Refuses `SOURCE_NOT_OWNED`: The source belongs to another user.
  - Refuses `SOURCE_WITHDRAWN`: The source was withdrawn.
- `recall(owner: User, description: String, notes: String) : returns (recall: Recall)`
  - Refuses `EMPTY_QUERY`: Describe the search first.
  - Refuses `MEMORY_LIMIT`: Contact memory exceeds the supported search limit.
- `withdraw(owner: User, source: Source) : returns ()`
  - Refuses `SOURCE_NOT_OWNED`: The source belongs to another user.

#### Queries

- `_card(owner: User, source: Source, content: String, referenceDate?: String, revision?: Number) : one (card: ContactCard)`
- `_matches(owner: User, recall: Recall) : many (target: Source, label: String, source: Source, reason: String, card: ContactCard)`

#### Instances

- `Graphing` — instance of `Graphing` — [Circle types](../design/types.md), line 26.
  - `Source` is `Remembering.Memory` — [Circle types](../design/types.md), line 28.
  - `User` is `Registering.User` — [Circle types](../design/types.md), line 27.

### Registering

Defined in [Registering](../design/concepts/Registering.md), line 1.

#### Actions

- `identify(user: User) : returns (username: String)`
  - Refuses `USER_NOT_FOUND`: Account not found.
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

- `remember(owner: User, content: String, submission: String, capturedAt: DateTime, timeZone?: String) : returns (memory: Memory)`
  - Refuses `EMPTY_CONTENT`: Encounter content must not be blank.
  - Refuses `SUBMISSION_CONFLICT`: This save token was already used for a different note.
- `forget(owner: User, memory: Memory) : returns ()`
  - Refuses `MEMORY_NOT_FOUND`: Encounter not found.
- `inspect(owner: User, memory: Memory) : returns (content: String, original: String, revision: Number, referenceDate: String)`
  - Refuses `MEMORY_NOT_FOUND`: Encounter not found.
- `edit(owner: User, memory: Memory, content: String, submission: String, revision: Number, capturedAt: DateTime, timeZone?: String) : returns (memory: Memory)`
  - Refuses `MEMORY_NOT_FOUND`: Encounter not found.
  - Refuses `EMPTY_CONTENT`: Encounter content must not be blank.
  - Refuses `EDIT_CONFLICT`: The encounter changed. Reopen it before editing.
- `transcribe(audio: String, mediaType: String) : returns (content: String)`
  - Refuses `INVALID_AUDIO`: Unsupported or invalid recording.

#### Queries

- `_get(owner: User, memory: Memory) : optional (content: String)`
- `_list(owner: User, after: String) : many (memory: Memory, content: String)`
- `_record(owner: User, memory: Memory) : optional (content: String, original: String, revision: Number, referenceDate: String)`
- `_corpus(owner: User) : one (notes: String)`

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
- Covered by [Circle](../design/compositions/Circle.md), line 7.

```view
the memory (memory) owned by (owner) — inputs (owner, memory); outputs (content, original, revision, referenceDate); bindings () — answers at most one (content, original, revision, referenceDate)
  where Remembering._record (memory, owner) has (content, original, referenceDate, revision)
```

## Formers

_Formers name result shapes evaluated when asked. The source former owns_
_the authored explanation; this section records the generated shape._

### results for (owner)'s need (need) from (recall)

Authored path: `Circle.NeedResults`.
- Covered by [Circle](../design/compositions/Circle.md), line 47.

```former
Former "results for (owner)'s need (need) from (recall)" — inputs (owner, need, recall); bindings (description, target, label, source, reason, content, original, revision, referenceDate, card); promises exactly one record — forms:
  a record of
    where Seeking._get (need, owner) has (description)
    description
    need
    suggestions: each Graphing._matches (owner, recall) has (card, label, reason, source, target)
      where view "the memory (memory) owned by (owner)" with (memory: source, owner) has (content, original, referenceDate, revision)
      where Graphing._card (content, owner, referenceDate, revision, source) has (card)
      form a record of
        card
        content
        label
        original
        reason
        referenceDate
        revision
        source
        target
```

### saved memories of (owner) after (after)

Authored path: `Circle.SavedMemories`.
- Covered by [Circle](../design/compositions/Circle.md), line 7.

```former
Former "saved memories of (owner) after (after)" — inputs (owner, after); bindings (memory, listedContent, content, original, revision, referenceDate, card); promises exactly one record — forms:
  each Remembering._list (after, owner) has (content: listedContent, memory)
    where Remembering._record (memory, owner) has (content, original, referenceDate, revision)
    where Graphing._card (content, owner, referenceDate, revision, source: memory) has (card)
    form a record of
      card
      content
      memory
      original
      referenceDate
      revision
```

## Reactions

### Circle.Edit

Authored path: `Circle.Edit`.
- Covered by [Circle](../design/compositions/Circle.md), line 19.
- Covered by [Circle](../design/compositions/Circle.md), line 61.

```reaction
when RequestBoundary.request (content, memory, path: "/memories/edit", requestId, revision, session, submission, timeZone)
where
  capturedAt is the current flow's instant
then
  Sessioning.use (session)
```

### Circle.Edit#2

Authored path: `Circle.Edit`.
- Covered by [Circle](../design/compositions/Circle.md), line 19.
- Covered by [Circle](../design/compositions/Circle.md), line 61.

```reaction
when Sessioning.use (session, subject: owner), asked by Circle.Edit
where
  earlier, RequestBoundary.request (content, memory, path: "/memories/edit", requestId, revision, session, submission, timeZone)
  capturedAt is the current flow's instant
then
  Remembering.edit (capturedAt, content, memory, owner, revision, submission, timeZone)
```

### Circle.Edit#3

Authored path: `Circle.Edit`.
- Covered by [Circle](../design/compositions/Circle.md), line 19.
- Covered by [Circle](../design/compositions/Circle.md), line 61.

```reaction
when Remembering.edit (capturedAt, content, memory, owner, revision, submission, timeZone), asked by Circle.Edit#2
then
  Remembering.inspect (memory, owner)
```

### Circle.Edit#4

Authored path: `Circle.Edit`.
- Covered by [Circle](../design/compositions/Circle.md), line 19.
- Covered by [Circle](../design/compositions/Circle.md), line 61.

```reaction
when Remembering.inspect (memory, owner, content: savedContent, referenceDate, revision: savedRevision), asked by Circle.Edit#3
then
  Graphing.ingest (content: savedContent, owner, referenceDate, revision: savedRevision, source: memory)
```

### Circle.Edit#5

Authored path: `Circle.Edit`.
- Covered by [Circle](../design/compositions/Circle.md), line 19.
- Covered by [Circle](../design/compositions/Circle.md), line 61.

```reaction
when Graphing.ingest (content: savedContent, owner, referenceDate, revision: savedRevision, source: memory), asked by Circle.Edit#4
where
  earlier, RequestBoundary.request (content, memory, path: "/memories/edit", requestId, revision, session, submission, timeZone)
then
  RequestBoundary.respond (memory, requestId)
```

### Circle.Forget

Authored path: `Circle.Forget`.
- Covered by [Circle](../design/compositions/Circle.md), line 49.
- Covered by [Circle](../design/compositions/Circle.md), line 62.

```reaction
when RequestBoundary.request (memory, path: "/memories/forget", requestId, session)
then
  Sessioning.use (session)
```

### Circle.Forget#2

Authored path: `Circle.Forget`.
- Covered by [Circle](../design/compositions/Circle.md), line 49.
- Covered by [Circle](../design/compositions/Circle.md), line 62.

```reaction
when Sessioning.use (session, subject: owner), asked by Circle.Forget
where
  earlier, RequestBoundary.request (memory, path: "/memories/forget", requestId, session)
then
  Remembering.forget (memory, owner)
```

### Circle.Forget#3

Authored path: `Circle.Forget`.
- Covered by [Circle](../design/compositions/Circle.md), line 49.
- Covered by [Circle](../design/compositions/Circle.md), line 62.

```reaction
when Remembering.forget (memory, owner), asked by Circle.Forget#2
then
  Graphing.withdraw (owner, source: memory)
```

### Circle.Forget#4

Authored path: `Circle.Forget`.
- Covered by [Circle](../design/compositions/Circle.md), line 49.
- Covered by [Circle](../design/compositions/Circle.md), line 62.

```reaction
when Graphing.withdraw (owner, source: memory), asked by Circle.Forget#3
where
  earlier, RequestBoundary.request (memory, path: "/memories/forget", requestId, session)
then
  RequestBoundary.respond (requestId)
```

### Circle.ListMemories

Authored path: `Circle.ListMemories`.
- Covered by [Circle](../design/compositions/Circle.md), line 15.
- Covered by [Circle](../design/compositions/Circle.md), line 58.

```reaction
when RequestBoundary.request (after, path: "/memories/list", requestId, session)
then
  Sessioning.use (session)
```

### Circle.ListMemories#2

Authored path: `Circle.ListMemories`.
- Covered by [Circle](../design/compositions/Circle.md), line 15.
- Covered by [Circle](../design/compositions/Circle.md), line 58.

```reaction
when Sessioning.use (session, subject: owner), asked by Circle.ListMemories
where
  earlier, RequestBoundary.request (after, path: "/memories/list", requestId, session)
then
  RequestBoundary.respond (memories: former "saved memories of (owner) after (after)" with (after, owner), requestId)
```

### Circle.PrepareEdit

Authored path: `Circle.PrepareEdit`.
- Covered by [Circle](../design/compositions/Circle.md), line 19.
- Covered by [Circle](../design/compositions/Circle.md), line 60.

```reaction
when RequestBoundary.request (memory, path: "/memories/prepare-edit", requestId, session)
then
  Sessioning.use (session)
```

### Circle.PrepareEdit#2

Authored path: `Circle.PrepareEdit`.
- Covered by [Circle](../design/compositions/Circle.md), line 19.
- Covered by [Circle](../design/compositions/Circle.md), line 60.

```reaction
when Sessioning.use (session, subject: owner), asked by Circle.PrepareEdit
where
  earlier, RequestBoundary.request (memory, path: "/memories/prepare-edit", requestId, session)
then
  Remembering.inspect (memory, owner)
```

### Circle.PrepareEdit#3

Authored path: `Circle.PrepareEdit`.
- Covered by [Circle](../design/compositions/Circle.md), line 19.
- Covered by [Circle](../design/compositions/Circle.md), line 60.

```reaction
when Remembering.inspect (memory, owner, content, original, referenceDate, revision), asked by Circle.PrepareEdit#2
then
  Graphing.ingest (content, owner, referenceDate, revision, source: memory)
```

### Circle.PrepareEdit#4

Authored path: `Circle.PrepareEdit`.
- Covered by [Circle](../design/compositions/Circle.md), line 19.
- Covered by [Circle](../design/compositions/Circle.md), line 60.

```reaction
when Graphing.ingest (content, owner, referenceDate, revision, source: memory), asked by Circle.PrepareEdit#3
then
  Remembering.inspect (memory, owner)
```

### Circle.PrepareEdit#5

Authored path: `Circle.PrepareEdit`.
- Covered by [Circle](../design/compositions/Circle.md), line 19.
- Covered by [Circle](../design/compositions/Circle.md), line 60.

```reaction
when Remembering.inspect (memory, owner, content: currentContent, original: currentOriginal, referenceDate: currentDate, revision: currentRevision), asked by Circle.PrepareEdit#4
where
  Graphing._card (content: currentContent, owner, referenceDate: currentDate, revision: currentRevision, source: memory) has (card)
  earlier, RequestBoundary.request (memory, path: "/memories/prepare-edit", requestId, session)
then
  RequestBoundary.respond (card, content: currentContent, memory, original: currentOriginal, referenceDate: currentDate, requestId, revision: currentRevision)
```

### Circle.Remember

Authored path: `Circle.Remember`.
- Covered by [Circle](../design/compositions/Circle.md), line 15.
- Covered by [Circle](../design/compositions/Circle.md), line 56.

```reaction
when RequestBoundary.request (content, path: "/memories/remember", requestId, session, submission, timeZone)
where
  capturedAt is the current flow's instant
then
  Sessioning.use (session)
```

### Circle.Remember#2

Authored path: `Circle.Remember`.
- Covered by [Circle](../design/compositions/Circle.md), line 15.
- Covered by [Circle](../design/compositions/Circle.md), line 56.

```reaction
when Sessioning.use (session, subject: owner), asked by Circle.Remember
where
  earlier, RequestBoundary.request (content, path: "/memories/remember", requestId, session, submission, timeZone)
  capturedAt is the current flow's instant
then
  Remembering.remember (capturedAt, content, owner, submission, timeZone)
```

### Circle.Remember#3

Authored path: `Circle.Remember`.
- Covered by [Circle](../design/compositions/Circle.md), line 15.
- Covered by [Circle](../design/compositions/Circle.md), line 56.

```reaction
when Remembering.remember (capturedAt, content, owner, submission, timeZone, memory), asked by Circle.Remember#2
then
  Remembering.inspect (memory, owner)
```

### Circle.Remember#4

Authored path: `Circle.Remember`.
- Covered by [Circle](../design/compositions/Circle.md), line 15.
- Covered by [Circle](../design/compositions/Circle.md), line 56.

```reaction
when Remembering.inspect (memory, owner, content: savedContent, referenceDate, revision), asked by Circle.Remember#3
then
  Graphing.ingest (content: savedContent, owner, referenceDate, revision, source: memory)
```

### Circle.Remember#5

Authored path: `Circle.Remember`.
- Covered by [Circle](../design/compositions/Circle.md), line 15.
- Covered by [Circle](../design/compositions/Circle.md), line 56.

```reaction
when Graphing.ingest (content: savedContent, owner, referenceDate, revision, source: memory), asked by Circle.Remember#4
where
  earlier, RequestBoundary.request (content, path: "/memories/remember", requestId, session, submission, timeZone)
then
  RequestBoundary.respond (memory, requestId)
```

### Circle.Seek

Authored path: `Circle.Seek`.
- Covered by [Circle](../design/compositions/Circle.md), line 41.
- Covered by [Circle](../design/compositions/Circle.md), line 57.

```reaction
when RequestBoundary.request (description, path: "/needs/seek", requestId, session)
then
  Sessioning.use (session)
```

### Circle.Seek#2

Authored path: `Circle.Seek`.
- Covered by [Circle](../design/compositions/Circle.md), line 41.
- Covered by [Circle](../design/compositions/Circle.md), line 57.

```reaction
when Sessioning.use (session, subject: owner), asked by Circle.Seek
where
  earlier, RequestBoundary.request (description, path: "/needs/seek", requestId, session)
then
  Seeking.seek (description, owner)
```

### Circle.Seek#3

Authored path: `Circle.Seek`.
- Covered by [Circle](../design/compositions/Circle.md), line 41.
- Covered by [Circle](../design/compositions/Circle.md), line 57.

```reaction
when Seeking.seek (description, owner, need), asked by Circle.Seek#2
where
  Remembering._corpus (owner) has (notes)
then
  Graphing.recall (description, notes, owner)
```

### Circle.Seek#4

Authored path: `Circle.Seek`.
- Covered by [Circle](../design/compositions/Circle.md), line 41.
- Covered by [Circle](../design/compositions/Circle.md), line 57.

```reaction
when Graphing.recall (description, notes, owner, recall), asked by Circle.Seek#3
where
  earlier, Seeking.seek (description, owner, need), asked by Circle.Seek#2
  earlier, RequestBoundary.request (description, path: "/needs/seek", requestId, session)
then
  RequestBoundary.respond (requestId, results: former "results for (owner)'s need (need) from (recall)" with (need, owner, recall))
```

### Circle.Transcribe

Authored path: `Circle.Transcribe`.
- Covered by [Circle](../design/compositions/Circle.md), line 17.
- Covered by [Circle](../design/compositions/Circle.md), line 59.

```reaction
when RequestBoundary.request (audio, mediaType, path: "/memories/transcribe", requestId, session)
then
  Sessioning.use (session)
```

### Circle.Transcribe#2

Authored path: `Circle.Transcribe`.
- Covered by [Circle](../design/compositions/Circle.md), line 17.
- Covered by [Circle](../design/compositions/Circle.md), line 59.

```reaction
when Sessioning.use (session), asked by Circle.Transcribe
where
  earlier, RequestBoundary.request (audio, mediaType, path: "/memories/transcribe", requestId, session)
then
  Remembering.transcribe (audio, mediaType)
```

### Circle.Transcribe#3

Authored path: `Circle.Transcribe`.
- Covered by [Circle](../design/compositions/Circle.md), line 17.
- Covered by [Circle](../design/compositions/Circle.md), line 59.

```reaction
when Remembering.transcribe (audio, mediaType, content), asked by Circle.Transcribe#2
where
  earlier, RequestBoundary.request (audio, mediaType, path: "/memories/transcribe", requestId, session)
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
then
  Registering.identify (user)
```

### reusable.accounts.identifying.Me#3

Authored path: `reusable.accounts.identifying.Me`.
- Covered by [Accounts](../design/compositions/reusable/accounts.md), line 5.
- Covered by [Accounts](../design/compositions/reusable/accounts.md), line 8.

```reaction
when Registering.identify (user, username), asked by reusable.accounts.identifying.Me#2
where
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

### reusable.commons.finishing.ChooseUsername

Authored path: `reusable.commons.finishing.ChooseUsername`.
- Covered by [Signing in with Commons](../design/compositions/reusable/commons.md), line 22.
- Covered by [Signing in with Commons](../design/compositions/reusable/commons.md), line 26.

```reaction
when RequestBoundary.request (attempt, path: "/auth/commons/choose", requestId, username)
then
  CommonsFederating.requireLinkable (attempt)
```

### reusable.commons.finishing.ChooseUsername#2

Authored path: `reusable.commons.finishing.ChooseUsername`.
- Covered by [Signing in with Commons](../design/compositions/reusable/commons.md), line 22.
- Covered by [Signing in with Commons](../design/compositions/reusable/commons.md), line 26.

```reaction
when CommonsFederating.requireLinkable (attempt), asked by reusable.commons.finishing.ChooseUsername
where
  earlier, RequestBoundary.request (attempt, path: "/auth/commons/choose", requestId, username)
then
  Registering.register (username)
```

### reusable.commons.finishing.ChooseUsername#3

Authored path: `reusable.commons.finishing.ChooseUsername`.
- Covered by [Signing in with Commons](../design/compositions/reusable/commons.md), line 22.
- Covered by [Signing in with Commons](../design/compositions/reusable/commons.md), line 26.

```reaction
when Registering.register (username, user), asked by reusable.commons.finishing.ChooseUsername#2
where
  earlier, CommonsFederating.requireLinkable (attempt), asked by reusable.commons.finishing.ChooseUsername
then
  CommonsFederating.link (attempt, user)
```

### reusable.commons.finishing.ChooseUsername#4

Authored path: `reusable.commons.finishing.ChooseUsername`.
- Covered by [Signing in with Commons](../design/compositions/reusable/commons.md), line 22.
- Covered by [Signing in with Commons](../design/compositions/reusable/commons.md), line 26.

```reaction
when CommonsFederating.link (attempt, user), asked by reusable.commons.finishing.ChooseUsername#3
then
  Sessioning.start (subject: user)
```

### reusable.commons.finishing.ChooseUsername#5

Authored path: `reusable.commons.finishing.ChooseUsername`.
- Covered by [Signing in with Commons](../design/compositions/reusable/commons.md), line 22.
- Covered by [Signing in with Commons](../design/compositions/reusable/commons.md), line 26.

```reaction
when Sessioning.start (subject: user, expiresAt, session), asked by reusable.commons.finishing.ChooseUsername#4
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

### reusable.commons.finishing.FinishCommons#2

Authored path: `reusable.commons.finishing.FinishCommons`.
- Covered by [Signing in with Commons](../design/compositions/reusable/commons.md), line 15.
- Covered by [Signing in with Commons](../design/compositions/reusable/commons.md), line 25.

```reaction
when CommonsFederating.finish (attempt, code, nonce: state, username), asked by reusable.commons.finishing.FinishCommons
then
  CommonsFederating.resolve (attempt)
```

### reusable.commons.finishing.FinishCommons:new#3

Authored path: `reusable.commons.finishing.FinishCommons`.
- Covered by [Signing in with Commons](../design/compositions/reusable/commons.md), line 15.
- Covered by [Signing in with Commons](../design/compositions/reusable/commons.md), line 25.

```reaction
when CommonsFederating.resolve (attempt, linked, user), asked by reusable.commons.finishing.FinishCommons#2
where
  linked is among [false]
  earlier, CommonsFederating.finish (attempt, code, nonce: state, username), asked by reusable.commons.finishing.FinishCommons
then
  Registering.register (username)
```

### reusable.commons.finishing.FinishCommons:new#4

Authored path: `reusable.commons.finishing.FinishCommons`.
- Covered by [Signing in with Commons](../design/compositions/reusable/commons.md), line 15.
- Covered by [Signing in with Commons](../design/compositions/reusable/commons.md), line 25.

```reaction
when Registering.register (username, user: newUser), asked by reusable.commons.finishing.FinishCommons:new#3
where
  earlier, CommonsFederating.finish (attempt, code, nonce: state, username), asked by reusable.commons.finishing.FinishCommons
then
  CommonsFederating.link (attempt, user: newUser)
```

### reusable.commons.finishing.FinishCommons:new#5

Authored path: `reusable.commons.finishing.FinishCommons`.
- Covered by [Signing in with Commons](../design/compositions/reusable/commons.md), line 15.
- Covered by [Signing in with Commons](../design/compositions/reusable/commons.md), line 25.

```reaction
when CommonsFederating.link (attempt, user: newUser), asked by reusable.commons.finishing.FinishCommons:new#4
then
  Sessioning.start (subject: newUser)
```

### reusable.commons.finishing.FinishCommons:new#6

Authored path: `reusable.commons.finishing.FinishCommons`.
- Covered by [Signing in with Commons](../design/compositions/reusable/commons.md), line 15.
- Covered by [Signing in with Commons](../design/compositions/reusable/commons.md), line 25.

```reaction
when Sessioning.start (subject: newUser, expiresAt, session), asked by reusable.commons.finishing.FinishCommons:new#5
where
  earlier, RequestBoundary.request (attempt, code, path: "/auth/commons/finish", requestId, state)
then
  RequestBoundary.respond (expiresAt, requestId, session, user: newUser)
```

### reusable.commons.finishing.FinishCommons:returning#3

Authored path: `reusable.commons.finishing.FinishCommons`.
- Covered by [Signing in with Commons](../design/compositions/reusable/commons.md), line 15.
- Covered by [Signing in with Commons](../design/compositions/reusable/commons.md), line 25.

```reaction
when CommonsFederating.resolve (attempt, linked, user), asked by reusable.commons.finishing.FinishCommons#2
where
  linked is among [true]
then
  Sessioning.start (subject: user)
```

### reusable.commons.finishing.FinishCommons:returning#4

Authored path: `reusable.commons.finishing.FinishCommons`.
- Covered by [Signing in with Commons](../design/compositions/reusable/commons.md), line 15.
- Covered by [Signing in with Commons](../design/compositions/reusable/commons.md), line 25.

```reaction
when Sessioning.start (subject: user, expiresAt, session), asked by reusable.commons.finishing.FinishCommons:returning#3
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
- `/memories/edit` — requires `session`, `memory`, `content`, `submission`, `revision`; fills `timeZone` with "America/New_York" when absent
- `/memories/forget` — requires `session`, `memory`
- `/memories/list` — requires `session`, `after`
- `/memories/prepare-edit` — requires `session`, `memory`
- `/memories/remember` — requires `session`, `content`, `submission`; fills `timeZone` with "America/New_York" when absent
- `/memories/transcribe` — requires `session`, `audio`, `mediaType`
- `/needs/seek` — requires `session`, `description`
