# The SEO guard

This site ranks. The whole redesign is built on one rule: **the rendered text
does not move.** These two things are how that gets proved rather than hoped.

```
seo-snapshot.mjs     extracts only what a search engine reads
seo-baseline/        what the five pages said on 2026-09-11, before any edit
```

## What the snapshot captures

Title, every meta tag, canonical and alternate links, JSON-LD (parsed and
re-stringified so key order cannot cause a false diff), every heading with its
level, every image alt attribute, and all visible prose.

It deliberately throws away markup, classes, attributes and whitespace. So a
pure design change produces a byte-identical snapshot, and any word that moves
shows up immediately.

## Using it

The dev server's on-demand image optimiser makes it unusable for this, so build
first and serve the production output.

```bash
npm run build
npx next start -p 3005
```

Then, from the repo root:

```bash
mkdir -p /tmp/after-html
for r in "index:/" "about:/about" "contact:/contact" "booking:/booking" "thank-you:/thank-you"; do
  name="${r%%:*}"; path="${r##*:}"
  curl -s "http://localhost:3005$path" -o "/tmp/after-html/$name.html"
done

node scripts/seo-snapshot.mjs /tmp/after-html /tmp/after
diff -ru scripts/seo-baseline /tmp/after
```

An empty diff means nothing a search engine reads has changed.

## Reading the diff

As of 2026-09-11 the diff is **not** empty, and every line in it is a change
Frank approved. Expect to see:

```
Gallery removed                 it 404'd and was linked from every page
Booking removed from the nav    the page and its sitemap entry stay
Offer Ends Aug 26th -> 11/17
the phone number added          now on every page, matching the JSON-LD
"Pick a day Free"               three words on the hero booking card
5 service descriptions          forceMount, see PUNCH-LIST.md
robots = index, follow removed  it contradicted noindex on /thank-you
the YouTube URL left sameAs     the handle was wrong
ticker bullets                  decorative, now aria-hidden dividers
alt text count 24 -> 16         duplicates removed with the old thumbnails
```

Anything **beyond** that list is a regression. Check it before committing.

## Regenerating the baseline

Only if you deliberately want a new starting point. `78b5867` is the live site
as of 2026-09-11.

```bash
git stash
git checkout 78b5867
npm run build && npx next start -p 3005
# capture as above, into scripts/seo-baseline
git checkout design-pass && git stash pop
```
