# Private LLM contact memory with text and voice

## Goal
Turn typed or dictated encounter notes into evidence-backed JSON and use per-user LLM recall to select real database cards. Preserve deletion/confirmation, plain rows, fonts and hover artwork.

## Scope
Remembering owns originals and ephemeral transcription. Graphing owns structured source JSON, inference and deterministic cached selection. Seeking owns needs. Authenticated composition alone shares an owned corpus; six existing concepts remain. Update specs, providers, runtime config, generated callers, UI and tests. No recommendations, lifecycle dashboard, name merging or shared external chat.

## Requirements
Strict schema plus server validation; source-linked literal values/full quotes. Per-user queries before every read and provider context, no account IDs/cookies/keys in model input. Store:false and no conversation continuation. Read actual cards back through owned originals after selection. Text/voice one editable draft, no automatic save. Exact source/query/version caching, deterministic first stored result and explicit corpus limits. Delete all source evidence and selection caches; no stale-write resurrection. Failures keep saved originals/needs and offer deliberate retry without silent fallback.

## Active decisions
- Latest user explicitly supersedes P2 no-LLM/no-voice scope, restoring only the requested text/voice input design and adding LLM recall; deletion and its confirmation stay.
- Durable memory is canonical source-linked JSON in owner-scoped MongoDB, not a shared provider conversation. Model only selects IDs and fact indexes; backend supplies cards/reasons.
- One saved note is one primary contact card. Ambiguous/unknown names can remain null; never invent identity or merge equal names.
- A search explicitly organizes missing/outdated records for that owner's existing originals; no global background migration or external retry.
- Supported complete memory is 256 notes and 256 KiB; original limits refuse before effects; structured overflow after organization is an ordinary processing error. Never silently drop context. Test limits and failures.
- Provider model remains configurable and fingerprinted. Prefer an available pinned structured-output model; repeated query/corpus uses durable first-writer selection. No absolute claim of model determinism or semantic correctness.
- The user added the OpenAI key locally; presence was verified without displaying it. Implement/tests continue with explicit injected fakes. Never read/print secret values or apply staging .env. Real synthetic extraction/retrieval/cache/isolation/removal now passes; no existing private notes were used.
- Coordinator authors contracts and implementation; independent native critics check design and implementation. Implementation review reads affected permanent design to assess contract fidelity. Isolated staging and guarded apply preserve user edits/data. Temporary workflow metadata does not change repository dependencies.

## Done when
- Specs and actual six-concept assembly/endpoints/generated wire agree for text, transcription, owned corpus, JSON cards, LLM recall and removal.
- Extraction, quote/schema validation, no invented selections, strict per-user isolation, first-writer/repeated cache, corpus changes, removal races and failure recovery pass meaningful tests.
- Voice bounds/cancellation/account races and frontend editable-draft/save/list/search/confirmation behavior pass checks and browser validation.
- Full test suite, type/spec/artifact checks and build pass; provider adapter payload/failure tests use deterministic stand-ins without user data.
- Runtime uses real configured OpenAI when a key is present; report any remaining key/network/provider-quality limitation honestly.

## Open questions
None about product flow. Runtime key is configured. Hardware microphone capture has not been exercised; transcription transport and cancellation use synthetic and injected tests.

## Activity
- Inspected current P2+removal and P3 reference UI, read official structured-output/audio documentation, prepared scoped contracts.

- Contract critic /root/brain_contract_review raised PB-01 (late structured budget cannot be a no-effect refusal); repaired and independently verified Approve. Implementation critic /root/brain_implementation_review returned Approve, no findings. No simulated roles.
- 98 tests/542 assertions pass using disposable MongoDB databases and explicit test providers. Backend spec/source/artifact/type checks, Vue typecheck and production build pass.
- Real OpenAI synthetic extraction/retrieval, repeat cache, foreign-owner isolation and withdrawal check passed. Existing user notes were not used.
- Disposable browser fixture verified plain-text/mic controls, draft preservation across mode switches, centered Save, card row, search and expanded stored facts/original. Existing removal dialog remains covered by tests and prior browser validation.
- Public interface manually reconciled against generated/wire.ts because workflow summary says not generated: five Circle endpoints all require session at the domain boundary; HTTP projects it away. Remember content/submission; list after; transcribe audio/mediaType; forget memory; seek description. No defaults/optional request fields or caller owner/corpus. Each Done when outcome maps to these flows and the tests above.
