import { createHttpClient } from "@mit-sdg/sync-engine-http/client";
import type { CircleWireHttp } from "../../../generated/wire.ts";

export const api = createHttpClient<CircleWireHttp>({ baseUrl: "/api" });
