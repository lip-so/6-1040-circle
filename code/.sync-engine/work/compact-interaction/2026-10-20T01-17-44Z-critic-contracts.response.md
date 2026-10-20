## Verdict
Revise

Reviewed only the supplied candidate snapshot; subsequent recommendation-suppression changes are outside this review.

## Assessments

| Obligation | Assessment |
|---|---|
| Latest-search ordering | Seeking owns ordering: dated newest first, identity ties ascending, undated legacy last. `_active` preserves that order. Owner filtering and strengthened existing test agree. No mutation or retry effects. |
| Deliberate repeated search | Backend `Seek → Seeking.seek → RefreshSoughtNeed → clear/reset/offer → NeedResults` agrees with the revised contract. Exact normalized reuse preserves need identity/time; connections regenerate from current complete evidence. Acknowledgement awaits settlement. Partial failure preserves the need and permits retry/refresh without duplicating the need. Client routing violates this obligation: CI-01. |
| Ordinary evidence refresh | Existing reset/trace/offer policy preserves handling status; explicit seek/revision alone clears it. Effects remain composition-owned and owner-scoped. Failure leaves unsupported connections ineligible; explicit refresh remains available. |
| Compact client lifecycle | Four-row display does not limit matching. Inline panels provide focus/collapse and reveal reused older searches. Account/reset/delete/resolve paths clear selected state. Feedback controls and manual indexing/New search controls are absent in this snapshot; accessible encounter pen/bin controls remain. |

Selected declaration inventory matches the supplied composition: 23 endpoint declarations, including the two declarations sharing `/suggestions/refresh`; 14 internal reactions; seven views; six formers; and `sourceDigest`. Endpoint paths and exact typed links are present. Existing concrete instances remain Registering, CommonsFederating, Sessioning, Remembering, Seeking, Graphing, and Connecting. These changes introduce no additional computation, optional-input branch, instance, or endpoint.

## Findings

**CI-01 — Search arrow bypasses deliberate-search regeneration for a selected unchanged search.**  
[App.vue:204](/private/tmp/circle-compact-interaction/code/frontend/src/App.vue:204) routes this case to `api.suggestions.refresh()` instead of `/needs/seek`. Ordinary refresh intentionally preserves legacy Useful/Dismissed status, so selecting a saved search and clicking its arrow can leave those matches hidden. This contradicts the revised contract that deliberate searches regenerate current matches regardless of prior feedback. The backend seek reaction implements the promised behavior, but this client path does not invoke it.
