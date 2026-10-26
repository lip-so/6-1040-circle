# Remembering

## Purpose

Prevent the context of an encounter from being lost before the user has a reason to revisit it.

Remembering owns note persistence, editing, erasure and the `transcribe` action. Its injected `Transcriber` accepts audio and returns text through the shared [provider adapter](../../src/providers/README.md). That adapter owns no memories; Remembering validates supported audio before calling it, and transcription alone never saves a note. Circle coordinates subsequent note saving and Graphing organization.

## Principle

If a user records an encounter in their own words, they can later retrieve it and recover what they discussed. Editing changes the current note but preserves the first original words. Removing the encounter erases both versions; retrying its old save or edit cannot recreate it.

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
  an optional original String
  an optional referenceDate String
  an optional revision Number
  an optional editSubmission String

a set of Removed Memories

Rule: only Memories outside Removed have content. Removing an encounter erases its content while retaining its owner and identity to reject stale save retries.
Rule: new memories use an identity derived from owner and submission. Names and note text are not identities. A different submission creates a separate encounter, even for the same person or the same text.
Rule: capturedAt is the initial save time and never changes on edit. referenceDate is the encounter's saved source calendar anchor: derive it from capturedAt on first save using the supplied validated IANA timeZone, defaulting to America/New_York. Every edit and retry preserves the existing effective anchor instead of deriving a new day from edit time or timezone. Thus unchanged relative wording never acquires the meaning of a later edit or search day. Newly entered relative wording also uses that fixed encounter anchor; an explicit calendar date is needed to express another day. Edit capturedAt and optional timeZone remain accepted for interface compatibility but cannot replace the source anchor.
Rule: older memories may lack capturedAt, revision, referenceDate or original. Reads default revision to zero and original to current content; an explicit original field is stored on first edit and remains unchanged afterward. If referenceDate is absent, derive the effective anchor from initial capturedAt in America/New_York, or use an empty anchor when no timestamp exists. An edit stores and preserves this same effective anchor; an existing empty anchor remains empty. Never substitute the edit clock or invent a missing timestamp or calendar day.
Rule: guided memo content may include optional contact information such as a phone number or LinkedIn URL. Keep it with the original account; existing memories without it remain valid.
```

## Actions

```actions
remember(owner: User, content: String, submission: String, capturedAt: DateTime, timeZone?: String) : returns (memory: Memory)
  where content is blank (empty or whitespace-only)
  then
    refuses EMPTY_CONTENT "Encounter content must not be blank."
  where content is not blank and owner and submission identify an existing memory that is in Removed or has different content
  then
    refuses SUBMISSION_CONFLICT "This save token cannot be reused for this encounter."
  where content is not blank and owner and submission identify an existing memory outside Removed with the same content
  then
    keep that memory and leave current content, original, capturedAt, referenceDate and revision unchanged
    returns memory
  where content is not blank and owner and submission do not identify an existing memory
  then
    create a memory with owner, the exact supplied content, capturedAt and its referenceDate in timeZone; original is read as content and revision as zero until an edit stores them explicitly
    returns memory

forget(owner: User, memory: Memory) : returns ()
  where memory is not in Memories or memory.owner is not owner
  then
    refuses MEMORY_NOT_FOUND "Encounter not found."
  where memory is in Memories and memory.owner is owner
  then
    add memory to Removed if it is not already present
    erase memory.content, original, referenceDate, revision, editSubmission and capturedAt
    keep its owner and identity so repeated removal succeeds and an old save cannot recreate it
    returns

inspect(owner: User, memory: Memory) : returns (content: String, original: String, revision: Number, referenceDate: String)
  where memory is absent, removed or not owned by owner
  then
    refuses MEMORY_NOT_FOUND "Encounter not found."
  where memory is live and owned
  then
    leave state unchanged and expose the current owned record fields with the same defaults as _record
    returns content, original, revision, referenceDate

edit(owner: User, memory: Memory, content: String, submission: String, revision: Number, capturedAt: DateTime, timeZone?: String) : returns (memory: Memory)
  where memory is absent, removed or not owned by owner
  then
    refuses MEMORY_NOT_FOUND "Encounter not found."
  where memory is live and owned and content is blank
  then
    refuses EMPTY_CONTENT "Encounter content must not be blank."
  where memory is live and owned, content is not blank and its last editSubmission is submission with identical current content
  then
    leave the already applied edit unchanged
    returns memory
  where memory is live and owned, content is not blank, and either its last editSubmission is submission with different content or submission differs and the effective revision does not match
  then
    refuses EDIT_CONFLICT "The encounter changed. Reopen it before editing."
  where memory is live and owned, content is not blank, the effective revision matches and submission differs from the last editSubmission
  then
    atomically replace current content, increment revision and record editSubmission
    preserve first original text, owner, identity, initial capturedAt and the effective existing referenceDate, including an empty anchor; when the stored anchor is absent, store the same initial-capturedAt/default-timezone or empty fallback exposed by _record, never an edit-day anchor
    after a failed atomic update, reread the owned live record: removal gives MEMORY_NOT_FOUND, the same submission with identical content acknowledges the applied edit, and any other revision/content race gives EDIT_CONFLICT; no edit write recreates a removed record
    returns memory

transcribe(audio: String, mediaType: String) : returns (content: String)
  where audio is not canonical nonempty base64, decoded audio exceeds 4 MiB, or mediaType is not audio/webm, audio/mp4, audio/mpeg, audio/wav or audio/x-wav
  then
    refuses INVALID_AUDIO "The recording could not be accepted."
  where audio and mediaType are supported
  then
    send only the recording to the configured transcription provider
    require a string containing nonblank text of at most 20,000 characters (invalid provider values are ordinary processing errors) and return it without saving a memory or retaining the recording; the two-minute recording limit is enforced by frontend capture, not by inspecting duration here
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

_record(owner: User, memory: Memory) : optional (content: String, original: String, revision: Number, referenceDate: String)
  Read only the owned nonremoved record. Return current content, immutable original (content for unedited records), revision (zero for older records) and referenceDate (derived from capturedAt in the default timezone for older records, empty if no timestamp). Missing/foreign/removed produces no row.

_corpus(owner: User) : one (notes: String)
  Read only owner's nonremoved memories and serialize source identity, exact current content, referenceDate and revision as JSON ordered by memory identity. Use the same metadata defaults as _record; immutable first-original text is not included in search input after an edit.
  Read at most 257 records so Graphing can refuse more than the supported 256 notes rather than truncate them. An empty account returns an empty JSON list. Never include removed or another owner's content.

```
