# Accounts

Every user is created by `Registering.register`, which stores the account’s unique local username. Circle displays it for the signed-in account; encounter search uses that account’s saved notes. `Sessioning.use` returns a session’s user on each request. Neither concept refers to the other. Each way of signing in registers or looks up a user, then calls `Sessioning.start`. To reuse accounts, copy this composition with a sign-in composition such as [Commons](commons.md); the frontend uses `frontend/src/reusable/session.ts`.

The [me endpoint](reaction:reusable.accounts.identifying.Me) passes the session to `Sessioning.use`, which returns the user, then calls `Registering.identify` for the username or USER_NOT_FOUND (UNAUTHORIZED), including when the account disappears after session validation. Every endpoint that requires a session starts the same way: `Sessioning.use` returns the session's user, or the request is refused with `NOT_SIGNED_IN`. Each endpoint reads the user from the session, never from the request's inputs. Each way of signing in responds with the user, and the page then calls the me endpoint for the username.

```endpoints
reusable.accounts.identifying.Me at /auth/me
```

The [sign-out endpoint](reaction:reusable.accounts.leaving.SignOut) ends the session with Sessioning, and the HTTP server clears the cookie. If the person is also signed in on another computer, they stay signed in there.

```endpoints
reusable.accounts.leaving.SignOut at /auth/logout
```
