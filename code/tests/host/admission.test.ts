import { expect, test } from "bun:test";
import { serializeApi } from "../../src/host/admission.ts";
test("API admission waits for accepted work after an early failure and recovers the queue", async () => {
    let settle!: () => void;
    const accepted = new Promise<void>(r => settle = r);
    let count = 0;
    const handle = serializeApi(async () => {
        count++;
        if (count === 1)
            throw new Error("early failure");
        return new Response("ok");
    }, () => count === 1 ? accepted : Promise.resolve());
    const first = handle(new Request("http://localhost/"));
    const second = handle(new Request("http://localhost/"));
    await Promise.resolve();
    await Promise.resolve();
    expect(count).toBe(1);
    settle();
    await expect(first).rejects.toThrow("early failure");
    expect((await second).status).toBe(200);
    expect(count).toBe(2);
});
