import { fotoMeta, type FotoKey } from "@/lib/foto";
import type { Locale } from "@/lib/i18n";

/*
  Labeled photo placeholder.

  Fills its (aspect-ratio'd) parent with a neutral --bone box, a subtle image
  icon and a small centered label naming the photo that belongs there. This is
  the intended state for now — no photographic imagery is used. When a real
  photo is supplied for a slot, swap this component's body for a next/image at
  that call site.

  `size` tunes the icon/label for large heroes vs small grid thumbnails.
  `label` overrides the slot's default label (e.g. "Ritratto studio").
*/
export default function Media({
  name,
  locale,
  label,
  size = "md",
  className,
}: {
  name: FotoKey;
  locale: Locale;
  label?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const text = label ?? fotoMeta[name].label[locale];
  const icon =
    size === "lg" ? "h-12 w-12" : size === "sm" ? "h-6 w-6" : "h-8 w-8";

  return (
    <div
      className={[
        "absolute inset-0 flex h-full w-full items-center justify-center",
        "bg-bone",
        className ?? "",
      ].join(" ")}
    >
      <span className="pointer-events-none absolute inset-3 border border-line/70" />
      <span className="flex flex-col items-center gap-3 px-4 text-center text-stone">
        <ImageIcon className={icon} />
        <span className="eyebrow text-ink/70">{text}</span>
      </span>
    </div>
  );
}

function ImageIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="4.5" width="18" height="15" rx="1.5" />
      <circle cx="8.5" cy="9.5" r="1.6" />
      <path d="M4 16.5l4.5-4 3.5 3 3-2.5 5 4.5" />
    </svg>
  );
}
