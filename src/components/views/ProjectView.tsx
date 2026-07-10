import Link from "next/link";
import Media from "@/components/Media";
import Reveal from "@/components/Reveal";
import { projectPath, t, type Locale } from "@/lib/i18n";
import type { ProjectData } from "@/lib/projects";
import { projectNeighbours } from "@/lib/projects";
import { paths } from "@/lib/i18n";

export default function ProjectView({
  project,
  locale,
}: {
  project: ProjectData;
  locale: Locale;
}) {
  const dict = t[locale];
  const pj = dict.project;
  const p = paths[locale];
  const { next } = projectNeighbours(project.slug);
  const [, ...detail] = project.gallery;

  const dataRows = [
    { label: pj.place, value: project.place },
    { label: pj.year, value: project.year },
    { label: pj.type, value: project.type[locale] },
    { label: pj.surface, value: project.surface },
  ];

  return (
    <main id="main">
      {/* Hero image placeholder */}
      <section className="relative flex h-[86svh] min-h-[30rem] flex-col justify-end overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Media name={project.cover} locale={locale} size="lg" />
        </div>
        <div className="container-site relative pb-12 md:pb-16">
          <Link href={p.work} className="link-line text-[0.95rem] text-ink/70">
            ← {pj.back}
          </Link>
          <h1 className="mt-5 max-w-[18ch] text-display text-ink text-balance">
            {project.title[locale]}
          </h1>
          <p className="mt-4 text-lead text-ink/80">
            {project.type[locale]} · {project.place} · {project.year}
          </p>
        </div>
      </section>

      {/* Narrative + data */}
      <section className="py-20 md:py-28">
        <div className="container-site grid gap-14 md:grid-cols-[1.5fr_1fr] md:gap-20">
          <Reveal className="space-y-6">
            {project.body[locale].map((para, i) => (
              <p
                key={i}
                className={
                  i === 0
                    ? "text-lead leading-relaxed text-balance"
                    : "text-[1.1rem] leading-relaxed text-stone"
                }
              >
                {para}
              </p>
            ))}
          </Reveal>

          <Reveal delay={0.08} className="md:pt-2">
            <p className="eyebrow text-ink/85">{pj.data}</p>
            <dl className="mt-6 divide-y divide-line border-y border-line">
              {dataRows.map((row) => (
                <div
                  key={row.label}
                  className="flex items-baseline justify-between gap-6 py-4"
                >
                  <dt className="text-[0.95rem] text-ink/70">{row.label}</dt>
                  <dd className="text-right font-medium">{row.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* Detail photo grid */}
      {detail.length > 0 && (
        <section className="pb-20 md:pb-28">
          <div className="container-site grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
            {detail.map((key, i) => {
              // Let the first detail shot run full width for rhythm.
              const wide = i === 0 && detail.length % 2 === 1;
              return (
                <div
                  key={`${key}-${i}`}
                  className={wide ? "sm:col-span-2" : ""}
                >
                  <div
                    className={
                      wide
                        ? "relative aspect-[16/9] w-full"
                        : "relative aspect-[4/5] w-full"
                    }
                  >
                    <Media name={key} locale={locale} size={wide ? "md" : "sm"} />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Next project */}
      <section className="border-t border-line">
        <Link
          href={projectPath(locale, next.slug)}
          className="group block"
        >
          <div className="container-site flex items-center justify-between gap-6 py-12 md:py-16">
            <div>
              <p className="eyebrow text-ink/85">{pj.next}</p>
              <p className="mt-3 text-title transition-colors group-hover:text-accent">
                {next.title[locale]}
              </p>
            </div>
            <span
              aria-hidden
              className="text-title text-stone transition-colors duration-500 group-hover:text-accent"
            >
              →
            </span>
          </div>
        </Link>
      </section>
    </main>
  );
}
