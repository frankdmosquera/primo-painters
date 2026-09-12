# Design plan

How to make this site look like a modern site without moving its rankings.
Written 2026-09-11, after a full read of both this home page and
`../the-latam-painters`.

Read `PUNCH-LIST.md` first. This file assumes the standing rule from it: the
text does not move.

---

## 1. The diagnosis

**Latam does not look modern because of shadcn.** It looks modern because every
decision in it was made once and then reused. One colour scale, one `--radius`,
one section rhythm, one card treatment, one reading width. Its components are
plain: `WhyUsHome.tsx` is a heading and five list items with a check icon.
There is nothing in it that could not be written by hand in twenty minutes.

**This site's problem is not old components. It is that it has no shared
vocabulary**, so every section re-decides its colour, width, padding and type
from scratch.

Measured on 2026-09-11, the left edge of each section at a 1024px viewport:

| Section | Left edge |
|---|---|
| House Painting Services | 96px |
| Why homeowners choose | 32px |
| Reviews | 112px |
| Interior Painting Done Right | 64px |
| Frequently Asked Questions | 20px |

Five sections, five different answers to the same question. That is what reads
as "not designed", and no component library fixes it.

### The token gap

| | this site | latam |
|---|---|---|
| Tokens | 3 | ~40, oklch |
| `--foreground` | `#ffffff` | a real ink colour |
| Brand colour | `#0D378D` hardcoded, 9 times in `whyChooseUs.tsx` alone | `--primary` |
| Radius | per component | `--radius: 0.625rem` |

`--background` and `--foreground` are **both** `#ffffff`. That is why
`bg-secondary` and `text-secondary-foreground` render as nothing: the tokens
those classes read do not exist. Several buttons on the site are currently
unstyled by accident because of it.

### What is already here

This repo is closer to shadcn than latam was before it adopted it. Already
installed: `@radix-ui/react-accordion`, `-dialog`, `-tabs`, `-slot`,
`-navigation-menu`, plus `class-variance-authority`, `clsx`, `tailwind-merge`
and `lucide-react`. That is the entire shadcn foundation. Missing: only the
token layer and the component files.

`framer-motion` is also installed, which is the same library latam imports as
`motion`.

---

## 2. The phases

Ordered so each one makes the next cheaper. Phases 1 and 2 change no pixels on
the day they land, which is exactly why they go first.

### Phase 0 - the safety net

Run `scripts/seo-snapshot.mjs` and store the result before anything else.
Everything afterwards gets diffed against it. This is what turns "I think the
text did not move" into proof, and it is the reason the rest of this plan is
low risk rather than a gamble.

Production build only. The dev server's image handling makes every measurement
wrong; `scripts/README.md` explains it.

### Phase 1 - the token layer

A real set in `globals.css`: brand, ink, muted, surface, border, one radius,
one shadow. **Set every value to what the page already renders**, so the site
is pixel-identical the day it lands. Then replace hardcoded hexes as each file
is touched, never in a sweep.

- Visual change: none
- SEO exposure: none
- Nothing else in this plan works well without it

### Phase 2 - section rhythm

One `Section` wrapper owning max-width, horizontal padding and vertical
spacing. Single biggest "looks designed" lever available, and it is pure
markup. Fixes the five-left-edges table above in one move.

- Visual change: alignment only
- SEO exposure: none

### Phase 3 - motion

Port from latam:

| Component | Needs | Note |
|---|---|---|
| `ScrollReveal` | nothing | 25 lines, IntersectionObserver |
| `StepReveal` | motion | already installed as framer-motion |
| `SectionAccents` | motion | floating icons in the gutters, `lg` and up only |

Three rules, all of them load-bearing:

1. **Nothing above the fold animates.** Animating the hero is how a redesign
   damages LCP.
2. Everything respects `prefers-reduced-motion`.
3. Entry animations never gate whether content is visible, only how it arrives.

Known issue: `IntersectionObserver` and scroll events are both inert inside the
agent browser, so anything built on them has to be confirmed by hand in a real
browser. This bit a `Calendly` change on 2026-09-11.

### Phase 4 - components where they pay

Start with the FAQ accordion. Rebuilding it on `@radix-ui/react-accordion`,
already installed, allows dropping all four `@heroui/*` packages, which exist
for that one file. Cards for why-choose-us and the services grid after that.

- SEO exposure: none, as long as the Q&A text stays byte-identical.
  `data/faqJsonLd.ts` mirrors it and the two must match.

### Phase 5 - the gallery

Latam's `ProjectGalleryGrid` takes a `cardMode` prop: `"dialog"` opens a
lightbox, `"link"` routes each card to a real static page. The second is an SEO
**gain**, not just a look, if it is pointed at the service pages.

**Do this last, and carefully.** The gallery here lives inside the services
tabs, and `forceMount` on those tabs is what puts all six service descriptions
in the HTML. Replacing the gallery without understanding that relationship is
how content disappears from the page without anyone noticing.

### Phase 6 - weight

Genuinely unused, safe to remove: `react-hot-toast`, `mini-svg-data-uri`,
`tailwind-scrollbar`.

Everything else needs a reachability check rather than an import count.
`swiper` appears in 11 files and `framer-motion` in 9, but most of those are
the ~37 components no route reaches. Import count is not the question;
reachability is.

---

## 3. What not to do

**Do not change the breakpoints.** They are custom and every responsive
decision on the site is calibrated to them:

| | this site | Tailwind default |
|---|---|---|
| `sm` | 37.5rem / 600px | 640px |
| `md` | 47.5rem / 760px | 768px |
| `lg` | 57.5rem / 920px | 1024px |
| `xl` | 65rem / 1040px | 1280px |
| `2xl` | 80rem / 1280px | 1536px |

Changing them shifts every breakpoint decision at once, with no way to tell
what broke. Also: do not reason about this site's layout from Tailwind
defaults. `lg` here is 920px.

**Do not do it as a rebuild.** Redesigns lose rankings because someone improves
copy in passing, or tidies a URL, or drops a page that was ranking. Section by
section with the text held fixed is the entire safety mechanism.

**Do not start with the visible work.** Tokens and rhythm are invisible and
unsatisfying, and every phase after them is faster and more consistent because
they exist.

---

## 4. Why this is safe

What holds a ranking: the words on the page, the URLs, the internal links, the
speed, and off-site authority.

What makes a site look modern: spacing, type scale, colour, component quality,
imagery, motion.

Those two lists barely intersect. The only real overlaps are speed, which
Phase 3 and Phase 6 are written to protect, and accidental text movement, which
Phase 0 exists to catch.

Demonstrated on 2026-09-11: the hero, services grid, gallery, why-choose-us,
reviews, FAQ, closing CTA, service banner and three photographs were all
rebuilt in a single session. The only rendered text that changed was a hidden
keyword span removed on purpose, two alt attributes, and one approved CTA line.
That was not luck. It was the rule.
