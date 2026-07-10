import type { Metadata } from "next";
import StudioView from "@/components/views/StudioView";
import { paths, t } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  locale: "en",
  path: paths.en.studio,
  title: t.en.meta.studioTitle,
  description: t.en.meta.studioDescription,
});

export default function Page() {
  return <StudioView locale="en" />;
}
