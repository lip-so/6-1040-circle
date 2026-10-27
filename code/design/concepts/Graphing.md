# Graphing

## Purpose

Organize encounter evidence into private structured contact memory and retrieve relevant saved sources from it.

Graphing owns the stored cards, source revisions, ownership checks, validation and cached recall selections. Its injected `BrainProvider` supplies `extract` and `select`; the shared [provider adapter](../../src/providers/README.md) implements those external calls and pure evidence-validation helpers. The adapter is infrastructure, not another concept, and has no database or persistent user memory. Graphing remains responsible for validating results before storing them.

## Principle

After a user records a note about Mira and ocean sensors, ingest preserves a structured JSON card whose facts quote the current note. After an edit, organization uses the updated text and revision, not the immutable first original. Recall can select Mira for a relevant need using only this user's contact memory. Repeating the same need against unchanged memory reuses the selected sources. Withdrawing a source erases its contact evidence and prevents old ingestion or cached selections from bringing it back.

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
Rule: ContactCard contains nullable name/nameQuote and at most 32 facts with kind, value, quote and optional basis (stated or inferred; missing means stated for older records). Kinds are date, context, role, discussion, contact, offer and other. Validation checks exact object shape, name length up to 200, fact value length up to 500, quotes up to 2,000 characters, supported kinds/basis and case-insensitive name presence in source evidence. Exact quoted fragments are expanded to complete source sentences/lines. Null name requires null nameQuote. Explicitly uncertain alternative names remain null rather than choosing an identity. The contact-v5 prompt version includes this rule and the concise, relationship-aware organization/search instructions and invalidates earlier extraction/selection caches on explicit processing; stored read surfaces remain available without a provider call.
Rule: the provider is instructed to produce short specific values without repeated field labels, group related topics, retain searchable specifics, classify opportunity/referral information by meaning even in Notes/Discussed, preserve direct/indirect and planned/open distinctions, and match query constraints including seasons/years together. It selects the smallest supporting fact set and ranks relevant direct help before referrals.
Rule: the provider is instructed to summarize/paraphrase only this note, mark assumptions inferred, and avoid outside biography, precise occupations from vague papers, and treating discussion as verified expertise/employment. These are interpretation instructions, not a guarantee of semantic correctness. Validation retains original negation/attribution in evidence and filters positive summaries whose quotes contain recognized negation without matching summary negation; it is not a general logical consistency checker. Inferred details are presented as uncertain by the application.
Rule: the provider is instructed to put works on/does/talks about activity in role (displayed as Does) and omit absent fields. Validation drops Not recorded/unknown/n/a values. Date facts must be valid ISO calendar dates. A quote containing exactly one of today/yesterday resolves using referenceDate and calendar arithmetic; if that relative date cannot be resolved, omit the fact. No date is added merely because an anchor exists, and a missing anchor never uses today's search date. The default adapter uses pinned GPT-5.4 with temperature 0.35; validation and repeated-corpus caching remain.
Rule: omitted ingest/_card referenceDate defaults to the empty string (unknown calendar anchor), and omitted revision defaults to zero; omission never means skip revision checking or read another concept. Revision-zero compatibility is considered only for that effective zero revision, an unversioned source and an exact unchanged-content digest. Circle always supplies current owned referenceDate/revision, so edited records cannot enter this compatibility path by omission.
Rule: sourceRevision orders edits. A lower-revision extraction can never replace a higher-revision record. Equivalent concurrent extraction reuses the first committed version; withdrawn markers always win.
Rule: digest identifies the exact current content and referenceDate. Provider version identifies the extraction/search schema, prompt and configured model. Source-local JSON is the durable memory; there is no shared external conversation, remote thread or provider-held per-user memory.
Rule: each stored selection entry contains source identity, fact indexes, content/date digest, providerVersion and a hash of the validated card; it contains no note text or card copy. Recall identity derives from owner, query normalized by trimming/collapsing whitespace and lowercasing, the complete source-ordered corpus digest (including source revisions and cards), and provider version. Concurrent equivalent recalls use the first stored selection.
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
    if content digest and provider version are already current, atomically advance sourceRevision to the incoming revision without another model call, only while owner/active/digest/version still match and no higher sourceRevision exists; a failed guarded update raises an ordinary MemoryChanged fault instead of acknowledging stale evidence
    otherwise request strict structured extraction for this source’s current content and referenceDate only, treating note text as untrusted data
    validate supported names, bounded summaries, full source quotes, basis, calendar dates, kinds, limits and schema before atomically replacing this source's JSON
    commit only if source remains owned, not withdrawn and has no newer sourceRevision; concurrent equivalent extraction reuses the first committed record
    leave Remembering content unchanged; provider/validation faults keep any previous valid evidence and the ownership reservation, return an error and never silently retry or use a local fallback; a newer sourceRevision or changed record during commit gives an ordinary MemoryChanged fault, not a no-effect domain refusal
    returns

recall(owner: User, description: String, notes: String) : returns (recall: Recall)
  where description is blank
  then
    refuses EMPTY_QUERY "Describe the search first."
  where description is not blank and notes is either outside the complete-memory bounds or not a valid current-note corpus
  then
    refuses MEMORY_LIMIT "Contact memory exceeds the supported search limit."
  where description is not blank and notes is a valid bounded current-note corpus
  then
    parse the supplied JSON list of source identities, exact current content, referenceDate and revision, supplied by the application for this owner
    enforce at most 256 entries and 256 KiB of serialized input JSON, including identities and metadata; require unique string source identities, nonblank string content, no unknown keys, optional string referenceDate and optional nonnegative safe-integer revision, refusing before provider calls or state changes rather than silently truncating
    run ingest for every supplied source using the same validation and source guards; current cards use its cache path and revision watermark update, outdated cards are reorganized, and withdrawn sources are skipped; this makes older owned notes available without a global migration
    build a canonical complete JSON memory for only these source identities, excluding withdrawn or digest-mismatched records
    if structured memory exceeds 256 KiB after organization, raise an ordinary processing error before selection; retain completed organization and permit manual retry, never emit the no-effect MEMORY_LIMIT refusal at this late stage
    reuse an existing equivalent owned recall without a model call
    otherwise ask the model for at most five source identities and supporting fact indexes; no account identity, credentials, other-user notes or external conversation state is sent
    validate every chosen identity and index against the supplied memory, reject duplicate sources/indexes or invented choices, and verify each source still has its selected digest/providerVersion/card hash before storing only the selection; changed evidence gives an ordinary MemoryChanged fault
    for recognized hiring queries, require a selected non-inferred offer fact with an explicit positive hiring or recruiting phrase (including looking for interns, recruiting students, seeking candidates, or open positions) and no recognized negation; zero-fact matches require the stored name as a case-insensitive substring of the query; the provider is instructed not to treat discussion as employment/expertise
    preserve the validated model selection order; the prompt requests relevance order and source-identity tie breaking, but the server does not recompute relevance or sort ties; stored repeats reuse that order
    produce an empty selection for an empty corpus without a model call
    provider faults preserve successfully organized records; this concept does not modify Remembering notes or Seeking needs; return an error with manual retry, never fallback or fabricated cards
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
  Return the real source identity as target/source, stored name or Unnamed encounter as label, the stored validated card and a short reason assembled from selected summaries, separated by a middle dot, with inferred claims marked uncertain (or Name match for a name-only selection); exact quotes remain in the returned card and original note. Do not generate a new card during this read. Source-revision/current-content joins are performed separately by Circle; this query checks stored digest/providerVersion/card hash, not Remembering or an independently stored selection revision.
  Preserve the stored selection order. Unknown/foreign recalls, erased recalls and empty selections return no rows. No external calls or state changes.
```
