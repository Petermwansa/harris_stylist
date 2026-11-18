import SectionHeading from "@/components/ui/SectionHeading";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { truths } from "@/lib/content";
import styles from "./Truths.module.css";

export default function Truths() {
  return (
    <section className="section bg-white">
      <div className="wrap">
        <SectionHeading center eyebrow="What I stand on" title={<>Four truths, <em>quietly held.</em></>} />

        <StaggerGroup className={styles.grid}>
          {truths.map((t, i) => (
            <StaggerItem key={t.title} className={styles.card}>
              <span className={styles.num}>0{i + 1}</span>
              <p className="eyebrow">{t.tag}</p>
              <h3>{t.title}</h3>
              <p className={styles.text}>{t.text}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}