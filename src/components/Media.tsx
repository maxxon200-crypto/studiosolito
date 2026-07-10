import Image from "next/image";
import { foto, fotoAlt, type FotoKey } from "@/lib/foto";
import type { Locale } from "@/lib/i18n";

/*
  A single project photo. Fills its (aspect-ratio'd) parent, lazy by default,
  with the auto-generated blur placeholder. `zoom` adds the slow hover scale
  (CSS-only, pointer + motion-safe). `preload` is for the LCP hero image
  (Next 16 replaced the `priority` prop with `preload`).
*/
export default function Media({
  name,
  locale,
  sizes,
  className,
  zoom = true,
  preload = false,
  loading,
}: {
  name: FotoKey;
  locale: Locale;
  sizes: string;
  className?: string;
  zoom?: boolean;
  preload?: boolean;
  loading?: "eager" | "lazy";
}) {
  const src = foto[name];
  const alt = fotoAlt[name][locale];

  return (
    <div
      className={[
        "relative h-full w-full overflow-hidden bg-bone",
        zoom ? "media-zoom" : "",
        className ?? "",
      ].join(" ")}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        placeholder="blur"
        preload={preload}
        loading={loading}
        className="object-cover"
      />
    </div>
  );
}
