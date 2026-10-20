# Repair short-note organization and equal text/voice controls

## Goal
Fix two reported failures: “I met David Hume who talks about philosophy.” and “david who does papers”. Valid notes need no date. Preserve existing saved originals and retry identity. Make Text and Voice equally prominent in Remember, drawing on P3 controls without its deferred functions.

## Active decisions
- Reproduced first model output: correct literal name David Hume, nameQuote only David Hume; complete fact quotes. Existing validator rejected a partial name quote and faulted the card. Canonicalize literal name evidence to an enclosing complete source sentence/line before storage; fact quote validation stays strict. Never fabricate names/facts or suppress real faults.
- Explicit stated habitual activity belongs in Does, retaining literal wording. A conversation between the user and contact remains Discussed; neither implies expertise/employment. No inferred occupation for vague papers, philosophy or historical names. No required or invented encounter date.
- Text/Voice selector has equal visual controls. Voice has explicit start/stop/cancel and returns editable text before deliberate Save. Switching cancels pending voice and preserves typed draft; account/privacy guards remain.
- Existing design boundaries and routes remain unchanged. Coordinator implements; independent contract critic reviews scoped clarifications. Final tests include captured model-output regressions, exact notes with real provider, saved-token retry and UI browser validation. Only disposable MongoDB for tests; no private-note dumps.

## Done when
- Both exact notes organize with literal names/Does details and no date requirement; invalid/fabricated facts still reject.
- Same-token retry of failed organization keeps one original and succeeds; per-user isolation and removal guards pass.
- Text/Voice equal controls work, voice cancellation remains guarded and draft survives mode changes.
- Specs, generated artifacts, typechecks, relevant/full tests and local browser agree; restart localhost and recover the existing draft without creating another contact.

## Activity
- Reproduced Hume output and located nameQuote validator mismatch; second exact-note reproduction underway.

- Independent critic /root/name_evidence_review approved clarified contracts with no findings. Both exact notes reproduced against the original provider; both returned a literal bare nameQuote and were rejected.
- Implemented deterministic complete name evidence without changing strict fact validation; added exact nameQuote schema guidance and literal habitual-activity classification. Real configured provider now returns David Hume / talks about philosophy and david / does papers without an entered date.
- 102 tests, 562 assertions pass, including original-token failure/retry without duplicates and literal activity display. Backend/source/artifact/types, Vue typecheck, build and changed design syntax pass.
- Manually reconciled generated interface: same five authenticated Circle endpoints and required inputs; repair remains in existing ingest path. Text/Voice feed the same content/submission Save; transcription remains audio/mediaType.
