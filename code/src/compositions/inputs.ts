import type { EndpointValidator } from "@mit-sdg/sync-engine/boundary";
function sessionFields(value: unknown, fields: string[]): value is Record<string, unknown> {
    if (typeof value !== "object" || value === null || Array.isArray(value))
        return false;
    const input = value as Record<string, unknown>;
    return Object.keys(input).length === fields.length + 1 && Object.hasOwn(input, "session") &&
        (input.session === null || typeof input.session === "string") &&
        fields.every(field => Object.hasOwn(input, field) && typeof input[field] === "string");
}
export const rememberInput: EndpointValidator = value => ({ ok: sessionFields(value, ["content", "submission"]) && (value.content as string).length <= 20000 &&
        /^[\da-f]{8}-[\da-f]{4}-4[\da-f]{3}-[89ab][\da-f]{3}-[\da-f]{12}$/iu.test(value.submission as string),
});
export const memoryListInput: EndpointValidator = value => ({ ok: sessionFields(value, ["after"]) && (value.after === "" || /^[\da-f-]{1,64}$/iu.test(value.after as string)),
});
/** Reject owner/source claims; ownership always comes from the session. */
export function sessionTextInput(field: "content" | "description"): EndpointValidator {
    return (value) => {
        if (typeof value !== "object" || value === null || Array.isArray(value))
            return { ok: false };
        const input = value as Record<string, unknown>;
        const ok = Object.keys(input).length === 2 &&
            Object.hasOwn(input, "session") && Object.hasOwn(input, field) &&
            (typeof input.session === "string" || input.session === null) &&
            typeof input[field] === "string" && input[field].length <= 20000;
        return ok ? { ok: true } : { ok: false, detail: `expected ${field} and a session` };
    };
}
export function protectedInput(fields: string[]): EndpointValidator {
    return value => ({ ok: sessionFields(value, fields) && fields.every(field => {
            const text = (value as Record<string, string>)[field]!;
            if (["memory", "need", "claim", "connection"].includes(field))
                return /^(?:[\da-f]{64}|[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12})$/iu.test(text);
            return text.length <= (field === "audio" ? 5592408 : field === "mediaType" ? 100 : field === "explanation" ? 1000 : 20000);
        }) });
}
