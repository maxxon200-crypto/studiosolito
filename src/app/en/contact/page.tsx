import type { Metadata } from "next";
import ContactView from "@/components/views/ContactView";
import { paths, t } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  locale: "en",
  path: paths.en.contact,
  title: t.en.meta.contactTitle,
  description: t.en.meta.contactDescription,
});

export default function Page() {
  return <ContactView locale="en" />;
}
