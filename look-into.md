# Look into

Things we are not sure about yet. Not decisions, not a plan. Anything in here is
unresolved until it moves out.

## dynamic (npm package)

A jQuery plugin, "Declarative DOM behaviour". Nothing to do with next/dynamic.
Drags jQuery 3.x, expression-eval and microdash into node_modules.
Zero imports anywhere in the codebase.
Present since commit 7ddce69, "Initial commit", 2026-05-05.
Does not reach the browser - cost is install time and supply chain only.
Safe to remove whenever.

## Dependency overlaps and mismatches

Read straight from package.json. The package pairs below are confirmed present.
What is NOT checked yet is which of each pair the code actually uses, so nothing
here says what to remove.

1. dynamic - see entry above.

2. Three UI systems at once. HeroUI (@heroui/react, accordion, system, theme),
   Radix (six @radix-ui/* packages), and shadcn's utility set
   (class-variance-authority, clsx, tailwind-merge). Our stack says shadcn.

3. Radix installed twice over. The combined `radix-ui` package (^1.6.7) plus six
   individual @radix-ui/* packages.

4. Two accordions. @heroui/accordion and @radix-ui/react-accordion.

5. Two icon sets. @heroicons/react and lucide-react.

6. Two carousels. embla-carousel-react and swiper.

7. Two toast libraries. react-hot-toast and sonner.

8. Forms contradict the stack decision. formik + yup installed, but Our stack
   says react-hook-form + zod.

9. Next 15 packages on a Next 16 project.
   @next/bundle-analyzer ^15.5.2
   @next/env ^15.2.1
   eslint-config-next 15.2.1-canary.5  (also a canary build)

Unverified extra: the "lint" script runs `next lint`, which I believe was
removed in Next 16. Needs checking against node_modules/next/dist/docs/ before
anyone relies on it.

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
