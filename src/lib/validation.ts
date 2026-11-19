// Small helpers shared by every form's rules (booking, contact, newsletter).
// Plain TypeScript: runs the same in the browser and on the server.

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isEmail(value: string) {
  return value.length <= 254 && EMAIL.test(value);
}

/**
 * Turns ANY incoming value into a safe, trimmed string of limited length.
 * The server can't trust what it receives — a Server Action can be called
 * directly by anyone, with anything — so we never store input as-is.
 */
export function cleanText(value: unknown, maxLength = 2000): string {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

/** Reads a plain object safely (anything else becomes an empty object). */
export function asRecord(value: unknown): Record<string, unknown> {
  return value !== null && typeof value === "object" ? (value as Record<string, unknown>) : {};
}