import { type Collection, type Db } from "mongodb";
interface Need {
    _id: string;
    owner: string;
    description: string;
    createdAt?: Date;
    active?: boolean;
}
export class EmptyDescription extends Error {
}
export class NeedRevisionUnavailable extends Error {
}
export class NeedRevisionInactive extends Error {
}
export class EmptyNeedRevision extends Error {
}
export class NeedResolutionUnavailable extends Error {
}
export class NeedReopenUnavailable extends Error {
}
export class SeekingConcept {
    private readonly needs: Collection<Need>;
    constructor(db: Db) {
        this.needs = db.collection<Need>("seeking.needs");
    }
    async seek({ owner, description, createdAt }: {
        owner: string;
        description: string;
        createdAt?: Date;
    }): Promise<{
        need: string;
    }> {
        if (!description.trim())
            throw new EmptyDescription();
        const normalized = description.trim().replace(/\s+/gu, " ").toLocaleLowerCase("en");
        const rows = (await this.needs.find({ owner, active: { $ne: false } }).toArray())
            .filter(row => row.description.trim().replace(/\s+/gu, " ").toLocaleLowerCase("en") === normalized);
        const existing = rows.sort((a, b) => a._id.localeCompare(b._id))[0];
        if (existing)
            return { need: existing._id };
        const need = crypto.randomUUID();
        await this.needs.insertOne({ _id: need, owner, description, active: true,
            ...(createdAt ? { createdAt: new Date(createdAt) } : {}) });
        return { need };
    }
    async revise({ owner, need, description }: {
        owner: string;
        need: string;
        description: string;
    }): Promise<Record<string, never>> {
        const row = await this.needs.findOne({ _id: need, owner });
        if (!row)
            throw new NeedRevisionUnavailable();
        if (row.active === false)
            throw new NeedRevisionInactive();
        if (!description.trim())
            throw new EmptyNeedRevision();
        const result = await this.needs.updateOne({ _id: need, owner, active: { $ne: false } }, { $set: { description } });
        if (!result.matchedCount)
            throw new NeedRevisionUnavailable();
        return {};
    }
    async resolve({ owner, need }: {
        owner: string;
        need: string;
    }): Promise<Record<string, never>> {
        if (!(await this.needs.updateOne({ _id: need, owner }, { $set: { active: false } })).matchedCount)
            throw new NeedResolutionUnavailable();
        return {};
    }
    async reopen({ owner, need }: {
        owner: string;
        need: string;
    }): Promise<Record<string, never>> {
        if (!(await this.needs.updateOne({ _id: need, owner }, { $set: { active: true } })).matchedCount)
            throw new NeedReopenUnavailable();
        return {};
    }
    async delete({ owner, need }: {
        owner: string;
        need: string;
    }): Promise<Record<string, never>> {
        await this.needs.deleteOne({ _id: need, owner });
        return {};
    }
    async _get({ owner, need }: {
        owner: string;
        need: string;
    }): Promise<{
        description: string;
    }[]> {
        const row = await this.needs.findOne({ _id: need, owner });
        return row ? [{ description: row.description }] : [];
    }
    async _record({ owner, need }: {
        owner: string;
        need: string;
    }): Promise<{
        description: string;
        active: boolean;
    }[]> {
        const row = await this.needs.findOne({ _id: need, owner });
        return row ? [{ description: row.description, active: row.active !== false }] : [];
    }
    async _list({ owner }: {
        owner: string;
    }): Promise<{
        need: string;
        description: string;
        active: boolean;
    }[]> {
        const rows = await this.needs.find({ owner }).toArray();
        rows.sort((a, b) => (a.createdAt ? b.createdAt ? b.createdAt.getTime() - a.createdAt.getTime() : -1 : b.createdAt ? 1 : 0) || a._id.localeCompare(b._id));
        return rows.map(row => ({ need: row._id, description: row.description, active: row.active !== false }));
    }
    async _active({ owner }: {
        owner: string;
    }): Promise<{
        need: string;
        description: string;
    }[]> {
        return (await this._list({ owner })).filter(row => row.active).map(({ need, description }) => ({ need, description }));
    }
}
