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
available. No contact, edit, delete, or automatic identity-merging features are added.

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
