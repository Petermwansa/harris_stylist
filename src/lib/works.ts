import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { db, isFirebaseConfigured } from "@/lib/firebase/admin";
import { categories, sampleWorks, type Work } from "@/lib/content";

const validCategories = new Set<string>(categories.map((c) => c.id).filter((id) => id !== "all"));

/**
 * The collection, read from Firestore → collection "works".
 *
 * "use cache" + cacheLife("hours"): the result is saved and reused, so we ask
 * Google at most about once an hour — not on every visit. That keeps the page
 * fast and well inside Firebase's free limits.
 * cacheTag("works") lets us clear that saved copy on demand later.
 */
export async function getWorks(): Promise<Work[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("works");

  // Not set up yet? Show the sample pieces so the site still works.
  if (!isFirebaseConfigured) return sampleWorks;

  try {
    const snapshot = await db().collection("works").orderBy("order").get();

    // Firestore can hold anything, so check each document before trusting it.
    return snapshot.docs.flatMap((doc) => {
      const d = doc.data();
      const ok =
        typeof d.name === "string" &&
        typeof d.src === "string" &&
        typeof d.category === "string" &&
        validCategories.has(d.category);
      if (!ok) {
        console.warn(`[getWorks] skipped works/${doc.id}: needs name, src and a valid category`);
        return []; // flatMap + [] = leave this one out
      }
      return [
        {
          id: doc.id,
          name: d.name,
          category: d.category as Work["category"],
          photo: { src: d.src, alt: typeof d.alt === "string" ? d.alt : d.name },
          tall: d.tall === true,
        },
      ];
    });
  } catch (error) {
    console.error("[getWorks] could not load the collection:", error);
    return sampleWorks; // better to show samples than a broken page
  }
}