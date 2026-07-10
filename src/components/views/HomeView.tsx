import Link from "next/link";
import Media from "@/components/Media";
import Reveal from "@/components/Reveal";
import ProjectGrid from "@/components/ProjectGrid";
import ContactSection from "@/components/ContactSection";
import { paths, t, type Locale } from "@/lib/i18n";
import { projects } from "@/lib/projects";

/*
  Render the hero headline with a single word coloured in --accent (the one
  editorial accent). Plain text otherwise — no effects, split on the word so
  the copy stays intact.
*/
function HeadlineWithAccent({
  title,
  accent,
}: {
  title: string;
  accent: string;
}) {
  const i = title.indexOf(accent);
  if (i < 0) return <>{title}</>;
  return (
    <>
      {title.slice(0, i)}
      <span className="text-accent">{accent}</span>
      {title.slice(i + accent.length)}
    </>
  );
}

export default function HomeView({ locale }: { locale: Locale }) {
  const dict = t[locale];
  const p = paths[locale];

  return (
    <>
      <main id="main">
      {/* ---- Hero: full-screen photo, title bottom-left, two buttons ---- */}
      <section
        className="relative flex h-[100svh] min-h-[34rem] flex-col justify-end overflow-hidden"
      >
        <div className="absolute inset-0 -z-10">
          <Media
            name="03"
            locale={locale}
            sizes="100vw"
            zoom={false}
            preload
            loading="eager"
          />
        </div>
        {/* legibility washes: darker at the base for the title, a touch at top for the nav */}
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/85 via-ink/35 to-ink/25"
          aria-hidden
        />

        <div className="container-site pb-14 md:pb-20">
          <p className="eyebrow text-paper/80">{dict.hero.eyebrow}</p>
          <h1 className="mt-5 max-w-[16ch] text-display text-paper text-balance">
            <HeadlineWithAccent title={dict.hero.title} accent={dict.hero.accent} />
          </h1>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link href={p.work} className="btn btn-paper">
              {dict.hero.ctaWork}
            </Link>
            <Link href={p.contact} className="btn btn-ghost-paper">
              {dict.hero.ctaStart}
            </Link>
          </div>
        </div>
      </section>

      {/* ---- One-line intro ---- */}
      <section className="border-b border-line">
        <div className="container-site py-20 md:py-28">
          <Reveal>
            <p className="max-w-4xl text-lead text-balance md:text-[1.75rem] md:leading-[1.4]">
              {dict.intro}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---- Immersive project grid ---- */}
      <section className="py-16 md:py-24">
        <div className="container-site">
          <Reveal className="mb-10 flex items-end justify-between gap-6 md:mb-14">
            <h2 className="text-title">{dict.home.selectedWork}</h2>
            <Link href={p.work} className="link-line hidden shrink-0 pb-1 text-sm md:block">
              {dict.home.allProjects}
            </Link>
          </Reveal>
          <ProjectGrid projects={projects} locale={locale} />
          <Reveal className="mt-10 md:hidden">
            <Link href={p.work} className="btn btn-ghost-ink w-full">
              {dict.home.allProjects}
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ---- Stats row ---- */}
      <section className="border-y border-line bg-bone">
        <div className="container-site py-16 md:py-20">
          <Reveal className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4">
            {dict.stats.map((s) => (
              <div key={s.label}>
                <p className="text-stat">{s.value}</p>
                {/* ink/70 (not stone) so the label clears AA contrast on the
                    bone ground while staying muted */}
                <p className="mt-3 max-w-[18ch] text-sm leading-snug text-ink/70">
                  {s.label}
                </p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ---- Services ---- */}
      <section className="py-24 md:py-36">
        <div className="container-site">
          <Reveal className="grid gap-10 md:grid-cols-[1fr_1.2fr] md:gap-16">
            <div>
              <p className="eyebrow text-ink/75">{dict.services.eyebrow}</p>
              <h2 className="mt-6 max-w-xl text-title text-balance">
                {dict.services.title}
              </h2>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-px overflow-hidden border border-line bg-line md:mt-20 md:grid-cols-3">
            {dict.services.items.map((item, i) => (
              <Reveal
                key={item.name}
                delay={i * 0.08}
                className="flex flex-col bg-paper p-8 md:p-10"
              >
                <h3 className="text-heading">{item.name}</h3>
                <p className="mt-4 text-[1.05rem] leading-relaxed text-stone">
                  {item.text}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      </main>

      {/* ---- Contact (inverted) ---- */}
      <ContactSection locale={locale} dict={dict} />
    </>
  );
}
