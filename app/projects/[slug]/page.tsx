import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectCaseStudy } from "@/components/project/case/case-study";
import {
  getNextCases,
  getProjectCase,
  projectCases,
} from "@/lib/data/projects/index";

/** One page per written case; anything else is a 404 rather than a stub. */
export function generateStaticParams() {
  return projectCases.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectCase(slug);
  if (!project) return {};

  const description = project.hero.intro.fr;

  return {
    title: project.client,
    description,
    openGraph: {
      title: `${project.client} | EIDEN GROUP`,
      description,
      images: [{ url: project.hero.image }],
    },
  };
}

/**
 * The project route.
 *
 * Every page is the same spine filled differently, so the route does nothing
 * but resolve the record and hand it over   the shape of the page is decided
 * in `ProjectCaseStudy`, and what appears in it is decided by the record.
 */
export default async function ProjectPage({
  params,
}: PageProps<"/projects/[slug]">) {
  const { slug } = await params;

  const project = getProjectCase(slug);
  if (!project) notFound();

  return <ProjectCaseStudy project={project} next={getNextCases(slug)} />;
}
