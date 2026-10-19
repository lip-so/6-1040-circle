# Circle types

Circle reuses Conceptbox's Commons-only sign-in modules. Registering gives each
person a local user identity; CommonsFederating links Commons' stable identity
to that user. Sessioning resolves the user for every protected request. That
same user owns their notes, needs, and graph. A request cannot choose its owner.

```types
```

```instances
instantiate Registering

instantiate Federating as CommonsFederating with
  User is Registering.User

instantiate Sessioning with
  Subject is Registering.User

instantiate Remembering with
  User is Registering.User

instantiate Seeking with
  User is Registering.User

instantiate Graphing with
  User is Registering.User
  Source is Remembering.Memory
```
