import Link from "next/link";
import styles from "./Logo.module.css";

type Props = { align?: "center" | "left"; className?: string };

// Server component: no interactivity, so no "use client".
export default function Logo({ align = "center", className = "" }: Props) {
  return (
    <Link
      href="/"
      aria-label="Harris Stylist — home"
      className={`${styles.logo} ${align === "left" ? styles.left : ""} ${className}`}
    >
      <b className={styles.word}>HARRIS</b>
      <small className={styles.sub}>Stylist · Atelier</small>
    </Link>
  );
}