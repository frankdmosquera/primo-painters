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

5. Resolved 2026-09-14. lucide-react is 1.46.0, past the 1.34 LATAM runs.

6. Resolved 2026-09-14. react-hook-form 7.88.0 and @hookform/resolvers 5.9.1
   installed, zod 4.6.5 was already there. Nothing is wired to them yet.

7. tailwind.config.js still does `require('tailwind-scrollbar')` and calls
   `heroui()`. Both packages came out last session, so every build prints two
   module-not-found warnings. The build passes regardless. Decide whether the
   file is edited or deleted, since Tailwind 4 configures in CSS.

8. motion is not installed. LATAM's mobile menu staggers its links in with it,
   so ours opens without that animation. The workspace rules say motion is
   never a default, which makes this a deliberate choice rather than a gap.

9. components/ui/accordion.tsx is installed and imported nowhere. It came in
   because LATAM's mobile nav uses it for dropdown sections and our nav is
   flat. Keep it for later sections or take it out.

10. components/mobile-menu.tsx is superseded by MobileNav.tsx and is no longer
    referenced. Still on disk, still compiles.

11. The hero alt text does not describe the hero image. The image is now
    the-latam-painters' photo; the alt still reads "Living room built-ins and
    mantel painted cream", which was Primo's own. Alt is tracked by
    scripts/seo-baseline on a ranking page, so this is a content decision:
    either rewrite the alt with approval, or put Primo's image back. Primo's
    photo is still on disk, path recorded in data/images.ts.

12. Why Choose Us runs four cards across at xl, about 30 characters a line.
    Comfortable reading is 45 to 75. It looks tidier and reads harder, and
    that trade has not been called either way.

13. FinalCTA uses the same kitchen before and after images as the new slider
    section on the home page. When FinalCTA comes back, one of the two has to
    change or the page shows the same kitchen twice.

14. The 780 area code is Edmonton; Calgary is 403, 587 and 825. Frank
    confirmed 780-695-2631 twice, so this is recorded rather than questioned.
    The number is NAP data in the LocalBusiness JSON-LD, so the Google
    Business Profile needs the same number or local rankings take a hit.

15. The git remote is stale. `origin` points at primo-painting.git and GitHub
    redirects to primo-painters.git. Pushes work and print a notice each time.

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
