## Verdict
Revise

## Assessments

| Obligation | Assessment |
|---|---|
| Save and date anchoring | Original text and reference date close before organization; retries preserve the saved date and identity. |
| Prepare/edit | Authentication and owned inspection precede provider work. Atomic edit revisions, immutable originals and unchanged-token recovery remain explicit. |
| Revision ordering | P3-01 remains resolved: cached ingestion advances the revision watermark, and older extraction cannot displace newer organized content. |
| Current-card compatibility | Revision-zero compatibility is narrowly limited to unchanged v1/v2 evidence. Edited records cannot use that exception. The newly optional metadata needs explicit omission semantics; see P3-02. |
| Removal and stale results | Removal erases current/original text before withdrawal. Final owned-record/card joins suppress missing, removed and changed evidence during partial failure. |
| Interpretation and UI | Grounded summaries, marked assumptions, relative dates, equal input choices, form-only editing, collapsed notes and mobile behavior remain consistent with the brief. |
| Executable inventory | Seven linked endpoints and matching paths, one linked view and two linked formers; six existing static instances. No added internal reactions or computations. |

## Findings

**P3-02 — Material: omitted Graphing metadata has no defined meaning.**  
`ingest` and `_card` now accept optional `referenceDate` and `revision`, but neither declares their values or behavior when omitted. In particular, `_card` promises a current-revision check without specifying whether an omitted revision means zero, skips that check, or obtains a revision elsewhere. Those choices differ materially for edited records and the compatibility exception.

State the omission defaults in Graphing and confirm that Circle’s saved-card and result joins supply the owned record’s current revision. Omission must not become a way for an edited record to satisfy the revision-zero compatibility rule.
