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

Four features done and committed. The build is green and the home page renders
the hero, the services tabs, Why Choose Us, and the before and after slider.

    570abc6  feat: restore the services section on base ui and tidy its detail
    67b138b  feat: port why choose us and add the before and after slider
    39ef26c  feat: port the home hero with the pinned image
    324c471  feat: port the header from the-latam-painters
    4f62c3e  chore: remove the shadcn component layer and align the next packages

Pushed up to 81a9e38. 570abc6 is not pushed yet.

## Radix names that Base UI ignores silently

The teardown swapped Radix for Base UI. Props and data attributes that came
across with the old names do not error, do not warn, and simply stop working.
Three were found in one section:

    forceMount            -> keepMounted
    data-[state=active]   -> data-active
    data-[state=inactive] -> data-hidden

The first had removed five of six service panels from the page, and nothing
anywhere said so. Assume more of these are waiting in the sections not yet
touched. Grep for `data-[state=` before porting each one.

## shadcn base classes that beat yours

Three fights lost to the component's own cva classes, all in one section:

    TabsTrigger  flex-1              every pill stretched to fill the row
    TabsList     h-8, bg-muted       fixed height, and a grey bar behind it
    Card         ring-1, not border  border-none removed nothing

Use `h-auto!`, `bg-transparent`, `ring-0`. Reading the component's base
classes first is faster than guessing at overrides.

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
- Reviews, ServiceBanner, CalgaryPainting, FaqSection, ContactFormSection and
  FinalCTA are still commented out on the home page
- `our-services copy.tsx` and `GallerySectionHome.tsx` do not typecheck. Both
  are dead, nothing imports them, and the build passes because of it.
- carousel, field and hero-highlight are still missing from components/ui, so
  the components importing them stay broken until their sections come up

## Next step

Feature 5, working top to bottom down the home page. Reviews is next.

The SEO gate has not run since Why Choose Us, the slider or the services
section. It should before any of this merges.

## What the services section settled

"Same as LATAM" and "content holds still" collided here for the first time.
LATAM's services are four stacked cards, hardcoded in the component, with no
images. Primo's are six tabbed panels with photo galleries whose alt text is
in the baseline. Their layout has nowhere to put the galleries.

Resolved in favour of rule 1: Primo's structure stays, LATAM supplies the
tokens, the spacing and the section tint. An attempt to restructure it to
LATAM's centred shape was reverted, because it was worse.

## Working agreements

One step at a time, each with a gate that has to pass before the next starts.
One commit per feature, at the feature boundary rather than afterwards.

Nav stays flat, since Primo's items have no children and adding some would be
a content change. navigationData.ts holds three, not four: Home, About and
Contact. Booking is deliberately excluded and the file explains why.

The CTA stays "Book Now" and opens Calendly, since "Get a Free Quote" is
LATAM's content, not Primo's.
