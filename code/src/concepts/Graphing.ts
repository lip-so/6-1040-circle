import { createHash } from "node:crypto";
import { MongoServerError, type Collection, type Db } from "mongodb";
import { unavailableBrain, validateCard, validateSelection, type BrainProvider, type ContactCard, type Match } from "../providers/brain-provider.ts";
interface SourceRecord { _id: string; owner: string; withdrawn?: true; digest?: string; providerVersion?: string; sourceRevision?: number; card?: ContactCard }
interface Selection extends Match { digest: string; providerVersion: string; cardHash: string }
interface Recall { _id: string; owner: string; corpusDigest: string; selection: Selection[] }
export class EmptySourceContent extends Error {}
export class SourceNotOwned extends Error {}
export class SourceWithdrawn extends Error {}
export class EmptyQuery extends Error {}
export class MemoryLimit extends Error {}
export class MemoryChanged extends Error {}
const sourceDigest = (content: string, referenceDate = "") => referenceDate ? hash([content, referenceDate]) : hash(content);
const hash = (value: unknown) => createHash("sha256").update(JSON.stringify(value)).digest("hex");
export class GraphingConcept {
  private readonly sources: Collection<SourceRecord>;
  private readonly recalls: Collection<Recall>;
  constructor(db: Db, private readonly brain: BrainProvider = unavailableBrain) {
    this.sources = db.collection<SourceRecord>("graphing.sources");
    this.recalls = db.collection<Recall>("graphing.recalls");
  }
  async ingest({ owner, source, content, referenceDate = "", revision = 0 }: { owner: string; source: string; content: string; referenceDate?: string; revision?: number }): Promise<Record<string, never>> {
    if (!content.trim()) throw new EmptySourceContent("Source content must not be blank.");
    try { await this.sources.updateOne({ _id: source, owner }, { $setOnInsert: { owner } }, { upsert: true }); }
    catch (error) {
      if (error instanceof MongoServerError && error.code === 11000) throw new SourceNotOwned("The source belongs to another user.");
      throw error;
    }
    const digest = sourceDigest(content, referenceDate), providerVersion = this.brain.version;
    const current = await this.sources.findOne({ _id: source, owner });
    if (current?.withdrawn) throw new SourceWithdrawn("The source was withdrawn.");
    if ((current?.sourceRevision ?? 0) > revision) throw new MemoryChanged("The encounter changed. Reload it.");
    const cached = current?.card && current.digest === digest && current.providerVersion === providerVersion;
    if (cached) {
      const advanced = await this.sources.updateOne({ _id: source, owner, withdrawn: { $ne: true }, digest, providerVersion, $or: [{ sourceRevision: { $lte: revision } }, { sourceRevision: { $exists: false } }] }, { $set: { sourceRevision: revision } });
      if (advanced.matchedCount) return {};
      throw new MemoryChanged("The encounter changed. Reload it.");
    }
    const card = validateCard(await this.brain.extract(content, { referenceDate }), content, referenceDate);
    // Reserve ownership first; compare revisions again after inference. Deletion/new edits win.
    await this.sources.replaceOne({ _id: source, owner, withdrawn: { $ne: true }, $and: [
      { $or: [{ sourceRevision: { $lte: revision } }, { sourceRevision: { $exists: false } }] },
      { $or: [{ digest: { $ne: digest } }, { providerVersion: { $ne: providerVersion } }, { card: { $exists: false } }, { sourceRevision: { $lt: revision } }] },
    ] }, { owner, digest, providerVersion, sourceRevision: revision, card });
    const after = await this.sources.findOne({ _id: source, owner });
    if (after?.withdrawn) throw new SourceWithdrawn("The source was withdrawn.");
    if (!after || after.digest !== digest || after.providerVersion !== providerVersion || (after.sourceRevision ?? 0) > revision) throw new MemoryChanged("The encounter changed. Reload it.");
    return {};
  }
  async recall({ owner, description, notes }: { owner: string; description: string; notes: string }): Promise<{ recall: string }> {
    if (!description.trim()) throw new EmptyQuery("Describe the search first.");
    const limit = () => { throw new MemoryLimit("Contact memory exceeds the supported search limit."); };
    if (Buffer.byteLength(notes) > 256 * 1024) return limit();
    let originals: { source: string; content: string; referenceDate?: string; revision?: number }[];
    try {
      const parsed = JSON.parse(notes);
      if (!Array.isArray(parsed) || parsed.length > 256 || parsed.some(row => !row || Object.keys(row).some(key => !["content", "source", "referenceDate", "revision"].includes(key)) || typeof row.source !== "string" || typeof row.content !== "string" || !row.content.trim() || (row.referenceDate !== undefined && typeof row.referenceDate !== "string") || (row.revision !== undefined && (!Number.isSafeInteger(row.revision) || row.revision < 0))) || new Set(parsed.map(row => row.source)).size !== parsed.length) return limit();
      originals = parsed.sort((a, b) => a.source.localeCompare(b.source, "en"));
    } catch { return limit(); }
    for (const note of originals) {
      try { await this.ingest({ owner, ...note }); }
      catch (error) { if (!(error instanceof SourceWithdrawn)) throw error; }
    }
    const owned = originals.length ? await this.sources.find({ owner, _id: { $in: originals.map(row => row.source) }, withdrawn: { $ne: true } }).toArray() : [];
    const records = originals.flatMap(note => {
      const record = owned.find(row => row._id === note.source);
      return record?.card && record.digest === sourceDigest(note.content, note.referenceDate) && record.providerVersion === this.brain.version ? [record as Required<Pick<SourceRecord, "_id" | "digest" | "providerVersion" | "card" | "sourceRevision">>] : [];
    });
    const memory = records.map(row => ({ source: row._id, card: row.card }));
    if (Buffer.byteLength(JSON.stringify(memory)) > 256 * 1024) throw new MemoryChanged("Structured contact memory exceeds the search limit.");
    const corpusDigest = hash(records.map(row => [row._id, row.digest, row.providerVersion, row.sourceRevision ?? 0, row.card]));
    const recall = hash([owner, description.trim().replace(/\s+/gu, " ").toLocaleLowerCase("en"), corpusDigest, this.brain.version]);
    if (await this.recalls.findOne({ _id: recall, owner })) return { recall };
    const matches = memory.length ? validateSelection(await this.brain.select(description, memory), memory, description) : [];
    const selection = matches.map(match => {
      const row = records.find(record => record._id === match.source)!;
      return { ...match, digest: row.digest, providerVersion: row.providerVersion, cardHash: hash(row.card) };
    });
    for (const row of records) {
      const current = await this.sources.findOne({ _id: row._id, owner, withdrawn: { $ne: true }, digest: row.digest, providerVersion: row.providerVersion });
      if (!current || hash(current.card) !== hash(row.card)) throw new MemoryChanged("Contact memory changed. Search again.");
    }
    await this.recalls.updateOne({ _id: recall, owner }, { $setOnInsert: { owner, corpusDigest, selection } }, { upsert: true });
    return { recall };
  }
  async withdraw({ owner, source }: { owner: string; source: string }): Promise<Record<string, never>> {
    try { await this.sources.replaceOne({ _id: source, owner }, { owner, withdrawn: true }, { upsert: true }); }
    catch (error) {
      if (error instanceof MongoServerError && error.code === 11000) throw new SourceNotOwned("The source belongs to another user.");
      throw error;
    }
    await this.recalls.deleteMany({ owner });
    return {};
  }
  async _card({ owner, source, content, referenceDate = "", revision = 0 }: { owner: string; source: string; content: string; referenceDate?: string; revision?: number }): Promise<{ card: ContactCard | null }> {
    const row = await this.sources.findOne({ _id: source, owner, withdrawn: { $ne: true } });
    const current = row?.digest === sourceDigest(content, referenceDate) && (row.sourceRevision ?? 0) === revision;
    const compatible = revision === 0 && row?.sourceRevision === undefined && /^contact-v[12]:/u.test(row?.providerVersion ?? "") && row?.digest === hash(content);
    return { card: (current || compatible) ? row?.card ?? null : null };
  }
  async _matches({ owner, recall }: { owner: string; recall: string }): Promise<{ target: string; label: string; source: string; reason: string; card: ContactCard }[]> {
    const saved = await this.recalls.findOne({ _id: recall, owner });
    if (!saved?.selection.length) return [];
    const records = await this.sources.find({ owner, _id: { $in: saved.selection.map(row => row.source) }, withdrawn: { $ne: true } }).toArray();
    return saved.selection.flatMap(match => {
      const row = records.find(row => row._id === match.source && row.digest === match.digest && row.providerVersion === match.providerVersion && row.card && hash(row.card) === match.cardHash);
      if (!row?.card) return [];
      return [{ target: row._id, label: row.card.name ?? "Unnamed encounter", source: row._id, card: row.card,
        reason: match.facts.length ? match.facts.map(i => { const fact = row.card!.facts[i]!; return `${fact.basis === "inferred" ? "May be relevant: " : ""}${fact.value}`; }).join(" · ") : "Name match" }];
    });
  }
}
