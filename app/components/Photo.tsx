import Image from "next/image";
import { photos, photoUrl, coverUrl, type PhotoKey, type Photo as PhotoData } from "../lib/images";

// A photograph that fills its parent (give the parent a size, a position and overflow hidden).
// Pass `name` for a shared site photo, or `cover` for a photo that belongs to one article.
export default function Photo({ name, cover, sizes, priority = false, className }: { name?: PhotoKey; cover?: PhotoData; sizes: string; priority?: boolean; className?: string }) {
  const src = cover ? coverUrl(cover) : photoUrl(name ?? "tutoring");
  const alt = cover ? cover.alt : photos[name ?? "tutoring"].alt;
  return <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={className} style={{ objectFit: "cover" }} />;
}
