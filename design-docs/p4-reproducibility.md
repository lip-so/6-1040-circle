# P4 clean-copy reproduction

Verified **October 26, 2026, 19:40–19:44 UTC / 15:40–15:44 EDT**. A clean source copy had no `.env`, project `node_modules`, build output, review workflow records or review-only tooling dependencies. Existing machine prerequisites were Bun **1.4.2**, its package cache, authenticated local MongoDB and installed Chrome **153.0.8010.48**. This tests a clean project installation on this machine; it does not claim a fresh operating-system/database/Commons setup.

## Exact setup and results

From the clean repository root, install commands were equivalent to:

```sh
bun install --frozen-lockfile --cwd code
bun install --frozen-lockfile --cwd code/frontend
bun run check
bun run build
CIRCLE_BROWSER_PREVIEW=1 bun run test
```

Both frozen installs passed (58 backend / 90 frontend packages); both existing lockfiles remained byte-identical. Root and backend packageManager now agree on **bun@1.4.2**. The frontend has no conflicting packageManager field. Only this metadata field changed; no dependency range, engine version, BSON override or lock was upgraded. The application did not acquire the isolated skill review tools.

- Source/artifact/backend/Vue checks passed with thirteen already assessed advisories.
- Production build passed with the same three assessed browser-externalization notices; JS/CSS fingerprints matched the A8 build (`index-CYtcyy8i.js`, `index-DC46iOEL.css`).
- The exact root test command passed **231 Bun tests, 1,245 assertions, 19 files**, then **69 production-preview Chrome scenarios** in 32.2 seconds. Only ignored TEST_MONGODB_URL was supplied to the process; no configured app `.env` or AI key was copied.
- Ordinary tests use injected providers and unique disposable databases. The `check:brain` external synthetic call remains separate and was not rerun for setup.

[Install/check/build/test captures](../code/tests/p4-output/clean-copy/) retain exact directory/argv/UTC start/end/exit. [Final application/manifest fingerprints](../code/tests/p4-output/release-source-hashes.json) distinguish this package metadata from the original A8 fingerprint. Source/design/generated/test/script trees match the actual repository; no production records were used.

## Built and development startup

A bounded [startup probe](../code/tests/p4-output/clean-copy/startup-probe-source.txt) supplied a fresh, uniquely named `circle_p4_setup_…` database and no AI key. It ran actual root `bun run start`, then `bun run dev`, shut each down and dropped only that fresh index-only database after shutdown.

[Final startup capture](../code/tests/p4-output/clean-copy/startup.txt), exit 0:

- Built app served its actual app HTML on port **3000**; database health returned `ok`; anonymous `/api/auth/me` returned **401**.
- Development frontend served on **http://localhost:5173/** with backend on **3000**. The frontend API proxy returned the expected anonymous **401**.
- Missing-key warnings demonstrate that startup and `/health` can succeed while AI processing is unavailable. No note was created or external provider called.
- The controlled development shutdown emits code 143 after SIGTERM; the probe itself exits 0. This is expected teardown, not a startup crash.

The [first probe attempt](../code/tests/p4-output/clean-copy/startup-first-attempt.txt) passed built startup but timed out by requesting Vite at 127.0.0.1 instead of its localhost listener. Correcting only the probe target and checking the proxy passed; no app source fix was needed. Temporary servers were stopped and the fresh database cleaned up on both attempts.

## Prerequisites that remain external

The README explicitly requires a running authenticated MongoDB server, actual credentials/authSource and permission to create/drop test databases; a bare URL is not sufficient on every machine. Commons account access/HTTPS sign-in, actual production server configuration, hardware microphone/OS permissions, a second device/account, final deployment and public demo playback remain unverified here. Sofia owns deployment, final design rationale and video. Follow the [release handoff](p4-release-handoff.md) and keep those results pending until observed.
