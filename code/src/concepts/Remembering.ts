import type { Collection, Db } from "mongodb";

interface Memory {
  _id: string;
  owner: string;
  content: string;
}

export class EmptyContent extends Error {}

export class RememberingConcept {
  private readonly memories: Collection<Memory>;

  constructor(db: Db) {
    this.memories = db.collection<Memory>("remembering.memories");
  }

  async remember({ owner, content }: { owner: string; content: string }): Promise<{ memory: string }> {
    if (content.trim().length === 0) {
      throw new EmptyContent("Encounter content must not be blank.");
    }

    const memory = crypto.randomUUID();
    await this.memories.insertOne({ _id: memory, owner, content });
    return { memory };
  }

  async _get({ owner, memory }: { owner: string; memory: string }): Promise<{ content: string }[]> {
    const saved = await this.memories.findOne({ _id: memory, owner });
    return saved ? [{ content: saved.content }] : [];
  }
}
