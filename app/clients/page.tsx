import type { Metadata } from "next";
import { ClientsView } from "@/components/views/clients-view";

export const metadata: Metadata = {
  title: "Clients",
  description:
    "Hôtellerie, restauration, santé, éducation, commerce : les entreprises marocaines pour lesquelles EIDEN GROUP construit marques, sites et campagnes.",
};

export default function ClientsPage() {
  return <ClientsView />;
}
