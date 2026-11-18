import Link from "next/link";
import styles from "./Button.module.css";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "outline" | "solid" | "light" | "link" | "link-light";
};

// One component for every button-looking link on the site.
// The gold "wipe" on hover is pure CSS (see Button.module.css).
export default function Button({ href, children, variant = "outline" }: Props) {
  return (
    <Link href={href} className={`${styles.btn} ${styles[variant]}`}>
      {children}
    </Link>
  );
}