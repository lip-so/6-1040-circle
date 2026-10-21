# Federating

## Purpose

Let people sign in with an account they already have on another site, and come back to the same local account each time.

Circle instantiates this reusable concept as CommonsFederating with the Commons provider. Account registration and session creation belong to the application’s compositions, not direct calls from Federating to peer concepts.

*Prevents:* someone opens a link that finishes a sign-in another person started, and ends up in that person's account; someone reads a code meant for another person, such as from their browser's history, and signs in as them; a person's details change on the other site, and they get a second account; someone links another person's account on the other site to an account they control.

## Principle

Sam starts a sign-in, approves the app on the other site, and his browser finishes the attempt it started. The other site confirms that the code belongs to its user `u7f3`, whose username is `sam`. The app registers `sam`, and his account `u7f3` is linked to that user. After he changes his username on the other site, Sam signs in again, and Federating returns the same user. Leo sends Sam a link that finishes a sign-in Leo started; Sam's browser never started that attempt, so finishing it is refused with "This sign-in has expired. Start again." Leo reads a code from Sam's browser history and finishes a sign-in of his own with it. The code was issued for the verifier of Sam's attempt, so the other site doesn't confirm it for Leo's, and finishing is refused with "The other site didn't confirm this sign-in. Start again."

## Types

```types
external User
  The account in the app that a sign-in on the other site reaches.
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

Rule: attempt, nonce and verifier each use 32 random bytes encoded as base64url. start returns attempt, expiresAt and address; the nonce appears as state in that address and the verifier appears only as its S256 hash. The raw verifier is sent only during provider code redemption.
Rule: finish checks unconfirmed status, matching nonce and expiresAt strictly later than its current clock before contacting the provider. Its confirmation write checks that the attempt still exists and is unconfirmed, without another expiry check; two overlapping finishes cannot both confirm it. A refused provider redemption leaves the attempt unconfirmed.
Rule: confirmed-attempt reads and link do not recheck expiry while the record remains stored. _linkable additionally requires an unexpired attempt. The TTL index schedules deletion 60 seconds after expiresAt as grace for in-flight work; cleanup is asynchronous and not an authorization clock. Link uniqueness is enforced by a database index on the external subject.
```

## Actions

```actions
resolve(attempt: Attempt) : returns (user: User | null, linked: Flag)
  where attempt is unknown, unconfirmed or expired
  then
    refuses SIGN_IN_EXPIRED "This sign-in has expired. Start again."
  where attempt is confirmed and unexpired
  then
    read the linked user once; return null and false when unlinked, otherwise the linked user and true
    returns user, linked

requireLinkable(attempt: Attempt) : returns ()
  where attempt is unknown, unconfirmed, expired or its subject already linked
  then
    refuses SIGN_IN_EXPIRED "This sign-in has expired. Start again."
  where attempt is confirmed, unexpired and its subject unlinked
  then
    returns

start() : returns (attempt: Attempt, expiresAt: DateTime, address: String)
  where true
  then
    add a new attempt with a fresh nonce and a fresh verifier that expires 10 minutes from now
    set address to the other site's sign-in address, carrying the nonce and a hash of the verifier
    returns attempt, expiresAt, address

finish(attempt: Attempt, nonce: String, code: String) : returns (username: String)
  where attempt is unknown, expired, or in Confirmed Attempts, or nonce is not the attempt's nonce
  then
    refuses SIGN_IN_EXPIRED "This sign-in has expired. Start again."
  where the other site refuses the code with the attempt's verifier, or doesn't answer
  then
    refuses SIGN_IN_REFUSED "The other site didn't confirm this sign-in. Start again."
  where the other site confirms the code for its user subject, whose username is username
  then
    add attempt to Confirmed Attempts with subject
    returns username

link(attempt: Attempt, user: User) : returns (user: User)
  where attempt is unknown or not in Confirmed Attempts
  then
    refuses NOT_CONFIRMED "This sign-in hasn't been confirmed."
  where a link has the attempt's subject
  then
    refuses ALREADY_LINKED "This account on the other site is already linked."
  where attempt is in Confirmed Attempts and no link has its subject
  then
    add a new link with the attempt's subject and user
    returns user
```

## Queries

```queries
_user(attempt: Attempt) : optional (user: User)
  Returns the user linked to a stored confirmed attempt's subject, or no row when the attempt is unknown/unconfirmed or its subject is unlinked. This read does not recheck expiry; it stops returning a user once the attempt is deleted.

_linkable(attempt: Attempt) : one (linkable: Flag)
  Returns true when the attempt is confirmed, unexpired, and its subject unlinked, and false otherwise.
```
