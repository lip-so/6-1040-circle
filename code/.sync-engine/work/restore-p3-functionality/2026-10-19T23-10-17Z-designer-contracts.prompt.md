# Role and objective

Continue work unit `restore-p3-functionality`; role `designer`; phase `contracts`. The prior same-phase role contract remains authoritative.

# Access

This grant replaces prior access; other rules remain.

Current grant:

```json
{"readableAreas":[{"area":"work-unit","path":"context"},{"area":"application","path":"design"},{"area":"application","path":"src/compositions/Circle.ts"},{"area":"application","path":"src/concepts"},{"area":"application","path":"src/concepts.ts"}],"writableAreas":[{"area":"assigned-design","path":"compositions/Circle.md"},{"area":"assigned-design","path":"concepts/Connecting.md"},{"area":"assigned-design","path":"concepts/Graphing.md"},{"area":"assigned-design","path":"concepts/Remembering.md"},{"area":"assigned-design","path":"concepts/Seeking.md"},{"area":"assigned-design","path":"types.md"}],"toolKinds":["repository-read","repository-write"],"projectShell":"project-validation","network":false,"generatedOutput":false,"longRunningProcesses":false}
```

# Guidance

Unchanged from the prior same-agent context. Apply it to the task and changed context below.

# Context

## Task

**.sync-engine/work/restore-p3-functionality/designer-final-task.md**

Perform one final canonical documentation alignment batch from the supplied backend report; no implementation or product expansion. New user answer requires repeated normalized exact searches to reuse existing ongoing Need, preserve legacy duplicates, deterministic choice among existing matches, UUID only when none exists. Normalize outer/repeated whitespace and case, no paraphrase merging. Resolved need is not ongoing. Direct raw concurrent instances/multiple processes remain outside current admission guarantee.

Add linked ValidEvidence (nonempty member count + no InvalidEvidence), CurrentSuggestion (owned eligible connection, active owned Need, current graph target and complete evidence), SuggestionTrace (owned active Need plus current graph trace returning person label/source) helper views. Describe exactly the resulting supported realization, without new concepts/state. Add endpoint fence entry AND reaction link Circle.RefreshSuggestionsWork at same /suggestions/refresh as Reply: normal work branch auth→active-need fanout→reset→proof offers; separate RefreshSuggestions receive.afterFlowSettles→auth→one response, including zero active needs. One declaration owns input validator. Same request/causal flow; no extra frontier race or coordination pulse.

Document /memories/get output {memory:{memory,content,claims}}, not flat. Correct common unavailable response to HTTP404 {error:"NOT_FOUND"}; selected HTTP transport only exposes string errors, never error objects/messages. Keep other C01-C04/D01 protections.

Run syntax only. Return concise Status plus exact repairs; final source generation/check follows after design finalizes. Do not touch frontend, tests, configuration or journals.

## Brief

**.sync-engine/work/restore-p3-functionality/brief.md**

# Restore the functionality deferred from P2

## Goal
Deliver the full intended Circle beta: editable/deletable encounter memory, voice/text capture, evidence-backed cross-note retrieval, persistent ongoing goals and handled suggestions, and automatic rediscovery.

## Scope
Restore the four P1 concepts Remembering, Graphing, Seeking, Connecting and their composition/UI. Preserve Commons auth, original notes, safe manual retries, owner-scoped reads, legacy guided-data readability, separate same-name encounters, literal encounter context. No password auth, demo seeds, inferred dates, automatic people merges, external outreach, contact link execution, graph dashboard, or unrelated deployment/submission work.

## Requirements
Use existing P1 design as accepted product intent; translate it into strict installed-version canonical contracts. Add original lifecycle actions and grounded graph trace/gaps/ranking, with input validation, refusal mappings, owned source joins, and deterministic updates across changes. Voice transcription produces an editable draft, never an automatically saved note. Existing records remain readable. No global database clearing or automatic external reindexing. A failed downstream index/search keeps original saved data and reports an error. Invalidated/deleted evidence cannot continue to be shown as current. Concept classes cannot import peers. Use sync-engine DSL for cross-concept behavior. Provider settings/credentials are server-side and injectable for tests. Tests remain lean, cover actions/principles and privacy/data integrity; no cosmetic test expansion. Preserve all manual changes and Sofia's design journal.

## Active decisions
- Latest user request explicitly authorizes implementing every feature P2 temporarily deferred. Permanent product choices remain in force.
- Use the current accepted four-concept P1 design; no fresh decomposition is needed unless a real boundary defect is identified. A designer will translate contracts, followed by independent contract review.
- The contract designer may read bounded existing application concept/composition source beyond its normal design-only recommendation to preserve wire compatibility, persistence semantics, and owner boundaries during translation.
- Work in a temporary complete copy because the actual repository is outside the writable sandbox; apply reviewed changes back only after checking baseline hashes. No external data writes other than isolated test databases.
- Skill CLI uses the bundled Node 24 on PATH, retaining system Node 25. Matching analysis/catalog 1.1.0 tools are now direct dev dependencies as bootstrap requires; no framework version upgrades.
- Superseded draft assumptions: initially proposed retaining guided capture and leaving old searches inactive. User explicitly selected one free-form note with seamless reminders, every existing and new Need treated as ongoing, a quick Resolved action near it, and no separate Goal type. Use Looking for/search terminology in the UI rather than a to-do dashboard. People remain source-local; only unambiguous organizations/topics may connect notes. Legacy guided notes must still display and be editable.
- Runtime OpenAI key is not configured; all provider calls remain injectable. Actual OpenAI quality cannot be asserted from stand-in tests.
- Scope is implementation; it does not authorize publishing, deployment, recording/submission, or editing the user's design journal.
- Independent critic found and verified repairs for C01-C04. Deployed API uses a single-process complete-settlement FIFO including reads; callers admitting direct roots must serialize them. This conservative beta tradeoff avoids unsupported cross-concept concurrency guarantees. Multi-process use is outside this design.
- Backend concept and application implementation are deliberately combined in one worker with bounded source/tests/configuration grants, because revisions, complete proof and refresh ordering need coordinated edits. Network grants cover isolated test Mongo and local provider stand-ins only. No real provider key currently available. Frontend follows afterward against generated wire.
- Routed D01 repaired and independently verified: Graphing._members enumerates all supplied claim identities, including missing ones; InvalidEvidence rejects any missing current owned proof. No undocumented enumeration from is.among is assumed. Frontend draft preparation occurs outside the staged application while backend runs, then is applied and checked only after its run is finalized.
- Latest explicit user answer supersedes distinct-create repetition: repeated exact lookups reuse an existing ongoing Need. Normalize only case/outer/repeated whitespace, never merge paraphrases; preserve prior saved duplicate records. Resolved records are not ongoing. User selected simulated OpenAI responses for now; do not make live provider calls or ask for a key again during this increment. Canonical wording will be updated in the final batch after the active implementation record is finalized.

## Done when
- Signed-in users can create, edit, list/read, and delete their own encounters, including old guided notes; downstream failures preserve saved data without duplicate retries.
- Voice input can be recorded, transcribed with a server provider, reviewed/edited, and intentionally saved; cancellation and account changes discard pending capture safely.
- Users can create/list/update/resolve/reopen/delete ongoing needs; ALL legacy searches are ongoing unless explicitly resolved. Need and goal are one stored type. Resolved is a quick nearby action.
- Evidence-backed suggestions traverse safe cross-note paths, show source quotes and uncertainty, rank at most five, and avoid inferred jobs or identity merges.
- Users can inspect owned claims and reject/restore/remove them; forgetting a source withdraws its claims.
- Connecting stores suggestion status; repeated offers refresh evidence while preserving handled status; goal revision/resolve/delete clears suggestions as P1 specifies.
- New/changed/deleted memories or claims update relevant active-goal suggestions automatically, and the frontend shows the updated result without a page reload.
- Every changed boundary is owner-scoped and runtime validated. Required auth remains intact. Syntax, generated artifact/type/frontend checks, lean Mongo/provider/HTTP tests, build, and feasible real UI checks pass, with limitations explicit.

## Open questions
The user answered all current scope questions. Reuse existing ongoing searches for repeated exact lookups and use simulated OpenAI responses for now.

## Activity
- Inspected P1 product/design and P2 reductions; confirmed permanent decisions versus temporary deferrals.
- Created a complete staged copy, pinned workflow setup, and selected contract translation plus independent review before implementation.
- User answered capture, legacy-search, and identity questions; authoritative decisions updated before contract completion.
- Authored restored four-concept contracts passed syntax. Independent contract critic reviewed all obligations, requested four concrete repairs, and approved the repaired design after verification.

## Resolved decomposition findings

**.sync-engine/work/restore-p3-functionality/2026-10-19T22-59-00Z-application-worker-implementation.response.md**

## Status
Blocked

Backend implementation is complete and tested. Artifact generation and final contract checks await the canonical documentation updates below.

## Changed
- Restored Remembering, Seeking, Graphing and Connecting lifecycle behavior.
- Added complete owned-evidence validation, directed cross-note retrieval, automatic refresh, corrections, source retraction and revision protection.
- Implemented all 22 endpoint paths, including separate work/reply declarations for refresh.
- Added injected OpenAI transcription, bounded input validation and complete-settlement FIFO admission.
- Repeated normalized searches reuse an existing active need; new needs use UUIDs.
- Formatted changed TypeScript and added focused tests without restoring deleted low-priority cases.
- Updated `.env.example` with transcription configuration.

Frontend response shapes:
- `/memories/get`: `{ memory: { memory, content, claims } }`
- `/needs/list`: `{ needs: [{ need, description, active }] }`
- Need mutation/search results: `{ results: { need, description, active, suggestions } }`
- Suggestion lists: `{ suggestions: [{ need, description, connection, target, label, source, content, evidence, reason, gaps, sources }] }`
- Each source: `{ claim, source, quote, content }`
- Inspection: `{ suggestion: { ...suggestionFields, status, eligible } }`

## Checks
- `bun test` — **84 passed, 0 failed**, across 17 files; 539 assertions.
- `bunx tsc --noEmit` — passed.
- `bun run generate` — blocked by five canonical coverage declarations.
- `bun run check` — blocked by the same five declarations.

Outputs:
- `/private/tmp/circle-restoration-backend-tests.log`
- `/private/tmp/circle-restoration-generate.log`
- `/private/tmp/circle-restoration-check.log`

## Blockers
**Design/documentation only:**

1. Add endpoint declaration and reaction link for `Circle.RefreshSuggestionsWork` at `/suggestions/refresh`.
2. Add view links for `Circle.ValidEvidence`, `Circle.CurrentSuggestion` and `Circle.SuggestionTrace`.
3. Update Seeking.seek and Circle repetition semantics: reuse a deterministic existing active normalized-description match; preserve legacy duplicates; create a new UUID when none exists.
4. Document `/memories/get`’s nested `memory` record.
5. Replace unavailable-response wording with HTTP404 `{ error: "NOT_FOUND" }`. The selected HTTP transport permits string domain errors and exposes only `{ error }`.

No canonical design files were modified during this run.

## Concerns
OpenAI checks used simulated responses only, as requested. Deployment uses the documented single-process FIFO guarantee; concurrent independent application processes remain outside scope.

## Selected format and API references

**node_modules/@mit-sdg/sync-engine-http/public-surface.md**

# Public API

`@mit-sdg/sync-engine-http` has no root export or supported deep imports. The
registers below are exact; generated declarations define complete structural
types.

Install the HTTP companion and core at the same exact release version. The HTTP
package is ESM-only and supports Node.js 24 (`>=24 <25`).

| Package path                                    | Role                                  |
| ----------------------------------------------- | ------------------------------------- |
| [`@mit-sdg/sync-engine-http/policy`](#policy)   | Validated immutable deployment policy |
| [`@mit-sdg/sync-engine-http/handler`](#handler) | Fetch handler                         |
| [`@mit-sdg/sync-engine-http/client`](#client)   | Fetch transport and typed client      |
| [`@mit-sdg/sync-engine-http/tooling`](#tooling) | Generated HTTP wire projection        |

Policy supplies public and browser origins, public error mappings, and cookie
bindings. The package derives CORS, request-origin checks, cookie attributes,
and wire projection; it does not authenticate users or authorize operations.

## `policy`

<!-- register:http-policy:start -->

`HttpBrowserPolicy`, `HttpCookieBinding`, `HttpDirectRoute`, `HttpLimits`, `HttpPolicy`, `HttpPolicyBrand`, `HttpPolicyInit`, `HttpPublicErrorCategory`, `HttpRequestOriginPolicy`, `httpPolicy`

<!-- register:http-policy:end -->

### Direct routes

`direct` declares routes served outside POST/JSON, for clients that cannot post — a
browser following a link. The endpoint is unchanged: it still declares a value, and the
route declares how that value reaches the client.

```ts
httpPolicy({
  direct: [
    { method: "GET", path: "/{code}", endpoint: "/resolve", redirect: "target" },
    { method: "GET", path: "/{code}/stats", endpoint: "/report", status: 200 },
  ],
});
```

Each `{name}` segment fills the endpoint input of that name, percent-decoded, and an empty
segment does not match. `redirect` names a response field carrying an absolute URL and
answers `302` by default; `status` alone answers that status with the JSON body. A route
must state one of them. Only `GET` is supported, parameter names may not repeat, and two
routes may not share a method and shape. Malformed percent encoding does not match.
POST/JSON remains the default for everything else, and a declared route does not remove
its endpoint's POST path.

### `httpPolicy`

```ts
httpPolicy(init: HttpPolicyInit): HttpPolicy
```

`httpPolicy` validates and copies deployment facts into a frozen snapshot marked
with `HttpPolicyBrand`. Consumers reject raw structural objects.

```ts
interface HttpPolicyInit {
  readonly publicOrigin?: string;
  readonly basePath?: string;
  readonly publicErrors?: Readonly<Record<string, HttpPublicErrorCategory>>;
  readonly browser?: HttpBrowserPolicy;
  readonly requestOrigins?: HttpRequestOriginPolicy | false;
  readonly cookies?: Readonly<Record<string, HttpCookieBinding>>;
  readonly limits?: HttpLimits;
}
```

| Field                     | Accepted form and effect                                                                                                                            |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `publicOrigin`            | Exact absolute HTTP or HTTPS origin. Required for cookies and for `browser.credentials: true`; in either case it must use HTTPS or a loopback host. |
| `basePath`                | Portable absolute route prefix. Omission, `""`, and `"/"` select the origin root; trailing slashes are removed.                                     |
| `publicErrors`            | Own domain refusal code to public HTTP category. Unmapped, inherited, malformed, and non-string errors remain private.                              |
| `browser`                 | Exact browser origins and CORS facts.                                                                                                               |
| `requestOrigins`          | Cookie-path request-origin allowlist, or `false` to disable that control where permitted.                                                           |
| `cookies`                 | Nonempty record of named cookie bindings.                                                                                                           |
| `limits.requestBodyBytes` | Positive safe integer; defaults to 1,048,576 in the handler.                                                                                        |

`HttpPublicErrorCategory` is `INVALID_REQUEST`, `UNAUTHORIZED`, `FORBIDDEN`,
`NOT_FOUND`, or `CONFLICT`. Those categories map to status 400, 401, 403, 404,
and 409. `INTERNAL_ERROR` is package-derived and cannot be assigned in
`publicErrors`.

`publicOrigin` and every configured browser or request origin must contain only
an HTTP or HTTPS origin: no credentials, non-root path, query, or fragment.
Origins are normalized through `URL.origin` and must be distinct after
normalization. The accepted HTTP loopback hosts are `localhost`, `127.0.0.1`,
and `[::1]`.

### Browser policy and CORS

```ts
interface HttpBrowserPolicy {
  readonly origins: readonly string[];
  readonly credentials?: boolean;
  readonly allowedHeaders?: readonly string[];
  readonly exposedHeaders?: readonly string[];
  readonly maxAgeSeconds?: number;
}
```

`origins` is an exact allowlist. Wildcards are not accepted. Header names must
be valid and distinct without regard to case. `Content-Type` is added to
`allowedHeaders` when absent. `maxAgeSeconds` must be a non-negative safe
integer.

For an allowed request origin, the handler emits
`Access-Control-Allow-Origin`; it also emits
`Access-Control-Allow-Credentials: true` when `credentials` is true and emits
configured exposed headers. Every response processed under a browser policy
varies on `Origin`, including responses for missing or disallowed origins.

An `OPTIONS` request is treated as preflight only when a browser policy exists.
The path must name an application endpoint, the origin must be allowed, the
requested method must be `POST`, and every requested header must be allowed. An
accepted preflight returns 204 and advertises `POST, OPTIONS`; a rejected
preflight returns `FORBIDDEN`/403. Preflight responses also vary on
`Access-Control-Request-Method` and `Access-Control-Request-Headers`.

CORS controls browser response access, not authorization of cookie-bearing
requests; request-origin protection is separate.

### Request-origin protection

```ts
interface HttpRequestOriginPolicy {
  readonly allowed: readonly string[];
  readonly requireOrigin?: boolean;
}
```

The handler applies request-origin protection only to paths touched by a cookie
binding: protected, issue, and clear paths. When `requestOrigins` is omitted,
`allowed` defaults to `publicOrigin` plus `browser.origins`. An explicit
`allowed` list replaces that default and must include every browser origin.

A present `Origin` outside the allowlist returns `FORBIDDEN`/403. A missing
`Origin` is allowed by default. When `requireOrigin` is true, a missing `Origin`
on a cookie-touched path returns `FORBIDDEN`/403. Other paths are not checked by
this control.

`requestOrigins: false` disables request-origin protection. Policy construction
rejects that setting when a cookie uses derived or explicit `SameSite=None`.

### Cookie bindings

```ts
interface HttpCookieBinding {
  readonly name: string;
  readonly input: string;
  readonly issue: readonly {
    readonly path: string;
    readonly value: string;
    readonly expires: string;
  }[];
  readonly clear: readonly string[];
  readonly sameSite?: "Strict" | "Lax" | "None";
  readonly path?: string;
  readonly domain?: string;
}
```

Each binding must have a nonempty record key, a valid cookie `name`, a
JavaScript-style `input`, and at least one issue declaration. Issue `value` and
`expires` fields must be valid and distinct. Issue paths must be distinct,
clear paths must be distinct, and one binding cannot issue and clear on the same
path. Effective cookie names and logical inputs must be unique across bindings.
Cookie paths use the portable route-path grammar and cannot contain `;`, which
delimits cookie attributes. Domains must be plain domain names without a leading
dot.

Cookies always include `HttpOnly` and `Secure`. These attributes cannot be
overridden. `path` defaults to `/`; `domain` defaults to absent. A cookie whose
path is `/` and domain is absent receives `__Host-` unless its name already has
a valid secure prefix. Other cookies receive `__Secure-`. An explicit `__Host-`
name is rejected with an incompatible path or domain.

`SameSite` is derived from the presence of a credentialed browser policy, not by
comparing sites. No browser policy derives `Strict`.
`browser.credentials: true` derives `None`. Declaring cookies with a browser
policy whose `credentials` is absent or false is rejected. An explicit
`sameSite` override is accepted only when a browser policy is present.

`httpPolicy` does not know the application's endpoint contracts. The following
checks occur synchronously when `createHttpHandler` binds an application and
when `httpWire(...).project` projects one:

- issue and clear paths must name application endpoints;
- the bound input must be required by at least one endpoint;
- an endpoint cannot mention the bound input without requiring it;
- two cookies cannot protect the same endpoint;
- every issue endpoint output alternative must contain the declared value and
  expiry fields; and
- a direct route cannot serve a protected, issuing, or clearing endpoint.

## `handler`

<!-- register:http-handler:start -->

`HttpCorrelationOptions`, `HttpHandlerOptions`, `HttpResponseHeadersContext`, `createHttpHandler`

<!-- register:http-handler:end -->

### `createHttpHandler`

```ts
createHttpHandler(options: HttpHandlerOptions):
  (request: Request) => Promise<Response>

interface HttpHandlerOptions {
  readonly gateway: Gateway<ContractShape>;
  readonly application: Assembly<Record<string, new (...args: never[]) => object>>;
  readonly policy?: HttpPolicy;
  readonly correlation?: HttpCorrelationOptions;
  readonly responseHeaders?: HeadersInit | (
    (context: HttpResponseHeadersContext) =>
      HeadersInit | PromiseLike<HeadersInit>
  );
}
```

Omitting `policy` is equivalent to an empty policy. Supplying a non-branded raw
object throws. Handler construction binds `gateway` to `application`; binding
errors and application-dependent cookie-policy errors throw synchronously.

### Request handling

The handler accepts `POST` only. An `OPTIONS` request receives preflight
handling only under a browser policy. Every other method returns
`INVALID_REQUEST`/400; the handler does not emit an `Allow` header.

Routing uses `URL.pathname` after removing `basePath`. Query parameters do not
select a route. A path outside the base, a request for the base itself, or an
unknown POST path returns `NOT_FOUND`/404 without buffering a request body and
cancels the unread stream. Other rejections before body reading do the same. A
present `Content-Type` must be `application/json`, optionally with parameters;
omission is accepted. An empty body becomes `{}`. Malformed JSON or UTF-8,
unreadable, aborted, or oversized bodies return `INVALID_REQUEST`/400.

The handler buffers at most `limits.requestBodyBytes` request bytes, default
1,048,576. A numeric `Content-Length` larger than the limit fails before full
buffering; streamed bytes are counted independently. `Request.signal` stops a
pending body read and is passed with the effective correlation id to invocation.
Abort stops waiting but does not establish rollback or cancellation of accepted
application work.

A successful invocation returns status 200 and a JSON body. Serialization uses
core portable JSON serialization. An invocation throw, invalid cookie issue
value, invalid or non-future expiry, oversized serialized cookie, or response
serialization failure returns opaque `INTERNAL_ERROR`/500.

### Handler errors

| Result            | Status | Condition                                                                                                               |
| ----------------- | ------ | ----------------------------------------------------------------------------------------------------------------------- |
| `INVALID_REQUEST` | 400    | Invalid method, media type, body, body size, or framework input admission                                               |
| `UNAUTHORIZED`    | 401    | Domain refusal explicitly mapped to `UNAUTHORIZED`                                                                      |
| `FORBIDDEN`       | 403    | Domain mapping, rejected origin, or rejected preflight                                                                  |
| `NOT_FOUND`       | 404    | Route not found, including outside `basePath`                                                                           |
| `CONFLICT`        | 409    | Domain refusal explicitly mapped to `CONFLICT`                                                                          |
| `INTERNAL_ERROR`  | 500    | Private domain refusal, other framework failure, callback failure, serialization failure, or unexpected handler failure |

Public failure bodies contain only `{ error }`; domain details are not exposed.
Framework `INVALID_INPUT` maps to `INVALID_REQUEST`, and framework `NOT_FOUND`
maps to `NOT_FOUND`. Other framework failures are private.

### Cookie runtime behavior

For each protected path, the handler replaces the body field named by
`binding.input` with the decoded cookie or `null`. A non-object body on such a
path returns `INVALID_REQUEST`. Cookie headers larger than 16,384 bytes,
duplicate effective names, malformed percent encoding, and decoded values
outside printable ASCII are treated as an absent cookie.

On a successful issue path, the cookie value must be a printable ASCII string.
The expiry must be a `Date` or have a date-parsable string representation, and
must be in the future. The complete serialized cookie is limited to 4,096
bytes. The handler removes every issuing binding's value and expiry fields from
the JSON result. Successful issue and clear responses set
`Cache-Control: no-store`.

A successful clear path expires the configured cookie. An `UNAUTHORIZED`
response clears each binding that protects that path, whether or not a valid
cookie was present. `FORBIDDEN` and other failures do not clear cookies.

### Correlation and response headers

```ts
interface HttpCorrelationOptions {
  resolve(request: Request): string | undefined;
  responseHeader?: string;
}

interface HttpResponseHeadersContext {
  readonly request: Request;
  readonly path: string | undefined;
  readonly status: number;
  readonly correlationId?: string;
}
```

`resolve` runs synchronously once per request. A valid result is a nonempty
ByteString of at most 128 code units, contains no control character, and has no
leading or trailing space. A missing, invalid, or throwing result is replaced
with `crypto.randomUUID()`. When configured, `responseHeader` receives the
effective id unless the response already contains that header. The header name
must be valid and must not be reserved by HTTP policy.

`responseHeaders` may be static or computed asynchronously. An invalid static
header initializer throws during handler construction. A provider runs for
handled successes and failures. The handler drops cookie, cache, CORS,
representation, redirect, framing, and hop-by-hop headers from its result. This
includes `Set-Cookie`, `Cache-Control`, `Content-Type`, `Content-Encoding`,
`Content-Length`, `Location`, `Vary`, every `Access-Control-*` header, and
connection-specific fields. A provider throw, rejection, or invalid returned
initializer replaces the response with `INTERNAL_ERROR`/500; CORS and
correlation are then applied to that failure response.

Wrap the Fetch handler for preprocessing or response decoration. Wrappers are
outside the package's security boundary and can invalidate header and error
guarantees.

Handler calls may overlap. The handler has no disposal method. The caller owns
the application, gateway, and concept stores. The host owns the listener, static
files, TLS, process lifecycle, and other host resources. The host must route
complete Fetch requests to the handler, return its responses, and close every
resource that the host creates.

## `client`

<!-- register:http-client:start -->

`HeadersOption`, `HttpClientError`, `HttpClientErrorCode`, `HttpClientOptions`, `HttpRequestContext`, `createHttpClient`, `createHttpTransport`

<!-- register:http-client:end -->

```ts
createHttpTransport(options?: HttpClientOptions): ClientTransport<HttpClientError>
createHttpClient<Contract extends ContractShape>(
  options?: HttpClientOptions,
): Client<Contract, HttpClientError>
```

The client takes no policy and uses the generated projected wire type.

| `HttpClientOptions` field | Default and effect                                                                     |
| ------------------------- | -------------------------------------------------------------------------------------- |
| `baseUrl`                 | `API_BASE_URL`, then `/api`; `/` selects the origin root; trailing slashes are removed |
| `fetch`                   | `globalThis.fetch`                                                                     |
| `headers`                 | Header record or per-request synchronous/async provider                                |
| `credentials`             | `"same-origin"`; accepted values are `"include"`, `"omit"`, and `"same-origin"`        |
| `validateResponse`        | `createHttpClient` only; synchronous validation of the complete parsed result          |
| `maxResponseBytes`        | No cap; otherwise a positive finite integer                                            |

Options are resolved when the client or transport is constructed. Later changes
to `API_BASE_URL` do not alter the instance. The transport sends `POST`, adds
`Content-Type: application/json`, serializes `input ?? {}`, and passes the
configured credentials mode. Extra headers are merged afterward and may replace
`Content-Type`. Fetch redirects are rejected rather than followed, so configured
headers are not forwarded and the POST is not replayed at another URL.

`HeadersOption` providers receive `HttpRequestContext`: path, effective signal,
and the call's timeout and correlation id when supplied. The package does not
create a correlation request header. Header providers for concurrent calls may
run concurrently.

An empty response body becomes `{}`. A nonempty body must be valid UTF-8 and
parse as JSON; response `Content-Type` is not consulted. A non-2xx JSON object
with an `error` property is returned as the server result. A non-2xx response
without that envelope returns `BAD_STATUS`.

| `HttpClientErrorCode`      | Condition                                                          |
| -------------------------- | ------------------------------------------------------------------ |
| `HEADER_RESOLUTION_FAILED` | The header provider threw or rejected.                             |
| `NETWORK_ERROR`            | Fetch failed before a response was obtained, including a redirect. |
| `BAD_JSON`                 | The response body could not be read or parsed.                     |
| `BAD_STATUS`               | A non-2xx response lacked a JSON error envelope.                   |
| `RESPONSE_TOO_LARGE`       | Declared or streamed response bytes exceeded `maxResponseBytes`.   |

Abort and timeout use core error codes `ABORTED` and `TIMED_OUT`. `timeoutMs`
must be a positive finite integer no greater than 2,147,483,647; another value
returns core `INVALID_INPUT` before header resolution or Fetch. The timer covers
header resolution, Fetch, and body reading. Abort or timeout can settle while a
header provider or custom Fetch remains pending; neither proves that accepted
server work stopped.

A valid `maxResponseBytes` cap rejects an oversized numeric `Content-Length`
before buffering and counts streamed bytes. Overflow attempts to cancel the
response stream without waiting for cancellation. An invalid cap throws during
construction.

`createHttpClient` passes `validateResponse` to the core client. A false, thrown,
or asynchronous validation result returns core `TRANSPORT_ERROR`.
`createHttpTransport` alone does not apply that validator. The client does not
manage a Node cookie jar. The client and transport have no disposal method and
do not own Fetch agent resources.

## `tooling`

<!-- register:http-tooling:start -->

`HttpWireOptions`, `httpWire`

<!-- register:http-tooling:end -->

```ts
interface HttpWireOptions {
  readonly policy?: HttpPolicy;
  readonly name: string;
}

httpWire(options: HttpWireOptions): WireProjection
```

Omitting `policy` projects a plain JSON wire. A supplied policy must be a branded
value returned by `httpPolicy(...)`; a raw object throws when `httpWire` is
constructed. The projection name must satisfy core generated-contract naming
rules.

Projection maps each known refusal through `publicErrors`; an unmapped code and
an open domain-error branch contribute `INTERNAL_ERROR`. Cookie projection
removes each bound input from protected endpoints and removes value and expiry
fields from every issue endpoint. Application-dependent cookie validation runs
when the projection's `project(facts)` method executes, before artifacts are
compared or written.

Use the same policy for `createHttpHandler(...)` and `httpWire(...)`; the client
receives only the resulting generated type.

The [package README](README.md) provides tiered setup and the supported custom
transport building blocks. Core [execution semantics](https://github.com/mit-sdg/sync-engine/blob/main/docs/user/reference/semantics.md#boundary-gateway-and-client)
define invocation settlement and accepted-work cancellation. The package
[README](README.md#host-responsibilities-and-unsupported-features) defines HTTP
host responsibilities.

**node_modules/@mit-sdg/sync-engine/docs/user/reference/public-api.md**

# Public API

This reference lists every supported core subpath and export. Root and deep
imports are unsupported. Registers are exact; generated TypeScript declarations
define complete signatures.

The [support policy](../../../SUPPORT.md) defines stable compatibility,
generated-assembly compatibility, and format-version rules. The
[security policy](../../../SECURITY.md) defines the supported security-fix window.

| Package path                                 | Role                                                                 |
| -------------------------------------------- | -------------------------------------------------------------------- |
| [`@mit-sdg/sync-engine/language`](#language) | Concepts, reactions, views, formers, and their conditions            |
| [`@mit-sdg/sync-engine/assembly`](#assembly) | Concept registration, assembly lifecycle, retention, and audit sinks |
| [`@mit-sdg/sync-engine/boundary`](#boundary) | Endpoints, invocation, gateways, and transport binding               |
| [`@mit-sdg/sync-engine/client`](#client)     | Local and custom clients over a generated contract                   |
| [`@mit-sdg/sync-engine/tooling`](#tooling)   | Assembly inspection, read-back rendering, and wire generation        |
| [`@mit-sdg/sync-engine/advanced`](#advanced) | Low-level declarations, manual engines, and explicit escape hatches  |

## `language`

<!-- register:language:start -->

`Condition`, `QueryPromise`, `ReadLine`, `RelationView`, `count`, `compute`, `each`, `earlier`, `form`, `former`, `is`, `no`, `now`, `reaction`, `refused`, `returned`, `view`, `when`, `where`, `whether`

<!-- register:language:end -->

`language` declares but does not execute designs.

| API                    | Compact signature                                                                               |
| ---------------------- | ----------------------------------------------------------------------------------------------- |
| `reaction`             | `reaction(vars => when(trigger).where(...conditions).then(...consequences))`                    |
| `.afterFlowSettles()`  | `when(trigger).afterFlowSettles().then(step)` or `completedStage.afterFlowSettles().then(step)` |
| `returned` / `refused` | `(pattern?, { by?, except?, exceptBy? }?)`                                                      |
| `where`                | `where(...conditions)`                                                                          |
| `no` / `whether`       | `(readLine)`                                                                                    |
| `earlier`              | `earlier(action, input, output?)`                                                               |
| `now`                  | `now(variable)`                                                                                 |
| `view`                 | `view(name, (input, output, free) => where(...))`                                               |
| `count`                | `count(query, input, outputVariable)`                                                           |
| `compute`              | `compute(namedComputation, input, outputVariable \| outputPattern)`                             |
| `former`               | `former(name, (input, free) => form(...) \| where(...).form(...))`                              |
| `form`                 | `form({ ...shape })`                                                                            |
| `each`                 | `each(readLine).where(...).arranged(...).form(...)` or a fold                                   |
| `.splicing`            | `form({ ...shape }).splicing(...formerUses)`                                                    |
| `is`                   | `is.lt`, `is.le`, `is.gt`, `is.ge`, and `is.among` comparisons                                  |

`now(variable)` is available only in a reaction's `where` stage, including an
endpoint stage's `.where(...)`. It opens one logic variable and binds it to the
instant stamped on the current causal flow's outermost occurrence. The clock is
read once when that flow opens, not once per use, so every reaction in the flow
observes the same instant. The outermost occurrence log and the reaction binding
use that one stamp rather than taking separate clock readings.

A caller cannot author this value. Registration rejects `now` in views and
standing-state formers, as a trigger or action input, and in `receive(...)`, just
as the boundary prevents a caller from authoring `requestId`. A concept that
needs the instant still declares it as an action input; composition supplies it:

A reaction writes `.where(now(instant))` and then passes `instant` to each action
declaring it, as `Expiring.schedule({ subject, expiresAt, now: instant })` does.

`.afterFlowSettles()` may follow `when(trigger)` or a completed stage. It may be
followed directly by `.then(step)` or by `.where(...conditions).then(step)`. On
an initial deferred stage, `.where(...)` also accepts one frame function,
subject to the ordinary portability restrictions. A chained deferred stage
accepts condition lines only; TypeScript rejects a frame function, and untyped
use fails while constructing the declaration. Registration separately rejects
a later deferred stage when its containing chain cannot lower to reactions.

| Consumer           | Result                                                       | Empty selection |
| ------------------ | ------------------------------------------------------------ | --------------- |
| `.form({ ... })`   | One record per row                                           | `[]`            |
| `.count()`         | Number of rows                                               | `0`             |
| `.first(value)`    | Value from the first selected row after optional arrangement | `null`          |
| `.distinct(value)` | First-seen distinct values                                   | `[]`            |

The TypeScript contract for `count` requires one non-union query reference and
its complete input mapping, with undeclared fields rejected recursively. A
union-typed query reference is rejected outright so the input argument cannot
select or mask one possible query; choose one concrete query before calling
`count`.

`QueryPromise` is `"one" | "optional" | "many"`.
When a query promise is available as a TypeScript literal, concept-set types
link `"one"` to a record return and `"optional"` or `"many"` to an array of
records. Runtime evaluation checks the same container and cardinality contract.
`Condition`, `ReadLine`, and `RelationView` name reusable declaration shapes.
View and former builders receive binding bags. Reading a property, including by
destructuring, declares a stable logic variable in that input, output, or
free-binding partition. Completed views and formers take one object-shaped input
mapping.

`compute(...)` binds any complete result to one variable. When the awaited
result is a record-shaped, non-array object, an output pattern may instead bind
or test several fields, including nested fields. TypeScript checks the pattern against the
computation's return type, and generated wire provenance follows each field's
return-type path.

A `form({ ... })` entry accepts a bound variable, another formed node, or
portable JSON literal data. Literal objects and arrays are copied into the
former IR and do not require a computation. Non-finite numbers, `undefined`,
class instances, functions, symbols, and cyclic values are not portable former
literals.

`.splicing(...uses)` merges one or more record-rooted former fragments into a
host record. Each variable referenced by a fragment input must already be bound;
literal inputs are accepted. Fragment keys must not collide with host or
earlier-fragment keys. A plain optional fragment drops the host row when absent;
`whether(...)` preserves the row and fills the fragment leaves with `null`.
Runtime evaluation checks each fragment's declared promise and faults if it
produces several rows. A fragment must be record-rooted; the host may be a record
form or an `each(...).form(...)` selection row.

See [Application design authoring](../guide/authoring.md),
[reaction semantics](semantics.md#reactions), and [views and
formers](semantics.md#views-and-formers).

## `assembly`

<!-- register:assembly:start -->

`ActionRefusal`, `Assembly`, `ConceptFloor`, `ConceptImplementation`, `ConceptRegistration`, `ConceptSetAssemblyOptions`, `ExecutionLimits`, `FileLogSink`, `FiringRecord`, `ImplementationOverrides`, `Implementations`, `IntegrityFailureRecord`, `LogEntry`, `LogSink`, `Logging`, `OperationalEvent`, `OperationalObserver`, `OperationalResultClass`, `QueryCacheMode`, `ReactionFailureRecord`, `RawFaultReport`, `RawFaultReporter`, `RegisteredConcept`, `RegisteredConceptSet`, `RetentionPolicy`, `assemble`, `conceptFloor`, `conceptSet`, `registerConcept`

<!-- register:assembly:end -->

### Assembly construction

```ts
assemble(options: ConceptSetAssemblyOptions): Assembly
```

| `ConceptSetAssemblyOptions` field | Required    | Default / effect                                                                                             |
| --------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------ |
| `conceptSet`                      | yes         | Registered application concept set                                                                           |
| `composition`                     | yes         | Reactions, endpoints, views, and formers to register                                                         |
| `initialize`                      | conditional | Constructor tuples; required when canonical classes need arguments and `instances` does not supply them      |
| `instances`                       | no          | Ready implementations by instance name; each overrides `initialize`; object identities must be distinct      |
| `logging`                         | no          | `Logging.OFF`; alternatives are `TRACE` and `VERBOSE`                                                        |
| `retention`                       | no          | `{ window: 100 }`; accepts any valid `{ window: number }` or `"keepAll"`                                     |
| `queryCache`                      | no          | `"memoize"`; `"none"` disables query-result memoization                                                      |
| `clock`                           | no          | System clock; called once when each causal flow opens to stamp its outermost occurrence and supply `now`     |
| `logSink`                         | no          | No external sink; `append` receives each validated, redacted entry and must return `undefined` synchronously |
| `executionLimits`                 | no          | Unbounded profile; validates and enforces every `ExecutionLimits` field                                      |
| `observers`                       | no          | No operational observers                                                                                     |
| `rawFaultReporter`                | no          | No privileged raw action, interpreter, or endpoint-validator failure handoff                                 |
| `redaction`                       | no          | Universal sensitive-field patterns only                                                                      |

`RetentionPolicy` is `"keepAll" | { window: number }`. A retention window must
be a finite, non-negative integer. Window enforcement runs automatically only
after a causal flow settles. `{ window: 0 }` therefore allows an active flow to
complete before evicting it. The public assembly and engine surfaces expose no
manual prune operation.
Every assembly owns an internal occurrence index; `logSink` neither replaces it
nor restricts `retention`.

`Assembly` exposes `concepts`, `invoker`, `publicInterface`, `beginDrain()`,
`whenIdle()`, and `form(fusedFormer)`. Drain closes root admission immediately;
both lifecycle promises resolve when accepted action, query, and former work
actually settles. `form(...)` resolves to the formed runtime value; an optional
record former contributes `null` to that result.
`ActionRefusal` is the direct-action refusal result.
For a registered exception, it contains the specification code and sentence as
`detail`. The standard boundary refusal funnel exposes the code without that
detail.
`ConceptImplementation`, `Implementations`, and `ImplementationOverrides` name
complete or partial implementation maps. Assembled non-query actions are
asynchronous and conservatively resolve to their awaited result or an
`ActionRefusal`; underscore-prefixed queries resolve asynchronously to their
declared implementation answer.

Ordinary assembly rejects local closures, explicit `custom` operations, `$is`
object-identity patterns, raw transforms, and whole unlowered reactions before
returning an invoker or routes. Manual `advanced` engines retain these escapes.
Assembly recursively discovers tagged declarations in nested plain records and
module namespace objects. Reactions and endpoints use their dotted record path
as the registration name; views and formers retain the names supplied to their
constructors. Untagged, nullish, and nondeclaration leaves are ignored; assembly
does not call function leaves as composition factories.

`OperationalEvent` is the stable discriminated union for action settlement,
interpreter and integrity failure, invocation settlement, limit breach, and
drain state. `OperationalObserver` callbacks are synchronous bounded handoff:
the engine catches throws and never awaits returned work; exporters and network
I/O belong behind a host-owned queue. Events carry no action input or output.
`OperationalResultClass` names the safe result categories.
`RawFaultReport` is the privileged discriminated union for the original
`unknown` values thrown by actions, interpreter stages, and endpoint validators.
`RawFaultReporter` failures are isolated: a throw or rejected returned
promise-like value does not change the action or invocation result. Raw values
do not enter ordinary occurrence evidence, operational events, process logs, or
public framework errors. Restrict access to this reporter as for any other
sensitive host sink.

### Registration and floors

An ordinary application creates one registered concept-set object and passes
that object—not its `.concepts` property—to assembly. Every key is a selected
application instance name, and every value is the registered concept definition
that instance realizes:

```typescript
export const applicationConceptSet = conceptSet({
  Posting: posting,
  Commenting: commenting,
});

export const { concepts } = applicationConceptSet;

assemble({
  conceptSet: applicationConceptSet,
  composition,
});
```

`applicationConceptSet.concepts` contains typed concept declarations used while
writing composition. `applicationConceptSet.implementations(...)` constructs
concrete implementation maps, and `applicationConceptSet.computations` contains
the named computation references supplied to `conceptSet`. The complete
`applicationConceptSet` retains all three facets and the internal declaration
needed by assembly and tooling.

| API               | Compact signature                                                 |
| ----------------- | ----------------------------------------------------------------- |
| `registerConcept` | `registerConcept({ class, spec, refusals?, floors? })`            |
| `conceptSet`      | `conceptSet({ ...registeredConcepts }, computations?)`            |
| `conceptFloor`    | `conceptFloor(conceptSet, { name, instances, resources, close })` |

`ConceptRegistration`, `RegisteredConcept`, `RegisteredConceptSet`, and
`ConceptFloor` name those descriptors. Floor names must be non-empty, and each
supplied floor value must be a factory function. Each call to
`set.implementations(floor, context)` first verifies that the named floor is
complete, then calls its selected factory exactly once for every concept-set key.
Each factory receives that exact caller-supplied `context`, followed by that
key's application instance name; TypeScript requires the context to satisfy
every selected factory's first parameter. A second `implementations(...)` call
performs construction again. This context is separate from
`ConceptFloor.resources`.

A floor name is available through the typed `implementations(...)` overload only
when every selected registration supplies it. If an incomplete floor is
selected by bypassing that type restriction, selection fails before any factory
runs. The zero-argument `implementations()` form is available only when every
canonical class can be constructed without required arguments; each call
constructs one new object per selected key. Otherwise use a named floor.

Assembly itself does not always call floor factories. For each selected name,
`assemble` uses a supplied `instances` object first, otherwise constructs from
supplied `initialize` arguments, otherwise default-constructs the canonical
class. Within one assembly, two names cannot use the same raw implementation
object. This identity check is assembly-local: the same raw object may be used
in a separate assembly under a semantically compatible registration, which then has a
separate action queue and query cache. Incompatible metadata remains invalid because one
object cannot honor two conflicting contracts.
Separate objects are not proof of separate durable state. A persistent floor
factory should use its instance-name argument to select an explicit repository,
collection, schema, namespace, or equivalent resource when isolation is
required. Intentional resource sharing remains host configuration.

The optional second `conceptSet` argument supplies named pure computations.
The set exposes inferred references under `set.computations`. Compose raw
records before constructing one set; refs from separate concept sets cannot be
combined.

`conceptFloor` validates a complete implementation map and returns the supplied
descriptor. Assembly does not install, own, or call the floor's `close()`
method. The host owns floor selection and lifecycle.

`RegisteredConcept.specification` is the machine-readable version-1
`ConceptSpec` extracted from the strict ordered Purpose, Principle, Types, State,
Actions, and Queries sections. It retains external declarations, normalized full
State text, structured action branches and outcomes, query choices, and source
locations. Config-based checking compares
member, input, action-result, query-row, return-name, optionality, and refusal
shapes with resolvable TypeScript source. It also uses the SSF-owned names, aliases
included, and joined subset identifiers to prove qualified external-binding targets.
Query choices are enforced when a reaction, view, or former evaluates a query. Opaque invariant/prose semantics are not
compared with class fields, floor implementations, databases, or storage.

### Occurrence index and log sinks

Every engine owns a nonreplaceable process-local occurrence index for reaction
matching and retained inspection, governed by `RetentionPolicy`.

`LogSink.append(entry)` is the synchronous audit extension point. The engine
validates the entry, redacts engine-created mappings, calls the sink with a
structural snapshot, then folds it into the internal index. Arrays and plain records are copied and frozen.
Invocation concept and action fields become frozen, name-preserving
representatives. `Date` values are copied.
Opaque leaves such as class instances, `Map`, `Set`, and functions
retain their runtime representation and identity. The snapshot does not
recursively freeze opaque leaves. The sink must treat opaque leaves as read-only
sensitive values; structural readonly types do not make those leaves immutable.
`append` must return `undefined` synchronously. A throw or any other return
value, including a promise or structural thenable, fails the append before the
fold. An invocation append failure can prevent the action body from running. An
outcome append failure can occur after the body has changed concept state; the
engine does not roll that state back. A deferred firing append can fail after its
consequence changed state. If recording the resulting reaction failure also
fails, settlement aborts and the outer action call rejects; active-flow matching
state is still cleared, and concept state is not rolled back.

`FileLogSink(path)` implements `LogSink` with one append-only JSON audit
projection per entry. Concept instances and action functions are represented by
name. Before writing, it independently applies the default field-name redaction
policy to invocation inputs, outcomes, faults, and firing bindings, including
entries passed directly to `append`. It never reads or replays existing lines,
and retention never rewrites the file. `FileLogSink` has no close API. A custom
sink remains responsible for its own durability, concurrency, retry, and
resource lifecycle; the host closes custom resources after drain through an
application-defined API.

`LogEntry`, `FiringRecord`, `ReactionFailureRecord`, and
`IntegrityFailureRecord` name the corresponding contracts. Persistence,
eviction, redaction, sink failure, and restart limits are normative in
[Execution semantics](semantics.md#logs-concept-implementations-and-restart).
The [persistence and restart recipe](../guide/persistence-recovery.md#persistence-restart-and-recovery)
shows separate concept-state and occurrence files plus explicit derived-state
recovery.

## `boundary`

<!-- register:boundary:start -->

`ApplicationInterface`, `TransportBinding`, `WireProjectionFacts`, `EndpointDef`, `EndpointOptions`, `EndpointValidator`, `EndpointValidators`, `ExecutionLimits`, `FrameworkErrorCode`, `Gateway`, `GatewayOptions`, `GatewayTarget`, `InputContractDecl`, `InvocationResult`, `InvokeOptions`, `Invoker`, `OperationalEvent`, `OperationalObserver`, `OperationalResultClass`, `ValidationResult`, `assertPortableRoutePath`, `bindTransport`, `createGateway`, `endpoint`, `receive`, `respond`, `serializeJsonValue`

<!-- register:boundary:end -->

### Endpoints

| API        | Compact signature                                                                        |
| ---------- | ---------------------------------------------------------------------------------------- |
| `endpoint` | `endpoint(path, vars => receive(input)...then(respond(body)), { input?, validators? }?)` |
| `receive`  | `receive(input?)`                                                                        |
| `respond`  | `respond(body?)`                                                                         |

`EndpointDef`, `EndpointOptions`, and `InputContractDecl` name the declaration
and optional runtime outer-shape contract. `EndpointValidator`,
`EndpointValidators`, and `ValidationResult` define schema-library-neutral
input, successful-output, and domain-error checks. The domain-error validator
receives exactly the value of the authored response's top-level `error` field.

| Type                 | Shape                                                    |
| -------------------- | -------------------------------------------------------- |
| `ValidationResult`   | `{ ok: true } \| { ok: false; detail?: string }`         |
| `EndpointValidator`  | `(value: unknown) => ValidationResult`                   |
| `EndpointValidators` | Optional `input`, `output`, and `domainError` validators |

[Execution semantics](semantics.md#sibling-paths-and-endpoint-settlement)
defines endpoint settlement. A stage may state `.afterFlowSettles()` to form its response at a
settlement frontier. Add conditions that identify any terminal state the
endpoint requires; see [deferred triggers and settlement
frontiers](semantics.md#deferred-triggers-and-settlement-frontiers).

Endpoint paths must be canonical portable absolute URL pathnames. Queries,
fragments, scheme-relative paths, dot-segment normalization, malformed percent
escapes, literal spaces, and literal Unicode are rejected; the declared spelling
must survive WHATWG pathname handling unchanged. See [Correlation and route
paths](semantics.md#correlation-and-route-paths). `receive(...)` cannot author
the framework-owned `path` or `requestId` fields. `respond(...)` cannot author
`requestId` or `errorKind`.

Applications supply endpoint validators explicitly. Generated types and concept
State notation have no runtime schema semantics. Validators must return a
`ValidationResult` synchronously; a promise-like result fails validation.

| `InputContractDecl` field | Default / effect                                 |
| ------------------------- | ------------------------------------------------ |
| `required`                | `[]`; missing listed keys return `INVALID_INPUT` |
| `defaults`                | `{}`; fills listed keys only when absent         |

Without an explicit contract, assembly derives required keys from portable
endpoint IR: it intersects the non-reserved keys mentioned by every exported
`receive(...)` pattern for the path. A key outside that intersection cannot be
required because at least one path alternative does not mention it. An
executable-only endpoint has no derived contract. An explicit contract is
authoritative and replaces the derived contract; it does not merge with it. At
most one endpoint declaration may supply an explicit contract for a given path.
Assembly rejects an explicit contract when omitting its optional keys cannot
match any receive alternative after declared defaults are applied.
Admission checks required keys before shallowly applying defaults, then invokes
the application ask. An invalid successful output records an integrity failure
and returns opaque `INTERNAL_ERROR`. An invalid domain-error value records
`invalid-domain-error` integrity evidence and also returns opaque
`INTERNAL_ERROR`. A thrown validator fails closed and reaches
`rawFaultReporter`, when configured, as an unsanitized `endpoint-validator`
report. An input-validator throw returns `INVALID_INPUT` before the boundary ask;
output and domain-error integrity evidence retain only the `ValidatorFault`
class. A path may declare each validator at most once.

### Gateway and invocation

```ts
createGateway<Contract>(options: GatewayOptions): Gateway<Contract>
invoker.invoke(path, input, options?: InvokeOptions): Promise<InvocationResult>
```

| `GatewayOptions` field | Required | Default / effect                                         |
| ---------------------- | -------- | -------------------------------------------------------- |
| `application`          | yes      | `GatewayTarget` exposing `invoker` and `publicInterface` |
| `executionLimits`      | no       | Unbounded gateway admission and caller deadline          |
| `observers`            | no       | Drain, limit, and final public-call settlement events    |

| `InvokeOptions` field | Default / effect                                                                    |
| --------------------- | ----------------------------------------------------------------------------------- |
| `signal`              | No signal; an abort ends the wait with `ABORTED`                                    |
| `timeoutMs`           | `30_000` without `executionLimits`; otherwise `maxRequestDurationMs`                |
| `correlationId`       | The generated request id; supplied values cross gateway and application observation |

`ExecutionLimits` requires positive finite integers for active root flows,
pending requests, actions and firings per flow, rows per evaluation, and the
maximum caller deadline. `maxRequestDurationMs` must not exceed the reliable
platform timer maximum of 2,147,483,647 ms. Overload and drain return
`UNAVAILABLE`. `Gateway` also exposes `beginDrain()` and `whenIdle()` and
includes the target assembly's lifecycle when that target supplies it.

An explicit `timeoutMs` must be a positive finite integer no greater than
2,147,483,647 ms. When execution limits are configured, it must also not exceed
the layer's maximum request duration. An invalid value returns `INVALID_INPUT`
before work is recorded. Gateway and application invokers apply the option as
separate durations; it is not one absolute deadline shared by both layers.

The gateway decorates the target application's `Invoker` and uses the target's
reaction engine. Observers
receive gateway limit and drain events plus exactly one `invocation-settled`
event for each public `invoke` call after the final result is known. That event uses the
requested application route and effective correlation id, includes the final
result class and applicable framework code, measures through the final
caller-visible result, and may omit `flow`. Accepted sibling work can continue
afterward; use `whenIdle()` to observe flow quiescence.

`Gateway`, `GatewayTarget`, `Invoker`, and `InvocationResult` name these
contracts. Timeout and abort stop waiting but do
not cancel forwarded application work. A fault-free unanswered endpoint reaches
`TIMED_OUT`; an unanswered flow with a recorded interpreter failure settles
promptly as opaque `INTERNAL_ERROR`. See [Failures between action
asks](semantics.md#failures-between-action-asks) and
[Cancellation](semantics.md#cancellation).

### Transport binding

| API                       | Compact signature / role                                    |
| ------------------------- | ----------------------------------------------------------- |
| `bindTransport`           | `bindTransport({ application, gateway }): TransportBinding` |
| `assertPortableRoutePath` | Rejects noncanonical public route spellings                 |
| `serializeJsonValue`      | Shared JSON serialization for a transport adapter           |

`bindTransport(...)` verifies that a gateway belongs to the assembly and returns
a narrowed invoker plus frozen route and logical-wire facts, without reaction
state, mutable registries, or lifecycle controls. Same-version duplicate core
packages retain global identity behavior. Custom adapters need no first-party
transport package.

`WireProjectionFacts` is the immutable route and logical-wire input passed to a
generated projection. It remains transport-neutral; core owns strict leaf
checks, concept-set anchoring, rendering, provenance, and atomic artifact
writes.

### Framework errors

`FrameworkErrorCode` is the stable core value object; its value union names the
core boundary and client framework failures. A transport may add its own error
union. Controlled admission details may accompany an error, but exception text
from an unknown failure is omitted.

| Code              | Ordinary source                                              |
| ----------------- | ------------------------------------------------------------ |
| `INVALID_INPUT`   | Shape, contract, option, or input validation                 |
| `NOT_FOUND`       | Unknown logical route                                        |
| `UNAVAILABLE`     | Overload or draining admission                               |
| `TIMED_OUT`       | Invocation or transport wait expired                         |
| `ABORTED`         | Invocation or client signal aborted                          |
| `INTERNAL_ERROR`  | Application, framework, validation, or interpreter fault     |
| `TRANSPORT_ERROR` | Forwarding, transport, or client-response validation failure |
| `UNKNOWN_ERROR`   | Unclassified framework envelope                              |

## `client`

<!-- register:client:start -->

`Client`, `ClientCallOptions`, `ClientError`, `ClientOptions`, `ClientRequest`, `ClientResponseValidator`, `ClientTransport`, `ContractShape`, `DomainErrorValue`, `createClient`, `createLocalClient`

<!-- register:client:end -->

### Constructors

| API                 | Compact signature                                                                                                          |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `createLocalClient` | `createLocalClient<Contract>({ invoker, validateResponse? }): Client<Contract>`                                            |
| `createClient`      | `createClient<Contract, TransportError = ClientError>({ transport, validateResponse? }): Client<Contract, TransportError>` |

`ClientOptions.transport` and `createLocalClient`'s `invoker` are required.
The optional synchronous `validateResponse(value, { path })` checks each complete
untrusted transport result. A
`{ ok: false }` result, throw, or promise-like result resolves to
`{ error: "TRANSPORT_ERROR" }`; an accepted value is returned unchanged.
`ClientTransport` and `ClientRequest` name the extension contract. Every
endpoint call accepts an optional second `ClientCallOptions` argument:

| Field           | Transport request effect                                                        |
| --------------- | ------------------------------------------------------------------------------- |
| `signal`        | Carries caller abort; cancellation behavior depends on the selected transport   |
| `timeoutMs`     | Carries a transport-local timeout; the core client does not interpret the value |
| `correlationId` | Carries a trace token when the selected transport supports correlation          |

`ClientRequest` carries the same three optional fields. None promises rollback
or cancellation of accepted server work.
A `Client<Contract>` supports grouped access such as
`client.rooms.get(input)` and indexed access such as
`client["/rooms/get"]`, followed by the input call. A path rooted at `then` or
containing an `inspect`, `toJSON`, `toString`, or `valueOf` segment remains
available through indexed access only; Promise assimilation, serialization,
inspection, and primitive coercion therefore cannot invoke an endpoint
implicitly.

`ContractShape` is the path-to-input/output/error record accepted by every
constructor. `ClientError` is `{ error: FrameworkErrorCode; detail?:
string }`; `DomainErrorValue` extracts a generated route's domain error value.
Calls resolve handled transport failures as error envelopes. JSON projection
and error delivery are normative in
[Execution semantics](semantics.md#boundary-gateway-and-client).

`createClient` replaces a nullish input with `{}`. A transport throw or rejected
promise resolves as `{ error: "TRANSPORT_ERROR" }`. A transport-specific error
type can be supplied as the second generic parameter. This does not weaken the
generated endpoint input and output types.

## `tooling`

<!-- register:tooling:start -->

`ActionTriggerIR`, `AppIR`, `ApplicationDiagnostic`, `ApplicationManifestV1`, `ChannelTriggerIR`, `ComputationInventoryIR`, `ConceptImplementationProvenanceIR`, `ConceptInventoryIR`, `ConceptSpecDiagnostic`, `ConceptSpecDiagnosticCode`, `ConceptSpecParseResult`, `ConceptSpecificationIR`, `ConsequenceIR`, `DiagnosticCode`, `DiagnosticSeverity`, `FormerIR`, `FormerNodeIR`, `FormerSourceIR`, `GeneratedApplication`, `ManifestEndpointV1`, `ObservedOccurrence`, `PatternIR`, `PlannedWireProjection`, `ProjectionProvenance`, `ProjectionRenderOptions`, `QueryRefIR`, `ReactionIR`, `SpecificationActionIR`, `SpecificationExternalTypeIR`, `SpecificationFieldIR`, `SpecificationLocationIR`, `SpecificationQueryIR`, `SpecificationRefusalIR`, `SpecificationResultIR`, `SpecificationStateIR`, `SpecificationTypeIR`, `SpliceIR`, `TriggerIR`, `UnloweredIR`, `ValueIR`, `ViewIR`, `ViewOpIR`, `WhereOpIR`, `WireContractsIR`, `WireEndpoint`, `WireOptions`, `WireProjection`, `WireProjectionResult`, `WireRenderOptions`, `WireType`, `applicationDiagnostics`, `applicationManifest`, `applicationManifestDigest`, `diagnosticsFail`, `inspectAssembly`, `parseApplicationManifest`, `parseConceptSpecification`, `renderApp`, `renderApplicationManifest`, `renderInputContracts`, `renderReaction`, `renderWireTypes`, `validateApplicationManifest`, `wireContracts`

<!-- register:tooling:end -->

### Inspection and rendering

| API                           | Compact signature                                                            |
| ----------------------------- | ---------------------------------------------------------------------------- |
| `inspectAssembly`             | `inspectAssembly(assembly)`                                                  |
| `renderApp`                   | `renderApp({ title, concepts, app }): string`                                |
| `renderReaction`              | `renderReaction(reaction): string`                                           |
| `renderInputContracts`        | `renderInputContracts(contracts): string`                                    |
| `wireContracts`               | `wireContracts(app, options?: WireOptions): WireContractsIR`                 |
| `renderWireTypes`             | `renderWireTypes(wire, moduleName? \| options?): string`                     |
| `applicationManifest`         | `applicationManifest(assembly): ApplicationManifestV1`                       |
| `applicationManifestDigest`   | `applicationManifestDigest(manifest): string`                                |
| `parseApplicationManifest`    | `parseApplicationManifest(source): ApplicationManifestV1`                    |
| `renderApplicationManifest`   | `renderApplicationManifest(manifest): string`                                |
| `validateApplicationManifest` | `validateApplicationManifest(value): asserts value is ApplicationManifestV1` |
| `applicationDiagnostics`      | `applicationDiagnostics(app, endpoints, wire)`                               |
| `diagnosticsFail`             | `diagnosticsFail(diagnostics, "errors" \| "warnings"?)`                      |
| `parseConceptSpecification`   | `parseConceptSpecification(markdown): ConceptSpecParseResult`                |

`AppIR`, `ReactionIR`, `ViewIR`, `FormerIR`, `ConceptInventoryIR`, and
`ObservedOccurrence` name inspected data. `ObservedOccurrence` contains the
concept, action, optional `by`, output, and outcome summary; it omits input,
action id, flow, and timestamp. Inspection reports only evidence retained by
the internal occurrence index and applies redaction again. `WireContractsIR`, `WireEndpoint`, and
`WireType` name derived wire data. A `WireType` reference origin uses concept,
member, and path for action/query signatures. The `computation-input` and
`computation-output` origins instead use computation and path to identify the
registered vocabulary computation's `fn` parameter or awaited result.
`WireEndpoint.inputAdmissionError` preserves whether framework input admission
contributed `INVALID_INPUT`, so production projection remains distinct from a
registered domain refusal using the same code.

`ReactionIR.deferred` is optional. When `true`, the engine arms the trigger match
when the trigger lands, then qualifies it and dispatches surviving bindings at
settlement frontiers. It re-evaluates `where` at each frontier until the match
qualifies or the flow finalizes. When absent, qualification happens where the
trigger lands. Imported IR with another value is rejected. Standalone deferred
`ReactionIR` must be consumed by a package version that recognizes the field;
use the same package version to produce and consume standalone IR. The
versioned manifest protects application IR carried inside a manifest from
incompatible tooling.

The application manifest has format `sync-engine.application-manifest`, version
`1`, and is canonical JSON-round-trippable application data. Stable v1 fixes
this schema; incompatible structural or semantic changes require a new integer
format version and new public type names. Incompatible earlier beta shapes are
rejected without upconversion. It
contains executable application and wire facts plus structured concept
contracts, full State text, authored definition/instance declarations and external
bindings, SSF-derived definition-owned type inventories, resolved application types,
computation signatures, registered design source locations, normalized-source digests, implementation provenance, validators, and diagnostics. It excludes
runtime functions, constructor arguments, resources, object identity,
occurrences, timestamps, and other runtime state.

`ComputationInventoryIR` contains every installed computation, including all
five standard computations and unused vocabulary computations. `source`
distinguishes `standard` from `vocabulary`; `inputs` is present only when the
function's top-level destructuring can be read conservatively. The manifest
sorts entries by name and never carries the function itself.

`ConceptImplementationProvenanceIR` separates a concept set's canonical
class from the implementation selected by assembly. `RequestBoundary` is
core-owned and selected through `core`; an application concept set cannot reuse
that name, and authored instance completeness excludes it. Application concepts
report `default`, `initialize`, or `instances`. Constructor names are descriptive and omitted for anonymous or
structural `Object` values; selected constructor names and `floor` can occur only
with `instances`. A floor is omitted when provenance is ambiguous. Concept
member roles, query cardinalities, and refusal semantics come from the canonical
vocabulary declaration rather than a replacement instance.
`applicationManifestDigest(...)` recomputes the digest while ignoring the
supplied `digest` field. `validateApplicationManifest(...)` treats its input as untrusted data: it
checks the complete top-level version-1 shape, the nested IR needed by tooling,
inventory uniqueness and cross-field consistency, independently rederives persisted
owned types and subset binding targets from each included specification, endpoint,
input-contract, and logical-wire path agreement, plain JSON portability, and exact canonical digest
equality. Previous versions are rejected without upconversion.
Failures identify the offending `$` path. `parseApplicationManifest(...)`
performs the same checks after JSON parsing and returns data in canonical record-key
order; neither function imports application code or a manifest-producing config.
`parseConceptSpecification(...)` exposes the same structured, source-located
contract used by registration. It returns a `ConceptSpecParseResult`: a valid input has
its `specification` and no diagnostics; an invalid input has no specification and every
coded, line-and-column diagnostic found during parsing. It enforces the exact section
order, parses external declarations and structured action/query choices, and retains full
State text. Private config and form-check tooling separately parses bounded SSF structure
and its aliases,
checks the subset graph and local namespaces, and inventories owned type names. Field
refinements and `Rule:` prose remain open authored contracts; neither layer turns
authored types into runtime schemas.

Each concept inventory may carry a `sync-engine.concept-specification`
version-1 subtree with the definition name, external types, normalized full
State text, structured actions and queries, refusals, and source locations. Selected application inventories separately retain authored instance
declarations, definition names, external bindings, and their source locations.
`renderApplicationManifest` emits canonical JSON with ordinal record-key order
and a final newline. Named collections use stable order while authored reaction,
view-alternative, and former-node sequences retain semantics.

`ApplicationDiagnostic`, `DiagnosticCode`, and `DiagnosticSeverity` define the
advisory surface. `diagnosticsFail` fails on errors by default and can promote
warnings; informational diagnostics remain advisory.
Endpoint diagnostics trace causal `by` provenance to attribute an eventual
response to its request path. Only a response that uses the traced request
identifier contributes to a proof. Direct response paths and recognized total
action chains contribute to overlap proof; chain overlaps name their root
reactions. Coverage recognizes linear action chains whose successful postures
have exact inputs, empty output patterns, and only guaranteed ancestor replays;
the standard boundary funnels cover refusal and fault outcomes. Deferred stages
remain eligible. Proofs concern portable JSON-shaped boundary values, not live
object identity or accessor behavior. Coverage does not prove that an action or
read eventually settles. On direct paths, the analyzer recognizes canonical
`receive(...)` shapes, disjoint literal request alternatives, non-dropping
`whether` lines, and fresh computations.
`ENDPOINT_PATH_OVERLAP` reports bounded potential overlaps such as duplicate
complete guards, an unconditional answer beside a conditional answer, or a bare
existence branch that subsumes a more specific read. It does not prove that a
conditional guard is inhabited. `MISSING_ENDPOINT_FALLBACK`
means no non-dropping total answer path was recognized; it does not imply that
an unconditional sibling would be a safe ordered fallback. Coverage analysis
leaves complementary state reads unproved because siblings observe separate
state snapshots. The analysis is conservative and does not prove arbitrary
view, computation, validator, action-outcome, or concurrent-state logic.

The structural argument consumed by `renderApp` has `title: string`,
`concepts: ConceptInventoryIR[]`, and `app: AppIR`. The package does not export
a separate public name for that aggregate argument type.

| `WireOptions` field | Default                     |
| ------------------- | --------------------------- |
| `boundary.concept`  | `"RequestBoundary"`         |
| `boundary.request`  | `"request"`                 |
| `boundary.respond`  | `"respond"`                 |
| `contracts`         | No declared input contracts |
| `inventories`       | No concept inventories      |

| `WireRenderOptions` field | Default / effect                                                        |
| ------------------------- | ----------------------------------------------------------------------- |
| `moduleName`              | `"WireContracts"`                                                       |
| `banner`                  | Two-line core generator banner; a supplied string replaces it           |
| `conceptSet`              | No type anchor; `{ from, export }` enables signature references         |
| `strictLeaves`            | `false`; `true` requires an anchor and rejects unresolved `Json` leaves |
| `appWideErrorName`        | `"AppWideError"`                                                        |
| `preamble`                | `true`; set `false` when appending another contract to one module       |
| `sharedWires`             | `[]`; later contracts whose required helpers this preamble must emit    |

A render with `preamble: false` emits no imports or shared helper types. The
earlier render that emits the module preamble must receive every later
`preamble: false` contract in `sharedWires`; otherwise `renderWireTypes` can omit
a helper alias used by a later contract.

### Generated descriptor

The `sync-engine artifacts` command reads the default export of the
application-owned `generated.config.ts`. `GeneratedApplication` names the
descriptor type exported from `/tooling`.

| Field                 | Required | Default                                                            |
| --------------------- | -------- | ------------------------------------------------------------------ |
| `assemble`            | yes      | Synchronous function that returns the application assembly         |
| `title`               | yes      | Application title used to derive names                             |
| `close`               | no       | Runs after the generated assembly drains                           |
| `directory`           | no       | `new URL("./generated/", configUrl)`                               |
| `specification`       | no       | Slugged title plus `.md`                                           |
| `specificationBanner` | no       | Generated-from comment followed by mandatory provenance            |
| `wire`                | no       | `"wire.ts"`                                                        |
| `wireName`            | no       | Pascal-cased title plus `Wire`                                     |
| `wireBanner`          | no       | Exact package/version generator banner                             |
| `design.version`      | yes      | Must be `1`                                                        |
| `design.documents`    | yes      | Local design URLs; may contain `types` fences or be empty          |
| `conceptSet`          | no       | Source anchor; defaults to `src/concepts.ts#applicationConceptSet` |
| `projections`         | no       | Ordered transport-specific projections                             |

The default specification banner consists of these comments:

```text
<!-- Generated from the <title> assembly. Do not edit. -->
<!-- Manifest producer: @mit-sdg/sync-engine@<manifest-version>; concept specification: sync-engine.concept-specification@1; renderer: @mit-sdg/sync-engine@<renderer-version>. -->
```

A custom specification banner replaces the first comment but still receives
the mandatory provenance comment. The default wire banner is
`// Generated by @mit-sdg/sync-engine@<version> from the <title> assembly. Do not edit.`
A custom wire banner receives a second mandatory generator line. Artifact
generation always uses the concept-set anchor with strict leaves. Every
`WireProjection` receives frozen `WireProjectionFacts` and returns a named
`WireContractsIR`; core selects the shared preamble, rendering options, ordering,
strict-leaf checks, and provenance. A projection list can be empty or contain
multiple transport contracts in one wire module. `projections` must be an array,
and each entry must provide `project(facts)`. The logical wire name, projected
wire names, app-wide error names, `Json`, and generated concept-set helper names
must be distinct TypeScript identifiers. Projection provenance must contain a
nonblank package name and a valid SemVer version. Projector versions are
not restricted to 1.x. Artifact planning separately requires the manifest's
core generator identity to name `@mit-sdg/sync-engine` at a 1.x version;
generator and projector provenance may use prerelease versions. Core evaluates
projections in declaration order and rejects any projection or naming failure
before an artifact command compares or writes files. The
[application authoring guide](../guide/authoring.md#7-check-and-generate)
shows the application-owned command path; [Generated wire](semantics.md#generated-wire)
defines derivation guarantees.

## `advanced`

<!-- register:advanced:start -->

`Engine`, `EngineObserver`, `EngineOptions`, `LogEvent`, `Refuse`, `VocabularyAssemblyOptions`, `createEngine`, `custom`, `faulted`, `vocabulary`

<!-- register:advanced:end -->

Use `/advanced` only for low-level declarations, manual engine construction, or explicit escape hatches.
It follows the same stable compatibility policy as other public subpaths.

| API                         | Compact signature / role                             |
| --------------------------- | ---------------------------------------------------- |
| `createEngine`              | `createEngine(options?: EngineOptions): Engine`      |
| `vocabulary`                | `vocabulary({ concepts, computations? })`            |
| `VocabularyAssemblyOptions` | Direct-vocabulary option type accepted by `assemble` |
| `custom`                    | `custom(fn, inputs, outputs)`                        |
| `faulted`                   | `faulted(pattern, { by?, except?, exceptBy? }?)`     |

`vocabulary` is the low-level declaration API for callers that deliberately do
not use registered specifications or implementation floors. Concept entries are
either a concept class or `{ class, spec?, purpose?, principle?, queries?,
outcomes?, refusals? }`. Ordinary config-based applications use `conceptSet`
from `/assembly`, which creates the executable declaration internally. A direct
vocabulary can still be passed to `assemble` through the advanced
`VocabularyAssemblyOptions` alternative.

`Engine`, `EngineObserver`, and `LogEvent` name manual interpreter and
observation contracts. `Refuse` is the low-level refusal marker. Its `message`
becomes the refusal's `error` field and takes precedence over an `error` field in
its optional data.
`EngineOptions` accepts `retention` and `logSink`; the default retention policy
is `"keepAll"`. The engine still owns its internal occurrence index. The optional
sink receives a synchronous audit copy and must return `undefined` from each
`append` call.

A manually created engine accepts an undeclared `Refuse` code as a refusal. It
warns when an explicit refusal contract omits that code. Ordinary
`assemble(...)` is closed instead: an undeclared advanced refusal is recorded as
a fault, and an unanswered endpoint settles as opaque `INTERNAL_ERROR`. The
advanced pieces do not install the
ordinary assembly's quiescent interpreter-failure settlement policy. Standard
assembly behavior is normative under [Failures between action
asks](semantics.md#failures-between-action-asks) and
[Cancellation](semantics.md#cancellation).

**node_modules/@mit-sdg/sync-engine/docs/user/reference/semantics.md**

# Execution semantics

This stable-v1 contract covers actions, reactions, reads, formed results, and
application boundaries. Storage, transport, and lifecycle policy remain
host-owned. See the [Public API](public-api.md) and [read construction
cookbook](../guide/read-construction.md).

## Contract index

| Contract need                               | Section                                                                                   |
| ------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Action outcomes, refusals, and direct calls | [Actions, refusals, and faults](#actions-refusals-and-faults)                             |
| Trigger matching and consequence paths      | [Reactions](#reactions)                                                                   |
| Consequences held until causal work drains  | [Deferred triggers and settlement frontiers](#deferred-triggers-and-settlement-frontiers) |
| Portable and local definitions              | [Portable and local behavior](#portable-and-local-behavior)                               |
| In-process action serialization             | [Execution and concurrency](#execution-and-concurrency)                                   |
| Read binding, absence, and cardinality      | [Reading: declarations govern](#reading-declarations-govern)                              |
| Query promises, caching, and equality       | [Queries](#queries)                                                                       |
| Views and formed results                    | [Views and formers](#views-and-formers)                                                   |
| Placement of race-sensitive decisions       | [Decisions that must not race](#decisions-that-must-not-race)                             |
| Sibling and endpoint settlement             | [Sibling paths and endpoint settlement](#sibling-paths-and-endpoint-settlement)           |
| Gateway and client result model             | [Result model and gateway](#result-model-and-gateway)                                     |
| Runtime input and output validation         | [Runtime validation](#runtime-validation)                                                 |
| Generated caller contracts                  | [Generated wire](#generated-wire)                                                         |
| Deployment and resource limits              | [Operational limits](#operational-limits)                                                 |
| Interpreter failure delivery                | [Failures between action asks](#failures-between-action-asks)                             |
| Timeout and abort                           | [Cancellation](#cancellation)                                                             |
| Occurrence logs and restart                 | [Logs, concept implementations, and restart](#logs-concept-implementations-and-restart)   |

## Actions, refusals, and faults

An action occurrence begins when the engine records its ask, before the action
body runs. The ask carries an id, the concept and action names, its input, and a
flow token: the correlation identity shared by one outside request and its
consequences. An ask made by a reaction also carries the reaction name as `by`
provenance.

Matching snapshots arrays, plain records, and ordinary `Date` values when the
ask begins, preserving cycles and repeated references. Other object kinds retain
identity semantics. The action implementation still receives the caller's
original input object, so later mutation cannot rewrite the occurrence that
reactions match.

The action then settles in one of two outcome postures:

- **returned** — the action completed and its result was recorded;
- **refused** — the concept deliberately declined by throwing an error class
  registered for that action. The advanced `Refuse` marker also produces this
  posture when its code is accepted under the engine mode described below.

The engine classifies the outcome after the body settles but creates no
concept-state transaction. It does not roll back earlier changes; persistence
belongs to the concept implementation and store. Each action in a reaction chain
owns its state change.

A registered exception must belong to that action; an exception registered only
for another action is a fault. Ordinary `assemble(...)` accepts `Refuse` only
when the action's refusal contract declares its code. An undeclared advanced
code is a fault: it creates no refusal outcome, a direct assembled call rejects,
and an unanswered endpoint settles as opaque `INTERNAL_ERROR`. Manual
`createEngine(...)` remains open: any `Refuse` code creates a refusal, and the
runtime warns when an explicit contract exists but omits that code. Applications
should use declared refusals for stable contracts.

Any other throw is a **fault**. The engine records it against the unanswered ask
and lets it reach a direct caller. See [Failures between action
asks](#failures-between-action-asks) for reaction and boundary delivery.

For a direct call through `Assembly.concepts`, a returned action resolves to its
success value and a refusal resolves to an `ActionRefusal` mapping with an
`error` code. A registered exception refusal also carries the specification's
sentence as `detail`; a `Refuse` escape hatch may carry other data. A fault
rejects the direct call. Underscore-prefixed query calls are asynchronous roots
with their declared answer inside the promise and do not return action refusals.

Direct callers receive scalar returns unchanged. Occurrence matching normalizes
a non-object return to an empty result, so reactions cannot bind fields from it.
Return object mappings when composition needs outputs. A top-level `error` field
remains a success; only a registered refusal produces the refused posture.

## Reactions

An application reaction normally watches a returned or refused action outcome,
may read current concept state, and runs its consequence chain once for every
surviving binding. A binding is one row of named values matched from the
trigger and subsequent reads. Framework reactions may instead watch the fault
channel.

Each causal flow has one framework-owned current instant. `now(variable)` in a
reaction's `where` binds that variable to the instant stamped on the flow's
outermost occurrence. The host clock is read once when that occurrence opens,
not whenever `now` is evaluated, so ordinary and deferred reactions in the same
flow observe the same instant. The outermost occurrence log uses that existing
stamp too; the design layer does not take a second clock reading that could
disagree with the log. `assemble({ ..., clock })` supplies the host clock, which
allows a test to inject a fixed instant.

`now` is not a standing-state read. It is rejected in views and formers, as a
trigger or action input, and in `receive(...)`; its binding cannot be supplied by
a caller or an earlier condition. Use it only in a reaction `where` and pass the
bound value to any concept action that declares the instant as an input, exactly
as the concept contract requires.

The trigger form selects the posture:

| Trigger                                          | Record watched                                 |
| ------------------------------------------------ | ---------------------------------------------- |
| `when(Concept.action(pattern))`                  | the requested ask, before the action body runs |
| `when(Concept.action(pattern).responds(result))` | the returned outcome                           |
| `when(Concept.action(pattern).refuses(refusal))` | the refused outcome                            |
| `when(returned(...))` / `when(refused(...))`     | the corresponding cross-action posture channel |

Each watched record gives each matching public single-trigger reaction one
trigger match. An ordinary reaction qualifies that match once when the record
lands. A deferred reaction matches its trigger once but may re-evaluate its
conditions at successive settlement frontiers. Manually registered
multi-trigger IR can join a newly landed record with earlier unconsumed records
in the flow. A `where` block may produce several bindings, so one qualification
may dispatch several consequences. Each recorded firing names the reaction, its
binding, the trigger occurrences it consumed, and the asks it produced. Other
reactions consume those occurrences independently.

Every consequence gets a fresh action id, inherits the trigger's flow, and
records the reaction as `by`. Members of one `then(...)` group are independent:
every match may ask its action, without priority, exclusivity, or coverage.
Current evaluation is sequential, so a nonsettling sibling blocks later ones.
Each sibling in a multi-member group needs a trailing `.named(...)` label;
labels determine path names independent of source order.

A later `.then(...)` extends each path after its preceding action returns; it is
not a sibling join. Lowered stages are separate reactions pinned to exact `by`
provenance; `earlier` recovers original outside input. A refusal or fault stops
that path while other siblings continue.

A later stage does not inherit a binding opened only by an earlier standing
read. The binding reaches the later stage only when an intervening action input
or output carries it. Read the value again at the later stage when later state
is intended; do not add action fields solely to transport composition data.

The public `when(...)` form accepts one trigger. Use `earlier` for directional
correlation, views for standing policy, and concept guards for decisions that
must run once. The package exports no public multi-occurrence join form.
The engine does not detect reaction cycles. Each turn of a cycle creates new
occurrences and may continue until a condition, refusal, fault, or configured
execution limit stops it.

### Deferred triggers and settlement frontiers

`.afterFlowSettles()` holds a consequence until tracked ordinary work in the
trigger's causal flow has drained:

```ts
when(Phasing.start({ sequence }).responds({ job, attempt }))
  .afterFlowSettles()
  .where(Phasing._running({ sequence }).is({ job, attempt }))
  .then(Phasing.advance({ job, attempt }));
```

A **deferred** trigger arms when its occurrence lands and waits for a
**settlement frontier**, when the outermost ask is about to settle after tracked
ordinary work drains. Frontiers are per flow; unrelated roots have no effect.

At a frontier the engine reads the conditions of every deferred trigger match
armed in that flow before dispatching any consequences. This is the same rule
ordinary reactions follow for one landed occurrence. The engine runs qualified
consequences in the same flow, lets their ordinary cascades drain, and then opens
another frontier. A frontier at which no trigger combination qualifies finalizes
the flow.

A deferred consequence keeps the flow token, anchor bindings, anchor-relative
`earlier(...)` scope, request correlation, `by` provenance, firing records, and
limit accounting. Each watched occurrence produces one trigger match; manual
joint triggers may produce several combinations. A combination producing no
binding remains armed.
Before a later frontier evaluates it again, the runtime discards it if another
firing of the same reaction consumed any of its trigger occurrences. Once a
combination produces one or more bindings, it is retired and each binding is
dispatched independently. Dispatch failure does not re-arm it.

Settlement follows the tracked flow, so an action must return or await a
structural `PromiseLike` for work that should delay it. Detached asynchronous
work remains untracked and a frontier may open before it finishes. An
interpreter or integrity failure recorded before a frontier prevents deferred
advancement. Such a failure while a frontier is being qualified or dispatched
does not cancel its other matches; the engine completes that frontier and opens
no subsequent one. The flow finalizes with what it has already accepted, and the
delivery in
[Failures between action asks](#failures-between-action-asks) applies
unchanged. A deferred cascade is bounded like any other: the engine does not
detect cycles, and `maxFiringsPerFlow` and `maxActionsPerFlow` stop a runaway
one.

Deferred trigger matches are currently qualified sequentially, and prepared
consequences are dispatched sequentially. A condition or consequence that never
settles blocks later work in that frontier and prevents the flow from
finalizing. Applications must not use this order as semantic priority.

`.afterFlowSettles()` also qualifies a later stage of a chain, including an
endpoint's. Conditions on that stage can identify the terminal state from which
to form a response:

```ts
receive({ sequence })
  .then(Phasing.start({ sequence }).responds({ job }))
  .afterFlowSettles()
  .where(
    no(Phasing._running({ sequence })),
    Phasing._latest({ sequence }).is({ job, state: "finished" }),
  )
  .then(respond({ job }));
```

The deferred stage is anchored to the ask its own path made, so it answers only
at a frontier where its conditions hold. If no frontier satisfies them, that
path produces no answer. The request remains unanswered only if no sibling or
parallel path answers; the behavior in
[Sibling paths and endpoint settlement](#sibling-paths-and-endpoint-settlement)
applies. Because a later stage lowers to a reaction of its own, a chain that
lowering keeps local cannot defer a later stage; registration rejects that
composition and names the stage.

### Portable and local behavior

A definition is **portable** when its canonical JSON can round-trip and register
against the same named vocabulary. Named actions, queries, views, formers, and
vocabulary computations qualify only when they use portable IR. Closures,
custom operations, `$is` identity patterns, raw result transforms, and
unrepresentable reactions are local. Their JSON markers enable inspection, not
re-registration.

Ordinary assembly accepts portable behavior only. It rejects every local
reaction, view, or former before an invoker, route set, generated plan, or
artifact write is exposed. Manual engines under the `advanced` subpath may
execute local constructs, but they do not gain ordinary assembly's application
boundary or portability guarantees.

## Execution and concurrency

For an instrumented action, the engine performs these steps in order:

1. Append the invocation occurrence.
2. Reserve the action's position on the concept instance's serial line.
3. Evaluate reactions that watch the requested posture.
4. Run the action body when its reserved position reaches the front.
5. Append its returned/refused outcome or fault.
6. Evaluate reactions for that landed record.
7. Notify observers after the action settles.
8. If this is the flow's outermost ask, process settlement frontiers until no
   deferred trigger qualifies or the flow fails.
9. Clear transient matching values, report flow quiescence, and apply automatic
   window retention.

Requested-posture reactions run after the invocation is recorded and before the
ordinary action body is released. Same-concept requested consequences use an
internal reservation release to make progress without changing body-arrival
order.

One action body runs at a time per selected concept instance within one engine.
Ordinary assembly rejects one raw implementation object supplied under two
instance names in the same assembly, before instrumentation. The
queue awaits a structural `PromiseLike`: any returned object or function whose
`then` property is callable. This includes native promises from another
JavaScript realm and non-native thenables. The queue reads `then` once and
invokes it in a microtask. A throwing `then` accessor, or a `then` call that
throws before settlement, faults the action. A thenable that never settles holds
the serial line just as a never-settling promise does. Supplying one raw instance
to separate engines is allowed and creates separate queues and query caches; it
does not serialize those engines. Different concept instances and separate root
flows can overlap.
Ordinary reactions for one landed occurrence are currently evaluated
sequentially. Their trigger and `where` stages all finish before any matching
consequence is dispatched, so one sibling consequence cannot change another
sibling's guard. Deferred conditions run later at settlement frontiers.
Applications must not use evaluation order as semantic priority. No engine-wide
lock serializes all concepts or all flows, and the guarantee does not extend
across processes.

## Reading: declarations govern

A reaction or former `where` block is an orderless conjunction of lines.
Registration derives an evaluation schedule from available bindings; authored
order is a legibility choice. View blocks are checked for schedulability, but
the current implementation stores and evaluates their authored order. Until
that implementation restriction changes, write each view line after the lines
that supply its inputs. Each line reads one relation—a concept query or a
view—with its input pattern in the query or view call and an output pattern in
`.is`:

- the query or view input must be fully bound by the trigger or another
  schedulable line;
- in `.is`, a **fresh name opens** and binds for later lines; a **bound name
  or literal tests** the row's value; using the same variable again tests
  equality — no equality word exists;
- an **empty `.is`** (a bare call) is an existence read: the case proceeds
  once if any row matches, and drops otherwise.

When present, the relation's promise controls how many source rows a plain line
receives. A `one` relation supplies exactly one row, but the line can still drop
the case when its `.is` pattern does not match that row. An `optional` relation
supplies zero or one row. A `many` relation supplies any number and continues
once per distinct matching fill. An undeclared query is treated as potentially
many. If a concept answers outside its declared promise, the engine reports an
integrity fault that names the query.

Three words mark intent beyond plain reading, and each is flat — they apply
to a plain line, never to each other:

- **`no(line)`** holds only when no such row exists at all—never "a row exists
  that differs." Under `no`, the `.is` pattern admits only literals and names
  already bound by the trigger or another schedulable line.
- **`whether(line)`** lets the case survive absence: present binds, absent
  passes the case on with the opened names blank. A blank name may shape
  output — blank leaves, empty captures. A later plain line reading it in its
  query input drops the case while it is blank; a later `whether` line passes
  the blank on.
- **`.is.not({...})`** tests inequality and binds nothing. It admits only bound
  names and literals. With several stated fields, every stated field must differ
  for the row to pass.

Order comparisons (`is.lt`, `is.le`, `is.gt`, `is.ge`, …) are ordinary
built-in relations read as closed lines over bound values.

Registration rejects fresh names under denial, opened names unused by later
lines or consequences ("omit the key instead"), and view cycles. It does not
check unused trigger or action-result bindings. Each reaction's read-back names
paths, stages, opened and tested names, fan-out, and dropped cases;
`inspectAssembly(assemble(...)).readBack` returns all read-backs as one string.
[The read construction cookbook](../guide/read-construction.md) quotes these read-backs entry by entry.

## Queries

A concept registry may declare each query's promise as `"one"`, `"optional"`,
or `"many"`. A `one` query returns one record. An `optional` query returns an
array containing zero or one record. A `many` query returns an array of
records. An undeclared query may return one record or an array of records;
because it makes no narrower promise, authoring treats it as potentially many.
When the authored promise is available as a TypeScript literal, the vocabulary
types reject a method whose return container does not match that promise.
The engine applies registry promises to the selected implementation and checks
answers read by reactions, views, or formers. `null`, scalars, invalid array
rows, nested arrays, and cardinality violations fault. Other non-null,
non-array objects pass; this is not row-schema validation. Missing `.is` fields
do not match. Direct query roots bypass these container and cardinality checks.

An ordinary assembly defaults to `queryCache: "memoize"`, which memoizes queries
by concept instance and argument between invalidation points. Instrumented
actions invalidate the acted-on concept instance's query caches before and after
their bodies, and an assembled outside invocation invalidates all concept query
caches before dispatch. `queryCache: "none"` disables this memoization; repeated
reads execute the query implementation independently.
Query implementations must be side-effect-free; the engine does not enforce it.
A structural thenable returned by a memoized query is normalized to one native
promise before that promise is cached. Equivalent reads reuse the normalized
promise, so the original thenable's `then` is invoked once. Rejection, including
a throw while reading `then` or before the `then` call settles, evicts the entry;
a later equivalent read executes the query again. A thenable that never settles
remains cached until invalidation. Direct state mutation or an external database
change that bypasses an instrumented action can remain hidden until the next
invalidation; a query call is not guaranteed to execute its implementation on
every read. Cache-key construction traverses at most 100 nested levels. A call
with a deeper argument still executes but bypasses memoization for that call.
Cache arguments follow read equality: arrays and plain records are structural,
`Date` values use their timestamps, and maps, sets, class instances, regular
expressions, functions, symbols, and other opaque values use identity.
Equivalent acyclic structural values share entries; cyclic values are bounded
and safe but may occupy separate entries when their graph shapes differ.

Read equality and literal action-pattern equality are structural for arrays and
plain records, timestamp-based for `Date`, and identity-based for maps, sets,
class instances, and other objects. Reusing an already-bound variable in an
action pattern uses this same equality. Many-row read matching retains the first
structurally distinct fill. Former `.distinct(...)`
uses JavaScript `Set` semantics and skips `undefined`. `.first(...)` uses the
first selected row after optional arrangement. `arranged("newest")` reverses
source order; it does not inspect a timestamp field.

How such a fault is delivered depends on where the read occurs. See
[Failures between action asks](#failures-between-action-asks).

## Views and formers

A **view** names a match. Its builder has separate input, output, and
free-binding bags; reading a property declares a stable logic variable. A
predicate ends in `.holds()`. Output views default to `.many()` and may declare
`.one()` or `.optional()`; the human name carries neither signature nor
cardinality. Calls take one plain object whose enumerable own keys are declared
and whose declared inputs are present by the `in` operator. Views read like
queries, local bindings do not escape, and stacked `where` blocks are
alternatives.

The engine checks a concept query's declared promise whenever it reads the
query and checks a view's declared promise whenever it reads the view. The
read-back states the declaration and the runtime integrity check. The current
package does not analyze cardinality over exported IR.

A **former** names a formed answer. Its builder has separate input and
free-binding bags; `where` matches and terminal `form` produces. Record formers
promise one answer unless `.optional()`. Selection-root formers always produce
one `.form`, `.count`, `.first`, or `.distinct` result; empty selections already
have defined results, so `.optional()` is invalid. Human names carry neither
inputs nor cardinality. Evaluation checks the promise. A record `where` cannot
open from a `many` source; use `each`. Calls use the same object-key and
required-input checks as views.

Production handles absence and plurality in three ways:

- an entry that reads a promised source **plainly** drops its row when the
  source declines;
- an entry that reads it under **`whether`** keeps the row and takes blank
  (`null`) leaves;
- **`each(line)`** captures every row of a promised line — query or view —
  into a selection. The selection may refine with `.where(…)` (closed
  conditions: plain lines, `no`, `whether`, comparisons), order with
  `.arranged(value, "descending")`, and then choose its shape: `.form({…})`
  carries one record per row, and the folds — `.count()`, `.first(value)`,
  `.distinct(value)` — reduce the capture to one answer. A fold over a source
  that promises at most one row is rejected: the promise already answers.

Without `.arranged(...)`, a selection retains source-row order. A view-level
`count(query, input, output)` binds `0` when the query returns no rows.

Record entries may contain portable JSON literals directly. A literal is part
of the registered former IR and needs no read or computation to bind it.
Record entries may also read named formers directly, plainly or under `whether`,
so absence is declared once at the source and every reader chooses how to
handle it. The engine evaluates a former when asked; it does not store the
formed result as concept state or turn it into an occurrence.

`.splicing(...uses)` merges one or more record-rooted former fragments into a
host record or selection row. Each variable referenced by a fragment input must
already be bound; literal inputs are accepted. Fragment keys must not collide
with host or earlier-fragment keys. A plain optional fragment drops the host row
when absent; `whether(fragment)` preserves the row and fills the fragment leaves
with `null`. The engine checks each fragment's promise; several rows fault the
former evaluation.

If a former faults while forming a reaction consequence, that consequence ask
is recorded with the fault and remains unanswered. Calling a former directly
has no action ask to mark, so the evaluation rejects instead. The operational
fault is a `FormerFault`: `FORMER_NONE` means a former promising one answer
produced none, and `FORMER_MANY` means a record body produced several matches.
These faults use the operational failure path. The delivery boundary is described under
[Failures between action asks](#failures-between-action-asks).

## Decisions that must not race

A uniqueness, capacity, first-come, or answer-once decision belongs in the
action that owns the state. A reaction's `where` is a current observation, not
an atomic guard. [Ordering and state-read timing](#ordering-and-state-read-timing)
defines the in-process serialization and cross-process limits.

## Sibling paths and endpoint settlement

A `then(...)` group may carry several alternatives:

```ts
.then(
  where(leftCase).then(Left.handle({ item })).named("left"),
  where(rightCase).then(Right.handle({ item })).named("right"),
)
```

The engine lowers these to paths named `Reaction:left` and `Reaction:right`.
If both conditions hold, both fire. If neither holds, neither fires. Labels
record provenance and establish no preference. A later single consequence
creates `Reaction:left#2` and `Reaction:right#2`, each triggered by the return
from its own first stage. Repeated sibling groups expand the set of paths; they
do not create a runtime join.

At the boundary, `receive(...)` supplies the outside-request trigger. Path
pinning, input contracts, correlation, response shaping, and wire derivation
remain endpoint concerns.
The endpoint's declared path is authoritative: `receive(...)` cannot author
the boundary-owned `path`. Authored responses likewise cannot provide the
boundary-owned `requestId` or `errorKind`; framework classification travels on
a separate internal response channel and accepts only declared framework codes.
An endpoint records at most one answer. An uncovered input or a dropped plain
line can leave a fault-free request unanswered. Parallel endpoint declarations
and sibling answers remain ordinary alternatives, so any matching path may
answer; `NOT_PENDING` refuses another answer after settlement. When the root
flow becomes quiescent, an answer already delivered remains authoritative. If
no answer exists and the interpreter failed between action asks, the invocation
settles with opaque `INTERNAL_ERROR`. A fault-free unanswered invocation waits
30 seconds by default and then returns `TIMED_OUT`; `InvokeOptions.timeoutMs`
overrides that wait. Public endpoints should provide explicit complementary
case branches that answer every admitted case. An unconditional
sibling is not ordered fall-through and overlaps every conditional sibling that
can answer. A stage marked
[`.afterFlowSettles()`](#deferred-triggers-and-settlement-frontiers) answers at
a settlement frontier instead of where its trigger lands; it is still one
ordinary answering path under every rule above.
[Cancellation](#cancellation) defines what timeout and abort do with a pending
call. Runtime execution does not enforce branch disjointness or endpoint
coverage. `applicationDiagnostics(...)` traces causal `by` provenance to
attribute an eventual response to its request path. Only a response that uses
the traced request identifier contributes to an endpoint proof. Direct response
paths and recognized total action chains contribute to overlap proof; chain
overlaps are attributed to their root reactions. Coverage recognizes a linear
chain of successful action postures when every action input exactly follows the
preceding ask, every output pattern is empty, and the only intervening reads
replay guaranteed ancestors. The standard boundary funnels cover refusals and
faults with correlated response attempts. Deferred stages remain eligible. This
proof concerns portable JSON-shaped boundary values, not live object identity
or accessor behavior. It proves guard coverage after each watched posture lands,
not that an action or read eventually settles. Other intermediate action paths remain ineligible. On direct paths, the analyzer
recognizes canonical `receive(...)` shapes,
disjoint literal request alternatives, non-dropping `whether` lines, and fresh
computations. It can report a bounded set of potential overlaps and warn when
it recognizes no non-dropping total answer path. Complementary state reads
remain unproved because siblings evaluate independently and do not share a
state snapshot. The analyzer does not prove arbitrary view, computation,
validator, action-outcome, or concurrent-state logic. Warnings remain advisory
unless `sync-engine check --fail-on-warnings` runs with an application config.
Human-readable checks summarize advisories by default;
`--show-advisories` lists each one, while JSON output always retains them.

## Boundary, gateway, and client

### Result model and gateway

The [application model](../overview.md#generated-evidence-and-runtime-boundaries)
places the generated contract beside the runtime boundary.
Semantically, `assemble` gives an application its own boundary and occurrence
log. The log records what happened in that assembly; it is not concept state.
`createGateway` decorates the application's `Invoker` with route admission,
forwarding, caller timeout and abort handling, limits, observation, and ordered
drain. It does not create a second reaction engine or occurrence log. Gateway
and application observation share the effective correlation id.

Core clients resolve to the endpoint's success JSON or an
`{ error, detail? }` envelope. The invoker that waits for the
boundary answer keeps domain errors and framework errors distinct. Client and
invocation adapters omit exception text when an unknown thrown value becomes a
framework error. A top-level `error` field in an authored response denotes a
domain failure, so a successful endpoint result cannot use `error` as an
ordinary top-level data field. See the exact [cancellation
boundary](#cancellation).

Every generated client endpoint accepts an optional `ClientCallOptions` after
its input. The core client copies `signal`, `timeoutMs`, and `correlationId` to
the `ClientRequest`; the selected transport defines how it uses them. The core
client does not itself apply a timer or create a correlation header. An optional
synchronous `validateResponse` callback inspects the complete untrusted
transport result with its route. `{ ok: false }`, a throw, or a promise-like
validator result becomes `{ error: "TRANSPORT_ERROR" }`; an accepted result is
returned without transformation.

### Limits and operational observation

An opt-in `ExecutionLimits` profile bounds active root flows, pending requests,
actions and firings per flow, evaluation rows, and caller deadlines. Profile
values and explicit deadlines are positive finite integers. Work rejected for
overload or drain returns `UNAVAILABLE` and creates no root action occurrence.
An accepted flow that exceeds an action, firing, or row budget records integrity
evidence and follows interpreter-failure settlement as opaque `INTERNAL_ERROR`.

Ordinary assembly and gateway options accept operational observers. The stable
event union reports action settlement, interpreter and integrity failure,
invocation settlement, execution-limit breach, and drain state. Applicable
events carry action id, flow, route, asking reaction, correlation id, safe
result class, wall-clock time, and monotonic duration. They never carry action
input or output.

Each public `gateway.invoke(...)` emits exactly one invocation settlement after
its final downstream or gateway rejection result is known. Gateway observers
also receive its limit and drain events, but there are no internal gateway
concept-action events. The settlement uses the caller-requested application
path, the effective gateway/application correlation id, the final result class
and framework code when applicable, and a duration through final completion.
It omits `flow` because the internal gateway root identity is not a stable
public request identity.

Observer callbacks are synchronous bounded handoff: the engine catches throws
and never awaits observer work, while queueing, exporting, and network I/O
remain host responsibilities.

### Correlation and route paths

When a direct caller omits a correlation id, the gateway establishes a fresh
UUID once at public entry and carries it through gateway and application
observation. Correlation does not deduplicate work and is not an idempotency key.

Endpoint paths are portable absolute URL pathnames. Their declared spelling
must survive WHATWG URL pathname handling exactly: queries,
fragments, scheme-relative paths, literal spaces or Unicode, dot-segment
normalization (including encoded dot segments), malformed percent escapes, and
other noncanonical spellings are rejected. Percent-encoded path data remains
valid when URL handling preserves it. `/` is a valid endpoint path.

### Runtime validation

Gateway admission and the assembled invoker
validate the route and request's outer shape. The input must be a non-null,
non-array object and contain every required own key. Extra keys remain. Defaults
are shallow and apply only when a key is absent; a present value is never
overwritten. An endpoint may additionally attach application-supplied input and
successful-output validators, plus a `domainError` validator. The input
validator sees the admitted value after defaults and runs before the application
boundary ask is recorded. Invalid input returns `INVALID_INPUT`. The output
validator runs before a successful result leaves the invoker. The domain-error
validator runs on the value under an authored response's top-level `error`
field. Invalid output records `invalid-output` integrity evidence; an invalid
domain error records `invalid-domain-error` evidence. Both become opaque
`INTERNAL_ERROR`. Framework failures are not endpoint-validated.

Without an input validator, primitive types and nested shapes are not checked,
so explicit `null` and direct-invocation `undefined` pass required-key presence.
JSON transport removes `undefined` object fields before admission. Validators
inspect values but do not transform them, and thrown validator failures fail
closed. Validators must return synchronously; a promise-like result fails
validation. A configured `rawFaultReporter` receives the original thrown value
with kind `endpoint-validator` and phase `input`, `output`, or `domain-error`.
For output and domain-error throws, ordinary integrity evidence retains only
the `ValidatorFault` class. An input-validator throw returns `INVALID_INPUT`
before an occurrence is recorded. Caller-visible errors contain no thrown
detail, and reporter failure is isolated from validation settlement. The
generated TypeScript contract provides static caller checks. Runtime validation
requires endpoint validators. Required concept State fences are retained raw for
design provenance but remain uninterpreted; they do not contribute to endpoint
contracts or validators, and no schema is inferred from them.

### Endpoint input contracts

Absent an explicit endpoint input contract, assembly derives required keys from
portable endpoint IR as the intersection of non-reserved keys mentioned by
every exported `receive(...)` pattern for that path. Local endpoint behavior is
an assembly error. An explicit contract replaces a derived contract, and only
one endpoint declaration may supply an explicit contract for a path. Assembly
rejects an explicit contract when omitting its optional keys cannot match any
receive alternative after defaults are applied.

### JSON projection

The local client serializes and parses input and output before returning it.
Dates become strings and undefined object fields disappear. Other transports
define their own projection failures and error codes.

## Generated wire

With a [generated wire contract](../guide/authoring.md#7-check-and-generate)
and concept-set type anchor, endpoint leaves refer to concept action parameters,
action results, query rows, and registered vocabulary computation parameters
and awaited results. A variable used in a `compute(...)` input follows the
corresponding path in the computation function's input parameter. A single
output variable follows the complete awaited return type. An object output
pattern may bind or constrain several variables; each variable follows its
field path in the awaited return type. Constraints on one binding
intersect; alternatives remain unions. Built-in standard relations and
`custom(...)` do not invent concept-set signature anchors.

The response structure and absence rules come from the endpoint and its
formers. The generated module applies the same JSON projection as the clients,
including `Date` to `string`. Strict generation rejects any leaf that cannot be
traced to a signature. Without an anchor, the renderer emits a structural
contract and uses `Json` for leaves it cannot trace to a signature.

Ordinary assembly rejects every local reaction, view, or former. The error names
each local owner before a route or artifact plan is exposed. Direct invocation,
gateway routing, transport adapters, and generation therefore share one complete
portable design. Executable-only behavior causes assembly to fail.

When a generated application descriptor supplies ordered `projections`, one
module contains the logical contract followed by each named transport contract.
The contract named by `wireName` retains the logical application inputs,
outputs, and refusal codes for a local or custom client. A projector may derive
a transport contract from those logical facts. All contracts share generated
type helpers and the concept-set anchor. Core records every projector package
and version in generated provenance.

Projection planning validates all names before rendering. The logical wire,
every projected wire, each app-wide error type, `Json`, and concept-set helper
types must have distinct valid TypeScript identifiers. Provenance package names
must be nonblank, and provenance versions must be valid SemVer. Core
evaluates projectors in declaration order, and a projector or validation failure
occurs before any artifact comparison or write.

Generated assembly compatibility is governed by the application manifest
format and package SemVer. Stable v1 fixes the version-1 schema; incompatible
structural or semantic changes require a new integer format version and new
public type names. Earlier beta shapes have no compatibility decoder. Upgrading
from an incompatible beta requires regenerating manifests and generated artifacts.

The manifest inventories selected computations, canonical concept definitions,
authored application instance declarations and bindings, SSF-derived definition-owned
type inventories, full concept State text, resolved application types, executable application
identities, implementation provenance, registered design source locations, and
normalized-source digests. It does not retain executable
computation functions or runtime occurrence state.

Generated Markdown names its manifest producer, concept-specification format,
and renderer version. It links each selected authored reaction tree, endpoint
identity/path declaration, view, former, computation, concept, concrete type, and
binding to every applicable authored source location. It shows structured concept signatures,
cardinalities, refusals, definition/instance relationships, and executable
lowering. It does not copy application prose, Purpose, Principle, full State text,
action/query bodies, adjacent binding explanations, or computation bodies. These
authored statements do not become runtime validation or executable assertions.

These are TypeScript guarantees. [Runtime validation](#runtime-validation)
requires explicit input, successful-output, and domain-error validators; none is
inferred from generated types.

## Operational limits

The following limits matter when an application depends on ordering, failure
delivery, cancellation, persistence, restart, or boundary operation.

### Supported multi-instance topology

Several application instances may use the same durable domain state when each
instance has its own assembly, concept objects, action scheduler, gateway, and
occurrence index, and host-supplied concept implementations connect them to a
transactional store. The concept action that owns a state decision must perform
its uniqueness, capacity, and durable domain-operation idempotency checks in one
storage transaction. Storage constraints or equivalent storage coordination,
not action queues or correlation ids, decide cross-instance conflicts.

Reactions and occurrence matching remain local to the assembly that observed
the action. The gateway emits operational events without owning another log. An
idempotent concept action may therefore return one stable persisted result
when retried while its surrounding reaction executes once for every successful
action occurrence.

This topology provides no:

- exactly-once action or reaction execution;
- a distributed reaction scheduler;
- occurrence replay or reaction resumption after restart;
- rollback across actions in a reaction chain;
- cross-process serialization without application storage coordination; or
- deduplication by correlation id.

Drivers, transactions, constraints, locks, migrations, domain operation ids,
and recovery policy remain application and host responsibilities.

### Execution and resource bounds

Automatic occurrence retention bounds settled-flow inspection, and
`ExecutionLimits` provides the engine-owned production budget. Row limits stop
engine-owned expansion during reaction matching, where evaluation, direct reads, and former
evaluation. A query implementation still owns the memory needed to construct its
answer.
These limits do not replace host limits for connections, request rate, DDoS
protection, exporter queues, or autoscaling.

`beginDrain()` on an assembly rejects its new roots immediately and resolves
when accepted causal flows become idle. A gateway first rejects new public
gateway roots, lets those accepted roots cross application admission, then
drains the downstream assembly and waits for both layers. Do not expose the
downstream invoker as a second public admission path while gateway shutdown is
in progress. `whenIdle()` observes the same ordered gateway/application work
without changing admission. Caller timeout and abort remove a pending wait but
never release active-flow accounting. The host still owns the listener, OS
signals, hard shutdown deadline, floor and custom log-sink resource closure, and
process exit.

Direct `Assembly.concepts` calls and `Assembly.form(...)` evaluations are roots,
subject to active-root limits, idle observation, row limits, and drain. A
rejected direct action resolves
to `{ error: "UNAVAILABLE" }` before an action occurrence is recorded; a
rejected direct query or former evaluation rejects. Pending-request limits apply
only to boundary invocations because direct roots do not create request waits.

### Ordering and state-read timing

An assembly sorts the authored composition's reactions by name before
registering them, then registers the standard fault and refusal reactions. It
evaluates reactions for one trigger record sequentially. Sibling paths carry no
priority and do not form a join; each path advances when its own preceding ask
returns. Applications must not use evaluation order as a priority mechanism.
Use [`.afterFlowSettles()`](#deferred-triggers-and-settlement-frontiers) to
observe state after ordinary work already accepted in the same causal flow has
drained. It does not order consequences prepared at the same settlement
frontier.

Action bodies run one at a time per concept instance within one engine, in
arrival order. The queue awaits native promises and structural thenables as
described under [Execution and concurrency](#execution-and-concurrency). One
assembly cannot install the same raw object under two names. Separate engines may reuse
one raw instance through semantically compatible registrations; they do not share a
queue or query cache. Conflicting registration metadata remains invalid. This is
an in-process guarantee. A concept's implementation and storage must supply any
atomicity or coordination required across processes. A reaction consequence
chain commits each action independently. Earlier actions remain committed when a
later action refuses or faults.
The runtime provides no retry deduplication or exactly-once guarantee. A retry
may repeat a completed action or overlap work that continued after timeout.

Queries and read evaluation do not enter the action queue. A query can overlap
an asynchronous action body or another query and does not receive a
transactional snapshot of concept state. Query implementations must avoid side
effects; concept storage must provide any isolation required between reads and
writes.

`earlier` reads matching action records whose invocation position precedes the
trigger in the same flow. Ordinary query reads instead read concept state when
the reaction runs. A later reaction may therefore observe state changed by an
earlier cascade; the runtime provides no as-of-trigger snapshot.

If two reactions answer the same outside request, the boundary accepts the
first answer and refuses the next with `NOT_PENDING`. Keep race-sensitive
decisions in concept actions and treat all matching answer paths as live.

### Failures between action asks

Action faults and former-evaluation faults while forming a consequence have an
action ask to mark. The engine records the fault, and the standard boundary
reaction can try to answer an unanswered root request with `INTERNAL_ERROR`.
If the request already has an answer, the boundary refuses the second answer
with `NOT_PENDING`; the client keeps the first answer.

The interpreter can instead fail between asks: while matching a trigger;
evaluating a query, view, computation, custom operation, or closure; forming or
dispatching consequence input; matching consequence output; or applying a
result transform. The runtime appends a non-consuming `reaction-failure` entry
with the reaction, flow, trigger ids, stage, validated exception class, and,
for a consequence, its action and action id when available. The stages are
`trigger`, `where`, `consequence-input`, `consequence-dispatch`,
`consequence-output`, and `result-transform`. Exception messages, stacks,
causes, and attached fields are not retained in that automatic evidence.
When `rawFaultReporter` is configured, the reporter separately receives the
original `unknown` value for action and interpreter faults. Reporter throws and
rejected returned promise-like values are isolated from runtime settlement.

The failed evaluation stops without creating a fault occurrence. A trigger or
`where` failure happens before a firing and does not consume its triggers, so
later records in a multi-trigger flow may make the reaction eligible again. A
consequence-stage failure can happen after actions were already asked; its
firing keeps that consumption and provenance, and earlier effects are not
rolled back. Once the root flow becomes quiescent, the boundary keeps any answer
already delivered. If the request is still pending, it settles immediately with
opaque `INTERNAL_ERROR`. This decision uses transient active-flow state before
retention is applied; it does not depend on a retained log window. A fault-free
coverage hole still waits for its invocation deadline and returns `TIMED_OUT`.
Concepts should represent expected rejection with registered refusals and
explicit policy alternatives.

Invocation and outcome sink failures do not enter this interpreter-failure path.
A firing-append failure during consequence dispatch is handled as a
`consequence-dispatch` interpreter failure if the engine can append the resulting
reaction-failure evidence. [Logs, concept implementations, and
restart](#logs-concept-implementations-and-restart) defines its ordering and state
consequences.

### Cancellation

An invocation already aborted when it begins does not reach the gateway. While
a request is pending, aborting marks it to resolve with `ABORTED`. The standard
gateway forwards the signal to the application invoker, where it also ends the
wait; the signal does not cancel, prevent, or roll back accepted concept work.
Client calls carry `signal`, `timeoutMs`, and `correlationId` in their optional
second argument. The local client forwards those values to the invoker. Other
transports define how they apply the options.

The default timeout is 30 seconds without a profile and the profile maximum with
one. `InvokeOptions.timeoutMs` selects a validated duration no greater than that
maximum; expiry returns `TIMED_OUT`. Timeout and abort end the wait without a
`RequestBoundary.respond` occurrence. Later `respond` asks are recorded and
refused with `NOT_PENDING`; an earlier accepted answer remains authoritative.
The invoker waits for causal dispatch only until the deadline or abort and may
return while sibling work continues.

Gateway and application invokers each apply `timeoutMs` as their own duration
when their layer begins waiting. The option is not an absolute deadline shared
across every layer. Routing or admission time can therefore precede a newly
started application timeout, and total gateway call time can exceed one stated
duration.

### Logs, concept implementations, and restart

Concept state is separate from the assembly's occurrence evidence. Every engine
owns a process-local occurrence index that folds invocation, outcome, fault,
firing, reaction-failure, and integrity-failure entries for matching and
inspection. The package exposes no interface for replacing the index. An
assembly configured with a window may evict indexed entries and does not promise
to retain every occurrence forever.

An optional application-owned `LogSink` receives each entry synchronously after
entry validation and redaction but before the internal fold. Arrays and plain
records in the entry are recursively copied and frozen. Invocation concept and
action identities are replaced by frozen name-bearing representatives, and
`Date` values are copied. Opaque leaves such as class instances, `Map`, `Set`,
and functions retain their ordinary runtime representation and
identity; the snapshot does not recursively freeze them. A sink must treat
opaque leaves as read-only sensitive values. `LogSink.append` must return
`undefined` synchronously. A throw or any other return value prevents the fold.
An invocation append failure can prevent the action body from running; an
outcome append failure can occur after the action changed concept state, and the
engine does not roll that state back. A sink failure while appending a deferred
firing can likewise occur after its consequence changed state. If appending the
resulting reaction failure also fails, settlement aborts and the outer action
call rejects. The engine still clears active-flow matching values and reports
quiescence; it does not roll back concept state. The sink is an audit destination;
it does not supply matching, retention, or replay. `logSink` and `retention` are
independent assembly options and may be used together.

Each ordinary assembly creates its own field-name redactor before entries reach
the internal index, a sink, an observer, or an inspection summary. During an
active causal flow, the interpreter privately retains original values for
execution and matching, then clears them when the outermost action settles.
Ordinary process logs omit exception messages, stacks, causes, and attached
fields. Public framework errors are likewise opaque. Assembly redaction copies
exact field names and the pattern list but retains the supplied `RegExp` objects;
callers must not mutate those expressions after constructing an assembly. There
is no setter for a process-global redaction policy.

`rawFaultReporter` is the explicit exception to that sanitized path. It receives
the original action, interpreter, or endpoint-validator thrown value together
with classified context. The reporter is privileged application code and must
be treated as a sensitive sink. Reporter failure is caught and does not replace
the action or invocation result.

Ordinary `assemble(...)` defaults to retaining the 100 most recent settled
causal flows. `RetentionPolicy` is `"keepAll" | { window: number }`; the window
must be a finite, non-negative integer. An ordinary assembly may select another
window or `"keepAll"`.
`createEngine(options?)` accepts the same `retention` and `logSink` options,
defaults retention to `"keepAll"`, and does not accept an occurrence-store
argument.
Window enforcement runs automatically only after a causal flow settles. It does
not evict an active flow, so active flows may temporarily exceed the window.
The window is ordered by latest settlement rather than flow start. Repeated
settlement moves a flow to the newest position; a new invocation under a settled
flow removes it from the settled count until the flow settles again.
`{ window: 0 }` evicts a flow after settlement; `"keepAll"` retains indexed
evidence for the engine lifetime. No public manual prune operation is available.

`FileLogSink(path)` is the supplied Node-specific sink. It appends one JSONL
audit projection per entry. The engine never reads or replays that file, and
retention never rewrites it. `FileLogSink` has no close API. A custom sink may
own resources, but the host must close those resources after drain through an
application-defined API.

Concept state and occurrence logs may persist independently. The engine does not
load occurrence files, rebuild concept state, resume reactions, restore pending
requests, or replay firings. Host recovery must reconstruct concept-owned state
before exposing a new assembly, which admits roots immediately unless the host
provides an admission barrier.

### Boundary operations

Generated wire contracts do not provide runtime validation. An endpoint's
explicit validators run at the assembled invoker as described under [Runtime
validation](#runtime-validation). Host and transport obligations are listed in
[Operational limits](operations.md).

# Result

Unless the task requests another format, use these prior fields: `## Status`, `## Changed`, `## Questions`, `## Checks` (optional).
