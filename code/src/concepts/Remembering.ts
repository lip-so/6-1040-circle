import { createHash } from "node:crypto";
import { MongoServerError, type Collection, type Db, type Filter } from "mongodb";

interface Memory {
  _id: string;
  owner: string;
  content: string;
  capturedAt?: Date;
}

export class EmptyContent extends Error {}
export class SubmissionConflict extends Error {}

export class RememberingConcept {
  private readonly memories: Collection<Memory>;

  constructor(db: Db) {
    this.memories = db.collection<Memory>("remembering.memories");
  }

  async remember({ owner, content, submission, capturedAt }: {
    owner: string; content: string; submission: string; capturedAt: Date;
  }): Promise<{ memory: string }> {
    if (content.trim().length === 0) {
      throw new EmptyContent("Encounter content must not be blank.");
    }

    // A retry token cannot select an owner or a memory identity.
    const memory = createHash("sha256").update(JSON.stringify([owner, submission])).digest("hex");
    try {
      await this.memories.insertOne({ _id: memory, owner, content, capturedAt: new Date(capturedAt) });
    } catch (error) {
      if (!(error instanceof MongoServerError) || error.code !== 11000) throw error;
      const saved = await this.memories.findOne({ _id: memory, owner });
      if (!saved || saved.content !== content) {
        throw new SubmissionConflict("This save token was already used for a different note.");
      }
    }
    return { memory };
  }

  async _get({ owner, memory }: { owner: string; memory: string }): Promise<{ content: string }[]> {
    const saved = await this.memories.findOne({ _id: memory, owner });
    return saved ? [{ content: saved.content }] : [];
  }

  async _list({ owner, after }: { owner: string; after: string }): Promise<{ memory: string; content: string }[]> {
    const filter: Filter<Memory> = { owner };
    if (after) {
      const previous = await this.memories.findOne({ _id: after, owner });
      if (!previous) return [];
      filter.$or = previous.capturedAt ? [
        { capturedAt: { $lt: previous.capturedAt } },
        { capturedAt: previous.capturedAt, _id: { $gt: after } },
        { capturedAt: { $exists: false } },
      ] : [{ capturedAt: { $exists: false }, _id: { $gt: after } }];
    }
    const saved = await this.memories.find(filter).sort({ capturedAt: -1, _id: 1 }).limit(21).toArray();
    return saved.map(({ _id, content }) => ({ memory: _id, content }));
  }
}
