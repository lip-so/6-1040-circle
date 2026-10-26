# P4 verification evidence

Fresh A8 local run: October 26, 2026, 19:30–19:31 UTC (15:30–15:31 EDT). See [P4 verification](../../../design-docs/p4-verification.md). `source-hashes.json` identifies the tested uncommitted source over Git `ad4d2412b1c1a43ea813526abafb8244352eb2e8`; no deployed identity is implied.

- `generation.txt`, `checks.txt`, `backend.txt`, `build.txt`, `production-browser.txt`: exact command, directory, UTC interval and exit status. 231 Bun tests/1,245 assertions; 69 production-preview Chrome scenarios.
- `advisories.txt`: A4 retained thirteen diagnostics, individually assessed in the access report; A8 confirms the same count.
- `live-brain-a5.txt`, `search-probe-a5.txt`: explicitly dated A5 evidence, not new A8 executions. Five external-provider synthetic examples; injected cold/timeout/capacity probes.
- `a7-review.md`: independent source/contract review, with execution limits stated.
- `internal-browser-notes.md`, `rendered-contrast.json`, `screenshots/`: bounded synthetic manual/rendered observations; not deployed/account/hardware evidence.

Historical P3 captures remain in [tests/output](../output/). Browser suite screenshot paths temporarily wrote into that directory in the isolated candidate; those current captures were copied here and the tracked P3 files restored. No application data was used. Transient traces/caches/build output are not publication artifacts.
