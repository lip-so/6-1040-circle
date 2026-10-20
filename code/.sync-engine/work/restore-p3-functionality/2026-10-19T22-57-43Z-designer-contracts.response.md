## Status

Complete

## Changed

- `design/concepts/Graphing.md`: Added `_members(owner: User, evidence: Set<Claim>) : many (claim: Claim)`. It enumerates every distinct supplied identity, including absent/foreign references, sorted by identity, without reading graph state.
- `design/compositions/Circle.md`: Added linked `Circle.InvalidEvidence` view using `_members` plus absence of `OwnedEvidence`. Candidates require nonempty evidence and no invalid member. Full source collections enumerate the complete supplied membership before owned proof joins.

No new state, computations, or implementation changes.

## Questions

None.

## Checks

Passed:

```text
bunx --no-install sync-engine check-design design/concepts/Remembering.md design/concepts/Seeking.md design/concepts/Graphing.md design/concepts/Connecting.md design/types.md design/compositions/Circle.md
```

`Design form check passed for 6 files.`
