"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import type { Photo } from "@/lib/images";
import styles from "./Parallax.module.css";

type Props = {
  photo: Photo;
  speed?: number; // how far (in %) the image travels while crossing the screen
  sizes: string;
  className?: string;
};

// A photo in a frame. As you scroll, the photo slides inside the frame a
// little slower than the page — that difference in speed is "parallax".
export default function ParallaxImage({ photo, speed = 12, sizes, className = "" }: Props) {
  const frame = useRef<HTMLDivElement>(null);

  // scrollYProgress goes from 0 → 1 while THIS frame travels through the
  // viewport: 0 = its top just appeared at the bottom of the screen,
  // 1 = its bottom just left at the top.
  const { scrollYProgress } = useScroll({
    target: frame,
    offset: ["start end", "end start"],
  });

  // Map that 0→1 progress onto a movement: from -speed% to +speed%.
  const y = useTransform(scrollYProgress, [0, 1], [`-${speed}%`, `${speed}%`]);

  return (
    <div ref={frame} className={`${styles.frame} ${className}`}>
      {/* The image is taller than its frame (see CSS) so moving it never shows a gap */}
      <motion.div className={styles.inner} style={{ y }}>
        <Image src={photo.src} alt={photo.alt} fill sizes={sizes} className={styles.img} />
      </motion.div>
    </div>
  );
}