## Status

Complete

Canonical contracts are written and syntax-checked. The independent critic should verify that the public DSL can realize universal evidence validation, deterministic refresh serialization, and waiting for dependent reactions before acknowledgement.

## Changed

Under `/private/tmp/circle-p3-complete/code/`:

- `design/concepts/Remembering.md`
- `design/concepts/Seeking.md`
- `design/concepts/Graphing.md`
- `design/concepts/Connecting.md`
- `design/types.md`
- `design/compositions/Circle.md`

No source, tests, configuration, or journals changed.

Every endpoint requires `session`; it never accepts `owner`.

| Endpoint | Other inputs | Response |
|---|---|---|
| `/memories/remember` | `content, submission` | `{memory}` |
| `/memories/list` | `after` | `{memories}` |
| `/memories/get` | `memory` | `{memory, content, claims}` |
| `/memories/revise` | `memory, content` | `{memory}` |
| `/memories/forget` | `memory` | Deletion acknowledgement |
| `/memories/reindex` | `memory` | `{memory}` |
| `/capture/transcribe` | `audio, mediaType` | `{content}`; editable, unsaved |
| `/needs/seek` | `description` | `{results}` |
| `/needs/list` | None | `{needs}` |
| `/needs/revise` | `need, description` | `{results}` |
| `/needs/resolve` | `need` | `{results}` |
| `/needs/reopen` | `need` | `{results}` |
| `/needs/delete` | `need` | Deletion acknowledgement |
| `/suggestions/list` | None | `{suggestions}` |
| `/suggestions/inspect` | `connection` | `{suggestion}` |
| `/suggestions/dismiss` | `connection` | `{suggestions}` |
| `/suggestions/use` | `connection` | `{suggestions}` |
| `/suggestions/remove` | `connection` | `{suggestions}` |
| `/suggestions/refresh` | None | `{suggestions}` |
| `/claims/reject` | `claim` | `{suggestions}` |
| `/claims/restore` | `claim` | `{suggestions}` |
| `/claims/remove` | `claim` | `{suggestions}` |

`results` preserves `need, description, suggestions`, adding `active`. Suggestions carry connection/target identities, label, reason, gaps, evidence identities, and all owned source records with quote/content.

Ownership split:

| Owner | Contract responsibilities |
|---|---|
| Remembering | Original content; submission deduplication; atomic revision increments; metadata-only forgotten tombstones; injectable transcription |
| Seeking | One Need type; legacy and new needs active until resolved; lifecycle; optional direct-call timestamps |
| Graphing | Source ownership; revision-checked extraction; source tombstones; exact-content digest; usable claims; safe directed cross-note paths; ranking/gaps |
| Connecting | Owner/need/target uniqueness; reset/offer; persistent handled status; lifecycle cleanup |
| Composition | Authentication; current-original proof for **every** path claim; action-triggered indexing/retraction/refresh; acknowledgement and recovery |
| Frontend | One free-form capture; voice review; note lifecycle; lookup-oriented ongoing needs with quick Resolved; evidence controls; account-safe pending replies |

Important implementation details:

- Preserve existing `Seeking._get(owner,need) → description`; new `_record → description,active`.
- Preserve existing Remembering `_get/_list`; add `_record → content,revision`.
- Graphing ingest takes optional `observedAt` and `sourceRevision`; endpoints supply engine time and current revision.
- New graph queries: `_claims`, `_evidence → source,quote,contentDigest`, `_source → contentDigest`, `_entity → label,kind`.
- `_trace` returns `target,label,evidence,reason,gaps`.
- Collection signatures use locally declared `opaque Set` with `Set<Claim>`, `Set<Evidence>`, and `Set<String>`. Both `set of Claim` and `Claim[]` fail installed signature syntax.
- A candidate is omitted when **any** evidence claim lacks a current owned-original digest match. Graph ranking selects up to five candidates before this filter; fewer validated results are acceptable.
- Metadata-only memory/source tombstones prevent deleted-save retries and in-flight extraction from resurrecting forgotten material.
- All cross-concept effects have explicit internal DSL reaction links. Endpoint code must not duplicate them.
- Source edits immediately invalidate displayed old evidence through content-digest mismatch; failed extraction preserves the original and requires suggestion invalidation before its error response.

## Questions

None blocking.

Repeated exact searches currently create separate needs; the pending optional clarification can revise that decision before implementation.

Public-API realizability concerns for review:

1. Universal validation of an entire evidence collection through supported views/formers.
2. Owner-serialized refreshes without duplicated/racing reaction trees.
3. Endpoint acknowledgement after all required triggered effects settle.
4. Required invalidation before propagating an extraction failure.
5. Typed opaque collection compatibility with generated/source agreement checks.

## Checks

Passed:

```text
bunx --no-install sync-engine check-design design/concepts/Remembering.md design/concepts/Seeking.md design/concepts/Graphing.md design/concepts/Connecting.md design/types.md design/compositions/Circle.md
```

Result: `Design form check passed for 6 files.`
