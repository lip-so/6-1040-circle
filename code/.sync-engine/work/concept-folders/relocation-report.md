# Relocation report

Coordinator comparison against the working files captured immediately before this task (including pre-existing uncommitted changes). All differences below are relative module specifiers; no authored design or generated contract was edited.

```diff
--- code/src/concepts.ts
+++ code/src/concepts.ts
@@ -1,17 +1,17 @@
 import { createHash } from "node:crypto";
 import connectingSpec from "@design/concepts/Connecting.md" with { type: "text" };
-import * as memoryErrors from "./concepts/Remembering.ts";
-import * as needErrors from "./concepts/Seeking.ts";
-import * as graphErrors from "./concepts/Graphing.ts";
-import * as connectionErrors from "./concepts/Connecting.ts";
-import { ConnectingConcept } from "./concepts/Connecting.ts";
+import * as memoryErrors from "./concepts/Remembering/Remembering.ts";
+import * as needErrors from "./concepts/Seeking/Seeking.ts";
+import * as graphErrors from "./concepts/Graphing/Graphing.ts";
+import * as connectionErrors from "./concepts/Connecting/Connecting.ts";
+import { ConnectingConcept } from "./concepts/Connecting/Connecting.ts";
 import { conceptSet, registerConcept } from "@mit-sdg/sync-engine/assembly";
 import rememberingSpec from "@design/concepts/Remembering.md" with { type: "text" };
 import seekingSpec from "@design/concepts/Seeking.md" with { type: "text" };
 import graphingSpec from "@design/concepts/Graphing.md" with { type: "text" };
-import { EmptyContent, SubmissionConflict, RememberingConcept } from "./concepts/Remembering.ts";
-import { EmptyDescription, SeekingConcept } from "./concepts/Seeking.ts";
-import { EmptySourceContent, GraphingConcept, SourceNotOwned } from "./concepts/Graphing.ts";
+import { EmptyContent, SubmissionConflict, RememberingConcept } from "./concepts/Remembering/Remembering.ts";
+import { EmptyDescription, SeekingConcept } from "./concepts/Seeking/Seeking.ts";
+import { EmptySourceContent, GraphingConcept, SourceNotOwned } from "./concepts/Graphing/Graphing.ts";
 import federatingSpec from "@design/concepts/Federating.md" with { type: "text" };
 import registeringSpec from "@design/concepts/Registering.md" with { type: "text" };
 import sessioningSpec from "@design/concepts/Sessioning.md" with { type: "text" };
```

```diff
--- code/src/main.ts
+++ code/src/main.ts
@@ -6,9 +6,9 @@
 import { client, db } from "./db.ts";
 import { circleHttpPolicy } from "./host/http.ts";
 import { serializeApi } from "./host/admission.ts";
-import { configuredTranscriber } from "./concepts/transcription.ts";
-import { configuredExtractor } from "./concepts/openai-extractor.ts";
-import { configuredRecommendationPolicy } from "./concepts/recommendation-policy.ts";
+import { configuredTranscriber } from "./concepts/Remembering/transcription.ts";
+import { configuredExtractor } from "./concepts/Graphing/openai-extractor.ts";
+import { configuredRecommendationPolicy } from "./concepts/Connecting/recommendation-policy.ts";
 const site = resolve(import.meta.dir, "../frontend/dist");
 const port = Number(process.env.PORT ?? 3000);
 const publicOrigin = process.env.PUBLIC_ORIGIN ?? `http://localhost:${port}`;
```

```diff
--- code/src/assembly.ts
+++ code/src/assembly.ts
@@ -3,13 +3,13 @@
 import { composition } from "./compositions/Circle.ts";
 import { composition as accounts } from "./compositions/reusable/accounts.ts";
 import { composition as commons } from "./compositions/reusable/commons.ts";
-import { ConnectingConcept } from "./concepts/Connecting.ts";
-import type { RecommendationPolicy } from "./concepts/recommendation-policy.ts";
-import type { Transcriber } from "./concepts/transcription.ts";
-import { RememberingConcept } from "./concepts/Remembering.ts";
-import { SeekingConcept } from "./concepts/Seeking.ts";
-import { GraphingConcept } from "./concepts/Graphing.ts";
-import type { EncounterExtractor } from "./concepts/graphing-extraction.ts";
+import { ConnectingConcept } from "./concepts/Connecting/Connecting.ts";
+import type { RecommendationPolicy } from "./concepts/Connecting/recommendation-policy.ts";
+import type { Transcriber } from "./concepts/Remembering/transcription.ts";
+import { RememberingConcept } from "./concepts/Remembering/Remembering.ts";
+import { SeekingConcept } from "./concepts/Seeking/Seeking.ts";
+import { GraphingConcept } from "./concepts/Graphing/Graphing.ts";
+import type { EncounterExtractor } from "./concepts/Graphing/graphing-extraction.ts";
 import { RegisteringConcept } from "./concepts/Registering/Registering.ts";
 import { CommonsProvider, type Provider } from "./concepts/Federating/provider.ts";
 import { CommonsFederating, Sessioning, applicationConceptSet } from "./concepts.ts";
```

Moved `code/src/concepts/graphing-text.ts` → `code/src/concepts/Graphing/graphing-text.ts`.

```diff
--- code/src/concepts/graphing-text.ts
+++ code/src/concepts/Graphing/graphing-text.ts
@@ -1,4 +1,4 @@
-import { readMemoryFields } from "../memory-fields.ts";
+import { readMemoryFields } from "../../memory-fields.ts";
 export type EntityKind = "SELF" | "PERSON" | "ORGANIZATION" | "TOPIC" | "OPPORTUNITY";
 export type RelationKind = "MET" | "KNOWS" | "MEMBER_OF" | "WORKS_ON" | "RESEARCHES" | "INTERNED_AT" | "OFFERS" | "SOMETIMES_HOSTS" | "BASED_IN" | "DISCUSSED" | "FOUNDED" | "DESCRIBED_AS";
 export interface ExtractedEntity {
```

```diff
--- code/tests/compositions/Circle.test.ts
+++ code/tests/compositions/Circle.test.ts
@@ -2,7 +2,7 @@
 import { MongoClient, type Db } from "mongodb";
 import { assembleApplication } from "../../src/assembly.ts";
 import { NeedResults } from "../../src/compositions/Circle.ts";
-import { SeekingConcept } from "../../src/concepts/Seeking.ts";
+import { SeekingConcept } from "../../src/concepts/Seeking/Seeking.ts";
 
 const testUrl = process.env.TEST_MONGODB_URL;
 if (!testUrl) throw new Error("Set TEST_MONGODB_URL in .env to run the MongoDB tests.");
```

```diff
--- code/tests/compositions/authenticated-flows.test.ts
+++ code/tests/compositions/authenticated-flows.test.ts
@@ -4,11 +4,11 @@
 import { writeMemoryFields } from "../../src/memory-fields.ts";
 import { assembleApplication } from "../../src/assembly.ts";
 import { MemoryProvider, type Identity } from "../../src/concepts/Federating/provider.ts";
-import { GraphingConcept } from "../../src/concepts/Graphing.ts";
-import type { EncounterExtractor } from "../../src/concepts/graphing-extraction.ts";
-import { OpenAIEncounterExtractor } from "../../src/concepts/openai-extractor.ts";
+import { GraphingConcept } from "../../src/concepts/Graphing/Graphing.ts";
+import type { EncounterExtractor } from "../../src/concepts/Graphing/graphing-extraction.ts";
+import { OpenAIEncounterExtractor } from "../../src/concepts/Graphing/openai-extractor.ts";
 import { serializeApi } from "../../src/host/admission.ts";
-import type { Transcriber } from "../../src/concepts/transcription.ts";
+import type { Transcriber } from "../../src/concepts/Remembering/transcription.ts";
 import { circleHttpPolicy } from "../../src/host/http.ts";
 import { cleanupDatabases, testDatabase } from "../support/reusable/mongo.ts";
 
```

```diff
--- code/tests/providers/transcription.test.ts
+++ code/tests/providers/transcription.test.ts
@@ -1,5 +1,5 @@
 import { expect, test } from "bun:test";
-import { InvalidAudio, OpenAITranscriber, TranscriptionUnavailable, validateAudio } from "../../src/concepts/transcription.ts";
+import { InvalidAudio, OpenAITranscriber, TranscriptionUnavailable, validateAudio } from "../../src/concepts/Remembering/transcription.ts";
 test("voice input validates encoding, MIME and bounded size before provider work", () => {
     expect(validateAudio("AQID", "audio/webm")).toEqual(new Uint8Array([1, 2, 3]));
     for (const [audio, mime] of [["", "audio/webm"], ["AQI=\n", "audio/webm"], ["AQI=", "audio/ogg"], ["AR==", "audio/webm"]])
```

```diff
--- code/tests/providers/recommendation.test.ts
+++ code/tests/providers/recommendation.test.ts
@@ -1,5 +1,5 @@
 import { expect, test } from "bun:test";
-import { OpenAIRecommendationPolicy, RecommendationUnavailable, serializedPolicyInput } from "../../src/concepts/recommendation-policy.ts";
+import { OpenAIRecommendationPolicy, RecommendationUnavailable, serializedPolicyInput } from "../../src/concepts/Connecting/recommendation-policy.ts";
 const input = { description: "research", target: "candidate", reason: "Supported", gaps: ["Availability unknown"], exclusions: [{ target: "excluded", explanation: "private preference" }] };
 function answer(value: unknown) { return Response.json({ status: "completed", output: [{ type: "message", content: [{ type: "output_text", text: JSON.stringify(value) }] }] }); }
 test("recommendation request is stateless, strict, bounded, and contains only supplied owner context", async () => {
```

```diff
--- code/tests/concepts/Seeking.test.ts
+++ code/tests/concepts/Seeking.test.ts
@@ -1,6 +1,6 @@
 import { afterAll, afterEach, beforeAll, describe, expect, test } from "bun:test";
 import { MongoClient, type Db } from "mongodb";
-import { EmptyDescription, SeekingConcept } from "../../src/concepts/Seeking.ts";
+import { EmptyDescription, SeekingConcept } from "../../src/concepts/Seeking/Seeking.ts";
 
 const testUrl = process.env.TEST_MONGODB_URL;
 if (!testUrl) throw new Error("Set TEST_MONGODB_URL in .env to run the MongoDB tests.");
```

```diff
--- code/tests/concepts/OpenAIExtractor.test.ts
+++ code/tests/concepts/OpenAIExtractor.test.ts
@@ -1,5 +1,5 @@
 import { describe, expect, test } from "bun:test";
-import { ExtractionUnavailable, OpenAIEncounterExtractor } from "../../src/concepts/openai-extractor.ts";
+import { ExtractionUnavailable, OpenAIEncounterExtractor } from "../../src/concepts/Graphing/openai-extractor.ts";
 
 function standIn(answer: (init: RequestInit) => Response | Promise<Response>) {
   const calls: { address: string; init: RequestInit }[] = [];
```

```diff
--- code/tests/concepts/Remembering.test.ts
+++ code/tests/concepts/Remembering.test.ts
@@ -1,6 +1,6 @@
 import { afterAll, afterEach, beforeAll, describe, expect, test } from "bun:test";
 import { MongoClient, type Db } from "mongodb";
-import { EmptyContent, SubmissionConflict, RememberingConcept } from "../../src/concepts/Remembering.ts";
+import { EmptyContent, SubmissionConflict, RememberingConcept } from "../../src/concepts/Remembering/Remembering.ts";
 
 const testUrl = process.env.TEST_MONGODB_URL;
 if (!testUrl) {
```

```diff
--- code/tests/concepts/graphing-extraction.test.ts
+++ code/tests/concepts/graphing-extraction.test.ts
@@ -1,5 +1,5 @@
 import { describe, expect, test } from "bun:test";
-import { InvalidExtraction, validateExtraction } from "../../src/concepts/graphing-extraction.ts";
+import { InvalidExtraction, validateExtraction } from "../../src/concepts/Graphing/graphing-extraction.ts";
 
 const content = "At the seminar I met Mira. Her research focuses on ocean sensors.";
 function extraction() {
```

```diff
--- code/tests/concepts/lifecycle.test.ts
+++ code/tests/concepts/lifecycle.test.ts
@@ -1,7 +1,7 @@
 import { afterAll, expect, test } from "bun:test";
-import { RememberingConcept } from "../../src/concepts/Remembering.ts";
-import { SeekingConcept } from "../../src/concepts/Seeking.ts";
-import { ConnectingConcept } from "../../src/concepts/Connecting.ts";
+import { RememberingConcept } from "../../src/concepts/Remembering/Remembering.ts";
+import { SeekingConcept } from "../../src/concepts/Seeking/Seeking.ts";
+import { ConnectingConcept } from "../../src/concepts/Connecting/Connecting.ts";
 import { cleanupDatabases, testDatabase } from "../support/reusable/mongo.ts";
 afterAll(cleanupDatabases);
 test("memory revision preserves identity and dates; deletion erases text and blocks stale save retries", async () => {
```

```diff
--- code/tests/concepts/Graphing.test.ts
+++ code/tests/concepts/Graphing.test.ts
@@ -1,8 +1,8 @@
 import { afterAll, afterEach, beforeAll, describe, expect, test } from "bun:test";
 import { MongoClient, type Db } from "mongodb";
 import { writeMemoryFields } from "../../src/memory-fields.ts";
-import { EmptySourceContent, GraphingConcept, SourceNotOwned } from "../../src/concepts/Graphing.ts";
-import { InvalidExtraction } from "../../src/concepts/graphing-extraction.ts";
+import { EmptySourceContent, GraphingConcept, SourceNotOwned } from "../../src/concepts/Graphing/Graphing.ts";
+import { InvalidExtraction } from "../../src/concepts/Graphing/graphing-extraction.ts";
 
 const testUrl = process.env.TEST_MONGODB_URL;
 if (!testUrl) throw new Error("Set TEST_MONGODB_URL in .env to run the MongoDB tests.");
```

```diff
--- code/frontend/src/App.vue
+++ code/frontend/src/App.vue
@@ -3,7 +3,7 @@
 import type { CircleWireHttp } from "../../generated/wire.ts";
 import { api } from "./api/client.ts";
 import { readMemoryFields } from "../../src/memory-fields.ts";
-import { extractEncounter } from "../../src/concepts/graphing-text.ts";
+import { extractEncounter } from "../../src/concepts/Graphing/graphing-text.ts";
 import { memorySummary } from "./memory-summary.ts";
 import { useRecentPeople } from "./recent-people.ts";
 import { attempt, RequestScope } from "./request-scope.ts";
```

```diff
--- code/frontend/src/memory-summary.ts
+++ code/frontend/src/memory-summary.ts
@@ -1,5 +1,5 @@
 import { readMemoryFields } from "../../src/memory-fields.ts";
-import { extractEncounter } from "../../src/concepts/graphing-text.ts";
+import { extractEncounter } from "../../src/concepts/Graphing/graphing-text.ts";
 
 export interface MemoryDetail { label: string; value: string }
 
```

Moved `code/src/concepts/Remembering.ts` → `code/src/concepts/Remembering/Remembering.ts`.

Moved `code/src/concepts/transcription.ts` → `code/src/concepts/Remembering/transcription.ts`.

Moved `code/src/concepts/Seeking.ts` → `code/src/concepts/Seeking/Seeking.ts`.

Moved `code/src/concepts/Graphing.ts` → `code/src/concepts/Graphing/Graphing.ts`.

Moved `code/src/concepts/graphing-extraction.ts` → `code/src/concepts/Graphing/graphing-extraction.ts`.

```diff
--- code/src/concepts/graphing-extraction.ts
+++ code/src/concepts/Graphing/graphing-extraction.ts
@@ -1,4 +1,4 @@
-import { readMemoryFields } from "../memory-fields.ts";
+import { readMemoryFields } from "../../memory-fields.ts";
 import type { EntityKind, ExtractedClaim, ExtractedEntity, RelationKind } from "./graphing-text.ts";
 export interface EncounterExtractor {
     extract(content: string): Promise<unknown>;
```

Moved `code/src/concepts/openai-extractor.ts` → `code/src/concepts/Graphing/openai-extractor.ts`.

Moved `code/src/concepts/Connecting.ts` → `code/src/concepts/Connecting/Connecting.ts`.

Moved `code/src/concepts/recommendation-policy.ts` → `code/src/concepts/Connecting/recommendation-policy.ts`.

Validation: `bun run check` passed (all seven concepts; generated artifacts; backend TypeScript; Vue typecheck), with the existing 30 advisories. `bun run test`: 88 passed, zero failed, 590 assertions across 19 files. `bun run build` passed with existing SDK browser-externalization warnings. Providers were simulated by existing tests; disposable Mongo test databases were cleaned by test hooks. No new tests, product changes, dependency changes, live model calls or deployment.
