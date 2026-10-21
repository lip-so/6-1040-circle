# Role and objective

Work unit `p3-encounter-editing`; role `critic`; phase `implementation`.

# Implementation review

Independently check implemented behavior against the approved contracts and obligations. Use supplied changed source and tests, a supplied diff, or granted paths. Check effect ownership, acknowledgement order, refusal paths, authorization enforcement, and test adequacy.

Report only blocker or material findings with stable IDs. Do not edit source, prescribe design, or infer missing context.

# Access

Root: "/private/tmp/circle-p3-edit/code". The short native message explicitly authorizes reading this prompt file; all assignment context is inline below. This is already a compiled role assignment: do not load a skill, workflow, harness guide, or another instruction file.

- Read: `application:frontend/src` ("/private/tmp/circle-p3-edit/code/frontend/src"), `application:generated/wire.ts` ("/private/tmp/circle-p3-edit/code/generated/wire.ts"), `application:src` ("/private/tmp/circle-p3-edit/code/src"), `application:tests` ("/private/tmp/circle-p3-edit/code/tests").
- Write: none.
- Tools: `repository-read`.
- Shell: `project-validation`; network: no; generated output: no; long-running processes: no.

Inspect only listed files or directories. In coordinator simulation, this grant binds the coordinator itself; broader coordinator access and prior discovery are unavailable to the assignment. Project checks may transitively read other project files, but do not inspect them yourself. Use supplied or task-named package-owned public documentation; do not browse package trees. Never inspect package `dist`, framework internals, caches, sibling applications, or undeclared declarations. Exclude `.git`, `.sync-engine` except this prompt, harness/skill configuration, agent traces, parent directories, and unrelated generated output. Ask for context instead of searching outside the grant. Generated files come only from granted commands. Never grantable: `git-mutation`, `dependency-installation`, `framework-internals`, `workflow-management`, `skill-cli-invocation`, `delegation-or-handoff`.

# Guidance

# Framework use

Implement from supplied public references, named package-owned public documentation or examples, generated caller contracts, and ordinary project diagnostics. Do not browse package trees for alternatives.

Never inspect package `dist`, framework internals, runtime exports, caches, sibling applications, or declarations not explicitly supplied as public context. Never import from `node_modules/` or `dist/` paths. A diagnostic may name an internal file; use the diagnostic without opening it.

Repair ordinary diagnostics through the project checks. When supplied material does not determine the next API shape, try at most one directly supported repair, then report a context or design blocker instead of trying speculative variants.

---

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

---

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

---

# Composition declarations

`@mit-sdg/sync-engine/language` declares reactions, views, formers and computations;
`@mit-sdg/sync-engine/boundary` declares endpoints. Declaration does not execute:
`assemble` from `@mit-sdg/sync-engine/assembly` registers what these produce.

Import an approved specification through the `@design` alias, which the installed
`tsconfig.json` maps to the design root: `import spec from "@design/concepts/Name.md" with
{ type: "text" }`. `generated.config.ts` lists only the application documents,
`design/types.md` and `design/compositions/*.md`, as URLs written
`new URL("./design/types.md", import.meta.url)`. Concept specifications enter through
`registerConcept({ spec })` and are never listed there; the application-design loader
rejects a concept file with "types fence accepts only `concrete Name` declarations".

## Reactions

`reaction`, `when`, `where`, `returned`, `refused`, `no`, `whether`, `earlier`, `now` and
`is` come from `@mit-sdg/sync-engine/language`.

```ts
reaction(({ author, post }) =>
  when(Posting.publish({ author }).responds({ post })).then(Indexing.add({ item: post })),
);
```

- A trigger is one callable action line or one outcome channel, followed by optional
  `.where(...)` conditions and `.then(...)` consequences. `action(input)` alone matches the
  request; `.responds(output?)` and `.refuses(output?)` match the outcome.
- `returned(pattern?, { by?, except?, exceptBy? }?)` and `refused(...)` match an action's
  outcome and may be the trigger themselves, as in
  `when(returned({ post }, { by: "Posting.publish" }))`. `where(...)` takes conditions;
  `no(readLine)` and `whether(readLine)` test one.
- `earlier(action, input, output?)` refers to a prior occurrence.
- `now(variable)` binds the instant stamped on this flow's outermost occurrence, so every
  reaction in one flow reads one time and a caller can author none. Pass that variable to
  each action needing the instant; never model a clock as a concept.
- `is.lt`, `is.le`, `is.gt`, `is.ge`, `is.among` compare.
- `.afterFlowSettles()` may follow `when(trigger)` or a completed stage, then `.then(step)`
  or `.where(...).then(step)`. A chained deferred stage accepts condition lines only.

Each composition module exports one `composition` record of named groups, and `assemble`
receives those records keyed by module:

```ts
export const composition = { Publishing: { PublishPost, IndexOnPublish } };
```

An authored link names the same three parts: `reaction:Board.Publishing.IndexOnPublish`
requires module `Board`, group `Publishing` and declaration `IndexOnPublish`. Read the
approved design's links and use those exact names; `MISSING_COVERAGE` reports a selected
declaration no link names.

## Views, formers and computations

`view`, `former`, `form`, `each`, `count` and `compute` come from the same subpath.

```ts
view(name, (input, output, free) => where(...)).holds();
view(name, (input, output, free) => where(...)).one();
former(name, (input, free) => form({ ...shape }));
former(name, (input, free) => where(...).form({ ...shape }));
```

- A view's `.holds()`, `.one()`, `.optional()`, or `.many()` follows the closing
  `view(...)`; it is never called on `where(...)`.
- Builders receive binding bags. Reading a property, including by destructuring, declares a
  stable logic variable in that partition. Bind query outputs with `.is({ ... })`; do not
  destructure the query call itself:

  ```ts
  const targetFor = view("target for (code)", ({ code }, { target }, _free) =>
    where(Shortening._resolve({ code }).is({ target })),
  ).one();
  ```

  Completed views and formers take one object-shaped input mapping.

- A view with no output binding is a predicate and ends in `.holds()`. A view that binds
  output rows returns `.many()` by default and may state `.one()` or `.optional()` instead.
  Stacked `where` blocks are alternatives, and local bindings do not escape the view.
- `each(readLine).where(...).arranged(...)` then a consumer:

| Consumer           | Result                                     | Empty selection |
| ------------------ | ------------------------------------------ | --------------- |
| `.form({ ... })`   | one record per row                         | `[]`            |
| `.count()`         | number of rows                             | `0`             |
| `.first(value)`    | value from the first row after arrangement | `null`          |
| `.distinct(value)` | first-seen distinct values                 | `[]`            |

- A `form({ ...shape })` entry may be a bound variable, another formed node, or portable
  JSON literal data. Use literals directly for constant fields and structures; do not add a
  computation solely to produce a constant. Functions, symbols, `undefined`, non-finite
  numbers, class instances, and cyclic values are not portable literals.
- `form({ ...shape }).splicing(...formerUses)` merges record-rooted fragments into a host
  record. Every variable a fragment input references must already be bound, and fragment
  keys must not collide with host or earlier-fragment keys. A plain optional fragment drops
  the host row when absent; `whether(...)` keeps it and fills its leaves with `null`.
- `count(query, input, outputVariable)` requires one non-union query reference and its
  complete input mapping; undeclared fields are rejected recursively.
- `compute(named, input, output)` is a condition line inside `where(...)`. It runs a pure
  function supplied as `conceptSet`'s optional second argument and exposed as
  `set.computations`; it never takes a bare function. The function receives only its input
  record and must not read concept instances, `implementations()` results, or module-level
  mutable state. A computation that needs state is a design error to block on. A variable
  output binds the complete result. For a record-shaped, non-array result, an object output pattern binds or tests
  several fields, including nested fields, and each variable remains wire-traceable through
  its return-type path. Write
  `conceptSet({ ... }, { describe: ({ value }) => ({ label: String(value), rank: 1 }) })`,
  then `compute(set.computations.describe, { value }, { label, rank })`. A no-input
  computation uses `{}`. `is` exposes `.lt`, `.le`, `.gt`, `.ge`, and `.among`; test a
  computed boolean with `is.among(live, [true])` or `is.among(live, [false])`. Build the
  computation record before the set; references from separate sets do not mix.
- A query's `"one" | "optional" | "many"` promise links to a record return for `"one"` and
  an array of records otherwise, at type level and at runtime.

## Endpoints

`endpoint`, `receive` and `respond` come from `@mit-sdg/sync-engine/boundary`.

An endpoint is itself a selected reaction. Its design carries both a `reaction:` link and
an `endpoints` entry with the same module, group, and declaration name:

```text
Publishing a post [enters the application](reaction:Board.Publishing.PublishPost).
```

```endpoints
Board.Publishing.PublishPost at /board/post
```

Use that exact identity and path in the declaration and placement:

```ts
const PublishPost = endpoint(
  "/board/post",
  ({ author, content, post }) =>
    receive({ author, content })
      .then(Posting.publish({ author, content }).responds({ post }))
      .then(respond({ post })),
  { input: { required: ["author", "content"] } },
);

export const composition = { Publishing: { PublishPost } };
```

and register that composition under its linked module:

```ts
assemble({
  conceptSet: applicationConceptSet,
  instances: applicationConceptSet.implementations(),
  composition: { Board: composition },
});
```

Do not wrap the endpoint in another reaction. Do not declare an endpoint unless its exact
reaction link and endpoint entry exist in approved design. Conversely, every selected
public endpoint must have both before implementation begins.

- Paths must be canonical absolute URL pathnames that survive WHATWG pathname handling
  unchanged. Queries, fragments, scheme-relative paths, dot segments, malformed percent
  escapes, literal spaces and literal Unicode are rejected.
- `receive(...)` cannot author `path` or `requestId`; `respond(...)` cannot author
  `requestId` or `errorKind`.
- A stage may state `.afterFlowSettles()` to form its response at a settlement frontier; add
  conditions identifying the terminal state the endpoint requires.
- Sibling answers are alternatives, not ordered fall-through: an unconditional sibling
  overlaps every conditional one, and an endpoint records at most one answer. Give each
  branch a condition that excludes the others. Branching on whether an optional input was
  supplied needs a declared computation; if the design declares none, block rather than
  invent one.
- A binding produced by a state read belongs to the stage that consumes it. It does not
  safely cross an intervening action. Consume it before the action, return it from an
  owning action, or read it again in the later stage.
- Validators are explicit: `input`, `output` and `domainError`, each returning
  `{ ok: true } | { ok: false; detail?: string }` synchronously, at most once per path. The
  domain-error validator receives the response's top-level `error`. Generated types carry no
  runtime schema semantics.
- `InputContractDecl` takes `required` (a missing listed key returns `INVALID_INPUT`) and
  `defaults` (filled only when a key is absent). Without one, assembly intersects the keys
  every exported `receive(...)` for that path mentions. An explicit contract replaces that
  rather than merging, and only one may declare it per path. It must leave one `receive`
  alternative reachable: every key that alternative mentions is `required` or carries a
  matching default, or assembly refuses the path. A second alternative differing only by
  an omitted key is the invention the sibling rule forbids.

# Context

## Review task

**.sync-engine/work/p3-encounter-editing/implementation-task.md**

Review implementation and tests for the final P3 contracts. Focus on edit revision/CAS and same-token recovery, original preservation/removal, sourceRevision races including cached A→B→A, current-card freshness, owner isolation, date anchors, source-supported summaries, and frontend edit/entry/cancellation behavior. Look for material bugs or missing major regression coverage, not style. Do not edit files or run network calls. Supplied evidence: 115 tests/633 assertions pass, types/spec/artifacts/Vue/build pass; real provider passed only newly synthetic role/date examples; synthetic UI verified edit prefill/cancel/save and narrow layout. User examples stay in local tests following a rejected external transmission.

## Brief

**.sync-engine/work/p3-encounter-editing/brief.md**

# P3 entry, editing and interpretation

## Goal
Finish requested P3 behavior: equal Text/Voice/Form, form-only LLM-prefilled editing, collapsed original personal notes, mobile layout, concise README, consistent concepts and regression coverage. Interpret short lowercase names and works-on activity, omit missing values, resolve today/yesterday and use a stronger moderately varied model with source-grounded summaries and marked uncertainty.

## Active decisions
- User explicitly supersedes earlier no-edit/no-inference/no-relative-date rules. Six concepts, Commons auth and private source-linked recall remain; no deferred recommendation/lifecycle features.
- Keep immutable first original separately from editable current form content. Revision CAS and per-edit submission token prevent lost updates and retry duplicates. Delete erases both; sourceRevision prevents delayed extraction from overwriting newer edits.
- Timezone comes from the browser (validated IANA), default America/New_York for older callers. Server time anchors referenceDate on first save/edit. Retry keeps that date. Today/yesterday use calendar arithmetic, never the later search day; missing legacy capture time stays unknown.
- Provider default moves from GPT-5.4-mini to pinned GPT-5.4, temperature 0.35 with supported reasoning none. Values may summarize; assumptions marked inferred. Full source evidence and actual result-ID validation remain. No external knowledge about famous names.
- Equal Text/Voice/Form selector, existing shared typed/voice draft and separate form draft. Edit opens a separate form dialog prefilling stored LLM JSON, explicitly organizes old/unprocessed record first, never auto-saves.
- Independent contract critic, coordinator implementation, focused independent implementation review if useful. Isolated staging and guarded apply preserve manual edits, .env and existing user data.

## Done when
- Authenticated prepare-edit/edit and existing endpoints agree with concept specs/generated types; no legacy active behavior conflicts.
- Both David regressions, works on, summaries, relative date boundaries, timezone/retries, foreign-user edit, revision conflicts, provider failures, delete/edit/stale-ingest races and persistence have meaningful tests.
- Text/Voice/Form, prefilled editing/cancel, nested collapsed notes and mobile layout work in browser; no unknown-value placeholder clutter.
- Checks/tests/build pass, real synthetic provider validation succeeds, README describes P3 concisely, local app restarted without deleting user data.

## Activity
- Inspected prior short-name fix/current auth/composition and read official model/parameter docs; prepared contracts.
- Implementation preserves optional date/revision inputs for older direct callers; HTTP defaults timezone explicitly. Added current-revision checking to _card and a bounded read compatibility rule for unchanged revision-zero v1/v2 JSON, so existing saved cards stay visible without exposing stale edited evidence. These query-surface changes warrant final contract review.
- Calendar/summary/role examples passed real OpenAI with newly created synthetic contacts only, using pinned GPT-5.4 at temperature 0.35/reasoning none. Automatic approval review rejected repeating the reported real-note payloads; those remain local regression fixtures. No workaround or existing-note transmission was used.
- 115 tests/633 assertions pass, including edit failure+same-token recovery, isolation/conflicts, stale result joins, cached A→B→A revision races, day/timezone/DST boundaries, no placeholders, original persistence/removal and previous-record compatibility. Backend/spec/artifact/types and Vue typecheck pass.
- Synthetic browser verified prefilled edit, cancel, saved changes, equal Text/Voice/Form and collapsed personal notes. Narrow viewport checks measured no horizontal overflow, equal 46px entry buttons, stacked form fields and a scrollable dialog fitting the viewport. Physical microphone capture not exercised; existing cancellation tests and prior synthetic transcription remain evidence.

## Relevant contracts

**design/compositions/Circle.md**

# Circle

All protected effects authenticate Sessioning.use from the host cookie before reading user data or calling a provider. Bodies cannot select owner, original, referenceDate, corpus, provider credentials or arbitrary indexing sources. Concepts remain independent; composition coordinates them. Six existing static instances and type bindings remain.

The [owned original](view:Circle.OwnedMemory) reads Remembering._record under owner/memory. Missing, foreign or removed records produce no row. It exposes current content, immutable original, revision and referenceDate. The [saved encounters](former:Circle.SavedMemories) preserves Remembering._list order and joins this owned record with Graphing._card for its exact content/referenceDate and explicit current revision from the owned record. Rows include memory/content/original/revision/referenceDate/card, with nullable card on processing failure. Twenty rows plus lookahead retain paging. List is read-only and never invokes a model.

The [list endpoint](reaction:Circle.ListMemories) authenticates and accepts after. The [remember endpoint](reaction:Circle.Remember) accepts content/submission and optional timeZone (default America/New_York), authenticates and saves exact content with engine time. Timezone must be an IANA timezone; neither timestamp nor referenceDate is caller-authored. The owned read then supplies content/referenceDate/revision to Graphing.ingest; success waits for organization. A retry of the same token/content reuses the original and its original reference date. A conflicting/removed token refuses SUBMISSION_CONFLICT. Provider failure keeps saved text visible and permits deliberate retry. No compensating deletion, automatic model retry or local inference fallback.

The [transcription endpoint](reaction:Circle.Transcribe) authenticates audio/mediaType before Remembering.transcribe. Audio is ephemeral, canonical bounded base64 (4 MiB/two-minute capture); unsupported/malformed audio refuses INVALID_AUDIO. Result text is editable and never auto-saved. Text, Voice and Form are equal entry choices. Changing mode cancels recording/pending transcription and preserves drafts. Account changes/unmount invalidate late responses and stop microphone tracks.

The [prepare edit endpoint](reaction:Circle.PrepareEdit) authenticates memory, reads its owned record, explicitly organizes it at the existing revision if needed, then returns the current owned record and matching card. Missing/removed/foreign memory refuses MEMORY_NOT_FOUND before provider work. This supplies LLM-prefilled form fields, not a text or voice editor. No edit occurs on open/cancel. The [edit endpoint](reaction:Circle.Edit) accepts memory/content/submission/revision plus optional timeZone, authenticates and calls Remembering.edit, then reads the resulting current record and ingests it. Same-token unchanged retries acknowledge an already applied edit even if the old revision is stale; reused-token changed content and genuinely stale revisions refuse EDIT_CONFLICT. Current content is the user-reviewed form; first original is preserved. Success waits for reorganization. Processing failure preserves the edit and permits same-token retry. Deletion cannot be undone by an edit or delayed extraction.

The [seek endpoint](reaction:Circle.Seek) authenticates, saves the need and passes only Remembering._corpus for owner into Graphing.recall. Corpus contains current content/referenceDate/revision. Missing/outdated owned organization is repaired only on explicit search/prepare edit/save. Bounds refuse before mutating extraction; late structured overflow is an ordinary error retaining completed organization and stopping before selection. No truncation. Provider requests use store:false, strict schema, no conversation state and no account credentials. A stronger model may paraphrase or make marked uncertain inferences; actual IDs, source quotes and ownership remain validated. Same query/corpus/provider configuration reuses its stored selection.

The [need results](former:Circle.NeedResults) reads an owned need and owned recall matches, then joins the current OwnedMemory and Graphing._card again with the explicit current owned revision for exact content/referenceDate equality with the selected card. Edited, withdrawn, missing, unreadable or stale sources are omitted even during processing. Return real source IDs/card and exact original/current notes; no model-authored database records or cross-user context. Empty matches remain an empty suggestions list. Edit invalidates displayed stale suggestions and pending list replies.

The [forget endpoint](reaction:Circle.Forget) authenticates memory, erases Remembering original/current content first and withdraws Graphing evidence/caches next, acknowledging after both. Original/graph markers block stale save/edit/ingest resurrection. The final owned join hides old evidence in the false interval; failed cleanup is manually retryable with the same identity. Missing/foreign removal is MEMORY_NOT_FOUND, repeated owned cleanup succeeds.

Contact rows remain plain white with name, edit button and red basket. Empty values and Not recorded placeholders are omitted. Expanded cards show useful details; inferred details are visibly uncertain. Personal notes are a separately labeled nested disclosure, collapsed even when the card opens; heading uses the same 14px size as note text. Editing uses an accessible form dialog with LLM-prefilled Person/When/Does/Discussed/Contact/Notes fields and explicit Save changes/Cancel. No changes on cancel; conflicting edits ask to reopen rather than overwrite. Removal confirmation stays Cancel-focused, named, keyboard accessible and exactly once.

Remember has equal Text / Voice / Form controls, a centered Save, current fonts and hover-only artwork. Form does not require a date; structured fields become readable current content. Text/voice drafts persist across mode switches; editing has a separate draft. Layout adapts to narrow mobile screens, wraps long content, uses comfortably sized buttons and scrollable dialogs without horizontal overflow. Pending save/search/edit/removal/transcription guards prevent double submission. Errors honestly preserve saved data and draft tokens. Sensitive content, audio, originals, summaries, fields, and credentials remain redacted from traces.

```endpoints
Circle.Remember at /memories/remember
Circle.Seek at /needs/seek
Circle.ListMemories at /memories/list
Circle.Transcribe at /memories/transcribe
Circle.PrepareEdit at /memories/prepare-edit
Circle.Edit at /memories/edit
Circle.Forget at /memories/forget
```

**design/concepts/Graphing.md**

# Graphing

## Purpose

Organize encounter evidence into private structured contact memory and retrieve relevant saved sources from it.

## Principle

After a user records a note about Mira and ocean sensors, ingest preserves a structured JSON card whose facts quote that note. Recall can select Mira for a relevant need using only this user's contact memory. Repeating the same need against unchanged memory reuses the selected sources. Withdrawing a source erases its contact evidence and prevents old ingestion or cached selections from bringing it back.

## Types

```types
external User
external Source
opaque ContactCard
opaque Selection
```

## State

```state
a set of Sources with
  an owner User
  an optional digest String
  an optional providerVersion String
  an optional sourceRevision Number
  an optional card ContactCard

a set of Withdrawn Sources

a set of Recalls with
  an owner User
  a corpusDigest String
  a selection Selection

Rule: source owner is immutable, including while extraction is pending or failed. Sources never share a contact identity merely by matching names.
Rule: ContactCard contains a source-supported nullable name/nameQuote and up to 32 facts with kind, value, quote and optional basis (stated or inferred; missing means stated for old records). Kinds include date, context, role, discussion, contact, offer and other. Values may summarize/paraphrase evidence; inferred conclusions must be marked inferred and shown as uncertain. Never infer a precise occupation from vague papers or convert discussion to verified employment/expertise/hiring. Names may normalize case but must appear in the source. Complete source quotes are canonicalized from exact quoted fragments and retain negation/attribution. A complete quote is evidence, not proof that the model interpreted it correctly. No outside biography or other-user facts.
Rule: explicit works on/does/talks about activity belongs in Does. Missing fields are omitted. Date facts use ISO calendar dates. Today/yesterday resolve from referenceDate with calendar arithmetic, including timezone/DST/year boundaries; a note without date wording need not have a date. Missing legacy referenceDate never uses today's search date. The default provider is a stronger configured model with modest sampling; source/schema/ID validation and repeated-corpus caching remain.
Rule: omitted ingest/_card referenceDate defaults to the empty string (unknown calendar anchor), and omitted revision defaults to zero; omission never means skip revision checking or read another concept. Revision-zero compatibility is considered only for that effective zero revision, an unversioned source and an exact unchanged-content digest. Circle always supplies current owned referenceDate/revision, so edited records cannot enter this compatibility path by omission.
Rule: sourceRevision orders edits. A lower-revision extraction can never replace a higher-revision record. Equivalent concurrent extraction reuses the first committed version; withdrawn markers always win.
Rule: digest identifies the exact current content and referenceDate. Provider version identifies the extraction/search schema, prompt and configured model. Source-local JSON is the durable memory; there is no shared external conversation, remote thread or provider-held per-user memory.
Rule: selection stores only source identities, their exact record digests and fact indexes, never original text or generated card content. Recall identity derives from owner, normalized query, complete ordered corpus and provider version. Concurrent equivalent recalls use the first validated stored selection.
Rule: Withdrawn sources retain only owner and identity/classification. They have no card, digest, facts, quotes or labels. Withdrawal also erases the owner's cached recalls. Reads always include owner in their database query.
```

## Actions

```actions
ingest(owner: User, source: Source, content: String, referenceDate?: String, revision?: Number) : returns ()
  where content is blank
  then
    refuses EMPTY_SOURCE_CONTENT "Source content must not be blank."
  where source is present and its owner differs from owner
  then
    refuses SOURCE_NOT_OWNED "The source belongs to another user."
  where source is in Withdrawn and source.owner is owner
  then
    refuses SOURCE_WITHDRAWN "The source was withdrawn."
  where source is absent or belongs to owner outside Withdrawn, and content is not blank
  then
    reserve source ownership without changing existing evidence
    if content digest and provider version are already current, atomically advance sourceRevision to the incoming revision without another model call, only while owner/active/digest/version still match and no higher sourceRevision exists; a race rechecks current state instead of acknowledging stale evidence
    otherwise request strict structured extraction for this original only, treating note text as untrusted data
    validate supported names, bounded summaries, full source quotes, basis, calendar dates, kinds, limits and schema before atomically replacing this source's JSON
    commit only if source remains owned, not withdrawn and has no newer sourceRevision; concurrent equivalent extraction reuses the first committed record
    leave the original outside this concept unchanged; provider faults keep any previous valid evidence and the ownership reservation, return an error and never silently retry or use a local fallback
    returns

recall(owner: User, description: String, notes: String) : returns (recall: Recall)
  where description is blank
  then
    refuses EMPTY_QUERY "Describe the search first."
  where notes exceeds the complete-memory bounds or is not a valid original-note corpus
  then
    refuses MEMORY_LIMIT "Contact memory exceeds the supported search limit."
  where description is not blank and notes is a valid bounded corpus
  then
    parse the supplied JSON list of source identities, exact current content, referenceDate and revision, supplied by the application for this owner
    enforce at most 256 originals and 256 KiB of original corpus, refusing before provider calls or state changes rather than silently truncating
    ingest missing or outdated owned records using the same validation and source guards; this makes older owned originals available without a global migration
    build a canonical complete JSON memory for only these source identities, excluding withdrawn or digest-mismatched records
    if structured memory exceeds 256 KiB after organization, raise an ordinary processing error before selection; retain completed organization and permit manual retry, never emit the no-effect MEMORY_LIMIT refusal at this late stage
    reuse an existing equivalent owned recall without a model call
    otherwise ask the model for at most five source identities and supporting fact indexes; no account identity, credentials, other-user notes or external conversation state is sent
    validate every chosen identity and index against the supplied memory, reject duplicates or invented choices, and verify source versions again before storing only the selection
    require explicit offer evidence for hiring; discussion never proves employment or expertise; name-only matches require literal name support
    order validated matches by relevance selection order then stable source identity, and preserve stored order on repeats
    produce an empty selection for an empty corpus without a model call
    provider faults preserve saved originals, successfully organized records and the saved need; return an error with manual retry, never fallback or fabricated cards
    returns recall

withdraw(owner: User, source: Source) : returns ()
  where source is present and its owner differs from owner
  then
    refuses SOURCE_NOT_OWNED "The source belongs to another user."
  where source is absent or belongs to owner
  then
    retain only source identity and owner and classify it as Withdrawn
    erase all of its contact JSON and evidence, and erase the owner's cached recalls
    keep withdrawal durable so delayed ingestion cannot recreate evidence
    repeated withdrawal succeeds; a downstream failure may be manually retried with the same source
    returns
```

## Queries

```queries
_card(owner: User, source: Source, content: String, referenceDate?: String, revision?: Number) : one (card: ContactCard)
  Return the validated contact JSON only if the source belongs to owner, is not withdrawn and matches the exact content/referenceDate digest and current revision. For unedited revision zero only, a previous contact-v1/v2 record with no sourceRevision may use its exact-content digest to keep existing cards readable; it cannot satisfy an edited revision. Otherwise return card as null. No model call or state change.

_matches(owner: User, recall: Recall) : many (target: Source, label: String, source: Source, reason: String, card: ContactCard)
  Read only the owned recall and owned current sources referenced by it. Omit withdrawn, missing or version/digest-mismatched sources.
  Return the real source identity as target/source, stored name or Unnamed encounter as label, its validated card and a deterministic reason assembled from the selected stored summaries/quotes with inferred claims marked uncertain. Never return a model-authored card.
  Preserve the stored selection order. Unknown/foreign recalls, erased recalls and empty selections return no rows. No external calls or state changes.
```

**design/concepts/Remembering.md**

# Remembering

## Purpose

Prevent the context of an encounter from being lost before the user has a reason to revisit it.

## Principle

If a user records an encounter in their own words, they can later retrieve that account and recover what they discussed. If they remove that encounter, its original text is erased and cannot be retrieved or recreated by retrying the old save.

## Types

```types
external User
```

## State

```state
a set of Memories with
  an owner User
  an optional content String
  an optional capturedAt DateTime
  an optional original String
  an optional referenceDate String
  an optional revision Number
  an optional editSubmission String

a set of Removed Memories

Rule: only Memories outside Removed have content. Removing an encounter erases its content while retaining its owner and identity to reject stale save retries.
Rule: new memories use an identity derived from owner and submission. Names and note text are not identities. A different submission creates a separate encounter, even for the same person or the same text.
Rule: older memories may have no capturedAt; do not invent their save times. Revision defaults to zero. Original text is immutable after first capture; an edit changes current content but keeps original as the first captured text. referenceDate is a calendar date derived from server capturedAt and a validated IANA timezone (default America/New_York for older callers); relative dates never depend on a later search day.
Rule: guided memo content may include optional contact information such as a phone number or LinkedIn URL. Keep it with the original account; existing memories without it remain valid.
```

## Actions

```actions
remember(owner: User, content: String, submission: String, capturedAt: DateTime, timeZone?: String) : returns (memory: Memory)
  where content is blank (empty or whitespace-only)
  then
    refuses EMPTY_CONTENT "Encounter content must not be blank."
  where content is not blank and owner and submission identify an existing memory that is in Removed or has different content
  then
    refuses SUBMISSION_CONFLICT "This save token cannot be reused for this encounter."
  where content is not blank and owner and submission identify an existing memory outside Removed with the same content
  then
    keep that memory and leave its content and capturedAt unchanged
    returns memory
  where content is not blank and owner and submission do not identify an existing memory
  then
    create a memory with owner, the exact supplied content, capturedAt and its referenceDate in timeZone
    returns memory

forget(owner: User, memory: Memory) : returns ()
  where memory is not in Memories or memory.owner is not owner
  then
    refuses MEMORY_NOT_FOUND "Encounter not found."
  where memory is in Memories and memory.owner is owner
  then
    add memory to Removed if it is not already present
    erase memory.content, original, referenceDate, revision, editSubmission and capturedAt
    keep its owner and identity so repeated removal succeeds and an old save cannot recreate it
    returns

inspect(owner: User, memory: Memory) : returns (content: String, original: String, revision: Number, referenceDate: String)
  where memory is absent, removed or not owned by owner
  then
    refuses MEMORY_NOT_FOUND "Encounter not found."
  where memory is live and owned
  then
    leave state unchanged and expose the current owned record fields with the same defaults as _record
    returns content, original, revision, referenceDate

edit(owner: User, memory: Memory, content: String, submission: String, revision: Number, capturedAt: DateTime, timeZone?: String) : returns (memory: Memory)
  where memory is absent, removed or not owned by owner
  then
    refuses MEMORY_NOT_FOUND "Encounter not found."
  where content is blank
  then
    refuses EMPTY_CONTENT "Encounter content must not be blank."
  where memory is live and owned, content is not blank and its last editSubmission is submission with identical current content
  then
    leave the already applied edit unchanged
    returns memory
  where memory is live and owned, content is not blank and its revision differs or its last editSubmission is submission with different content
  then
    refuses EDIT_CONFLICT "The encounter changed. Reopen it before editing."
  where memory is live and owned, content is not blank, revision matches and submission is new
  then
    atomically replace current content, increment revision and record editSubmission
    preserve first original text, owner, identity and initial capturedAt; set referenceDate from this edit time and validated timeZone
    deletion wins over an overlapping edit and a stale revision cannot overwrite a later edit
    returns memory

transcribe(audio: String, mediaType: String) : returns (content: String)
  where audio is not canonical nonempty base64, decoded audio exceeds 4 MiB, or mediaType is unsupported
  then
    refuses INVALID_AUDIO "The recording could not be accepted."
  where audio and mediaType are supported
  then
    send only the recording to the configured transcription provider
    produce bounded editable text without saving a memory or retaining the recording
    provider failure is an error with no automatic retry or fabricated transcript
    returns content
```

## Queries

```queries
_get(owner: User, memory: Memory) : optional (content: String)
  Return the content if memory exists, belongs to owner, and is not in Removed.
  Return no row otherwise.

_list(owner: User, after: String) : many (memory: Memory, content: String)
  Read only owner's memories outside Removed, including notes that have no graph matches or failed indexing.
  An empty after starts at the beginning; otherwise continue after that owned memory.
  Return no rows if a nonempty cursor is missing, removed, or is not owned by owner.
  Order by capturedAt descending, with memory identity ascending to break ties. Memories without a capturedAt follow dated saves, ordered by identity; their actual save order is unknown.
  Return at most 21 rows. The frontend displays 20 and uses the extra row to detect another page, continuing after the last displayed memory.
  Cursor paging keeps older rows reachable when a newer memory is inserted between page requests.
  Return no rows for an empty page. Never merge matching names or identical content.

_record(owner: User, memory: Memory) : optional (content: String, original: String, revision: Number, referenceDate: String)
  Read only the owned nonremoved record. Return current content, immutable original (content for unedited records), revision (zero for older records) and referenceDate (derived from capturedAt in the default timezone for older records, empty if no timestamp). Missing/foreign/removed produces no row.

_corpus(owner: User) : one (notes: String)
  Read only owner's nonremoved originals and serialize source identity/content/referenceDate/revision records as canonical JSON ordered by identity.
  Read at most 257 originals so Graphing can refuse more than the complete 256-note supported memory rather than truncate it. An empty account returns an empty JSON list. Never include removed or another owner's originals.

```

## Changed source and tests

**.sync-engine/work/p3-encounter-editing/changed-source.md**

Changed paths under the read grant: src/calendar.ts, execution.ts, concepts/Remembering.ts, Graphing.ts, brain-provider.ts, compositions/Circle.ts and inputs.ts, concepts.ts, assembly.ts, host/http.ts, main.ts, memory-fields.ts. Frontend App.vue, encounter-form.ts, memory-summary.ts, reusable/EncounterFields.vue, EditEncounter.vue, ContactRow.vue, ActionIcon.vue, style.css. Tests: concepts/calendar, Graphing, Remembering, BrainProvider; compositions/Circle and authenticated-flows; UI memory-fields, memory-summary, recent-people and existing voice/confirmation guards. Prepare/edit endpoints and optional timeZone are new; current/original and revision/date metadata are returned. No dependency upgrades.

# Result

Unless the task requests another format, return these headings in order. Omit progress narration.

- `## Verdict` — required. First line is exactly `Approve`, `Revise`, or `Blocked`.
- `## Assessments` — required. Compact contract-by-contract or obligation-by-obligation conformance assessment.
- `## Findings` — required. Stable-ID blocker or material findings, or none.
