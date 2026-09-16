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
