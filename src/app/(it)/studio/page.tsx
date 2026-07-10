import type { Metadata } from "next";
import StudioView from "@/components/views/StudioView";
import { paths, t } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  locale: "it",
  path: paths.it.studio,
  title: t.it.meta.studioTitle,
  description: t.it.meta.studioDescription,
});

export default function Page() {
  return <StudioView locale="it" />;
}
