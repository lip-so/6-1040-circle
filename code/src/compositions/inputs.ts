import type { EndpointValidator } from "@mit-sdg/sync-engine/boundary";

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
