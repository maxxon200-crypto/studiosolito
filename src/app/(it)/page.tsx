import type { Metadata } from "next";
import HomeView from "@/components/views/HomeView";
import { paths, t } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  locale: "it",
  path: paths.it.home,
  title: t.it.meta.title,
  description: t.it.meta.description,
  absoluteTitle: true,
});

export default function Page() {
  return <HomeView locale="it" />;
}
