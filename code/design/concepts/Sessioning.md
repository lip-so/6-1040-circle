# Sessioning

## Purpose

Let people stay signed in across requests by presenting an opaque session identity. Circle supplies the local user as Subject after Commons sign-in; this concept does not check passwords or contact Commons.

*Prevents:* continued use after sign-out, seven days of inactivity, or the session’s absolute 90-day lifetime.

## Principle

After Maya proves who she is, a session is started for her. Each time she sends a request with the session, Sessioning returns her as the person it belongs to and records when she last used it. When she signs out, the session ends, and any later request that carries it is refused. She forgets to sign out on a library computer; nobody uses that session for a week, and then it is refused. She uses the session on her own laptop every day, but three months after it started, that one is refused too, and she signs in again.

## Types

```types
external Subject
  The person a session belongs to.
```

## State

```state
a set of Sessions with
  a Subject
  a lastUsed DateTime
  an expiresAt DateTime

Rule: a session identity is 32 random bytes encoded as base64url. Circle carries it in a host-managed cookie. Sessioning itself accepts the opaque identity, not a username or password.
Rule: use and end require lastUsed strictly later than now minus 7 times 24 hours and expiresAt strictly later than now. Equality at either cutoff is expired. Successful use changes only lastUsed; it never extends the original 90 times 24 hour absolute lifetime. Refused use/end leaves state unchanged.
Rule: a database TTL index eventually removes sessions after expiresAt; it does not provide immediate cleanup or enforce the idle cutoff. Each use/end checks both cutoffs directly.
```

## Actions

```actions
start(subject: Subject) : returns (session: Session, expiresAt: DateTime)
  where true
  then
    add a new session for subject, last used now, that expires 90 days from now
    returns session, expiresAt

use(session: Session) : returns (subject: Subject)
  where session is unknown, has not been used for 7 days, or has expired
  then
    refuses NOT_SIGNED_IN "Your session has ended. Sign in again."
  where session was used within the last 7 days and has not expired
  then
    set the session's lastUsed to now
    returns subject

end(session: Session) : returns (session: Session)
  where session is unknown, has not been used for 7 days, or has expired
  then
    refuses NOT_SIGNED_IN "Your session has ended. Sign in again."
  where session was used within the last 7 days and has not expired
  then
    remove session
    returns session
```

## Queries

```queries
```
