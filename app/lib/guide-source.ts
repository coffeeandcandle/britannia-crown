import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { slugify } from "./slug";

// Server-only: reads a guide's MDX source at build time to build its
// "On this page" list and reading time. Keep out of client components.
export async function readGuideSource(slug: string) {
  const source = await readFile(join(process.cwd(), "content/guides", `${slug}.mdx`), "utf8");

  const toc = [...source.matchAll(/^## (.+)$/gm)].map((m) => {
    const text = m[1].replace(/\*\*|__|`/g, "").trim();
    return { text, id: slugify(text) };
  });

  // Count prose words only: drop JSX tags, Markdown links' URLs and table rules.
  const prose = source
    .replace(/<[^>]+>/g, " ")
    .replace(/\]\([^)]*\)/g, "]")
    .replace(/[|#*>_`-]/g, " ");
  const words = prose.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 220));

  return { toc, minutes };
}
