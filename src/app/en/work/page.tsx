import type { Metadata } from "next";
import WorkView from "@/components/views/WorkView";
import { paths, t } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  locale: "en",
  path: paths.en.work,
  title: t.en.meta.workTitle,
  description: t.en.meta.workDescription,
});

export default function Page() {
  return <WorkView locale="en" />;
}
