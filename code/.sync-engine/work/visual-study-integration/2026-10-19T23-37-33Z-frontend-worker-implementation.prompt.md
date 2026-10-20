# Role and objective

Work unit `visual-study-integration`; role `frontend-worker`; phase `implementation`.

# Frontend worker

Implement and test the assigned client surface against the assembled public endpoint contract. Keep backend design, policy, and production source read-only unless the task explicitly expands ownership.

Use the typed client rather than importing concepts or bypassing validation and authorization. Keep authoritative facts behind endpoints. Report a design blocker for missing public behavior, a context blocker for a missing interface or reference, or an environment blocker when checks cannot run.

# Access

Root: "/private/tmp/circle-visual-study/code". The short native message explicitly authorizes reading this prompt file; all assignment context is inline below. This is already a compiled role assignment: do not load a skill, workflow, harness guide, or another instruction file.

- Read: `work-unit:assets-readme.md` ("/private/tmp/circle-visual-study/code/.sync-engine/work/visual-study-integration/assets-readme.md"), `work-unit:visual-study.md` ("/private/tmp/circle-visual-study/code/.sync-engine/work/visual-study-integration/visual-study.md"), `application:frontend/src` ("/private/tmp/circle-visual-study/code/frontend/src"), `application:generated/wire.ts` ("/private/tmp/circle-visual-study/code/generated/wire.ts").
- Write: `owned-frontend:frontend/src` ("/private/tmp/circle-visual-study/code/frontend/src").
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

**.sync-engine/work/visual-study-integration/frontend-task.md**

Implement the supplied visual study and motion assets in Circle's existing Vue frontend. Own all frontend presentation and runtime asset integration; do not edit backend/design/tests or install dependencies. Read supplied brief/study/assets README and granted frontend source. The runtime assets are pre-copied to frontend/src/assets/circle; declarations/components may be added there or in bounded frontend paths. Use the existing renderer; keep its artwork and licensed font intact. Design a polished, quiet, spacious interface with warm cream, large clear type, blue figures and restrained rings/curves, red actions, thoughtful responsive layout. Preserve all current behaviors and controls, including Commons sign-in, mode draft preservation, ongoing needs, evidence details, edits/deletes and voice state. Make the visual treatment consistent across all states. Use contextual poses without turning the asset preview into a product feature. Ongoing motion needs pause, reduced-motion and visibility lifecycle handling. No exact-copy cosmetic tests. Run Vue typecheck and build, fix issues, and report files, verified behavior, limitations. Do not edit coordinator work artifacts. Return Status: Complete or Status: Blocked.

## Brief

**.sync-engine/work/visual-study-integration/brief.md**

# Integrate Circle's visual study

## Goal
Apply Sofia's added visual study and original motion assets to the existing Circle application.

## Scope
Frontend presentation only: warm ivory/ink, blue figures, vermilion actions, bundled Urbanist, restrained circular motifs, responsive hierarchy, motion integrated with Remember/Find and sign-in. Preserve every existing P3 flow, endpoint, wording needed for accessibility, auth/ownership, original data, unsaved drafts and confirmations. No new product features, provider calls, backend contracts, dependency changes, publishing, or personal design-journal edits.

## Requirements
Use the supplied files from design-docs/visual-study-assets/circle-motion, copying only required runtime files into frontend assets. Keep Urbanist's OFL. MadInk is not supplied: use truthful Urbanist fallback and record limitation. Motion must respect reduced-motion, pause when hidden/offscreen, clean up on unmount, and offer an accessible pause control for ongoing animation. Text/buttons must meet contrast, retain visible keyboard focus and usable mobile controls. Decorative illustrations must stay out of the accessibility tree and never cover content. Keep the app quiet and skimmable; do not add preview controls or marketing sections from the asset demo.

## Done when
- Sign-in, Remember, Find, saved searches, suggestions, note review/edit and recent encounters share the visual study's palette and typography.
- Supplied artwork appears as restrained, responsive contextual illustrations with functional pause/reduced-motion handling.
- Existing typed drafts, deliberate voice save, source evidence and lifecycle controls continue to function.
- Vue typecheck and build pass; actual browser checks cover desktop/mobile, keyboard focus, reduced motion, loading/error states, and core signed-in interactions using local simulated data.
- Only reviewed frontend/runtime assets, completed scoped work records and an agent-journal entry are applied to the real repository; Sofia's design journal and unrelated edits are preserved.

## Active decisions
- Reuse the accepted P3 contracts without authored design changes. This is a visual implementation of the supplied study, not a new product decomposition.
- Work in an isolated temporary copy, then check baseline hashes before applying to the actual checkout outside the writable sandbox.
- Use native Codex role delegation. No provider credentials or live external model calls; any browser data must be local simulated data.
- Body uses bundled Urbanist. MadInk cannot be claimed or downloaded without its supplied font/license. Local MadInk may be offered as a heading fallback only if explicitly identified.
- Exact vermilion may need a darker action shade for readable white button text; retain the original palette for decorative marks.
- Coordinator may run validation and add agent journal after roles finalize; no extra cosmetic unit tests.

## Activity
- Reviewed AGENTS.md, current frontend, visual study, motion README/renderer, color board and asset preview.
- Used bundled Node 24 for skill tooling and copied existing dependencies into temporary staging; no dependency versions changed.

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

**.sync-engine/work/visual-study-integration/frontend-paths.md**

Frontend: frontend/src/App.vue, frontend/src/style.css, frontend/src/reusable/*.vue; copied runtime assets: frontend/src/assets/circle/. Existing API client/generated interface remain authoritative. Existing interactions must be preserved.

## Additional directed context

**.sync-engine/work/visual-study-integration/assets-readme.md**

# Circle motion assets

Three original Matisse-inspired paper-cut human rigs, revised to combine flowing asymmetric contours with occasional clipped ends. Built-in image_gen produced the artwork; the SVG renderer assembles and animates it.

## Files

- `assets/lilt-atlas.png`, `gather-atlas.png`, `lean-atlas.png`: transparent original 3 × 4 PNG part atlases, 1086 × 1448 px each. Twelve parts per figure, including alternate open-hand forearms.
- `parts/{figure}/`: 36 individual, self-contained SVG wrappers around the generated raster artwork. Each wrapper embeds its original atlas and clips to the measured region. These are **not vector-traced outlines**. Pivot coordinates are included as attributes.
- `poses/{figure}/`: 24 self-contained SVG illustrations: rest, welcome, reach, listen, remember, walk, celebrate, connect. Transparency is preserved.
- `rigs.json`: measured source rectangles, pivot and endpoint coordinates, shoulder placements, proportions, palette, and font choices.
- `motion.js`: dependency-free SVG assembly, pose presets, and independent joint transforms.
- `preview.js`, `styles.css`, `index.html`: interactive preview with play/pause, pose selection, figure selection, and SVG download. Gesture changes ease over 380 ms; motion fades in/out over 400 ms. Reduced-motion disables decorative looping. Animation pauses when the document is hidden.
- `assets/motifs.svg`: reusable person mark, memory ring, discovery loop, connecting curve, and encounter line, using `currentColor` symbols.
- `PROMPTS.json`: final prompt set and built-in generation mode.

## Palette and typography

| Token | Value |
| --- | --- |
| Ultramarine | `#2455A4` |
| Vermilion | `#E74735` |
| Warm ivory | `#F8F6F0` |
| Ink | `#252525` |
| Dusty blue | `#DCE7F3` |
| Pale coral | `#F9DFD8` |

SVG output normalizes the artwork to exact palette values; the original generated PNGs retain their original ink rendering. Blue is the default; vermilion is the accent. Change the renderer's `color` option to any palette token.

Titles: **MadInk**. Body, labels and controls: **Urbanist**. Urbanist and its OFL license are bundled from [Google Fonts](https://github.com/google/fonts/tree/main/ofl/urbanist). **MadInk is not bundled because its font file was not supplied.** The stylesheet uses locally installed MadInk if present and falls back to Urbanist for this preview. To use a supplied licensed webfont, add its file and update the MadInk `@font-face` source in `styles.css`. Do not describe the fallback as MadInk.

## Preview

Serve this folder with a local static server, then open `index.html`. The preview loads the manifest with fetch, so opening it directly as a file may be blocked by the browser. The exported SVG parts and poses open directly without a server.

The preview is an asset viewer. No Circle application flows or backend behavior have been changed.

## Integration

```js
import { figureMarkup, PALETTE } from './motion.js';
// data is rigs.json, href points to an atlas relative to the consuming page.
svg.innerHTML = figureMarkup(data.rigs.lilt, './assets/lilt-atlas.png', {
  pose: 'welcome', color: PALETTE.ultramarine, id: 'welcome-lilt'
});
// Retain the SVG structure; update transforms on each animation frame.
figureMarkup(data.rigs.lilt, '', {
  pose: 'welcome', animate: true, time: elapsedSeconds,
  motionWeight: 1, target: svg
});
```

Use a unique filter `id` for every inline figure. `time` is seconds. Angles are degrees clockwise from downward; forearm/shin angles are relative to their upper segment. Source `frame` is `[x,y,width,height]`; `pivot` and `end` are local to that frame. The head pivot is at the neck. Torso is one part including pelvis. Hands/feet are integrated into forearms/shins, so no detached tiny pieces are required.

The renderer accepts either a named pose or an object with `body`, `head`, `arms`, `legs`, `open`, and optional `name`. The preview demonstrates smooth interpolation between those pose objects. A walking preset is a decorative walk cycle, not a physically accurate locomotion simulation.

To regenerate exported SVG files after changing proportions or poses, run `bun build-assets.mjs` from this folder. Atlas PNGs remain unchanged.

## Verification

The three source images were checked for true RGBA transparency. All 36 part regions were measured from their principal alpha components. The assembled browser preview was visually inspected; play/pause and gesture selection were exercised. MadInk rendering remains pending receipt of its font file.

**.sync-engine/work/visual-study-integration/visual-study.md**

# Visual study

Wanted Circle to feel personal, with some movement to it.

People and connections evolve over time, and I wanted the visuals to show that while keeping the UI clean and easy to skim.

## Typography

![Typography study: SKIMS, MadInk, Belmonte Ballpoint, Albert Sans, and Urbanist](visual-study-assets/fonts.png)

- Looked at SKIMS and MadInk for headers. -> The soft, uneven shapes feel close to the Matisse figures.
- **Handwritten quick notes?** Belmonte Ballpoint has that ink feel, which fits saving a conversation right after meeting someone. Wanted to show the movement, liquid nature of connections.
- For body text, looked at Albert Sans and Urbanist. Something simple and easy to skim, especially when looking through people and encounter notes. Chose Urbanist as it appears simpler and easier to skim.
- In the mockup, tried brushlike lettering for the main heading and quieter body text underneath. Still exploring the exact font pairing.



## Color

![Color study: Matisse, blue and red circles, Kandinsky, Kusama, and a Circle mockup](visual-study-assets/color.png)

- Traditionally, contact services like Facebook and LinkedIn use blue. I associate it with stability and formality. Red / orange feels more creative, something that evolves and progresses over time (think YouTube, Pinterest - creative platforms).
- Goal of Circle: combine the evolution of red + stability of blue.
- Looked at Kandinsky for shapes and Kusama for repeated circles. Matisse's linked figures bring in the movement and connection between people.
- Tried this in an AI-generated mockup: blue figures, red actions, warm cream background, dark text. Want the colors and hand-drawn circles to give it personality while leaving the actual notes easy to read.
- Also considered colorblindness: keep labels and check contrast so the interface does not depend on red vs blue alone.

# Result

Unless the task requests another format, return these headings in order. Omit progress narration.

- `## Status` — required. First line is exactly `Complete` or `Blocked`; explanation goes below.
- `## Changed` — required. Paths changed, or none.
- `## Checks` — required. Exact command and pass/fail outcome.
- `## Blockers` — required. Categorize as design, context, or environment.
- `## Concerns` — optional. Material non-blocking uncertainty only.
