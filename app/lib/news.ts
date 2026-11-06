import { newsEntries } from "./news-entries";

// Metadata for every news item. The body lives in content/news/<slug>.mdx.
// Education news explains what a change or deadline means for parents; company news covers Britannia Crown itself.
export type NewsKind = "Education news" | "Company news";

export type NewsItem = {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  kind: NewsKind;
  published: string;
  updated: string;
  related: { services: string[]; guides: string[] };
};

export const news: NewsItem[] = [...newsEntries].sort((a, b) => b.published.localeCompare(a.published) || a.title.localeCompare(b.title));

export const getNews = (slug: string) => news.find((n) => n.slug === slug);
