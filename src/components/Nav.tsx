"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { altPath, localeOfPath, paths, t } from "@/lib/i18n";
import { site } from "@/lib/site";

/*
  Solid top bar throughout — a translucent paper bar with a hairline and ink
  text. (There is no dark photo hero to sit transparently over.)
*/
export default function Nav() {
  const pathname = usePathname() || "/";
  const locale = localeOfPath(pathname);
  const dict = t[locale];
  const p = paths[locale];
  const [open, setOpen] = useState(false);

  const links = [
    { href: p.work, label: dict.nav.work },
    { href: p.studio, label: dict.nav.studio },
    { href: p.contact, label: dict.nav.contact },
  ];

  const isActive = (href: string) =>
    href === pathname || (href !== p.home && pathname.startsWith(href));

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-paper/85 text-ink backdrop-blur-md">
      <div className="container-site flex h-[var(--nav-h)] items-center justify-between">
        <Link
          href={p.home}
          className="flex items-baseline gap-2 leading-none"
          aria-label={`${site.shortName} — home`}
        >
          <span className="text-[1.05rem] font-medium tracking-[-0.03em]">
            Studio Solito
          </span>
          <span className="hidden text-[0.7rem] uppercase tracking-[0.16em] text-stone sm:inline">
            {dict.nav.tagline}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-8 text-[0.95rem]">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="link-line"
                  aria-current={isActive(l.href) ? "page" : undefined}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <LocaleToggle pathname={pathname} locale={locale} />
        </nav>

        <button
          type="button"
          className="md:hidden -mr-2 flex h-11 w-11 items-center justify-center"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Chiudi menu" : "Apri menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block h-3 w-6">
            <span
              className={[
                "absolute left-0 block h-px w-6 bg-current transition-transform duration-300",
                open ? "top-1.5 rotate-45" : "top-0",
              ].join(" ")}
            />
            <span
              className={[
                "absolute left-0 top-1.5 block h-px w-6 bg-current transition-opacity duration-300",
                open ? "opacity-0" : "opacity-100",
              ].join(" ")}
            />
            <span
              className={[
                "absolute left-0 block h-px w-6 bg-current transition-transform duration-300",
                open ? "top-1.5 -rotate-45" : "top-3",
              ].join(" ")}
            />
          </span>
        </button>
      </div>

      {/* Mobile panel */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="border-t border-line bg-paper text-ink md:hidden"
      >
        <nav
          className="container-site flex flex-col gap-1 py-6"
          onClick={() => setOpen(false)}
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="py-3 text-title"
              style={{ fontSize: "clamp(1.75rem, 9vw, 2.5rem)" }}
              aria-current={isActive(l.href) ? "page" : undefined}
            >
              {l.label}
            </Link>
          ))}
          <div className="mt-4 border-t border-line pt-5">
            <LocaleToggle pathname={pathname} locale={locale} />
          </div>
        </nav>
      </div>
    </header>
  );
}

function LocaleToggle({
  pathname,
  locale,
}: {
  pathname: string;
  locale: "it" | "en";
}) {
  const base = "text-[0.8rem] uppercase tracking-[0.14em]";
  return (
    <div className={`flex items-center gap-2 ${base}`}>
      <Link
        href={altPath(pathname, "it")}
        aria-current={locale === "it" ? "true" : undefined}
        className={locale === "it" ? "font-medium" : "text-stone hover:text-ink"}
      >
        IT
      </Link>
      <span className="text-stone" aria-hidden>
        /
      </span>
      <Link
        href={altPath(pathname, "en")}
        aria-current={locale === "en" ? "true" : undefined}
        className={locale === "en" ? "font-medium" : "text-stone hover:text-ink"}
      >
        EN
      </Link>
    </div>
  );
}
