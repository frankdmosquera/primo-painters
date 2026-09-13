# primo-painters

1. Ask != go. A question, a comment, or a paste is not an instruction. Answer in words. No reading, grepping, or editing until we agree.
2. On point. No story.
3. Never delete an image. Repoint the reference, leave the file on disk.
4. Never push to `main` without full authorization. Merging there publishes the live site.
5. Never assume. Name the consequence, get approval, then act.
6. Rules stay in this project. Nothing written to workspace files or my memory unless you say.
7. The old md files are gone. Never cited, never restored.
8. One bite at a time. One change, then stop and wait for me. If it has smaller parts, same rule for each. Never show me the whole plan at once.
9. Rules are hard stops, not permission requests. Never offer me an option a rule already forbids. If a rule should change, say so and we change the rule first.
10. End every message with one question on its own line. Never guess what a "yes" means - if more than one thing is open, name them and ask which. A reply landing seconds after mine may not have read it, so confirm rather than assume.
11. Parked is not dropped. When something gets set aside, keep it on a visible list and bring it back. Never let a, b, c quietly become just a.
12. A slow, winding reply is you thinking out loud. The middle is processing, the end is the decision. Act on the conclusion, not the working out.
13. When you name something slightly wrong, say the correct name and check before building on it. Never quietly reinterpret a small slip into a different approach.
14. Never install anything. No npm, no packages, no dependencies, ever, without asking first. Never install and report it after. If it is two seconds of hand-written code, write it instead of adding a package.
15. Apply what is already decided. If the file already answers the question, act on it and say which line you used. Never ask me to re-decide something that is already written down.

# Our stack

Next 16, React 19, Tailwind 4, TypeScript 5.
Components: shadcn first. Then a free library built on shadcn. Our own last, and if it is ours it ships optimized, SEO clean and accessible.
Forms: react-hook-form. Wire shadcn form pieces the react-hook-form way, theirs is not updated.
Validation: zod.
Email: Resend.
Images: ImageKit.
Reviews: reuse the existing widget or the logic from the-latam-painters, wired to Google.
Server first. "use client" only where needed, isolated behind a wrapper that takes children.
Dynamic routes: generateStaticParams, prerendered at build.
Nothing gets uninstalled up front. Migrate section by section as we touch it, so every break has one source. Old packages come out at the end, when nothing imports them.
The whole site is a template. All content - copy, headings, service lists, images, contact details, all of it - comes from config and data files. Nothing hardcoded in components. A new client means a new config, not new components.
Structured data: JSON-LD only. No microdata, no RDFa. Each entity described once, never marked up twice. Split blocks per page and link them by @id rather than redescribing the business.
Always the latest package versions. No hand-pinning. Latest at install time, then the lockfile holds it. Upgrading later is a deliberate decision, never automatic.
No Radix. shadcn on Base UI. lucide for icons.
Content and SEO hold still. This is a design pass. Copy, headings, alt text, meta and JSON-LD stay unless I approve a change. New sections may get added where the design needs one - that is my call, not yours. Prove nothing moved with the SEO baseline in scripts/, not by eye.
Design target: the-latam-painters. Take its design as closely as possible and bring Primo's content into it - design from LATAM, content from Primo. This site ranks, so every move is made with extreme care. Nothing is called done until it is verified against the SEO baseline.
