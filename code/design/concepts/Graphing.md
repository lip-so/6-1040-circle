# Graphing

## Purpose

Make relationships in saved accounts retrievable together with the evidence supporting them.

## Principle

If a source reports that a user met a person who works on AI hardware and discussed systems engineering, tracing a need for systems engineering work can return that person, an explanation, and the supporting source.

## Types

```types
external User
external Source

EntityKind is SELF or PERSON or ORGANIZATION or TOPIC or OPPORTUNITY
RelationKind is MET or KNOWS or MEMBER_OF or WORKS_ON or RESEARCHES or INTERNED_AT or OFFERS or SOMETIMES_HOSTS or BASED_IN or DISCUSSED or FOUNDED or DESCRIBED_AS
```

## State

```state
a set of Sources with
  an owner User

a set of Entities with
  an owner User
  a kind EntityKind
  a label String

a set of Claims with
  an owner User
  a from Entity
  a relation RelationKind
  a to Entity
  a source Source
  a quote String
```

## Actions

```actions
ingest(owner: User, source: Source, content: String) : returns ()
  where content is blank (empty or whitespace-only)
  then
    refuses EMPTY_SOURCE_CONTENT "Source content must not be blank."
  where content is not blank and source is in Sources and source.owner is not owner
  then
    refuses SOURCE_NOT_OWNED "The source belongs to another user."
  where content is not blank and (source is not in Sources or source.owner is owner)
  then
    add source to Sources with owner if it is not already present
    replace the claims for source with claims supported by content
    create or reuse entities for owner, keeping ambiguous identities separate
    give every new claim owner, source, and a supporting quote from content
    use DISCUSSED for conversational topics and FOUNDED for founding a company; do not treat either as employment or expertise
    for the local MVP, recognize one named person per note using introductions or a named profile, with positive affiliation, work, research, discussion, and offer statements
    also recognize guided memories containing Person, When, Does, and Discussed fields; take the explicit person name as written, record Does as DESCRIBED_AS and Discussed as DISCUSSED, and keep When as source context without treating it as a subject relationship
    optional Contact text stays in the supporting source; do not create relationships or searchable subject terms from phone numbers or profile URLs
    do not infer employment or expertise from a discussion; leave a negated Does or Discussed field unindexed
    leave unsupported or negated relationship statements unindexed
    returns
```

## Queries

```queries
_trace(owner: User, description: String) : many (target: Entity, label: String, source: Source, reason: String)
  Return people relevant to description, using only owner's entities and claims.
  Each row identifies a person, their label, one supporting source, and an explanation justified by that source's claims.
  Match normalized subject terms within one source at a time, including supported aliases such as engineer/engineering and artificial intelligence/AI.
  Require all substantive search terms to match that source's entity labels or explicit research relationships. Hiring searches require an explicit positive hiring statement.
  Combining paths across sources and interpreting negative search requirements are deferred; return no rows for negative queries.
  Do not invent relationships or imply an opportunity exists when the source only establishes relevance.
  Return one row per matching person and source, ordered by label, target identity, and source identity.
  Return no rows for a blank description or no supported match.
```
