Changed source/test paths to inspect under the read grant:
- src/concepts/Graphing.ts, brain-provider.ts, Remembering.ts
- src/compositions/Circle.ts, inputs.ts, src/concepts.ts, src/assembly.ts, src/main.ts, src/host/http.ts
- frontend/src/App.vue, voice.ts, memory-summary.ts, encounter-text.ts, reusable/ContactRow.vue, reusable/ActionIcon.vue, style.css
- tests/concepts/Graphing.test.ts, BrainProvider.test.ts, tests/support/brain.ts
- tests/compositions/Circle.test.ts, authenticated-flows.test.ts; tests/ui/voice.test.ts, recent-people.test.ts
- scripts/check-brain.ts
Originals/list/tokens/confirmed removal/auth are preserved. Former _trace and backend graphing-text parser are removed; display fallback stays in frontend. Runtime alone selects configured real provider; assembly defaults unconfigured and tests inject fakes. Provider version includes schema/prompt release and pinned text model. Live check uses synthetic data only.
