# Concepts

## Design choices

Use four concepts:

Remembering, Graphing, Seeking, and Connecting.

Remembering retains accounts of encounters;

Graphing makes relationships across those accounts navigable

Seeking maintains current needs;

Connecting maintains an actionable collection of explained suggestions and the user's responses.

## 1. Remembering

```text
concept Remembering [User]

purpose
  prevent the context of an encounter from being lost before
  the user has a reason to revisit it

principle
  If a user records an encounter in their own words, they can
  later retrieve that account and recover what they discussed,
  even if they did not classify the encounter when recording it.

state
  a set of Memories with
    an owner User
    a content String
    an occurredAt Time
    a capturedAt Time
    an optional contact String

actions
  remember (owner: User, content: String,
            occurredAt?: Time, contact?: String)
    : returns (memory: Memory)
    where content is not blank
    then
      create memory with the given owner and content
      set capturedAt to the current time
      set occurredAt to the supplied time, or capturedAt if omitted
      set contact to the supplied value, or leave it absent
      return memory

  revise (owner: User, memory: Memory, content: String)
    where memory exists, memory.owner = owner,
          and content is not blank
    then replace memory.content with content

  forget (owner: User, memory: Memory)
    where memory exists and memory.owner = owner
    then remove memory

queries
  _memories (owner: User)
    : many (memory: Memory, content: String,
            occurredAt: Time, contact?: String)
    Return the owner's memories, newest occurrence first;
    return no rows if none exist.
```

## 2. Graphing

```text
concept Graphing [User, Source]

purpose
  make relationships spread across separate accounts retrievable
  together with the evidence supporting them

principle
  If one source reports that a user met a person at a lab,
  and another reports that the same lab hosts undergraduate
  researchers, tracing a research need can recover the route
  through that person to the lab and both supporting sources.

types
  EntityKind = {self, person, organization, topic, opportunity}
  RelationKind = {met, knows, member_of, works_on, researches,
                  interned_at, offers, sometimes_hosts, based_in}

state
  a set of Entities with
    an owner User
    a kind EntityKind
    a label String
    an optional identityHint String

  a set of Claims with
    an owner User
    a from Entity
    a relation RelationKind
    a to Entity
    a source Source
    a quote String
    an observedAt Time
    a usable Boolean

actions
  ingest (owner: User, source: Source,
          content: String, observedAt: Time)
    where content is not blank,
          and any existing claims for source belong to owner
    then
      remove previous claims for source
      create or reuse the owner's self entity
      extract explicitly supported relationships from content
      create or reuse entities within this owner's graph
      create a usable claim for each extracted relationship,
        with source, an exact supporting quote from content,
        and observedAt
      preserve qualifiers: 'sometimes hosts' is not 'offers'
      retain existing entity identities when their identity is clear
      leave ambiguous identities separate
      create no claim for an unsupported relationship

  reject (owner: User, claim: Claim)
    where claim exists, claim.owner = owner, and claim.usable
    then set claim.usable to false

  retract (owner: User, source: Source)
    where any existing claims for source belong to owner
    then remove every claim with this source

queries
  _trace (owner: User, description: String)
    : many (target: Entity, evidence: set of Claim,
            reason: String, gaps: set of String)
    Return explained candidate people using only the owner's
    usable claims, under the tracing rules below.
    Return no rows for a blank description or no qualifying route.
```

### Tracing rules

1. Start with someone the user knows, combine evidence across memories when useful.
2. Match by meaning without inventing facts. Explain what kind of help the evidence supports.
3. Show uncertainty. Exclude known conflicts and identify missing or disputed information.
4. Return at most five people, preferring fewer gaps, fewer acquaintance hops, and more recent evidence.

## 3. Seeking

```text
concept Seeking [User]

purpose
  keep unfinished needs available for reconsideration until
  the user decides they no longer matter

principle
  If a user declares a need, it remains active without being
  re-entered. The user can refine it as their plans change,
  and resolve it when they stop pursuing it.

state
  a set of Seeks with
    an owner User
    a description String
    a createdAt Time
    an active Boolean

actions
  seek (owner: User, description: String)
    : returns (seek: Seek)
    where description is not blank
    then
      create seek with owner and description
      set createdAt to the current time and active to true
      return seek

  revise (owner: User, seek: Seek, description: String)
    where seek exists, seek.owner = owner,
          seek.active, and description is not blank
    then replace seek.description with description

  resolve (owner: User, seek: Seek)
    where seek exists, seek.owner = owner, and seek.active
    then set seek.active to false

queries
  _active (owner: User)
    : many (seek: Seek, description: String)
    Return the owner's active seeks, oldest first;
    return no rows if none exist.
```

seek stays active when the student closes the app. Multiple needs can coexist, such as a spring UROP and a summer internship.

## 4. Connecting

```text
concept Connecting [User, Target, Need, Evidence]

purpose
  let users act on explained suggestions without repeatedly
  reconsidering ones they have already handled

principle
  If explained candidates are supplied for a user's need,
  the user can inspect them and dismiss or mark one useful.
  Refreshing candidates updates their explanations without
  presenting handled candidates as new suggestions.

types
  Status = {suggested, dismissed, useful}
  Candidate = value containing
    target: Target
    evidence: set of Evidence
    reason: String
    gaps: set of String

state
  a set of Connections with
    an owner User
    a target Target
    a need Need
    an evidence set of Evidence
    a reason String
    a gaps set of String
    a status Status
    a eligible Boolean

actions
  refresh (owner: User, need: Need,
           candidates: set of Candidate)
    where candidate targets are distinct,
          and each candidate has nonempty evidence and reason
    then
      set eligible to false for existing connections
        of this owner and need
      for each candidate
        find the connection with this owner, need, and target
        or create one with status suggested if none exists
        replace its evidence, reason, and gaps with supplied values
        set eligible to true
      preserve the status of every existing connection

  dismiss (owner: User, connection: Connection)
    where connection exists, connection.owner = owner,
          connection.eligible, and connection.status = suggested
    then set connection.status to dismissed

  use (owner: User, connection: Connection)
    where connection exists, connection.owner = owner,
          connection.eligible, and connection.status = suggested
    then set connection.status to useful

  clear (owner: User, need: Need)
    then remove every connection with this owner and need

queries
  _suggestions (owner: User)
    : many (connection: Connection, target: Target, need: Need,
            evidence: set of Evidence, reason: String,
            gaps: set of String)
    Return only this owner's eligible, suggested connections.
    Return no rows if none exist. Order is unspecified.
```

## Reactions

### A. Capture and correction rebuild only the affected source

```text
when Remembering.remember (u, content, ...): (m)
  or Remembering.revise (u, m, content)
where Remembering contains m owned by u
      with current content and occurredAt
then Graphing.ingest (u, m, content, occurredAt)
```

This lets several memories contribute to one graph while keeping evidence separate.

### B. A new seek reconsiders old evidence

```text
when Seeking.seek (u, description): (s)
where Seeking contains active s owned by u
      candidates = Graphing._trace (u, description)
then Connecting.refresh (u, s, candidates)
```

### C. New or corrected evidence reconsiders ongoing needs

```text
when Graphing.ingest (u, source, content, observedAt)
  or Graphing.reject (u, claim)
  or Graphing.retract (u, source)
where for each (s, description) in Seeking._active (u)
      candidates = Graphing._trace (u, description)
then Connecting.refresh (u, s, candidates)
```

### D. Deleting a memory withdraws its evidence

```text
when Remembering.forget (u, m)
then Graphing.retract (u, m)
```

### E. Changed and completed needs have explicit lifecycles

```text
when Seeking.revise (u, s, description)
then Connecting.clear (u, s)
     followed by Connecting.refresh (
       u, s, Graphing._trace (u, description))

when Seeking.resolve (u, s)
then Connecting.clear (u, s)
```

### F. Evidence inspection is restricted to the same owner

```text
when the signed-in user u requests a connection's explanation
where Connecting contains that connection owned by u
      each referenced Graphing claim is owned by u
      each source memory in Remembering is owned by u
then display the reason, named semantic bridges, gaps,
     claim observation dates, and original source accounts
```
Does not change the state.