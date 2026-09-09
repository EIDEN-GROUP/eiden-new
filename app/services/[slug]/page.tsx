import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceView } from "@/components/views/service-view";
import { fr } from "@/lib/i18n/fr";

/* The expertises live in the dictionaries rather than in `lib/data`, and the
   two languages carry the same slugs   so the French one is what the routes
   are built from, and the page itself reads whichever language is on. */
const services = fr.services.items;

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) return {};

  return {
    title: service.title,
    description: service.text,
    openGraph: {
      title: `${service.title} | EIDEN GROUP`,
      description: service.text,
    },
  };
}

export default async function ServicePage({
  params,
}: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  if (!services.some((service) => service.slug === slug)) notFound();

  return <ServiceView slug={slug} />;
}
