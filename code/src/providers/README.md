# External AI provider adapter

[brain-provider.ts](brain-provider.ts) is shared infrastructure. It is not a registered concept and has no database, account registry or persistent user memory. The six registered concepts are unchanged.

| Concept responsibility | Injected interface / adapter support | Specification |
| --- | --- | --- |
| Graphing organizes one source and recalls saved contacts | `BrainProvider.extract`, `BrainProvider.select`; pure `validateCard` / `validateSelection` helpers | [Graphing](../../design/concepts/Graphing.md) |
| Remembering transcribes audio without saving it | `Transcriber.transcribe` | [Remembering](../../design/concepts/Remembering.md) |
| Application configures and injects provider dependencies | [main.ts](../main.ts) and [assembly.ts](../assembly.ts) | [Circle composition](../../design/compositions/Circle.md) |

`OpenAIProvider` implements both interfaces. Extraction sends the note and its calendar anchor; selection sends the need and the supplied account-scoped JSON cards with opaque source IDs. Text requests use strict JSON schemas, `store:false`, no conversation continuation and a 45-second default timeout. The default text model is `gpt-5.4-2026-03-05`, with reasoning `none` and temperature `0.35`; `OPENAI_TEXT_MODEL` can override the model. Credentials are request headers, never model input.

Graphing validates the returned card schema, bounded source evidence, names, dates and selection IDs/indexes before persistence. Remembering validates the recording, then the adapter uploads ephemeral audio to transcription and checks bounded nonempty text. The default transcription model is `gpt-4o-mini-transcribe`, overridable through `OPENAI_TRANSCRIBE_MODEL`. The adapter does not persist audio or save a note.

Missing configuration uses unavailable provider dependencies that raise an error on invocation. Network/provider errors and invalid model output propagate as processing failures; there is no automatic retry or local inference fallback. Durable contact memory, cache identities, ownership and deletion guards remain in Graphing; exact/current originals remain in Remembering. Source evidence checks do not guarantee semantic correctness.

[Provider transport tests](../../tests/providers/BrainProvider.test.ts) inject fake HTTP responses. [Graphing tests](../../tests/concepts/Graphing.test.ts) verify validation, ownership, caching and races. No live provider call is required for the automated suite.
