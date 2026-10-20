# Seeking

## Purpose

Keep a user's need available without having to re-enter it.

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
```

## Actions

```actions
seek(owner: User, description: String) : returns (need: Need)
  where description is blank (empty or whitespace-only)
  then
    refuses EMPTY_DESCRIPTION "The need description must not be blank."
  where description is not blank
  then
    create a need with owner and description
    returns need
```

## Queries

```queries
_get(owner: User, need: Need) : optional (description: String)
  Return the description if need exists and belongs to owner.
  Return no row otherwise.
```
