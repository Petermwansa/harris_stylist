import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import Button from "@/components/ui/Button";
import type { Metadata } from "next";
import styles from "./not-found.module.css";

export const metadata: Metadata = { title: "Page not found" };

// Shown for any URL that doesn't exist. It renders inside the root layout,
// so the header and footer appear around it automatically.
export default function NotFound() {
  return (
    <main className={styles.page}>
      <Reveal>
        <p className={styles.code} aria-hidden="true">
          404
        </p>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="eyebrow">Page not found</p>
      </Reveal>
      <Reveal delay={0.2}>
        <h1 className={styles.title}>
          This piece is <em>not in the collection.</em>
        </h1>
      </Reveal>
      <Reveal delay={0.3}>
        <p className={styles.text}>
          The page you&apos;re looking for may have moved or never existed. Let&apos;s find you something
          beautiful instead.
        </p>
      </Reveal>
      <Reveal delay={0.4} className={styles.actions}>
        <Button href="/" variant="solid">
          Back to Home
        </Button>
        <Link href="/collections" className={styles.link}>
          View the Collections
        </Link>
      </Reveal>
    </main>
  );
}