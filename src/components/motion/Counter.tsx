"use client";

import { useEffect, useRef } from "react";
import { animate, useInView } from "motion/react";
import { easeOut } from "@/lib/motion";

type Props = { value: number; suffix?: string; duration?: number };

// Counts from 0 up to `value` the first time it scrolls into view.
export default function Counter({ value, suffix = "", duration = 1.8 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });

  useEffect(() => {
    if (!inView) return;

    // animate() can tween a plain number. onUpdate runs every frame and we
    // write straight into the DOM — no React state, so no 60 re-renders/sec.
    const controls = animate(0, value, {
      duration,
      ease: easeOut,
      onUpdate: (n) => {
        if (ref.current) ref.current.textContent = Math.round(n) + suffix;
      },
    });

    return () => controls.stop(); // cleanup if the component disappears mid-count
  }, [inView, value, suffix, duration]);

  // Server HTML shows the FINAL number, so search engines and people
  // without JavaScript still see "250+". The browser resets it to 0 and counts.
  return <span ref={ref}>{value + suffix}</span>;
}