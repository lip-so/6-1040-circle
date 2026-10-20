# Connecting

## Purpose

Keep evidence-backed suggestions and a user's private recommendation exclusions without interpreting opaque people, needs, or evidence supplied by other mechanisms.

## Principle

Sofia sees Toni suggested for a research search and chooses Do not recommend, optionally explaining that their interests no longer align. Toni stops appearing in all of Sofia's searches. Her explanation can guide recommendation policy for other candidates, while another student's suggestions and Sofia's original notes remain unchanged.

## Types

```types
external User
external Target
external Need
external Evidence
opaque Set
  Finite unordered collection of values of its type argument; repeated elements have no meaning.
```

## State

```state
a set of Connections with
  an owner User
  a target Target
  a need Need
  an evidence set of Evidence
  a reason String
  a gaps set of String
  an eligible Flag
  unique owner and need and target

a set of Exclusions with
  an owner User
  a target Target
  an explanation String
  unique owner and target

Rule: offer atomically enforces owner, need, target uniqueness. No target, need, or evidence identity is interpreted or merged by name. Legacy connection status fields have no meaning and never suppress otherwise eligible unexcluded suggestions.
Rule: exclusions apply to exact target identity for their owner across every need. They survive reset, clear, need revision, deletion, reopening, and repeat search. They are not note text, extraction facts, or shared learning.
Rule: every explanation has at most 1000 characters; the empty string means no explanation. All exclusions and explanations remain owner-private.
Rule: reset disables the prior set before recomputation; only successful offers reenable supported rows. An interrupted refresh cannot keep old rows eligible.
Rule: offer and all public suggestion queries enforce absence of an owner-target exclusion, including after provider completion; correctness never depends on clearing matching connection rows.
Rule: the injected recommendation policy is separate from evidence extraction. It receives only the supplied search description, candidate target, reason, gaps, and this owner's exclusion targets and explanations. It may reject a supported candidate but cannot invent candidates, alter evidence, or modify notes.
Rule: configured model policy uses a stateless strict boolean response, no retained provider response or shared conversation, and treats all supplied text as untrusted data. Missing, invalid, timed-out, or failed provider output faults explicitly without offering that candidate; there is no silent fallback or automatic retry. Local policy passes supported unexcluded candidates without a provider call.
Rule: policy context includes all owner exclusions in target identity ascending order with complete explanations. The complete serialized policy input is bounded to 128 KiB UTF-8; exceeding this budget faults explicitly before a provider call and never truncates feedback. Hard exclusion checks always use all owner exclusions. Exclusion saving is independent of this budget and succeeds without a policy call. No other owner's feedback can enter the policy call.
Rule: exclude and clear enforce ownership inside mutations; refusals leave complete state unchanged. Exclusion is durable before success is returned; a policy fault cannot erase it.
```

## Actions

```actions
reset(owner: User, need: Need) : returns ()
  where true
  then
    set eligible false on all connections with owner and need
    leave an empty set or repeated reset unchanged
    returns

offer(owner: User, need: Need, target: Target, description: String, evidence: Set<Evidence>, reason: String, gaps: Set<String>) : returns ()
  where evidence is empty
  then
    refuses EMPTY_EVIDENCE "A suggestion requires supporting evidence."
  where evidence is not empty and reason is blank
  then
    refuses EMPTY_REASON "A suggestion requires an explanation."
  where evidence is not empty and reason is not blank and description is blank
  then
    refuses EMPTY_SEARCH_DESCRIPTION "A suggestion requires its search description."
  where evidence is not empty and reason is not blank and description is not blank and an exclusion has owner and target
  then
    leave connections and exclusions unchanged and do not invoke policy
    returns
  where evidence is not empty and reason is not blank and description is not blank and no exclusion has owner and target
  then
    evaluate injected recommendation policy with description, target, reason, gaps, and only owner's complete exclusion context within the explicit input budget
    if policy rejects or an owner-target exclusion is present at commit, leave connections and exclusions unchanged
    otherwise create or replace the unique connection with owner, need, target, evidence, reason, gaps, and eligible true, preserving any existing connection identity
    leave all exclusions unchanged
    returns

exclude(owner: User, connection: Connection, explanation: String) : returns ()
  where connection is not in Connections or connection.owner is not owner
  then
    refuses EXCLUDE_UNAVAILABLE "This suggestion is not available."
  where connection is in Connections and connection.owner is owner and connection.eligible is false
  then
    refuses EXCLUDE_INELIGIBLE "This suggestion is no longer current."
  where connection is in Connections and connection.owner is owner and connection.eligible is true and explanation has more than 1000 characters
  then
    refuses EXCLUDE_REASON_TOO_LONG "The explanation must be at most 1000 characters."
  where connection is in Connections and connection.owner is owner and connection.eligible is true and explanation has at most 1000 characters
  then
    atomically create or replace the exclusion with owner, connection.target, and exact supplied explanation
    preserve an existing exclusion identity and leave an identical repeat unchanged
    leave all original connections and their evidence unchanged
    returns

clear(owner: User, need: Need) : returns ()
  where true
  then
    remove every connection with owner and need, leaving an empty set or repetition unchanged
    leave all exclusions unchanged
    returns
```

## Queries

```queries
_suggestions(owner: User) : many (connection: Connection, target: Target, need: Need, evidence: Set<Evidence>, reason: String, gaps: Set<String>)
  Answer owner's eligible connections whose exact target has no exclusion for owner, with supplied explanation and evidence; ignore legacy status fields.
  Answer no rows when none qualify.
  Order by need identity then connection identity ascending; composition may retain graph ranking when presenting one refreshed need.

_get(owner: User, connection: Connection) : optional (target: Target, need: Need, evidence: Set<Evidence>, reason: String, gaps: Set<String>, eligible: Flag)
  Answer owner's unexcluded connection and its opaque identities, explanation, and eligibility; ignore legacy status fields.
  Answer no row for an unknown connection, another owner's connection, or a target excluded by owner.

_excluded(owner: User, target: Target) : optional (target: Target, explanation: String)
  Answer owner's exclusion for the exact target and its explanation.
  Answer no row when owner has not excluded target, irrespective of another owner's exclusion.

_exclusions(owner: User) : many (target: Target, explanation: String)
  Answer all owner's exclusions with complete explanations, without applying the model-context limit.
  Answer no rows when owner has none.
  Order by target identity ascending.
```
