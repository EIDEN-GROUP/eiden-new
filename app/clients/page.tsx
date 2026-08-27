import { ViewTransition } from "react";
import type { Metadata } from "next";
import { ClientsView } from "@/components/views/clients-view";

export const metadata: Metadata = {
  title: "Clients",
  description:
    "Hôtellerie, Cafés & restaurants, santé, éducation, commerce : les entreprises marocaines pour lesquelles EIDEN GROUP construit marques, sites et campagnes.",
};

export default function ClientsPage() {
  return (
    <ViewTransition
      name="clients-page"
      enter={{ "case-close": "case-restore", default: "none" }}
      exit={{ "case-open": "case-under", default: "none" }}
      default="none"
    >
      <ClientsView />
    </ViewTransition>
  );
}
