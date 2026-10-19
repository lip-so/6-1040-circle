import { MongoClient, type Db } from "mongodb";

const url = process.env.TEST_MONGODB_URL;
if (!url) throw new Error("Set TEST_MONGODB_URL in .env to run the MongoDB tests.");
let client = new MongoClient(url, { serverSelectionTimeoutMS: 3_000 });
let connection: Promise<MongoClient> | undefined;
const databases: Db[] = [];

/** Each test gets its own temporary database on the existing local MongoDB. */
export async function testDatabase(): Promise<Db> {
  connection ??= client.connect();
  await connection;
  const database = client.db(`circle_auth_test_${crypto.randomUUID().replaceAll("-", "")}`);
  databases.push(database);
  return database;
}

export async function cleanupDatabases() {
  try {
    if (connection) {
      await connection;
      for (const database of databases.splice(0)) await database.dropDatabase();
    }
  } finally {
    await client.close();
    client = new MongoClient(url!, { serverSelectionTimeoutMS: 3_000 });
    connection = undefined;
  }
}
