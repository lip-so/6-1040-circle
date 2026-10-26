# P4 current design and refinement record

Recorded October 26, 2026. This is a factual implementation record, not Sofia’s personal reflection. The private design notebook and `desing-journal.md` are preserved. The reviewed working tree starts from `ad4d2412b1c1a43ea813526abafb8244352eb2e8`; A1–A7 are uncommitted at this checkpoint. Final release identity belongs in the P4 verification report after release.

## Current responsibility map

| Contract and binding | Implementation and relevant evidence |
| --- | --- |
| [Registering](../code/design/concepts/Registering.md): local User | `src/concepts/Registering/Registering.ts`, concept tests: exact case-sensitive unique usernames and concurrent registration. |
| [Federating](../code/design/concepts/Federating.md), CommonsFederating.User = Registering.User | `src/concepts/Federating/Federating.ts`, reusable Commons composition and tests: PKCE, nonce/expiry, stable subject, linkability and snapshot routing. |
| [Sessioning](../code/design/concepts/Sessioning.md), Subject = Registering.User | `src/concepts/Sessioning/Sessioning.ts`, session/auth tests: idle/absolute cutoffs, cookie-resolved owner and one-session logout. |
| [Remembering](../code/design/concepts/Remembering.md), User = Registering.User | `src/concepts/Remembering.ts`, Remembering/authenticated-flow tests: exact original/current content, initial source day, revision/token retries, pagination, owner predicates and erasure markers. |
| [Seeking](../code/design/concepts/Seeking.md), User = Registering.User | `src/concepts/Seeking.ts`, concept/integration tests: exact submitted needs and account scope; needs remain after downstream processing faults. |
| [Graphing](../code/design/concepts/Graphing.md), User = Registering.User, Source = Remembering.Memory | `src/concepts/Graphing.ts`, provider/former/integration tests: source-local evidence, complete-corpus bounds, late partial faults, revision guards and withdrawal races. |

Paths in the implementation column are relative to `code/`. [Type bindings](../code/design/types.md), [Circle composition](../code/design/compositions/Circle.md), [accounts](../code/design/compositions/reusable/accounts.md) and [Commons](../code/design/compositions/reusable/commons.md) are authoritative authored specifications. The [generated readback](../code/generated/circle.md) and [caller contract](../code/generated/wire.ts) are generated, never manually patched. Registration is in `code/src/concepts.ts`; assembly is `code/src/assembly.ts`.

Circle exposes seven protected POST endpoints and reuses five account/Commons endpoints. Remember accepts content/submission and optional validated timeZone; edit accepts memory/content/submission/revision and optional validated timeZone. The default timezone is America/New_York. List accepts after; transcribe accepts audio/mediaType; prepare-edit and forget accept memory; seek accepts description. Cookies supply identity. Bodies cannot supply owner, timestamp, referenceDate, corpus or provider credentials. One view and two formers assemble public results. No peer concept calls were added.

## Observed trigger → refinement → consequence and tradeoff

| Item | Trigger and refinement | Verified consequence and remaining tradeoff |
| --- | --- | --- |
| A1 | Contact-only edits discarded less prominent authored details when a shorter model card populated the form. Guided fields now come from current content; raw conversion allocates complete source groups visibly once. | Retained details survive; replaced details leave current recall; the first original stays immutable. Ambiguous raw grouping requires explicit review rather than hidden source residue. |
| A2 | Unnamed, long, multiline or relative-date notes could be altered or reanchored during editing. Empty edit names and complete fields round-trip; the initial source day remains stable. | No invented identity, silent truncation or later-day reinterpretation. Named creation Form still requires Person; oversized serialized drafts require deliberate shortening. |
| A3 | Retry after a failed next page replaced forty visible rows with the first twenty. Retry now retains the failed cursor and append/replace intent. | Failed pagination resumes without dropping prior pages. A deleted cursor still produces an empty backend page; Reload from start explicitly resets list position. |
| A4 | Private reads, effects, partial failures and thirteen analysis notices needed inspection. Reviewed seven private routes and reused auth independently. | Owner predicates and ordered erasure agree with tests/contracts. No new runtime change was required. Real deployed two-account/cookie/hardware checks remain separate. |
| A5 | Corpus overflow looked like invalid query text; failed organization could prevent shortening a long saved source. Corrected the refusal mapping and added a visibly stale, revision-checked source fallback for generic preparation faults. | Collection guidance is actionable; authorized current content can be edited after processing failure. No fallback bypasses domain refusals/account invalidation. Long cold processing can outlast the 120-second caller deadline and continue; warm retry benefits from persisted work. |
| A6 | Empty Find lacked an obvious next action; first-original meaning after editing was unclear; decorative reserve delayed useful rows. Added explicit guidance/focus and reduced signed-in reserve. | Synthetic rendered/manual checks show preserved drafts, explicit save and clearer originals, with the existing visual language. Device, assistive-technology and unfamiliar-user evidence remains pending. |
| A7 | Oversized-edit prose implied earlier effects had been rolled back; Commons history/account-search prose described older behavior. Aligned wording with source and corrected one test comment. | Current-attempt no-request semantics, session-history replacement and local username meaning are accurate. No stronger global history-erasure, timing or transactional promise was introduced. |

A1–A6 results and limitations are in [access review](p4-access-review.md), [search recovery](p4-search-recovery.md), [usability review](p4-usability-review.md), the append-only [agent journal](../agent-journal.md), and the final P4 verification report when present. Earlier counts describe their dated candidate, not an unobserved deployed release.

## Relationship to the earlier proposal

The [P1 concept proposal](concepts.md) described a broader relationship graph, active goals and rediscovery. Current Graphing stores independently evidenced cards per encounter and selections over one owner’s current corpus. It does not transfer facts across encounters, infer a unified identity or merge equal names. Unknown names stay unknown. Seeking stores submitted needs; active/saved lifecycle, automatic rediscovery, recommendations/exclusions and Connecting’s useful/dismissed history remain deferred. Registering, Sessioning and Federating are reused account concepts. Form-only editing and ordered removal are implemented.

These are observable scope differences, not an invented account of why Sofia historically made them. Personal rationale and exact course-submitted P1/P3 identifiers require Sofia’s review for the final design synthesis. Git history identifies P1 (`c9284787a11afb0e29a46347f5a8b8c39a5a8ffc`), its feedback revision (`54278bf8fba3a1fe855e2a3fcc83519112db5f9e`) and a P3 baseline (`8dfc7f24d1ff8a41698e7a5d6178f700f738187f`); this record does not assert which was submitted to the course.

## A7 validation

The scoped designer checked all ten authored files with check-design and inspected source/test agreement. An independent critic reviews the final authored digest; coordinator generation, artifact/type checks and generated wire comparison are recorded with their actual outcomes in the journal. A7 changes prose and a comment only; fresh full backend/rendered release evidence belongs to A8. No deployment, new provider call or human study is claimed.
