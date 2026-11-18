import Link from "next/link";
import { cacheLife } from "next/cache";
import Logo from "@/components/ui/Logo";
import { allLinks, INSTAGRAM_URL } from "@/lib/site";
import styles from "./Footer.module.css";

const services = ["Bespoke Couture", "Bridal & Occasion", "Menswear Tailoring", "Personal Styling"];

// The year is a "changing value", so Next.js asks us to decide how fresh it
// must be. "use cache" + cacheLife("days") = compute it once, reuse it,
// and recompute at most once a day. Plenty fresh for a copyright line!
async function CopyrightYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

// Server component — static content, ships zero JavaScript.
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="wrap">
        <div className={styles.cols}>
          <div>
            <Logo align="left" className={styles.logo} />
            <p className={styles.about}>
              Fashion designer &amp; stylist. Bespoke couture, menswear tailoring and
              ready-to-wear, by appointment.
            </p>
          </div>

          <div>
            <h4 className={styles.title}>Explore</h4>
            <ul>
              {allLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className={styles.title}>Services</h4>
            <ul>
              {services.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className={styles.title}>Follow</h4>
            <ul>
              <li>
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
              </li>
              <li>TikTok</li>
              <li>Pinterest</li>
            </ul>
          </div>
        </div>

        <div className={styles.base}>
          <span>
            © <CopyrightYear /> harris_stylist
          </span>
          <span>Privacy · Terms</span>
        </div>
      </div>
    </footer>
  );
}