# Concepts

## Role of the concepts

Circle is composed of four concepts.

**Remembering [User]** stores raw encounter accounts. *User* is the student who owns the notes. Capture, revision, and deletion happen only here.

**Graphing [User, Source]** turns those accounts into a navigable set of usable claims. In Circle, *Source* is bound to Remembering’s *Memory*. Graphing does not know that a source is a memory; reactions pass the memory identity as an opaque source (making sure concepts are truly modular). Rejected claims stay in the graph but are not usable for tracing until restored, the same way a used nonce stays recorded until it is released.

**Seeking [User]** stores the student’s current needs. A need stays active until the student resolves or deletes it.

**Connecting [User, Target, Need, Evidence]** holds explained suggestions and the student’s responses. In Circle, *Target* is a Graphing *Entity* of kind person, *Need* is a Seeking *Need*, and *Evidence* is a Graphing *Claim*. Connecting never inspects those objects; it only stores the identities and explanations supplied to it.

User-facing requests are modeled with the pseudo-concept **Request**. Reactions that start from a student action include `Request`; reactions that only chain concept actions do not.

---

## 1. Remembering

```
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
  remember (owner: User, content: String, occurredAt: Time,
            contact?: String)
    : (memory: Memory)
    where content is not blank
    then
      create memory with owner, content, occurredAt, and contact
      set capturedAt to now
      return memory

  remember (owner: User, content: String, contact?: String)
    : (memory: Memory)
    where content is not blank
    then
      create memory with owner, content, and contact
      set capturedAt to now
      set occurredAt to capturedAt
      return memory

  revise (owner: User, memory: Memory, content: String)
    where memory exists
          memory.owner = owner
          content is not blank
    then replace memory.content with content

  forget (owner: User, memory: Memory)
    where memory exists
          memory.owner = owner
    then remove memory
```

Notes. The two `remember` cases split the optional occurrence time: one `where` requires a supplied time, the other does not. `forget` is the delete that pairs with `remember`.

---

## 2. Graphing

```
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
    where content is not blank
          every existing claim with this source has owner
    then
      remove every claim with this source
      add usable claims extracted from content
        owned by owner, attributed to source, at observedAt

  reject (owner: User, claim: Claim)
    where claim exists
          claim.owner = owner
          claim.usable
    then set claim.usable to false

  restore (owner: User, claim: Claim)
    where claim exists
          claim.owner = owner
          claim.usable is false
    then set claim.usable to true

  remove (owner: User, claim: Claim)
    where claim exists
          claim.owner = owner
    then remove claim

  retract (owner: User, source: Source)
    where every existing claim with this source has owner
    then remove every claim with this source

queries
  _trace (owner: User, description: String)
    : many (target: Entity, evidence: set of Claim,
            reason: String, gaps: set of String)
    Return explained suggestions of people using only the owner's
    usable claims, under the tracing rules below.
    Return no rows for a blank description or no qualifying route.
```

### Tracing rules

1. Start with someone the user knows, and combine evidence across sources when useful.
2. Match by meaning without inventing facts. Explain what kind of help the evidence supports.
3. Show uncertainty. Exclude known conflicts and identify missing or disputed information.
4. Return at most five people, preferring fewer gaps, fewer acquaintance hops, and more recent evidence.

Notes. Extraction may create or reuse entities for this owner; it records only relationships the content supports (for example, *sometimes hosts* is not *offers*). Ambiguous identities stay separate. `reject` makes a claim unusable for tracing without deleting it; `restore` returns it to the usable set; `remove` deletes it. `retract` deletes every claim from one source.

---

## 3. Seeking

```
concept Seeking [User]

purpose
  keep needs active and available for reconsideration until
  the user resolves or deletes them

principle
  If a user records a need, it remains active without being
  re-entered. The user can refine it as their plans change,
  and resolve or delete it when they stop pursuing it.

state
  a set of Needs with
    an owner User
    a description String
    a createdAt Time
    an active Boolean

actions
  seek (owner: User, description: String)
    : (need: Need)
    where description is not blank
    then
      create need with owner and description
      set createdAt to now
      set active to true
      return need

  revise (owner: User, need: Need, description: String)
    where need exists
          need.owner = owner
          need.active
          description is not blank
    then replace need.description with description

  resolve (owner: User, need: Need)
    where need exists
          need.owner = owner
          need.active
    then set need.active to false

  reopen (owner: User, need: Need)
    where need exists
          need.owner = owner
          need.active is false
    then set need.active to true

  delete (owner: User, need: Need)
    where need exists
          need.owner = owner
    then remove need

queries
  _active (owner: User)
    : many (need: Need, description: String)
    Return the owner's active needs, oldest first.
    Return no rows if none exist.
```

Notes. `seek` records a need and returns its identity as a `Need`. A need stays active when the student closes the app. Multiple needs can coexist. `delete` pairs with `seek`. `reopen` returns a resolved need to the active set.

---

## 4. Connecting

```
concept Connecting [User, Target, Need, Evidence]

purpose
  let users act on explained suggestions without repeatedly
  reconsidering ones they have already handled

principle
  If explained suggestions are supplied for a user's need,
  the user can inspect them and dismiss or mark one useful.
  Later offers update explanations without presenting handled
  suggestions as new.

types
  Status = {suggested, dismissed, useful}

state
  a set of Connections with
    an owner User
    a target Target
    a need Need
    an evidence set of Evidence
    a reason String
    a gaps set of String
    a status Status
    an eligible Boolean

actions
  reset (owner: User, need: Need)
    then set eligible to false
         for every connection with this owner and need

  offer (owner: User, need: Need, target: Target,
         evidence: set of Evidence, reason: String,
         gaps: set of String)
    where evidence is nonempty
          reason is not blank
          no connection exists with this owner, need, and target
    then
      create a connection with the given fields
      set status to suggested
      set eligible to true

  offer (owner: User, need: Need, target: Target,
         evidence: set of Evidence, reason: String,
         gaps: set of String)
    where evidence is nonempty
          reason is not blank
          a connection c exists with this owner, need, and target
    then
      replace c.evidence, c.reason, and c.gaps
      set c.eligible to true

  dismiss (owner: User, connection: Connection)
    where connection exists
          connection.owner = owner
          connection.eligible
          connection.status = suggested
    then set connection.status to dismissed

  use (owner: User, connection: Connection)
    where connection exists
          connection.owner = owner
          connection.eligible
          connection.status = suggested
    then set connection.status to useful

  remove (owner: User, connection: Connection)
    where connection exists
          connection.owner = owner
    then remove connection

  clear (owner: User, need: Need)
    then remove every connection with this owner and need

queries
  _suggestions (owner: User)
    : many (connection: Connection, target: Target, need: Need,
            evidence: set of Evidence, reason: String,
            gaps: set of String)
    Return this owner's explained suggestions: connections that
    are eligible and have status suggested.
    Return no rows if none exist. Order is unspecified.
```

Notes. Each connection stores one explained suggestion for a need. The two `offer` cases split insert from update: the `where` says whether a connection for that target already exists. `then` never branches. `remove` deletes one connection; `clear` deletes every connection for a need.

---

## Essential reactions

Format: `when` an action completes, `where` any extra condition or query, `then` the next action. `where` may bind query results; each bound row is a separate firing. `then` only invokes actions.

### A. Capture from a user request

```
sync rememberOnRequest
  when Request.remember (u, content, occurredAt, contact)
  then Remembering.remember (u, content, occurredAt, contact)

sync rememberNowOnRequest
  when Request.remember (u, content, contact)
  then Remembering.remember (u, content, contact)

sync ingestOnRemember
  when Remembering.remember (u, content, ...): (m)
  where Remembering contains m
        m.owner = u
  then Graphing.ingest (u, m, m.content, m.occurredAt)

sync ingestOnRevise
  when Remembering.revise (u, m, content)
  where Remembering contains m
        m.owner = u
  then Graphing.ingest (u, m, m.content, m.occurredAt)
```

The first two reactions are fired by user requests.
Ingest is not: it follows Remembering, so it does not mention Request.

### B. A new need from a user request

```
sync seekOnRequest
  when Request.seek (u, description)
  then Seeking.seek (u, description)

sync resetOnSeek
  when Seeking.seek (u, description): (need)
  then Connecting.reset (u, need)

sync offerOnSeek
  when Connecting.reset (u, need)
  where Seeking contains need
        need.owner = u
        need.active
        Graphing._trace (u, need.description):
          (target, evidence, reason, gaps)
  then Connecting.offer (u, need, target, evidence, reason, gaps)
```

`Request.seek` is included because a student started the need. Reset and offer chain from Seeking, not from Request.

### C. New or corrected evidence reconsiders ongoing needs

```
sync resetOnIngest
  when Graphing.ingest (u, source, content, observedAt)
  where Seeking._active (u): (need, description)
  then Connecting.reset (u, need)

sync resetOnReject
  when Graphing.reject (u, claim)
  where Seeking._active (u): (need, description)
  then Connecting.reset (u, need)

sync resetOnRestore
  when Graphing.restore (u, claim)
  where Seeking._active (u): (need, description)
  then Connecting.reset (u, need)

sync resetOnRemoveClaim
  when Graphing.remove (u, claim)
  where Seeking._active (u): (need, description)
  then Connecting.reset (u, need)

sync resetOnRetract
  when Graphing.retract (u, source)
  where Seeking._active (u): (need, description)
  then Connecting.reset (u, need)
```

Offering after these resets uses the same `offerOnSeek` rule, which already fires when `Connecting.reset` completes.

### D. Deleting a memory withdraws its evidence

```
sync retractOnForget
  when Remembering.forget (u, m)
  then Graphing.retract (u, m)
```

### E. Changed and completed needs

```
sync clearOnRevise
  when Seeking.revise (u, need, description)
  then Connecting.clear (u, need)

sync resetOnRevise
  when Seeking.revise (u, need, description)
  then Connecting.reset (u, need)

sync clearOnResolve
  when Seeking.resolve (u, need)
  then Connecting.clear (u, need)

sync clearOnDeleteNeed
  when Seeking.delete (u, need)
  then Connecting.clear (u, need)

sync resetOnReopen
  when Seeking.reopen (u, need)
  then Connecting.reset (u, need)
```

### F. Evidence inspection is restricted to the owner

```
sync inspectConnection
  when Request.inspect (u, connection)
  where Connecting contains connection
        connection.owner = u
        every claim in connection.evidence
          is a Graphing claim owned by u
        every source of those claims
          is a Remembering memory owned by u
  then
    Request.respond (reason: connection.reason,
                     gaps: connection.gaps,
                     evidence: connection.evidence)
```

This reaction does not change concept state. It is the access-control pattern: a request is answered only when every referenced object belongs to the same owner.
