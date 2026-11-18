import SectionHeading from "@/components/ui/SectionHeading";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { processSteps } from "@/lib/content";
import styles from "./Process.module.css";

// Exported separately so the Appointments page can reuse it in Step 8.
export default function Process({ background = "bg-white" }: { background?: string }) {
  return (
    <section className={`section ${background}`}>
      <div className="wrap">
        <div className={styles.head}>
          <SectionHeading
            center
            eyebrow="The process"
            title={<>From first brief to final fitting, every step is <em>unhurried.</em></>}
          />
        </div>

        <StaggerGroup className={styles.grid}>
          {processSteps.map((step) => (
            <StaggerItem key={step.n} className={styles.step}>
              <div className={styles.n}>{step.n}</div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}