# Remembering

## Purpose

Prevent the context of an encounter from being lost before the user has a reason to revisit it.

## Principle

If a user records an encounter in their own words, they can later retrieve that account and recover what they discussed. If they remove that encounter, its original text is erased and cannot be retrieved or recreated by retrying the old save.

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

a set of Removed Memories

Rule: only Memories outside Removed have content. Removing an encounter erases its content while retaining its owner and identity to reject stale save retries.
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
  where content is not blank and owner and submission identify an existing memory that is in Removed or has different content
  then
    refuses SUBMISSION_CONFLICT "This save token cannot be reused for this encounter."
  where content is not blank and owner and submission identify an existing memory outside Removed with the same content
  then
    keep that memory and leave its content and capturedAt unchanged
    returns memory
  where content is not blank and owner and submission do not identify an existing memory
  then
    create a memory with owner, the exact supplied content, and capturedAt
    returns memory

forget(owner: User, memory: Memory) : returns ()
  where memory is not in Memories or memory.owner is not owner
  then
    refuses MEMORY_NOT_FOUND "Encounter not found."
  where memory is in Memories and memory.owner is owner
  then
    add memory to Removed if it is not already present
    erase memory.content and memory.capturedAt
    keep its owner and identity so repeated removal succeeds and an old save cannot recreate it
    returns

transcribe(audio: String, mediaType: String) : returns (content: String)
  where audio is not canonical nonempty base64, decoded audio exceeds 4 MiB, or mediaType is unsupported
  then
    refuses INVALID_AUDIO "The recording could not be accepted."
  where audio and mediaType are supported
  then
    send only the recording to the configured transcription provider
    produce bounded editable text without saving a memory or retaining the recording
    provider failure is an error with no automatic retry or fabricated transcript
    returns content
```

## Queries

```queries
_get(owner: User, memory: Memory) : optional (content: String)
  Return the content if memory exists, belongs to owner, and is not in Removed.
  Return no row otherwise.

_list(owner: User, after: String) : many (memory: Memory, content: String)
  Read only owner's memories outside Removed, including notes that have no graph matches or failed indexing.
  An empty after starts at the beginning; otherwise continue after that owned memory.
  Return no rows if a nonempty cursor is missing, removed, or is not owned by owner.
  Order by capturedAt descending, with memory identity ascending to break ties. Memories without a capturedAt follow dated saves, ordered by identity; their actual save order is unknown.
  Return at most 21 rows. The frontend displays 20 and uses the extra row to detect another page, continuing after the last displayed memory.
  Cursor paging keeps older rows reachable when a newer memory is inserted between page requests.
  Return no rows for an empty page. Never merge matching names or identical content.

_corpus(owner: User) : one (notes: String)
  Read only owner's nonremoved originals and serialize source identity/content pairs as canonical JSON ordered by identity.
  Read at most 257 originals so Graphing can refuse more than the complete 256-note supported memory rather than truncate it. An empty account returns an empty JSON list. Never include removed or another owner's originals.

```
