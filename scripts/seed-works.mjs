// Copies seed/works.json into Firestore (and uploads any local photos to
// Firebase Storage). Run with:  npm run seed
//
// This is a plain Node script, not part of the website. It uses the same
// Admin SDK and the same .env.local values as the site.

import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { cert, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getDownloadURL, getStorage } from "firebase-admin/storage";

const { FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY, FIREBASE_STORAGE_BUCKET, FIRESTORE_EMULATOR_HOST } =
  process.env;

if (!FIREBASE_PROJECT_ID) {
  console.error("✗ FIREBASE_PROJECT_ID is missing. Did you create .env.local? (see .env.example)");
  process.exit(1);
}

const app = initializeApp(
  FIRESTORE_EMULATOR_HOST
    ? { projectId: FIREBASE_PROJECT_ID, storageBucket: FIREBASE_STORAGE_BUCKET }
    : {
        credential: cert({
          projectId: FIREBASE_PROJECT_ID,
          clientEmail: FIREBASE_CLIENT_EMAIL,
          privateKey: FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        }),
        storageBucket: FIREBASE_STORAGE_BUCKET,
      },
);
const db = getFirestore(app);

const works = JSON.parse(await readFile("seed/works.json", "utf8"));
console.log(`Seeding ${works.length} pieces into ${FIRESTORE_EMULATOR_HOST ? "the EMULATOR" : `project "${FIREBASE_PROJECT_ID}"`}…`);

// A batch = many writes sent together; either all succeed or none do.
const batch = db.batch();

for (const work of works) {
  let src = work.src;

  if (work.file) {
    const localPath = path.join("seed/images", work.file);
    if (!existsSync(localPath)) throw new Error(`Photo not found: ${localPath}`);
    if (!FIREBASE_STORAGE_BUCKET) throw new Error("Set FIREBASE_STORAGE_BUCKET in .env.local to upload photos.");

    const bucket = getStorage(app).bucket();
    const [file] = await bucket.upload(localPath, {
      destination: `works/${work.file}`,
      metadata: { cacheControl: "public, max-age=31536000" }, // photos rarely change → cache for a year
    });
    src = await getDownloadURL(file);
    console.log(`  ↑ uploaded ${work.file}`);
  }

  // set() with the same ID overwrites → running the script twice is safe.
  batch.set(db.collection("works").doc(work.id), {
    name: work.name,
    category: work.category,
    order: work.order,
    tall: Boolean(work.tall),
    alt: work.alt ?? work.name,
    src,
  });
}

await batch.commit();
console.log(`✓ Done. ${works.length} pieces are in Firestore → "works".`);
console.log("  The live site refreshes its cached copy within about an hour (or after a new deploy).");