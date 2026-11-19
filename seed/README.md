# Seed data for the Collections page

`works.json` lists the pieces shown on /collections. Run

    npm run seed

to copy them into Firestore (collection `works`). Running it again updates
the same documents — it never creates duplicates.

## Using Harris's own photos

1. Put the photo in `seed/images/`, e.g. `seed/images/aurelia.jpg`
2. In `works.json`, set that piece's `"file": "aurelia.jpg"`
3. Run `npm run seed` — the photo is uploaded to Firebase Storage
   (`works/aurelia.jpg`) and the piece is pointed at it.

Pieces with `"file": null` keep using their `src` URL.

Fields: `id` (unique, used in the URL-safe document ID), `name`, `category`
(couture · bridal · menswear · rtw · styling), `order` (lower = shown first;
steps of 10 leave room to insert pieces later), `tall` (true/false), `alt`
(a description of the photo for screen readers and Google).