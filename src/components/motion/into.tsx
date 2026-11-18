"use client";

import { createContext, useContext, useSyncExternalStore } from "react";

export const INTRO_KEY = "hs-intro-seen";

// ---- 1. Has this visitor already seen the loader in this browser tab? ----
// sessionStorage only exists in the browser, so the server can't know.
// useSyncExternalStore lets us give React TWO answers:
//   - getServerSnapshot → used on the server AND while hydrating (always false)
//   - getSnapshot       → the real browser value, used everywhere after that
// That avoids hydration errors, and on later in-app navigations React reads
// the real value straight away, so the loader never flashes.
function readSeen() {
  try {
    return sessionStorage.getItem(INTRO_KEY) === "1";
  } catch {
    return false; // private mode / storage blocked → just show the intro
  }
}
const subscribe = () => () => {}; // the value never changes while we're watching

export function useIntroSeen() {
  return useSyncExternalStore(subscribe, readSeen, () => false);
}

export function markIntroSeen() {
  try {
    sessionStorage.setItem(INTRO_KEY, "1");
  } catch {}
}

// ---- 2. Context: "is the intro finished? may the hero start animating?" ----
// Default is `true`, so on pages with no loader (Designer, Contact…) the hero
// animates immediately. Only the home page provides `false` until the loader ends.
export const IntroDoneContext = createContext(true);
export const useIntroDone = () => useContext(IntroDoneContext);