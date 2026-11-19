"use server";

// SERVER ACTIONS — functions that run ONLY on the server, but that our
// client components can call like normal async functions:
//     const result = await submitBooking(data);
// Next.js turns that call into a secure request behind the scenes.
//
// ⚠️ Anyone on the internet can call these directly with ANY data, skipping
// our forms entirely. So every action: (1) cleans the input, (2) validates it
// with the SAME rules the form uses, and only then (3) saves it.

import { FieldValue } from "firebase-admin/firestore";
import { db, isFirebaseConfigured } from "@/lib/firebase/admin";
import { dayBefore, parseBooking, todayISO, validateAll } from "@/lib/booking";
import { parseContact, validateContact } from "@/lib/contact";
import { cleanText, isEmail } from "@/lib/validation";

export type ActionResult = { ok: true } | { ok: false; error: string };

const SOMETHING_WENT_WRONG =
  "Sorry, something went wrong sending this. Please try again in a moment, or message us on WhatsApp.";

/** Real visitors never fill the hidden "website" field. Bots usually do. */
function isBot(trap: unknown) {
  return typeof trap === "string" && trap.trim() !== "";
}

function logProblem(action: string, error: unknown) {
  // Shows in the terminal / hosting logs — never sent to the visitor.
  console.error(`[${action}]`, isFirebaseConfigured ? error : "Firebase is not configured — see .env.example");
}

// ---------------------------------------------------------------------------

export async function submitBooking(input: unknown, trap?: unknown): Promise<ActionResult> {
  if (isBot(trap)) return { ok: true }; // pretend it worked, save nothing

  const booking = parseBooking(input);
  // The server's clock is in UTC, which can be a day ahead of the visitor,
  // so we accept "yesterday" too. The form itself still blocks past dates.
  const problem = validateAll(booking, dayBefore(todayISO()));
  if (problem) return { ok: false, error: problem };

  try {
    await db()
      .collection("bookings")
      .add({
        ...booking,
        status: "new", // Harris can change this to "confirmed", "done"… in the console
        createdAt: FieldValue.serverTimestamp(), // Google's clock, not the visitor's
      });
    return { ok: true };
  } catch (error) {
    logProblem("submitBooking", error);
    return { ok: false, error: SOMETHING_WENT_WRONG };
  }
}

export async function submitContact(input: unknown, trap?: unknown): Promise<ActionResult> {
  if (isBot(trap)) return { ok: true };

  const message = parseContact(input);
  const problem = validateContact(message);
  if (problem) return { ok: false, error: problem };

  try {
    await db()
      .collection("messages")
      .add({ ...message, status: "new", createdAt: FieldValue.serverTimestamp() });
    return { ok: true };
  } catch (error) {
    logProblem("submitContact", error);
    return { ok: false, error: SOMETHING_WENT_WRONG };
  }
}

export async function subscribe(emailInput: unknown, trap?: unknown): Promise<ActionResult> {
  if (isBot(trap)) return { ok: true };

  const email = cleanText(emailInput, 254).toLowerCase();
  if (!isEmail(email)) return { ok: false, error: "Please enter a valid email address." };

  try {
    // Using the email itself as the document ID means each address can only
    // exist once. create() fails if it already exists — which is fine: the
    // person is already subscribed, so we still say "thank you".
    // ("/" isn't allowed in IDs, so it's swapped out just in case.)
    await db()
      .collection("subscribers")
      .doc(email.replaceAll("/", "_"))
      .create({ email, source: "website", subscribedAt: FieldValue.serverTimestamp() });
    return { ok: true };
  } catch (error) {
    // gRPC code 6 = ALREADY_EXISTS → already on the list
    if ((error as { code?: number }).code === 6) return { ok: true };
    logProblem("subscribe", error);
    return { ok: false, error: SOMETHING_WENT_WRONG };
  }
}