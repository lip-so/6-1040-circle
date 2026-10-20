import { createHash } from "node:crypto";
import { MongoServerError, type Collection, type Db, type Filter } from "mongodb";
import { validateAudio, type Transcriber } from "./transcription.ts";
interface Memory {
    _id: string;
    owner: string;
    content?: string;
    capturedAt?: Date;
    submission?: string;
    revision?: number;
    forgotten?: boolean;
}
export class EmptyContent extends Error {
}
export class SubmissionConflict extends Error {
}
export class SubmissionForgotten extends Error {
}
export class RevisionUnavailable extends Error {
}
export class EmptyRevision extends Error {
}
export class ForgetNotOwned extends Error {
}
export { InvalidAudio } from "./transcription.ts";
export class RememberingConcept {
    private readonly memories: Collection<Memory>;
    constructor(db: Db, private readonly transcriber?: Transcriber) {
        this.memories = db.collection<Memory>("remembering.memories");
    }
    async remember({ owner, content, submission, capturedAt }: {
        owner: string;
        content: string;
        submission: string;
        capturedAt: Date;
    }): Promise<{
        memory: string;
    }> {
        if (!content.trim())
            throw new EmptyContent();
        const memory = createHash("sha256").update(JSON.stringify([owner, submission])).digest("hex");
        try {
            await this.memories.insertOne({ _id: memory, owner, content, submission, capturedAt: new Date(capturedAt), revision: 0, forgotten: false });
        }
        catch (error) {
            if (!(error instanceof MongoServerError) || error.code !== 11000)
                throw error;
            const row = await this.memories.findOne({ _id: memory, owner });
            if (row?.forgotten)
                throw new SubmissionForgotten();
            if (!row || row.content !== content)
                throw new SubmissionConflict();
        }
        return { memory };
    }
    async revise({ owner, memory, content }: {
        owner: string;
        memory: string;
        content: string;
    }): Promise<Record<string, never>> {
        const row = await this.memories.findOne({ _id: memory, owner, forgotten: { $ne: true } });
        if (!row)
            throw new RevisionUnavailable();
        if (!content.trim())
            throw new EmptyRevision();
        if (row.content !== content) {
            const result = await this.memories.updateOne({ _id: memory, owner, forgotten: { $ne: true }, content: { $ne: content } }, { $set: { content }, $inc: { revision: 1 } });
            if (!result.matchedCount && !(await this.memories.findOne({ _id: memory, owner, forgotten: { $ne: true } })))
                throw new RevisionUnavailable();
        }
        return {};
    }
    async forget({ owner, memory }: {
        owner: string;
        memory: string;
    }): Promise<Record<string, never>> {
        const row = await this.memories.findOne({ _id: memory, owner });
        if (!row)
            throw new ForgetNotOwned();
        await this.memories.updateOne({ _id: memory, owner, forgotten: { $ne: true } }, { $set: { forgotten: true }, $unset: { content: "" }, $inc: { revision: 1 } });
        return {};
    }
    async transcribe({ owner, audio, mediaType }: {
        owner: string;
        audio: string;
        mediaType: string;
    }): Promise<{
        content: string;
    }> {
        // The authenticated owner is part of the action contract; no owner data reaches the provider.
        void owner;
        const bytes = validateAudio(audio, mediaType);
        if (!this.transcriber)
            throw new Error("Transcription is unavailable.");
        const content = await this.transcriber.transcribe(bytes, mediaType);
        if (typeof content !== "string" || !content.trim() || content.length > 20000)
            throw new Error("Transcription is unavailable.");
        return { content };
    }
    async _get({ owner, memory }: {
        owner: string;
        memory: string;
    }): Promise<{
        content: string;
    }[]> {
        const row = await this.memories.findOne({ _id: memory, owner, forgotten: { $ne: true } });
        return row?.content !== undefined ? [{ content: row.content }] : [];
    }
    async _record({ owner, memory }: {
        owner: string;
        memory: string;
    }): Promise<{
        content: string;
        revision: number;
    }[]> {
        const row = await this.memories.findOne({ _id: memory, owner, forgotten: { $ne: true } });
        return row?.content !== undefined ? [{ content: row.content, revision: row.revision ?? 0 }] : [];
    }
    async _list({ owner, after }: {
        owner: string;
        after: string;
    }): Promise<{
        memory: string;
        content: string;
    }[]> {
        const filter: Filter<Memory> = { owner, forgotten: { $ne: true } };
        if (after) {
            const row = await this.memories.findOne({ _id: after, owner, forgotten: { $ne: true } });
            if (!row)
                return [];
            filter.$or = row.capturedAt ? [{ capturedAt: { $lt: row.capturedAt } }, { capturedAt: row.capturedAt, _id: { $gt: after } }, { capturedAt: { $exists: false } }] : [{ capturedAt: { $exists: false }, _id: { $gt: after } }];
        }
        return (await this.memories.find(filter).sort({ capturedAt: -1, _id: 1 }).limit(21).toArray()).flatMap(row => row.content === undefined ? [] : [{ memory: row._id, content: row.content }]);
    }
}
