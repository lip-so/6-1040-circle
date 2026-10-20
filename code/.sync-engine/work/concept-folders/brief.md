# Organize backend concept folders

## Goal
Match the reused concepts: each application concept has a named folder containing its implementation and supporting files.

## Scope
Relocate Remembering, Seeking, Graphing and Connecting source modules; update importing backend, frontend and test files. Keep current behavior and authored contracts.

## Done when
- All seven backend concepts use named folders with matching implementation filenames.
- Concept-specific support modules live with their concept.
- Imports resolve; existing backend/artifact/Vue checks, tests and frontend build pass.
- Existing user edits and personal design journal are preserved.

## Active decisions
- Existing accepted design applies unchanged; no product, API or ownership changes.
- Coordinator performs mechanical relocation directly. Independent critic checks compatibility with unchanged contracts.
- Critic may read affected implementation and test files to verify this relocation against unchanged contracts; it has no write or shell grant.
- Existing tests suffice; no new tests for directory layout.
- Use bundled Node 24 for workflow tooling; host Node 25 fails its declared runtime range. No dependency changes.

## Activity
- Inspected reused and application concept layout and current imports.
- Moved nine modules and updated import paths, including two frontend consumers.
- Validation passed: backend/spec/artifact/TypeScript and Vue checks, 88 tests (590 assertions), frontend production build, and git diff --check. Existing 30 framework advisories and SDK browser-externalization warnings remain.
- Compared 24 affected files against captured pre-task working copies; only relative module specifiers differ.
- Independent critic /root/concept_folder_review approved with no findings; no simulated roles. All runs finalized and work finish passed. Done When outcomes reconciled against the unchanged assembly/imports and passing generated-artifact check; no public interface changes.
