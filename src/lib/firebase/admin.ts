// The ONLY file that talks to Firebase directly.
//
// `import "server-only"` makes the build FAIL if a client component ever
// imports this file (even by accident, through another file). That guarantees
// the private key can never be bundled into the JavaScript sent to browsers.
import "server-only";
import { cert, getApp, getApps, initializeApp, type App } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
// Env files can't hold real line breaks, so the key is stored with "\n"
// written out as text. Turn those back into real line breaks.
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");
const storageBucket = process.env.FIREBASE_STORAGE_BUCKET;

// When FIRESTORE_EMULATOR_HOST is set, the Admin SDK automatically talks to
// the local emulator instead of Google — and no key is needed.
const usingEmulator = Boolean(process.env.FIRESTORE_EMULATOR_HOST);

export const isFirebaseConfigured = Boolean(projectId && (usingEmulator || (clientEmail && privateKey)));

function app(): App {
  if (!isFirebaseConfigured) {
    throw new Error(
      "Firebase is not configured. Copy .env.example to .env.local and fill in the FIREBASE_ values (see Step 10).",
    );
  }
  // In development, Next.js reloads files often. getApps() lets us reuse the
  // app we already created instead of crashing with "app already exists".
  if (getApps().length) return getApp();

  return initializeApp(
    usingEmulator
      ? { projectId, storageBucket }
      : { credential: cert({ projectId, clientEmail, privateKey }), storageBucket },
  );
}

export const db = () => getFirestore(app());
export const adminAuth = () => getAuth(app());
export const bucket = () => getStorage(app()).bucket();