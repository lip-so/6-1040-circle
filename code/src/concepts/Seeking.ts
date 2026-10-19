import type { Collection, Db } from "mongodb";

interface Need {
  _id: string;
  owner: string;
  description: string;
}

export class EmptyDescription extends Error {}

export class SeekingConcept {
  private readonly needs: Collection<Need>;

  constructor(db: Db) {
    this.needs = db.collection<Need>("seeking.needs");
  }

  async seek({ owner, description }: { owner: string; description: string }): Promise<{ need: string }> {
    if (description.trim().length === 0) {
      throw new EmptyDescription("The need description must not be blank.");
    }
    const need = crypto.randomUUID();
    await this.needs.insertOne({ _id: need, owner, description });
    return { need };
  }

  async _get({ owner, need }: { owner: string; need: string }): Promise<{ description: string }[]> {
    const saved = await this.needs.findOne({ _id: need, owner });
    return saved ? [{ description: saved.description }] : [];
  }
}
