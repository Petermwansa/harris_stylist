import type { Metadata } from "next";
import Image from "next/image";
import { images } from "@/lib/images";
import styles from "./login.module.css";
import LoginForm from "@/components/admin/LoginForm";

export const metadata: Metadata = { title: "Sign in" };

// (auth) is a route group with NO admin sidebar — the login page stands alone.
export default function LoginPage() {
  return (
    <main className={styles.page}>
      <div className={styles.visual}>
        <Image src={images.heroHome.src} alt="" fill sizes="50vw" className={styles.img} fetchPriority="high" />
        <div className={styles.visualText}>
          <p className="eyebrow">Atelier admin</p>
          <p className={styles.quote}>
            Your studio, <em>at a glance.</em>
          </p>
        </div>
      </div>

      <div className={styles.panel}>
        <div className={styles.inner}>
          <div className={styles.mark}>H</div>
          <h1 className={styles.title}>
            Welcome <em>back.</em>
          </h1>
          <p className={styles.sub}>Sign in to manage appointments, messages and the website.</p>
          <LoginForm />
        </div>
      </div>
    </main>
  );
}