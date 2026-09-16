// Extracts only the parts of a rendered page that a search engine cares about:
// title, meta tags, canonical, JSON-LD, headings and visible text.
// Markup, classes and attributes are deliberately thrown away, so a pure design
// change produces a byte-identical snapshot and shows up as an empty diff.
//
//   node seo-snapshot.mjs <in-dir-of-html> <out-dir>
//
// Compare two runs with:  diff -ru baseline/ after/

import { readFileSync, writeFileSync, readdirSync, mkdirSync } from "node:fs";
import { join, basename } from "node:path";

const ENTITIES = {
  "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"',
  "&#39;": "'", "&apos;": "'", "&nbsp;": " ", "&#x27;": "'",
};

function decode(s) {
  return s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&[a-z#0-9]+;/gi, (m) => ENTITIES[m.toLowerCase()] ?? m);
}

function norm(s) {
  return decode(s).replace(/\s+/g, " ").trim();
}

function attrs(tag) {
  const out = {};
  const re = /([a-zA-Z-:]+)\s*=\s*("([^"]*)"|'([^']*)')/g;
  let m;
  while ((m = re.exec(tag))) out[m[1].toLowerCase()] = m[3] ?? m[4] ?? "";
  return out;
}

function snapshot(html) {
  const lines = [];

  // --- title ---
  const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  lines.push("# TITLE");
  lines.push(title ? norm(title[1]) : "(none)");
  lines.push("");

  // --- meta, sorted so attribute order never shows up as a diff ---
  lines.push("# META");
  const metas = [];
  for (const m of html.matchAll(/<meta\b[^>]*>/gi)) {
    const a = attrs(m[0]);
    const key = a.name ?? a.property ?? a.charset ?? a["http-equiv"];
    if (!key) continue;
    metas.push(`${key} = ${norm(a.content ?? a.charset ?? "")}`);
  }
  lines.push(...[...new Set(metas)].sort());
  lines.push("");

  // --- canonical and alternates ---
  lines.push("# LINK REL");
  const links = [];
  for (const m of html.matchAll(/<link\b[^>]*>/gi)) {
    const a = attrs(m[0]);
    if (!a.rel) continue;
    if (!["canonical", "alternate", "next", "prev"].includes(a.rel.toLowerCase())) continue;
    links.push(`${a.rel} = ${a.href ?? ""}`);
  }
  lines.push(...links.sort());
  lines.push("");

  // --- JSON-LD, parsed and re-stringified so key order is stable ---
  lines.push("# JSON-LD");
  const blocks = [];
  for (const m of html.matchAll(
    /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi
  )) {
    try {
      blocks.push(JSON.stringify(JSON.parse(decode(m[1].trim())), null, 1));
    } catch {
      blocks.push("(unparseable) " + norm(m[1]));
    }
  }
  lines.push(...blocks.sort());
  lines.push("");

  // --- strip everything that is not prose ---
  const body = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<svg[\s\S]*?<\/svg>/gi, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ");

  // --- headings, in document order, level included ---
  lines.push("# HEADINGS");
  for (const m of body.matchAll(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi)) {
    const text = norm(m[2].replace(/<[^>]+>/g, " "));
    if (text) lines.push(`h${m[1]}: ${text}`);
  }
  lines.push("");

  // --- image alt text, which is content, not markup ---
  lines.push("# IMG ALT");
  const alts = [];
  for (const m of body.matchAll(/<img\b[^>]*>/gi)) {
    const a = attrs(m[0]);
    if (a.alt !== undefined) alts.push(norm(a.alt) || "(empty)");
  }
  lines.push(...alts.sort());
  lines.push("");

  // --- all remaining visible text, one block per line ---
  lines.push("# TEXT");
  const text = body
    .replace(/<(br|p|div|li|tr|section|article|h[1-6])\b[^>]*>/gi, "\n")
    .replace(/<\/(p|div|li|tr|section|article|h[1-6])>/gi, "\n")
    .replace(/<[^>]+>/g, " ");
  for (const raw of text.split("\n")) {
    const t = norm(raw);
    if (t) lines.push(t);
  }

  return lines.join("\n") + "\n";
}

const [inDir, outDir] = process.argv.slice(2);
if (!inDir || !outDir) {
  console.error("usage: node seo-snapshot.mjs <in-dir> <out-dir>");
  process.exit(1);
}
mkdirSync(outDir, { recursive: true });

let n = 0;
for (const f of readdirSync(inDir).filter((f) => f.endsWith(".html")).sort()) {
  if (basename(f).startsWith("_")) continue;
  const out = join(outDir, basename(f, ".html") + ".txt");
  writeFileSync(out, snapshot(readFileSync(join(inDir, f), "utf8")), "utf8");
  console.log("wrote " + out);
  n++;
}
console.log(n + " pages captured");
