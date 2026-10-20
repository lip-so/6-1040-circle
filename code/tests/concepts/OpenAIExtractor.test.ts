import { describe, expect, test } from "bun:test";
import { ExtractionUnavailable, OpenAIEncounterExtractor } from "../../src/concepts/Graphing/openai-extractor.ts";

function standIn(answer: (init: RequestInit) => Response | Promise<Response>) {
  const calls: { address: string; init: RequestInit }[] = [];
  const request = (async (address: string | URL | Request, init: RequestInit) => {
    calls.push({ address: String(address), init });
    return answer(init);
  }) as typeof fetch;
  const extractor = new OpenAIEncounterExtractor({ apiKey: "test-only-key", model: "test-model", timeout: 20, fetch: request });
  return { extractor, calls };
}
const empty = { entities: [], claims: [] };
function completed(value: unknown = empty) {
  return Response.json({ status: "completed", output: [{ type: "message", content: [{ type: "output_text", text: JSON.stringify(value) }] }] });
}

describe("OpenAI encounter extraction", () => {
  test("sends only the supplied note to the fixed server API with a strict schema and storage disabled", async () => {
    const { extractor, calls } = standIn(() => completed());
    expect(await extractor.extract("Met Mira.")).toEqual(empty);
    expect(calls).toHaveLength(1);
    expect(calls[0]!.address).toBe("https://api.openai.com/v1/responses");
    const request = calls[0]!.init;
    expect(request).toMatchObject({ method: "POST", redirect: "error", headers: { Authorization: "Bearer test-only-key" } });
    expect(JSON.parse(request.body as string)).toMatchObject({
      model: "test-model", store: false, input: [{ role: "user", content: "Met Mira." }],
      text: { format: { type: "json_schema", strict: true, schema: { additionalProperties: false } } },
    });
  });

  test("refuses HTTP errors, incomplete/refused/malformed answers, without retrying or exposing provider details", async () => {
    for (const answer of [
      () => new Response("private note and test-only-key", { status: 429 }),
      () => new Response("not json"),
      () => Response.json({ status: "incomplete", output: [] }),
      () => Response.json({ status: "completed", output: [{ type: "message", content: [{ type: "refusal", refusal: "private text" }] }] }),
      () => Response.json({ status: "completed", output: [] }),
      () => Response.json({ status: "completed", output: [{ type: "message", content: [{ type: "output_text", text: "invalid json" }] }] }),
      () => { throw new Error("test-only-key private note"); },
    ]) {
      const { extractor, calls } = standIn(answer);
      const error = await extractor.extract("private note").catch(error => error);
      expect(error).toBeInstanceOf(ExtractionUnavailable);
      expect(String(error)).not.toContain("test-only-key");
      expect(String(error)).not.toContain("private note");
      expect(calls).toHaveLength(1);
    }
  });

  test("aborts a stalled provider and refuses oversized input before sending it", async () => {
    const { extractor, calls } = standIn(init => new Promise((_, reject) => {
      init.signal!.addEventListener("abort", () => reject(new Error("aborted")), { once: true });
    }));
    await expect(extractor.extract("Met Mira.")).rejects.toThrow(ExtractionUnavailable);
    expect(calls).toHaveLength(1);
    calls.length = 0;
    await expect(extractor.extract("x".repeat(20_001))).rejects.toThrow(ExtractionUnavailable);
    expect(calls).toHaveLength(0);
  });

});
