import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  // Guides are written as .mdx files in /content/guides and imported by app/guides/[slug].
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  // Lets React's <ViewTransition> soften route changes (see app/template.tsx and site.css).
  experimental: {
    viewTransition: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

// Turbopack needs remark/rehype plugins referenced by package name, not imported functions.
const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-gfm"],
  },
});

export default withMDX(nextConfig);
