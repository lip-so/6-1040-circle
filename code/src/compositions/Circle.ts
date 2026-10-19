import { endpoint, receive, respond } from "@mit-sdg/sync-engine/boundary";
import { each, former, view, where } from "@mit-sdg/sync-engine/language";
import { concepts } from "../concepts.ts";

import { sessionTextInput } from "./inputs.ts";

const { Remembering, Seeking, Graphing, Sessioning } = concepts;

/** Read the note only through its owner's query. */
export const OwnedMemory = view(
  "the memory (memory) owned by (owner)",
  ({ owner, memory }, { content }) => where(Remembering._get({ owner, memory }).is({ content })),
).optional();

/** Show matches for an owned need with the owner's original source notes. */
export const NeedResults = former(
  "results for (owner)'s need (need)",
  ({ owner, need }, { description, target, label, source, reason, content }) =>
    where(Seeking._get({ owner, need }).is({ description })).form({
      need,
      description,
      suggestions: each(Graphing._trace({ owner, description }).is({ target, label, source, reason }))
        .where(OwnedMemory({ owner, memory: source }).is({ content }))
        .form({ target, label, source, reason, content }),
    }),
);

const Remember = endpoint(
  "/memories/remember",
  ({ session, owner, content, memory, savedContent }) =>
    receive({ session, content })
      .then(Sessioning.use({ session }).responds({ subject: owner }))
      .then(Remembering.remember({ owner, content }).responds({ memory }))
      .then(
        where(OwnedMemory({ owner, memory }).is({ content: savedContent }))
          .then(Graphing.ingest({ owner, source: memory, content: savedContent }).responds({}))
          .then(respond({ memory })),
      ),
  { input: { required: ["session", "content"] }, validators: { input: sessionTextInput("content") } },
);

const Seek = endpoint(
  "/needs/seek",
  ({ session, owner, description, need }) =>
    receive({ session, description })
      .then(Sessioning.use({ session }).responds({ subject: owner }))
      .then(Seeking.seek({ owner, description }).responds({ need }))
      .then(respond({ results: NeedResults({ owner, need }) })),
  { input: { required: ["session", "description"] }, validators: { input: sessionTextInput("description") } },
);

export const composition = { OwnedMemory, NeedResults, Remember, Seek };
