import Reveal from "@/components/motion/Reveal";
import styles from "./SectionHeading.module.css";

type Props = {
  eyebrow: string;
  title: React.ReactNode;
  text?: string;
  center?: boolean;
  light?: boolean; // white text, for dark backgrounds
};

// The "small gold label + big serif title + optional paragraph" pattern
// appears in almost every section, so it gets its own component.
export default function SectionHeading({ eyebrow, title, text, center, light }: Props) {
  return (
    <div className={`${styles.heading} ${center ? styles.center : ""} ${light ? styles.light : ""}`}>
      <Reveal>
        <p className="eyebrow">{eyebrow}</p>
      </Reveal>
      <Reveal delay={0.12}>
        <h2 className={styles.title}>{title}</h2>
      </Reveal>
      {text && (
        <Reveal delay={0.24}>
          <p className={styles.text}>{text}</p>
        </Reveal>
      )}
    </div>
  );
}