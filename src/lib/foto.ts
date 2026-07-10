import type { Locale } from "@/lib/i18n";

/*
  Photo slots.

  The site ships with clean LABELED PLACEHOLDERS — a neutral --bone box with a
  small centered label naming the photo that belongs there (rendered by
  Media.tsx). No photographic imagery is bundled. Real client photos get
  dropped in later: add the file, then point Media at it for that slot.

  Each slot carries a short label used inside the placeholder.
*/
export type FotoKey =
  | "01"
  | "02"
  | "03"
  | "04"
  | "05"
  | "06"
  | "07"
  | "08"
  | "09"
  | "10";

export const fotoMeta: Record<FotoKey, { label: Record<Locale, string> }> = {
  "01": { label: { it: "Cucina", en: "Kitchen" } },
  "02": { label: { it: "Living", en: "Living" } },
  "03": { label: { it: "Zona giorno", en: "Living area" } },
  "04": { label: { it: "Bagno", en: "Bathroom" } },
  "05": { label: { it: "Camera", en: "Bedroom" } },
  "06": { label: { it: "Dettaglio", en: "Detail" } },
  "07": { label: { it: "Cucina", en: "Kitchen" } },
  "08": { label: { it: "Zona pranzo", en: "Dining" } },
  "09": { label: { it: "Zona giorno", en: "Living area" } },
  "10": { label: { it: "Dettaglio bagno", en: "Bath detail" } },
};
