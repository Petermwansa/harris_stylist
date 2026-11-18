import SectionHeading from "@/components/ui/SectionHeading";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { testimonials } from "@/lib/content";
import styles from "./Testimonials.module.css";

export default function Testimonials() {
  return (
    <section className="section">
      <div className="wrap">
        <div className={styles.head}>
          <SectionHeading center eyebrow="Kind words" title={<>Worn, loved, <em>remembered.</em></>} />
        </div>

        <StaggerGroup className={styles.grid}>
          {testimonials.map((t) => (
            <StaggerItem key={t.by} className={styles.card}>
              <figure>
                <div className={styles.stars} aria-label="5 out of 5 stars">
                  ★★★★★
                </div>
                <blockquote>“{t.quote}”</blockquote>
                <figcaption>{t.by}</figcaption>
              </figure>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}