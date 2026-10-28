# Graphing

## Purpose

Organize source evidence into private contact cards and retrieve relevant saved sources.

Implementation: [Graphing.ts](../../src/concepts/Graphing.ts). Provider rules: [adapter](../../src/providers/README.md).

## Principle

An edited note replaces its card. Equivalent searches reuse selections. Withdrawal prevents old cards or pending extraction from restoring a source.

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

Rule: ownership is immutable. Reads/writes include owner; matching names never merge sources. Withdrawn sources retain only owner and identity.
Rule: cards have nullable name/nameQuote and up to 32 facts: kind, value, quote and optional basis (stated by default or inferred). Kinds: date, context, role, discussion, contact, offer, other. Limits: name 200, value 500, quote 2,000 characters.
Rule: validate schema, literal name evidence, complete source quotes, basis and ISO dates. Resolve today/yesterday against referenceDate; omit unresolved relative dates. Provider interpretation remains fallible; inferred values stay uncertain.
Rule: digest covers content/referenceDate; providerVersion identifies prompt/schema/model. Omitted referenceDate is empty and revision is zero. Older extractions cannot overwrite newer revisions; equivalent concurrent work keeps the first committed result.
Rule: selections store source IDs, fact indexes, digest/version and card hashes, without note text. Recall identity covers owner, case/whitespace-normalized query, complete ordered corpus including revisions/cards, and provider version.
Rule: provider/validation faults preserve prior cards and completed ingestion. No automatic retry, fallback inference or cross-source fact transfer.
```

## Actions

```actions
ingest(owner: User, source: Source, content: String, referenceDate?: String, revision?: Number) : returns ()
  where content is blank
  then
    refuses EMPTY_SOURCE_CONTENT "Source content must not be blank."
  where content is nonblank and source is foreign
  then
    refuses SOURCE_NOT_OWNED "The source belongs to another user."
  where content is nonblank and source is owned and withdrawn
  then
    refuses SOURCE_WITHDRAWN "The source was withdrawn."
  where content is nonblank and (source is absent or source is owned and active)
  then
    reserve ownership; reuse current digest/version or request and validate source-local extraction
    atomically store only while owned, active and not newer; advance the revision even on cache reuse
    withdrawal refuses SOURCE_WITHDRAWN; a newer revision or incompatible concurrent change faults MemoryChanged
    returns

recall(owner: User, description: String, notes: String) : returns (recall: Recall)
  where description is blank
  then
    refuses EMPTY_QUERY "Describe the search first."
  where description is nonblank and notes is invalid or exceeds 256 records or 256 KiB UTF-8
  then
    refuses MEMORY_LIMIT "Contact memory exceeds the supported search limit."
  where description is nonblank and notes is valid and bounded
  then
    require a JSON list of unique string source IDs, nonblank string content, optional referenceDate (string) and revision (nonnegative safe integer), and no unknown fields
    ingest every supplied source in identity order, skipping withdrawn sources; include only current owned cards
    structured memory over 256 KiB faults MemoryChanged before selection, retaining completed ingestion
    reuse an equivalent recall; otherwise select up to five source IDs and supporting fact indexes, or none for an empty corpus
    validate IDs, indexes and duplicates; zero-fact matches require the stored name within the query
    recognized hiring queries require a selected non-inferred positive recruiting offer; other relevance constraints are provider instructions
    verify selected digest/version/card hashes before storing selection in provider order; changed evidence faults MemoryChanged
    returns recall

withdraw(owner: User, source: Source) : returns ()
  where source is foreign
  then
    refuses SOURCE_NOT_OWNED "The source belongs to another user."
  where source is absent or owned
  then
    retain an owner/identity withdrawal marker; erase its card/metadata and the owner's recalls
    repeated withdrawal succeeds; markers block delayed ingestion
    returns
```

## Queries

```queries
_card(owner: User, source: Source, content: String, referenceDate?: String, revision?: Number) : one (card: ContactCard)
  Return the owned active card matching content/referenceDate and revision, or null. Unedited contact-v1/v2 records without sourceRevision may match their exact content digest.

_matches(owner: User, recall: Recall) : many (target: Source, label: String, source: Source, reason: String, card: ContactCard)
  Return owned active matches whose stored digest/version/card hashes still agree, in selection order; missing, foreign or empty recalls return no rows.
  Use source identity, name or Unnamed encounter, card and concise selected values (Name match for zero facts). Mark inferred reasons uncertain; compact known referrals without changing evidence.
  Reads make no provider calls. Circle separately joins the current owned note/revision.
```
