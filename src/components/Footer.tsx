"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localeOfPath, paths, t } from "@/lib/i18n";
import { site } from "@/lib/site";

/*
  Inverted footer — ink ground, paper text (Bloom-style), matching the
  contact section it follows.
*/
export default function Footer() {
  const pathname = usePathname() || "/";
  const locale = localeOfPath(pathname);
  const dict = t[locale];
  const p = paths[locale];
  const year = 2026; // Date.now() is unavailable at build; refreshed on releases.

  const links = [
    { href: p.home, label: dict.nav.home },
    { href: p.work, label: dict.nav.work },
    { href: p.studio, label: dict.nav.studio },
    { href: p.contact, label: dict.nav.contact },
  ];

  return (
    <footer className="bg-ink text-paper">
      <div className="container-site grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr] md:py-20">
        <div className="max-w-sm">
          <p className="text-[1.15rem] font-medium tracking-[-0.03em]">
            {site.name}
          </p>
          <p className="mt-4 text-[0.95rem] leading-relaxed text-paper/70">
            {dict.footer.description}
          </p>
        </div>

        <nav>
          <p className="eyebrow text-paper/85">{dict.footer.nav}</p>
          <ul className="mt-5 space-y-2.5 text-[0.95rem]">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="link-line text-paper/85">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="eyebrow text-paper/85">{dict.footer.contacts}</p>
          <address className="mt-5 space-y-2.5 text-[0.95rem] not-italic text-paper/85">
            <p>
              {site.address.street}
              <br />
              {site.address.city}
            </p>
            <p>
              <a href={site.phone.href} className="link-line">
                {site.phone.display}
              </a>
            </p>
            <p>
              <a href={`mailto:${site.email}`} className="link-line">
                {site.email}
              </a>
            </p>
          </address>
        </div>
      </div>

      <div className="border-t border-paper/12">
        <div className="container-site flex flex-col gap-2 py-6 text-xs text-paper/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. {dict.footer.rights}
          </p>
          <p className="uppercase tracking-[0.14em]">
            {site.address.city.replace(/^\d+\s/, "")}
          </p>
        </div>
      </div>
    </footer>
  );
}
