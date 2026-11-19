// Reading data for the admin panel. Server-only, and every function here is
// only ever called AFTER requireAdmin() has checked who's asking.
// Nothing is cached ("use cache" is NOT used): Harris must always see the
// latest bookings the moment he opens the page.
import "server-only";
import type { DocumentData, Timestamp } from "firebase-admin/firestore";
import { db } from "@/lib/firebase/admin";
import type { InboxItem, Subscriber } from "./types";

const LIMIT = 300; // plenty for a boutique; we can add "load more" later

function iso(value: unknown): string | null {
  return value && typeof (value as Timestamp).toDate === "function" ? (value as Timestamp).toDate().toISOString() : null;
}

const str = (v: unknown) => (typeof v === "string" ? v : "");

/** "2027-03-12" → "Fri 12 Mar 2027" — same result on any server, any country. */
function day(isoDate: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(isoDate)) return isoDate;
  return new Date(`${isoDate}T00:00:00Z`).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

function toBooking(id: string, d: DocumentData): InboxItem {
  const name = `${str(d.firstName)} ${str(d.lastName)}`.trim() || "(no name)";
  return {
    id,
    status: str(d.status) || "new",
    createdAt: iso(d.createdAt),
    name,
    email: str(d.email),
    phone: str(d.phone),
    headline: [str(d.occasion), str(d.format)].filter(Boolean).join(" · "),
    preview: str(d.about) || str(d.notes),
    when: [d.date ? day(str(d.date)) : "", str(d.time)].filter(Boolean).join(" · "),
    details: [
      { label: "Occasion", value: str(d.occasion) },
      { label: "About the occasion", value: str(d.about) },
      { label: "Date of the occasion", value: d.occasionDate ? day(str(d.occasionDate)) : "" },
      { label: "Style", value: str(d.style) },
      { label: "Loves wearing", value: str(d.love) },
      { label: "Appointment", value: str(d.format) },
      { label: "Preferred date", value: d.date ? day(str(d.date)) : "" },
      { label: "Preferred time", value: str(d.time) },
      { label: "Notes", value: str(d.notes) },
    ].filter((row) => row.value),
  };
}

function toMessage(id: string, d: DocumentData): InboxItem {
  return {
    id,
    status: str(d.status) || "new",
    createdAt: iso(d.createdAt),
    name: str(d.name) || "(no name)",
    email: str(d.email),
    phone: str(d.phone),
    headline: str(d.topic),
    preview: str(d.message),
    details: [
      { label: "Topic", value: str(d.topic) },
      { label: "Message", value: str(d.message) },
    ].filter((row) => row.value),
  };
}

export async function listBookings(): Promise<InboxItem[]> {
  const snap = await db().collection("bookings").orderBy("createdAt", "desc").limit(LIMIT).get();
  return snap.docs.map((doc) => toBooking(doc.id, doc.data()));
}

export async function listMessages(): Promise<InboxItem[]> {
  const snap = await db().collection("messages").orderBy("createdAt", "desc").limit(LIMIT).get();
  return snap.docs.map((doc) => toMessage(doc.id, doc.data()));
}

export async function listSubscribers(): Promise<Subscriber[]> {
  const snap = await db().collection("subscribers").orderBy("subscribedAt", "desc").limit(2000).get();
  return snap.docs.map((doc) => ({ id: doc.id, email: str(doc.data().email), subscribedAt: iso(doc.data().subscribedAt) }));
}

/** Everything the dashboard needs, fetched in parallel. */
export async function getDashboard() {
  const [bookings, messages, subscriberCount, workCount] = await Promise.all([
    listBookings(),
    listMessages(),
    // count() asks Firestore for just the number — it doesn't download the documents
    db().collection("subscribers").count().get().then((r) => r.data().count),
    db().collection("works").count().get().then((r) => r.data().count),
  ]);

  const today = new Date().toISOString().slice(0, 10);
  const upcoming = (await db().collection("bookings").where("date", ">=", today).orderBy("date").limit(30).get()).docs
    .map((doc) => ({ ...toBooking(doc.id, doc.data()), date: str(doc.data().date) }))
    .filter((b) => b.status === "new" || b.status === "confirmed")
    .slice(0, 5);

  return {
    newBookings: bookings.filter((b) => b.status === "new").length,
    newMessages: messages.filter((m) => m.status === "new").length,
    subscriberCount,
    workCount,
    upcoming,
    latestMessages: messages.slice(0, 4),
  };
}