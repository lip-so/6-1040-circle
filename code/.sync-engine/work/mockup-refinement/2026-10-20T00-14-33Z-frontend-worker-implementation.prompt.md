# Role and objective

Work unit `mockup-refinement`; role `frontend-worker`; phase `implementation`.

# Frontend worker

Implement and test the assigned client surface against the assembled public endpoint contract. Keep backend design, policy, and production source read-only unless the task explicitly expands ownership.

Use the typed client rather than importing concepts or bypassing validation and authorization. Keep authoritative facts behind endpoints. Report a design blocker for missing public behavior, a context blocker for a missing interface or reference, or an environment blocker when checks cannot run.

# Access

Root: "/private/tmp/circle-mockup-refinement/code". The short native message explicitly authorizes reading this prompt file; all assignment context is inline below. This is already a compiled role assignment: do not load a skill, workflow, harness guide, or another instruction file.

- Read: `application:frontend/src` ("/private/tmp/circle-mockup-refinement/code/frontend/src"), `application:generated/wire.ts` ("/private/tmp/circle-mockup-refinement/code/generated/wire.ts").
- Write: `owned-configuration:frontend/node_modules/.tmp` ("/private/tmp/circle-mockup-refinement/code/frontend/node_modules/.tmp"), `owned-frontend:frontend/src` ("/private/tmp/circle-mockup-refinement/code/frontend/src").
- Tools: `repository-read`, `repository-write`.
- Shell: `project-validation`; network: no; generated output: no; long-running processes: no.

Inspect only listed files or directories. In coordinator simulation, this grant binds the coordinator itself; broader coordinator access and prior discovery are unavailable to the assignment. Project checks may transitively read other project files, but do not inspect them yourself. Use supplied or task-named package-owned public documentation; do not browse package trees. Never inspect package `dist`, framework internals, caches, sibling applications, or undeclared declarations. Exclude `.git`, `.sync-engine` except this prompt, harness/skill configuration, agent traces, parent directories, and unrelated generated output. Ask for context instead of searching outside the grant. Generated files come only from granted commands. Never grantable: `git-mutation`, `dependency-installation`, `framework-internals`, `workflow-management`, `skill-cli-invocation`, `delegation-or-handoff`.

# Guidance

# Framework use

Implement from supplied public references, named package-owned public documentation or examples, generated caller contracts, and ordinary project diagnostics. Do not browse package trees for alternatives.

Never inspect package `dist`, framework internals, runtime exports, caches, sibling applications, or declarations not explicitly supplied as public context. Never import from `node_modules/` or `dist/` paths. A diagnostic may name an internal file; use the diagnostic without opening it.

Repair ordinary diagnostics through the project checks. When supplied material does not determine the next API shape, try at most one directly supported repair, then report a context or design blocker instead of trying speculative variants.

---

# Frontend implementation

Use the generated typed endpoint client. Do not call raw `fetch`, import backend concepts or composition, or bypass validation and authorization. Treat endpoint results as success-or-error unions; distinguish declared refusals from transport faults, timeout, and cancellation.

Keep authoritative facts and policy behind endpoints. Test the requested success and refusal paths plus material loading, empty, and transport-failure states.

# Context

## Task

**.sync-engine/work/mockup-refinement/frontend-task.md**

Implement the typography/visual correction in the brief. Own frontend/src only, including runtime assets and cleanup. Read current App/style and reusable components; behavior must remain intact. Use the real supplied MadInk and Urbanist from assets/fonts, and connection-collage.png prominently. The user rejected the small mannequin treatment and sans-serif-only headings. Aim for the screenshot's large flowing figures, warm paper, thin connecting arcs, red/blue circular collage, expansive split composition; translate it to actual working forms rather than making fake marketing/navigation. Headings should show MadInk without clipping its expressive shapes; body/data stays Urbanist. No added slogans/repeated prose. Existing API event logic stays untouched. Can replace/remove CircleFigure and its now-unused runtime rig/atlases; original design-docs assets are not in your grant. Keep original font zip files and included license content untouched. If using motion, retain accessible pause/reduced-motion/visibility handling; static art is valid. Run from application cwd: `bun run --cwd frontend typecheck`; `bun run --cwd frontend build -- --outDir /private/tmp/circle-mockup-preview-dist`. No dependencies or new tests. Build output outside application avoids write-grant noise. Do not edit coordinator artifacts. Return Status: Complete or Status: Blocked with changes/checks/limitations.

## Brief

**.sync-engine/work/mockup-refinement/brief.md**

# Correct the typography and use the supplied mockup composition

## Goal
Use Sofia's downloaded MadInk/Urbanist fonts and follow the screenshot's larger, flowing figures, connected curves, layered circles and warm paper composition.

## Scope
Presentation only. Preserve current P3 Remember/Find, auth, drafts, save/voice, search and note lifecycle, evidence and account scopes. No new product features, fake user records, provider calls, navigation promises, backend/design/wire/dependency changes or publication. Do not edit Sofia's desing-journal.md.

## Requirements
Supplied zip files actually live at frontend/fonts/. Extracted exact fonts and included licenses are pre-copied to frontend/src/assets/fonts/. Use MadInk regular for expressive headings/wordmark and Urbanist variable for body, labels, controls and detailed data. Preserve font licenses (MadInk archive says Demo for Personal Use); this task is local implementation, not licensing interpretation or deployment. The screenshot's heading happens to look serif, but explicit downloaded study fonts determine the requested pairing.

A built-in image-generation edit has reconstructed the screenshot's decorative right-hand collage without screenshot UI, text or sample-note annotations, on transparent alpha. It is at frontend/src/assets/circle/connection-collage.png. Use this actual asset prominently: spacious left content, sweeping blue cut-paper figures and circular campus/photo vignettes on the right, cream paper and warm red actions. The signed-out view may be a broad editorial split hero; signed-in screens should echo it without obstructing fields or burying lifecycle controls. Use actual existing product actions, not invented About/For students/Try Circle pages. Do not use the entire screenshot as UI. Background texture can be subtle CSS. Keep phone layouts usable; art stays decorative, out of the accessibility tree, does not cover actions, and should fit/crop intentionally.

Replace the small articulated mannequin treatment. Optional restrained drift must have pause control, reduced-motion behavior and hidden/offscreen suspension/cleanup; static artwork is acceptable. Avoid excessive slogans and repeated explanations. Remove unused runtime copies/components from previous figure implementation if replaced; never alter original design-docs artwork, user font zip archives, backend or tests. No new cosmetic tests.

## Done when
- Downloaded MadInk loads for headings/brand and downloaded Urbanist loads for text/controls, retaining both license files.
- The transparent collage appears as a substantial composition based on the screenshot, across sign-in and current working views, without fake content or blocked controls.
- Desktop/tablet/phone layouts, focus and draft/save/evidence controls are usable. Relevant existing UI tests, Vue typecheck and build pass; browser validation uses disposable simulated responses.
- Reviewed frontend/asset changes are applied to the actual checkout with hash guards; agent notes are appended only to agent-journal.md.

## Active decisions
- Accepted P3 canonical design remains unchanged. Continue directly to frontend implementation, with independent scoped review of contract preservation and visuals.
- Staging copy avoids restricted writes and preserves concurrent edits; no dependency versions changed. Tooling uses bundled Node 24.
- Imagegen skill used to edit the user screenshot into a transparent art-only asset. This is reconstructed artwork, not a claim that the exact original layered source was supplied. Original screenshot and original generated file remain intact.
- Native Codex delegation; supplied fonts/licenses are read-only inputs. User said code/design/fonts, but file discovery found code/frontend/fonts.

## Activity
- Inspected current frontend, visual study, screenshot and font archives. Supplied assets are staged before role preparation.

## Assembled public interface

**generated/wire.ts**

// Generated by @mit-sdg/sync-engine@1.1.0 from the Circle assembly. Do not edit.
// Projectors: @mit-sdg/sync-engine-http@1.1.0.

import type { applicationConceptSet as ApplicationConceptSet } from "../src/concepts.ts";

type AtPath<T, P extends readonly string[]> = P extends readonly [infer H extends string, ...infer R extends string[]] ? H extends keyof T ? AtPath<T[H], R> : H extends `${number}` ? T extends readonly (infer Item)[] ? AtPath<Item, R> : never : never : T;
type QueryRow<T> = T extends readonly (infer Row)[] ? Row : T;
type AllOf<T extends readonly unknown[]> = T extends readonly [infer Head, ...infer Rest] ? Head & AllOf<Rest> : unknown;
type OneOf<T extends readonly unknown[]> = T[number];
type Jsonify<T> = T extends Date ? string : T extends null | boolean | number | string ? T : T extends (...args: never[]) => unknown ? never : T extends readonly (infer Item)[] ? Jsonify<Item>[] : T extends object ? { [K in keyof T]: Jsonify<T[K]> } : never;

export type Json = null | boolean | number | string | Json[] | { [key: string]: Json };

export type AppWideError = never;

export type CircleWire = {
  "/auth/commons/choose": {
    input: {
      "attempt": Jsonify<OneOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["CommonsFederating"]["_linkable"]>[0], ["attempt"]>, AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["CommonsFederating"]["link"]>[0], ["attempt"]>]>>;
      "username": Jsonify<AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Registering"]["register"]>[0], ["username"]>>;
    };
    output: {
      "expiresAt": Jsonify<AtPath<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Sessioning"]["start"]>>, ["expiresAt"]>>;
      "session": Jsonify<AtPath<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Sessioning"]["start"]>>, ["session"]>>;
      "user": Jsonify<AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Sessioning"]["start"]>[0], ["subject"]>>;
    };
    error: { error: AppWideError | "ALREADY_LINKED" | "INVALID_INPUT" | "INVALID_USERNAME" | "NOT_CONFIRMED" | "SIGN_IN_EXPIRED" | "USERNAME_TAKEN" };
  };
  "/auth/commons/finish": {
    input: {
      "attempt": Jsonify<AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["CommonsFederating"]["finish"]>[0], ["attempt"]>>;
      "code": Jsonify<AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["CommonsFederating"]["finish"]>[0], ["code"]>>;
      "state": Jsonify<AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["CommonsFederating"]["finish"]>[0], ["nonce"]>>;
    };
    output: {
      "expiresAt": Jsonify<AtPath<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Sessioning"]["start"]>>, ["expiresAt"]>>;
      "session": Jsonify<AtPath<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Sessioning"]["start"]>>, ["session"]>>;
      "user": Jsonify<AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Sessioning"]["start"]>[0], ["subject"]>>;
    } | {
      "expiresAt": Jsonify<AtPath<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Sessioning"]["start"]>>, ["expiresAt"]>>;
      "session": Jsonify<AtPath<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Sessioning"]["start"]>>, ["session"]>>;
      "user": Jsonify<AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Sessioning"]["start"]>[0], ["subject"]>>;
    };
    error: { error: AppWideError | "ALREADY_LINKED" | "INVALID_INPUT" | "INVALID_USERNAME" | "NOT_CONFIRMED" | "SIGN_IN_EXPIRED" | "SIGN_IN_REFUSED" | "USERNAME_TAKEN" };
  };
  "/auth/commons/start": {
    input: Record<string, never>;
    output: {
      "address": Jsonify<AtPath<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["CommonsFederating"]["start"]>>, ["address"]>>;
      "attempt": Jsonify<AtPath<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["CommonsFederating"]["start"]>>, ["attempt"]>>;
      "expiresAt": Jsonify<AtPath<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["CommonsFederating"]["start"]>>, ["expiresAt"]>>;
    };
    error: { error: AppWideError };
  };
  "/auth/logout": {
    input: {
      "session": Jsonify<AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Sessioning"]["end"]>[0], ["session"]>>;
    };
    output: Record<string, never>;
    error: { error: AppWideError | "INVALID_INPUT" | "NOT_SIGNED_IN" };
  };
  "/auth/me": {
    input: {
      "session": Jsonify<AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Sessioning"]["use"]>[0], ["session"]>>;
    };
    output: {
      "username": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Registering"]["_username"]>>>, ["username"]>>;
    };
    error: { error: AppWideError | "INVALID_INPUT" | "NOT_SIGNED_IN" };
  };
  "/capture/transcribe": {
    input: {
      "audio": Jsonify<AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Remembering"]["transcribe"]>[0], ["audio"]>>;
      "mediaType": Jsonify<AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Remembering"]["transcribe"]>[0], ["mediaType"]>>;
      "session": Jsonify<AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Sessioning"]["use"]>[0], ["session"]>>;
    };
    output: {
      "content": Jsonify<AtPath<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Remembering"]["transcribe"]>>, ["content"]>>;
    };
    error: { error: AppWideError | "INVALID_AUDIO" | "INVALID_INPUT" | "NOT_SIGNED_IN" };
  };
  "/claims/reject": {
    input: {
      "claim": Jsonify<AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Graphing"]["reject"]>[0], ["claim"]>>;
      "session": Jsonify<AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Sessioning"]["use"]>[0], ["session"]>>;
    };
    output: {
      "suggestions": {
        "connection": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["connection"]>>;
        "content": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>>>, ["content"]>>;
        "description": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>[0], ["description"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Seeking"]["_active"]>>>, ["description"]>]>>;
        "evidence": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Graphing"]["_members"]>[0], ["evidence"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["evidence"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["evidence"]>]>>;
        "gaps": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["gaps"]>>;
        "label": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["label"]>>;
        "need": Jsonify<AllOf<[AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["need"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Seeking"]["_active"]>>>, ["need"]>]>>;
        "reason": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["reason"]>>;
        "source": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>[0], ["memory"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["source"]>]>>;
        "sources": {
          "claim": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Graphing"]["_evidence"]>[0], ["claim"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_members"]>>>, ["claim"]>]>>;
          "content": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.computations)["sourceDigest"]["fn"]>[0], ["content"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>>>, ["content"]>]>>;
          "quote": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_evidence"]>>>, ["quote"]>>;
          "source": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>[0], ["memory"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_evidence"]>>>, ["source"]>]>>;
        }[];
        "target": Jsonify<AllOf<[AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["target"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["target"]>]>>;
      }[];
    };
    error: { error: AppWideError | "CLAIM_REJECTION_UNAVAILABLE" | "EMPTY_EVIDENCE" | "EMPTY_REASON" | "INVALID_INPUT" | "NOT_SIGNED_IN" };
  };
  "/claims/remove": {
    input: {
      "claim": Jsonify<AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Graphing"]["remove"]>[0], ["claim"]>>;
      "session": Jsonify<AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Sessioning"]["use"]>[0], ["session"]>>;
    };
    output: {
      "suggestions": {
        "connection": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["connection"]>>;
        "content": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>>>, ["content"]>>;
        "description": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>[0], ["description"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Seeking"]["_active"]>>>, ["description"]>]>>;
        "evidence": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Graphing"]["_members"]>[0], ["evidence"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["evidence"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["evidence"]>]>>;
        "gaps": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["gaps"]>>;
        "label": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["label"]>>;
        "need": Jsonify<AllOf<[AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["need"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Seeking"]["_active"]>>>, ["need"]>]>>;
        "reason": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["reason"]>>;
        "source": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>[0], ["memory"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["source"]>]>>;
        "sources": {
          "claim": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Graphing"]["_evidence"]>[0], ["claim"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_members"]>>>, ["claim"]>]>>;
          "content": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.computations)["sourceDigest"]["fn"]>[0], ["content"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>>>, ["content"]>]>>;
          "quote": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_evidence"]>>>, ["quote"]>>;
          "source": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>[0], ["memory"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_evidence"]>>>, ["source"]>]>>;
        }[];
        "target": Jsonify<AllOf<[AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["target"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["target"]>]>>;
      }[];
    };
    error: { error: AppWideError | "EMPTY_EVIDENCE" | "EMPTY_REASON" | "INVALID_INPUT" | "NOT_SIGNED_IN" };
  };
  "/claims/restore": {
    input: {
      "claim": Jsonify<AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Graphing"]["restore"]>[0], ["claim"]>>;
      "session": Jsonify<AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Sessioning"]["use"]>[0], ["session"]>>;
    };
    output: {
      "suggestions": {
        "connection": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["connection"]>>;
        "content": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>>>, ["content"]>>;
        "description": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>[0], ["description"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Seeking"]["_active"]>>>, ["description"]>]>>;
        "evidence": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Graphing"]["_members"]>[0], ["evidence"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["evidence"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["evidence"]>]>>;
        "gaps": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["gaps"]>>;
        "label": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["label"]>>;
        "need": Jsonify<AllOf<[AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["need"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Seeking"]["_active"]>>>, ["need"]>]>>;
        "reason": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["reason"]>>;
        "source": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>[0], ["memory"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["source"]>]>>;
        "sources": {
          "claim": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Graphing"]["_evidence"]>[0], ["claim"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_members"]>>>, ["claim"]>]>>;
          "content": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.computations)["sourceDigest"]["fn"]>[0], ["content"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>>>, ["content"]>]>>;
          "quote": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_evidence"]>>>, ["quote"]>>;
          "source": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>[0], ["memory"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_evidence"]>>>, ["source"]>]>>;
        }[];
        "target": Jsonify<AllOf<[AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["target"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["target"]>]>>;
      }[];
    };
    error: { error: AppWideError | "CLAIM_RESTORE_UNAVAILABLE" | "EMPTY_EVIDENCE" | "EMPTY_REASON" | "INVALID_INPUT" | "NOT_SIGNED_IN" };
  };
  "/memories/forget": {
    input: {
      "memory": Jsonify<AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Remembering"]["forget"]>[0], ["memory"]>>;
      "session": Jsonify<AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Sessioning"]["use"]>[0], ["session"]>>;
    };
    output: {
      "deleted": true;
    };
    error: { error: AppWideError | "EMPTY_EVIDENCE" | "EMPTY_REASON" | "FORGET_NOT_OWNED" | "INVALID_INPUT" | "NOT_SIGNED_IN" | "RETRACT_NOT_OWNED" };
  };
  "/memories/get": {
    input: {
      "memory": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Graphing"]["_claims"]>[0], ["source"]>, AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Graphing"]["_source"]>[0], ["source"]>, AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>[0], ["memory"]>]>>;
      "session": Jsonify<AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Sessioning"]["use"]>[0], ["session"]>>;
    };
    output: {
      "memory": {
        "claims": {
          "claim": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_claims"]>>>, ["claim"]>>;
          "fromLabel": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_claims"]>>>, ["fromLabel"]>>;
          "quote": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_claims"]>>>, ["quote"]>>;
          "relation": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_claims"]>>>, ["relation"]>>;
          "toLabel": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_claims"]>>>, ["toLabel"]>>;
          "usable": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_claims"]>>>, ["usable"]>>;
        }[];
        "content": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>>>, ["content"]>>;
        "memory": Jsonify<AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>[0], ["memory"]>>;
      };
    };
    error: { error: AppWideError | "INVALID_INPUT" | "NOT_FOUND" | "NOT_SIGNED_IN" };
  };
  "/memories/list": {
    input: {
      "after": Jsonify<AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Remembering"]["_list"]>[0], ["after"]>>;
      "session": Jsonify<AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Sessioning"]["use"]>[0], ["session"]>>;
    };
    output: {
      "memories": {
        "content": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Remembering"]["_list"]>>>, ["content"]>>;
        "memory": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Remembering"]["_list"]>>>, ["memory"]>>;
      }[];
    };
    error: { error: AppWideError | "INVALID_INPUT" | "NOT_SIGNED_IN" };
  };
  "/memories/reindex": {
    input: {
      "memory": Jsonify<AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Remembering"]["_record"]>[0], ["memory"]>>;
      "session": Jsonify<AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Sessioning"]["use"]>[0], ["session"]>>;
    };
    output: {
      "memory": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Graphing"]["ingest"]>[0], ["source"]>, AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Remembering"]["_record"]>[0], ["memory"]>]>>;
    } | {
      "memory": Jsonify<AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Remembering"]["_record"]>[0], ["memory"]>>;
    };
    error: { error: AppWideError | "EMPTY_EVIDENCE" | "EMPTY_REASON" | "EMPTY_SOURCE_CONTENT" | "INVALID_INPUT" | "NOT_FOUND" | "NOT_SIGNED_IN" | "SOURCE_NOT_OWNED" | "SOURCE_RETRACTED" | "STALE_SOURCE_REVISION" };
  };
  "/memories/remember": {
    input: {
      "content": Jsonify<AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Remembering"]["remember"]>[0], ["content"]>>;
      "session": Jsonify<AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Sessioning"]["use"]>[0], ["session"]>>;
      "submission": Jsonify<AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Remembering"]["remember"]>[0], ["submission"]>>;
    };
    output: {
      "memory": Jsonify<AtPath<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Remembering"]["remember"]>>, ["memory"]>>;
    };
    error: { error: AppWideError | "EMPTY_CONTENT" | "EMPTY_EVIDENCE" | "EMPTY_REASON" | "EMPTY_SOURCE_CONTENT" | "INVALID_INPUT" | "NOT_SIGNED_IN" | "SOURCE_NOT_OWNED" | "SOURCE_RETRACTED" | "STALE_SOURCE_REVISION" | "SUBMISSION_CONFLICT" | "SUBMISSION_FORGOTTEN" };
  };
  "/memories/revise": {
    input: {
      "content": Jsonify<AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Remembering"]["revise"]>[0], ["content"]>>;
      "memory": Jsonify<AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Remembering"]["revise"]>[0], ["memory"]>>;
      "session": Jsonify<AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Sessioning"]["use"]>[0], ["session"]>>;
    };
    output: {
      "memory": Jsonify<AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Remembering"]["revise"]>[0], ["memory"]>>;
    };
    error: { error: AppWideError | "EMPTY_EVIDENCE" | "EMPTY_REASON" | "EMPTY_REVISION" | "EMPTY_SOURCE_CONTENT" | "INVALID_INPUT" | "NOT_SIGNED_IN" | "REVISION_UNAVAILABLE" | "SOURCE_NOT_OWNED" | "SOURCE_RETRACTED" | "STALE_SOURCE_REVISION" };
  };
  "/needs/delete": {
    input: {
      "need": Jsonify<AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Seeking"]["delete"]>[0], ["need"]>>;
      "session": Jsonify<AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Sessioning"]["use"]>[0], ["session"]>>;
    };
    output: {
      "deleted": true;
    };
    error: { error: AppWideError | "INVALID_INPUT" | "NOT_SIGNED_IN" };
  };
  "/needs/list": {
    input: {
      "session": Jsonify<AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Sessioning"]["use"]>[0], ["session"]>>;
    };
    output: {
      "needs": {
        "active": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Seeking"]["_list"]>>>, ["active"]>>;
        "description": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Seeking"]["_list"]>>>, ["description"]>>;
        "need": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Seeking"]["_list"]>>>, ["need"]>>;
      }[];
    };
    error: { error: AppWideError | "INVALID_INPUT" | "NOT_SIGNED_IN" };
  };
  "/needs/reopen": {
    input: {
      "need": Jsonify<AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Seeking"]["reopen"]>[0], ["need"]>>;
      "session": Jsonify<AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Sessioning"]["use"]>[0], ["session"]>>;
    };
    output: {
      "results": {
        "active": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Seeking"]["_record"]>>>, ["active"]>>;
        "description": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Seeking"]["_record"]>>>, ["description"]>>;
        "need": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Seeking"]["reopen"]>[0], ["need"]>, AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Seeking"]["_record"]>[0], ["need"]>]>>;
        "suggestions": {
          "connection": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["connection"]>>;
          "content": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>>>, ["content"]>>;
          "evidence": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Graphing"]["_members"]>[0], ["evidence"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["evidence"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["evidence"]>]>>;
          "gaps": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["gaps"]>>;
          "label": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["label"]>>;
          "reason": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["reason"]>>;
          "source": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>[0], ["memory"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["source"]>]>>;
          "sources": {
            "claim": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Graphing"]["_evidence"]>[0], ["claim"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_members"]>>>, ["claim"]>]>>;
            "content": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.computations)["sourceDigest"]["fn"]>[0], ["content"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>>>, ["content"]>]>>;
            "quote": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_evidence"]>>>, ["quote"]>>;
            "source": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>[0], ["memory"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_evidence"]>>>, ["source"]>]>>;
          }[];
          "target": Jsonify<AllOf<[AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["target"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["target"]>]>>;
        }[];
      };
    };
    error: { error: AppWideError | "EMPTY_EVIDENCE" | "EMPTY_REASON" | "INVALID_INPUT" | "NEED_REOPEN_UNAVAILABLE" | "NOT_SIGNED_IN" };
  };
  "/needs/resolve": {
    input: {
      "need": Jsonify<AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Seeking"]["resolve"]>[0], ["need"]>>;
      "session": Jsonify<AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Sessioning"]["use"]>[0], ["session"]>>;
    };
    output: {
      "results": {
        "active": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Seeking"]["_record"]>>>, ["active"]>>;
        "description": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Seeking"]["_record"]>>>, ["description"]>>;
        "need": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Seeking"]["resolve"]>[0], ["need"]>, AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Seeking"]["_record"]>[0], ["need"]>]>>;
        "suggestions": {
          "connection": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["connection"]>>;
          "content": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>>>, ["content"]>>;
          "evidence": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Graphing"]["_members"]>[0], ["evidence"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["evidence"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["evidence"]>]>>;
          "gaps": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["gaps"]>>;
          "label": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["label"]>>;
          "reason": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["reason"]>>;
          "source": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>[0], ["memory"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["source"]>]>>;
          "sources": {
            "claim": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Graphing"]["_evidence"]>[0], ["claim"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_members"]>>>, ["claim"]>]>>;
            "content": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.computations)["sourceDigest"]["fn"]>[0], ["content"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>>>, ["content"]>]>>;
            "quote": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_evidence"]>>>, ["quote"]>>;
            "source": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>[0], ["memory"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_evidence"]>>>, ["source"]>]>>;
          }[];
          "target": Jsonify<AllOf<[AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["target"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["target"]>]>>;
        }[];
      };
    };
    error: { error: AppWideError | "INVALID_INPUT" | "NEED_RESOLUTION_UNAVAILABLE" | "NOT_SIGNED_IN" };
  };
  "/needs/revise": {
    input: {
      "description": Jsonify<AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Seeking"]["revise"]>[0], ["description"]>>;
      "need": Jsonify<AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Seeking"]["revise"]>[0], ["need"]>>;
      "session": Jsonify<AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Sessioning"]["use"]>[0], ["session"]>>;
    };
    output: {
      "results": {
        "active": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Seeking"]["_record"]>>>, ["active"]>>;
        "description": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Seeking"]["_record"]>>>, ["description"]>>;
        "need": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Seeking"]["revise"]>[0], ["need"]>, AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Seeking"]["_record"]>[0], ["need"]>]>>;
        "suggestions": {
          "connection": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["connection"]>>;
          "content": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>>>, ["content"]>>;
          "evidence": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Graphing"]["_members"]>[0], ["evidence"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["evidence"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["evidence"]>]>>;
          "gaps": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["gaps"]>>;
          "label": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["label"]>>;
          "reason": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["reason"]>>;
          "source": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>[0], ["memory"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["source"]>]>>;
          "sources": {
            "claim": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Graphing"]["_evidence"]>[0], ["claim"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_members"]>>>, ["claim"]>]>>;
            "content": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.computations)["sourceDigest"]["fn"]>[0], ["content"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>>>, ["content"]>]>>;
            "quote": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_evidence"]>>>, ["quote"]>>;
            "source": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>[0], ["memory"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_evidence"]>>>, ["source"]>]>>;
          }[];
          "target": Jsonify<AllOf<[AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["target"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["target"]>]>>;
        }[];
      };
    };
    error: { error: AppWideError | "EMPTY_EVIDENCE" | "EMPTY_NEED_REVISION" | "EMPTY_REASON" | "INVALID_INPUT" | "NEED_REVISION_INACTIVE" | "NEED_REVISION_UNAVAILABLE" | "NOT_SIGNED_IN" };
  };
  "/needs/seek": {
    input: {
      "description": Jsonify<AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Seeking"]["seek"]>[0], ["description"]>>;
      "session": Jsonify<AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Sessioning"]["use"]>[0], ["session"]>>;
    };
    output: {
      "results": {
        "active": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Seeking"]["_record"]>>>, ["active"]>>;
        "description": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Seeking"]["_record"]>>>, ["description"]>>;
        "need": Jsonify<AllOf<[AtPath<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Seeking"]["seek"]>>, ["need"]>, AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Seeking"]["_record"]>[0], ["need"]>]>>;
        "suggestions": {
          "connection": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["connection"]>>;
          "content": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>>>, ["content"]>>;
          "evidence": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Graphing"]["_members"]>[0], ["evidence"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["evidence"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["evidence"]>]>>;
          "gaps": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["gaps"]>>;
          "label": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["label"]>>;
          "reason": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["reason"]>>;
          "source": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>[0], ["memory"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["source"]>]>>;
          "sources": {
            "claim": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Graphing"]["_evidence"]>[0], ["claim"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_members"]>>>, ["claim"]>]>>;
            "content": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.computations)["sourceDigest"]["fn"]>[0], ["content"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>>>, ["content"]>]>>;
            "quote": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_evidence"]>>>, ["quote"]>>;
            "source": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>[0], ["memory"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_evidence"]>>>, ["source"]>]>>;
          }[];
          "target": Jsonify<AllOf<[AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["target"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["target"]>]>>;
        }[];
      };
    };
    error: { error: AppWideError | "EMPTY_DESCRIPTION" | "EMPTY_EVIDENCE" | "EMPTY_REASON" | "INVALID_INPUT" | "NOT_SIGNED_IN" };
  };
  "/suggestions/dismiss": {
    input: {
      "connection": Jsonify<AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Connecting"]["dismiss"]>[0], ["connection"]>>;
      "session": Jsonify<AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Sessioning"]["use"]>[0], ["session"]>>;
    };
    output: {
      "suggestions": {
        "connection": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["connection"]>>;
        "content": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>>>, ["content"]>>;
        "description": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>[0], ["description"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Seeking"]["_active"]>>>, ["description"]>]>>;
        "evidence": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Graphing"]["_members"]>[0], ["evidence"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["evidence"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["evidence"]>]>>;
        "gaps": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["gaps"]>>;
        "label": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["label"]>>;
        "need": Jsonify<AllOf<[AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["need"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Seeking"]["_active"]>>>, ["need"]>]>>;
        "reason": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["reason"]>>;
        "source": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>[0], ["memory"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["source"]>]>>;
        "sources": {
          "claim": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Graphing"]["_evidence"]>[0], ["claim"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_members"]>>>, ["claim"]>]>>;
          "content": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.computations)["sourceDigest"]["fn"]>[0], ["content"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>>>, ["content"]>]>>;
          "quote": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_evidence"]>>>, ["quote"]>>;
          "source": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>[0], ["memory"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_evidence"]>>>, ["source"]>]>>;
        }[];
        "target": Jsonify<AllOf<[AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["target"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["target"]>]>>;
      }[];
    };
    error: { error: AppWideError | "DISMISS_HANDLED" | "DISMISS_INELIGIBLE" | "DISMISS_UNAVAILABLE" | "INVALID_INPUT" | "NOT_FOUND" | "NOT_SIGNED_IN" };
  };
  "/suggestions/inspect": {
    input: {
      "connection": Jsonify<AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Connecting"]["_get"]>[0], ["connection"]>>;
      "session": Jsonify<AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Sessioning"]["use"]>[0], ["session"]>>;
    };
    output: {
      "suggestion": {
        "connection": Jsonify<AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Connecting"]["_get"]>[0], ["connection"]>>;
        "content": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>>>, ["content"]>>;
        "description": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Seeking"]["_record"]>>>, ["description"]>>;
        "eligible": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_get"]>>>, ["eligible"]>>;
        "evidence": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Graphing"]["_members"]>[0], ["evidence"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_get"]>>>, ["evidence"]>]>>;
        "gaps": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_get"]>>>, ["gaps"]>>;
        "label": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["label"]>>;
        "need": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Seeking"]["_record"]>[0], ["need"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_get"]>>>, ["need"]>]>>;
        "reason": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_get"]>>>, ["reason"]>>;
        "source": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>[0], ["memory"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["source"]>]>>;
        "sources": {
          "claim": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Graphing"]["_evidence"]>[0], ["claim"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_members"]>>>, ["claim"]>]>>;
          "content": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.computations)["sourceDigest"]["fn"]>[0], ["content"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>>>, ["content"]>]>>;
          "quote": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_evidence"]>>>, ["quote"]>>;
          "source": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>[0], ["memory"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_evidence"]>>>, ["source"]>]>>;
        }[];
        "status": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_get"]>>>, ["status"]>>;
        "target": Jsonify<AllOf<[AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_get"]>>>, ["target"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["target"]>]>>;
      };
    };
    error: { error: AppWideError | "INVALID_INPUT" | "NOT_FOUND" | "NOT_SIGNED_IN" };
  };
  "/suggestions/list": {
    input: {
      "session": Jsonify<AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Sessioning"]["use"]>[0], ["session"]>>;
    };
    output: {
      "suggestions": {
        "connection": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["connection"]>>;
        "content": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>>>, ["content"]>>;
        "description": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>[0], ["description"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Seeking"]["_active"]>>>, ["description"]>]>>;
        "evidence": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Graphing"]["_members"]>[0], ["evidence"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["evidence"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["evidence"]>]>>;
        "gaps": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["gaps"]>>;
        "label": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["label"]>>;
        "need": Jsonify<AllOf<[AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["need"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Seeking"]["_active"]>>>, ["need"]>]>>;
        "reason": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["reason"]>>;
        "source": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>[0], ["memory"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["source"]>]>>;
        "sources": {
          "claim": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Graphing"]["_evidence"]>[0], ["claim"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_members"]>>>, ["claim"]>]>>;
          "content": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.computations)["sourceDigest"]["fn"]>[0], ["content"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>>>, ["content"]>]>>;
          "quote": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_evidence"]>>>, ["quote"]>>;
          "source": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>[0], ["memory"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_evidence"]>>>, ["source"]>]>>;
        }[];
        "target": Jsonify<AllOf<[AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["target"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["target"]>]>>;
      }[];
    };
    error: { error: AppWideError | "INVALID_INPUT" | "NOT_SIGNED_IN" };
  };
  "/suggestions/refresh": {
    input: {
      "session": Jsonify<AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Sessioning"]["use"]>[0], ["session"]>>;
    };
    output: {
      "suggestions": {
        "connection": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["connection"]>>;
        "content": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>>>, ["content"]>>;
        "description": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>[0], ["description"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Seeking"]["_active"]>>>, ["description"]>]>>;
        "evidence": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Graphing"]["_members"]>[0], ["evidence"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["evidence"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["evidence"]>]>>;
        "gaps": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["gaps"]>>;
        "label": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["label"]>>;
        "need": Jsonify<AllOf<[AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["need"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Seeking"]["_active"]>>>, ["need"]>]>>;
        "reason": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["reason"]>>;
        "source": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>[0], ["memory"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["source"]>]>>;
        "sources": {
          "claim": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Graphing"]["_evidence"]>[0], ["claim"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_members"]>>>, ["claim"]>]>>;
          "content": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.computations)["sourceDigest"]["fn"]>[0], ["content"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>>>, ["content"]>]>>;
          "quote": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_evidence"]>>>, ["quote"]>>;
          "source": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>[0], ["memory"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_evidence"]>>>, ["source"]>]>>;
        }[];
        "target": Jsonify<AllOf<[AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["target"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["target"]>]>>;
      }[];
    };
    error: { error: AppWideError | "EMPTY_EVIDENCE" | "EMPTY_REASON" | "INVALID_INPUT" | "NOT_SIGNED_IN" };
  };
  "/suggestions/remove": {
    input: {
      "connection": Jsonify<AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Connecting"]["remove"]>[0], ["connection"]>>;
      "session": Jsonify<AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Sessioning"]["use"]>[0], ["session"]>>;
    };
    output: {
      "suggestions": {
        "connection": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["connection"]>>;
        "content": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>>>, ["content"]>>;
        "description": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>[0], ["description"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Seeking"]["_active"]>>>, ["description"]>]>>;
        "evidence": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Graphing"]["_members"]>[0], ["evidence"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["evidence"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["evidence"]>]>>;
        "gaps": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["gaps"]>>;
        "label": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["label"]>>;
        "need": Jsonify<AllOf<[AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["need"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Seeking"]["_active"]>>>, ["need"]>]>>;
        "reason": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["reason"]>>;
        "source": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>[0], ["memory"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["source"]>]>>;
        "sources": {
          "claim": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Graphing"]["_evidence"]>[0], ["claim"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_members"]>>>, ["claim"]>]>>;
          "content": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.computations)["sourceDigest"]["fn"]>[0], ["content"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>>>, ["content"]>]>>;
          "quote": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_evidence"]>>>, ["quote"]>>;
          "source": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>[0], ["memory"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_evidence"]>>>, ["source"]>]>>;
        }[];
        "target": Jsonify<AllOf<[AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["target"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["target"]>]>>;
      }[];
    };
    error: { error: AppWideError | "INVALID_INPUT" | "NOT_SIGNED_IN" };
  };
  "/suggestions/use": {
    input: {
      "connection": Jsonify<AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Connecting"]["use"]>[0], ["connection"]>>;
      "session": Jsonify<AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Sessioning"]["use"]>[0], ["session"]>>;
    };
    output: {
      "suggestions": {
        "connection": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["connection"]>>;
        "content": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>>>, ["content"]>>;
        "description": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>[0], ["description"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Seeking"]["_active"]>>>, ["description"]>]>>;
        "evidence": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Graphing"]["_members"]>[0], ["evidence"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["evidence"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["evidence"]>]>>;
        "gaps": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["gaps"]>>;
        "label": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["label"]>>;
        "need": Jsonify<AllOf<[AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["need"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Seeking"]["_active"]>>>, ["need"]>]>>;
        "reason": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["reason"]>>;
        "source": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>[0], ["memory"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["source"]>]>>;
        "sources": {
          "claim": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Graphing"]["_evidence"]>[0], ["claim"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_members"]>>>, ["claim"]>]>>;
          "content": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.computations)["sourceDigest"]["fn"]>[0], ["content"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>>>, ["content"]>]>>;
          "quote": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_evidence"]>>>, ["quote"]>>;
          "source": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>[0], ["memory"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_evidence"]>>>, ["source"]>]>>;
        }[];
        "target": Jsonify<AllOf<[AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["target"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["target"]>]>>;
      }[];
    };
    error: { error: AppWideError | "INVALID_INPUT" | "NOT_FOUND" | "NOT_SIGNED_IN" | "USE_HANDLED" | "USE_INELIGIBLE" | "USE_UNAVAILABLE" };
  };
};

export type HttpAppWideError = never;

export type CircleWireHttp = {
  "/auth/commons/choose": {
    input: {
      "username": Jsonify<AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Registering"]["register"]>[0], ["username"]>>;
    };
    output: {
      "user": Jsonify<AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Sessioning"]["start"]>[0], ["subject"]>>;
    };
    error: { error: HttpAppWideError | "CONFLICT" | "FORBIDDEN" | "INVALID_REQUEST" };
  };
  "/auth/commons/finish": {
    input: {
      "code": Jsonify<AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["CommonsFederating"]["finish"]>[0], ["code"]>>;
      "state": Jsonify<AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["CommonsFederating"]["finish"]>[0], ["nonce"]>>;
    };
    output: {
      "user": Jsonify<AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Sessioning"]["start"]>[0], ["subject"]>>;
    } | {
      "user": Jsonify<AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Sessioning"]["start"]>[0], ["subject"]>>;
    };
    error: { error: HttpAppWideError | "CONFLICT" | "FORBIDDEN" | "INVALID_REQUEST" };
  };
  "/auth/commons/start": {
    input: Record<string, never>;
    output: {
      "address": Jsonify<AtPath<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["CommonsFederating"]["start"]>>, ["address"]>>;
    };
    error: { error: HttpAppWideError };
  };
  "/auth/logout": {
    input: Record<string, never>;
    output: Record<string, never>;
    error: { error: HttpAppWideError | "INVALID_REQUEST" | "UNAUTHORIZED" };
  };
  "/auth/me": {
    input: Record<string, never>;
    output: {
      "username": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Registering"]["_username"]>>>, ["username"]>>;
    };
    error: { error: HttpAppWideError | "INVALID_REQUEST" | "UNAUTHORIZED" };
  };
  "/capture/transcribe": {
    input: {
      "audio": Jsonify<AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Remembering"]["transcribe"]>[0], ["audio"]>>;
      "mediaType": Jsonify<AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Remembering"]["transcribe"]>[0], ["mediaType"]>>;
    };
    output: {
      "content": Jsonify<AtPath<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Remembering"]["transcribe"]>>, ["content"]>>;
    };
    error: { error: HttpAppWideError | "INVALID_REQUEST" | "UNAUTHORIZED" };
  };
  "/claims/reject": {
    input: {
      "claim": Jsonify<AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Graphing"]["reject"]>[0], ["claim"]>>;
    };
    output: {
      "suggestions": {
        "connection": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["connection"]>>;
        "content": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>>>, ["content"]>>;
        "description": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>[0], ["description"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Seeking"]["_active"]>>>, ["description"]>]>>;
        "evidence": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Graphing"]["_members"]>[0], ["evidence"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["evidence"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["evidence"]>]>>;
        "gaps": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["gaps"]>>;
        "label": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["label"]>>;
        "need": Jsonify<AllOf<[AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["need"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Seeking"]["_active"]>>>, ["need"]>]>>;
        "reason": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["reason"]>>;
        "source": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>[0], ["memory"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["source"]>]>>;
        "sources": {
          "claim": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Graphing"]["_evidence"]>[0], ["claim"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_members"]>>>, ["claim"]>]>>;
          "content": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.computations)["sourceDigest"]["fn"]>[0], ["content"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>>>, ["content"]>]>>;
          "quote": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_evidence"]>>>, ["quote"]>>;
          "source": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>[0], ["memory"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_evidence"]>>>, ["source"]>]>>;
        }[];
        "target": Jsonify<AllOf<[AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["target"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["target"]>]>>;
      }[];
    };
    error: { error: HttpAppWideError | "INVALID_REQUEST" | "NOT_FOUND" | "UNAUTHORIZED" };
  };
  "/claims/remove": {
    input: {
      "claim": Jsonify<AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Graphing"]["remove"]>[0], ["claim"]>>;
    };
    output: {
      "suggestions": {
        "connection": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["connection"]>>;
        "content": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>>>, ["content"]>>;
        "description": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>[0], ["description"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Seeking"]["_active"]>>>, ["description"]>]>>;
        "evidence": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Graphing"]["_members"]>[0], ["evidence"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["evidence"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["evidence"]>]>>;
        "gaps": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["gaps"]>>;
        "label": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["label"]>>;
        "need": Jsonify<AllOf<[AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["need"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Seeking"]["_active"]>>>, ["need"]>]>>;
        "reason": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["reason"]>>;
        "source": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>[0], ["memory"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["source"]>]>>;
        "sources": {
          "claim": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Graphing"]["_evidence"]>[0], ["claim"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_members"]>>>, ["claim"]>]>>;
          "content": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.computations)["sourceDigest"]["fn"]>[0], ["content"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>>>, ["content"]>]>>;
          "quote": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_evidence"]>>>, ["quote"]>>;
          "source": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>[0], ["memory"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_evidence"]>>>, ["source"]>]>>;
        }[];
        "target": Jsonify<AllOf<[AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["target"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["target"]>]>>;
      }[];
    };
    error: { error: HttpAppWideError | "INVALID_REQUEST" | "UNAUTHORIZED" };
  };
  "/claims/restore": {
    input: {
      "claim": Jsonify<AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Graphing"]["restore"]>[0], ["claim"]>>;
    };
    output: {
      "suggestions": {
        "connection": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["connection"]>>;
        "content": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>>>, ["content"]>>;
        "description": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>[0], ["description"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Seeking"]["_active"]>>>, ["description"]>]>>;
        "evidence": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Graphing"]["_members"]>[0], ["evidence"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["evidence"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["evidence"]>]>>;
        "gaps": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["gaps"]>>;
        "label": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["label"]>>;
        "need": Jsonify<AllOf<[AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["need"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Seeking"]["_active"]>>>, ["need"]>]>>;
        "reason": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["reason"]>>;
        "source": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>[0], ["memory"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["source"]>]>>;
        "sources": {
          "claim": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Graphing"]["_evidence"]>[0], ["claim"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_members"]>>>, ["claim"]>]>>;
          "content": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.computations)["sourceDigest"]["fn"]>[0], ["content"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>>>, ["content"]>]>>;
          "quote": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_evidence"]>>>, ["quote"]>>;
          "source": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>[0], ["memory"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_evidence"]>>>, ["source"]>]>>;
        }[];
        "target": Jsonify<AllOf<[AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["target"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["target"]>]>>;
      }[];
    };
    error: { error: HttpAppWideError | "INVALID_REQUEST" | "NOT_FOUND" | "UNAUTHORIZED" };
  };
  "/memories/forget": {
    input: {
      "memory": Jsonify<AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Remembering"]["forget"]>[0], ["memory"]>>;
    };
    output: {
      "deleted": true;
    };
    error: { error: HttpAppWideError | "INVALID_REQUEST" | "NOT_FOUND" | "UNAUTHORIZED" };
  };
  "/memories/get": {
    input: {
      "memory": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Graphing"]["_claims"]>[0], ["source"]>, AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Graphing"]["_source"]>[0], ["source"]>, AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>[0], ["memory"]>]>>;
    };
    output: {
      "memory": {
        "claims": {
          "claim": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_claims"]>>>, ["claim"]>>;
          "fromLabel": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_claims"]>>>, ["fromLabel"]>>;
          "quote": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_claims"]>>>, ["quote"]>>;
          "relation": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_claims"]>>>, ["relation"]>>;
          "toLabel": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_claims"]>>>, ["toLabel"]>>;
          "usable": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_claims"]>>>, ["usable"]>>;
        }[];
        "content": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>>>, ["content"]>>;
        "memory": Jsonify<AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>[0], ["memory"]>>;
      };
    };
    error: { error: HttpAppWideError | "INVALID_REQUEST" | "NOT_FOUND" | "UNAUTHORIZED" };
  };
  "/memories/list": {
    input: {
      "after": Jsonify<AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Remembering"]["_list"]>[0], ["after"]>>;
    };
    output: {
      "memories": {
        "content": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Remembering"]["_list"]>>>, ["content"]>>;
        "memory": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Remembering"]["_list"]>>>, ["memory"]>>;
      }[];
    };
    error: { error: HttpAppWideError | "INVALID_REQUEST" | "UNAUTHORIZED" };
  };
  "/memories/reindex": {
    input: {
      "memory": Jsonify<AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Remembering"]["_record"]>[0], ["memory"]>>;
    };
    output: {
      "memory": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Graphing"]["ingest"]>[0], ["source"]>, AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Remembering"]["_record"]>[0], ["memory"]>]>>;
    } | {
      "memory": Jsonify<AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Remembering"]["_record"]>[0], ["memory"]>>;
    };
    error: { error: HttpAppWideError | "CONFLICT" | "FORBIDDEN" | "INVALID_REQUEST" | "NOT_FOUND" | "UNAUTHORIZED" };
  };
  "/memories/remember": {
    input: {
      "content": Jsonify<AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Remembering"]["remember"]>[0], ["content"]>>;
      "submission": Jsonify<AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Remembering"]["remember"]>[0], ["submission"]>>;
    };
    output: {
      "memory": Jsonify<AtPath<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Remembering"]["remember"]>>, ["memory"]>>;
    };
    error: { error: HttpAppWideError | "CONFLICT" | "FORBIDDEN" | "INVALID_REQUEST" | "UNAUTHORIZED" };
  };
  "/memories/revise": {
    input: {
      "content": Jsonify<AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Remembering"]["revise"]>[0], ["content"]>>;
      "memory": Jsonify<AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Remembering"]["revise"]>[0], ["memory"]>>;
    };
    output: {
      "memory": Jsonify<AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Remembering"]["revise"]>[0], ["memory"]>>;
    };
    error: { error: HttpAppWideError | "CONFLICT" | "FORBIDDEN" | "INVALID_REQUEST" | "NOT_FOUND" | "UNAUTHORIZED" };
  };
  "/needs/delete": {
    input: {
      "need": Jsonify<AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Seeking"]["delete"]>[0], ["need"]>>;
    };
    output: {
      "deleted": true;
    };
    error: { error: HttpAppWideError | "INVALID_REQUEST" | "UNAUTHORIZED" };
  };
  "/needs/list": {
    input: Record<string, never>;
    output: {
      "needs": {
        "active": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Seeking"]["_list"]>>>, ["active"]>>;
        "description": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Seeking"]["_list"]>>>, ["description"]>>;
        "need": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Seeking"]["_list"]>>>, ["need"]>>;
      }[];
    };
    error: { error: HttpAppWideError | "INVALID_REQUEST" | "UNAUTHORIZED" };
  };
  "/needs/reopen": {
    input: {
      "need": Jsonify<AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Seeking"]["reopen"]>[0], ["need"]>>;
    };
    output: {
      "results": {
        "active": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Seeking"]["_record"]>>>, ["active"]>>;
        "description": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Seeking"]["_record"]>>>, ["description"]>>;
        "need": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Seeking"]["reopen"]>[0], ["need"]>, AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Seeking"]["_record"]>[0], ["need"]>]>>;
        "suggestions": {
          "connection": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["connection"]>>;
          "content": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>>>, ["content"]>>;
          "evidence": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Graphing"]["_members"]>[0], ["evidence"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["evidence"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["evidence"]>]>>;
          "gaps": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["gaps"]>>;
          "label": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["label"]>>;
          "reason": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["reason"]>>;
          "source": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>[0], ["memory"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["source"]>]>>;
          "sources": {
            "claim": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Graphing"]["_evidence"]>[0], ["claim"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_members"]>>>, ["claim"]>]>>;
            "content": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.computations)["sourceDigest"]["fn"]>[0], ["content"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>>>, ["content"]>]>>;
            "quote": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_evidence"]>>>, ["quote"]>>;
            "source": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>[0], ["memory"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_evidence"]>>>, ["source"]>]>>;
          }[];
          "target": Jsonify<AllOf<[AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["target"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["target"]>]>>;
        }[];
      };
    };
    error: { error: HttpAppWideError | "INVALID_REQUEST" | "NOT_FOUND" | "UNAUTHORIZED" };
  };
  "/needs/resolve": {
    input: {
      "need": Jsonify<AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Seeking"]["resolve"]>[0], ["need"]>>;
    };
    output: {
      "results": {
        "active": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Seeking"]["_record"]>>>, ["active"]>>;
        "description": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Seeking"]["_record"]>>>, ["description"]>>;
        "need": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Seeking"]["resolve"]>[0], ["need"]>, AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Seeking"]["_record"]>[0], ["need"]>]>>;
        "suggestions": {
          "connection": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["connection"]>>;
          "content": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>>>, ["content"]>>;
          "evidence": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Graphing"]["_members"]>[0], ["evidence"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["evidence"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["evidence"]>]>>;
          "gaps": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["gaps"]>>;
          "label": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["label"]>>;
          "reason": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["reason"]>>;
          "source": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>[0], ["memory"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["source"]>]>>;
          "sources": {
            "claim": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Graphing"]["_evidence"]>[0], ["claim"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_members"]>>>, ["claim"]>]>>;
            "content": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.computations)["sourceDigest"]["fn"]>[0], ["content"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>>>, ["content"]>]>>;
            "quote": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_evidence"]>>>, ["quote"]>>;
            "source": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>[0], ["memory"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_evidence"]>>>, ["source"]>]>>;
          }[];
          "target": Jsonify<AllOf<[AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["target"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["target"]>]>>;
        }[];
      };
    };
    error: { error: HttpAppWideError | "INVALID_REQUEST" | "NOT_FOUND" | "UNAUTHORIZED" };
  };
  "/needs/revise": {
    input: {
      "description": Jsonify<AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Seeking"]["revise"]>[0], ["description"]>>;
      "need": Jsonify<AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Seeking"]["revise"]>[0], ["need"]>>;
    };
    output: {
      "results": {
        "active": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Seeking"]["_record"]>>>, ["active"]>>;
        "description": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Seeking"]["_record"]>>>, ["description"]>>;
        "need": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Seeking"]["revise"]>[0], ["need"]>, AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Seeking"]["_record"]>[0], ["need"]>]>>;
        "suggestions": {
          "connection": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["connection"]>>;
          "content": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>>>, ["content"]>>;
          "evidence": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Graphing"]["_members"]>[0], ["evidence"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["evidence"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["evidence"]>]>>;
          "gaps": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["gaps"]>>;
          "label": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["label"]>>;
          "reason": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["reason"]>>;
          "source": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>[0], ["memory"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["source"]>]>>;
          "sources": {
            "claim": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Graphing"]["_evidence"]>[0], ["claim"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_members"]>>>, ["claim"]>]>>;
            "content": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.computations)["sourceDigest"]["fn"]>[0], ["content"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>>>, ["content"]>]>>;
            "quote": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_evidence"]>>>, ["quote"]>>;
            "source": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>[0], ["memory"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_evidence"]>>>, ["source"]>]>>;
          }[];
          "target": Jsonify<AllOf<[AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["target"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["target"]>]>>;
        }[];
      };
    };
    error: { error: HttpAppWideError | "CONFLICT" | "INVALID_REQUEST" | "NOT_FOUND" | "UNAUTHORIZED" };
  };
  "/needs/seek": {
    input: {
      "description": Jsonify<AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Seeking"]["seek"]>[0], ["description"]>>;
    };
    output: {
      "results": {
        "active": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Seeking"]["_record"]>>>, ["active"]>>;
        "description": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Seeking"]["_record"]>>>, ["description"]>>;
        "need": Jsonify<AllOf<[AtPath<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Seeking"]["seek"]>>, ["need"]>, AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Seeking"]["_record"]>[0], ["need"]>]>>;
        "suggestions": {
          "connection": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["connection"]>>;
          "content": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>>>, ["content"]>>;
          "evidence": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Graphing"]["_members"]>[0], ["evidence"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["evidence"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["evidence"]>]>>;
          "gaps": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["gaps"]>>;
          "label": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["label"]>>;
          "reason": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["reason"]>>;
          "source": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>[0], ["memory"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["source"]>]>>;
          "sources": {
            "claim": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Graphing"]["_evidence"]>[0], ["claim"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_members"]>>>, ["claim"]>]>>;
            "content": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.computations)["sourceDigest"]["fn"]>[0], ["content"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>>>, ["content"]>]>>;
            "quote": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_evidence"]>>>, ["quote"]>>;
            "source": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>[0], ["memory"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_evidence"]>>>, ["source"]>]>>;
          }[];
          "target": Jsonify<AllOf<[AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["target"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["target"]>]>>;
        }[];
      };
    };
    error: { error: HttpAppWideError | "INVALID_REQUEST" | "UNAUTHORIZED" };
  };
  "/suggestions/dismiss": {
    input: {
      "connection": Jsonify<AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Connecting"]["dismiss"]>[0], ["connection"]>>;
    };
    output: {
      "suggestions": {
        "connection": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["connection"]>>;
        "content": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>>>, ["content"]>>;
        "description": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>[0], ["description"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Seeking"]["_active"]>>>, ["description"]>]>>;
        "evidence": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Graphing"]["_members"]>[0], ["evidence"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["evidence"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["evidence"]>]>>;
        "gaps": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["gaps"]>>;
        "label": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["label"]>>;
        "need": Jsonify<AllOf<[AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["need"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Seeking"]["_active"]>>>, ["need"]>]>>;
        "reason": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["reason"]>>;
        "source": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>[0], ["memory"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["source"]>]>>;
        "sources": {
          "claim": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Graphing"]["_evidence"]>[0], ["claim"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_members"]>>>, ["claim"]>]>>;
          "content": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.computations)["sourceDigest"]["fn"]>[0], ["content"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>>>, ["content"]>]>>;
          "quote": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_evidence"]>>>, ["quote"]>>;
          "source": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>[0], ["memory"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_evidence"]>>>, ["source"]>]>>;
        }[];
        "target": Jsonify<AllOf<[AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["target"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["target"]>]>>;
      }[];
    };
    error: { error: HttpAppWideError | "CONFLICT" | "INVALID_REQUEST" | "NOT_FOUND" | "UNAUTHORIZED" };
  };
  "/suggestions/inspect": {
    input: {
      "connection": Jsonify<AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Connecting"]["_get"]>[0], ["connection"]>>;
    };
    output: {
      "suggestion": {
        "connection": Jsonify<AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Connecting"]["_get"]>[0], ["connection"]>>;
        "content": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>>>, ["content"]>>;
        "description": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Seeking"]["_record"]>>>, ["description"]>>;
        "eligible": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_get"]>>>, ["eligible"]>>;
        "evidence": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Graphing"]["_members"]>[0], ["evidence"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_get"]>>>, ["evidence"]>]>>;
        "gaps": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_get"]>>>, ["gaps"]>>;
        "label": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["label"]>>;
        "need": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Seeking"]["_record"]>[0], ["need"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_get"]>>>, ["need"]>]>>;
        "reason": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_get"]>>>, ["reason"]>>;
        "source": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>[0], ["memory"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["source"]>]>>;
        "sources": {
          "claim": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Graphing"]["_evidence"]>[0], ["claim"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_members"]>>>, ["claim"]>]>>;
          "content": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.computations)["sourceDigest"]["fn"]>[0], ["content"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>>>, ["content"]>]>>;
          "quote": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_evidence"]>>>, ["quote"]>>;
          "source": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>[0], ["memory"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_evidence"]>>>, ["source"]>]>>;
        }[];
        "status": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_get"]>>>, ["status"]>>;
        "target": Jsonify<AllOf<[AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_get"]>>>, ["target"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["target"]>]>>;
      };
    };
    error: { error: HttpAppWideError | "INVALID_REQUEST" | "NOT_FOUND" | "UNAUTHORIZED" };
  };
  "/suggestions/list": {
    input: Record<string, never>;
    output: {
      "suggestions": {
        "connection": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["connection"]>>;
        "content": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>>>, ["content"]>>;
        "description": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>[0], ["description"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Seeking"]["_active"]>>>, ["description"]>]>>;
        "evidence": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Graphing"]["_members"]>[0], ["evidence"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["evidence"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["evidence"]>]>>;
        "gaps": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["gaps"]>>;
        "label": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["label"]>>;
        "need": Jsonify<AllOf<[AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["need"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Seeking"]["_active"]>>>, ["need"]>]>>;
        "reason": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["reason"]>>;
        "source": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>[0], ["memory"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["source"]>]>>;
        "sources": {
          "claim": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Graphing"]["_evidence"]>[0], ["claim"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_members"]>>>, ["claim"]>]>>;
          "content": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.computations)["sourceDigest"]["fn"]>[0], ["content"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>>>, ["content"]>]>>;
          "quote": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_evidence"]>>>, ["quote"]>>;
          "source": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>[0], ["memory"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_evidence"]>>>, ["source"]>]>>;
        }[];
        "target": Jsonify<AllOf<[AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["target"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["target"]>]>>;
      }[];
    };
    error: { error: HttpAppWideError | "INVALID_REQUEST" | "UNAUTHORIZED" };
  };
  "/suggestions/refresh": {
    input: Record<string, never>;
    output: {
      "suggestions": {
        "connection": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["connection"]>>;
        "content": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>>>, ["content"]>>;
        "description": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>[0], ["description"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Seeking"]["_active"]>>>, ["description"]>]>>;
        "evidence": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Graphing"]["_members"]>[0], ["evidence"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["evidence"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["evidence"]>]>>;
        "gaps": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["gaps"]>>;
        "label": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["label"]>>;
        "need": Jsonify<AllOf<[AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["need"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Seeking"]["_active"]>>>, ["need"]>]>>;
        "reason": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["reason"]>>;
        "source": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>[0], ["memory"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["source"]>]>>;
        "sources": {
          "claim": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Graphing"]["_evidence"]>[0], ["claim"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_members"]>>>, ["claim"]>]>>;
          "content": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.computations)["sourceDigest"]["fn"]>[0], ["content"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>>>, ["content"]>]>>;
          "quote": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_evidence"]>>>, ["quote"]>>;
          "source": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>[0], ["memory"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_evidence"]>>>, ["source"]>]>>;
        }[];
        "target": Jsonify<AllOf<[AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["target"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["target"]>]>>;
      }[];
    };
    error: { error: HttpAppWideError | "INVALID_REQUEST" | "UNAUTHORIZED" };
  };
  "/suggestions/remove": {
    input: {
      "connection": Jsonify<AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Connecting"]["remove"]>[0], ["connection"]>>;
    };
    output: {
      "suggestions": {
        "connection": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["connection"]>>;
        "content": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>>>, ["content"]>>;
        "description": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>[0], ["description"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Seeking"]["_active"]>>>, ["description"]>]>>;
        "evidence": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Graphing"]["_members"]>[0], ["evidence"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["evidence"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["evidence"]>]>>;
        "gaps": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["gaps"]>>;
        "label": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["label"]>>;
        "need": Jsonify<AllOf<[AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["need"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Seeking"]["_active"]>>>, ["need"]>]>>;
        "reason": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["reason"]>>;
        "source": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>[0], ["memory"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["source"]>]>>;
        "sources": {
          "claim": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Graphing"]["_evidence"]>[0], ["claim"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_members"]>>>, ["claim"]>]>>;
          "content": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.computations)["sourceDigest"]["fn"]>[0], ["content"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>>>, ["content"]>]>>;
          "quote": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_evidence"]>>>, ["quote"]>>;
          "source": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>[0], ["memory"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_evidence"]>>>, ["source"]>]>>;
        }[];
        "target": Jsonify<AllOf<[AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["target"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["target"]>]>>;
      }[];
    };
    error: { error: HttpAppWideError | "INVALID_REQUEST" | "UNAUTHORIZED" };
  };
  "/suggestions/use": {
    input: {
      "connection": Jsonify<AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Connecting"]["use"]>[0], ["connection"]>>;
    };
    output: {
      "suggestions": {
        "connection": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["connection"]>>;
        "content": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>>>, ["content"]>>;
        "description": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>[0], ["description"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Seeking"]["_active"]>>>, ["description"]>]>>;
        "evidence": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Graphing"]["_members"]>[0], ["evidence"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["evidence"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["evidence"]>]>>;
        "gaps": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["gaps"]>>;
        "label": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["label"]>>;
        "need": Jsonify<AllOf<[AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["need"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Seeking"]["_active"]>>>, ["need"]>]>>;
        "reason": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["reason"]>>;
        "source": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>[0], ["memory"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["source"]>]>>;
        "sources": {
          "claim": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Graphing"]["_evidence"]>[0], ["claim"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_members"]>>>, ["claim"]>]>>;
          "content": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.computations)["sourceDigest"]["fn"]>[0], ["content"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>>>, ["content"]>]>>;
          "quote": Jsonify<AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_evidence"]>>>, ["quote"]>>;
          "source": Jsonify<AllOf<[AtPath<Parameters<(typeof ApplicationConceptSet.concepts)["Remembering"]["_get"]>[0], ["memory"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_evidence"]>>>, ["source"]>]>>;
        }[];
        "target": Jsonify<AllOf<[AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Connecting"]["_suggestions"]>>>, ["target"]>, AtPath<QueryRow<Awaited<ReturnType<(typeof ApplicationConceptSet.concepts)["Graphing"]["_trace"]>>>, ["target"]>]>>;
      }[];
    };
    error: { error: HttpAppWideError | "CONFLICT" | "INVALID_REQUEST" | "NOT_FOUND" | "UNAUTHORIZED" };
  };
};

## Frontend starting paths

**.sync-engine/work/mockup-refinement/frontend-paths.md**

frontend/src/App.vue, frontend/src/style.css, frontend/src/reusable/ components. Runtime input assets: frontend/src/assets/fonts/{MadInk.ttf,MadInk-License.txt,Urbanist.ttf,Urbanist-OFL.txt}; frontend/src/assets/circle/connection-collage.png. Existing backend/API contracts stay unchanged. UI entry: Sign-in → Remember/Find forms → saved searches, suggestions/evidence → inspection → Recent people.

# Result

Unless the task requests another format, return these headings in order. Omit progress narration.

- `## Status` — required. First line is exactly `Complete` or `Blocked`; explanation goes below.
- `## Changed` — required. Paths changed, or none.
- `## Checks` — required. Exact command and pass/fail outcome.
- `## Blockers` — required. Categorize as design, context, or environment.
- `## Concerns` — optional. Material non-blocking uncertainty only.
