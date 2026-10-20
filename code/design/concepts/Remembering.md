# Remembering

## Purpose

Preserve an encounter account in its owner's words, including corrections and deliberate deletion, without treating an extracted interpretation as the account.

## Principle

Sofia records meeting Toni at a seminar. She can retrieve the exact account later, correct what she wrote, or forget it. A transcription remains an editable draft until Sofia deliberately records it.

## Types

```types
external User
```

## State

```state
a set of Memories with
  an owner User
  an optional content String
  an optional capturedAt DateTime
  an optional submission String
  an optional revision Number
  an optional forgotten Flag

Rule: a new memory has identity derived from owner and submission. Separate submissions remain separate encounters even for identical names or content.
Rule: old memories without capturedAt or submission remain readable and editable. No clock time or encounter date is invented for old records.
Rule: capturedAt is the engine-supplied save instant, not the encounter date. Literal encounter context and optional Contact text remain in the exact account.
Rule: live memories have content and forgotten is not true; a metadata-only forgotten tombstone retains identity, owner and submission but no content or contact text. Legacy revision is zero. Every successful changed-content revision increments revision atomically.
Rule: remember atomically enforces owner-scoped submission uniqueness and conflicting-content refusal. revise and forget enforce ownership within the mutation itself.
```

## Actions

```actions
remember(owner: User, content: String, submission: String, capturedAt: DateTime) : returns (memory: Memory)
  where content is blank
  then
    refuses EMPTY_CONTENT "Encounter content must not be blank."
  where content is not blank and owner and submission identify a forgotten memory
  then
    refuses SUBMISSION_FORGOTTEN "This encounter was deleted; use a new save token for a new encounter."
  where content is not blank and owner and submission identify a live memory with different content
  then
    refuses SUBMISSION_CONFLICT "This save token was already used for a different note."
  where content is not blank and owner and submission identify a live memory with the same content
  then
    bind that existing memory as memory and leave its content and capturedAt unchanged
    returns memory
  where content is not blank and owner and submission do not identify an existing memory
  then
    create memory with owner, exact content, submission, capturedAt, revision zero, and forgotten false
    returns memory

revise(owner: User, memory: Memory, content: String) : returns ()
  where memory is not in Memories or memory.owner is not owner or memory.forgotten is true
  then
    refuses REVISION_UNAVAILABLE "This encounter is not available."
  where memory is in Memories and memory.owner is owner and memory.forgotten is not true and content is blank
  then
    refuses EMPTY_REVISION "Encounter content must not be blank."
  where memory is in Memories and memory.owner is owner and memory.forgotten is not true and content is not blank
  then
    replace memory.content with exact content and increment revision only when content changed, preserving capturedAt and identity
    leave an identical-content revision unchanged
    returns

forget(owner: User, memory: Memory) : returns ()
  where memory is not in Memories or memory.owner is not owner
  then
    refuses FORGET_NOT_OWNED "This encounter is not available."
  where memory is in Memories and memory.owner is owner
  then
    erase content and set forgotten true, retaining only metadata needed for safe retries
    increment revision when first forgotten; leave an already forgotten memory unchanged
    returns

transcribe(owner: User, audio: String, mediaType: String) : returns (content: String)
  where audio is empty or malformed or mediaType is unsupported or the configured size limit is exceeded
  then
    refuses INVALID_AUDIO "Provide a supported audio recording within the size limit."
  where audio is valid and mediaType is supported and the configured size limit is not exceeded
  then
    request transcription through the injectable server-configured provider using only the recording and media type
    bind the provider's transcript as content
    fail without changing Memories if the provider is unavailable or returns unusable output
    store no audio and create no memory; a repeated request can transcribe again
    returns content
```

## Queries

```queries
_get(owner: User, memory: Memory) : optional (content: String)
  Answer exact content only for a live memory belonging to owner.
  Answer no row for an unknown memory or another owner's memory or a forgotten memory.

_record(owner: User, memory: Memory) : optional (content: String, revision: Number)
  Answer exact content and revision for a live owned memory, interpreting absent legacy revision as zero.
  Answer no row for unknown, forgotten, or other-owner memory.

_list(owner: User, after: String) : many (memory: Memory, content: String)
  Answer only owner's live memories, including unindexed accounts and failed indexing attempts, at most 21 rows per page.
  Answer no rows for an empty page or a nonempty cursor that is missing or not owned by owner; an empty cursor starts the first page.
  Order by capturedAt descending then memory identity ascending; undated legacy memories follow dated memories in identity order, continuing strictly after the owned cursor.
```
