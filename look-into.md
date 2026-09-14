# Look into

Things we are not sure about yet. Not decisions, not a plan. Anything in here is
unresolved until it moves out.

## Dependency cleanout, done 2026-09-14

The old list of overlaps is resolved. Kept as a record of what came out and
why, so nobody puts it back by accident.

Removed, packages: dynamic (a jQuery plugin, zero imports, present since the
initial commit), six @radix-ui packages plus the combined radix-ui, shadcn's
utility set (class-variance-authority, clsx, tailwind-merge), four @heroui
packages, @heroicons/react, swiper, embla-carousel-react, react-hot-toast,
sonner, formik, yup, tailwind-scrollbar, mini-svg-data-uri.

Removed, files: components/ui (16 files), components.json, lib/utils.ts,
hooks/use-toast.ts, hooks/use-mobile.tsx. The hooks folder is gone entirely.

38 packages down to 23.

The Next 15 on Next 16 mismatch is fixed. next, @next/env,
@next/bundle-analyzer and eslint-config-next are all 16.3.5 after a clean
node_modules and lockfile rebuild. @next/env is no longer a direct
dependency, and that is what fixed it: pinned at 15.x it shadowed the copy
next ships.

## Still open

1. The "lint" script runs `next lint`, which was removed in Next 16. Still
   never verified against node_modules/next/dist/docs/.

2. nodemailer 6.10.0 carries a high severity advisory, four CVEs, including
   a recipient-domain validation bypass. The fix is nodemailer 10, a
   breaking change. Our stack says Resend, so the question is whether it is
   upgraded or replaced.

3. axios is installed and used in 3 files. fetch is built in.

4. @imagekit/next is installed and imported nowhere, while the stack names
   ImageKit as the image library. Wire it up or take it out.

5. lucide-react here is 0.477. the-latam-painters runs 1.34. A major apart,
   and the port crosses that gap.

6. react-hook-form, zod and @hookform/resolvers are not installed, so the
   forms currently have no library behind them.

## Calendly

To be replaced eventually. Not decided what with.
Currently react-calendly - InlineWidget and PopupModal.
Touches 15 files across app/ and components/, so this is not a one-file swap.

## The em dash rule

ai-web-agency/CLAUDE.md bans em dashes in commit messages, docs, comments and
generated content. Frank does not recall adding it and is not sure what it
protects against.

Likely purpose: em dashes are a common tell for machine-written text, and the
rule sitting next to it says Frank is the author of every commit regardless of
who typed it. Same goal, stated twice.

Nothing measurable breaks without it. Open question is whether it is a real
decision or an inherited default.

Side note: coding/CLAUDE.md contains 2 em dashes, but that file sits above
ai-web-agency, so the rule does not reach it. Left alone.

## Home and About have no social metadata

Found in scripts/seo-baseline, so this is baseline state as of 2026-09-11, not
something the redesign introduced.

Contact, Booking and Thank-you each carry a full set:
  og:image, og:image:alt, og:image:width, og:image:height
  og:locale, og:site_name, og:type
  twitter:card = summary_large_image, twitter:image

Index and About carry none of those, and use twitter:card = summary.

So the two highest-value pages share with no image, while the thank-you page
shares with a full 1200x630 card. Backwards.

Not in the README's approved-changes list, so it is a real gap rather than an
intentional edit.

## Thank-you page canonical points at the homepage

In scripts/seo-baseline/thank-you.txt:
  canonical = https://primopainters.ca
  og:url    = https://primopainters.ca
  TITLE     = Calgary Interior Painters | Primo Painters

The page canonicalises to the homepage rather than to itself, its og:url does
the same, and its title is nearly identical to the homepage title.

May be deliberate, since the page is meant to be noindex. Worth deciding rather
than leaving ambiguous.

Related and already handled: the same file shows two conflicting robots tags,
"index, follow" and "noindex, nofollow". The README lists removing the first as
an approved change, so that one is done.
