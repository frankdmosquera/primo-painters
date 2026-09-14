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

The component layer has been torn out on purpose. The site does not build.
This was deliberate and approved, not an accident, and nothing is pushed.

Gone: components/ui (all 16 files), components.json, lib/utils.ts, the whole
hooks folder. Packages went from 38 to 23: shadcn's utility set, all Radix,
all HeroUI, heroicons, swiper, embla, both toast libraries, formik, yup, and
three packages nothing imported.

Also done: next, @next/env, @next/bundle-analyzer and eslint-config-next are
now all 16.3.5, after a clean node_modules and lockfile rebuild. @next/env was
the interesting one. As a direct dependency it was pinned to 15.x and shadowed
the copy next ships, so removing it from package.json is what fixed it.

Not started: react-hook-form, zod and @hookform/resolvers are not installed.
Base UI is not installed. Nothing has been ported from LATAM yet.

## What is broken, and why that is fine

20 files import things that no longer exist. That is the expected cost of the
teardown, not a surprise to debug.

layout.tsx is clean, and Header.tsx imports nothing that was removed. The home
page renders only a Test H1 with every section commented out, so the deck was
already cleared before the teardown. The one thing stopping a build is that
page.tsx still has live imports for components whose JSX is commented out, so
those components get compiled anyway and drag in the removed libraries.

## Next step

Strip the dead imports from app/page.tsx so the build comes back, then start
Feature 1, the header, from the plan in the artifact.

## Working agreements

One step at a time, each with a gate that has to pass before the next starts.
Nav stays flat, since Primo's four items have no children and adding some
would be a content change. The CTA stays "Book Now" and opens Calendly, since
"Get a Free Quote" is LATAM's content, not Primo's.
