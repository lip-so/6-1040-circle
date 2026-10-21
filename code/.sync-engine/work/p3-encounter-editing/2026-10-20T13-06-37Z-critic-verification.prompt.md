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

**.sync-engine/work/p3-encounter-editing/review-task.md**

Review the changed P3 contracts against the brief. Focus on edit idempotency/revision conflicts, immutable original, deletion and stale extraction races, date anchoring/timezones, source-supported summaries/uncertainty, owner isolation, and reachable public acknowledgements. Check UI Text/Voice/Form, form-only edits and nested disclosure obligations. Do not edit files. Report only actionable contract defects.

## Brief

**.sync-engine/work/p3-encounter-editing/brief.md**

Unchanged from the prior same-agent context.

## Original finding or routed blocker IDs

**.sync-engine/work/p3-encounter-editing/2026-10-20T13-04-54Z-critic-contracts.response.md**

## Verdict
Revise

## Assessments

| Obligation | Assessment |
|---|---|
| Capture and relative dates | Remember authenticates, saves the original and anchored reference date, then awaits organization. Same-token retries retain that date; provider failure preserves the note. |
| Form preparation | PrepareEdit authenticates and checks the owned live record before provider work. Opening/cancelling does not edit it. |
| Edit and retry | Remembering owns atomic revision checks, immutable first text and same-token retries. Success waits for organization; downstream failure preserves the applied edit for deliberate retry. |
| Delete versus edit | Removal erases both current and original text. Owned reads hide removed records before graph cleanup; markers prevent resurrection. |
| Revision versus extraction | The intended ordering is clear, but the digest-cache shortcut does not settle revision advancement; see P3-01. |
| Interpretation and evidence | Summaries and marked inferences are allowed while source evidence, private context and selected database identities remain validated. |
| Recall freshness | Results rejoin current owned content/reference date and matching cards. Stale or missing sources are omitted; unchanged query/corpus/configuration reuses selections. |
| UI | Equal Text/Voice/Form choices, separate form-only edit draft, collapsed personal notes, omitted empty values and mobile dialogs are explicit. |
| Executable inventory | Seven endpoints have matching typed links and paths; OwnedMemory, SavedMemories and NeedResults remain selected. No added internal reactions or computations; six static instances and bindings remain unchanged. |

## Findings

**P3-01 — Material: a cache hit can leave revision ordering behind the accepted edit.**  
Graphing’s state does not declare `sourceRevision`, although its ordering rule depends on that field. Moreover, `ingest` returns immediately when content digest and provider version are current, without specifying that the incoming revision is recorded.

Consider revision 0 containing A, a delayed revision-1 extraction for B, then revision 2 returning to A with the same reference date. Revision 2 can hit the existing A cache and leave the source at revision 0; the delayed revision-1 extraction can then replace it with B. Final joins hide the mismatch, but the newer edit’s organization has still been displaced.

Declare the revision state and settle how successful cached ingestion advances or otherwise preserves ordering for the incoming revision. The contract must ensure a lower-revision extraction cannot displace a successfully organized newer edit, including when content returns to a previously cached value.

## Revised candidate context

**.sync-engine/work/p3-encounter-editing/repair.md**

P3-01: declared sourceRevision state and made successful equivalent cached ingestion atomically advance revision under owner/active/digest/version guards, rechecking races. Lower revision extraction cannot overwrite A after revision 2 reuses A.

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
