# Graphing

## Purpose

Recover paths through supported relationships across accounts, with the exact evidence and uncertainty that make a person relevant, rather than storing outreach decisions or original encounter accounts.

## Principle

One source says Sofia met Toni, who belongs to Improbable AI Lab. Another says that lab sometimes hosts undergraduate researchers. Tracing a robotics research need can recover Toni through the shared lab and show both supporting quotes without claiming that an opening currently exists.

## Types

```types
external User
external Source
opaque Set
  Finite unordered collection of values of its type argument; repeated elements have no meaning.
EntityKind is SELF or PERSON or ORGANIZATION or TOPIC or OPPORTUNITY
RelationKind is MET or KNOWS or MEMBER_OF or WORKS_ON or RESEARCHES or INTERNED_AT or OFFERS or SOMETIMES_HOSTS or BASED_IN or DISCUSSED or FOUNDED or DESCRIBED_AS
```

## State

```state
a set of Sources with
  an owner User
  an optional contentDigest String
  an optional sourceRevision Number
  an optional observedAt DateTime
  an optional retracted Flag

a set of Entities with
  an owner User
  a kind EntityKind
  a label String
  an optional origin Source
  an optional identityHint String

a set of Claims with
  an owner User
  a from Entity
  a relation RelationKind
  a to Entity
  a source Source
  a quote String
  an optional usable Flag
  an optional observedAt DateTime

Rule: Sources retain owner and retraction metadata even after their claims are removed; a retracted source cannot be ingested again. ingest and retract enforce this atomically so an in-flight extraction cannot resurrect a forgotten source.
Rule: every claim and both endpoints have the same owner as its source. Every new quote is complete positive evidence from the exact indexed content, excluding guided Contact text.
Rule: every successful ingest records the SHA-256 digest of the exact supplied content before Contact exclusion. Legacy sources lacking that digest are not usable as current evidence until explicitly reindexed.
Rule: sourceRevision is monotone; an omitted revision is interpreted as zero for legacy direct calls and cannot replace a higher committed revision. An older in-flight ingest cannot replace a newer committed revision. observedAt is an engine-supplied processing instant, never an inferred encounter date; absent legacy instants remain unknown.
Rule: people remain local to their source, including equal names in different encounters. Only unambiguous exact normalized organization or topic identities may be shared across an owner's sources. Similar names or conflicting identity hints never cause a merge.
Rule: missing legacy usable means true; explicit false claims remain stored but are excluded from every trace and evidence query. Replacement removes old claims and resets extracted claims to usable, rather than transferring rejection to potentially different claims.
```

## Actions

```actions
ingest(owner: User, source: Source, content: String, observedAt?: DateTime, sourceRevision?: Number) : returns ()
  where content is blank
  then
    refuses EMPTY_SOURCE_CONTENT "Source content must not be blank."
  where content is not blank and source is in Sources and source.owner is not owner
  then
    refuses SOURCE_NOT_OWNED "The source belongs to another user."
  where content is not blank and source is in Sources and source.owner is owner and source.retracted is true
  then
    refuses SOURCE_RETRACTED "This source has been withdrawn."
  where content is not blank and source is in Sources and source.owner is owner and source.retracted is not true and supplied sourceRevision is older than its committed sourceRevision
  then
    refuses STALE_SOURCE_REVISION "A newer source revision has already been indexed."
  where content is not blank and (source is not in Sources or (source.owner is owner and source.retracted is not true)) and supplied sourceRevision is not older than its committed sourceRevision
  then
    extract through the configured injectable provider or explicitly selected local parser, without changing stored state first
    for both the local parser and any model provider, validate the full proposal: allowed kinds and relation endpoints, unique keys, resolvable references, source-literal labels, and complete supporting quotes
    enforce that each full supporting quote is literal eligible source text and neither negated nor cropped to hide a conflict; reject malformed, unsupported, negated, or misleadingly cropped evidence; leave unsupported statements unindexed
    permit several explicitly named people in a source while keeping each path tied to its own supported claims
    recognize old guided Person, When, Does, Discussed, and optional Contact accounts; retain When literally, exclude Contact from extraction and evidence, and never infer expertise or employment from a discussion
    atomically recheck source ownership, retraction, and sourceRevision before replacing claims, including after awaiting provider output
    create or reuse owner-scoped entities under the identity rules, replace this source's claims, and store its exact-content digest, supplied revision, and supplied observedAt
    leave every stored source and claim unchanged on provider failure or invalid output; never silently fall back or retry
    treat a repeated current revision as replacement for the same source without duplicate claims
    returns

reject(owner: User, claim: Claim) : returns ()
  where claim is not in Claims or claim.owner is not owner
  then
    refuses CLAIM_REJECTION_UNAVAILABLE "This claim is not available."
  where claim is in Claims and claim.owner is owner
  then
    atomically set usable false, leaving an already rejected claim unchanged
    returns

restore(owner: User, claim: Claim) : returns ()
  where claim is not in Claims or claim.owner is not owner
  then
    refuses CLAIM_RESTORE_UNAVAILABLE "This claim is not available."
  where claim is in Claims and claim.owner is owner
  then
    atomically set usable true, leaving an already usable claim unchanged
    returns

remove(owner: User, claim: Claim) : returns ()
  where true
  then
    atomically remove the claim only when it belongs to owner
    leave an absent or other-owner claim unchanged with the same successful result
    repetition succeeds unchanged and may trigger only this owner's downstream refresh
    returns

retract(owner: User, source: Source) : returns ()
  where source is in Sources and source.owner is not owner
  then
    refuses RETRACT_NOT_OWNED "The source belongs to another user."
  where source is not in Sources or source.owner is owner
  then
    atomically register the source with owner if absent, set retracted true, and remove all its claims
    retain only source ownership and invalidation metadata; repeating retraction is unchanged
    returns
```

## Queries

```queries
_trace(owner: User, description: String) : many (target: Entity, label: String, source: Source, evidence: Set<Claim>, reason: String, gaps: Set<String>)
  Answer at most five relevant people using only owner's usable claims and nonretracted digested sources, beginning with a supported MET or KNOWS acquaintance path and combining safely shared organizations or topics across sources.
  Identify source as the evidence source for the target person's final MET or KNOWS acquaintance step, choosing claim identity ascending if equivalent proofs tie; include that claim in evidence.
  Match supported meaning through conservative aliases and directed relationship paths; shared topics never transfer one person's expertise to another, and multiple source-local people connect only through explicitly supported KNOWS paths or shared organizations; include all path claims as evidence, explain the help actually supported, distinguish discussion from expertise and possible hosting from a current opening, and list missing opportunity or identity information as gaps; exclude known conflicts and unsupported negative requirements.
  Answer no rows for blank descriptions, no supported path, or a requirement contradicted by its evidence.
  Order by fewer gaps, fewer acquaintance hops, more recent known supporting observedAt with unknown instants last, then target label and target identity ascending.

_claims(owner: User, source: Source) : many (claim: Claim, fromLabel: String, relation: RelationKind, toLabel: String, quote: String, usable: Flag)
  Answer this owner's source claims including rejected claims, labels, relation, quote, and explicit usable status; require a nonretracted source with a content digest.
  Answer no rows for an unknown or other-owner source or a source without current evidence metadata.
  Order by claim identity ascending.

_members(owner: User, evidence: Set<Claim>) : many (claim: Claim)
  Answer every distinct claim identity supplied in evidence, including absent and other-owner references, without reading stored graph facts or revealing any fact beyond the supplied identities.
  Answer no rows when evidence is empty; owner conveys the application query scope but does not filter, authenticate, or validate these supplied identities.
  Order by claim identity ascending.

_evidence(owner: User, claim: Claim) : optional (source: Source, quote: String, contentDigest: String)
  Answer source, quote, and exact indexed-content digest only for owner's usable claim on a nonretracted digested source, with both endpoints owned by the same owner.
  Answer no row for missing, rejected, withdrawn, undigested, or other-owner evidence.

_entity(owner: User, entity: Entity) : optional (label: String, kind: EntityKind)
  Answer the label and kind only for owner's entity.
  Answer no row for missing or other-owner entities.

_source(owner: User, source: Source) : optional (contentDigest: String)
  Answer the exact indexed-content digest for owner's nonretracted source.
  Answer no row for unknown, withdrawn, undigested, or other-owner source.
```
