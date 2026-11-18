import Reveal from "@/components/motion/Reveal";
import Counter from "@/components/motion/Counter";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { stats } from "@/lib/content";
import styles from "./QuoteStats.module.css";

export default function QuoteStats() {
  return (
    <section className="section bg-cream">
      <div className={`wrap ${styles.wrap}`}>
        <Reveal>
          <p className="eyebrow">Our design language</p>
        </Reveal>
        <Reveal delay={0.1}>
          <span className={styles.mark} aria-hidden="true">
            “
          </span>
        </Reveal>
        <Reveal delay={0.2}>
          <blockquote className={styles.quote}>
            Restraint and expression, held in balance. Never loud, never forgettable.
          </blockquote>
        </Reveal>
        <Reveal delay={0.3}>
          <p className={styles.text}>
            Harris works across womenswear, menswear, bespoke and cultural reinterpretation, always
            defined by distinctive silhouettes, careful proportion and exceptional finishing.
          </p>
        </Reveal>

        <StaggerGroup className={styles.stats}>
          {stats.map((s) => (
            <StaggerItem key={s.label} className={styles.stat}>
              <b>
                <Counter value={s.value} suffix={s.suffix} />
              </b>
              <span>{s.label}</span>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}