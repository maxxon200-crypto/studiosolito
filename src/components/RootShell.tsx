import type { ReactNode } from "react";
import { grotesk } from "@/lib/fonts";
import { t, type Locale } from "@/lib/i18n";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import LenisProvider from "@/components/LenisProvider";

/*
  The document shell shared by both locale root layouts. Rendering <html> here
  (rather than in a single global root) lets each locale set the correct
  `lang` attribute — the Next 16 multiple-root-layouts pattern.
*/
export default function RootShell({
  lang,
  children,
}: {
  lang: Locale;
  children: ReactNode;
}) {
  return (
    <html
      lang={lang}
      className={`${grotesk.variable} h-full`}
      data-scroll-behavior="smooth"
    >
      <body className="flex min-h-full flex-col antialiased">
        <a href="#main" className="skip-link">
          {t[lang].skipToContent}
        </a>
        <LenisProvider />
        <Nav />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
