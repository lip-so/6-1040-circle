# Remembering

## Purpose

Prevent the context of an encounter from being lost before the user has a reason to revisit it.

## Principle

If a user records an encounter in their own words, they can later retrieve that account and recover what they discussed, even if they did not classify the encounter when recording it.

## Types

```types
external User
```

## State

```state
a set of Memories with
  an owner User
  a content String
```

## Actions

```actions
remember(owner: User, content: String) : returns (memory: Memory)
  where content is blank (empty or whitespace-only)
  then
    refuses EMPTY_CONTENT "Encounter content must not be blank."
  where content is not blank
  then
    create a memory with owner and the exact supplied content
    returns memory
```

## Queries

```queries
_get(owner: User, memory: Memory) : optional (content: String)
  Return the content if memory exists and belongs to owner.
  Return no row otherwise.
```
