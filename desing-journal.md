# P1
## Oct 16, 2026 — scope + setup

### improved on comments
- Cleaned up the P1 wording after feedback: `Need` is the thing Seeking stores, and `seek` creates it. Used “explained suggestions” consistently instead of switching between suggestions and candidates.

# P2
## Oct 16, 2026 - new additions, scope changes for alpha version
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
- in alpha one can only save, view, and search people and their encounter notes

## tests
- cover persistence, inputs, users (identification and ownership issues), retries, same-name issues, search fails
- use real MongoDB storage and a simulated sign-in thru commons
- frontend tests check formatting and loading / state behaviour
- few tests create legacy or damaged data
- Tests run sign-in → save → index → search → logout through the real HTTP handler and sync-engine. They check two-user isolation, forged requests, and downstream failures.

## challenges
- ownership: backend gets the owner from the signed-in session, and database queries only read that owner’s data, frontend doesn’t decide who can access a note.
- if indexing fails after saving, keep the original note and show an error. retrying the same save shouldn’t create duplicates.


# P3


- had to fix the whole logic of concepts to make them less overcrowded and focus more on the main functionality
- alpha introduced the most important functionality, however, it was fully deterministic, with beta I tried to make the logic fully rely on LLM, but it didnot work out well
- many outputs were unpredicable and hard to wrap into the interface, so I had to figure out something in-between

### solution - remembering someone + LLM-processed contacts

- add plain text + voice input option (UI p3 commit for this)
- backend: update concepts' .md files + scripts accordingly
    - user leaves a note (voice or text) → LLM systematizes it
- Find: add an LLM too - but it has VERY scoped tasks
    - with every new contact, a new person gets added to the LLM's memory
    - strictly per-user memory (security)
    - LLM outputs the correct card / cards from the database
    - make it as deterministic as possible
    - use JSON (or similar) for contacts so the LLM has text memory but can always trace back to the actual card
    - think of it as a second brain
- update concept specs, scripts, and tests respectively


- learnt to work super incrementaly and check every single step, had an agent one-shot a concept, and it did not work in deployment
- many concepts had to be rewritten

### concept changes
- abandoned connecting, as it does not really benefit the user that much. in testing the MVP myself figured that i'd rather look something up again then checke every single note
- re-thought graphing: no rejection needed - could just delete the conact, there is no recommenation system, so reject / accept does not really help with anything
- decided not to implement a recommendation system, it would only make sense if the app is constantly listening -> could be added in the next version with Granola integration
    - with current concepts set up should be easy to implement
- remembering got much simpler - now it only saves encounters
- Seeking does not have memory - memory only is activated with remembering, seeking is more about passive retrieval - no new information introduced
- ? maybe should add an option to modify contacts but it should be handles when the users meets with them again and LLM merges 2 cards - asks for confirmation


## Visual study

- wanted Circle to feel personal, with some movement
- people and connections evolve over time → visuals should show that while keeping UI clean and easy to skim

### Typography

- headers: looked at SKIMS and MadInk
    - soft, uneven shapes feel close to the Matisse figures
    - in the end, change font to something more similar to the SKIMS font, but a bit more formal
- handwritten quick notes: Belmonte Ballpoint
    - has that ink feel, fits saving a conversation right after meeting someone
    - shows the movement / liquid nature of connections
- body text: looked at Albert Sans and Urbanist
    - want simple and easy to skim, esp. when browsing people and encounter notes
    - chose Urbanist, looks simpler and easier to skim
- mockup: tried brushlike lettering for the main heading + quieter body text underneath
    - still exploring exact font pairing, header font is subject to change, the current one feels a bit generic too me, but also do not want to make it too artsy

### Color

- contact services (Facebook, LinkedIn) traditionally use blue → associate it with stability and formality
- red / orange feels more creative, evolves and progresses over time (YouTube, Pinterest, creative platforms)
- goal of Circle: combine the evolution of red + the stability of blue
- references:
  - Kandinsky → shapes
  - Kusama → repeated circles
  - Matisse's linked figures → movement and connection between people - reused them as the main visual hook in Circle
- tried in an AI-generated mockup: blue figures, red actions, warm cream background, dark text
  - colors + hand-drawn circles give personality while notes stay easy to read
- colorblindness: keep labels, check contrast, don't rely on red vs blue alone
^^^ had a lot of fun with this, definitely, want the user to understand the metaphors