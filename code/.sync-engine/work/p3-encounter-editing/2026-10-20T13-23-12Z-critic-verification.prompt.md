# Role and objective

Work unit `p3-encounter-editing`; role `critic`; phase `verification`.

# Critic verification

Verify only the supplied finding or routed-blocker IDs against the revised candidate and their direct effects. Mark each ID resolved, unresolved, or directly regressed.

Do not restart holistic review, add unrelated findings, edit the candidate, or infer missing context.

# Access

Root: "/private/tmp/circle-p3-edit/code". The short native message explicitly authorizes reading this prompt file; all assignment context is inline below. This is already a compiled role assignment: do not load a skill, workflow, harness guide, or another instruction file.

- Read: `design:compositions` ("/private/tmp/circle-p3-edit/code/design/compositions"), `design:concepts` ("/private/tmp/circle-p3-edit/code/design/concepts"), `design:types.md` ("/private/tmp/circle-p3-edit/code/design/types.md").
- Write: none.
- Tools: `repository-read`.
- Shell: `none`; network: no; generated output: no; long-running processes: no.

Inspect only listed files or directories. In coordinator simulation, this grant binds the coordinator itself; broader coordinator access and prior discovery are unavailable to the assignment. Project checks may transitively read other project files, but do not inspect them yourself. Use supplied or task-named package-owned public documentation; do not browse package trees. Never inspect package `dist`, framework internals, caches, sibling applications, or undeclared declarations. Exclude `.git`, `.sync-engine` except this prompt, harness/skill configuration, agent traces, parent directories, and unrelated generated output. Ask for context instead of searching outside the grant. Generated files come only from granted commands. Never grantable: `git-mutation`, `dependency-installation`, `framework-internals`, `workflow-management`, `skill-cli-invocation`, `delegation-or-handoff`.

# Guidance

No additional guidance for this phase.

# Context

## Verification task

**.sync-engine/work/p3-encounter-editing/final-review-task.md**

Review the final P3 contracts after implementation clarified optional direct-call metadata and added current revision to _card with read-only compatibility for unedited previous JSON records. This materially affects the query surface, so perform the final contract review of the complete scoped design. Check edit retry/deletion ordering, current-card joins, relative dates and grounded summary/UI obligations. Do not edit files. Report actionable semantic defects only.

## Brief

**.sync-engine/work/p3-encounter-editing/brief.md**

Unchanged from the prior same-agent context.

## Original finding or routed blocker IDs

**.sync-engine/work/p3-encounter-editing/2026-10-20T13-21-40Z-critic-contracts.response.md**

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

## Revised candidate context

**.sync-engine/work/p3-encounter-editing/repair-defaults.md**

P3-02 resolved: omitted Graphing metadata means referenceDate empty/unknown and revision zero, never skip checks. Circle explicitly passes current owned referenceDate/revision on saved cards and result joins. Compatibility only applies to unchanged unversioned revision-zero evidence. Source already implements these defaults and passes revision at all three card joins.

## Retained review guidance

**node_modules/@mit-sdg/sync-engine-skill/skills/sync-engine/prompts/guidance/design/boundary.md**

# What a design says about its boundary

An endpoint takes one request and produces one answer. Endpoints are the only way into
the application, and every caller reaches them the same way, regardless of caller.

Say what a caller supplies, what comes back, and every refusal with a stable code and its
meaning. Each selected endpoint separately declares its exact `endpoint(...)` pathname in
an `endpoints` fence. Do not put transport rendering in behavioral prose or that fence: no
methods, status codes, headers, exit codes, or projected external routes.

When two refusals have to be indistinguishable to a caller, say that as behaviour.

A concept needing the current time or a generated identifier says so in its prose and
takes it as an action input; it never reaches for a clock. Composition binds one instant
per flow and passes it in, so no concept reports the time.

**node_modules/@mit-sdg/sync-engine-skill/skills/sync-engine/prompts/guidance/design/contracts.md**

# Contract design and review

Use the supplied decomposition as boundary authority; without one, use the brief and affected approved contracts. Preserve accepted obligation IDs and their trigger, closing reaction, false interval, retry identity, and recovery.

## Concepts own complete mechanisms

Purpose names one mechanism and rules out a plausible alternative. Principle gives a short event-ordered story with real actors and values. State describes observable identity, relations, lifecycle, order, multiplicity, and invariants—not storage. External identities remain opaque and peer facts are never interpreted locally.

For every action, settle:

- inputs and returned identity;
- successful state transition;
- each expected refusal and the unchanged post-refusal state;
- repetition or deduplication behavior;
- lifecycle stage, deletion, expiry, and repair when applicable; and
- the owner action that enforces each race-sensitive or security-critical invariant.

A refusal has no partial effect. Repetition must succeed again, return the prior result, or refuse. Deduplication requires an operation identity accepted and checked atomically by the owner; a trace correlation ID is not enough.

Queries have no effects. State `one`, `optional`, or `many`, the empty or unknown case, and stable ordering for `many`. Do not invent CRUD symmetry or expose storage operations that are not part of the mechanism.

## Composition coordinates without stealing authority

Composition owns cross-concept policy, coordination, boundary adaptation, and recovery—not concept invariants. For each visible flow, state:

- actor and authenticated authority;
- requested resource and authorization condition;
- enforcement point;
- visible success and refusals;
- effect owner;
- ordering of required effects relative to acknowledgement; and
- material partial-failure and recovery behavior.

Request data is a claim, not authentication. Reject bypassable authorization, duplicate effect ownership, required work deferred after visible success when it can be lost, compensation without an available owner action, and claims of atomic or exactly-once behavior across independent owners.

For each obligation, verify that the trigger can occur, the closing reaction owns the intended effect, the owner accepts the retry identity, the false interval matches visible behavior, and recovery can run from an available action. This applies to synchronously awaited endpoint steps as well as deferred reactions. Never assume rollback between owners or exactly-once network delivery. Choose and state a realizable server-side acknowledgement boundary rather than adding protocol state solely to model whether a client received bytes.

## Select every executable explicitly

Inventory each selected static instance, endpoint, internal reaction, view, former, and computation. Give every executable declaration one exact typed link, and put all concrete types and instances needed by a new application in `design/types.md`. Each endpoint additionally needs exactly one matching `Declaration.Identity at /path` entry. The module, group, declaration, and pathname must agree.

A computation is a pure derivation of its declared inputs, such as normalization, a generated identifier, the current instant, or deciding whether an optional input was supplied. Anything read from concept state belongs in a query, view, or former, never a computation. Declare every computation the composition prose implies before review, including one for each optional-input branch. Implementation blocks on a missing declaration rather than inventing one.

An endpoint-linked reaction may own the full coordination required before its answer. Add a separate internal reaction only for intentionally distinct deferred or independently triggered behavior. Do not duplicate one effect in both declarations.

Contracts specify behavior, ownership, acknowledgement, and failure—not framework stages, trigger syntax, binding flow, host methods, status codes, or storage layout.

**node_modules/@mit-sdg/sync-engine-skill/skills/sync-engine/prompts/guidance/design/ssf-reading.md**

# Reading Simple State Form

State fences are declarations, not storage. Read them for what they promise:

- `a set of Items` and `a seq of Items` introduce identities; a `seq` also fixes order.
- A plain set holds every individual of its type in the state: with `a set of Users with
a reputation Number`, every User anywhere in the concept has a reputation, whether
  User is owned or external. An external type's set introduces no identity.
- `a set of Completed Items` classifies members of `Items`, and `a set of Late Completed
Items` members of `Completed Items`. A subset declares no second collection and no
  identity, subsets may overlap, and `a reviewer Verified User` holds only members of
  `Verified Users`.
- `an Author` is the field `author`; the type names a field written without a name.
- `an optional owner Person` may be absent. Collections never carry `optional`; empty
  means absent, so a set that must reject duplicates cannot also promise to detect them.
- `a Settings` has exactly one member.
- `alias WorkItem for Items` renames one declaration; it adds nothing.
- A `Rule:` line is prose the checker keeps verbatim and proves nothing.

Which side declares a relation implies no storage, navigation, or ownership.

# Result

Unless the task requests another format, return these headings in order. Omit progress narration.

- `## Verdict` — required. First line is exactly `Approve`, `Revise`, or `Blocked`.
- `## Findings` — required. Stable findings or routed blockers resolved/unresolved; direct regressions or none.
