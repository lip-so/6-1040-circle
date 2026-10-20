## Verdict

Revise

## Assessments

| Obligation | Trigger → closing reaction | Visible success / false interval | Acknowledgement / retry / recovery | Duplicate-effect risk |
|---|---|---|---|---|
| Owned removal | Authenticated memory request → `Circle.Forget` | Unknown and foreign memories share `MEMORY_NOT_FOUND`; no effects before ownership enforcement | `Remembering.forget` accepts the same owned identity repeatedly | Controlled |
| Original erasure | Owned forget → `Remembering.forget` | Content disappears atomically; owner and identity remain | Completes before graph withdrawal; same-memory retry succeeds | Controlled; retained timestamp exceeds the stated marker scope |
| Evidence erasure | Original removed → `Graphing.withdraw` | Claims and quotes are removed; source joins hide the original during the intervening interval | Success waits for withdrawal; failure remains an error with manual same-memory retry | Tombstone retry is sound; entity erasure scope is unresolved |
| Same-name isolation | Remove one memory → withdraw that source | Other encounter identities must remain intact | Original identity is separate from name and content | Entity reuse leaves preservation of other sources ambiguous |
| Stale work | Old save or delayed ingest → owning action | Removed saves refuse `SUBMISSION_CONFLICT`; withdrawn sources refuse `SOURCE_WITHDRAWN` | Both owners recognize retained identities; no automatic retry | Controlled by declared tombstone invariants |
| Shared removal UI | Labeled red basket → removal request | Recent and search rows update without reload; failed removal retains Retry | Account changes invalidate removal responses; list replies are invalidated | Pending search replies are not explicitly covered |
| Boundary selection | Memory plus host session → authenticated endpoint | Session authority cannot be supplied as a request claim | Correct effect ordering; malformed/extra-input refusal codes remain unspecified | No duplicate internal reaction |

Executable inventory: six static instances; endpoints/reactions `Circle.Remember`, `Circle.Seek`, `Circle.ListMemories`, and `Circle.Forget`; view `Circle.OwnedMemory`; formers `Circle.SavedMemories` and `Circle.NeedResults`. All have matching typed links, and each endpoint has one matching path. No new internal reaction or computation is implied by the removal flow.

## Findings

- **RC-01 — Entity erasure and same-source isolation are underspecified.** `Graphing.withdraw` erases “source-local entities,” but Entities have no declared source relationship, and ingest may reuse entities across sources. The contract therefore does not determine which entity labels disappear or how other sources retain their entities. Resolve this scope so withdrawal guarantees evidence erasure without damaging another encounter.

- **RC-02 — Removed memories retain more than the approved markers.** `forget` erases only content, leaving `capturedAt` on the removed memory. The brief permits only owner/identity removal markers. Align the removal transition with that retention requirement.

- **RC-03 — A pending search response can restore a removed suggestion.** The UI contract invalidates pending list replies and late removal responses, but does not address a search already underway when removal begins. Specify the outcome for such a reply so completed removal cannot be visually undone.

- **RC-04 — New boundary refusals lack stable codes.** The Forget endpoint rejects malformed identities and extra request claims without declaring their refusal codes and meanings. “Host policy” leaves the newly required visible refusal behavior unsettled.
