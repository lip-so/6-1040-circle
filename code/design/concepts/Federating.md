# Federating

## Purpose

Link an external identity to a stable local user. Circle instantiates this as CommonsFederating.

Implementation: [Federating.ts](../../src/concepts/Federating/Federating.ts).

## Principle

A returning external subject reaches the same local user, even after a username change. Another attempt's code cannot confirm this attempt.

## Types

```types
external User
```

## State

```state
a set of Attempts with
  a nonce String
  a verifier String
  an expiresAt DateTime

a set of Confirmed Attempts with
  a subject String

a set of Links with
  a unique subject String
  a User

Rule: attempt, nonce and verifier use 32 random bytes encoded as base64url. Sign-in addresses carry nonce and S256 verifier hash; redemption receives the raw verifier.
Rule: unexpired means expiresAt > now. resolve, requireLinkable and _linkable enforce expiry; _user and link accept stored confirmed attempts without rechecking it. TTL cleanup is asynchronous, scheduled 60 seconds after expiresAt.
Rule: subject uniqueness is enforced atomically. Account registration and sessions belong to application compositions.
```

## Actions

```actions
resolve(attempt: Attempt) : returns (user: User | null, linked: Flag)
  where attempt is unknown, unconfirmed or expired
  then
    refuses SIGN_IN_EXPIRED "This sign-in has expired. Start again."
  where attempt is confirmed and unexpired
  then
    read its link once: linked user/true, or null/false
    returns user, linked

requireLinkable(attempt: Attempt) : returns ()
  where attempt is unknown, unconfirmed, expired or already linked
  then
    refuses SIGN_IN_EXPIRED "This sign-in has expired. Start again."
  where attempt is confirmed, unexpired and unlinked
  then
    returns

start() : returns (attempt: Attempt, expiresAt: DateTime, address: String)
  where true
  then
    create attempt/nonce/verifier, expiring in 10 minutes, and the provider sign-in address
    returns attempt, expiresAt, address

finish(attempt: Attempt, nonce: String, code: String) : returns (username: String)
  where attempt is unknown, confirmed, expired or its nonce differs
  then
    refuses SIGN_IN_EXPIRED "This sign-in has expired. Start again."
  where provider redemption returns no identity
  then
    refuses SIGN_IN_REFUSED "The other site didn't confirm this sign-in. Start again."
  where provider redemption confirms an identity
  then
    atomically confirm its subject while the attempt remains unconfirmed; otherwise refuse SIGN_IN_EXPIRED
    expiry is checked before redemption, not again at confirmation
    returns username

link(attempt: Attempt, user: User) : returns (user: User)
  where attempt is unknown or unconfirmed
  then
    refuses NOT_CONFIRMED "This sign-in hasn't been confirmed."
  where its subject is already linked
  then
    refuses ALREADY_LINKED "This account on the other site is already linked."
  where attempt is confirmed and its subject is unlinked
  then
    atomically link subject to user
    returns user
```

## Queries

```queries
_user(attempt: Attempt) : optional (user: User)
  Return the confirmed attempt's linked user, or no row for unknown/unconfirmed/unlinked attempts.

_linkable(attempt: Attempt) : one (linkable: Flag)
  Return true for confirmed, unexpired, unlinked attempts; false otherwise.
```
