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

Twenty-three commits on this branch. Head is 4711448. The build is green,
typecheck is clean on everything touched, and **everything is pushed.**

The four commits this file used to call unpushed are now on origin, along with
the two from 2026-09-15.

The home page now renders, in order: the ticker, the header, the hero, the
services tabs, Why Choose Us, the before and after slider, the reviews
carousel, Interior Painting Done Right, the process section, the project
gallery, the FAQ, the final CTA, the ticker again, and the footer.

The about page renders the hero, Our Story, the process section, Our Promise,
Serving Calgary, and the footer.

    4711448  fix: make gallery photos optimized, accessible and uniform in height
    10c466c  feat: build the project gallery from the real services and three real jobs
    3a93bec  docs: record the imagekit decision and how it will be wired
    0f38d05  docs: record the projects and nav work and what it contradicts
    248d93e  feat: add the projects pages and port latam's dropdown nav
    c68af48  feat: rebuild the contact hero and bring the form back
    b9b4618  docs: bring the state file up to date
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

All of these are pushed as of 2026-09-15.

## RESOLVED 2026-09-15: the gallery projects are real

This was a merge blocker. It is not any more, and the old text is replaced
rather than kept, because a blocker that has been cleared is a blocker nobody
reads carefully the next time.

What it said: the gallery rendered 40 invented projects with invented titles,
invented descriptions claiming work that was never done, and photos from
picsum.photos, all server rendered into the HTML Google reads.

What it renders now, from data/projectsData.ts:

    six service cards   built from data/serviceData.ts, which already held the
                        titles and descriptions and already imports the six
                        image arrays from data/images.ts. nothing is duplicated
    three real jobs     dark kitchen cabinets painted white, built-ins and
                        panelling in Bearspaw, and a garage taken from bare
                        taped drywall to white

`getProjects()` kept its signature, so the home gallery, /projects and
generateStaticParams on /projects/[slug] all switched without being touched.
Nine project routes now build instead of forty.

The placeholder generator is still at the bottom of projectsData.ts, commented
out, at Frank's request. It is useful for designing against fake content. It
must never be the thing that ships.

**Where the job photos came from, and what it cost.** They are in
C:\Users\frank\Desktop\coding\images, outside the repo, 723 files organised by
job: cabinet-painting/sally, built-ins/bearspow, ceiling/luke and so on. That
folder answers the question this file used to say could not be answered from
the repo, namely where the job grouping comes from.

But those folders are working records, not galleries. Roughly half of what is
in them is prep shots, detail macros, half-done rooms and someone's boots.
ceiling/luke opens on an entryway and closes on a macro of moulding mid-sand.
So every photo has to be opened before it can be used, and that, not the alt
text, is what makes adding more projects slow.

Timestamps do a lot of the filtering for free:

    oak-to-white-paul    9 photos inside 5 minutes. all before. a quote visit,
                         not a job. unusable
    Popcorn Ceiling      8 photos inside 32 seconds. one state. and
                         20220605_151407_nzvz8d.webp is already in the site's
                         ceiling gallery
    garage/Auburn        13 Nov and 5 Dec 2020. a real before and after
    built-ins/bearspow   22 Jun to 20 Jul 2022. before, progress, after
    Railings/sharla      Jul 2022 and Aug 2023, a year apart. probably two
                         separate jobs sharing one folder

**Twelve more interior jobs are sitting there unused**, each with enough
photos: sally, luke, bearspow, mazens, donaldson, Auburn, sharla, Janikke,
chris-patches, basement-patches, james-okotoks, main-floor-platinum. Plus about
ten exterior jobs, which are off-message for a site titled Calgary Interior
House Painters.

**Do not use the folder names as titles.** Most are customer first names.
`/projects/sally` publishes a customer's name next to photographs of their
home. Several folders are places rather than people and those are free to use:
Bearspaw, Okotoks, Auburn Bay, Strathmore. Where there is no place, title by
the work, as "Dark Kitchen Cabinets Painted White" does.

**Still open on the gallery:** the six service cards all lead with a prep shot,
which is look-into item 18 and Frank's to reorder. project-card.tsx:24 uses
project.title as the thumbnail alt, which is the one thing alt must not be. The
three job descriptions are drafts and are marked as such in the file. And
Sally's two photos are 3.1MB and 3.5MB straight off the phone.

## ⚠ Read this before touching the gallery or the nav again

Two things landed on 2026-09-14 that contradict decisions already written
down. They are here so the next session does not have to rediscover them.

**The gallery points at the wrong thing.** The "Primo Design Plan" artifact,
phase 05, says cardMode="link" is an SEO gain "if it is pointed at the service
pages". /projects points it at forty invented projects instead. The plan also
puts the gallery LAST, after tokens, rhythm, motion and components, and marks
it "handle with care" because forceMount on the services tabs is what puts the
six service descriptions into the HTML.

**The nav is no longer flat.** Line 302 of this file says the nav stays flat
and holds three, not four, and that adding items would be a content change. It
now has four entries and the dropdown shape. The nav renders on every page, so
that moved rendered text site-wide.

Both were done at Frank's request in the moment. Neither was checked against
what was already written, which is the failure that keeps repeating.

**What the live site actually has, read from origin/claude:** the desktop nav
is hardcoded Link elements inside Header.tsx, not a NavigationMenu.
components/NavBar.tsx and data/navigationData.ts do not exist there at all -
both were created during the design pass. So the hover behaviour on the
current nav comes from shadcn's navigation-menu component and has never been
on primopainters.ca. Its /booking link also carries a trailing space in the
href.

## Where the notes live

Four places, and the .md files are not the whole picture:

    where-we-are.md        this branch's state
    look-into.md           numbered open questions
    CLAUDE.md              the rules
    Primo Design Plan      the design argument and its phases, an artifact
    Primo Punch List       an artifact, referenced by the design plan's footer
                           as "read first". Still unread.

The design plan is dated 11 Sep and parts are superseded: it says do not change
the breakpoints and lists the custom scale, which came out on 2026-09-14.

## ⚠ MERGE BLOCKER: the reviews are fabricated

Still a blocker. GoogleReviewCarousel3 still renders 20 invented reviews, with
invented names, dates and ratings and stock headshots from pravatar.cc, under a
heading reading "4.9 · 20+ Google reviews". Server rendered, so those names are
in the HTML Google reads, on a site that ranks in Calgary.

What changed on 2026-09-15 is that every unknown behind fixing it is now
answered, and half the work is built.

### The number that decides the design

Google has **one review**. Not twenty.

    rating   5.0 from 1 rating
    review   Efrain Rocha jaramillo, a month ago, 5 stars, with real specific
             text about an interior painting project

So the section cannot be a carousel. There is nothing to rotate through. Note
also that the LocalBusiness JSON-LD already says `"reviewCount": "1"`, which is
correct, so the page currently tells Google one thing and visitors another, and
the visitor-facing number is the false one.

**Frank chose, on 2026-09-15:** show the one real review as a single
testimonial, honestly labelled 5.0 from 1 Google review, with a link to the
listing so visitors can leave their own. Not a carousel of one, and not an
empty space.

### The Google side, all done by Frank on 2026-09-15

    project        primo-painters, Google Cloud
    billing        a billing account was created and linked. there was none
                   before, on any project
    API enabled    Places API (New). the legacy Places API is explicitly NOT
                   enabled, and calling it returns "You're calling a legacy
                   API, which is not enabled for your project"
    key            in .env.local as GOOGLE_MAPS_API_KEY, restricted to Places
                   and to primopainters.ca

Because legacy is off, `app/api/getReviews/route.ts` cannot work as written. It
calls `maps/api/place/details/json`. The new endpoint is
`https://places.googleapis.com/v1/places/{placeId}` with an `X-Goog-Api-Key`
header and an `X-Goog-FieldMask`, and the response is shaped differently:
`text.text` and `authorAttribution.displayName` rather than `text` and
`author_name`.

### The place id was dead

`ChIJT0simD93cVMRNkpXzYqRErA`, hardcoded in that route, returns "The provided
Place ID is no longer valid". Google rotates them when a listing is edited,
merged or moved.

The live one is `ChIJXQ-YpKmdcVMRIXUL0phNtc0`, at 217 Legacy Reach Cres SE, and
it now lives in `data/siteConfig.ts` under `reviews.placeId` rather than in the
env file, because it is public and it is per-client. Its cid,
14822839067314189601, matches the one inside `location.googleMaps` and inside
the JSON-LD `sameAs`, so all three point at the same listing. There is no
second listing holding older reviews.

### Cost, and why the revalidation number is not arbitrary

Reviews come from Place Details **Enterprise + Atmosphere**, the dearest SKU.

    free          1,000 calls a month, on the BILLING ACCOUNT, not per project
    after that    $25.00 per 1,000

    per page view     1,000 visits and you are at the cap. 10,000 is ~$225
    hourly refresh    ~720 a month. inside, but only just
    daily refresh     ~30 a month. what lib/googleReviews.ts does

At thirty client sites sharing one billing account, one read a day each is 930
a month and still free. But the quota cap is per project, so thirty projects
each capped at 30 a day authorises 27,900 a month. Cap per project at 1 or 2
once there is more than one site.

**Frank has not set the quota cap yet.** APIs & Services, Places API, Quotas,
requests per day. 30 a day for Primo alone. That is the brake; the $0 budget
alert he set is only the heads up and stops nothing.

### What is built

`lib/googleReviews.ts`, uncommitted. Server side, daily revalidation, typed
against Google's response, and it returns empty on every failure path rather
than throwing, so a dead key or a quota stop renders nothing instead of taking
the page down.

It does not import `server-only`, which would make a client-side import a build
error. That package is not installed and rule 14 forbids installing without
asking. The key is safe regardless: `GOOGLE_MAPS_API_KEY` has no
`NEXT_PUBLIC_` prefix, so it is absent from the browser bundle.

### What is not built

The component. GoogleReviewCarousel3 still has its 20 fabricated reviews and
its pravatar avatars, and nothing imports `getGoogleReviews` yet.

Also decided but not done: drop `app/api/getReviews/route.ts` rather than fix
it. Fetching Google directly from the server component caches cleanly with
`next: { revalidate }`; going through an internal route handler makes caching
two separate questions. That also puts the review text in the HTML, which the
old client-side version never managed, because it fetched in the browser behind
a cookie and localStorage.

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

## ImageKit, decided 2026-09-14

The photos move to ImageKit. The URLs do not change, because a Next rewrite
proxies them, so the browser only ever talks to primopainters.ca.

    src in the data files   /interior-painting/cabinet-painting/cab-img-3.jpg
    what the browser asks   primopainters.ca/interior-painting/cabinet-...
    what answers it         ImageKit, through a rewrite in next.config

Nothing has been built. The account exists and `.env.local` is filled in. No
code has been written, nothing uploaded, no rewrite added.

**The account.** One ImageKit account per client, rather than one agency
account with a folder per client, so a client's public image URLs never carry
the agency name. The ID is assigned by ImageKit and is not chooseable: this one
is `b5xayf4mq`. `.env.local` holds NEXT_PUBLIC_IMAGE_KIT_URL, IMAGE_KIT_ID,
IMAGE_KIT_PUBLIC_KEY and IMAGE_KIT_PRIVATE_KEY. That file is gitignored at
.gitignore line 29 and is untracked. Only the endpoint is read by the site. The
private key is for the upload script and never reaches a browser, because
browser uploads were ruled out.

**No wrapper and no loader.** Three routes were compared and two were dropped:

    a global custom loader    replaces Next's optimizer for every image in the
                              app, including the logo and icons, which would
                              stop being optimized at all
    @imagekit/next <Image>    verified as a thin wrapper around next/image,
                              v2.1.5, confirmed by the import in its own dist.
                              Same output, but it means editing imports in all
                              46 files that render an image
    a rewrite                 one config block, zero components touched

The rewrite wins because the path already says which images belong to ImageKit.
/interior-painting/* and /projects/* go there, everything else stays local, and
flipping between local and ImageKit is adding or removing the block.

**The rewrite must use beforeFiles.** Next's own docs, at
node_modules/next/dist/docs/01-app/03-api-reference/05-config/01-next-config-js/rewrites.md
line 48, say array-form rewrites run after checking the filesystem including
/public files. Rule 3 keeps the images on disk, so the local file wins, the
rewrite silently never fires, and every image keeps serving locally. Nothing
errors and nothing warns. The beforeFiles form runs before files and is the fix.

**The split.** Photos go, small interface assets stay:

    to ImageKit   interior-painting/ (50 in sub-folders + 4 loose), about/ (8),
                  banners/ (4), heros/ (1), images/ (1, the home hero),
                  visualisations/ (2), and projects/ once it exists
    stays local   icons/ (6), SVGs/, primo-painters-logo.png, og-image.png

og-image.png stays for a reason beyond being small: it is the social share
card, and og:image is an absolute URL recorded in scripts/seo-baseline, so
moving it changes meta tags rather than hosting.

**Ruled out.** A custom domain, images.primopainters.ca, is paid only: Pro
plan, $89 a month minimum, arranged through ImageKit support rather than
self-serve. It is also a subdomain and never the apex, so it does not even give
what was asked for. The rewrite gives the apex for free.

**Agreed, not done.** The six services are peers in data/serviceData.ts, namely
interiors, walls, ceilings, trim and doors, garages and cabinets, but public/
nests five of them under interior-painting/, which is itself one of the six.
Flat is correct and mirrors how the home page renders them. It was left until
the hosting settled because it moves 50 live image URLs.

**Two corrections worth keeping.** Removing images from public/ would not
shrink the repo, because git history keeps every committed version; only a
history rewrite does that, and we are not doing one. And a folder name in an
image path is a minor SEO signal at best, so interior-painting/cabinet-painting
already beats any generic images/ or projects/ container. The real gain would
be in filenames, since cab-img-3.jpg carries nothing, but that moves live URLs
and is parked rather than agreed.

**Two loose ends found while reading.** drywall-repair/ holds 2 images and has
no entry in serviceData.ts, so nothing renders it. And a URL endpoint
identifier named primo-painters was created in the ImageKit dashboard and is no
longer referenced by anything, so it can be deleted there.

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
- The contact form has never been submitted. The route is unverified end to
  end. app/contact/ContactForm.tsx, the old formik version, is still on disk
  and imported by nothing.
- components/NavBarDropdown.tsx is LATAM's desktop nav, ported and NOT wired
  in. Header.tsx still renders our NavBar.tsx. To switch, change that import.
  Nothing in navigationData.ts has items yet, so switching today would look
  identical to now.
- The contact hero uses siteConfig.branding.ogImage, the social share graphic,
  which has its own headline baked into the picture. Two headlines fight in
  the same space.

## Next step

Pick up here. One bite, then stop, as always.

**Build the reviews component.** Everything it needs exists. Read the reviews
merge blocker section above first, in full, because it carries the numbers and
the decision.

    1   Import getGoogleReviews from lib/googleReviews.ts in a server
        component and render the single review as a testimonial: the text,
        "Efrain Rocha jaramillo", five stars, "5.0 from 1 Google review", and
        a link to mapsUrl so visitors can leave their own
    2   Delete the 20 fabricated reviews and the pravatar avatars from
        GoogleReviewCarousel3.tsx, and its do-not-merge header with them
    3   Delete app/api/getReviews/route.ts rather than fix it. It calls the
        legacy endpoint, which is not enabled on the project, and an internal
        route handler makes the caching two questions instead of one
    4   Handle the empty case in the markup, not just in the data. The fetch
        returns empty on failure by design, so the section has to render
        nothing gracefully rather than an empty card
    5   Build, typecheck, gate, then commit

The heading is the part to get right. "4.9 · 20+ Google reviews" is currently
false and contradicts the site's own JSON-LD, which says one. Whatever replaces
it has to read the real rating and the real count.

**Then the gate, which has run and is understood.** It was run on 2026-09-15
and every line in it was accounted for, split between scripts/README.md's
approved-changes list and the expected list that used to live in this section.
Today's contribution was two lines only: the gallery card titles on / becoming
the six service names with photo counts, and "Previous 1 2 3 Next" from the
pagination. Anything beyond what is on those two lists is a regression.

One line in that diff is worth knowing about rather than rediscovering. The
LocalBusiness JSON-LD telephone moved from +15877352312 to +17806952631. That
is look-into item 14, Frank's decision already made, but it is NAP data on a
ranking local business, so the Google Business Profile has to carry the same
number.

**After reviews**, in no particular order: the six service cards all leading
with a prep shot, project-card.tsx:24 using the title as thumbnail alt, Frank's
words on the three draft job descriptions, Sally's 3.5MB photos, and ImageKit,
which is decided and recorded but not built.

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
