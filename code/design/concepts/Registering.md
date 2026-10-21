# Registering

## Purpose

Assign a stable local user identity to each unique username. Circle’s account composition uses this when linking a Commons identity; Registering itself does not handle sign-in or read another concept.

*Prevents:* two people end up with the same username.

## Principle

Maya registers the username `maya`. Looking up `maya` returns her local user identity, and looking up that identity returns `maya`. Ben tries to register `maya` too and is refused with "That username is taken.", so he registers `ben`.

## Types

```types
```

## State

```state
a set of Users with
  a unique username String

Rule: usernames are exact and case-sensitive; Maya and maya are different. Registration does not trim or normalize them. A unique database index enforces uniqueness even for concurrent registrations.
```

## Actions

```actions
register(username: String) : returns (user: User)
  where username is not 3 to 32 ASCII letters, digits, underscores, or hyphens
  then
    refuses INVALID_USERNAME "A username must have 3 to 32 letters, digits, underscores, or hyphens."
  where username is accepted and some user has exactly username
  then
    refuses USERNAME_TAKEN "That username is taken."
  where username is accepted and no user has username
  then
    add a new user with username
    returns user
```

## Queries

```queries
_byUsername(username: String) : optional (user: User)
  Returns the user with exactly this username, or no row when nobody has it.

_username(user: User) : optional (username: String)
  Returns the user's username, or no row for an unknown user.
```
