# Circle

*Remember the people you didn’t know you’d need.*

This public repository is Sofia Lipkevych’s 6.1040 Fall 2026 personal project. Design work and implementation are here.

Project decisions and progress are recorded in the [design journal](desing-journal.md). Personal reflections are in the private individual repository.

## P1: Design


| Section                                                                          | Deliverable                                                      |
| -------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| Problem framing and stakeholders                                                 | [design-docs/problem-framing.md](design-docs/problem-framing.md) |
| Application pitch                                                                | [design-docs/pitch.md](design-docs/pitch.md)                     |
| Concept specifications, essential reactions, and the note explaining their roles | [design-docs/concepts.md](design-docs/concepts.md)               |
| UI sketches                                                                      | [design-docs/ui-sketches.md](design-docs/ui-sketches.md)         |
| User journey                                                                     | [design-docs/user-journey.md](design-docs/user-journey.md)       |




### Problem framing and stakeholders

[Problem framing](design-docs/problem-framing.md) states the domain (professional networking for college students), the core problem (students meet the right person before they know why that person matters), a stakeholder list, bad situations, corroboration, workarounds, and a solution sketch.

### Application pitch

[Application pitch](design-docs/pitch.md) names the app **Circle** and covers motivation + 3 features: **Remember Someone**, **Find a Connection**, and **Rediscover Someone**.

### Concept specifications, essential reactions, and the note explaining their roles

[Concept design](design-docs/concepts.md) specifies four concepts: **Remembering**, **Graphing**, **Seeking**, and **Connecting**; how they work together.

- [Note on the role of the concepts](design-docs/concepts.md#role-of-the-concepts)
- [Concept specifications](design-docs/concepts.md#1-remembering)
- [Essential reactions](design-docs/concepts.md#essential-reactions)



### UI sketches

[UI sketches](design-docs/ui-sketches.md) are low-fidelity screens for Home, Remember Someone, Find Someone, and Check the Memory, included as images in Markdown (original scan: [UI.pdf](design-docs/UI-assets/UI.pdf)).

1. [Home](design-docs/ui-sketches.md#1-home)
2. [Remember Someone](design-docs/ui-sketches.md#2-remember-someone)
3. [Find Someone](design-docs/ui-sketches.md#3-find-someone)
4. [Check the Memory](design-docs/ui-sketches.md#4-check-the-memory)



### User journey

[User journey](design-docs/user-journey.md) follows Ralph from meeting Faustin -> saving the encounter -> Circle resurfacing that connection when Ralph’s goals change.

## P2: Alpha implementation

This section describes the submitted P2 snapshot. Current functionality is documented under P3 below.

The alpha covers only core functionality, nothing fancy yet:

- sign in through Commons
- save an encounter
- find a relevant person when a need comes up with keywords (LLM indexing to be added)

**Remember** has five fields: Person, When, What they do, Contact, and What you discussed. Only Person is required. **Find** returns matching people with short details and their original notes.

The two forms share a **Remember / Find toggle**.


| Part                                       | Files                                                                                                                                                                            |
| ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Core user journey                          | [P2 journey](design-docs/p2-user-journey.md)                                                                                                                                     |
| Design journal                             | [Decisions, progress, and challenges](desing-journal.md) |
| Concept specifications                     | [Concepts](code/design/concepts/) and [type bindings](code/design/types.md)                                                                                                      |
| Reactions, endpoints, views, and formers   | [Circle specification](code/design/compositions/Circle.md) and [implementation](code/src/compositions/Circle.ts)                                                                 |
| TypeScript concepts and MongoDB operations | [Concept implementations](code/src/concepts/)                                                                                                                                    |
| Commons sign-in                            | [Accounts](code/src/compositions/reusable/accounts.ts) and [Commons](code/src/compositions/reusable/commons.ts), reused from [ConceptBox](https://github.com/mit-sdg/conceptbox) |
| Minimal Vue frontend                       | [Frontend](code/frontend/src/)                                                                                                                                                   |
| Tests                                      | [Concept tests](code/tests/concepts/), [composition/HTTP tests](code/tests/compositions/), and [formatting tests](code/tests/ui/)                                                |


The MVP implements Remembering, Seeking, and Graphing + the reused authentication concepts.

Each user's notes, needs, and graph are scoped to their authenticated account to prevent security issues.

Graphing uses a local TypeScript parser and keyword matching; there is no LLM processing in this alpha.

Connecting's dismissed/useful suggestion history and broader language understanding are deferred.

**[Screen recording](https://www.loom.com/share/1795afb2bf8446a7be5abd993374e1d6).**

### Run locally

Requires Bun and a running MongoDB instance. From the repository root, install the dependencies:

```sh
bun install --cwd code
bun install --cwd code/frontend
```

If you do not already have `code/.env`, create it from [code/.env.example](code/.env.example). Set `MONGODB_URL` for the app and `TEST_MONGODB_URL` for the tests. For this local run, use `PUBLIC_ORIGIN=http://localhost:3000` and `COMMONS_ORIGIN=https://class.mit-sdg.dev`.

Build and start the app:

```sh
bun run build
bun run start
```

Open [http://localhost:3000](http://localhost:3000) and sign in through Commons.

To check the specifications and types and run the tests:

```sh
bun run check
bun run test
```

MongoDB tests create and remove uniquely named temporary databases using `TEST_MONGODB_URL`.

The tests focus on each concept's core behavior, sign-in and ownership boundaries,
preserving saved data, retry safety, evidence correctness, and the main save/search
journey. Repeated examples and lower-priority formatting checks are omitted.

## P3: Restored functionality

Circle now implements Remembering, Seeking, Graphing, and Connecting, alongside
Commons sign-in. Remember uses one free-form note with a gentle reminder of useful
details. Voice input returns editable text and never saves automatically. Existing
guided notes remain readable and editable.

Find keeps ongoing searches across visits. Repeating the same description (ignoring
case and whitespace) reuses an ongoing search. Every legacy need is ongoing until
resolved; **Resolved** is next to each search. Searches can be edited, reopened, or
deleted. There is one Need type; goal is another word for that same record.

Notes can be edited, deleted, inspected, and explicitly reindexed. Claim corrections
leave the original words unchanged. Suggestions update after note and claim changes,
include every supporting source quote, and retain Useful/Dismissed responses across
refreshes. Safe directed paths can span notes through distinctive organization/topic
identities. People with the same name in separate encounters stay separate. Search
uses conservative aliases and graph paths; unsupported meaning can still yield no
match. Discussion and possible hosting never establish expertise or a current opening.

### OpenAI configuration

Keep these values server-side in `code/.env`:

```dotenv
GRAPHING_EXTRACTOR=openai
OPENAI_API_KEY=your-server-side-key
OPENAI_GRAPH_MODEL=gpt-4.1-mini
OPENAI_TRANSCRIBE_MODEL=gpt-transcribe
```

`GRAPHING_EXTRACTOR=local` is the default and uses the local parser. Selecting OpenAI
indexing without its key/model fails startup; provider failures never silently fall
back. Voice transcription uses the server key and configured transcription model.
Never put a key in a frontend `VITE_` variable or commit it. This change does not
replace an existing `.env`.

Indexing sends the supplied note to the [Responses API with structured output](https://developers.openai.com/api/docs/guides/structured-outputs?api-mode=responses)
and `store: false`. Legacy guided Contact fields are excluded; free-form text has no
separate Contact boundary. The server does not send session/account identities,
other notes, or the existing graph. Validation checks structure, references, literal
labels, and full source quotes; it cannot prove the model interpreted a statement
correctly. The original note remains the authority.

Voice sends only the recording to the [file transcription API](https://developers.openai.com/api/docs/guides/speech-to-text).
Browser recordings stop at two minutes or 4 MiB; the API accepts bounded supported
audio, and the app does not persist recordings. Cancelled or account-stale replies
cannot add text to a draft.

### Failure and recovery

Saved originals survive indexing/search errors. Retry an unchanged save with the
same token to avoid duplication, or use **Retry indexing** on an encounter. Edits
invalidate old evidence immediately; deleting a note withdraws its evidence and
blocks an old save retry from resurrecting it. Legacy graph rows without current
digest metadata require an explicit reindex before supporting new suggestions.
There is no automatic external reindexing of existing notes.

The deployed API uses one complete-settlement FIFO per server process, including
reads. Provider requests can delay later calls until their bounded timeout. This
beta requires one application process; independent processes or direct root callers
need their own admission coordination. It does not promise distributed transactions
or automatic replay.

Provider checks for this restoration use simulated responses, as Sofia requested.
See [agent-journal.md](agent-journal.md) for verification and the retained/deleted
test inventory. The earlier [indexing-only test output](code/tests/output/p3-indexing.txt)
is a historical snapshot, not evidence for the full restoration.
