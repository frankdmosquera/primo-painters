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

Feature 1, the header, is built and the build is green again.

The component layer is back, on Base UI this time. `shadcn init` ran with
`-b base -p nova`, which writes `"style": "base-nova"` into components.json,
the same style the-latam-painters uses. Four components were added: button,
sheet, navigation-menu and accordion. Accordion is not imported anywhere yet,
it came in because LATAM's mobile nav uses it for dropdown sections and ours
has none.

Installed this session: @base-ui/react 1.8.0, react-hook-form 7.88.0,
@hookform/resolvers 5.9.1, and lucide-react moved 0.477 to 1.46.0. zod 4.6.5
was already present. All at latest, nothing hand pinned.

## Feature 1, the header

Five files, matching LATAM component for component:

    Header.tsx             server component, LATAM's layout
    HeaderScrollHider.tsx  LATAM's hide on scroll down, show on scroll up
    NavBar.tsx             LATAM's NavigationMenu, flat
    MobileNav.tsx          LATAM's Sheet menu
    HeaderBookNow.tsx      LATAM's Button, Primo's Calendly

Only the scroll wrapper, the nav's active link and the CTA are client
components. Everything else stays on the server.

Content is Primo's throughout: the same three links with the same hrefs and
the same words, Primo's logo with its alt and title, Primo's phone number,
and "Book Now" opening Calendly rather than LATAM's "Get a Free Quote".
Colours stay Primo's blue. Two new tokens carry it, `--primary-dark` and
`--primary-light`, both #0D378D family rather than LATAM's orange.

The old Header.tsx and mobile-menu.tsx are replaced. mobile-menu.tsx is still
on disk and still imports cleanly, it is simply no longer referenced.

### The gate

The SEO snapshot was run against a production build on port 3005. The header
introduced nothing outside the approved list in scripts/README.md. The two
lines it did move are both already approved: Booking leaving the nav, and the
phone number arriving.

One trap worth recording. `diff -ru` against the baseline reports every file
as entirely changed, because the baseline is CRLF and a fresh snapshot is LF.
Use `--strip-trailing-cr` or the diff is unreadable:

    diff -ru --strip-trailing-cr scripts/seo-baseline <new snapshot dir>

## What is still down

The rest of the diff is teardown state, not regression:

- Footer is commented out in app/layout.tsx line 123, since commit 4f62c3e
- ScrollingBannerA is commented out in the same place
- The home page still renders only Test H1, every section commented out
- Components importing the removed shadcn files still do not typecheck:
  carousel, card, tabs, field, hero-highlight

The build passes anyway, because nothing reachable imports them.

## Next step

Feature 2 from the plan in the artifact.

## Working agreements

One step at a time, each with a gate that has to pass before the next starts.
Nav stays flat, since Primo's four items have no children and adding some
would be a content change. The CTA stays "Book Now" and opens Calendly, since
"Get a Free Quote" is LATAM's content, not Primo's.

Note on that line: navigationData.ts holds three items, not four. Home, About
and Contact. Booking is deliberately excluded and the file explains why.
