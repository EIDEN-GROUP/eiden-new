import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectHero } from "@/components/project/project-hero";
import { ProjectChallenge } from "@/components/project/project-challenge";
import { ProjectIdea } from "@/components/project/project-idea";
import { ProjectBuilt } from "@/components/project/project-built";
import { ProjectWork } from "@/components/project/project-work";
import { ProjectResult } from "@/components/project/project-result";
import { ProjectInfo } from "@/components/project/project-info";
import { ProjectNavigation } from "@/components/project/project-navigation";
import {
  getProjectSuggestions,
  getProjectPage,
  projectPages,
} from "@/lib/data/projects";

/** One page per written record; anything else is a 404 rather than a stub. */
export function generateStaticParams() {
  return projectPages.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectPage(slug);
  if (!project) return {};

  return {
    title: project.client,
    description: project.title.fr,
    openGraph: {
      title: `${project.client} | EIDEN GROUP`,
      description: project.title.fr,
      images: [{ url: project.hero.image }],
    },
  };
}

/**
 * The project template.
 *
 * Intro → problem → idea → what we built → the visual story → result →
 * info → next. The order is the argument, so it is fixed here rather than
 * left to the data; what varies between projects is what fills it.
 */
export default async function ProjectPage({
  params,
}: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProjectPage(slug);
  if (!project) notFound();

  const suggestions = getProjectSuggestions(project.slug);

  return (
    <article className="bg-canvas text-ink" data-nav-tone="light">
      <ProjectHero project={project} />
      <ProjectChallenge challenge={project.challenge} />
      <ProjectIdea idea={project.idea} />
      <ProjectBuilt built={project.built} />
      <ProjectWork work={project.work} />
      <ProjectResult result={project.result} />
      <ProjectInfo project={project} />
      <ProjectNavigation suggestions={suggestions} />
    </article>
  );
}
