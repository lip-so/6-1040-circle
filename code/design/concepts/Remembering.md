# Remembering

## Purpose

Keep exact encounter notes, editable current content and the first saved wording.

Implementation: [Remembering.ts](../../src/concepts/Remembering.ts).

## Principle

Editing preserves the first original. Removing an encounter erases both versions and prevents stale retries from restoring them.

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

Rule: identity derives from owner and submission; separate submissions never merge. All private reads and writes include owner.
Rule: capturedAt and first original are preserved across edits. Legacy reads default original to content and revision to zero.
Rule: referenceDate starts at capturedAt in timeZone, default America/New_York. If absent, use initial capturedAt in that default zone, or an empty anchor. Edits preserve this anchor, including empty; edit capturedAt/timeZone cannot replace it.
Rule: removed records retain only owner and identity. Content-size, guided-field and timezone validation belong to the application boundary.
```

## Actions

```actions
remember(owner: User, content: String, submission: String, capturedAt: DateTime, timeZone?: String) : returns (memory: Memory)
  where content is blank
  then
    refuses EMPTY_CONTENT "Encounter content must not be blank."
  where content is nonblank and owner/submission identifies a removed memory or different content
  then
    refuses SUBMISSION_CONFLICT "This save token was already used for a different note."
  where content is nonblank and owner/submission identifies identical live content
  then
    leave the existing record unchanged
    returns memory
  where content is nonblank and owner/submission is new
  then
    store exact content, owner, initial capturedAt and referenceDate
    returns memory

forget(owner: User, memory: Memory) : returns ()
  where memory is absent or foreign
  then
    refuses MEMORY_NOT_FOUND "Encounter not found."
  where memory belongs to owner
  then
    erase content, original and all edit/date metadata; retain the removal marker
    repeated removal succeeds
    returns

inspect(owner: User, memory: Memory) : returns (content: String, original: String, revision: Number, referenceDate: String)
  where memory is absent, removed or foreign
  then
    refuses MEMORY_NOT_FOUND "Encounter not found."
  where memory is live and owned
  then
    read current fields using _record defaults without changing state
    returns content, original, revision, referenceDate

edit(owner: User, memory: Memory, content: String, submission: String, revision: Number, capturedAt: DateTime, timeZone?: String) : returns (memory: Memory)
  where memory is absent, removed or foreign
  then
    refuses MEMORY_NOT_FOUND "Encounter not found."
  where memory is live and owned and content is blank
  then
    refuses EMPTY_CONTENT "Encounter content must not be blank."
  where memory is live and owned, content is nonblank and submission repeats the last edit with identical content
  then
    acknowledge without another edit, even with a stale revision
    returns memory
  where memory is live and owned, content is nonblank, and either a repeated submission changes content or a different submission has a stale revision
  then
    refuses EDIT_CONFLICT "The encounter changed. Reopen it before editing."
  where memory is live and owned, content is nonblank, submission differs from the last edit and revision matches
  then
    atomically replace content, increment revision and record submission; preserve original, capturedAt and source anchor
    if the write loses a race, acknowledge an identical applied retry, otherwise refuse MEMORY_NOT_FOUND for removal or EDIT_CONFLICT for another edit
    returns memory

transcribe(audio: String, mediaType: String) : returns (content: String)
  where audio is empty, noncanonical base64, exceeds 4 MiB decoded, or mediaType is unsupported
  then
    refuses INVALID_AUDIO "Unsupported or invalid recording."
  where audio is valid and mediaType is audio/webm, audio/mp4, audio/mpeg, audio/wav or audio/x-wav
  then
    request transcription; require nonblank text of at most 20,000 characters
    retain no audio or memory; provider faults propagate without retry or fabricated text
    returns content
```

## Queries

```queries
_get(owner: User, memory: Memory) : optional (content: String)
  Return owned, nonremoved content; otherwise no row.

_list(owner: User, after: String) : many (memory: Memory, content: String)
  Return at most 21 owned, nonremoved notes, ordered by capturedAt descending then identity ascending; undated notes follow dated notes.
  Empty after starts the list. Otherwise continue after that owned live cursor; missing, removed or foreign cursors return no rows. Empty pages return no rows.

_record(owner: User, memory: Memory) : optional (content: String, original: String, revision: Number, referenceDate: String)
  Return owned live fields with the State defaults; otherwise no row.

_corpus(owner: User) : one (notes: String)
  Return JSON source/content/referenceDate/revision rows for up to 257 owned, nonremoved records in identity order; empty accounts return [].
  Use current content and State defaults. The extra record lets Graphing refuse overflow beyond 256 notes.
```
