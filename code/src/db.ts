import { MongoClient } from "mongodb";

const url = process.env.MONGODB_URL;
if (!url) {
  throw new Error("Set MONGODB_URL in .env before running the backend.");
}

export const client = new MongoClient(url, { maxPoolSize: 5, serverSelectionTimeoutMS: 5_000 });
export const db = client.db();
