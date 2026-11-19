"use server";

// ADMIN SERVER ACTIONS. Every single one starts with requireAdmin():
// actions can be called directly by anyone on the internet, so "the button
// is only shown to Harris" is NOT protection. The check on the server is.

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { refresh } from "next/cache";
import { FieldValue } from "firebase-admin/firestore";
import { adminAuth, db } from "@/lib/firebase/admin";
import { getAdminSession, isAdminEmail, requireAdmin, SESSION_COOKIE, SESSION_DAYS } from "@/lib/admin/session";
import { bookingStatuses, messageStatuses, type ActionResult, type InboxKind } from "@/lib/admin/types";

const SAFE_ID = /^[A-Za-z0-9_.@+-]{1,200}$/; // Firestore IDs we create: random IDs and emails
const FAILED: ActionResult = { ok: false, error: "That didn't work. Please try again." };

// ---- Signing in and out ----------------------------------------------------

/**
 * Called by the login form AFTER Firebase has checked the password in the
 * browser. We check the result again here, then swap it for a secure cookie.
 */
export async function startSession(idToken: unknown): Promise<ActionResult> {
  if (typeof idToken !== "string" || idToken.length > 5000) return FAILED;

  try {
    const decoded = await adminAuth().verifyIdToken(idToken, true);

    if (!isAdminEmail(decoded.email)) {
      return { ok: false, error: "This account doesn't have access to the admin panel." };
    }
    // Only accept a sign-in that happened in the last 5 minutes
    if (Date.now() / 1000 - decoded.auth_time > 5 * 60) {
      return { ok: false, error: "Please sign in again." };
    }

    const expiresIn = SESSION_DAYS * 24 * 60 * 60 * 1000;
    const sessionCookie = await adminAuth().createSessionCookie(idToken, { expiresIn });

    (await cookies()).set(SESSION_COOKIE, sessionCookie, {
      httpOnly: true, // browser JavaScript can't read it → can't be stolen by a script
      secure: process.env.NODE_ENV === "production", // HTTPS only on the live site
      sameSite: "lax", // not sent when another website tries to post to ours
      path: "/",
      maxAge: expiresIn / 1000,
    });
    return { ok: true };
  } catch (error) {
    console.error("[startSession]", error);
    return FAILED;
  }
}

export async function signOut() {
  const session = await getAdminSession();
  // Revoking makes the old cookie useless everywhere, even if it was copied.
  if (session) await adminAuth().revokeRefreshTokens(session.uid).catch(() => {});
  (await cookies()).delete(SESSION_COOKIE);
  redirect("/admin/login"); // outside any try/catch, as the docs require
}

// ---- Appointments & messages -------------------------------------------------

const statusesFor = (kind: InboxKind): readonly { id: string }[] =>
  kind === "bookings" ? bookingStatuses : messageStatuses;

export async function setStatus(kind: InboxKind, id: string, status: string): Promise<ActionResult> {
  await requireAdmin();
  if ((kind !== "bookings" && kind !== "messages") || !SAFE_ID.test(id)) return FAILED;
  if (!statusesFor(kind).some((s) => s.id === status)) return FAILED;

  try {
    await db().collection(kind).doc(id).update({ status, updatedAt: FieldValue.serverTimestamp() });
    refresh(); // re-load the page data in Harris's browser
    return { ok: true };
  } catch (error) {
    console.error("[setStatus]", error);
    return FAILED;
  }
}

export async function deleteItem(kind: InboxKind | "subscribers", id: string): Promise<ActionResult> {
  await requireAdmin();
  if (!["bookings", "messages", "subscribers"].includes(kind) || !SAFE_ID.test(id)) return FAILED;

  try {
    await db().collection(kind).doc(id).delete();
    refresh();
    return { ok: true };
  } catch (error) {
    console.error("[deleteItem]", error);
    return FAILED;
  }
}