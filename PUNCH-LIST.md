# Punch list

Working notes for the design pass on this site. Last updated 2026-09-11.

This is a plain notes file, not a rules file. Nothing loads it automatically.
**If you are a session picking this repo up cold, read all of it before
touching anything.** It exists so Frank does not have to repeat himself.

Live tracker with per item status:
https://claude.ai/code/artifact/bb1d5edf-33d2-4e50-a21e-c32f797f4aef

---

## 1. The standing rule

**This site ranks and that ranking is the asset.** It went live around July
2026 and sits on page 2 for a lot of Calgary interior painting terms. Frank
does not run the painting business, he intends to sell it, and the ranking is
what is being sold.

So:

- Headings, body copy, metadata, canonicals and URLs **do not move**.
- Spacing, markup, classes and brand new pages are fair game.
- **Anything that would change a rendered word gets proposed first, never done
  first.** He will usually say yes. Ask anyway.

Two things he will correct you on if you get them wrong, both settled already:

- **Client vs server is not what protects the ranking.** Client components
  still server render; Google sees the same HTML either way. What protects it
  is unchanged text, unchanged URLs and no speed regression.
- **Accessibility is not an SEO ranking factor**, and neither is `rem` vs `px`.
  The genuine overlaps are alt text, heading structure, link text and tap
  target size. Do not oversell the rest.

## 2. How Frank wants to work

Learned over a long session on 2026-09-11. Getting this wrong wastes his time.

- **Name the files you intend to change, then wait.** Do not propose a list and
  execute its first item in the same message. The list is its own checkpoint.
- **A question is not a go signal.** "What is next?", "what do you think?" and
  "how does that work?" ask for an answer, not for work to begin. Reading
  files and running greps counts as beginning.
- **One step, then stop and let him look.** He walks the code himself.
- **Keep answers short.** He dictates by voice, so read for intent and ask when
  a word does not fit rather than guessing.
- Stay in the project stack. Node and TypeScript only; never introduce another
  runtime, not even for a throwaway string replacement.
- He is an SEO person and a painter as well as a coder. His instincts about
  detail are good and have caught several real bugs. Take them seriously.

## 3. Sizing: rem first

```
1. a named Tailwind class when one lands exactly   text-[20px] -> text-xl
2. a rem bracket value when nothing fits           text-[44px] -> text-[2.75rem]
3. px only when there is no choice                 borders, hairlines, shadows
```

Prefer `clamp()` over a fixed size plus breakpoint overrides for display
headings. Convert as you touch a file, not in a sweep, and tell him which file.

## 4. Repo state

- Branch **`design-pass`**, cut from `78b5867`. Eight commits as of
  2026-09-11. Working tree clean.
- `main` and `claude` are both still at `78b5867`, untouched, in sync with
  GitHub. `78b5867` is the live site.
- **Nothing has been pushed.** Never push or commit unless asked.
- Remote is `github.com/frankdmosquera/primo-painting.git`. Note the repo is
  named primo-**painting**, the folder is primo-**painters**.
- Package name is `alberta`. Historical, not a different project.
- There is no `CLAUDE.md`, no `AGENTS.md` and no `blueprint/` kit here. That is
  deliberate; see the workspace `ai-web-agency/CLAUDE.md`. Do not seed one.
- `stash@{0}` is "image fixes 2026-09-10, abandoned". Do not restore it.

**Unanswered and it matters: nobody has confirmed where primopainters.ca is
hosted.** If a host builds from `main`, merging there is deploying. Settle that
before anything reaches `main`.

## 5. Before any edit

Read `scripts/README.md`. It explains the snapshot tool and the baseline, which
are how "the text did not move" gets proved instead of assumed.

Short version: `npm run build`, `npx next start -p 3005`, capture the five
pages, `node scripts/seo-snapshot.mjs`, diff against `scripts/seo-baseline`.

**Do not use the dev server for this.** Its on-demand image optimiser stalls
under this many images and every measurement comes out wrong.

## 6. What is done

All committed on `design-pass`.

| Area | What changed |
|---|---|
| Fonts | Poppins headings, Roboto body, self hosted via `next/font`. Geist, Geist Mono and Bricolage removed, none were used. Google Fonts link and both preconnects gone. Decided in `globals.css` alone; it used to be decided in two places that disagreed |
| Navigation | `data/navigationData.ts` is the single source. Header, mobile menu and footer read from it. Four hardcoded lists had drifted apart |
| Header | Phone from siteConfig, shrinks on scroll 108px to 69px, quiet nav with an underlined active link, `z-50` instead of `z-[99999]`, rem font sizes |
| Mobile menu | Full screen, was pinned at 630px. Nav icons, active state, tap to call. Book Now closes the menu and opens Calendly in one tap |
| Ticker | Expired promo date fixed, compact uppercase treatment, respects `prefers-reduced-motion` |
| Footer | Social icons driven by `siteConfig.social`, real link when a URL exists and an inert span when empty. px to rem and clamp. Empty `<Link>` deleted |
| Hero | No height at all; padding sets it and the fill image follows. One gradient scrim instead of two stacked darkeners. `CALGARY'S` on its own line by structure. `box-decoration-break: clone` on the highlight |
| Booking card | Rebuilt from a snipped SVG into real markup. Dot grid, not numerals, so it adds no text |
| Services | `forceMount` so all six service descriptions are in the HTML, not just Interior |
| Gallery, mobile | Peek carousel at 86% width, `snap-always`, progress rail instead of the black thumbnail strip |
| Thumbnails | `sizes="32px"`. They were fetching the 63KB variant for a 20px box, about 110x too big |
| Calendly | One modal for the site via `components/calendly-provider.tsx`. Was three. URL lives only in `siteConfig.booking.calendlyUrl`. Every Book Now opens it; `/booking` links on the home page went 5 to 0 |
| Loader | The hourglass from `/booking` now also covers the popup, cleared by Calendly's own event, the iframe load, or a 6 second ceiling |
| Fixes | `tel:123456789` placeholder was live. Duplicate robots meta contradicted noindex on `/thank-you`. `<button>` nested in a `<Link>`. Dead `hero.css` shipped on every homepage |

## 7. What is open

Roughly by value.

**1. Alt text on 16 images.** All 8 wall painting images plus 8 more have
`alt: ""` in `data/images.ts`. Wall painting is the niche keyword. This is the
one accessibility item that genuinely doubles as SEO, and `forceMount` just
made every one of them visible to Google. The filenames describe nothing, so
each photo has to be opened and looked at. Match the pattern already in that
file: what the photo shows, a hyphen, then the keyword plus Calgary. For
example "Stained oak railing prior to being painted white - railing painting
Calgary".

**2. The drywall image 404s on the live site.** The file on disk is
`public/interior-painting/drywall-repair/garage-drywall-repair-calgary-after-finished.jpg.jpg`
and `data/images.ts:70` asks for the single extension name. Rename the file
rather than the reference.

**3. The remaining home page blocks**, in render order: why choose us, reviews,
service banner, the calgary painting block, the FAQ accordion, the closing CTA.

**4. The inline Calendly embed.** `components/ServiceBanner/service-banner.tsx`
renders a full viewport height Calendly iframe. ServiceBanner is on the home
page and the about page, and contact and booking embed it directly, so four of
five pages load a Calendly iframe on arrival. It is the heaviest third party
thing on the site.

**5. `/booking` padding.** The widget starts 547px down a 768px viewport, and
the "Loading calendar, please wait…" message sits at 911px, below the fold. So
visitors see a blank blue band and think it is broken. Frank has had real
complaints about this. **The fix is padding, not deleting copy.** He explicitly
does not want the heading removed.

**6. The service tabs wrap** into two ragged rows on mobile. A single
horizontally scrollable row would read as intentional.

**7. Footer contact block.** Phone and email from siteConfig.

**The street address is deferred, not rejected.** Decided 2026-09-11: leave
`217 Legacy Reach Cres SE` out for now and revisit later. It may be his home
address, which is the reason for the pause. Worth knowing when it comes back
up: a consistent name, address and phone across the site and the Google
Business Profile is one of the few genuine local ranking signals, so adding it
later is a real improvement rather than cosmetics. The block can be built with
phone and email now and the address dropped in when he decides.

**8. Then the about page, contact page, and the six service pages.**

## 9. Decisions already settled, do not reopen

- **One card on the home page, Interior Painting, is deliberate.** The niche
  strategy is to own interior first. Walls, ceilings, trim, doors, garages and
  cabinets are all sub services of interior, so pages about them **reinforce**
  the niche rather than dilute it. Exterior or commercial would dilute it.
- **`/booking` is deliberately not in the navigation.** It stays live and in
  the sitemap as a landing page for Google Business Profile and shared links.
  Keeping it unlinked means every visit to it is provably external.
- **Book Now opens the Calendly popup everywhere**, it does not navigate.
- **The booking card uses dots, not numbers.** Invented numerals that look like
  real dates are dishonest, and they wrote 37 junk characters into the page.
- **Social icons all look identical** whether or not the account exists. The
  inert ones are `<span>`, not `<a>`.
- **Do not blanket replace "Primo Painting" with "Primo Painters."** The
  business is Painters, but the Calendly account slug really is
  `primo-painting` and renaming it in code breaks booking. Brand text in live
  files already reads from `siteConfig.business.name`.
- **The ~37 unreachable components stay.** Deleting them was cut as too close
  to a full rebuild. Same for removing HeroUI, which only `Faq/index.tsx` uses,
  and framer-motion, which only the ticker uses.

## 10. Questions waiting on Frank

1. Where is primopainters.ca hosted, and does `main` auto deploy?
2. ~~Does the street address go in the footer?~~ Answered 2026-09-11: not for
   now, revisit later. See item 7.
3. Is the YouTube channel really `@Primo-Painting`? `siteConfig.social.youtube`
   is empty with a note, because the handle looked wrong and a dead link is
   worse than no link.
4. Does he want real dates in the booking card later, pulled from Calendly's
   API? That was parked as the honest version of showing numbers.

## 11. Related

`../primo-painters-v2` was the from scratch rebuild of this site. **That goal
was retired on 2026-09-11.** It stays parked and gets redone later as a
template for a different painting company. It is not the future of this site.
