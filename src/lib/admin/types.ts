// Shapes shared by the admin pages (server) and admin components (browser).
// No secrets and no Firebase here — just types and labels.

export const bookingStatuses = [
  { id: "new", label: "New" },
  { id: "confirmed", label: "Confirmed" },
  { id: "completed", label: "Completed" },
  { id: "cancelled", label: "Cancelled" },
] as const;

export const messageStatuses = [
  { id: "new", label: "New" },
  { id: "replied", label: "Replied" },
  { id: "archived", label: "Archived" },
] as const;

export type InboxKind = "bookings" | "messages";

/** One booking OR message, already turned into display-ready text. */
export type InboxItem = {
  id: string;
  status: string;
  createdAt: string | null; // ISO date-time; shown in Harris's own time zone
  name: string;
  email: string;
  phone: string;
  headline: string; // e.g. "A Wedding · Studio Fitting"
  preview: string; // short text for the list
  when?: string; // bookings only: "Fri 12 Mar 2027 · 14:00"
  details: { label: string; value: string }[];
};

export type Subscriber = { id: string; email: string; subscribedAt: string | null };

export type ActionResult = { ok: true } | { ok: false; error: string };