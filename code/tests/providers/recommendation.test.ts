import { expect, test } from "bun:test";
import { OpenAIRecommendationPolicy, RecommendationUnavailable, serializedPolicyInput } from "../../src/concepts/Connecting/recommendation-policy.ts";
const input = { description: "research", target: "candidate", reason: "Supported", gaps: ["Availability unknown"], exclusions: [{ target: "excluded", explanation: "private preference" }] };
function answer(value: unknown) { return Response.json({ status: "completed", output: [{ type: "message", content: [{ type: "output_text", text: JSON.stringify(value) }] }] }); }
test("recommendation request is stateless, strict, bounded, and contains only supplied owner context", async () => {
    let sent: any;
    const provider = new OpenAIRecommendationPolicy({ apiKey: "test-key", model: "test-model", fetch: (async (_url: RequestInfo | URL, init?: RequestInit) => { sent = JSON.parse(init!.body as string); return answer({ recommend: false }); }) as unknown as typeof fetch });
    expect(await provider.recommend(input)).toBe(false);
    expect(sent.store).toBe(false);
    expect(sent).not.toHaveProperty("previous_response_id");
    expect(JSON.parse(sent.input[0].content)).toEqual(input);
    expect(sent.text.format).toMatchObject({ type: "json_schema", strict: true, schema: { additionalProperties: false, required: ["recommend"] } });
    const oversized = { ...input, exclusions: Array.from({ length: 200 }, (_, i) => ({ target: String(i), explanation: "x".repeat(1000) })) };
    expect(() => serializedPolicyInput(oversized)).toThrow(RecommendationUnavailable);
    sent = undefined;
    await expect(provider.recommend(oversized)).rejects.toThrow(RecommendationUnavailable);
    expect(sent).toBeUndefined();
});
test("recommendation refusal, malformed output and provider failures fail safely without retry", async () => {
    for (const response of [() => answer({ recommend: true, extra: 1 }), () => answer({ recommend: "true" }), () => Response.json({ status: "incomplete", output: [] }), () => Response.json({ status: "completed", output: [{ type: "message", content: [{ type: "refusal" }] }] }), () => new Response("private-key", { status: 500 }), () => { throw new Error("private preference test-key"); }]) {
        let calls = 0;
        const provider = new OpenAIRecommendationPolicy({ apiKey: "test-key", model: "test-model", fetch: (async () => { calls++; return response(); }) as unknown as typeof fetch });
        await expect(provider.recommend(input)).rejects.toThrow("Recommendations are unavailable. Your saved search and preferences are kept.");
        expect(calls).toBe(1);
    }
});
