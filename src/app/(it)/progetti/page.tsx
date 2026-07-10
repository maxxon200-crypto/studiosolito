import type { Metadata } from "next";
import WorkView from "@/components/views/WorkView";
import { paths, t } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  locale: "it",
  path: paths.it.work,
  title: t.it.meta.workTitle,
  description: t.it.meta.workDescription,
});

export default function Page() {
  return <WorkView locale="it" />;
}
