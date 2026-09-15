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

4. ⚠ CORRECTED 2026-09-15. This said @imagekit/next is imported nowhere. That
   is wrong, and it was repeated in conversation before anyone opened the file.
   components/projects/gallery-image.tsx line 1 imports `Image as IKImage`
   from @imagekit/next and renders through it for relative src values, falling
   back to a plain <img> for absolute URLs. So the project card thumbnails
   already go through ImageKit's own component.

   That matters because where-we-are.md's ImageKit section settles on a Next
   rewrite and explicitly rules out their component. Those two are now in
   conflict in the codebase. Decide which one wins before building ImageKit.

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

16. The services section h2 is black while its standfirst is blue, so the
    supporting line carries more brand colour than the heading it supports.
    Same pattern in Why Choose Us. Deliberate or not, it is consistent, so
    changing it is a decision about both sections rather than one.

17. --services-bg reads more lavender than intended. It is LATAM's recipe at
    Primo's hue, 97% lightness and 0.008 chroma, but a cool tint on a warm
    page ground is a bigger contrast than those numbers suggest.

18. Two service galleries lead with a before or prep shot. INTERIORS opens on
    "stained oak railing prior to being painted white" and CEILINGS on
    "Ceiling preparation for spray painting". INTERIORS is the default tab, so
    the first photo of Primo's work anyone sees is an unpainted railing with
    tools on the floor. Frank is reordering these himself.

19. our-services copy.tsx and GallerySectionHome.tsx do not typecheck. Both
    are dead and nothing imports them. Delete or fix.

20. js-cookie is orphaned. It existed only for ReviewComponent, which was
    deleted with the rest of the old reviews tree. js-cookie and
    @types/js-cookie are still in package.json and imported nowhere.

21. ⚠ UPDATED 2026-09-15. The old key, AIzaSyAcrdM_5..., is still hardcoded in
    app/api/getReviews/route.ts line 6 and is still in git history and on
    GitHub. It is dead in two ways now: its project has no billing, and the
    legacy Places API it calls is not enabled on the new project either.

    A new key was created on 2026-09-15 in a new Google Cloud project,
    primo-painters, restricted to Places and to primopainters.ca, and put in
    .env.local as GOOGLE_MAPS_API_KEY. lib/googleReviews.ts reads it.

    The old one is not rotated, it is merely useless. If anyone ever enables
    billing on whatever project it belongs to, it becomes spendable and it is
    already published. That route file is due for deletion anyway, which
    removes it from the working tree but not from history.

    app/api/place-details.ts is still a Pages Router handler in an App Router
    folder, so it still never runs.

22. Alberta Colour Painting, a different company, is named in six places:
    alberta-carousel.tsx, full-width-carousel.tsx, promotional-slider.tsx,
    SpecilaOfferContent.tsx (commented), and twice in an iframe title. Left
    over from whatever this site was built from. None is known to render
    today, but it has not been checked.

23. tailwind.config.js still prints two module-not-found warnings on every
    build, for tailwind-scrollbar and heroui(). Same as item 7, still open.


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
