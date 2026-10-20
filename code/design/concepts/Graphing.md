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
  an optional card ContactCard

a set of Withdrawn Sources

a set of Recalls with
  an owner User
  a corpusDigest String
  a selection Selection

Rule: source owner is immutable, including while extraction is pending or failed. Sources never share a contact identity merely by matching names.
Rule: ContactCard is validated JSON containing one primary name and nameQuote (both nullable), and at most 32 facts with kind, value and quote. Kinds are context, role, discussion, contact, offer and other. Names/values are literal source text; quotes are complete supporting source sentences or guided lines. Unsupported, negated and ambiguous claims are omitted, never invented. Null name is valid. A literal partial nameQuote may be deterministically expanded to its complete enclosing original sentence or line before validation/storage; no model words are added. Fact quotes still must be complete. Explicit habitual activity uses role/Does with literal wording; a conversation with the user uses discussion/Discussed. Vague activity never implies a more specific occupation or expertise. Encounter date is optional and never invented.
Rule: digest identifies the exact original content. Provider version identifies the extraction/search schema, prompt and configured model. Source-local JSON is the durable memory; there is no shared external conversation, remote thread or provider-held per-user memory.
Rule: selection stores only source identities, their exact record digests and fact indexes, never original text or generated card content. Recall identity derives from owner, normalized query, complete ordered corpus and provider version. Concurrent equivalent recalls use the first validated stored selection.
Rule: Withdrawn sources retain only owner and identity/classification. They have no card, digest, facts, quotes or labels. Withdrawal also erases the owner's cached recalls. Reads always include owner in their database query.
```

## Actions

```actions
ingest(owner: User, source: Source, content: String) : returns ()
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
    if content digest and provider version are already current, return without another model call
    otherwise request strict structured extraction for this original only, treating note text as untrusted data
    validate names, exact values, full quotes, kinds, limits and schema before atomically replacing this source's JSON
    commit only if source remains owned and not withdrawn; concurrent equivalent extraction reuses the first committed record
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
    parse the supplied JSON list of source identities and exact originals, supplied by the application for this owner
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
_card(owner: User, source: Source, content: String) : one (card: ContactCard)
  Return the validated contact JSON only if the source belongs to owner, is not withdrawn and matches the exact content digest. Otherwise return card as null. No model call or state change.

_matches(owner: User, recall: Recall) : many (target: Source, label: String, source: Source, reason: String, card: ContactCard)
  Read only the owned recall and owned current sources referenced by it. Omit withdrawn, missing or version/digest-mismatched sources.
  Return the real source identity as target/source, stored name or Unnamed encounter as label, its validated card and a deterministic reason assembled from the selected literal facts/quotes. Never return a model-authored card.
  Preserve the stored selection order. Unknown/foreign recalls, erased recalls and empty selections return no rows. No external calls or state changes.
```
