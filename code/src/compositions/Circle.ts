import { endpoint, receive, respond } from "@mit-sdg/sync-engine/boundary";
import { each, former, now, view, where } from "@mit-sdg/sync-engine/language";
import { concepts } from "../concepts.ts";

import { transcriptionInput, memoryIdentityInput, memoryListInput, rememberInput, sessionTextInput } from "./inputs.ts";

const { Remembering, Seeking, Graphing, Sessioning } = concepts;

export const SavedMemories = former(
  "saved memories of (owner) after (after)",
  ({ owner, after }, { memory, content, card }) =>
    each(Remembering._list({ owner, after }).is({ memory, content }))
      .where(Graphing._card({ owner, source: memory, content }).is({ card })).form({ memory, content, card }),
);

const ListMemories = endpoint(
  "/memories/list",
  ({ session, owner, after }) => receive({ session, after })
    .then(Sessioning.use({ session }).responds({ subject: owner }))
    .then(respond({ memories: SavedMemories({ owner, after }) })),
  { input: { required: ["session", "after"] }, validators: { input: memoryListInput } },
);

/** Read the note only through its owner's query. */
export const OwnedMemory = view(
  "the memory (memory) owned by (owner)",
  ({ owner, memory }, { content }) => where(Remembering._get({ owner, memory }).is({ content })),
).optional();

/** Show matches for an owned need with the owner's original source notes. */
export const NeedResults = former(
  "results for (owner)'s need (need) from (recall)",
  ({ owner, need, recall }, { description, target, label, source, reason, content, card }) =>
    where(Seeking._get({ owner, need }).is({ description })).form({
      need,
      description,
      suggestions: each(Graphing._matches({ owner, recall }).is({ target, label, source, reason, card }))
        .where(OwnedMemory({ owner, memory: source }).is({ content }))
        .form({ target, label, source, reason, content, card }),
    }),
);

const Remember = endpoint(
  "/memories/remember",
  ({ session, owner, content, submission, capturedAt, memory, savedContent }) =>
    receive({ session, content, submission }).where(now(capturedAt))
      .then(Sessioning.use({ session }).responds({ subject: owner }))
      .then(Remembering.remember({ owner, content, submission, capturedAt }).responds({ memory }))
      .then(
        where(OwnedMemory({ owner, memory }).is({ content: savedContent }))
          .then(Graphing.ingest({ owner, source: memory, content: savedContent }).responds({}))
          .then(respond({ memory })),
      ),
  { input: { required: ["session", "content", "submission"] }, validators: { input: rememberInput } },
);

const Seek = endpoint(
  "/needs/seek",
  ({ session, owner, description, need, notes, recall }) =>
    receive({ session, description })
      .then(Sessioning.use({ session }).responds({ subject: owner }))
      .then(Seeking.seek({ owner, description }).responds({ need }))
      .then(where(Remembering._corpus({ owner }).is({ notes }))
        .then(Graphing.recall({ owner, description, notes }).responds({ recall }))
        .then(respond({ results: NeedResults({ owner, need, recall }) }))),
  { input: { required: ["session", "description"] }, validators: { input: sessionTextInput("description") } },
);

const Forget = endpoint(
  "/memories/forget",
  ({ session, owner, memory }) => receive({ session, memory })
    .then(Sessioning.use({ session }).responds({ subject: owner }))
    .then(Remembering.forget({ owner, memory }).responds({}))
    .then(Graphing.withdraw({ owner, source: memory }).responds({}))
    .then(respond({})),
  { input: { required: ["session", "memory"] }, validators: { input: memoryIdentityInput } },
);

const Transcribe = endpoint(
  "/memories/transcribe",
  ({ session, audio, mediaType, content }) => receive({ session, audio, mediaType })
    .then(Sessioning.use({ session }).responds({}))
    .then(Remembering.transcribe({ audio, mediaType }).responds({ content }))
    .then(respond({ content })),
  { input: { required: ["session", "audio", "mediaType"] }, validators: { input: transcriptionInput } },
);

export const composition = { OwnedMemory, NeedResults, SavedMemories, ListMemories, Remember, Seek, Forget, Transcribe };
