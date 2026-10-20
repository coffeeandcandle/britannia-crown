import Image from "next/image";
import { photos, photoUrl, type PhotoKey } from "../lib/images";

// A photograph that fills its parent (give the parent a size, a position and overflow hidden).
export default function Photo({ name, sizes, priority = false, className }: { name: PhotoKey; sizes: string; priority?: boolean; className?: string }) {
  return <Image src={photoUrl(name)} alt={photos[name].alt} fill sizes={sizes} priority={priority} className={className} style={{ objectFit: "cover" }} />;
}
