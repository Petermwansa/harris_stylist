"use client";

import { ReactLenis } from "lenis/react";
import { MotionConfig } from "motion/react";
import "lenis/dist/lenis.css";

// Everything that needs to wrap the WHOLE site and runs in the browser
// lives here. layout.tsx stays a server component and just renders <Providers>.
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    // MotionConfig sets defaults for every Motion animation below it.
    // reducedMotion="user" = if the visitor has "reduce motion" turned on in
    // their phone/computer settings, Motion skips movement and only fades.
    <MotionConfig reducedMotion="user">
      {/* root = Lenis takes over the normal page scroll (not a scroll box). */}
      <ReactLenis
        root
        options={{
          lerp: 0.09, // how "heavy" the scroll feels: lower = smoother/slower (0–1)
          smoothWheel: true, // smooth mouse-wheel & trackpad scrolling
          anchors: true, // links like href="#booking" glide instead of jumping
        }}
      >
        {children}
      </ReactLenis>
    </MotionConfig>
  );
}