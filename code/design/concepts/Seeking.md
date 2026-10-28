# Seeking

## Purpose

Store exact search descriptions for owner-scoped result formation.

Implementation: [Seeking.ts](../../src/concepts/Seeking.ts).

## Principle

A saved need retains its description for later retrieval.

## Types

```types
external User
```

## State

```state
a set of Needs with
  an owner User
  a description String

Rule: every seek creates a new identity, including repeated descriptions.
```

## Actions

```actions
seek(owner: User, description: String) : returns (need: Need)
  where description is blank
  then
    refuses EMPTY_DESCRIPTION "The need description must not be blank."
  where description is nonblank
  then
    store owner and exact description under a fresh identity
    returns need
```

## Queries

```queries
_get(owner: User, need: Need) : optional (description: String)
  Return the owned need's description; otherwise no row. Filter by owner and identity.
```
