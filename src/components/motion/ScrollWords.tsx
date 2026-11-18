"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";

type Props = {
  text: string;
  highlight?: string[]; // words to show in gold italics
  className?: string;
};

// Each word starts faint and becomes solid as you scroll through the
// paragraph — like the text is being "read" to you.
export default function ScrollWords({ text, highlight = [], className }: Props) {
  const ref = useRef<HTMLParagraphElement>(null);

  // 0 when the paragraph's top reaches 85% down the screen,
  // 1 when its bottom reaches the middle of the screen.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });

  const words = text.split(" ");

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => {
        // Word i "owns" a slice of the progress: e.g. with 20 words,
        // word 0 fades in from 0.00→0.05, word 1 from 0.05→0.10, …
        const start = i / words.length;
        const end = start + 1 / words.length;
        const clean = word.replace(/[^\w’'-]/g, "");
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]} gold={highlight.includes(clean)}>
            {word}
          </Word>
        );
      })}
    </p>
  );
}

// A separate component because hooks (useTransform) can't be called
// inside a loop — but they CAN be called once per component.
function Word({
  children,
  progress,
  range,
  gold,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  gold: boolean;
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);

  return (
    <>
      <motion.span style={{ opacity, ...(gold ? { color: "var(--gold)", fontStyle: "italic" } : {}) }}>
        {children}
      </motion.span>{" "}
    </>
  );
}