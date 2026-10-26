import { createHash } from "node:crypto";
import { MongoServerError, type Collection, type Db, type Filter } from "mongodb";
import { unavailableTranscriber, type Transcriber } from "../providers/brain-provider.ts";
import { calendarDate, defaultTimeZone } from "../calendar.ts";
export class InvalidAudio extends Error {}
interface Memory {
  _id: string; owner: string; content?: string; original?: string; removed?: true; capturedAt?: Date;
  referenceDate?: string; revision?: number; editSubmission?: string;
}
// Reads and edits must agree on a legacy encounter's effective source day.
function sourceReferenceDate(memory: Memory): string {
  return memory.referenceDate ?? (memory.capturedAt ? calendarDate(memory.capturedAt) : "");
}
export class EmptyContent extends Error {}
export class SubmissionConflict extends Error {}
export class MemoryNotFound extends Error {}
export class EditConflict extends Error {}
export class RememberingConcept {
  private readonly memories: Collection<Memory>;
  constructor(db: Db, private readonly transcription: Transcriber = unavailableTranscriber) { this.memories = db.collection<Memory>("remembering.memories"); }
  async transcribe({ audio, mediaType }: { audio: string; mediaType: string }): Promise<{ content: string }> {
    if (!["audio/webm", "audio/mp4", "audio/mpeg", "audio/wav", "audio/x-wav"].includes(mediaType) || !audio || audio.length > 5_592_408 || !/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/u.test(audio)) throw new InvalidAudio("Unsupported or invalid recording.");
    const bytes = Buffer.from(audio, "base64");
    if (!bytes.length || bytes.length > 4 * 1024 * 1024 || bytes.toString("base64") !== audio) throw new InvalidAudio("Unsupported or invalid recording.");
    const content = await this.transcription.transcribe(bytes, mediaType);
    if (typeof content !== "string" || !content.trim() || content.length > 20_000) throw new Error("Invalid transcription.");
    return { content };
  }
  async remember({ owner, content, submission, capturedAt, timeZone = defaultTimeZone }: {
    owner: string; content: string; submission: string; capturedAt: Date; timeZone?: string;
  }): Promise<{ memory: string }> {
    if (!content.trim()) throw new EmptyContent("Encounter content must not be blank.");
    const memory = createHash("sha256").update(JSON.stringify([owner, submission])).digest("hex");
    try { await this.memories.insertOne({ _id: memory, owner, content, capturedAt: new Date(capturedAt), referenceDate: calendarDate(capturedAt, timeZone) }); }
    catch (error) {
      if (!(error instanceof MongoServerError) || error.code !== 11000) throw error;
      const saved = await this.memories.findOne({ _id: memory, owner });
      if (!saved || saved.removed || saved.content !== content) throw new SubmissionConflict("This save token was already used for a different note.");
    }
    return { memory };
  }
  async inspect({ owner, memory }: { owner: string; memory: string }): Promise<{ content: string; original: string; revision: number; referenceDate: string }> {
    const rows = await this._record({ owner, memory });
    if (!rows[0]) throw new MemoryNotFound("Encounter not found.");
    return rows[0];
  }
  async edit({ owner, memory, content, submission, revision, capturedAt, timeZone = defaultTimeZone }: {
    owner: string; memory: string; content: string; submission: string; revision: number; capturedAt: Date; timeZone?: string;
  }): Promise<{ memory: string }> {
    // Keep compatibility inputs discoverable; edits preserve the source day.
    void capturedAt; void timeZone;
    const saved = await this.memories.findOne({ _id: memory, owner, removed: { $ne: true } });
    if (!saved?.content) throw new MemoryNotFound("Encounter not found.");
    if (!content.trim()) throw new EmptyContent("Encounter content must not be blank.");
    if (saved.editSubmission === submission) {
      if (saved.content !== content) throw new EditConflict("The encounter changed. Reopen it before editing.");
      return { memory };
    }
    if ((saved.revision ?? 0) !== revision) throw new EditConflict("The encounter changed. Reopen it before editing.");
    const filter: Filter<Memory> = { _id: memory, owner, removed: { $ne: true }, ...revisionFilter(revision) };
    const result = await this.memories.updateOne(filter, { $set: { content, original: saved.original ?? saved.content, revision: revision + 1, editSubmission: submission, referenceDate: sourceReferenceDate(saved) } });
    if (!result.matchedCount) {
      const current = await this.memories.findOne({ _id: memory, owner, removed: { $ne: true } });
      if (!current) throw new MemoryNotFound("Encounter not found.");
      if (current.editSubmission !== submission || current.content !== content) throw new EditConflict("The encounter changed. Reopen it before editing.");
    }
    return { memory };
  }
  async forget({ owner, memory }: { owner: string; memory: string }): Promise<Record<string, never>> {
    const removed = await this.memories.replaceOne({ _id: memory, owner }, { owner, removed: true });
    if (!removed.matchedCount) throw new MemoryNotFound("Encounter not found.");
    return {};
  }
  async _get({ owner, memory }: { owner: string; memory: string }): Promise<{ content: string }[]> {
    const saved = await this.memories.findOne({ _id: memory, owner, removed: { $ne: true } });
    return saved && typeof saved.content === "string" ? [{ content: saved.content }] : [];
  }
  async _record({ owner, memory }: { owner: string; memory: string }): Promise<{ content: string; original: string; revision: number; referenceDate: string }[]> {
    const saved = await this.memories.findOne({ _id: memory, owner, removed: { $ne: true } });
    return saved?.content ? [{ content: saved.content, original: saved.original ?? saved.content, revision: saved.revision ?? 0, referenceDate: sourceReferenceDate(saved) }] : [];
  }
  async _corpus({ owner }: { owner: string }): Promise<{ notes: string }> {
    const rows = await this.memories.find({ owner, removed: { $ne: true } }).sort({ _id: 1 }).limit(257).toArray();
    return { notes: JSON.stringify(rows.flatMap(row => typeof row.content === "string" ? [{ source: row._id, content: row.content, referenceDate: sourceReferenceDate(row), revision: row.revision ?? 0 }] : [])) };
  }
  async _list({ owner, after }: { owner: string; after: string }): Promise<{ memory: string; content: string }[]> {
    const filter: Filter<Memory> = { owner, removed: { $ne: true } };
    if (after) {
      const previous = await this.memories.findOne({ _id: after, owner, removed: { $ne: true } });
      if (!previous) return [];
      filter.$or = previous.capturedAt ? [{ capturedAt: { $lt: previous.capturedAt } }, { capturedAt: previous.capturedAt, _id: { $gt: after } }, { capturedAt: { $exists: false } }] : [{ capturedAt: { $exists: false }, _id: { $gt: after } }];
    }
    const saved = await this.memories.find(filter).sort({ capturedAt: -1, _id: 1 }).limit(21).toArray();
    return saved.flatMap(({ _id, content }) => typeof content === "string" ? [{ memory: _id, content }] : []);
  }
}
function revisionFilter(revision: number): Filter<Memory> { return revision === 0 ? { $or: [{ revision: 0 }, { revision: { $exists: false } }] } : { revision }; }
