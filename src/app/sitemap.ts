import type { MetadataRoute } from "next";
import { paths, projectPath } from "@/lib/i18n";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";

/*
  lastModified is fixed rather than `new Date()` — build-time date APIs are
  restricted, and a stable date keeps repeated builds deterministic. Bump on
  meaningful content releases.
*/
const lastModified = "2026-01-01";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, "");
  const staticPaths = [
    { path: paths.it.home, priority: 1 },
    { path: paths.it.work, priority: 0.8 },
    { path: paths.it.studio, priority: 0.6 },
    { path: paths.it.contact, priority: 0.6 },
    { path: paths.en.home, priority: 0.9 },
    { path: paths.en.work, priority: 0.7 },
    { path: paths.en.studio, priority: 0.5 },
    { path: paths.en.contact, priority: 0.5 },
  ];

  const projectPaths = projects.flatMap((p) => [
    { path: projectPath("it", p.slug), priority: 0.7 },
    { path: projectPath("en", p.slug), priority: 0.6 },
  ]);

  return [...staticPaths, ...projectPaths].map(({ path, priority }) => ({
    url: `${base}${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority,
  }));
}
