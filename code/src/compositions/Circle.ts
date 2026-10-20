import { endpoint, receive, respond } from "@mit-sdg/sync-engine/boundary";
import { compute, count, each, former, is, no, now, reaction, view, when, where } from "@mit-sdg/sync-engine/language";
import { applicationConceptSet, concepts } from "../concepts.ts";
import { memoryListInput, protectedInput, rememberInput, sessionTextInput } from "./inputs.ts";
const { Remembering, Seeking, Graphing, Connecting, Sessioning } = concepts;
const { sourceDigest } = applicationConceptSet.computations;
const unavailable = "NOT_FOUND";
export const OwnedMemory = view("the memory (memory) owned by (owner)", ({ owner, memory }, { content }) => where(Remembering._get({ owner, memory }).is({ content }))).optional();
export const OwnedEvidence = view("current owned evidence (claim) for (owner)", ({ owner, claim }, { source, quote, contentDigest, content }) => where(Graphing._evidence({ owner, claim }).is({ source, quote, contentDigest }), OwnedMemory({ owner, memory: source }).is({ content }), compute(sourceDigest, { content }, contentDigest))).optional();
export const InvalidEvidence = view("invalid members of (evidence) for (owner)", ({ owner, evidence }, { claim }) => where(Graphing._members({ owner, evidence }).is({ claim }), no(OwnedEvidence({ owner, claim })))).many();
export const ValidEvidence = view("complete evidence (evidence) for (owner)", ({ owner, evidence }, _output, { total }) => where(count(Graphing._members, { owner, evidence }, total), is.gt(total, 0), no(InvalidEvidence({ owner, evidence })))).holds();
export const SavedMemories = former("saved memories of (owner) after (after)", ({ owner, after }, { memory, content }) => each(Remembering._list({ owner, after }).is({ memory, content })).form({ memory, content }));
export const MemoryDetails = former("details of (owner)'s memory (memory)", ({ owner, memory }, { content, contentDigest, claim, fromLabel, relation, toLabel, quote, usable }) => where(OwnedMemory({ owner, memory }).is({ content })).form({
    memory, content,
    claims: each(Graphing._claims({ owner, source: memory }).is({ claim, fromLabel, relation, toLabel, quote, usable }))
        .where(Graphing._source({ owner, source: memory }).is({ contentDigest }), compute(sourceDigest, { content }, contentDigest))
        .form({ claim, fromLabel, relation, toLabel, quote, usable }),
}));
export const SavedNeeds = former("saved needs of (owner)", ({ owner }, { need, description, active }) => each(Seeking._list({ owner }).is({ need, description, active })).form({ need, description, active }));
export const NeedResults = former("results for (owner)'s need (need)", ({ owner, need }, { description, active, target, label, source, evidence, reason, gaps, connection, content, claim, evidenceSource, quote, original }) => where(Seeking._record({ owner, need }).is({ description, active })).form({
    need, description, active,
    suggestions: each(Graphing._trace({ owner, description }).is({ target, label, source, evidence, reason, gaps }))
        .where(is.among(active, [true]), Connecting._suggestions({ owner }).is({ connection, target, need, evidence }), ValidEvidence({ owner, evidence }), OwnedMemory({ owner, memory: source }).is({ content })).form({ connection, target, label, source, content, evidence, reason, gaps,
        sources: each(Graphing._members({ owner, evidence }).is({ claim }))
            .where(OwnedEvidence({ owner, claim }).is({ source: evidenceSource, quote, content: original }))
            .form({ claim, source: evidenceSource, quote, content: original }),
    }),
}));
export const SuggestionTrace = view("trace of (owner)'s target (target) for need (need)", ({ owner, need, target }, { label, source }, { description }) => where(Seeking._record({ owner, need }).is({ description, active: true }), Graphing._trace({ owner, description }).is({ target, label, source }))).optional();
export const CurrentSuggestions = former("current suggestions for (owner)", ({ owner }, { need, description, connection, target, evidence, reason, gaps, label, source, content, claim, evidenceSource, quote, original }) => each(Seeking._active({ owner }).is({ need, description }))
    .where(Connecting._suggestions({ owner }).is({ connection, target, need, evidence, reason, gaps }), Graphing._trace({ owner, description }).is({ target, label, source, evidence }), ValidEvidence({ owner, evidence }), OwnedMemory({ owner, memory: source }).is({ content })).form({ need, description, connection, target, label, source, content, evidence, reason, gaps,
    sources: each(Graphing._members({ owner, evidence }).is({ claim }))
        .where(OwnedEvidence({ owner, claim }).is({ source: evidenceSource, quote, content: original }))
        .form({ claim, source: evidenceSource, quote, content: original }),
}));
export const CurrentSuggestion = view("current suggestion (connection) for (owner)", ({ owner, connection }, _output, { need, description, target, evidence }) => where(Connecting._get({ owner, connection }).is({ need, target, evidence, eligible: true }), Seeking._record({ owner, need }).is({ description, active: true }), Graphing._trace({ owner, description }).is({ target }), ValidEvidence({ owner, evidence }))).holds();
export const SuggestionDetails = former("details of (owner)'s suggestion (connection)", ({ owner, connection }, { need, description, target, evidence, reason, gaps, eligible, label, source, content, claim, evidenceSource, quote, original }) => where(Connecting._get({ owner, connection }).is({ need, target, evidence, reason, gaps, eligible }), is.among(eligible, [true]), Seeking._record({ owner, need }).is({ description, active: true }), SuggestionTrace({ owner, need, target }).is({ label, source }), ValidEvidence({ owner, evidence }), OwnedMemory({ owner, memory: source }).is({ content })).form({ connection, need, description, target, label, source, content, evidence, reason, gaps, eligible,
    sources: each(Graphing._members({ owner, evidence }).is({ claim }))
        .where(OwnedEvidence({ owner, claim }).is({ source: evidenceSource, quote, content: original }))
        .form({ claim, source: evidenceSource, quote, content: original }),
}));
const ListMemories = endpoint("/memories/list", ({ session, owner, after }) => receive({ session, after })
    .then(Sessioning.use({ session }).responds({ subject: owner }))
    .then(respond({ memories: SavedMemories({ owner, after }) })), { input: { required: ["session", "after"] }, validators: { input: memoryListInput } });
const InspectMemory = endpoint("/memories/get", ({ session, owner, memory }) => receive({ session, memory })
    .then(Sessioning.use({ session }).responds({ subject: owner }))
    .then(where(OwnedMemory({ owner, memory })).then(respond({ memory: MemoryDetails({ owner, memory }) })).named("found"), where(no(OwnedMemory({ owner, memory }))).then(respond({ error: unavailable })).named("missing")), { validators: { input: protectedInput(["memory"]) } });
const Remember = endpoint("/memories/remember", ({ session, owner, content, submission, capturedAt, memory }) => receive({ session, content, submission }).where(now(capturedAt))
    .then(Sessioning.use({ session }).responds({ subject: owner }))
    .then(Remembering.remember({ owner, content, submission, capturedAt }).responds({ memory }))
    .afterFlowSettles().then(respond({ memory })), { input: { required: ["session", "content", "submission"] }, validators: { input: rememberInput } });
const ReviseMemory = endpoint("/memories/revise", ({ session, owner, memory, content }) => receive({ session, memory, content })
    .then(Sessioning.use({ session }).responds({ subject: owner }))
    .then(Remembering.revise({ owner, memory, content }).responds({})).afterFlowSettles().then(respond({ memory })), { validators: { input: protectedInput(["memory", "content"]) } });
const ForgetMemory = endpoint("/memories/forget", ({ session, owner, memory }) => receive({ session, memory })
    .then(Sessioning.use({ session }).responds({ subject: owner }))
    .then(Remembering.forget({ owner, memory }).responds({})).afterFlowSettles().then(respond({ deleted: true })), { validators: { input: protectedInput(["memory"]) } });
const RetryMemoryIndex = endpoint("/memories/reindex", ({ session, owner, memory, content, revision, observedAt }) => receive({ session, memory }).where(now(observedAt))
    .then(Sessioning.use({ session }).responds({ subject: owner }))
    .then(where(Remembering._record({ owner, memory }).is({ content, revision }))
    .then(Graphing.ingest({ owner, source: memory, content, sourceRevision: revision, observedAt }).responds({}))
    .named("found"), where(no(Remembering._record({ owner, memory }))).then(respond({ error: unavailable })).named("missing"))
    .afterFlowSettles().where(Remembering._record({ owner, memory })).then(respond({ memory })), { validators: { input: protectedInput(["memory"]) } });
const Transcribe = endpoint("/capture/transcribe", ({ session, owner, audio, mediaType, content }) => receive({ session, audio, mediaType })
    .then(Sessioning.use({ session }).responds({ subject: owner }))
    .then(Remembering.transcribe({ owner, audio, mediaType }).responds({ content })).then(respond({ content })), { validators: { input: protectedInput(["audio", "mediaType"]) } });
const Seek = endpoint("/needs/seek", ({ session, owner, description, createdAt, need }) => receive({ session, description }).where(now(createdAt))
    .then(Sessioning.use({ session }).responds({ subject: owner }))
    .then(Seeking.seek({ owner, description, createdAt }).responds({ need })).afterFlowSettles()
    .then(respond({ results: NeedResults({ owner, need }) })), { validators: { input: sessionTextInput("description") } });
const ListNeeds = endpoint("/needs/list", ({ session, owner }) => receive({ session })
    .then(Sessioning.use({ session }).responds({ subject: owner })).then(respond({ needs: SavedNeeds({ owner }) })), { validators: { input: protectedInput([]) } });
const ReviseNeed = endpoint("/needs/revise", ({ session, owner, need, description }) => receive({ session, need, description })
    .then(Sessioning.use({ session }).responds({ subject: owner })).then(Seeking.revise({ owner, need, description }).responds({}))
    .afterFlowSettles().then(respond({ results: NeedResults({ owner, need }) })), { validators: { input: protectedInput(["need", "description"]) } });
const ResolveNeed = endpoint("/needs/resolve", ({ session, owner, need }) => receive({ session, need })
    .then(Sessioning.use({ session }).responds({ subject: owner })).then(Seeking.resolve({ owner, need }).responds({}))
    .afterFlowSettles().then(respond({ results: NeedResults({ owner, need }) })), { validators: { input: protectedInput(["need"]) } });
const ReopenNeed = endpoint("/needs/reopen", ({ session, owner, need }) => receive({ session, need })
    .then(Sessioning.use({ session }).responds({ subject: owner })).then(Seeking.reopen({ owner, need }).responds({}))
    .afterFlowSettles().then(respond({ results: NeedResults({ owner, need }) })), { validators: { input: protectedInput(["need"]) } });
const DeleteNeed = endpoint("/needs/delete", ({ session, owner, need }) => receive({ session, need })
    .then(Sessioning.use({ session }).responds({ subject: owner })).then(Seeking.delete({ owner, need }).responds({}))
    .afterFlowSettles().then(respond({ deleted: true })), { validators: { input: protectedInput(["need"]) } });
const ListSuggestions = endpoint("/suggestions/list", ({ session, owner }) => receive({ session })
    .then(Sessioning.use({ session }).responds({ subject: owner })).then(respond({ suggestions: CurrentSuggestions({ owner }) })), { validators: { input: protectedInput([]) } });
const InspectSuggestion = endpoint("/suggestions/inspect", ({ session, owner, connection }) => receive({ session, connection })
    .then(Sessioning.use({ session }).responds({ subject: owner }))
    .then(where(CurrentSuggestion({ owner, connection })).then(respond({ suggestion: SuggestionDetails({ owner, connection }) })).named("found"), where(no(CurrentSuggestion({ owner, connection }))).then(respond({ error: unavailable })).named("missing")), { validators: { input: protectedInput(["connection"]) } });
const ExcludeSuggestion = endpoint("/suggestions/exclude", ({ session, owner, connection, explanation }) => receive({ session, connection, explanation })
    .then(Sessioning.use({ session }).responds({ subject: owner }))
    .then(where(CurrentSuggestion({ owner, connection })).then(Connecting.exclude({ owner, connection, explanation }).responds({}))
    .then(respond({ suggestions: CurrentSuggestions({ owner }) })).named("found"), where(no(CurrentSuggestion({ owner, connection }))).then(respond({ error: unavailable })).named("missing")), { validators: { input: protectedInput(["connection", "explanation"]) } });
const RejectClaim = endpoint("/claims/reject", ({ session, owner, claim }) => receive({ session, claim })
    .then(Sessioning.use({ session }).responds({ subject: owner })).then(Graphing.reject({ owner, claim }).responds({}))
    .afterFlowSettles().then(respond({ suggestions: CurrentSuggestions({ owner }) })), { validators: { input: protectedInput(["claim"]) } });
const RestoreClaim = endpoint("/claims/restore", ({ session, owner, claim }) => receive({ session, claim })
    .then(Sessioning.use({ session }).responds({ subject: owner })).then(Graphing.restore({ owner, claim }).responds({}))
    .afterFlowSettles().then(respond({ suggestions: CurrentSuggestions({ owner }) })), { validators: { input: protectedInput(["claim"]) } });
const RemoveClaim = endpoint("/claims/remove", ({ session, owner, claim }) => receive({ session, claim })
    .then(Sessioning.use({ session }).responds({ subject: owner })).then(Graphing.remove({ owner, claim }).responds({}))
    .afterFlowSettles().then(respond({ suggestions: CurrentSuggestions({ owner }) })), { validators: { input: protectedInput(["claim"]) } });
// Every reset starts the same complete-proof offer policy. Refreshed needs are read again before offers.
const refreshOffers = ({ owner, need, description, target, evidence, reason, gaps }: any) => where(Seeking._record({ owner, need }).is({ description, active: true }), Graphing._trace({ owner, description }).is({ target, evidence, reason, gaps }), ValidEvidence({ owner, evidence }), no(Connecting._excluded({ owner, target })))
    .then(Connecting.offer({ owner, need, target, description, evidence, reason, gaps }).responds({}));
const refreshAll = (v: any) => where(Seeking._active({ owner: v.owner }).is({ need: v.need }))
    .then(Connecting.reset({ owner: v.owner, need: v.need }).responds({}));
const RefreshSuggestionsWork = endpoint("/suggestions/refresh", ({ session, owner, need, description, target, evidence, reason, gaps }) => {
    const v = { session, owner, need, description, target, evidence, reason, gaps };
    return receive({ session: v.session })
        .then(Sessioning.use({ session: v.session }).responds({ subject: v.owner }))
        .then(refreshAll(v)).then(refreshOffers(v));
}, { validators: { input: protectedInput([]) } });
const RefreshSuggestions = endpoint("/suggestions/refresh", ({ session, owner }) => receive({ session })
    .afterFlowSettles().then(Sessioning.use({ session }).responds({ subject: owner }))
    .then(respond({ suggestions: CurrentSuggestions({ owner }) })));
const IndexRemembered = reaction(({ owner, memory, content, revision, observedAt }) => when(Remembering.remember({ owner }).responds({ memory }))
    .where(now(observedAt), Remembering._record({ owner, memory }).is({ content, revision }))
    .then(Graphing.ingest({ owner, source: memory, content, sourceRevision: revision, observedAt }).responds({})));
const IndexRevised = reaction(({ owner, memory, content, revision, observedAt }) => when(Remembering.revise({ owner, memory }).responds({}))
    .where(now(observedAt), Remembering._record({ owner, memory }).is({ content, revision }))
    .then(Graphing.ingest({ owner, source: memory, content, sourceRevision: revision, observedAt }).responds({})));
const RetractForgotten = reaction(({ owner, memory }) => when(Remembering.forget({ owner, memory }).responds({}))
    .then(Graphing.retract({ owner, source: memory }).responds({})));
const RefreshSoughtNeed = reaction(({ owner, need, description, target, evidence, reason, gaps }) => {
    const v = { owner, need, description, target, evidence, reason, gaps };
    return when(Seeking.seek({ owner: v.owner }).responds({ need: v.need }))
        .then(Connecting.clear({ owner: v.owner, need: v.need }).responds({}))
        .then(Connecting.reset({ owner: v.owner, need: v.need }).responds({})).then(refreshOffers(v));
});
const RefreshRevisedNeed = reaction(({ owner, need, description, target, evidence, reason, gaps }) => {
    const v = { owner, need, description, target, evidence, reason, gaps };
    return when(Seeking.revise({ owner: v.owner, need: v.need }).responds({}))
        .then(Connecting.clear({ owner: v.owner, need: v.need }).responds({}))
        .then(Connecting.reset({ owner: v.owner, need: v.need }).responds({})).then(refreshOffers(v));
});
const ClearResolvedNeed = reaction(({ owner, need }) => when(Seeking.resolve({ owner, need }).responds({})).then(Connecting.clear({ owner, need }).responds({})));
const ClearDeletedNeed = reaction(({ owner, need }) => when(Seeking.delete({ owner, need }).responds({})).then(Connecting.clear({ owner, need }).responds({})));
const RefreshReopenedNeed = reaction(({ owner, need, description, target, evidence, reason, gaps }) => {
    const v = { owner, need, description, target, evidence, reason, gaps };
    return when(Seeking.reopen({ owner: v.owner, need: v.need }).responds({}))
        .then(Connecting.reset({ owner: v.owner, need: v.need }).responds({})).then(refreshOffers(v));
});
const RefreshAfterIngest = reaction(({ owner, need, description, target, evidence, reason, gaps }) => when(Graphing.ingest({ owner }).responds({}))
    .where(Seeking._active({ owner }).is({ need }))
    .then(Connecting.reset({ owner, need }).responds({}))
    .then(where(Seeking._record({ owner, need }).is({ description, active: true }), Graphing._trace({ owner, description }).is({ target, evidence, reason, gaps }), ValidEvidence({ owner, evidence }), no(Connecting._excluded({ owner, target })))
    .then(Connecting.offer({ owner, need, target, description, evidence, reason, gaps }).responds({}))));
const RefreshAfterReject = reaction(({ owner, need, description, target, evidence, reason, gaps }) => {
    const v = { owner, need, description, target, evidence, reason, gaps };
    return when(Graphing.reject({ owner: v.owner }).responds({}))
        .where(Seeking._active({ owner: v.owner }).is({ need: v.need }))
        .then(Connecting.reset({ owner: v.owner, need: v.need }).responds({})).then(refreshOffers(v));
});
const RefreshAfterRestore = reaction(({ owner, need, description, target, evidence, reason, gaps }) => {
    const v = { owner, need, description, target, evidence, reason, gaps };
    return when(Graphing.restore({ owner: v.owner }).responds({}))
        .where(Seeking._active({ owner: v.owner }).is({ need: v.need }))
        .then(Connecting.reset({ owner: v.owner, need: v.need }).responds({})).then(refreshOffers(v));
});
const RefreshAfterRemove = reaction(({ owner, need, description, target, evidence, reason, gaps }) => {
    const v = { owner, need, description, target, evidence, reason, gaps };
    return when(Graphing.remove({ owner: v.owner }).responds({}))
        .where(Seeking._active({ owner: v.owner }).is({ need: v.need }))
        .then(Connecting.reset({ owner: v.owner, need: v.need }).responds({})).then(refreshOffers(v));
});
const RefreshAfterRetract = reaction(({ owner, need, description, target, evidence, reason, gaps }) => {
    const v = { owner, need, description, target, evidence, reason, gaps };
    return when(Graphing.retract({ owner: v.owner }).responds({}))
        .where(Seeking._active({ owner: v.owner }).is({ need: v.need }))
        .then(Connecting.reset({ owner: v.owner, need: v.need }).responds({})).then(refreshOffers(v));
});
const InvalidateBeforeIndex = reaction(({ owner, need }) => when(Graphing.ingest({ owner }))
    .where(Seeking._active({ owner }).is({ need })).then(Connecting.reset({ owner, need }).responds({})));
export const composition = {
    OwnedMemory, OwnedEvidence, InvalidEvidence, ValidEvidence, SavedMemories, MemoryDetails, SavedNeeds, NeedResults, CurrentSuggestions, SuggestionDetails, CurrentSuggestion, SuggestionTrace,
    ListMemories, InspectMemory, Remember, ReviseMemory, ForgetMemory, RetryMemoryIndex, Transcribe,
    Seek, ListNeeds, ReviseNeed, ResolveNeed, ReopenNeed, DeleteNeed,
    ListSuggestions, InspectSuggestion, ExcludeSuggestion, RefreshSuggestions, RefreshSuggestionsWork,
    RejectClaim, RestoreClaim, RemoveClaim,
    IndexRemembered, IndexRevised, RetractForgotten, RefreshSoughtNeed, RefreshRevisedNeed, ClearResolvedNeed, ClearDeletedNeed,
    RefreshReopenedNeed, RefreshAfterIngest, RefreshAfterReject, RefreshAfterRestore, RefreshAfterRemove, RefreshAfterRetract, InvalidateBeforeIndex,
};
