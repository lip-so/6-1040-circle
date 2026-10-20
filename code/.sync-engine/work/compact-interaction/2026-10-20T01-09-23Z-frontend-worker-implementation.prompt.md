# Role and objective

Continue work unit `compact-interaction`; role `frontend-worker`; phase `implementation`. The prior same-phase role contract remains authoritative.

# Access

This grant replaces prior access; other rules remain.

Current grant:

```json
{"readableAreas":[{"area":"application","path":"frontend/src"},{"area":"application","path":"generated/wire.ts"},{"area":"application","path":"src/memory-fields.ts"}],"writableAreas":[{"area":"owned-configuration","path":"frontend/node_modules/.tmp"},{"area":"owned-frontend","path":"frontend/src/App.vue"},{"area":"owned-frontend","path":"frontend/src/assets/articulated/motion.d.ts"},{"area":"owned-frontend","path":"frontend/src/reusable"},{"area":"owned-frontend","path":"frontend/src/style.css"}],"toolKinds":["repository-read","repository-write"],"projectShell":"project-validation","network":false,"generatedOutput":false,"longRunningProcesses":false}
```

# Guidance

Unchanged from the prior same-agent context. Apply it to the task and changed context below.

# Context

## Task

**.sync-engine/work/compact-interaction/cards-task.md**

Continue the same frontend role with latest two explicit user refinements. People cards should feel like a supplied reference: a vertical, softly rounded contact card, soft colored header above a white body with clear rows. Reference had an avatar and About/Bio/Contact tabs, but user explicitly says NO profile photo; do NOT add tabs or invent titles/social links. Use Circle's blue/dusty-blue/coral/vermilion/ivory palette as a restrained header gradient/accent. A name and existing edit icon are enough in the header. Keep guided summary rows vs free-form original text behavior exactly as implemented, all content/full-note access and edit controls. Arrange compact vertical cards in a responsive grid if useful; avoid a large flat full-width row, but also avoid huge empty cards. No fake profile data or new product metadata. Use existing Contact only when recorded. Retain recent Load more, errors/empty states and ownership.
Second refinement: illustration MUST fade out into the page before Looking for instead of being abruptly cut by that section. Add a soft bottom mask/fade to the SVG scene/art layer (with WebKit support), not the interactive pause control. The background may extend behind the form but cannot obstruct data/actions. Preserve the articulated figures/hand-wave triggers, fixed shapes and pause/reduced-motion/visibility cleanup. Both working headings stay absent. Handlee font remains.
You have enough visual description; do not read the screenshot outside the grant. Edit only App/style/reusable in existing grant. Do not touch renderer data/assets/backend/design/tests or add dependencies. Run existing typecheck/build commands, return Status Complete/Blocked with changed areas and checks. Browser check remains coordinator-owned.

## Brief

**.sync-engine/work/compact-interaction/brief.md**

Unchanged from the prior same-agent context.

## Assembled public interface

**.sync-engine/work/compact-interaction/interface.md**

Unchanged from the prior same-agent context.

## Frontend starting paths

**.sync-engine/work/compact-interaction/frontend-paths.md**

frontend/src/App.vue; frontend/src/style.css; frontend/src/reusable/; existing voice.ts, recent-people.ts, request-scope.ts and memory-summary.ts; ../src/memory-fields.ts is supplied as a read grant at application:src/memory-fields.ts. Runtime artwork frontend/src/assets/circle/connection-collage.png; font assets remain coordinator-owned. Validation scripts supplied in task.

# Result

Unless the task requests another format, use these prior fields: `## Status`, `## Changed`, `## Checks`, `## Blockers`, `## Concerns` (optional).
