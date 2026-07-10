import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectView from "@/components/views/ProjectView";
import { projectPath } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { getProject, projects } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return pageMetadata({
    locale: "it",
    path: projectPath("it", slug),
    title: project.title.it,
    description: `${project.type.it} a ${project.place}, ${project.year}. ${project.summary.it}`,
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  return <ProjectView project={project} locale="it" />;
}
