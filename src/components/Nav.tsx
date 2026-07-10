"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { altPath, localeOfPath, paths, t } from "@/lib/i18n";
import { site } from "@/lib/site";

export default function Nav() {
  const pathname = usePathname() || "/";
  const locale = localeOfPath(pathname);
  const dict = t[locale];
  const p = paths[locale];

  const isHome = pathname === "/" || pathname === "/en";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Over the dark photo hero the bar is transparent with light text;
  // everywhere else (and once scrolled) it is a solid paper bar with ink text.
  const overHero = isHome && !scrolled && !open;
  const textClass = overHero ? "text-paper" : "text-ink";

  const links = [
    { href: p.work, label: dict.nav.work },
    { href: p.studio, label: dict.nav.studio },
    { href: p.contact, label: dict.nav.contact },
  ];

  const isActive = (href: string) =>
    href === pathname || (href !== p.home && pathname.startsWith(href));

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        overHero
          ? "bg-transparent"
          : "bg-paper/85 backdrop-blur-md border-b border-line",
        textClass,
      ].join(" ")}
    >
      <div className="container-site flex h-[var(--nav-h)] items-center justify-between">
        <Link
          href={p.home}
          className="flex items-baseline gap-2 leading-none"
          aria-label={`${site.shortName} — home`}
        >
          <span className="text-[1.05rem] font-medium tracking-[-0.03em]">
            Studio Solito
          </span>
          <span
            className={[
              "hidden text-[0.6rem] uppercase tracking-[0.18em] sm:inline",
              overHero ? "text-paper/70" : "text-stone",
            ].join(" ")}
          >
            {dict.nav.tagline}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-8 text-sm">
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
          <LocaleToggle
            pathname={pathname}
            locale={locale}
            overHero={overHero}
          />
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
            <LocaleToggle pathname={pathname} locale={locale} overHero={false} />
          </div>
        </nav>
      </div>
    </header>
  );
}

function LocaleToggle({
  pathname,
  locale,
  overHero,
}: {
  pathname: string;
  locale: "it" | "en";
  overHero: boolean;
}) {
  const muted = overHero ? "text-paper/50" : "text-stone";
  const base = "text-xs uppercase tracking-[0.14em]";
  return (
    <div className={`flex items-center gap-2 ${base}`}>
      <Link
        href={altPath(pathname, "it")}
        aria-current={locale === "it" ? "true" : undefined}
        className={locale === "it" ? "font-medium" : `${muted} hover:opacity-100`}
      >
        IT
      </Link>
      <span className={muted} aria-hidden>
        /
      </span>
      <Link
        href={altPath(pathname, "en")}
        aria-current={locale === "en" ? "true" : undefined}
        className={locale === "en" ? "font-medium" : `${muted} hover:opacity-100`}
      >
        EN
      </Link>
    </div>
  );
}
