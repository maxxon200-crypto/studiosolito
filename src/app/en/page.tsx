import type { Metadata } from "next";
import HomeView from "@/components/views/HomeView";
import { paths, t } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  locale: "en",
  path: paths.en.home,
  title: t.en.meta.title,
  description: t.en.meta.description,
  absoluteTitle: true,
});

export default function Page() {
  return <HomeView locale="en" />;
}
