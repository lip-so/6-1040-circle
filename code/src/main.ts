import { resolve } from "node:path";
import { createGateway } from "@mit-sdg/sync-engine/boundary";
import { createHttpHandler } from "@mit-sdg/sync-engine-http/handler";
import type { CircleWire } from "../generated/wire.ts";
import { assembleApplication } from "./assembly.ts";
import { client, db } from "./db.ts";
import { circleHttpPolicy } from "./host/http.ts";
import { serializeApi } from "./host/admission.ts";
import { configuredTranscriber } from "./concepts/Remembering/transcription.ts";
import { configuredExtractor } from "./concepts/Graphing/openai-extractor.ts";
import { configuredRecommendationPolicy } from "./concepts/Connecting/recommendation-policy.ts";
const site = resolve(import.meta.dir, "../frontend/dist");
const port = Number(process.env.PORT ?? 3000);
const publicOrigin = process.env.PUBLIC_ORIGIN ?? `http://localhost:${port}`;
const extractor = configuredExtractor();
await client.connect();
await db.command({ ping: 1 });
const application = assembleApplication(db, { extractor, transcriber: configuredTranscriber(), recommendationPolicy: configuredRecommendationPolicy() });
const gateway = createGateway<CircleWire>({ application });
const handleApi = serializeApi(createHttpHandler({
    application,
    gateway,
    policy: circleHttpPolicy(publicOrigin),
    responseHeaders: { "Referrer-Policy": "no-referrer" },
}), () => application.whenIdle());
const server = Bun.serve({
    hostname: process.env.HOST ?? "0.0.0.0",
    port,
    async fetch(request) {
        const { pathname } = new URL(request.url);
        if (pathname.startsWith("/api/"))
            return handleApi(request);
        if (pathname === "/health") {
            try {
                await db.command({ ping: 1 }, { timeoutMS: 2000 });
                return new Response("ok");
            }
            catch {
                return new Response("database unavailable", { status: 503 });
            }
        }
        const headers = { "Referrer-Policy": "no-referrer", "Cache-Control": "no-store" };
        if (request.method !== "GET")
            return new Response("Method not allowed", { status: 405, headers });
        if (pathname === "/" || pathname === "/auth/commons/callback") {
            const page = Bun.file(resolve(site, "index.html"));
            if (await page.exists())
                return new Response(page, { headers });
            return new Response("Build Circle before starting it: bun run build", { status: 503, headers });
        }
        const path = resolve(site, pathname.slice(1));
        if (path.startsWith(site + "/")) {
            const asset = Bun.file(path);
            if (await asset.exists())
                return new Response(asset, { headers: {
                        ...headers, "Cache-Control": "public, max-age=31536000, immutable",
                    } });
        }
        return new Response("Not found", { status: 404, headers });
    },
});
console.log(`Circle API listening on ${server.url} for ${publicOrigin}`);
async function stop() {
    await server.stop();
    await application.beginDrain();
    await client.close();
    process.exit(0);
}
process.once("SIGINT", stop);
process.once("SIGTERM", stop);
