# Verification output

These files contain genuine captured execution output for the October 20, 2026 local verification (timestamps in the logs use UTC). See the [verification report](../../../design-docs/verification.md) for results, the advisory audit, expected injected-error logs and limitations.

- generation.txt: existing artifact generation tooling.
- checks.txt: concept/artifact checks and TypeScript/Vue types.
- advisories.txt: all 11 missing-fallback warnings and two ordering advisories, retained explicitly.
- p3-tests.txt: complete root command: Bun database/unit tests, then rendered Chrome tests.
- build.txt: production build, including dependency externalization warnings.
- production-browser.txt: the rendered suite using the built frontend.
- doc-links.txt: local documentation file/directory link audit; remote links and anchors excluded.
- contrast.txt: reproducible solid-token sRGB contrast ratios.
- browser-artifacts/: deliberately captured synthetic screenshots; transient failure traces are ignored.

The ingest/recall/withdraw error logs and vanished-need FormerFault are deliberately injected error-path tests, not unexpected failures. Bun and Playwright totals and command exit statuses report the result. Tests only use uniquely named disposable MongoDB databases and authored synthetic inputs. No live model check, real microphone capture or deployment is implied.
