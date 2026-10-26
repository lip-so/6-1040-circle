import { httpPolicy } from "@mit-sdg/sync-engine-http/policy";
import { accountsHttp } from "../compositions/reusable/accounts.ts";
import { commonsHttp } from "../compositions/reusable/commons.ts";

/** Cookie bindings follow Conceptbox's Commons-only sign-in example. */
export function circleHttpPolicy(publicOrigin: string) {
  return httpPolicy({
    publicOrigin,
    basePath: "/api",
    limits: { requestBodyBytes: 5_600_000 },
    publicErrors: {
      ...accountsHttp.publicErrors,
      ...commonsHttp.publicErrors,
      EDIT_CONFLICT: "CONFLICT",
      EMPTY_CONTENT: "INVALID_REQUEST",
      INVALID_AUDIO: "INVALID_REQUEST",
      EMPTY_QUERY: "INVALID_REQUEST",
      MEMORY_LIMIT: "CONFLICT",
      MEMORY_NOT_FOUND: "NOT_FOUND",
      SOURCE_WITHDRAWN: "CONFLICT",
      SUBMISSION_CONFLICT: "CONFLICT",
      EMPTY_DESCRIPTION: "INVALID_REQUEST",
      EMPTY_SOURCE_CONTENT: "INVALID_REQUEST",
      SOURCE_NOT_OWNED: "FORBIDDEN",
    },
    cookies: {
      session: accountsHttp.sessionCookie("circle-session", commonsHttp.startingSessions),
      signIn: commonsHttp.signInCookie("circle-sign-in"),
    },
  });
}
