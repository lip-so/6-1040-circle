## Verdict
Revise

## Assessments

| Obligation | Assessment |
|---|---|
| Capture and relative dates | Remember authenticates, saves the original and anchored reference date, then awaits organization. Same-token retries retain that date; provider failure preserves the note. |
| Form preparation | PrepareEdit authenticates and checks the owned live record before provider work. Opening/cancelling does not edit it. |
| Edit and retry | Remembering owns atomic revision checks, immutable first text and same-token retries. Success waits for organization; downstream failure preserves the applied edit for deliberate retry. |
| Delete versus edit | Removal erases both current and original text. Owned reads hide removed records before graph cleanup; markers prevent resurrection. |
| Revision versus extraction | The intended ordering is clear, but the digest-cache shortcut does not settle revision advancement; see P3-01. |
| Interpretation and evidence | Summaries and marked inferences are allowed while source evidence, private context and selected database identities remain validated. |
| Recall freshness | Results rejoin current owned content/reference date and matching cards. Stale or missing sources are omitted; unchanged query/corpus/configuration reuses selections. |
| UI | Equal Text/Voice/Form choices, separate form-only edit draft, collapsed personal notes, omitted empty values and mobile dialogs are explicit. |
| Executable inventory | Seven endpoints have matching typed links and paths; OwnedMemory, SavedMemories and NeedResults remain selected. No added internal reactions or computations; six static instances and bindings remain unchanged. |

## Findings

**P3-01 — Material: a cache hit can leave revision ordering behind the accepted edit.**  
Graphing’s state does not declare `sourceRevision`, although its ordering rule depends on that field. Moreover, `ingest` returns immediately when content digest and provider version are current, without specifying that the incoming revision is recorded.

Consider revision 0 containing A, a delayed revision-1 extraction for B, then revision 2 returning to A with the same reference date. Revision 2 can hit the existing A cache and leave the source at revision 0; the delayed revision-1 extraction can then replace it with B. Final joins hide the mismatch, but the newer edit’s organization has still been displaced.

Declare the revision state and settle how successful cached ingestion advances or otherwise preserves ordering for the incoming revision. The contract must ensure a lower-revision extraction cannot displace a successfully organized newer edit, including when content returns to a previously cached value.
