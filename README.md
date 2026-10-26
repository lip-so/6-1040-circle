# Circle

*Remember the people you didn’t know you’d need.*

Circle helps students retain encounter context and later find relevant people from their own saved notes. Commons sign-in, Text/Voice/Form capture, AI-assisted recall, reviewed editing and confirmed removal form the current journey.

Sofia Lipkevych’s 6.1040 Fall 2026 personal project. The design notebook is in the [private individual repository](https://github.com/lip-so/6-1040-sofia).

## P4: current implementation and materials

| Start here | Link / actual status |
| --- | --- |
| App | [circle.mit-sdg.dev](https://circle.mit-sdg.dev/) — Sofia deploys. The October 26, 15:36 EDT inspection still showed an older frontend; [release handoff and live checks](design-docs/p4-release-handoff.md). |
| Final design document | Sofia is writing the final 1–2-page synthesis. [Factual outline](design-docs/p4-design-summary-outline.md) and [immutable historical/version map](design-docs/p4-version-map.md) are ready; final prose/rendered length pending. |
| Narrated final demo, at most **three minutes** | [Video wrapper and recording brief](design-docs/p4-video.md) — real URL, release and playback check pending Sofia’s recording. |
| Current specifications and reactions | [Six concepts](code/design/concepts/) · [type bindings](code/design/types.md) · [Circle endpoints/reactions/view/formers](code/design/compositions/Circle.md) · [reused accounts](code/design/compositions/reusable/accounts.md) · [Commons](code/design/compositions/reusable/commons.md) · [generated readback](code/generated/circle.md) · [caller contract](code/generated/wire.ts). |
| Implementation and provider instructions | [Backend](code/src/) · [frontend](code/frontend/src/) · [actual AI instructions](code/src/providers/brain-provider.ts) · [provider boundary](code/src/providers/README.md). |
| Verification and tests | [P4 verification](design-docs/p4-verification.md) · [saved P4 output](code/tests/p4-output/) · [concept tests](code/tests/concepts/) · [HTTP/composition tests](code/tests/compositions/) · [UI helper tests](code/tests/ui/) · [rendered Chrome tests](code/frontend/tests/browser/) · [provider tests](code/tests/providers/). |
| Design development | [Factual refinement record](design-docs/p4-change-record.md) · [agent journal](agent-journal.md) · [P3 visual study](design-docs/visual-study.md) · [access review](design-docs/p4-access-review.md). |
| Reproduction / evidence navigation | [Clean-copy results](design-docs/p4-reproducibility.md) · [evidence index and retained work records](design-docs/p4-evidence-index.md). |

Each saved original is a separate encounter; equal names are not merged and unknown names can remain unknown. Editing changes current recall while Personal notes retains the first saved wording. AI summaries can be wrong; inspect source evidence. Graphing is source-local; cross-note relationship tracing, automatic rediscovery, saved-search lifecycle, recommendations/exclusions and Connecting remain deferred from P1.

## Run locally

Tested with **Bun 1.4.2**, the existing lockfiles and authenticated local MongoDB. Commons access is needed for interactive sign-in. The ordinary tests inject providers and need no AI key. Chrome is required for the rendered suite. [Clean-copy verification and limits](design-docs/p4-reproducibility.md).

From the repository root:

```sh
bun install --frozen-lockfile --cwd code
bun install --frozen-lockfile --cwd code/frontend
```

Create `code/.env` from [code/.env.example](code/.env.example) **only if it does not already exist**. Keep configured secrets out of Git and never overwrite an existing file. Configure:

| Variable | Meaning |
| --- | --- |
| `MONGODB_URL` | Your app database, on a running MongoDB server. Include its actual authentication credentials and `authSource` when required. Example `dev:dev` works only on a server configured with that account. MongoDB is not provisioned by these commands. |
| `TEST_MONGODB_URL` | Separate test configuration with permission to create/drop uniquely named disposable test databases on a test server. Tests do not reuse the app database name. Do not point it at a shared production server. |
| `PUBLIC_ORIGIN` | Built local app: `http://localhost:3000`. Must match the address opened for Commons callbacks. The dev helper supplies `http://localhost:5173` to its backend. |
| `COMMONS_ORIGIN` | Existing course Commons, default `https://class.mit-sdg.dev`. Obtain Commons access before interactive testing. |
| `OPENAI_API_KEY` | Server-only key for organization/search/transcription. Never use a `VITE_` prefix or commit the key. Without it the app/health can start, but processing is unavailable. |
| `OPENAI_TEXT_MODEL`, `OPENAI_TRANSCRIBE_MODEL` | Optional server defaults: `gpt-5.4-2026-03-05` and `gpt-4o-mini-transcribe`. |

```sh
bun run build
bun run start
```

Open [localhost:3000](http://localhost:3000/) and sign in through Commons. Alternatively, `bun run dev` starts the backend on 3000 and the development frontend on [localhost:5173](http://localhost:5173/). Stop the process with Ctrl-C. **`/health` checks MongoDB only**; it can return `ok` while AI processing is unavailable. Real HTTPS microphone access also depends on browser/OS permission.

## Run verification

Configure test-only `TEST_MONGODB_URL` in `code/.env` and start its authenticated MongoDB server. The tests use unique disposable databases and synthetic data. They drain accepted work before dropping only those databases. Install Google Chrome; Playwright 1.64.1 is locked in the frontend package and uses its `chrome` channel.

```sh
bun run check
bun run build
CIRCLE_BROWSER_PREVIEW=1 bun run test
```

The root test command runs the Bun database/unit suite and rendered Chrome suite. The preview flag uses the production build; without it, browser tests use development serving. Browser tests mock API/microphone transport while Vue, keyboard events, dialogs and layout run in Chrome. They do not verify real Commons, deployed persistence or microphone hardware. Fresh local results: **231 Bun tests / 1,245 assertions and 69 rendered scenarios passed**. Existing thirteen analysis advisories and three build notices are assessed in [P4 verification](design-docs/p4-verification.md).

Run one suite with `bun run --cwd code test` or `CIRCLE_BROWSER_PREVIEW=1 bun run --cwd code/frontend test:browser`. Preserve `code/tests/output/`, which contains genuine historical P3 evidence. Current P4 captures live in `code/tests/p4-output/`; browser tests still produce transient/current screenshots under the historical path when run locally, so use a clean copy to refresh publication evidence.

The separate explicit live check, `bun run --cwd code check:brain`, requires server AI configuration and test MongoDB. It sends only hand-authored synthetic fixtures to the external service and can incur API cost. It is **not** part of the ordinary suite. Earlier five-case live evidence is dated separately; deterministic tests do not prove general model quality.

Current bounds: 20,000 characters per encounter, 2,000 per search, two minutes/4 MiB per recording, and 256 notes/256 KiB per complete search corpus. Oversized context refuses explicitly rather than truncating. Cold AI work can outlast the caller’s 120-second deadline and continue; manual retry can reuse completed work. No cross-concept rollback is promised.

## Earlier milestones

The [P3 beta journey](design-docs/p3-user-journey.md), [visual study](design-docs/visual-study.md) and [original execution captures](code/tests/output/) remain dated historical evidence. P3 introduced AI capture/recall, editing and removal; P4’s fidelity, date, retry, recovery and task-clarity refinements are described above. P1/P2 links below preserve their earlier scope. The P2 recording is the alpha demo.

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

### UI sketches

[UI sketches](design-docs/ui-sketches.md) are low-fidelity screens for Home, Remember Someone, Find Someone, and Check the Memory, included as images in Markdown (original scan: [UI.pdf](design-docs/UI-assets/UI.pdf)).

1. [Home](design-docs/ui-sketches.md#1-home)
2. [Remember Someone](design-docs/ui-sketches.md#2-remember-someone)
3. [Find Someone](design-docs/ui-sketches.md#3-find-someone)
4. [Check the Memory](design-docs/ui-sketches.md#4-check-the-memory)

### User journey

[User journey](design-docs/user-journey.md) follows Ralph from meeting Faustin -> saving the encounter -> Circle resurfacing that connection when Ralph’s goals change.

## P2: Alpha implementation

This section describes the [submitted P2 snapshot](https://github.com/lip-so/6-1040-circle/tree/6d6b43140d6b9621c730f6dbe4bddf1d84fe577e/). Current functionality is documented in the P4 entry above.

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
