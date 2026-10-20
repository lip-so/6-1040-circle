## Verdict
Approve

## Assessments

The explicit rollback restores the accepted P2 contracts, with no new product decomposition. Six instances are selected: Registering, Sessioning, CommonsFederating, Remembering, Seeking, Graphing. Circle selects Remember, Seek and ListMemories; reusable compositions select Me, SignOut, StartCommons, FinishCommons and ChooseUsername. Circle selects OwnedMemory, SavedMemories and NeedResults. No separate internal reaction or computation is introduced by this rollback. There is no Connecting, voice, model provider, lifecycle or cross-note surface.

| Obligation | Trigger and closure | Visible success and false interval | Acknowledgement/retry/recovery |
| --- | --- | --- | --- |
| Save and local indexing | Authenticated Remember saves through Remembering, reads owned original, then Graphing.ingest | Memory identity after ingest; saved original may exist before indexing completes | Owner + submission accepted atomically by Remembering. Same text reuses memory; conflicting text refused. Manual same-token retry can replace graph without duplicating note. Failure preserves original and returns error. |
| Need and immediate suggestions | Authenticated Seek saves through Seeking and forms owned NeedResults | Need and suggestions, including empty list, after owned trace/original join | Failure preserves saved need; manual seek may create another need, as explicitly scoped in P2. No exactly-once promise. |
| Recent encounters | Authenticated ListMemories reads owned bounded cursor page | Read-only page in stored deterministic order; no deferred effects | Invalid/foreign cursor returns no rows. Retry is read-only. UI invalidates account-stale and older requests. |
| Commons session | Start/Finish/Choose and Me use opaque attempt/session identities | Existing reused account contracts define cookies, refusals, provider timeout and session acknowledgement | Existing auth behavior is unchanged by the requested rollback. Supplied reused contracts explicitly disclose registration/link partial-failure limits. |

Ownership comes from Sessioning.use before all protected effects and reads; requests cannot choose owner or indexed source. Graphing enforces immutable source ownership and local source-scoped matching. Contact stays original text, guided fields remain optional except the person's name, and no name-based identity merge is introduced.

## Findings
None within the requested restoration. This is a coordinator simulation, not independent review. Contract assessment does not establish live Commons login or browser behavior.
