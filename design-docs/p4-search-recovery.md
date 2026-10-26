# P4 search failures and recovery

Reviewed October26,2026. Local A5 over A1–A4, based on Git HEAD ad4d2412b1c1a43ea813526abafb8244352eb2e8 plus uncommitted P4 changes. Independently approved;231tests and61production-preview Chrome scenarios passed. Five real-provider synthetic cases passed. Full raw evidence is indexed by the P4 verification report when assembled in A8.

Baseline probe on October 26, 2026 used only hand-authored synthetic notes, an injected provider and a uniquely named disposable local test database. It sent no external model requests and read no app notes. Source baseline: A1–A4 over Git ad4d2412b1c1a43ea813526abafb8244352eb2e8. Raw output is retained as baseline-search-probe.txt in the A5 evidence set.

| Four-note case; injected 20ms per call | Elapsed | Extra extraction / selection calls |
| --- | --- | --- |
| Cold | 185ms | 4 / 1 |
| Warm equivalent repeat | 28ms | 0 / 0 |
| One edited note | 95ms | 1 / 1 |
| Provider-version change | 175ms | 4 / 1 |

These are single local trials with artificial delays, not production latency estimates.

The 257-entry input refused before extraction. UTF-8 overflow refused at 262181 serialized bytes while JS length was 131109. Five highly expanded cards exceeded the structured 256KiB bound after organization: five cards persisted, zero selection calls, ordinary MemoryChanged fault. No truncated selection was issued.

An actual 120000ms caller deadline with three 41000ms extraction calls and one 41000ms selection call returned TIMED_OUT at 120069ms with two cards. Accepted work continued; idle at 164182ms showed three cards and one recall. Equivalent manual retry completed in 30ms with zero provider calls; three original notes remained, two need submissions existed. Expected late-answer warning is included in raw output. This demonstrates noncancellation and retry caching, not a guarantee for every timeout/race.

A separate 20000-character single-line source with a short proposed quote reproduced InvalidModelOutput after complete-line expansion. The saved source can outlive processing failure; the in-progress correction permits an explicitly warned last-loaded owned snapshot in the editor, retaining full current source/revision/date. The source-recovery implementation is complete and independently approved. Application to the actual checkout follows this approval.

## Result and limits

Search capacity now uses CONFLICT and explains that saved notes need review/shortening or deliberate removal; changing the query cannot repair collection size. The need may already have been saved. Invalid query input stays separate. Late structured overflow, provider and revision-race faults remain opaque ordinary processing errors that can preserve completed work. Full-corpus semantics and all stored notes are retained; no truncation or automatic deletion/retry.

An editor preparation success with null card uses that response's current content/revision/day. A generic preparation/network failure can open the last-loaded authenticated Recent people snapshot with a visible staleness warning. Unauthorized/not-found/conflict cannot fallback, and a missing snapshot keeps the retry path. Account changes discard pending replies; saving retains expected revision and submission token. Complete source is visible, even if conversion overhead requires explicit shortening before saving. The first original is never silently substituted into current fields.

Sequential cold processing can exceed120seconds; timeout ends waiting while accepted work can continue. This bounded change improves truthful recovery rather than adding cancellation or a new scheduler. Repeated search creates another need identity, while cached organization/selection can be reused. Real deployed auth, a second actual account and physical microphone/browser/device checks remain A9/B2. No release deployment is claimed.
