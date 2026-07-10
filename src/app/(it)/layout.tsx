import type { Metadata } from "next";
import "../globals.css";
import RootShell from "@/components/RootShell";
import { t } from "@/lib/i18n";
import { metadataBase, viewport as vp } from "@/lib/metadata";
import { site } from "@/lib/site";

export const viewport = vp;

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: t.it.meta.title,
    template: `%s — ${site.shortName}`,
  },
  description: t.it.meta.description,
  applicationName: site.shortName,
  authors: [{ name: site.name }],
  icons: { icon: "/icon.svg" },
};

export default function ItLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RootShell lang="it">{children}</RootShell>;
}
