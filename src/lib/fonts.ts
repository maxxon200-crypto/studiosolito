import localFont from "next/font/local";

/*
  Space Grotesk, variable 300–700, self-hosted (SIL Open Font License).
  The single typeface of the site — no serif, no second family.
  Latin subset covers Italian and English fully.
*/
export const grotesk = localFont({
  src: "../fonts/SpaceGrotesk-latin.woff2",
  weight: "300 700",
  style: "normal",
  display: "swap",
  variable: "--font-grotesk",
});
