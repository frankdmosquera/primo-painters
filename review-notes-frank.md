# Review notes

Short explanations of the header items, written to be read rather than acted
on. `look-into.md` is the list. This is the why.

## The logo box. Done.

Both logo images carried made-up width/height. The file is 400x282, ratio 1.42.
`Header.tsx` declared 300x100 (ratio 3.0) and `MobileNav.tsx` 140x46 (3.04).

The className is `h-16 w-auto`, so the height is pinned and the width follows.
Before the image arrives the browser has no ratio except the declared numbers,
so it reserved `64 x 3.0 = 192px` and the logo then landed at 91px. The header
jumped sideways on every first load.

Now `142/100` in Header and `71/50` in MobileNav. Both are 1.42, each matched to
its own render width, so the reserved box is the size the logo actually lands
at. Nothing looks different once loaded.

Two different numbers on purpose: Next uses `width` to choose which sizes to
generate. 142 covers the header's widest render (136px at `lg:h-24`), 71 covers
the mobile menu's 51px. Putting 142 on the 51px one would ask for files twice
the size it needs.

## The header hiding on scroll. Tested. Leaving it alone.

Scroll down and the header slides up out of sight. It is only moved, not
removed. Everything in it is still on the page and still reachable.

That matters for one key only: Tab. Arrow keys scroll, which brings the header
straight back, which is why it feels fine when you try it by hand. Tab does not
scroll. It moves focus from one link to the next.

So: scroll down, header hidden, press Tab. Tested on 2026-09-15:

    focus went to the logo, sitting 113px above the top of the screen
    for a moment nothing on screen looked selected
    the browser noticed, scrolled up 449px on its own
    that scroll told the header to come back, and it slid down
    the logo ended up on screen, selected, where you would expect it

It fixes itself. The moment where nothing looks selected is the 300ms the
header takes to slide, set by `motion-safe:duration-300` in the className.

I first suggested `inert={!isVisible}` for this. That was wrong. It would not
make the 300ms shorter, it would stop Tab reaching the header at all, so anyone
scrolled down could not tab to the nav until they scrolled back up by hand. A
300ms flicker is better than an unreachable nav.

Decision: no change. Not tested in Firefox or Safari, which chase focus
differently.

## body vs main. Investigated, then put back.

Easy pair to confuse, so plainly:

    <body>   the whole page. everything visible is inside it. one per document
    <main>   the page's own content, the part that changes page to page

The header, footer and banner are the same on every page, so none belong inside
`<main>`. The rule is real: `<header>` only counts as the site banner landmark
when it is not inside `main`, `article`, `aside`, `nav` or `section`. Today the
header is inside `<main>`, so the page has no banner landmark. Nothing else is
lost, and it is not an SEO matter.

I moved `<main>` down to hold only the page content, the hero went grey on
phones, and I told Frank I had broken it. That was wrong. Running the same
reload test on both layouts showed the original flakes exactly as much:

    dev, phone      original 3/3 photo    moved 1/4 photo
    prod, phone     not tested            moved 4/4 photo
    prod, desktop   original 1/3 photo    moved 1/3 photo

So the move was never the cause. The grey is a pre-existing intermittent paint
of a sticky, negative-z, filtered, full-viewport image.

It was reverted anyway, because nothing proved it was worth the risk, and
Lighthouse scores Accessibility 97 without it. Both files are unchanged from
the committed version.

If it is ever picked up again: the change is four lines in `app/layout.tsx`, and
the one visible side effect is the desktop phone number dropping from 17px to
16px, because it was the only thing in the header inheriting `text-[17px]` from
`<main>`.

## What the real problem turned out to be

Lighthouse, mobile, on a production build:

    Performance 85   Accessibility 97   Best Practices 100   SEO 100

    FCP   1.4 s   fine
    LCP   4.3 s   poor, and this is the one Google ranks on
    TBT    50 ms  fine
    CLS   0       perfect

The page paints in 1.4s and the hero appears 2.9s later. It is not the image.
The hero is 30KB on a phone and 73KB on desktop as WebP, about 150ms of
transfer on simulated 4G. It is already preloaded and eager.

What is actually costing it:

    main-thread work    3.4 s
    unused JavaScript   157 KiB
    javascript loaded   282 KB over 16 files on the home page

The browser has the photo and cannot paint it because it is busy running
JavaScript.

Two things I got wrong chasing this, recorded so nobody repeats them:

- I grepped minified chunks for "calendly" and concluded the booking library
  was most of the bundle. That string also matches `calendlyUrl` and the
  booking URL, both of which sit in `siteConfig` and end up in many chunks.
  Lazy-loading the modal moved the total from 282KB to 284KB. Reverted.
- Chunk archaeology by grep is the wrong tool. This project already has
  `@next/bundle-analyzer` wired up. `ANALYZE=true npm run build` answers it
  properly.

Still open: what is in the 282KB, and the missing `fetchPriority="high"` on the
hero, which Lighthouse flags under "LCP request discovery".

## The hero blur. Removed, and staying removed.

`blur-[.5px]` came off the hero image in `HomeHero.tsx`. It was originally a
test, on the theory that a filter over a full-viewport layer delays the paint.
That theory was never measured, because LCP can only be read from a visible
tab and the preview pane this was tested in reports `hidden`, so Chrome records
no paint timing in it at all.

Kept anyway, on the plain grounds that Frank looked at it and prefers it
without. Not a performance claim.

The other four filters are untouched: `brightness-[.7] grayscale-50 sepia-20
hue-rotate-[-10deg]`.

## The banner. framer-motion out, CSS in.

`scrolling-banner-a.tsx` ran its ticker through framer-motion. It is now a CSS
keyframe, `--animate-marquee` in `globals.css`, applied as
`motion-safe:animate-marquee`, which also replaced the `useReducedMotion()`
call. The component lost `"use client"` and is a server component now.

Identical on screen. It did not move LCP:

    LCP  4.3s before, 4.3s after      TBT  50ms before, 40ms after

Both inside the run-to-run noise. Kept anyway, on the grounds that it is
strictly less work at identical output, not on a performance claim.

framer-motion is still in the home bundle because `home/StepReveal.tsx` also
imports it. It only leaves when both go.

## Where LCP actually stands

    desktop   LCP 0.9s   Performance 99
    mobile    LCP 4.3s   Performance 85

Mobile is desktop times the 4x CPU throttle Lighthouse applies. Same build,
same minute. It is not the image: the hero is 30KB on a phone, preloaded and
eager, about 150ms of transfer.

But TBT is 40ms, which is excellent, and a blocked main thread cannot produce
a 40ms TBT. So "too busy running JS to paint" does not survive its own numbers
either. The question was never answered: the Lighthouse audit "Largest
Contentful Paint element" names what it actually timed, and we never read it.

Lighthouse is lab data. Google ranks on field data from real Chrome users,
which lives in Search Console under Experience > Core Web Vitals. The live
site has been up 3-4 months and ranks page two for some keywords, so that
report is the only thing that can say whether 4.3s is real. It describes the
live site, not this branch.

## Parked, not dropped

    hero fetchPriority="high"     Lighthouse flags it under LCP request
                                  discovery. One prop. Not done.
    StepReveal -> CSS             would get framer-motion out of the bundle.
                                  spring physics, 3D rotate, scroll trigger
                                  and hover. not a faithful rewrite, it is a
                                  redesign. not started.
    AVIF in next.config           73KB -> about 50KB on desktop. slower first
                                  encode. decided against for now.
    skip link                     needs the <main> move, which was reverted.
    header leftovers              desktop nav has no aria-label, MobileNav
                                  sets no aria-current, navigationData
                                  declares icons nothing reads, NavBar is a
                                  client component only for aria-current,
                                  Header uses next/link for a tel: href while
                                  MobileNav uses a plain <a>.
    images pass                   Frank's own block for later: filenames,
                                  alts, the six service galleries leading
                                  with prep shots.

## Second half: the markup pass

All committed and pushed on design-pass-2.

**Nav landmarks.** The page carried three, and only pagination was named. Now
"Main" on the header, "Quick links" on the footer. The mobile menu said
"Mobile navigation", which W3C is explicit about: the role is announced
already, so that reads aloud as "mobile navigation navigation". Now "Mobile".
The mobile links also gained aria-current, which the desktop nav already had.

**Headings.** Audited every page.

    /            h1 h2 h3 ...            valid
    /about       h1 h2 h2 h3 ...         valid
    /contact     h1 h2 h2 h2 h2 h3 h3    valid
    /projects    h1 h3 h3 h3 h3 h2 ...   BROKEN, skipped a level four times
    /booking     h1 only, then footer
    /thank-you   h1 only, then footer
    /projects/*  h1 only, then footer

/projects is fixed. The same card renders on the home page under a section h2
where h3 is correct, so the level is a prop now, defaulting to h3.

The footer's call to action was an h2 reading "LET'S" and an h3 reading "GET
IN TOUCH" on every page, one sentence across two levels, with the h3
rendering larger than the h2 above it. One h2 now, two styled spans, with an
explicit {" "} between them because JSX strips whitespace between elements and
without it the text reads "LET'SGET IN TOUCH".

**Social cards.** Home and about defined their own openGraph and twitter
objects, which replace the layout's rather than merging, so both dropped the
image, site name, locale and card type. The two most-shared pages posted as
bare text links. Fixed to match contact's shape.

**Small ones.** The header's tel: link was next/link, which has nothing to
prefetch for a tel:. Now a plain <a>, matching MobileNav. The logo's title
tooltip is gone from both headers: it repeated the alt, only mouse users saw
it, and Google reads alt not title.

## The image alts. Parked for its own pass.

132 images on the home page. None broken, none missing an alt. But:

    24x  "trim and door painting calgary"
    24x  "cabinet painting calgary"
    18x  "garage painting calgary"
    16x  "interior painting calgary"
     8x  "Ceiling painting calgary"
     6x  "Ceiling preparation for spray painting the ceilings"

96 of 132 images share six strings. The look-into entry named only the last
two, so it described 14 of 96.

Google's image documentation warns against filling alt attributes with
keywords, and the same five words on 24 different photographs is that pattern.
A screen reader user also hears it 24 times.

Frank's call, in a later pass: work out what those 96 photos actually show.

## Decided, so nobody reopens them

    phone icon    24px in the header, 16px in the mobile menu. leave it.
    logo alt      "Primo Painters Calgary - logo". leave it.
    dead code     7 items. noted and parked, not deleted.
    image alts    done, see the section above.
    thank-you     canonical fixed, see the canonical section.

## Genuinely still open

    origin remote     points at primo-painting.git, GitHub redirects every
                      push to primo-painters.git. one command to repoint.
    507 SEO lines     against main. a review, not a fix: run the gate, read
                      the diff, decide each change before merging.
    outside the repo  Places quota cap, and the 780 number on the Google
                      Business Profile. both in Frank's Google accounts.

## The canonical bug. The real find of the session.

The root layout sets `alternates.canonical: "/"`. Any page that does not
override it inherits that and tells Google it is the homepage.

    /                            -> /          ok
    /about                       -> /about     ok
    /contact                     -> /contact   ok
    /booking                     -> /booking   ok
    /thank-you                   -> homepage   WRONG, but noindex so harmless
    /projects                    -> homepage   WRONG
    /projects/<every slug>       -> homepage   WRONG

A canonical pointing elsewhere tells Google to fold this page's signals into
that page and generally to drop this one from the index. The project pages
carry the photographs and the service keywords, and every one of them was
disclaiming itself in favour of the homepage.

Fixed: `/projects` self-references, and the `[slug]` template builds its own
from the slug, so it covers every project page at once. thank-you too,
including its og:url, which meant a pasted link previewed as the homepage.

Worth noting how this was found. look-into.md flagged the thank-you page,
which is noindex and therefore harmless, and said nothing about the project
pages, which are indexable and meant to rank. Checking the one entry is what
surfaced the others. The entry was right that something was wrong and wrong
about which page mattered.

## The image alts. Done, not parked.

Fifty photographs opened one at a time and described. Result on the home page:

    before   6 strings covered 96 of 132 images
    after    131 images, 71 distinct alts, nothing repeats more than twice

The pairs that remain are the same photograph rendered twice on the page.

Shape, settled with Frank partway through and then applied to all of them:

    keyword first - what is actually in the frame - Primo Painters

The descriptions are limited to what was painted. An earlier pass had them
wandering into a pickup parked in a garage, a picture on a wall and a mosaic
backsplash, none of which is what the business sells. Keyword tails vary
rather than repeating one phrase, because repeating one phrase was the
problem being fixed.

Which arrays were wrong, and which were already right:

    cabinetPaintingImages        12 images, 1 alt     fixed
    trimAndDoorPaintingImages    12 images, 1 alt     fixed
    garagePaintingImages          9 images, 1 alt     fixed
    ceilingPaintingImages         7 images, 2 alts    fixed
    GalleryInteriorImages        10 images, 3 alts    fixed
    wallPaintingImages            8 images, 8 alts    already right
    the three project arrays      2 images each       already right

serviceData.ts defines no alts of its own. It imports six of those arrays and
attaches them to the six services, so the service galleries were the problem
rather than the safe part.

Things that only turned up by looking at the photographs:

- tnd-img-9 and tnd-img-10 are the before and after of the living room
  built-ins, and tnd-img-10 is the photo the old hero alt described. That is
  why the hero said "built-ins and mantel painted cream" long after the image
  had been swapped for a kitchen.
- long-wall-before and long-wall-after are a commercial office corridor, not
  a house, and the after is a layered mountain mural in three blues. It sits
  in a gallery on a site selling residential interior painting.
- cabinet images 9 to 12 are split before-and-after composites with curved or
  diagonal dividers. They are not the same camera or the same houses as 1
  through 8. Worth confirming they are Primo's own work.
- every photograph in the ceiling gallery is a prep or mid-spray shot. That
  service has no finished room to show at all.
- data/images.ts also carries 24 commented-out entries.
