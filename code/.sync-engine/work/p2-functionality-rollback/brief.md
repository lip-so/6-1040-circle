# Restore P2 functionality and retain current visuals

## Goal
Restore behavior from commit 6d6b431, retaining current artwork, colors and fonts.

## Scope
Exact P2 backend, authored contracts, tests, package configuration and guided field serialization. Frontend uses the P2 script and data with presentational wrappers only. Keep existing notes and environment untouched.

## Requirements
Commons sign-in, guided save with only person required, retry safety, owned recent encounters and immediate local Find results. No P3 endpoints, LLM/external model providers, voice, note editing/deletion, search lifecycle, Connecting or exclusions.

## Active decisions
- Explicit user rollback supersedes earlier P3 scope in repository notes.
- Restore the accepted P2 contracts directly; no new product decomposition.
- Coordinator performs implementation and simulated contract review. Review is not independent; no delegation requested for this mechanical baseline restoration.
- Validate in an isolated copy before guarded application to the original checkout. Keep historical journal, personal journal, original visual references, and existing workflow artifacts.
- Restore P2 dependencies exactly after workflow handback; the workflow tool remains available in existing development installations.

## Done when
- Backend source and design match 6d6b431 byte for byte; generated contracts agree.
- Guided save, local search and ownership/retry regression tests pass.
- No P3 provider or lifecycle endpoints remain in generated public interface or frontend consumers.
- Existing visuals and fonts remain, and guided fields/cards display on desktop and phone.
- Type checks, production build and relevant tests pass; report limitations.

## Open questions
None.

## Activity
- Isolated current checkout, identified latest P2 commit, restored accepted baseline and applied visual-only frontend wrappers.
- Regenerated artifacts match P2 exactly; backend/design/test baseline comparison is clean.
- Full suite: 94 pass, 0 fail, 425 assertions; checks and build pass. Nine framework advisories and existing browser externalization warnings remain.
- Public wire inspected directly: Commons start/finish/choose, auth me/logout, memories remember/list, needs seek. Only P2 inputs remain.
- Browser visual fixture verified guided draft/save/search/cards/fonts/artwork, only Person required, and no overflow at 320/390px. No live Commons or model-provider calls.
- Simulated critic approved; handback checks satisfied with no prepared runs.
