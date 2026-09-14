# Where we are

primo-painters, branch design-pass-2. This file describes this branch only.

The rules are in CLAUDE.md. The open questions are in look-into.md.
The full log, with diagrams and the feature history, is the build log artifact:
"Primo Build Log" in Frank's artifact gallery.

## Read this first, so Frank does not have to say it again

These are the things that cost the most time in the sessions so far. Every one
of them is already a rule in CLAUDE.md. They are repeated here because they
were broken anyway.

**Answer the question asked, then stop.** The most common failure is answering
a narrow question correctly and then continuing into the next topic uninvited.
Frank asked "what comes after the hero" and got three pages about a component
library. If he wants more, he asks.

**Do not ask him to re-decide what is already written.** Rule 15. If CLAUDE.md
or this file answers it, act on it and say which line you used. "Design from
LATAM, content from Primo" already settles most design questions. "Our
structure holds" already settles the rest.

**Never assert what you have not opened.** Rule 5, and it went wrong twice in
one session - once claiming a section needed no Base UI after reading one
component out of four, once calling lucide "not shadcn" when components.json
sets it as the icon library. Open the file. Run the check. Then speak.

**Look at the page before saying it is done.** Measuring the DOM is not
looking. Three times a section was handed over as finished while it looked
broken on screen. If the Browser pane returns blank frames, the Playwright MCP
runs its own headless browser and works regardless.

**Gate before commit, not after.** Build, typecheck, SEO gate, then commit.

**One thing at a time, then stop.** Rule 8. Do not fix the adjacent thing you
noticed. Do not refactor the file you were passing through. A request to
change three button colours is three button colours.

## What we are doing

Port the-latam-painters' design onto Primo's content. Design from LATAM,
content from Primo. The site is live and ranking, so content and SEO hold
still, and nothing counts as done until scripts/seo-baseline says nothing
moved.

## Where we are

Five features done and committed. The build is green and the home page renders
the hero, the services tabs, Why Choose Us, the before and after slider, and
the reviews carousel.

    87b24f3  feat: bring the reviews carousel over from the-latam-painters
    570abc6  feat: restore the services section on base ui and tidy its detail
    67b138b  feat: port why choose us and add the before and after slider
    39ef26c  feat: port the home hero with the pinned image
    324c471  feat: port the header from the-latam-painters
    4f62c3e  chore: remove the shadcn component layer and align the next packages

Pushed up to 9e82e5c. 570abc6 and 87b24f3 are not pushed yet.

## ⚠ MERGE BLOCKER: the reviews are fabricated

The reviews carousel renders 20 invented reviews - invented names, invented
dates and ratings, and stock headshots from pravatar.cc - under a heading
reading "4.9 · 20+ Google reviews". It is server rendered, so those names are
in the HTML Google reads, on a site that ranks in Calgary.

It is on the page ON PURPOSE, as boilerplate, so the section could be designed
against real-looking content. That is the only reason.

**Before this branch goes near main:** wire it to real Google reviews through
app/api/getReviews, or take the section off the page. The warning is repeated
at the top of GoogleReviewCarousel3.tsx and at the call site in app/page.tsx.

the-latam-painters carried the same warning in the same file and renders
GoogleReviewCarousel2 on their live site instead.

## Read the live site, not just the repo

the-latam-painters is deployed at:

    https://the-latam-painters-iota.vercel.app/

The repo checked out locally is on `claude-2` and is behind what is live. The
live site has dropdown navigation and a full booking calendar in the hero that
the local files do not. Check the deployed site before concluding what their
design does.

That mattered once already: the reviews section looks transparent, with the
hero photo bleeding through it. In the repo that reads like a bug. On the live
site it is plainly the intended effect, so an "opaque background fix" here
removed the thing worth copying.

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

Feature 6, working top to bottom. ServiceBanner is next on the home page,
then CalgaryPainting, FaqSection, ContactFormSection and FinalCTA.

Running alongside that, and arguably first: swap the fabricated reviews for
real ones. app/api/getReviews already calls the Google Places API and returns
`result.reviews`. Three things to do there:

1. The API key is hardcoded in app/api/getReviews/route.ts line 6 and is in
   git history. Move it to an env var and rotate the key. The correct pattern
   is already in the repo at app/api/place-details.ts, which reads
   process.env.GOOGLE_MAPS_API_KEY - though that file is a Pages Router
   handler sitting in an App Router folder, so it is dead code.
2. Fetch server side with revalidation rather than in the browser. The
   component that used to do this fetched client side behind a cookie and
   localStorage cache, so the review text never reached the HTML at all.
3. Handle one review, a few, and many. Google returns at most five.

## Gate before commit, not after

The order is build, typecheck, gate, then commit. Feature 4 was committed on a
green build and a clean typecheck, and the gate afterwards immediately found
eight images with no alt text. A bad commit was in history before anyone knew
it was bad, on a branch that merges to a live ranking site.

"Done" does not get said until the gate has run.

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
