import type { Metadata, Viewport } from "next";
import { altPath, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

export const metadataBase = new URL(site.url);

export const viewport: Viewport = {
  themeColor: "#F5F4F2",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

/*
  Build a Metadata object for a page: localized title/description, canonical
  URL and hreflang alternates pointing at the same page in the other locale.
  Pass `absoluteTitle` for the home pages so the layout's title template
  ("%s — Studio Solito") is not appended.
*/
export function pageMetadata({
  locale,
  path,
  title,
  description,
  absoluteTitle = false,
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  absoluteTitle?: boolean;
}): Metadata {
  const itPath = altPath(path, "it");
  const enPath = altPath(path, "en");
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: path,
      languages: {
        it: itPath,
        en: enPath,
        "x-default": itPath,
      },
    },
    openGraph: {
      type: "website",
      siteName: site.shortName,
      locale: locale === "it" ? "it_IT" : "en_GB",
      title,
      description,
      url: path,
    },
  };
}
