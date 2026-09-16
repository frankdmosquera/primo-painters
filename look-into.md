# Things to tackle

One list. Everything here was checked against the code on 2026-09-15, not
copied from an older note. If an entry turns out to be wrong, delete it rather
than annotating it.

## Before main

The branch is 58 commits and 140 files ahead of main. main is at 78b5867,
which is the live site. The SEO gate reports 507 changed lines between them.

- [ ] Decide the 507 lines. `scripts/README.md` lists 10 approved changes from
      2026-09-11 and 58 commits have landed since, so most of the diff is
      unaccounted for. Run the gate, read the diff, decide what is wanted now.
- [ ] Home and about carry no social metadata. `twitter:card = summary` and
      nothing else, while contact and thank-you have full 1200x630 cards.
      `public/og-image.png` and `siteConfig.branding.ogImage` already exist.
- [ ] Thank-you canonicalises to `https://primopainters.ca`, not to itself. Its
      og:url does the same and its title nearly matches the homepage.
- [ ] The hero alt reads "Living room built-ins and mantel painted cream" but
      the image is now the-latam-painters' photo. Either rewrite the alt or put
      Primo's image back. Primo's photo is still on disk.
- [ ] The home page repeats "Ceiling painting calgary" as alt on 8 images and
      "Ceiling preparation for spray painting the ceilings" on 6 more.

## Outside the repo

- [ ] Delete the old Google API key, `AIzaSyAcrdM_5...`, in Google Cloud. The
      route that carried it is gone but it is still in git history and on
      GitHub. It is inert only because that project has no billing.
- [ ] Set the Places API quota cap. APIs & Services, Places API, Quotas,
      requests per day. The $0 budget alert warns, it does not stop anything.
- [ ] The Google Business Profile has to carry +1 780 695 2631, the number now
      in the LocalBusiness JSON-LD. 780 is Edmonton; Calgary is 403, 587, 825.
      Confirmed twice, recorded rather than questioned, but NAP has to match.
- [ ] `origin` points at `primo-painting.git` and GitHub redirects to
      `primo-painters.git`. Pushes work and print a notice every time.

## Dead code

- [ ] `components/mobile-menu.tsx`, imported by nothing, superseded by
      `MobileNav.tsx`.
- [ ] `app/contact/ContactForm.tsx` and `components/ContactFormSection/index.tsx`,
      both rendered by nothing, both still posting to the deleted
      `/api/sendEmail`, both importing formik, yup and sonner which are
      uninstalled.
- [ ] `components/our-services copy.tsx` and
      `components/gallery/GallerySectionHome.tsx`, 7 type errors between them,
      imported by nothing.
- [ ] `axios` ^1.8.4 is installed and imported in zero files.
- [ ] `js-cookie` ^3.0.5 and `@types/js-cookie` are installed and imported in
      zero files. They existed for the deleted ReviewComponent.
- [ ] Alberta Colour Painting, a different company, is named in 4 files.
- [ ] Two comments cite `app/api/sendEmail/route.ts`, which no longer exists:
      `components/forms/ContactForm.tsx:16` and `lib/contactFormSchema.ts:4`.

## Header

- [ ] `Header.tsx:30` declares `width={300} height={100}`, ratio 3.0, against a
      logo whose real ratio is 1.418. The reserved box is about 192px and the
      image settles at about 91px. `MobileNav.tsx:89` has the same mismatch.
- [ ] `HeaderScrollHider.tsx:19` hides the header with `-translate-y-full`. The
      links stay in the DOM and stay focusable while off screen.
- [ ] No skip-to-content link anywhere.
- [ ] The desktop `<nav>` has no `aria-label`. Three `<nav>` elements on the
      home page, only the pagination one is labelled.
- [ ] `MobileNav` sets no `aria-current`. The desktop nav does.
- [ ] `navigationData.ts` declares `NavigationIcon` and an `icon` on every item.
      Nothing reads it. Its comment claims the mobile menu maps them to lucide
      icons; it does not. `NavigationSubItem` and `items?` are also unused.
- [ ] `NavBar.tsx` is `"use client"` solely for `usePathname`, used only to set
      `aria-current`.
- [ ] `Header.tsx:45` uses `next/link` for a `tel:` href, `MobileNav.tsx:119`
      uses a plain `<a>`. `Header.tsx:50`'s PhoneIcon has no size class,
      `MobileNav.tsx:125`'s has `size-4`.
- [ ] `data/images.ts` logo alt is "Primo Painters Calgary - logo". Both
      components also set `title` to the business name, duplicating it as a
      tooltip.

## Loose ends

- [ ] The email logo points at `primo-painters-logo-400.png`, which 404s until
      this branch merges and deploys. Fine in production, blank in any test
      email sent before then.
- [ ] `siteConfig.branding.logo` still points at the 1MB original and feeds the
      JSON-LD `logo` and `image` fields. Left alone deliberately: those URLs are
      in the SEO baseline.
- [ ] `FinalCTA` uses the same kitchen before and after images as the slider
      section on the home page, so the page shows the same kitchen twice.
- [ ] The `lint` script runs `next lint`, removed in Next 16.
- [ ] `components/projects/gallery-image.tsx` renders through
      `@imagekit/next`'s own Image component. The recorded ImageKit decision
      was a Next rewrite and explicitly ruled that component out. Two answers
      in the codebase, pick one.
- [ ] The three job descriptions in `data/projectsData.ts` are drafts and
      marked as such.
- [ ] Sally's two gallery photos are 3.1MB and 3.5MB straight off the phone.
- [ ] The six service galleries lead with prep shots. INTERIORS is the default
      tab, so the first photo of Primo's work anyone sees is an unpainted
      railing. Frank is reordering these.
- [ ] `project-card.tsx:24` uses `project.title` as the thumbnail alt.
- [ ] The avatar photo in the reviews section does not load; it falls back to
      initials. Google does return a photo URL. Cause unknown, initials are the
      agreed outcome.

## Design calls, not bugs

- [ ] Why Choose Us runs four cards at xl, about 30 characters a line.
- [ ] The services and Why Choose Us h2s are black while their standfirsts are
      blue, so the supporting line carries more brand colour than the heading.
- [ ] `--services-bg` reads more lavender than intended.

## The SEO gate, in case scripts/ goes

Everything worth keeping from `scripts/README.md`, so the folder can be
deleted without losing how it worked.

`seo-snapshot.mjs` reads HTML and extracts only what a search engine reads:
title, every meta tag, canonical and alternate links, JSON-LD parsed and
re-stringified so key order cannot cause a false diff, every heading with its
level, every image alt, and all visible prose. It throws away markup, classes
and whitespace, so a pure design change diffs clean and any moved word shows.

`scripts/seo-baseline/` is what five pages said on 2026-09-11, which is the
live site. It regenerates from `78b5867`, which is what `main` points at, so
it is recoverable as long as that commit exists.

Running it. The dev server's on-demand image optimiser makes it unusable, so
build first and serve the production output on a port nothing else is using:

    npm run build
    npx next start -p 3014

    mkdir -p /tmp/after-html
    for r in "index:/" "about:/about" "contact:/contact" "booking:/booking" "thank-you:/thank-you"; do
      name="${r%%:*}"; path="${r##*:}"
      curl -s "http://localhost:3014$path" -o "/tmp/after-html/$name.html"
    done

    node scripts/seo-snapshot.mjs /tmp/after-html /tmp/after
    diff -ru --strip-trailing-cr scripts/seo-baseline /tmp/after

Two traps that cost time on 2026-09-15:

- The baseline is CRLF and a fresh snapshot is LF, so a plain `diff` reports
  every file as fully changed. `--strip-trailing-cr` is not optional.
- If the port is already in use, `next start` fails but curl still succeeds
  against whatever is already listening, and you silently snapshot a stale
  build. Check the server actually started.

As of 2026-09-15 the diff is 507 lines against a branch 58 commits ahead.
