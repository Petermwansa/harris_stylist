// Who is signed in to the admin panel? Server-only.
import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { adminAuth, isFirebaseConfigured } from "@/lib/firebase/admin";

export const SESSION_COOKIE = "hs_admin_session";
export const SESSION_DAYS = 5;

/** ADMIN_EMAILS="harris@example.com, assistant@example.com" → a list. */
function adminEmails(): string[] {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminEmail(email: string | undefined | null) {
  return Boolean(email && adminEmails().includes(email.toLowerCase()));
}

export type AdminSession = { uid: string; email: string };

/**
 * Reads and checks the session cookie. Returns the admin, or null.
 * React's cache() means: however many times this runs while building ONE
 * page, Firebase is only asked once.
 */
export const getAdminSession = cache(async (): Promise<AdminSession | null> => {
  if (!isFirebaseConfigured) return null;
  const cookie = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!cookie) return null;
  try {
    // `true` = also check the session hasn't been revoked (e.g. by signing out)
    const decoded = await adminAuth().verifySessionCookie(cookie, true);
    if (!isAdminEmail(decoded.email)) return null;
    return { uid: decoded.uid, email: decoded.email! };
  } catch {
    return null; // expired, revoked, or tampered with
  }
});

/**
 * Call at the top of EVERY admin page and EVERY admin action.
 * Not signed in → sent to the login page (redirect() stops everything else).
 */
export async function requireAdmin(): Promise<AdminSession> {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");
  return session;
}