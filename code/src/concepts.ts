import { conceptSet, registerConcept } from "@mit-sdg/sync-engine/assembly";
import rememberingSpec from "@design/concepts/Remembering.md" with { type: "text" };
import seekingSpec from "@design/concepts/Seeking.md" with { type: "text" };
import graphingSpec from "@design/concepts/Graphing.md" with { type: "text" };
import { EmptyContent, RememberingConcept } from "./concepts/Remembering.ts";
import { EmptyDescription, SeekingConcept } from "./concepts/Seeking.ts";
import { EmptySourceContent, GraphingConcept, SourceNotOwned } from "./concepts/Graphing.ts";

import federatingSpec from "@design/concepts/Federating.md" with { type: "text" };
import registeringSpec from "@design/concepts/Registering.md" with { type: "text" };
import sessioningSpec from "@design/concepts/Sessioning.md" with { type: "text" };
import { AlreadyLinked, FederatingConcept, NotConfirmed, SignInExpired, SignInRefused } from "./concepts/Federating/Federating.ts";
import { InvalidUsername, RegisteringConcept, UsernameTaken } from "./concepts/Registering/Registering.ts";
import { NotSignedIn, SessioningConcept } from "./concepts/Sessioning/Sessioning.ts";

export class CommonsFederating extends FederatingConcept<string> {}
export class Sessioning extends SessioningConcept<string> {}

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
  refusals: { EMPTY_CONTENT: EmptyContent },
});

const seeking = registerConcept({
  class: SeekingConcept,
  spec: seekingSpec,
  refusals: { EMPTY_DESCRIPTION: EmptyDescription },
});

const graphing = registerConcept({
  class: GraphingConcept,
  spec: graphingSpec,
  refusals: { EMPTY_SOURCE_CONTENT: EmptySourceContent, SOURCE_NOT_OWNED: SourceNotOwned },
});

export const applicationConceptSet = conceptSet({ Registering: registering, CommonsFederating: commonsFederating, Sessioning: sessioning, Remembering: remembering, Seeking: seeking, Graphing: graphing });
export const { concepts } = applicationConceptSet;
