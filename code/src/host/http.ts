import { httpPolicy } from "@mit-sdg/sync-engine-http/policy";
import { accountsHttp } from "../compositions/reusable/accounts.ts";
import { commonsHttp } from "../compositions/reusable/commons.ts";

/** Cookie bindings follow Conceptbox's Commons-only sign-in example. */
export function circleHttpPolicy(publicOrigin: string) {
  return httpPolicy({
    publicOrigin,
    basePath: "/api",
    publicErrors: {
      ...accountsHttp.publicErrors,
      ...commonsHttp.publicErrors,
      EMPTY_CONTENT: "INVALID_REQUEST",
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
