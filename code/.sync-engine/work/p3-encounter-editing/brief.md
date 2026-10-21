# P3 entry, editing and interpretation

## Goal
Finish requested P3 behavior: equal Text/Voice/Form, form-only LLM-prefilled editing, collapsed original personal notes, mobile layout, concise README, consistent concepts and regression coverage. Interpret short lowercase names and works-on activity, omit missing values, resolve today/yesterday and use a stronger moderately varied model with source-grounded summaries and marked uncertainty.

## Active decisions
- User explicitly supersedes earlier no-edit/no-inference/no-relative-date rules. Six concepts, Commons auth and private source-linked recall remain; no deferred recommendation/lifecycle features.
- Keep immutable first original separately from editable current form content. Revision CAS and per-edit submission token prevent lost updates and retry duplicates. Delete erases both; sourceRevision prevents delayed extraction from overwriting newer edits.
- Timezone comes from the browser (validated IANA), default America/New_York for older callers. Server time anchors referenceDate on first save/edit. Retry keeps that date. Today/yesterday use calendar arithmetic, never the later search day; missing legacy capture time stays unknown.
- Provider default moves from GPT-5.4-mini to pinned GPT-5.4, temperature 0.35 with supported reasoning none. Values may summarize; assumptions marked inferred. Full source evidence and actual result-ID validation remain. No external knowledge about famous names.
- Equal Text/Voice/Form selector, existing shared typed/voice draft and separate form draft. Edit opens a separate form dialog prefilling stored LLM JSON, explicitly organizes old/unprocessed record first, never auto-saves.
- Independent contract critic, coordinator implementation, focused independent implementation review if useful. Isolated staging and guarded apply preserve manual edits, .env and existing user data.

## Done when
- Authenticated prepare-edit/edit and existing endpoints agree with concept specs/generated types; no legacy active behavior conflicts.
- Both David regressions, works on, summaries, relative date boundaries, timezone/retries, foreign-user edit, revision conflicts, provider failures, delete/edit/stale-ingest races and persistence have meaningful tests.
- Text/Voice/Form, prefilled editing/cancel, nested collapsed notes and mobile layout work in browser; no unknown-value placeholder clutter.
- Checks/tests/build pass, real synthetic provider validation succeeds, README describes P3 concisely, local app restarted without deleting user data.

## Activity
- Inspected prior short-name fix/current auth/composition and read official model/parameter docs; prepared contracts.
- Implementation preserves optional date/revision inputs for older direct callers; HTTP defaults timezone explicitly. Added current-revision checking to _card and a bounded read compatibility rule for unchanged revision-zero v1/v2 JSON, so existing saved cards stay visible without exposing stale edited evidence. These query-surface changes warrant final contract review.
- Calendar/summary/role examples passed real OpenAI with newly created synthetic contacts only, using pinned GPT-5.4 at temperature 0.35/reasoning none. Automatic approval review rejected repeating the reported real-note payloads; those remain local regression fixtures. No workaround or existing-note transmission was used.
- 115 tests/633 assertions pass, including edit failure+same-token recovery, isolation/conflicts, stale result joins, cached A→B→A revision races, day/timezone/DST boundaries, no placeholders, original persistence/removal and previous-record compatibility. Backend/spec/artifact/types and Vue typecheck pass.
- Synthetic browser verified prefilled edit, cancel, saved changes, equal Text/Voice/Form and collapsed personal notes. Narrow viewport checks measured no horizontal overflow, equal 46px entry buttons, stacked form fields and a scrollable dialog fitting the viewport. Physical microphone capture not exercised; existing cancellation tests and prior synthetic transcription remain evidence.
- Final contract review resolved P3-01 revision-watermark ordering and P3-02 omission defaults; independent critic /root/p3_edit_contracts approved the final digest. Independent implementation critic /root/p3_edit_implementation approved with no findings. No simulated roles.
- Public interface manually reconciled with generated/wire.ts: seven Circle endpoints; all domain inputs require session and HTTP removes it via cookie binding. Remember content/submission, edit memory/content/submission/revision, prepare-edit memory, list after, transcribe audio/mediaType, forget memory, seek description. Remember/edit optional timeZone has declared default America/New_York. Current card/result rows expose original/revision/referenceDate/card without accepting caller owner/corpus/timestamp.
- README reduced to 48 lines and labeled P3. Active agent guidance now includes edits, uncertainty and relative dates; historical P1/P2 materials remain references. Existing JSON records have narrowly scoped read compatibility; no backend P2 matcher is restored.
- Browser also verified personal note heading and original text both 14px, and that closing/reopening a contact resets the personal-note disclosure to collapsed. Screenshot /private/tmp/circle-p3-edit-mobile.png records phone edit dialog. No user data was changed during UI validation.

- Guarded apply found no concurrent source conflicts. Actual checkout passed check/build and 115 tests/633 assertions. Started localhost:3000 and opened Remember; the existing david card visibly shows Does: does papers, no missing-value rows and collapsed Personal notes. No user note mutation was used for this final UI check. Final screenshot /private/tmp/circle-p3-local.png.
