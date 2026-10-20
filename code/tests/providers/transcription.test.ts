import { expect, test } from "bun:test";
import { InvalidAudio, OpenAITranscriber, TranscriptionUnavailable, validateAudio } from "../../src/concepts/Remembering/transcription.ts";
test("voice input validates encoding, MIME and bounded size before provider work", () => {
    expect(validateAudio("AQID", "audio/webm")).toEqual(new Uint8Array([1, 2, 3]));
    for (const [audio, mime] of [["", "audio/webm"], ["AQI=\n", "audio/webm"], ["AQI=", "audio/ogg"], ["AR==", "audio/webm"]])
        expect(() => validateAudio(audio!, mime!)).toThrow(InvalidAudio);
    expect(() => validateAudio(Buffer.alloc(4 * 1024 * 1024 + 1).toString("base64"), "audio/webm")).toThrow(InvalidAudio);
});
test("transcription sends only recording and model and returns an editable transcript without retries", async () => {
    let calls = 0;
    const provider = new OpenAITranscriber({ apiKey: "test-key", model: "test-model", fetch: (async (url, init) => {
            calls++;
            expect(url).toBe("https://api.openai.com/v1/audio/transcriptions");
            expect(init?.redirect).toBe("error");
            const body = init?.body as FormData;
            expect([...body.keys()].sort()).toEqual(["file", "model", "response_format"]);
            expect(body.get("model")).toBe("test-model");
            return Response.json({ text: "Met Mira." });
        }) as typeof fetch });
    expect(await provider.transcribe(new Uint8Array([1, 2, 3]), "audio/webm")).toBe("Met Mira.");
    expect(calls).toBe(1);
    const failed = new OpenAITranscriber({ apiKey: "secret", fetch: (async () => {
            calls++;
            return new Response("private error", { status: 503 });
        }) as unknown as typeof fetch });
    await expect(failed.transcribe(new Uint8Array([1]), "audio/mp4")).rejects.toThrow(TranscriptionUnavailable);
    expect(calls).toBe(2);
});
