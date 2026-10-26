# Evidence and development-record navigation

Start with [P4 verification](p4-verification.md) and its [separate output](../code/tests/p4-output/), then the [refinement record](p4-change-record.md). The [access review](p4-access-review.md), [search recovery](p4-search-recovery.md) and [usability review](p4-usability-review.md) explain individual decisions and limits. [Clean-copy reproduction](p4-reproducibility.md) tests setup with real lockfiles. [Release handoff](p4-release-handoff.md) covers Sofia’s own deployment.

- [Authored concepts](../code/design/concepts/), [types](../code/design/types.md) and [composition](../code/design/compositions/Circle.md) define current boundaries. Generated files are checked output, not independent specifications.
- [Historical P3 captures](../code/tests/output/) are retained with their original timestamps. Their README explains expected error injections and the absent old report; no historical report was invented.
- [Agent journal](../agent-journal.md) records actual changes/checks. Private personal rationale belongs in Sofia’s own design document/notebook.
- `code/.sync-engine/work/` contains **327 tracked historical role/workflow files** from earlier development: briefs, task/grant/prompt/response/record/baseline artifacts. They are provenance, not application startup input or a grader’s recommended entry point. They are deliberately retained rather than bulk-deleted or history-rewritten. Current independent A7 review is published in the P4 output; new role machinery remained in the isolated working copy.

The navigation review found no tracked configured `.env`, dependency directory or build directory. A configured-credential value scan passed all 327 historical work files and the new text evidence. This is a bounded scan, not a universal privacy guarantee. Logs intentionally contain synthetic IDs, timing, local paths and expected faults. No real notes or participant identities were added to public evidence. Dependency caches, `.env`, temporary traces and build outputs stay ignored. Do not publish real session cookies, provider keys or participant records in follow-up evidence.

Historical P1/P2/P3 documents and source comparisons remain reachable through the [README](../README.md) and [version map](p4-version-map.md). No submitted Git history or personal notebook was rewritten.
