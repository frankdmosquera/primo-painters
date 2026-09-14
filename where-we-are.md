# Where we are

primo-painters, branch design-pass-2. This file describes this branch only.

The rules are in CLAUDE.md. The open questions are in look-into.md.
The full log, with diagrams and the feature history, is the build log artifact:
"Primo Build Log" in Frank's artifact gallery.

## What we are doing

Port the-latam-painters' design onto Primo's content. Design from LATAM,
content from Primo. The site is live and ranking, so content and SEO hold
still, and nothing counts as done until scripts/seo-baseline says nothing
moved.

## Where we are

Three features done and committed. The build is green and the home page now
renders the hero, Why Choose Us, and the before and after slider.

    67b138b  feat: port why choose us and add the before and after slider
    39ef26c  feat: port the home hero with the pinned image
    324c471  feat: port the header from the-latam-painters
    4f62c3e  chore: remove the shadcn component layer and align the next packages

Pushed up to 39ef26c. 67b138b is not pushed yet.

## Branches

    main               78b5867   the live site, publishes on merge
    main-live-backup   78b5867   was `claude`, renamed. A pin on the live commit
    design-pass-2      67b138b   current work

design-pass and design-pass-3 were deleted on 2026-09-14, local and GitHub,
against the workspace never-delete-a-branch rule and at Frank's explicit
instruction. Nothing was lost: both were strict ancestors of design-pass-2.

## The theme

Three colours chosen, everything else derived. The full explanation is at the
top of app/globals.css and should be read before reaching for a colour.

    blue    #0D378D   identity. From the logo, which cannot change
    amber   #E09A3C   action. The CTA, and nothing else
    green   #2F6B4F   trust marks
    ground  #FBFAF7   warm, not pure white

Amber is a surface and never text: 2.27:1 on the page ground, which fails.

## Two tokens every section needs

    --site-max    80rem. Content width. NOT Tailwind's `container`, which
                  sizes itself from the largest breakpoint
    --header-h    the header's height. The header is sticky and therefore in
                  the flow, so a full-height section must subtract it:
                  min-h-[calc(100svh-var(--header-h))]

## Three traps that already cost time

**The hero image sits behind the whole page.** It is sticky with the page as
its parent, so it never stops pinning. Any section left transparent shows the
hero photo through it. Every section needs an opaque background, which is what
bg-background is doing on the slider section - opacity, not colour.

**The SEO diff lies unless carriage returns are stripped.** The baseline is
CRLF and a fresh snapshot is LF, so a plain `diff -ru` reports all five files
as entirely rewritten. Use:

    diff -ru --strip-trailing-cr scripts/seo-baseline <new snapshot dir>

**npm install follows the branch you are standing on.** Installing while on
design-pass-2 rebuilds its packages, not the live site's. Check out first,
then install.

## Breakpoints

No custom breakpoints. Tailwind's defaults, matching LATAM. The old scale -
sm 600, md 760, lg 920, xl 1040, plus tn, xsm, 3xl and 4xl - came out on
2026-09-14 because the same class copied from LATAM meant two different
widths. The 22 uses of the custom names were converted to inline arbitrary
widths rather than deleted.

## What is still down

- Footer is commented out in app/layout.tsx, so every page has no bottom
- ScrollingBannerA is commented out in the same place
- OurServices, Reviews, ServiceBanner, CalgaryPainting, FaqSection,
  ContactFormSection and FinalCTA are still commented out on the home page
- Components importing removed shadcn files still do not typecheck: carousel,
  card, tabs, field, hero-highlight. The build passes because nothing
  reachable imports them.

## Next step

Feature 4, OurServices, working top to bottom down the home page.

It is the first section where "same as LATAM" and "content holds still" truly
collide. Primo's is a Tabs interface over six service types, each with a photo
GallerySection, and forceMount so every title and description is in the HTML.
LATAM's is four stacked cards with no images and the data hardcoded in the
component. Their layout has nowhere to put the galleries, and those image alts
are in the baseline.

## Working agreements

One step at a time, each with a gate that has to pass before the next starts.
One commit per feature, at the feature boundary rather than afterwards.

Nav stays flat, since Primo's items have no children and adding some would be
a content change. navigationData.ts holds three, not four: Home, About and
Contact. Booking is deliberately excluded and the file explains why.

The CTA stays "Book Now" and opens Calendly, since "Get a Free Quote" is
LATAM's content, not Primo's.
