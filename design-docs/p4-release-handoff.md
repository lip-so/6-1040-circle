# Final release handoff — Sofia deploys

On October 26, Sofia explicitly retained deployment herself. No push, hosting change, restart, deployment or production note mutation was performed by this agent. Repository GitHub inspection found zero Actions workflows and zero deployment records; no hosting command was invented.

## Observed live state

At **19:36 UTC / 15:36 EDT, October 26**, the internal browser loaded `https://circle.mit-sdg.dev/` using its existing signed-in session. Remember → Form still displayed **When / where**, whereas the tested source displays **Date (MM/DD/YYYY)**. Existing notes were left untouched and were not published in captures. This observation establishes an older frontend, not its backend commit or deployment ID.

Public HTTPS `/` returned 200; `/health` returned `ok`; Referrer-Policy was `no-referrer`, page Cache-Control `no-store`. [Public asset fingerprints](../code/tests/p4-output/live-public-a9.json) identify the observed JS/CSS only. They do not identify backend code. The Python client’s local CA lookup failed; the system HTTPS client succeeded with certificate validation enabled.

## Release the tested source

1. Deploy the final local repository through your existing process. A1–A8 are based on `ad4d2412b1c1a43ea813526abafb8244352eb2e8` plus the reviewed changes; final source/package fingerprints and clean-copy results are in [verification](p4-verification.md). Record the actual release commit after all chosen changes are committed.
2. Build/install using the existing lockfiles and Bun 1.4.2. Preserve server secrets, the existing app database and Commons configuration; keep provider configuration server-only. Verify the actual production `PUBLIC_ORIGIN` equals `https://circle.mit-sdg.dev`.
3. Record frontend and backend deployment identifiers, deployed source commit, deployment time, public origin and actual model/prompt version without credentials. Matching frontend assets and a healthy database alone do not establish the backend release.
4. Reload the public app from a fresh context. Confirm **Date (MM/DD/YYYY)**, rejection of `02/30/2026` without a save, and the new Recent people/original-content guidance. The tested current build uses JS `index-CYtcyy8i.js` and CSS `index-DC46iOEL.css`; another legitimate rebuilt fingerprint requires identifying its source rather than guessing release equality.

## Verify after deployment

Use only clearly labelled synthetic records. Keep existing records untouched. Record date, release, browser/device, expected/actual outcome, and any failure.

- Fresh HTTPS Commons sign-in; returning session; sign-out/in. Confirm another participant can obtain Commons access.
- Save a synthetic text note and a Form note, refresh and reopen in another session/device. Check supported and unsupported search against actual source evidence.
- Change Contact only and confirm activity/discussion/reminder/date survive. Change activity and confirm current search follows it while Personal notes retains the first wording.
- Cancel removal and use Escape; then remove a disposable synthetic encounter you created. Check it stays absent after refresh/search and a same-name note remains.
- Use two independent accounts to check list/search isolation and foreign memory IDs through the protected HTTP routes. Do not expose real notes or credentials in evidence.
- Exercise recoverable offline/expired-session handling. Use staging/injected errors for provider/database outages; do not break the shared deployment.
- On actual HTTPS hardware, test microphone allow/deny/cancel, review/correct transcript, save explicitly and confirm capture stops. Local mocked audio does not cover this.

Fill the release-validation table in [P4 verification](p4-verification.md#release-validation--a9--b2) only after observing each outcome. Controlled restart durability remains NOT RUN unless you actually test it. Record the demo against this same release; video is Sofia’s own deliverable, with a maximum duration of three minutes.
