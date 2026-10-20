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

**.sync-engine/work/compact-interaction/coherent-dancers-task.md**

Latest user feedback: the articulated raster rigs look like broken creatures. Replace the failing atlas/skeleton visual with coherent flowing Matisse-inspired cut-paper dancers whose limbs stay attached and silhouettes stay anatomical throughout animation. The user wants a loose asymmetric dance, not standing mannequins or whole-picture drift. Use native SVG continuous organic silhouettes for this animated graphic (code-native shapes are needed for smooth coherent articulation). Do not use the raster atlas renderer anymore. Do not make stick figures or joints/circles resembling a robot. Keep a single continuous head/neck/torso silhouette per person and smooth tapered arms/legs that overlap at shoulders/hips and bend continuously; no visible joint gaps or distorted stitched images. A clean flat ultramarine cut-paper treatment is preferable to broken texture. Both figures should feel like flowing dancers with one lifted/bent knee, torso leaning, open/reaching arms; move limbs gently and independently while fixed background circles/lines stay still. Main mode/mic/submit interaction still adds a clear hand wave for a couple seconds. Use finite typed geometry/interpolated smooth path shapes, or small overlapping same-color SVG limb groups with organic path contours; preserve attached anatomy in all poses. Keep the scene low contrast behind the centered form and existing smooth bottom mask/fade. Pause/reduced-motion/visibility/offscreen cleanup must still work. No animated whole image. No photo circles. Remove unused raster-articulated imports; avoid modifying original source assets.
Also implement the latest explicit action request: each suggestion has Useful / Dismiss / Remove as SVG icon buttons beside the suggestion name (thumbs-up, X, bin). Context-specific aria-labels and title hints; keep current handlers/semantics, 44px targets. Remove the visible text action row. All completed vertical colored contact cards, source-appropriate note display, compact centered forms, no visible working headings, Handlee font, mic/save equality and four-row searches remain.
Edit within the existing granted App/style/reusable paths. No backend/design/assets bytes/dependency/test edits. Run the supplied frontend typecheck/build. Inspect your SVG path geometry for intact limbs over its full parameter ranges, not just the rest frame. Return Status Complete/Blocked; coordinator will visually inspect desktop/phone and animation transforms. Do not claim bitmap original artwork or live provider validation.

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
