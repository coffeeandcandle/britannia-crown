// Turns a heading into a URL fragment, e.g. "When do applications close?" -> "when-do-applications-close".
// Used both for heading ids in guides and for the "On this page" contents list, so they always match.
export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
