# P1
## Oct 16, 2026 — scope + setup

### improved on comments
- Cleaned up the P1 wording after feedback: `Need` is the thing Seeking stores, and `seek` creates it. Used “explained suggestions” consistently instead of switching between suggestions and candidates.

# P2
## Oct 16, 2026 - new additions, scope changes for alpha verison
- Kept the Ralph/Faustin story, but cut it down: start empty, save an encounter note, enter a need, see a relevant person with an explanation and the original note. That's enough to show why Circle is useful - MVP start.
- The first P2 concept drafts carried over too much of the full design. Trimmed them down. The full P1 design stays in `design-docs/concepts.md` for later.
- **Remembering:** just the owner and original note text. `remember` saves it; `_get` reads it for its owner. Dates, contact details, editing, and deletion can wait.
- **Seeking:** just the owner and need description. `seek` saves it; `_get` reads it for its owner. Dropped active/resolved state, timestamps, and the revise/resolve/reopen/delete actions for now.
- **Graphing:** kept entities, claims, source identities, and supporting quotes from P1. For the MVP, `ingest` extracts supported relationships and `_trace` finds people relevant to the need.
- **Connecting is deferred!!!** Its main job is keeping track of people, connecting the dots will be added later after polishing.
- Reusing concepts for sign-in with commons
- making the UI as clean as sleek as possible, hiding everything the user does need in this version.
- having seeking / remembering as two separate screens for more focus on the current goal, making the screen less busy
- still have to think about the visuals and colors - really want to make it red / orange and add a hand-drawn circle *beta to-do*.
- LLM indexing was omitted here on purpose, i figured that it should not be the main selling point, the main thing about circle should be that everything is organized
- button size is comfortable for clicking
- in the form ONLY the name is required
- did not add an option to edit or delete connections yet for simplicity (beta to-do), trying to keep it scoped and as lean as possible
- in alpha oen can only save, view, and search people and their encounter notes.