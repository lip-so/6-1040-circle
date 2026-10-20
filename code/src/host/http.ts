import { httpPolicy } from "@mit-sdg/sync-engine-http/policy";
import { accountsHttp } from "../compositions/reusable/accounts.ts";
import { commonsHttp } from "../compositions/reusable/commons.ts";
/** Cookie bindings follow Conceptbox's Commons-only sign-in example. */
export function circleHttpPolicy(publicOrigin: string) {
    return httpPolicy({
        publicOrigin,
        basePath: "/api",
        limits: { requestBodyBytes: 6 * 1024 * 1024 },
        publicErrors: {
            NOT_FOUND: "NOT_FOUND",
            ...accountsHttp.publicErrors,
            ...commonsHttp.publicErrors,
            SUBMISSION_FORGOTTEN: "CONFLICT", REVISION_UNAVAILABLE: "NOT_FOUND", EMPTY_REVISION: "INVALID_REQUEST", FORGET_NOT_OWNED: "NOT_FOUND", INVALID_AUDIO: "INVALID_REQUEST",
            NEED_REVISION_UNAVAILABLE: "NOT_FOUND", NEED_REVISION_INACTIVE: "CONFLICT", EMPTY_NEED_REVISION: "INVALID_REQUEST", NEED_RESOLUTION_UNAVAILABLE: "NOT_FOUND", NEED_REOPEN_UNAVAILABLE: "NOT_FOUND",
            SOURCE_RETRACTED: "CONFLICT", STALE_SOURCE_REVISION: "CONFLICT", CLAIM_REJECTION_UNAVAILABLE: "NOT_FOUND", CLAIM_RESTORE_UNAVAILABLE: "NOT_FOUND", RETRACT_NOT_OWNED: "NOT_FOUND",
            EMPTY_EVIDENCE: "INVALID_REQUEST", EMPTY_REASON: "INVALID_REQUEST", EMPTY_SEARCH_DESCRIPTION: "INVALID_REQUEST", EXCLUDE_UNAVAILABLE: "NOT_FOUND", EXCLUDE_INELIGIBLE: "CONFLICT", EXCLUDE_REASON_TOO_LONG: "INVALID_REQUEST",
            EMPTY_CONTENT: "INVALID_REQUEST",
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
