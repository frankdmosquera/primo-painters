# Punch list

Working notes for the design pass on this site. Written 2026-09-11.

This is a plain notes file, not a rules file. Nothing loads it automatically.
If you are a session picking this repo up cold, read it before touching
anything.

Live tracker, with per item status:
https://claude.ai/code/artifact/bb1d5edf-33d2-4e50-a21e-c32f797f4aef

## The standing rule

**This site ranks and that ranking is the asset.** It went live roughly two
months ago and sits on page 2 for a lot of Calgary painting keywords. Frank
does not run the painting business, he intends to sell it, and the ranking is
what is being sold.

So:

- Headings, body copy, metadata, canonicals and URLs **do not move**.
- Spacing, markup, classes and brand new pages are fair game.
- Client vs server is **not** what protects the ranking. Client components
  still server render, Google sees the same HTML either way. What protects it
  is unchanged text, unchanged URLs and no speed regression.

Anything that would change a rendered word needs to be asked about first.

## Shape of the work

This is a **design walk, top to bottom**, not a phased refactor. Shared chrome
settles first, then each page in the order its components actually render. The
small fixes are not a separate phase, they get done in whichever file the walk
is already standing in.

Frank drives the design. Work one block at a time and stop after each one.

## Repo state as of 2026-09-11

- Branch `claude`, HEAD `78b5867`, clean tree apart from this file.
- Local `claude` and `main` are identical, both in sync with
  `github.com/frankdmosquera/primo-painting.git`. Note the repo is named
  primo-painting, not primo-painters. All four refs sit on `78b5867`.
- If a host builds from `main`, merging there ships to the live site.
- `stash@{0}` is "image fixes 2026-09-10, abandoned". Do not restore it unless
  Frank asks. He may want it dropped.
- Package name is `alberta`, which is historical. It is not a different project.
- There is no `CLAUDE.md` and no `AGENTS.md` here, and no `blueprint/` kit. That
  is deliberate, see the workspace `ai-web-agency/CLAUDE.md`. Do not seed one.

Work on a branch off `78b5867`, never straight on `claude` or `main`. Never
commit or push unless asked.

## Before the first edit

1. `npm run build` and confirm it passes, so a later failure is attributable.
2. Save the rendered HTML of `/`, `/about`, `/contact`, `/booking` and
   `/thank-you` to a scratch folder.
3. Keep a small extractor that strips markup and leaves text, headings and meta
   tags. An empty diff against the baseline is the proof that a change did not
   touch the ranking. Run it after every block, not at the end.

## 00 Chrome

Shared by every page, so it settles first.

| Task | Files |
|---|---|
| Remove the hardcoded robots meta tag | `app/layout.tsx` |
| Remove the swiper stylesheet from the head | `app/layout.tsx` |
| Ticker: expired promo line, then design | `components/scrolling-banner-a.tsx:20` |
| Header | `components/Header.tsx`, `components/mobile-menu.tsx` |
| Footer | `components/Footer.tsx` |

- The Metadata API already emits `index, follow`. The `<head>` emits a second
  one, so every page currently ships two.
- The swiper stylesheet is a render blocking CDN request on every page, and
  nothing reachable from a route imports swiper.
- The ticker reads "Offer Ends Aug 26th". It is also the only live
  framer-motion user.
- `mobile-menu.tsx` is imported by `Header.tsx` only.
- `Footer` renders outside `<main>` in the layout. Check that before restyling.

## 01 Home

In the order `app/page.tsx` renders them.

| Task | Files |
|---|---|
| Hero | `components/heros/HomeHero.tsx`, `components/heros/hero.css` |
| Services grid | `components/our-services.tsx` |
| Gallery slider, and the 404 image | `components/gallery/SmallGalleryWrapper.tsx`, `components/gallery/GallerySection.tsx` |
| Why choose us | `components/whyChooseUs.tsx` |
| Reviews | `components/Reviews.tsx`, `components/GoogleReviews.tsx` |
| Service banner | `components/ServiceBanner/service-banner.tsx` |
| Calgary painting block | `components/calgary-painting.tsx` |
| FAQ accordion | `components/Faq/index.tsx` |
| Closing CTA | `components/FinalCTA.tsx` |

- The hero holds the H1 and the LCP image. Run the text diff immediately after
  it rather than at the end of the page.
- The gallery reaches the page through one chain only: `our-services.tsx` to
  `gallery/GallerySection.tsx` to `gallery/SmallGalleryWrapper.tsx`. Everything
  else under `components/gallery/` is unreachable from any route.
  `embla-carousel-react` is already installed, so a better slider adds no
  dependency.
- While in the gallery, rename
  `public/interior-painting/drywall-repair/garage-drywall-repair-calgary-after-finished.jpg.jpg`.
  It carries a double extension while `data/images.ts:70` asks for the single
  one, so that image 404s on the live site right now.
- Reviews are fetched client side from `app/api/getReviews`, so they never
  reach the HTML. Server rendering them is an improvement but it puts new text
  in the page, so ask first.
- `ServiceBanner` also renders on the about page, so changes show up twice.
- `Faq/index.tsx` is the only HeroUI file in the repo. Question and answer text
  has to stay identical, it is mirrored into `data/faqJsonLd.ts`.

## 02 About

In the order `app/about/page.tsx` renders them.

| Task | Files |
|---|---|
| About hero | `components/AboutUs/AboutHero.tsx` |
| Our story | `components/AboutUs/OurStoy.tsx` |
| Our process | `components/AboutUs/OurProcess.tsx` |
| Our promise | `components/AboutUs/OurPromise.tsx` |
| Serving Calgary | `components/AboutUs/ServingCalgary.tsx` |

`OurStoy.tsx` is a typo in the filename. Leave it. Renaming is a code change
for no gain.

## 03 Contact

The page that converts. Do not break the form.

| Task | Files |
|---|---|
| Contact hero | `components/heros/StandardHero.tsx`, `components/heros/HeroCallToAction.tsx` |
| Contact form | `app/contact/ContactForm.tsx` |
| Map block | `app/contact/GoogleMap.tsx` |
| Calendly block | `components/calendly.tsx` |

- `StandardHero` is named like a shared component but `app/contact/page.tsx` is
  its only caller, so it can change freely.
- The form is Formik plus Yup, posting with `fetch` to `/api/sendEmail`.
  Restyle only. Leave the submit path alone.
- `calendly.tsx` is shared with the booking page.

## 04 Booking and thank you

| Task | Files |
|---|---|
| Booking page | `app/booking/page.tsx` |
| Thank you page | `app/thank-you/page.tsx` |

`app/thank-you/page.tsx` already sets `index: false, follow: false`. Leave that
metadata alone.

## 05 Service pages

Additive, and the only part of this list that can improve the ranking rather
than just preserve it. Six service descriptions are already written in
`data/serviceData.ts` and not one of them has a page. They are only cards on the
homepage today.

| Task | Files |
|---|---|
| Interior painting page | `app/services/interior-painting/page.tsx` |
| Wall painting page | `app/services/wall-painting/page.tsx` |
| Ceiling painting page | `app/services/ceiling-painting/page.tsx` |
| Trim and doors painting page | `app/services/trim-and-doors-painting/page.tsx` |
| Garage painting page | `app/services/garage-painting/page.tsx` |
| Cabinet painting page | `app/services/cabinet-painting/page.tsx` |
| Add the six routes to the sitemap | `app/sitemap.ts` |
| Link the homepage cards to their new pages | `components/our-services.tsx` |

`app/sitemap.ts` lists four URLs today: home, about, booking, contact. Turning
the existing homepage cards into internal links is what passes authority down
to the new pages, so the last item is not optional.

## Deliberately not doing

Cut on 2026-09-11 as too close to a full rebuild:

- Deleting the roughly 37 components unreachable from any route, including
  `components/OurGallery copy.tsx`, `components/calgary-painting copy.tsx`,
  `components/our-services copy.tsx`, `components/heros/HomeSwiper.tsx`, the
  blog components, five unused `components/AboutUs/` sections, and the dead
  reviews island of `ReviewsCarousel.tsx`, `ReviewsGoogle.tsx`,
  `ReviewsHomestars.tsx` and `ReviewsToggler.tsx` which import only each other.
- Removing HeroUI, which only `components/Faq/index.tsx` uses.
- Removing framer-motion, which only `components/scrolling-banner-a.tsx` uses
  among live files.

The dead code is recorded because the swiper stylesheet removal depends on it:
swiper is imported only by files in that unreachable set.

## No ranking data yet

Nothing connected here reports keyword positions. Search Console is not a
connector, and the Ahrefs and SimilarWeb connectors need authorizing from an
interactive session. To get real numbers into this plan, export Search Console
Performance, Queries tab, to CSV and hand it over.

## Related

`../primo-painters-v2` was the from scratch rebuild of this site. That goal was
retired on 2026-09-11. It stays parked and gets redone later as a template for a
different painting company. It is not the future of this site, and its build
plan items about migrating primo content are void.
