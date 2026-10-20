import { assemble } from "@mit-sdg/sync-engine/assembly";
import type { Db } from "mongodb";
import { composition } from "./compositions/Circle.ts";
import { composition as accounts } from "./compositions/reusable/accounts.ts";
import { composition as commons } from "./compositions/reusable/commons.ts";
import { RememberingConcept } from "./concepts/Remembering.ts";
import { SeekingConcept } from "./concepts/Seeking.ts";
import { GraphingConcept } from "./concepts/Graphing.ts";
import { RegisteringConcept } from "./concepts/Registering/Registering.ts";
import { CommonsProvider, type Provider } from "./concepts/Federating/provider.ts";
import { CommonsFederating, Sessioning, applicationConceptSet } from "./concepts.ts";

import { type BrainProvider, type Transcriber } from "./concepts/brain-provider.ts";

export function assembleApplication(database: Db, options: {
  commons?: Provider;
  brain?: BrainProvider;
  transcriber?: Transcriber;
  instances?: Partial<{
    Registering: RegisteringConcept;
    CommonsFederating: CommonsFederating;
    Sessioning: Sessioning;
    Remembering: RememberingConcept;
    Seeking: SeekingConcept;
    Graphing: GraphingConcept;
  }>;
} = {}) {
  return assemble({
    conceptSet: applicationConceptSet,
    instances: {
      Registering: new RegisteringConcept(database),
      CommonsFederating: new CommonsFederating(database, options.commons ?? new CommonsProvider({
        origin: process.env.COMMONS_ORIGIN ?? "https://class.mit-sdg.dev",
        app: process.env.PUBLIC_ORIGIN ?? "http://localhost:3000",
      }), "CommonsFederating"),
      Sessioning: new Sessioning(database),
      Remembering: new RememberingConcept(database, options.transcriber),
      Seeking: new SeekingConcept(database),
      Graphing: new GraphingConcept(database, options.brain),
      ...options.instances,
    },
    redaction: { fields: ["attempt", "nonce", "state", "code", "session", "content", "savedContent", "description", "notes", "audio", "card", "reason", "label", "facts", "selection", "memories", "results"] },
    composition: { reusable: { accounts, commons }, Circle: composition },
  });
}
