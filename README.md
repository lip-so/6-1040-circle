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
