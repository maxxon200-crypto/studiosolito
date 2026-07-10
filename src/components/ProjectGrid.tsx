import Link from "next/link";
import Media from "@/components/Media";
import Reveal from "@/components/Reveal";
import { projectPath, type Locale } from "@/lib/i18n";
import type { ProjectData } from "@/lib/projects";

/*
  Immersive, image-first grid. The first project is shown as one large wide
  feature; the rest fall into an asymmetric 12-column editorial rhythm.
  Each cell is a labeled photo placeholder; a caption chip (project name)
  reveals on hover/focus and stays visible on touch / no-JS.
*/

type CardShape = { col: string; aspect: string };

// Desktop column span + aspect for each project after the feature. Repeats.
const rhythm: CardShape[] = [
  { col: "lg:col-span-7", aspect: "aspect-[4/3]" },
  { col: "lg:col-span-5", aspect: "aspect-[3/4]" },
  { col: "lg:col-span-5", aspect: "aspect-[3/4]" },
  { col: "lg:col-span-7", aspect: "aspect-[4/3]" },
  { col: "lg:col-span-6", aspect: "aspect-[4/3]" },
  { col: "lg:col-span-6", aspect: "aspect-[4/3]" },
];

function Card({
  project,
  locale,
  aspect,
}: {
  project: ProjectData;
  locale: Locale;
  aspect: string;
}) {
  return (
    <Link
      href={projectPath(locale, project.slug)}
      className="group block"
      aria-label={project.title[locale]}
    >
      <div className={`relative w-full ${aspect}`}>
        <Media name={project.cover} locale={locale} />
        {/* caption overlay — dark chip, legible on the light placeholder */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4 md:p-5">
          <div className="project-caption">
            <div className="flex items-end justify-between gap-4 bg-ink/80 px-4 py-3 text-paper backdrop-blur-sm">
              <div>
                <p className="text-[1.05rem] font-medium leading-tight tracking-[-0.02em]">
                  {project.title[locale]}
                </p>
                <p className="mt-0.5 text-[0.8rem] text-paper/75">
                  {project.type[locale]} · {project.place}
                </p>
              </div>
              <span className="hidden shrink-0 text-[0.75rem] uppercase tracking-[0.14em] text-paper/75 sm:block">
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
              <Media name={feature.cover} locale={locale} size="lg" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5 md:p-7">
                <div className="project-caption">
                  <div className="inline-flex max-w-full flex-wrap items-end justify-between gap-x-6 gap-y-1 bg-ink/80 px-5 py-4 text-paper backdrop-blur-sm">
                    <div>
                      <p className="text-heading font-medium">
                        {feature.title[locale]}
                      </p>
                      <p className="mt-1 max-w-md text-[0.9rem] text-paper/80">
                        {feature.summary[locale]}
                      </p>
                    </div>
                    <span className="text-[0.75rem] uppercase tracking-[0.14em] text-paper/80">
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
              <Card project={project} locale={locale} aspect={shape.aspect} />
            </div>
          );
        })}
      </Reveal>
    </div>
  );
}
