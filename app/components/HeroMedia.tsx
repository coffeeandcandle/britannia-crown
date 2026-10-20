import Photo from "./Photo";
import type { PhotoKey } from "../lib/images";

// The photo for a page's dark hero: a fading panel on the right on desktop, and a rounded banner under
// the text on phones. Place it inside the hero's .uk-wrap (the hero itself is position: relative).
export default function HeroMedia({ name, priority = true }: { name: PhotoKey; priority?: boolean }) {
  return (
    <div className="hero-media">
      <Photo name={name} sizes="(min-width: 1000px) 40vw, 100vw" priority={priority} />
    </div>
  );
}
