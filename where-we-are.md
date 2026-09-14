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

Sixteen commits on this branch, all pushed. Head is 86814a8. The build is
green and typecheck is clean on everything touched.

The home page now renders, in order: the ticker, the header, the hero, the
services tabs, Why Choose Us, the before and after slider, the reviews
carousel, Interior Painting Done Right, the process section, the project
gallery, the FAQ, the final CTA, the ticker again, and the footer.

The about page renders the hero, Our Story, the process section, Our Promise,
Serving Calgary, and the footer.

    86814a8  feat: let the about texture image carry its section
    06c3893  feat: rebuild the about page
    c15d7ef  feat: run the discount ticker top and bottom and load roboto 300
    38e9af1  feat: restore the final cta above the footer
    442c59a  feat: restore the footer and replace the dropped lucide brand icons
    ab483ec  fix: make the header white so the logo stops showing a box
    4125005  feat: bring the project gallery over from the-latam-painters
    fad572a  chore: remove the dead tailwind config
    b76185a  feat: rebuild the faq on shadcn's base ui accordion
    69eb7d0  feat: bring the process section over from the-latam-painters
    25b8dd3  feat: restore the calgary painting section on the home page
    edec46a  docs: record feature 5, the merge blocker, and how to work here
    87b24f3  feat: bring the reviews carousel over from the-latam-painters
    570abc6  feat: restore the services section on base ui and tidy its detail
    67b138b  feat: port why choose us and add the before and after slider
    39ef26c  feat: port the home hero with the pinned image
    324c471  feat: port the header from the-latam-painters
    4f62c3e  chore: remove the shadcn component layer and align the next packages

Nothing is unpushed.

## ⚠ MERGE BLOCKER: the gallery projects are placeholder

The project gallery renders 40 invented projects: invented titles, invented
descriptions claiming work that was never done, and photos served from
picsum.photos, a random image service.

It is server rendered, so all of it is in the HTML Google reads, on a site
that ranks in Calgary. This is the same class of problem as the fabricated
reviews below, and it arrived the same way: placeholder content so the design
could be built against something realistic.

**Before this branch goes near main:** replace every entry in
data/projectsData.ts with Primo's real projects and real photos, or take the
section off the page. The warning is repeated at the top of that file and at
the call site in app/page.tsx.

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
    design-pass-2      86814a8   current work, pushed

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

- ContactFormSection is still commented out on the home page
- ServiceBanner is parked on the home page at Frank's request, and was taken
  off the about page entirely on 2026-09-14. That removal drops
  "Ready to Transform Your Interior Space?" from /about, which the live site
  has at scripts/seo-baseline/about.txt line 147. It is commented out, not
  deleted.
- `our-services copy.tsx` and `GallerySectionHome.tsx` do not typecheck. Both
  are dead, nothing imports them, and the build passes because of it.
- field and hero-highlight are still missing from components/ui. carousel,
  accordion, dialog and pagination are all present now.

## Parked, not dropped

Every one of these is a decision Frank made to defer, not something missed:

- The FAQ's "Still have questions?" aside is not in the live baseline at all.
  Bringing the section up added a new h3 and two sentences the live page has
  never had.
- The process copy renders on both / and /about. The words now live in one
  file, data/processSteps.ts, but both pages still show them.
- A full heading and content scan, to be run once the pages are finished
  rather than section by section.
- The logo PNG carries an opaque white background, measured at 255,255,255 in
  all four corners. The header was made white to hide it; anywhere the logo
  sits on a dark ground, such as the footer, it shows again.
- The home page renders kitchen-colour-before-oak.jpg and
  kitchen-colour-after-black.png twice each, once in the standalone slider and
  once in FinalCTA. app/page.tsx line 68 predicted this.
- About's text contrast drifted while the texture band was darkened. The
  intro paragraph is grey on blue and needs fixing before this ships.

## Next step

The home page and the about page are both built out. What is left is not new
sections but the two merge blockers, the parked list above, and the gate.

**The gate has not been run since 2026-09-14's work.** It will show changes
that are deliberate, and they need checking against this list rather than
being assumed:

- "Ready to Transform Your Interior Space?" removed from /about
- ServingCalgary's two paragraphs joined into one, same words, same order
- The FAQ questions render as h2, matching the live baseline. The HeroUI
  version forced h3, but that section was commented out so the h3 never
  shipped.
- New text on /: the process section's heading and four steps, and the
  gallery's placeholder project titles

Anything beyond that is a regression.

First, though: swap the fabricated reviews for
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
