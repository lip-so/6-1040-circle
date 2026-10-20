# Remove connections and clean obsolete implementation

## Goal
A red basket removes one saved encounter and its search evidence. Keep the restored P2 product plus this requested deletion feature.

## Scope
Remembering forget, Graphing withdraw, one authenticated endpoint, shared plain contact row UI, regression tests, generated contracts and current documentation. Remove obsolete P3 CSS, unused runtime icons/assets and stale starter/test outputs. Preserve design references, user journals, databases, existing uncommitted work and supported readable older notes.

## Requirements
Owned-only removal, same-name isolation, atomic content erasure, idempotent retry, no resurrection through old saves or delayed graph ingestion. Success waits for graph withdrawal. Downstream failures remain errors with manual same-memory retry. Red basket sits at row top right outside the disclosure, is keyboard labeled, and appears in both recent and search rows. Update without page reload and invalidate pending list replies. Account changes ignore stale removal responses.

## Active decisions
- User explicitly adds removal to the P2 rollback; no other P3 behavior returns.
- A row is one encounter, not merged identity. Remove its original and source evidence; other same-name rows remain.
- Keep only owner/identity removal markers, not deleted text or evidence, to reject stale writes.
- No additional confirmation flow: the labeled basket is the deliberate removal action; transient failure provides Retry removal.
- Authored contracts are coordinator-owned; delegate one independent critic. Implementation is coordinator-owned. Temporary workflow dependency metadata exists only in staging, with no dependency changes applied to the repository.
- Cleanup targets obsolete runtime elements and generated/test leftovers, not historical personal documents or original reference assets.

## Done when
- Specs, six concept registrations, authenticated Forget endpoint and generated API agree.
- Ownership, erasure, idempotency, stale save/ingest refusal, partial failure and same-name behavior have passing tests.
- Shared red-basket contact rows remove from recent/search immediately after success, invalidate stale list replies and offer failed-removal retry.
- Active UI/source has no obsolete P3 flow, provider, icon, stylesheet, asset or starter-generated remnants.
- Full tests, type/spec/artifact checks, production build and browser deletion fixture pass. Existing user data remains intact.

## Open questions
None.

## Activity
- Inspected restored source and accepted ownership/retry patterns; prepared removal contracts and scoped cleanup.
- Independent critic /root/removal_contract_review raised RC-01 through RC-04; all were repaired and verified resolved. Final design approved.
- Source, generated API and host agree; Forget takes memory plus host-injected session, no optional/body credentials. Public refusal mappings inspected.
- Full suite: 100 passing tests, 478 assertions, no failures. Type/spec/artifact checks and Vue typecheck pass; build passes with ten framework advisories and existing SDK externalization warnings.
- Real-engine browser fixture verified search and recent baskets, one-source removal, preserved same-name encounter, downstream-failure Retry removal, disappearance from both views, persistence after reload and final evidence withdrawal. It used a disposable database; actual user data untouched.
- Basket is red and 44x44px; no horizontal overflow at390px or320px. Expanded note disclosure is independent of removal. Fixture cleaned up.
- Removed dead P3 styles/icons, unused runtime assets/fonts, stale test logs, starter readback and tracked Finder metadata. Retained personal/historical reference material and readable existing notes.
