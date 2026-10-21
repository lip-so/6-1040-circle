# Circle

*Remember the people you didn’t know you’d need.*

Sofia Lipkevych’s 6.1040 Fall 2026 personal project.
The design notebook is in the [private individual repository](https://github.com/lip-so/6-1040-sofia); implementation and verification notes are in the [agent journal](agent-journal.md).

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

This section describes the [submitted P2 snapshot](https://github.com/lip-so/6-1040-circle/tree/6d6b43140d6b9621c730f6dbe4bddf1d84fe577e/). Current functionality is documented under P3 below.

The alpha covers only core functionality, nothing fancy yet:

- sign in through Commons
- save an encounter
- find a relevant person when a need comes up with keywords (LLM indexing to be added)

**Remember** has five fields: Person, When, What they do, Contact, and What you discussed. Only Person is required. **Find** returns matching people with short details and their original notes.

The two forms share a **Remember / Find toggle**.

| Part                                       | Files                                                                                                                                                                            |
| ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Core user journey                          | [P2 journey](design-docs/p2-user-journey.md)                                                                                                                                     |
| Design journal                             | [Decisions, progress, and challenges](https://github.com/lip-so/6-1040-circle/blob/6d6b43140d6b9621c730f6dbe4bddf1d84fe577e/desing-journal.md) |
| Concept specifications                     | [Concepts](https://github.com/lip-so/6-1040-circle/tree/6d6b43140d6b9621c730f6dbe4bddf1d84fe577e/code/design/concepts/) and [type bindings](https://github.com/lip-so/6-1040-circle/blob/6d6b43140d6b9621c730f6dbe4bddf1d84fe577e/code/design/types.md)                                                                                                      |
| Reactions, endpoints, views, and formers   | [Circle specification](https://github.com/lip-so/6-1040-circle/blob/6d6b43140d6b9621c730f6dbe4bddf1d84fe577e/code/design/compositions/Circle.md) and [implementation](https://github.com/lip-so/6-1040-circle/blob/6d6b43140d6b9621c730f6dbe4bddf1d84fe577e/code/src/compositions/Circle.ts)                                                                 |
| TypeScript concepts and MongoDB operations | [Concept implementations](https://github.com/lip-so/6-1040-circle/tree/6d6b43140d6b9621c730f6dbe4bddf1d84fe577e/code/src/concepts/)                                                                                                                                    |
| Commons sign-in                            | [Accounts](https://github.com/lip-so/6-1040-circle/blob/6d6b43140d6b9621c730f6dbe4bddf1d84fe577e/code/src/compositions/reusable/accounts.ts) and [Commons](https://github.com/lip-so/6-1040-circle/blob/6d6b43140d6b9621c730f6dbe4bddf1d84fe577e/code/src/compositions/reusable/commons.ts), reused from [ConceptBox](https://github.com/mit-sdg/conceptbox) |
| Minimal Vue frontend                       | [Frontend](https://github.com/lip-so/6-1040-circle/tree/6d6b43140d6b9621c730f6dbe4bddf1d84fe577e/code/frontend/src/)                                                                                                                                                   |
| Tests                                      | [Concept tests](https://github.com/lip-so/6-1040-circle/tree/6d6b43140d6b9621c730f6dbe4bddf1d84fe577e/code/tests/concepts/), [composition/HTTP tests](https://github.com/lip-so/6-1040-circle/tree/6d6b43140d6b9621c730f6dbe4bddf1d84fe577e/code/tests/compositions/), and [formatting tests](https://github.com/lip-so/6-1040-circle/tree/6d6b43140d6b9621c730f6dbe4bddf1d84fe577e/code/tests/ui/)                                                |

The MVP implements Remembering, Seeking, and Graphing + the reused authentication concepts.

Each user's notes, needs, and graph are scoped to their authenticated account to prevent security issues.

Graphing uses a local TypeScript parser and keyword matching; there is no LLM processing in this alpha.

Connecting's dismissed/useful suggestion history and broader language understanding are deferred.

**[Screen recording](https://www.loom.com/share/1795afb2bf8446a7be5abd993374e1d6).**

## P3: Beta (complete functionality)

[Assignment brief](https://61040.github.io/fa26/assignments/p3/). The beta adds text, voice and form capture; private LLM organization and Find; form-only editing; and confirmed deletion. Input icons have hover labels and accessible names. Contact rows keep personal notes collapsed, omit missing fields and mark uncertain interpretations. “Today” and “yesterday” resolve using the note’s saved local day. The responsive interface uses Urbanist/Handlee, rounded controls and hover-only artwork.

| Required deliverable | Links / status |
| --- | --- |
| Code and updated specifications | [Backend](code/src/) · [Frontend](code/frontend/src/) · [Provider adapter](code/src/providers/README.md) · [Concept specifications](code/design/concepts/) · [Types](code/design/types.md) · [Reactions, endpoints, views and formers](code/design/compositions/Circle.md) |
| Deployed app | [circle.mit-sdg.dev](https://circle.mit-sdg.dev/) — redeploy the submitted commit before submission; local changes are not automatically deployed. |
| Automated tests and saved execution output | [Concept tests](code/tests/concepts/) · [Composition/HTTP tests](code/tests/compositions/) · [UI logic tests](code/tests/ui/) · [Provider tests](code/tests/providers/) · [Saved P3 execution output](code/tests/output/p3-tests.txt) · [Running tests](#running-tests) |
| Visual design study | [Typography and color study, with slide images](design-docs/visual-study.md) |
| Updated user journey | [P3 beta journey](design-docs/p3-user-journey.md) |
| Updated narrated screen recording (YouTube, at most two minutes) | Pending — video link will be added. The recording under P2 is the alpha demo. |
| Updated design notebook (private repository) | [6-1040-sofia](https://github.com/lip-so/6-1040-sofia) — link the updated notebook from that repository’s README. |

Remembering owns current/original notes, revisions and dates; Graphing owns source-linked JSON cards and recall; Seeking owns needs. Registering, Sessioning and CommonsFederating handle accounts. OpenAI requests use strict JSON and `store:false`; the server validates ownership, real contact IDs and source evidence. Model summaries can be imperfect. Revision checks, retry tokens and deletion markers protect edits and removal. Recommendations, saved-search lifecycle and merging contacts by name remain deferred from the original P1 vision.

### Run locally

Requires Bun, a running MongoDB instance and a server-side OpenAI API key. Install dependencies from the repository root:

```sh
bun install --cwd code
bun install --cwd code/frontend
```

Create `code/.env` from [code/.env.example](code/.env.example) only if it does not already exist. Configure `MONGODB_URL` for app data, `TEST_MONGODB_URL` for tests, and `OPENAI_API_KEY` on the server. Never commit the key. For local use, set `PUBLIC_ORIGIN=http://localhost:3000` and `COMMONS_ORIGIN=https://class.mit-sdg.dev`.

```sh
bun run build
bun run start
```

Open [localhost:3000](http://localhost:3000/) and sign in through Commons. `bun run dev` serves the frontend at localhost:5173.

### Running tests

Start MongoDB and configure a test-only `TEST_MONGODB_URL` in `code/.env` (for example, `mongodb://127.0.0.1:27017`). The tests create and remove uniquely named disposable databases, leaving app data alone. They inject test providers; the automated suite does not need an OpenAI key or send notes to OpenAI.

```sh
bun run check
bun run test
bun run build
```

Coverage includes concept behavior, authenticated user journeys, ownership, malformed provider output, relative dates, edit conflicts/retries, deletion races, MongoDB persistence and voice cancellation. The [saved output](code/tests/output/p3-tests.txt) records the command, execution time and result. To refresh it from the repository root:

```sh
mkdir -p code/tests/output
bun run test > code/tests/output/p3-tests.txt 2>&1
```

An optional explicit live-provider check uses synthetic data and requires a configured server key: `bun run --cwd code check:brain`.

Limits: 20,000 characters per note, 2,000 per search, two minutes/4 MiB per recording, and 256 notes/256 KiB per complete search corpus. Oversized context fails explicitly rather than being truncated.
