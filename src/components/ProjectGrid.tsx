import Link from "next/link";
import Media from "@/components/Media";
import Reveal from "@/components/Reveal";
import { projectPath, type Locale } from "@/lib/i18n";
import type { ProjectData } from "@/lib/projects";

/*
  Immersive, image-first grid. The first project is shown as one large wide
  feature; the rest fall into an asymmetric 12-column editorial rhythm.
  Captions are hidden on hover-capable devices and revealed on hover/focus
  (see .project-caption in globals.css); on touch / no-JS they stay visible.
*/

type CardShape = { col: string; aspect: string; sizes: string };

// Desktop column span + aspect + a matching `sizes` for each project after the
// feature. The grid is 1 col (mobile) → 2 cols (sm) → 12 cols (lg), so `sizes`
// declares the real slot at each step and caps at the .container-site width
// (≈1552px content) on very wide viewports, matching each card's lg span.
const S = {
  // 7/12 of the 1552px content ≈ 900px at the cap; ≈58vw below it.
  wide: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (min-width: 1680px) 900px, 58vw",
  // 5/12 ≈ 640px at the cap; ≈42vw below it.
  narrow: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (min-width: 1680px) 640px, 42vw",
  // 6/12 ≈ 770px at the cap; ≈50vw below it.
  half: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (min-width: 1680px) 770px, 50vw",
};
const rhythm: CardShape[] = [
  { col: "lg:col-span-7", aspect: "aspect-[4/3]", sizes: S.wide },
  { col: "lg:col-span-5", aspect: "aspect-[3/4]", sizes: S.narrow },
  { col: "lg:col-span-5", aspect: "aspect-[3/4]", sizes: S.narrow },
  { col: "lg:col-span-7", aspect: "aspect-[4/3]", sizes: S.wide },
  { col: "lg:col-span-6", aspect: "aspect-[4/3]", sizes: S.half },
  { col: "lg:col-span-6", aspect: "aspect-[4/3]", sizes: S.half },
];

function Card({
  project,
  locale,
  aspect,
  sizes,
  index,
}: {
  project: ProjectData;
  locale: Locale;
  aspect: string;
  sizes: string;
  index: number;
}) {
  return (
    <Link
      href={projectPath(locale, project.slug)}
      className="group block"
      aria-label={project.title[locale]}
    >
      <div className={`relative w-full ${aspect}`}>
        <Media
          name={project.cover}
          locale={locale}
          sizes={sizes}
          loading={index < 2 ? "eager" : "lazy"}
        />
        {/* caption overlay */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5 md:p-6">
          <div className="project-caption">
            <div className="flex items-end justify-between gap-4 bg-ink/72 px-4 py-3 text-paper backdrop-blur-sm">
              <div>
                <p className="text-[1.05rem] font-medium leading-tight tracking-[-0.02em]">
                  {project.title[locale]}
                </p>
                <p className="mt-0.5 text-xs text-paper/70">
                  {project.type[locale]} · {project.place}
                </p>
              </div>
              <span className="hidden shrink-0 text-xs uppercase tracking-[0.14em] text-paper/70 sm:block">
                {project.year}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function ProjectGrid({
  projects,
  locale,
}: {
  projects: ProjectData[];
  locale: Locale;
}) {
  const [feature, ...rest] = projects;

  return (
    <div className="space-y-4 md:space-y-6">
      {feature && (
        <Reveal>
          <Link
            href={projectPath(locale, feature.slug)}
            className="group block"
            aria-label={feature.title[locale]}
          >
            <div className="relative aspect-[3/4] w-full sm:aspect-[16/9] lg:aspect-[21/9]">
              <Media
                name={feature.cover}
                locale={locale}
                /* full container width, capped at the .container-site content
                   box (≈1552px) on very wide viewports */
                sizes="(min-width: 1680px) 1552px, 100vw"
                loading="eager"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 p-6 md:p-9">
                <div className="project-caption">
                  <div className="flex flex-wrap items-end justify-between gap-4">
                    <div className="text-paper [text-shadow:0_1px_24px_rgba(26,26,24,0.5)]">
                      <p className="text-heading font-medium">
                        {feature.title[locale]}
                      </p>
                      <p className="mt-1 max-w-md text-sm text-paper/85">
                        {feature.summary[locale]}
                      </p>
                    </div>
                    <span className="text-xs uppercase tracking-[0.14em] text-paper/85 [text-shadow:0_1px_16px_rgba(26,26,24,0.6)]">
                      {feature.type[locale]} · {feature.year}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </Reveal>
      )}

      <Reveal className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-12">
        {rest.map((project, i) => {
          const shape = rhythm[i % rhythm.length];
          return (
            <div key={project.slug} className={`sm:col-span-1 ${shape.col}`}>
              <Card
                project={project}
                locale={locale}
                aspect={shape.aspect}
                sizes={shape.sizes}
                index={i}
              />
            </div>
          );
        })}
      </Reveal>
    </div>
  );
}
