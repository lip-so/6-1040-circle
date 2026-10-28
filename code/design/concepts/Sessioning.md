# Sessioning

## Purpose

Keep a subject signed in through an opaque session identity.

Implementation: [Sessioning.ts](../../src/concepts/Sessioning/Sessioning.ts).

## Principle

Requests identify the session's subject. Sign-out, seven idle days or the 90-day lifetime ends access.

## Types

```types
external Subject
```

## State

```state
a set of Sessions with
  a Subject
  a lastUsed DateTime
  an expiresAt DateTime

Rule: identities are 32 random bytes encoded as base64url.
Rule: a live session exists, has lastUsed > now minus 7 days and expiresAt > now. Days are 24 hours; equality is expired. TTL cleanup is asynchronous.
```

## Actions

```actions
start(subject: Subject) : returns (session: Session, expiresAt: DateTime)
  where true
  then
    create a session with lastUsed now and expiresAt 90 days from now
    returns session, expiresAt

use(session: Session) : returns (subject: Subject)
  where session is not live
  then
    refuses NOT_SIGNED_IN "Your session has ended. Sign in again."
  where session is live
  then
    update only lastUsed to now
    returns subject

end(session: Session) : returns (session: Session)
  where session is not live
  then
    refuses NOT_SIGNED_IN "Your session has ended. Sign in again."
  where session is live
  then
    remove session
    returns session
```

## Queries

```queries
```
