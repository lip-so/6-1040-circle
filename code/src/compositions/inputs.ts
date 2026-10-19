import type { EndpointValidator } from "@mit-sdg/sync-engine/boundary";

function sessionFields(value: unknown, fields: string[]): value is Record<string, unknown> {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return false;
  const input = value as Record<string, unknown>;
  return Object.keys(input).length === fields.length + 1 && Object.hasOwn(input, "session") &&
    (input.session === null || typeof input.session === "string") &&
    fields.every(field => Object.hasOwn(input, field) && typeof input[field] === "string");
}

export const rememberInput: EndpointValidator = value => ({ ok:
  sessionFields(value, ["content", "submission"]) &&
  /^[\da-f]{8}-[\da-f]{4}-4[\da-f]{3}-[89ab][\da-f]{3}-[\da-f]{12}$/iu.test(value.submission as string),
});

export const memoryListInput: EndpointValidator = value => ({ ok:
  sessionFields(value, ["after"]) && (value.after === "" || /^[\da-f-]{1,64}$/iu.test(value.after as string)),
});

/** Reject owner/source claims; ownership always comes from the session. */
export function sessionTextInput(field: "content" | "description"): EndpointValidator {
  return (value) => {
    if (typeof value !== "object" || value === null || Array.isArray(value)) return { ok: false };
    const input = value as Record<string, unknown>;
    const ok = Object.keys(input).length === 2 &&
      Object.hasOwn(input, "session") && Object.hasOwn(input, field) &&
      (typeof input.session === "string" || input.session === null) &&
      typeof input[field] === "string";
    return ok ? { ok: true } : { ok: false, detail: `expected ${field} and a session` };
  };
}
