import type { StaticImageData } from "next/image";
import type { Locale } from "@/lib/i18n";

/*
  Project photography lives in /public/foto as progetto-01 … progetto-10.
  Static imports give next/image intrinsic sizes and automatic blur
  placeholders. To swap in real photos, replace the files and keep the
  names (see scripts/fetch-foto.mjs and the README).
*/
import p01 from "../../public/foto/progetto-01.jpg";
import p02 from "../../public/foto/progetto-02.jpg";
import p03 from "../../public/foto/progetto-03.jpg";
import p04 from "../../public/foto/progetto-04.jpg";
import p05 from "../../public/foto/progetto-05.jpg";
import p06 from "../../public/foto/progetto-06.jpg";
import p07 from "../../public/foto/progetto-07.jpg";
import p08 from "../../public/foto/progetto-08.jpg";
import p09 from "../../public/foto/progetto-09.jpg";
import p10 from "../../public/foto/progetto-10.jpg";

export const foto = {
  "01": p01,
  "02": p02,
  "03": p03,
  "04": p04,
  "05": p05,
  "06": p06,
  "07": p07,
  "08": p08,
  "09": p09,
  "10": p10,
} satisfies Record<string, StaticImageData>;

export type FotoKey = keyof typeof foto;

/* Subject descriptions, used to compose alt text. */
export const fotoAlt: Record<FotoKey, Record<Locale, string>> = {
  "01": {
    it: "Cucina con isola in rovere e ante laccate opache",
    en: "Kitchen with oak island and matte lacquered cabinets",
  },
  "02": {
    it: "Soggiorno con divano in tessuto e parquet a spina",
    en: "Living room with fabric sofa and chevron parquet",
  },
  "03": {
    it: "Zona giorno open space con cucina e pranzo",
    en: "Open-plan living area with kitchen and dining",
  },
  "04": {
    it: "Bagno in microcemento con doccia walk-in e lavabo in pietra",
    en: "Microcement bathroom with walk-in shower and stone basin",
  },
  "05": {
    it: "Camera da letto con boiserie in rovere e biancheria di lino",
    en: "Bedroom with oak panelling and linen bedding",
  },
  "06": {
    it: "Dettaglio di armadiatura su misura in rovere",
    en: "Detail of bespoke oak wardrobe joinery",
  },
  "07": {
    it: "Cucina laccata color tortora con mensole in rovere",
    en: "Taupe lacquered kitchen with oak shelving",
  },
  "08": {
    it: "Angolo pranzo con tavolo rotondo in rovere e lampada a sospensione",
    en: "Dining corner with round oak table and pendant lamp",
  },
  "09": {
    it: "Zona giorno e pranzo con vetrata a tutta altezza",
    en: "Living and dining space with full-height window",
  },
  "10": {
    it: "Dettaglio del lavabo in pietra con rubinetteria bronzo",
    en: "Detail of stone washbasin with bronze fixtures",
  },
};
