# Seeking

## Purpose

Store each search need and make its exact description available for owner-scoped result formation.

Seeking records needs; Graphing performs contact selection through Circle’s composition. This concept has no ongoing/resolved status, saved-search editor, deletion action, recommendations or automatic rediscovery.

## Principle

If a user records a need, they can later retrieve its description without having to enter it again.

## Types

```types
external User
```

## State

```state
a set of Needs with
  an owner User
  a description String

Rule: each successful seek creates a new identity, even for an identical description. Preserve the supplied description exactly; query normalization and recall caching belong to Graphing, not Seeking.
```

## Actions

```actions
seek(owner: User, description: String) : returns (need: Need)
  where description is blank (empty or whitespace-only)
  then
    refuses EMPTY_DESCRIPTION "The need description must not be blank."
  where description is not blank
  then
    create a need with a fresh identity, owner and exact supplied description
    returns need
```

## Queries

```queries
_get(owner: User, need: Need) : optional (description: String)
  Return the exact stored description if need exists and belongs to owner; filter by owner and identity in the database query.
  Return no row otherwise.
```
