import { ViewTransition } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectCaseStudy } from "@/components/project/case/case-study";
import {
  getNextCases,
  getProjectCase,
  projectCases,
} from "@/lib/data/projects/index";

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

export default async function ProjectPage({
  params,
}: PageProps<"/projects/[slug]">) {
  const { slug } = await params;

  const project = getProjectCase(slug);
  if (!project) notFound();

  /* Two doors at the end of the case, not one. */
  const next = getNextCases(slug, 2);

  return (
    <ViewTransition
      name={`case-${project.slug}`}
      enter={{
        "case-open": "case-rise",
        "case-next": "case-rise",
        default: "none",
      }}
      exit={{
        "case-close": "case-fall",
        "case-next": "case-under",
        default: "none",
      }}
      default="none"
    >
      <ProjectCaseStudy project={project} next={next.length ? next : [project]} />
    </ViewTransition>
  );
}
