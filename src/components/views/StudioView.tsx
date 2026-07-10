import Media from "@/components/Media";
import Reveal from "@/components/Reveal";
import ContactSection from "@/components/ContactSection";
import { t, type Locale } from "@/lib/i18n";

export default function StudioView({ locale }: { locale: Locale }) {
  const dict = t[locale];
  const s = dict.studio;

  return (
    <>
      <main id="main">
        {/* Intro masthead — title and intro share a baseline so the paragraph
            reads as part of the statement, not floating in a corner. */}
        <header className="border-b border-line">
          <div className="container-site pb-16 pt-[calc(var(--nav-h)+3.5rem)] md:pb-24 md:pt-[calc(var(--nav-h)+6rem)]">
            <div className="grid items-end gap-x-12 gap-y-8 md:grid-cols-12">
              <Reveal className="md:col-span-7">
                <h1 className="max-w-[16ch] text-display text-balance">
                  {s.title}
                </h1>
              </Reveal>
              <Reveal delay={0.08} className="md:col-span-5 md:col-start-8">
                <p className="max-w-xl text-lead leading-relaxed text-ink/80">
                  {s.intro}
                </p>
              </Reveal>
            </div>
          </div>
        </header>

        {/* Wide interior placeholder */}
        <Reveal className="relative aspect-[3/4] w-full sm:aspect-[16/9] lg:aspect-[21/9]">
          <Media name="03" locale={locale} label={s.photo} size="lg" />
        </Reveal>

        {/* Value of a single point of contact */}
        <section className="py-24 md:py-36">
          <div className="container-site grid gap-12 md:grid-cols-[1fr_1.3fr] md:gap-20">
            <Reveal>
              <p className="eyebrow text-ink/85">{s.approachEyebrow}</p>
              <h2 className="mt-6 text-title text-balance">{s.valueTitle}</h2>
            </Reveal>
            <Reveal delay={0.08} className="self-end">
              <p className="max-w-xl text-lead leading-relaxed">
                {s.valueText}
              </p>
            </Reveal>
          </div>
        </section>

        {/* Approach — Ascolto / Progetto / Cantiere. Titles + descriptions,
            no numbering. */}
        <section className="border-t border-line pb-24 md:pb-36">
          <div className="container-site">
            <div className="grid gap-px overflow-hidden border-x border-b border-line bg-line md:grid-cols-3">
              {s.approach.map((step, i) => (
                <Reveal
                  key={step.name}
                  delay={i * 0.08}
                  className="flex flex-col bg-paper p-8 md:p-10"
                >
                  <h3 className="text-heading">{step.name}</h3>
                  <p className="mt-4 text-[1.1rem] leading-relaxed text-stone">
                    {step.text}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <ContactSection locale={locale} dict={dict} />
    </>
  );
}
