# Role and objective

Work unit `private-brain`; role `critic`; phase `verification`.

# Critic verification

Verify only the supplied finding or routed-blocker IDs against the revised candidate and their direct effects. Mark each ID resolved, unresolved, or directly regressed.

Do not restart holistic review, add unrelated findings, edit the candidate, or infer missing context.

# Access

Root: "/private/tmp/circle-private-brain/code". The short native message explicitly authorizes reading this prompt file; all assignment context is inline below. This is already a compiled role assignment: do not load a skill, workflow, harness guide, or another instruction file.

- Read: `design:compositions` ("/private/tmp/circle-private-brain/code/design/compositions"), `design:concepts` ("/private/tmp/circle-private-brain/code/design/concepts"), `design:types.md` ("/private/tmp/circle-private-brain/code/design/types.md").
- Write: none.
- Tools: `repository-read`.
- Shell: `none`; network: no; generated output: no; long-running processes: no.

Inspect only listed files or directories. In coordinator simulation, this grant binds the coordinator itself; broader coordinator access and prior discovery are unavailable to the assignment. Project checks may transitively read other project files, but do not inspect them yourself. Use supplied or task-named package-owned public documentation; do not browse package trees. Never inspect package `dist`, framework internals, caches, sibling applications, or undeclared declarations. Exclude `.git`, `.sync-engine` except this prompt, harness/skill configuration, agent traces, parent directories, and unrelated generated output. Ask for context instead of searching outside the grant. Generated files come only from granted commands. Never grantable: `git-mutation`, `dependency-installation`, `framework-internals`, `workflow-management`, `skill-cli-invocation`, `delegation-or-handoff`.

# Guidance

No additional guidance for this phase.

# Context

## Verification task

**.sync-engine/work/private-brain/review-task.md**

Review the changed Graphing, Remembering, Circle and type contracts for the brief. Check per-user isolation, source-linked evidence, determinism/cache/deletion races and text/voice behavior. Report only actionable semantic defects in the changed design. Do not edit files.

## Brief

**.sync-engine/work/private-brain/brief.md**

Unchanged from the prior same-agent context.

## Original finding or routed blocker IDs

**.sync-engine/work/private-brain/2026-10-20T03-08-41Z-critic-contracts.response.md**

## Verdict
Revise

## Assessments

| Obligation | Assessment |
|---|---|
| Authenticated authority | All five Circle endpoints authenticate before protected effects. Owner and corpus come from server-controlled state; callers cannot supply either. |
| Remember and organize | The original closes before extraction; success waits for validated JSON. Failed extraction preserves the original and reserves ownership. The submission token supports deliberate retry without creating another encounter. |
| Voice draft | Authenticated transcription produces editable text without saving. Cancellation, account changes and mode changes invalidate late results. Audio limits and unsupported input have declared refusals. |
| Recall and isolation | Recall receives only the authenticated owner's original corpus. Selected identities and fact indexes are validated; owned-original joins close the visibility obligation before returning cards. |
| Stable repeated results | Query, complete corpus and provider version determine recall identity. First stored selection wins; changed memory changes that identity. |
| Removal | Original erasure precedes graph withdrawal and acknowledgement. Owned-original reads hide the source during the false interval. Repeating the same memory identity closes failed withdrawal; tombstones prevent resurrection. |
| Read surfaces | SavedMemories preserves list order and nullable organization; NeedResults preserves stored selection order. Missing, foreign, removed or stale sources produce no result. |
| Executable inventory | Six static instances; endpoints Remember, Seek, ListMemories, Transcribe and Forget; view OwnedMemory; formers SavedMemories and NeedResults. Each has a typed link, and every Circle endpoint has a matching path. No separate deferred reaction is selected. |
| Bounds and refusal state | The structured-memory bound may be discovered only after recall has organized sources. The resulting refusal currently conflicts with unchanged-state refusal semantics; see PB-01. |

## Findings

**PB-01 — Material: structured-memory limit can refuse after partial effects.**  
`Graphing.recall` promises to enforce the combined original/structured 256 KiB bound before provider calls, but the structured records for missing or outdated sources do not exist until extraction runs. Its success branch first ingests those records and can then discover that the resulting structured memory exceeds the bound. Returning `MEMORY_LIMIT` at that point leaves modified Graphing state despite a declared refusal; the general permission to retain organization after provider faults does not cover this refusal.

Settle this boundary explicitly: establish a sufficient bound before any mutating extraction, or distinguish a later budget failure that permits retained organization from the no-effect `MEMORY_LIMIT` refusal. State when the bound is checked relative to extraction and selection calls so the acknowledgement and retry behavior are realizable.

## Revised candidate context

**.sync-engine/work/private-brain/repair.md**

PB-01 repaired: original/count bounds refuse before effects; a structured limit discovered after organization is an ordinary processing error retaining completed organization, before selection. Graphing and Circle updated consistently.

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
