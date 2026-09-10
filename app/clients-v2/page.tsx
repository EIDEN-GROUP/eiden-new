import { ViewTransition } from "react";
import type { Metadata } from "next";
import { ClientsV2View } from "@/components/views/clients-v2-view";

export const metadata: Metadata = {
  title: "Clients v2",
  description:
    "Hôtellerie, Cafés & restaurants, santé, éducation, commerce : les entreprises marocaines pour lesquelles EIDEN GROUP construit marques, sites et campagnes.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/clients" },
};

export default function ClientsV2Page() {
  return (
    <ViewTransition
      name="clients-v2-page"
      enter={{ "case-close": "case-restore", default: "none" }}
      exit={{ "case-open": "case-under", default: "none" }}
      default="none"
    >
      <ClientsV2View />
    </ViewTransition>
  );
}
