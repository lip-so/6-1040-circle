import { assemble } from "@mit-sdg/sync-engine/assembly";
import type { Db } from "mongodb";
import { composition } from "./compositions/Circle.ts";
import { composition as accounts } from "./compositions/reusable/accounts.ts";
import { composition as commons } from "./compositions/reusable/commons.ts";
import { ConnectingConcept } from "./concepts/Connecting/Connecting.ts";
import type { RecommendationPolicy } from "./concepts/Connecting/recommendation-policy.ts";
import type { Transcriber } from "./concepts/Remembering/transcription.ts";
import { RememberingConcept } from "./concepts/Remembering/Remembering.ts";
import { SeekingConcept } from "./concepts/Seeking/Seeking.ts";
import { GraphingConcept } from "./concepts/Graphing/Graphing.ts";
import type { EncounterExtractor } from "./concepts/Graphing/graphing-extraction.ts";
import { RegisteringConcept } from "./concepts/Registering/Registering.ts";
import { CommonsProvider, type Provider } from "./concepts/Federating/provider.ts";
import { CommonsFederating, Sessioning, applicationConceptSet } from "./concepts.ts";
export function assembleApplication(database: Db, options: {
    commons?: Provider;
    extractor?: EncounterExtractor;
    transcriber?: Transcriber;
    recommendationPolicy?: RecommendationPolicy;
    instances?: Partial<{
        Registering: RegisteringConcept;
        CommonsFederating: CommonsFederating;
        Sessioning: Sessioning;
        Remembering: RememberingConcept;
        Seeking: SeekingConcept;
        Graphing: GraphingConcept;
        Connecting: ConnectingConcept;
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
            Graphing: new GraphingConcept(database, options.extractor),
            Connecting: new ConnectingConcept(database, options.recommendationPolicy),
            ...options.instances,
        },
        redaction: { fields: ["attempt", "nonce", "state", "code", "audio", "content", "quote", "explanation", "exclusions", "reason", "gaps", "description"] },
        composition: { reusable: { accounts, commons }, Circle: composition },
    });
}
