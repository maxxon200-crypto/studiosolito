import type { Metadata } from "next";
import ContactView from "@/components/views/ContactView";
import { paths, t } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  locale: "it",
  path: paths.it.contact,
  title: t.it.meta.contactTitle,
  description: t.it.meta.contactDescription,
});

export default function Page() {
  return <ContactView locale="it" />;
}
