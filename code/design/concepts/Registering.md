# Registering

## Purpose

Assign a stable local identity to each unique username.

Implementation: [Registering.ts](../../src/concepts/Registering/Registering.ts).

## Principle

Registering maya succeeds once; another registration of maya is refused.

## Types

```types
```

## State

```state
a set of Users with
  a unique username String

Rule: usernames are exact and case-sensitive, without trimming or normalization. Uniqueness holds under concurrent registration.
```

## Actions

```actions
identify(user: User) : returns (username: String)
  where user is unknown
  then
    refuses USER_NOT_FOUND "Account not found."
  where user exists
  then
    read without changing state
    returns username

register(username: String) : returns (user: User)
  where username is not 3 to 32 ASCII letters, digits, underscores or hyphens
  then
    refuses INVALID_USERNAME "A username must have 3 to 32 letters, digits, underscores, or hyphens."
  where username is valid and taken
  then
    refuses USERNAME_TAKEN "That username is taken."
  where username is valid and available
  then
    create a user with username
    returns user
```

## Queries

```queries
_byUsername(username: String) : optional (user: User)
  Return the exact username's user, or no row if unknown.

_username(user: User) : optional (username: String)
  Return the user's username, or no row if unknown.
```
