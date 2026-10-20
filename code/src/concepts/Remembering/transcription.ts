export interface Transcriber {
    transcribe(audio: Uint8Array, mediaType: string): Promise<string>;
}
export class InvalidAudio extends Error {
}
export class TranscriptionUnavailable extends Error {
    constructor() {
        super("Voice transcription is unavailable.");
    }
}
const formats: Record<string, string> = { "audio/webm": "webm", "audio/mp4": "mp4", "audio/mpeg": "mp3", "audio/wav": "wav", "audio/x-wav": "wav" };
export function validateAudio(audio: string, mediaType: string): Uint8Array {
    if (!formats[mediaType] || typeof audio !== "string" || !audio || audio.length > 5592408 || !/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/u.test(audio))
        throw new InvalidAudio();
    const bytes = Buffer.from(audio, "base64");
    if (!bytes.length || bytes.length > 4 * 1024 * 1024 || bytes.toString("base64") !== audio)
        throw new InvalidAudio();
    return bytes;
}
export class OpenAITranscriber implements Transcriber {
    constructor(private readonly options: {
        apiKey: string;
        model?: string;
        fetch?: typeof globalThis.fetch;
        timeout?: number;
    }) {
    }
    async transcribe(audio: Uint8Array, mediaType: string): Promise<string> {
        try {
            if (!this.options.apiKey.trim())
                throw new TranscriptionUnavailable();
            const body = new FormData();
            body.set("file", new Blob([new Uint8Array(audio)], { type: mediaType }), `recording.${formats[mediaType]}`);
            body.set("model", this.options.model ?? "gpt-transcribe");
            body.set("response_format", "json");
            const response = await (this.options.fetch ?? globalThis.fetch)("https://api.openai.com/v1/audio/transcriptions", { method: "POST", headers: { Authorization: `Bearer ${this.options.apiKey}` }, body, redirect: "error", signal: AbortSignal.timeout(this.options.timeout ?? 30000) });
            if (!response.ok)
                throw new TranscriptionUnavailable();
            const data = await response.json() as {
                text?: unknown;
            };
            if (typeof data.text !== "string" || !data.text.trim() || data.text.length > 20000)
                throw new TranscriptionUnavailable();
            return data.text;
        }
        catch {
            throw new TranscriptionUnavailable();
        }
    }
}
export function configuredTranscriber(env: Record<string, string | undefined> = process.env): Transcriber | undefined {
    return env.OPENAI_API_KEY ? new OpenAITranscriber({ apiKey: env.OPENAI_API_KEY, model: env.OPENAI_TRANSCRIBE_MODEL }) : undefined;
}
