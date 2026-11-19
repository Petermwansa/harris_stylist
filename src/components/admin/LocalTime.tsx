"use client";

import { useSyncExternalStore } from "react";

// Shows a date-time in the VIEWER's own time zone (Harris's), e.g.
// "18 Nov 2026, 14:05". The server doesn't know his time zone, so:
//  - on the server (and while the page wakes up) we show the UTC time,
//  - straight after, the browser swaps in local time.
// useSyncExternalStore does that swap without a hydration error — the same
// trick we used for the loader in Step 4.
const subscribe = () => () => {};
const useIsBrowser = () => useSyncExternalStore(subscribe, () => true, () => false);

export default function LocalTime({ iso, withTime = true }: { iso: string | null; withTime?: boolean }) {
  const isBrowser = useIsBrowser();
  if (!iso) return <span>—</span>;

  const text = new Date(iso).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    ...(withTime ? { hour: "2-digit", minute: "2-digit" } : {}),
    ...(isBrowser ? {} : { timeZone: "UTC" }),
  });

  return <time dateTime={iso}>{text}</time>;
}