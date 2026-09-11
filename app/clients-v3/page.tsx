import { ViewTransition } from "react";
import type { Metadata } from "next";
import { ClientsV3View } from "@/components/views/clients-v3-view";

export const metadata: Metadata = {
  title: "Clients v3",
  description:
    "Hôtellerie, Cafés & restaurants, santé, éducation, commerce : les entreprises marocaines pour lesquelles EIDEN GROUP construit marques, sites et campagnes.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/clients" },
};

export default function ClientsV3Page() {
  return (
    <ViewTransition
      name="clients-v3-page"
      enter={{ "case-close": "case-restore", default: "none" }}
      exit={{ "case-open": "case-under", default: "none" }}
      default="none"
    >
      <ClientsV3View />
    </ViewTransition>
  );
}
