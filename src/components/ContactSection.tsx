import Link from "next/link";
import Reveal from "@/components/Reveal";
import { paths, type Dict, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

/*
  The inverted (ink ground, paper text) call-to-contact that closes the home
  and studio pages, echoing Bloom's dark tail before the footer.
*/
export default function ContactSection({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dict;
}) {
  const p = paths[locale];
  return (
    <section className="bg-ink text-paper">
      <div className="container-site py-24 md:py-36">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr] md:gap-20">
          <Reveal>
            <p className="eyebrow text-paper/85">{dict.cta.eyebrow}</p>
            <h2 className="mt-6 max-w-3xl text-title text-balance">
              {dict.cta.title}
            </h2>
            <p className="mt-8 max-w-md text-lead text-paper/70">
              {dict.cta.text}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link href={p.contact} className="btn btn-paper">
                {dict.cta.write}
              </Link>
              <a
                href={site.phone.href}
                className="btn btn-ghost-paper"
              >
                {site.phone.display}
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="md:justify-self-end">
            <div className="space-y-8 md:text-right">
              <div>
                <p className="eyebrow text-paper/85">{dict.contact.whereTitle}</p>
                <address className="mt-3 not-italic text-paper/85">
                  {site.address.street}
                  <br />
                  {site.address.city}
                </address>
              </div>
              <div>
                <p className="eyebrow text-paper/85">{dict.contact.phoneTitle}</p>
                <a
                  href={site.phone.href}
                  className="link-line mt-3 inline-block text-paper/85"
                >
                  {site.phone.display}
                </a>
              </div>
              <div>
                <p className="eyebrow text-paper/85">{dict.contact.emailTitle}</p>
                <a
                  href={`mailto:${site.email}`}
                  className="link-line mt-3 inline-block text-paper/85"
                >
                  {site.email}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
