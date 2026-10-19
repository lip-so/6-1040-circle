# Circle

All reads use the user returned by `Sessioning.use` for the browser session. A request cannot supply an owner
or ask Graphing to index an arbitrary source identity.

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
supplies only content; it cannot supply an owner or source to index. The request
returns the memory identity after indexing succeeds, so an immediately following
search can use it.

The [seek endpoint](reaction:Circle.Seek) resolves the session, saves the need
for that user, then forms its results under the same user. It accepts only the
need description. The response contains `results` with the need, description,
and suggestions described above.

Both endpoints require a valid session before saving anything. Extra request
fields, including owner and source, are refused. Blank text uses the concept's
specified refusal. If indexing or forming results fails after saving, the saved
note or need stays in MongoDB and the request returns an error, as agreed.
There is no rollback or automatic retry.

```endpoints
Circle.Remember at /memories/remember
Circle.Seek at /needs/seek
```
