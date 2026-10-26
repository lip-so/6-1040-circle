# Internal-browser inspection

October26,2026, baseline A5 production assets. User explicitly requested the internal browser. Selected in-app tab2; visited local synthetic-only preview at127.0.0.1:4174, visibly named synthetic-preview. It serves the actual built frontend with an isolated in-memory fixture API; no MongoDB, Commons or external AI call. This is rendered client inspection, not deployed integration.

Observed before A6 changes:
- Ten rows render, including separate equal names, unnamed/inferred, long/Unicode and contact fixtures.
- Expanding the first Mira and nested Personal notes shows preserved first wording without explaining how it differs from the current encounter.
- Resetting fixture to empty and reloading shows only No saved people yet; no first-encounter guidance/action.
- Remember focuses the note textarea. Form exposes optional strict date and the expected fields.
- Entering synthetic person plus impossible02/30/2026 and activating Save leaves the draft and focuses the date with Enter a real date in MM/DD/YYYY format, or leave it blank. No saved-success state appeared.

After-change internal-browser checks:
- Loaded empty Find shows a concise example and Remember your first encounter. Enter activation focuses note entry; no automatic save.
- A synthetic Form draft retained Person= Synthetic Mira and Does= Builds sensors through Find and the new action, with Person focused on return. Explicit Save then displayed Memory saved and a real rendered fixture row; this was only the in-memory mock API, not a backend persistence test.
- Ten-row reset renders the AI-summary/current-vs-original guidance. Expanding the edited first Mira and nested Personal notes displays the conditional first-saved-wording explanation plus the authentic fixture original. Equal-name second row stays independent.
- Keyboard traversal visibly focused an Edit control with a3pxblue outline. Rendered text remains14px; localized screenshot/background contrast samples are5.54:1 and6.20:1, focus-ring sample7.56:1. These localized checks do not establish comprehensive accessibility conformance.
- Current in-app viewport686x854 has no horizontal overflow; Recent people begins at documenty519.30. Before A6 the comparable internal screenshot placed it about80pxlower. Baseline1280x900probe gavey627.69; after-change desktop/narrow screenshots and automated tests preserve full content.
 NativeChrome control was not approved; the internal browser offers pageAssets/webmcp capabilities but no browser-zoom control. Do not claim nativezoom, independentphysicaldevice or hardware checks from these observations.

October 26 follow-up: named Jules removal confirmation opened; Escape closed it, kept Jules visible and returned focus to Remove Jules. Isolated in-memory fixture only. Screenshot internal-removal-cancel.png.
