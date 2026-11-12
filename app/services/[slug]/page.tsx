import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceView } from "@/components/views/service-view";
import { siteConfig } from "@/lib/data/site";
import { fr } from "@/lib/i18n/fr";

/* The expertises live in the dictionaries rather than in `lib/data`, and the
   two languages carry the same slugs   so the French one is what the routes
   are built from, and the page itself reads whichever language is on. */
const services = fr.services.items;

const serviceJsonLd = (service: (typeof services)[number]) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${siteConfig.url}/services/${service.slug}#service`,
  name: service.title,
  serviceType: service.title,
  description: service.text,
  inLanguage: "fr",
  provider: { "@id": `${siteConfig.url}/#business` },
  areaServed: [
    { "@type": "City", name: "Agadir" },
    { "@type": "Country", name: "Morocco" },
  ],
  url: `${siteConfig.url}/services/${service.slug}`,
  termsOfService: `${siteConfig.url}/terms`,
});

const breadcrumbJsonLd = (service: (typeof services)[number]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: siteConfig.url },
    {
      "@type": "ListItem",
      position: 2,
      name: "Nos services",
      item: siteConfig.url,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: service.title,
      item: `${siteConfig.url}/services/${service.slug}`,
    },
  ],
});

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
    alternates: { canonical: `/services/${slug}` },
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
  const service = services.find((item) => item.slug === slug);
  if (!service) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd(service)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(service)) }}
      />
      <ServiceView slug={slug} />
    </>
  );
}
