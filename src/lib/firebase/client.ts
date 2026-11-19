"use client";

// The BROWSER side of Firebase. We only use it for one thing: letting Harris
// sign in with his email and password on /admin/login.
// These NEXT_PUBLIC_ values are not secrets — Firebase designs them to be
// public. What protects the data is that the server checks every request.
import { getApp, getApps, initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth, inMemoryPersistence, setPersistence, type Auth } from "firebase/auth";

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};

export const isClientAuthConfigured = Boolean(config.apiKey && config.authDomain && config.projectId);

let auth: Auth | null = null;

export function getClientAuth(): Auth {
  if (auth) return auth;
  const app = getApps().length ? getApp() : initializeApp(config);
  auth = getAuth(app);

  // "In memory" = the browser forgets the Firebase login straight away.
  // We only need it for a moment, to swap it for our own secure cookie.
  void setPersistence(auth, inMemoryPersistence);

  const emulator = process.env.NEXT_PUBLIC_FIREBASE_AUTH_EMULATOR_HOST;
  if (emulator) connectAuthEmulator(auth, `http://${emulator}`, { disableWarnings: true });

  return auth;
}