import { httpWire } from "@mit-sdg/sync-engine-http/tooling";
import { MongoClient } from "mongodb";
import { assembleApplication } from "./src/assembly.ts";
import { MemoryProvider } from "./src/concepts/Federating/provider.ts";
import { circleHttpPolicy } from "./src/host/http.ts";

// Tools inspect the assembly without connecting to MongoDB or contacting Commons.
const database = new MongoClient("mongodb://localhost").db("circle");

export default {
  assemble: () => assembleApplication(database, { commons: new MemoryProvider() }),
  title: "Circle",
  wireName: "CircleWire",
  design: {
    version: 1,
    documents: [
      new URL("./design/types.md", import.meta.url),
      new URL("./design/compositions/Circle.md", import.meta.url),
      new URL("./design/compositions/reusable/accounts.md", import.meta.url),
      new URL("./design/compositions/reusable/commons.md", import.meta.url),
    ],
  },
  projections: [httpWire({ policy: circleHttpPolicy("http://localhost:3000"), name: "CircleWireHttp" })],
};
