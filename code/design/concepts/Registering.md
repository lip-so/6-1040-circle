# Registering

## Purpose

Assign a stable local identity to each unique username, including bounded generated guest names, rather than accepting caller-chosen user identities.

Implementation: [Registering.ts](../../src/concepts/Registering/Registering.ts).

## Principle

Maya registers maya and receives a stable user identity; another registration of maya is refused. For an explicit test entry, the application calls registerGuest without registration fields; Registering generates a fresh test username and returns it with a separate user. Another call creates another guest rather than returning an existing account.

## Types

```types
```

## State

```state
a set of Users with
  a unique username String

Rule: usernames are exact and case-sensitive, without trimming or normalization. Uniqueness holds under concurrent registration through both register and registerGuest; each owning action atomically enforces the same username constraint.
Rule: registerGuest generates test_ followed by exactly 24 lowercase hexadecimal characters from 12 cryptographically random server-side bytes, a valid 29-character username. It accepts no caller-selected name or identity. The username is not an authentication credential or a separate kind of user identity. A generated collision is retried within the owner action under the shared atomic uniqueness constraint, never resolved to the existing user.
Rule: an identify or register refusal changes no state. Repeating register with an already registered username refuses. registerGuest has no expected domain refusal and is not idempotent: every successful invocation returns a newly created user and generated username, never another user's identity. An operational failure before guest creation leaves no new user. Repeating identify for a known user returns the same username without effects.
Rule: user identities and usernames have no deletion or expiry in this mechanism. Ending or expiring a session does not remove a user; guest creation adds no cleanup or account-linking action.
```

## Actions

```actions
identify(user: User) : returns (username: String)
  where user is not in Users
  then
    refuses USER_NOT_FOUND "Account not found."
  where user is in Users
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

registerGuest() : returns (user: User, username: String)
  where true
  then
    generate a fresh valid guest username as username, retrying generated collisions without exposing an existing user
    atomically create a user with username under the shared username uniqueness constraint
    returns user, username
```

## Queries

```queries
_byUsername(username: String) : optional (user: User)
  answers the user with the exact username without changing state
  answers no row when the username is unknown

_username(user: User) : optional (username: String)
  answers the user's exact username without changing state
  answers no row when user is not in Users
```
