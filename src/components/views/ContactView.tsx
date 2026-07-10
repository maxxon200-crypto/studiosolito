import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import { t, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

export default function ContactView({ locale }: { locale: Locale }) {
  const dict = t[locale];
  const c = dict.contact;

  return (
    <main id="main">
      <PageHeader title={c.title} intro={c.intro} />

      <section className="py-16 md:py-24">
        <div className="container-site grid gap-14 md:grid-cols-[1fr_1.15fr] md:gap-24">
          {/* Details */}
          <Reveal className="space-y-10">
            <div>
              <p className="eyebrow text-ink/75">{c.whereTitle}</p>
              <address className="mt-4 text-lead not-italic leading-relaxed">
                {site.address.street}
                <br />
                {site.address.city}
              </address>
              <a
                href={site.address.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="link-line mt-4 inline-block text-sm text-accent"
              >
                {c.mapLink}
              </a>
            </div>

            <div className="grid grid-cols-2 gap-8 border-t border-line pt-8">
              <div>
                <p className="eyebrow text-ink/75">{c.phoneTitle}</p>
                <a
                  href={site.phone.href}
                  className="link-line mt-3 inline-block text-[1.05rem]"
                >
                  {site.phone.display}
                </a>
              </div>
              <div>
                <p className="eyebrow text-ink/75">{c.emailTitle}</p>
                <a
                  href={`mailto:${site.email}`}
                  className="link-line mt-3 inline-block break-all text-[1.05rem]"
                >
                  {site.email}
                </a>
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.08}>
            <h2 className="text-heading">{c.form.title}</h2>
            <div className="mt-8">
              <ContactForm dict={dict} />
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
