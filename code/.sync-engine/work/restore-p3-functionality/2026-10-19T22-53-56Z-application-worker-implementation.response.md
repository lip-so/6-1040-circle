## Status
Blocked

Lifecycle, graph, provider, registration, and host changes are retained. Composition restoration awaits the approved evidence-enumeration contract.

## Changed
- `src/concepts/Remembering.ts`: revisions, deletion tombstones, injected transcription.
- `src/concepts/Seeking.ts`: ongoing-need lifecycle and legacy active interpretation.
- `src/concepts/Connecting.ts`: persistent suggestions and handled status.
- `src/concepts/Graphing.ts`: source digests/version checks, corrections/retraction, directed cross-note tracing.
- `src/concepts/graphing-text.ts`, `graphing-extraction.ts`, `openai-extractor.ts`: multiple explicitly named people, directed KNOWS, organization facts, common validation.
- `src/concepts/transcription.ts`: bounded audio validation and injected OpenAI transcription.
- `src/concepts.ts`, `src/assembly.ts`: registrations, refusal mappings, sourceDigest, provider injection.
- `src/compositions/inputs.ts`: reusable protected payload validation.
- `src/host/http.ts`, `src/host/admission.ts`, `src/main.ts`: audio body limit, error categories, complete-settlement FIFO admission.
- `tests/concepts/graphing-extraction.test.ts`: replaced obsolete one-person restriction test.
- `tests/providers/transcription.test.ts`, `tests/host/admission.test.ts`: focused provider and admission checks.

## Checks
- `bunx tsc --noEmit` — passed.
- `bun test tests/providers/transcription.test.ts tests/host/admission.test.ts tests/concepts/graphing-extraction.test.ts` — passed: 7 tests.

Full MongoDB suite, artifact generation, contract/source checks, restored endpoint validation, and browser integration remain unfinished.

## Blockers
**Design D01:** The approved contract requires validating every claim identity in a candidate’s evidence set, including missing identities. Supplied public DSL documentation establishes membership comparisons but does not establish enumeration of an unbound variable over `Set<Evidence>`.

Add an approved pure query such as `Graphing._members(owner, evidence)` that enumerates every distinct supplied claim identity—including absent claims—plus an `InvalidEvidence` composition view. Full proof then excludes a candidate whenever any enumerated identity lacks `OwnedEvidence`.

Composition endpoints, automatic reset/offer reactions, universal proof joins, and generated artifacts remain unchanged pending that repair.

## Concerns
- No live OpenAI request was made; no configured key was available.
- The full existing graph suite may expose parser compatibility issues; only extraction validation tests have run so far.
- HTTP refusal category mappings are present, but exact normalized missing/foreign response bodies still require composition and HTTP verification.
