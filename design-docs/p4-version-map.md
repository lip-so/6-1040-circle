# P4 version and source map

This is evidence for Sofia’s own final design summary. Git history confirms the following snapshots; **the course-submitted P1/P3 SHA still needs Sofia’s confirmation**. The final reviewed local source will receive immutable links after the new implementation commit exists; a local commit is not publicly accessible until pushed.

| Version | Immutable evidence | What it supports |
| --- | --- | --- |
| Initial P1, October 6 | [Concept proposal](https://github.com/lip-so/6-1040-circle/blob/c9284787a11afb0e29a46347f5a8b8c39a5a8ffc/design-docs/concepts.md), [problem framing](https://github.com/lip-so/6-1040-circle/blob/c9284787a11afb0e29a46347f5a8b8c39a5a8ffc/design-docs/problem-framing.md) | Original broader graph/goals/rediscovery proposal and user problem. |
| P1 feedback revision, October 16 | [Concept proposal](https://github.com/lip-so/6-1040-circle/blob/54278bf8fba3a1fe855e2a3fcc83519112db5f9e/design-docs/concepts.md) | Revised historical P1, distinct from initial P1. |
| P2 baseline | [Snapshot](https://github.com/lip-so/6-1040-circle/tree/6d6b43140d6b9621c730f6dbe4bddf1d84fe577e) | Historical keyword-based alpha; not final AI runtime. |
| P3 clean baseline, October 20 | [Visual study](https://github.com/lip-so/6-1040-circle/blob/8dfc7f24d1ff8a41698e7a5d6178f700f738187f/design-docs/visual-study.md), [journey](https://github.com/lip-so/6-1040-circle/blob/8dfc7f24d1ff8a41698e7a5d6178f700f738187f/design-docs/p3-user-journey.md), [style](https://github.com/lip-so/6-1040-circle/blob/8dfc7f24d1ff8a41698e7a5d6178f700f738187f/code/frontend/src/style.css) | Actual typography/palette/interaction baseline, not just candidate study images. |
| Pre-refinement P4 base | [Source snapshot](https://github.com/lip-so/6-1040-circle/tree/ad4d2412b1c1a43ea813526abafb8244352eb2e8) | Starting revision before the current A1–A8 refinements. |

## Final source references — awaiting implementation commit

- [Six current concepts](../code/design/concepts/) and [type bindings](../code/design/types.md).
- [Circle reactions, endpoints, view and formers](../code/design/compositions/Circle.md), [account composition](../code/design/compositions/reusable/accounts.md), [Commons composition](../code/design/compositions/reusable/commons.md).
- [Remembering implementation](../code/src/concepts/Remembering.ts), [Graphing implementation](../code/src/concepts/Graphing.ts), [edit preparation](../code/frontend/src/encounter-form.ts).
- [Actual provider instructions](../code/src/providers/brain-provider.ts): `extractionInstructions`, `selectionInstructions`, strict schemas and cache version `contact-v4`; text default `gpt-5.4-2026-03-05`, temperature 0.35, reasoning none, `store:false`. [Adapter explanation](../code/src/providers/README.md). These are current source defaults, not a claim about the unidentified live deployment’s environment.
- [Factual change record](p4-change-record.md) and [verification/source fingerprints](p4-verification.md) distinguish authored rationale, implementation evidence and remaining limits.

The final summary can link a whole committed file for provider instructions, avoiding brittle line references. Use the exact implementation commit for final source; later document-only commits do not make a different runtime by themselves. Reconcile the actual deployment and final submitted commit in the release report.
