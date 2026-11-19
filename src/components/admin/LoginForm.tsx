"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { sendPasswordResetEmail, signInWithEmailAndPassword, signOut as firebaseSignOut } from "firebase/auth";
import { getClientAuth, isClientAuthConfigured } from "@/lib/firebase/client";
import { startSession } from "@/app/admin/actions";
import { easeOut } from "@/lib/motion";
import styles from "./LoginForm.module.css";

// Firebase error codes → friendly words
function friendly(code: string) {
  if (code.includes("invalid-credential") || code.includes("wrong-password") || code.includes("user-not-found"))
    return "That email or password isn't right.";
  if (code.includes("too-many-requests")) return "Too many attempts. Please wait a few minutes and try again.";
  if (code.includes("network")) return "No connection. Check your internet and try again.";
  if (code.includes("invalid-email")) return "Please enter a valid email address.";
  return "Sign-in didn't work. Please try again.";
}

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ text: string; tone: "error" | "ok" } | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setMessage(null);
    try {
      // 1. Firebase checks the password (in the browser, over HTTPS)
      const auth = getClientAuth();
      const credential = await signInWithEmailAndPassword(auth, email.trim(), password);
      // 2. We get a short-lived proof of who signed in…
      const idToken = await credential.user.getIdToken();
      // 3. …and the server swaps it for our secure session cookie
      const result = await startSession(idToken);
      // 4. The browser doesn't need its Firebase login any more
      await firebaseSignOut(auth);

      if (!result.ok) {
        setMessage({ text: result.error, tone: "error" });
        setBusy(false);
        return;
      }
      router.replace("/admin");
      router.refresh();
    } catch (error) {
      setMessage({ text: friendly(String((error as { code?: string }).code ?? error)), tone: "error" });
      setBusy(false);
    }
  }

  async function handleReset() {
    if (!email.trim()) {
      setMessage({ text: "Type your email above first, then press “Forgot password?” again.", tone: "error" });
      return;
    }
    try {
      await sendPasswordResetEmail(getClientAuth(), email.trim());
    } catch {
      // Ignore: we never reveal whether an email has an account
    }
    setMessage({ text: "If that email has an account, a reset link is on its way.", tone: "ok" });
  }

  if (!isClientAuthConfigured) {
    return (
      <p className={styles.setup}>
        Admin sign-in isn&apos;t set up yet: add the <code>NEXT_PUBLIC_FIREBASE_…</code> values to your
        environment variables (see <code>.env.example</code>).
      </p>
    );
  }

  return (
    <motion.form
      className={styles.form}
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: easeOut, delay: 0.15 }}
    >
      <label className={styles.field}>
        <span>Email</span>
        <input type="email" autoComplete="username" required value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label className={styles.field}>
        <span>Password</span>
        <input
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>

      <p className={`${styles.message} ${message?.tone === "ok" ? styles.ok : ""}`} aria-live="polite">
        {message?.text}
      </p>

      <button type="submit" className={styles.submit} disabled={busy}>
        {busy ? "Signing in…" : "Sign in"}
      </button>
      <button type="button" className={styles.forgot} onClick={handleReset}>
        Forgot password?
      </button>
    </motion.form>
  );
}