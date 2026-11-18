"use client";

import { useCallback, useState } from "react";
import { AnimatePresence } from "motion/react";
import Loader from "@/components/motion/Loader";
import InlineScript from "@/components/motion/InlineScript";
import { markIntroSeen, INTRO_KEY, IntroDoneContext, useIntroSeen } from "../motion/into";

// Runs before the first paint on a full page load: if this tab has already
// seen the intro, flag <html> so CSS hides the loader instantly.
const seenScript = `try{if(sessionStorage.getItem("${INTRO_KEY}")==="1")document.documentElement.dataset.intro="seen"}catch(e){}`;

// Wraps the home page's hero. Shows the loader (first visit only), then tells
// everything inside — via context — that it may start animating.
export default function HomeIntro({ children }: { children: React.ReactNode }) {
  const seen = useIntroSeen();
  const [finished, setFinished] = useState(false);
  const introDone = seen || finished;

  // useCallback keeps the SAME function between renders, so the Loader's
  // useEffect (which depends on onDone) doesn't restart its timer.
  const handleDone = useCallback(() => {
    markIntroSeen();
    setFinished(true);
  }, []);

  return (
    <IntroDoneContext.Provider value={introDone}>
      <InlineScript html={seenScript} />
      <AnimatePresence>{!introDone && <Loader key="loader" onDone={handleDone} />}</AnimatePresence>
      {children}
    </IntroDoneContext.Provider>
  );
}