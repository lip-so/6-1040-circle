import { createHash } from "node:crypto";
import connectingSpec from "@design/concepts/Connecting.md" with { type: "text" };
import * as memoryErrors from "./concepts/Remembering/Remembering.ts";
import * as needErrors from "./concepts/Seeking/Seeking.ts";
import * as graphErrors from "./concepts/Graphing/Graphing.ts";
import * as connectionErrors from "./concepts/Connecting/Connecting.ts";
import { ConnectingConcept } from "./concepts/Connecting/Connecting.ts";
import { conceptSet, registerConcept } from "@mit-sdg/sync-engine/assembly";
import rememberingSpec from "@design/concepts/Remembering.md" with { type: "text" };
import seekingSpec from "@design/concepts/Seeking.md" with { type: "text" };
import graphingSpec from "@design/concepts/Graphing.md" with { type: "text" };
import { EmptyContent, SubmissionConflict, RememberingConcept } from "./concepts/Remembering/Remembering.ts";
import { EmptyDescription, SeekingConcept } from "./concepts/Seeking/Seeking.ts";
import { EmptySourceContent, GraphingConcept, SourceNotOwned } from "./concepts/Graphing/Graphing.ts";
import federatingSpec from "@design/concepts/Federating.md" with { type: "text" };
import registeringSpec from "@design/concepts/Registering.md" with { type: "text" };
import sessioningSpec from "@design/concepts/Sessioning.md" with { type: "text" };
import { AlreadyLinked, FederatingConcept, NotConfirmed, SignInExpired, SignInRefused } from "./concepts/Federating/Federating.ts";
import { InvalidUsername, RegisteringConcept, UsernameTaken } from "./concepts/Registering/Registering.ts";
import { NotSignedIn, SessioningConcept } from "./concepts/Sessioning/Sessioning.ts";
export class CommonsFederating extends FederatingConcept<string> {
}
export class Sessioning extends SessioningConcept<string> {
}
const registering = registerConcept({
    class: RegisteringConcept,
    spec: registeringSpec,
    refusals: { INVALID_USERNAME: InvalidUsername, USERNAME_TAKEN: UsernameTaken },
});
const commonsFederating = registerConcept({
    class: CommonsFederating,
    spec: federatingSpec,
    refusals: { SIGN_IN_EXPIRED: SignInExpired, SIGN_IN_REFUSED: SignInRefused, NOT_CONFIRMED: NotConfirmed, ALREADY_LINKED: AlreadyLinked },
});
const sessioning = registerConcept({
    class: Sessioning,
    spec: sessioningSpec,
    refusals: { NOT_SIGNED_IN: NotSignedIn },
});
const remembering = registerConcept({
    class: RememberingConcept,
    spec: rememberingSpec,
    refusals: { EMPTY_CONTENT: EmptyContent, SUBMISSION_CONFLICT: SubmissionConflict, SUBMISSION_FORGOTTEN: memoryErrors.SubmissionForgotten, REVISION_UNAVAILABLE: memoryErrors.RevisionUnavailable, EMPTY_REVISION: memoryErrors.EmptyRevision, FORGET_NOT_OWNED: memoryErrors.ForgetNotOwned, INVALID_AUDIO: memoryErrors.InvalidAudio },
});
const seeking = registerConcept({
    class: SeekingConcept,
    spec: seekingSpec,
    refusals: { EMPTY_DESCRIPTION: EmptyDescription, NEED_REVISION_UNAVAILABLE: needErrors.NeedRevisionUnavailable, NEED_REVISION_INACTIVE: needErrors.NeedRevisionInactive, EMPTY_NEED_REVISION: needErrors.EmptyNeedRevision, NEED_RESOLUTION_UNAVAILABLE: needErrors.NeedResolutionUnavailable, NEED_REOPEN_UNAVAILABLE: needErrors.NeedReopenUnavailable },
});
const graphing = registerConcept({
    class: GraphingConcept,
    spec: graphingSpec,
    refusals: { EMPTY_SOURCE_CONTENT: EmptySourceContent, SOURCE_NOT_OWNED: SourceNotOwned, SOURCE_RETRACTED: graphErrors.SourceRetracted, STALE_SOURCE_REVISION: graphErrors.StaleSourceRevision, CLAIM_REJECTION_UNAVAILABLE: graphErrors.ClaimRejectionUnavailable, CLAIM_RESTORE_UNAVAILABLE: graphErrors.ClaimRestoreUnavailable, RETRACT_NOT_OWNED: graphErrors.RetractNotOwned },
});
const connecting = registerConcept({ class: ConnectingConcept, spec: connectingSpec, refusals: { EMPTY_EVIDENCE: connectionErrors.EmptyEvidence, EMPTY_REASON: connectionErrors.EmptyReason, EMPTY_SEARCH_DESCRIPTION: connectionErrors.EmptySearchDescription, EXCLUDE_UNAVAILABLE: connectionErrors.ExcludeUnavailable, EXCLUDE_INELIGIBLE: connectionErrors.ExcludeIneligible, EXCLUDE_REASON_TOO_LONG: connectionErrors.ExcludeReasonTooLong } });
export const applicationConceptSet = conceptSet({ Registering: registering, CommonsFederating: commonsFederating, Sessioning: sessioning, Remembering: remembering, Seeking: seeking, Graphing: graphing, Connecting: connecting }, { sourceDigest: ({ content }: {
        content: string;
    }) => createHash("sha256").update(content).digest("hex") });
export const { concepts } = applicationConceptSet;
