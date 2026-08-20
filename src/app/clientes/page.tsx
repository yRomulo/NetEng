import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { PartnersSection } from "@/components/site/PartnersSection";
import { ClosingArgumentSection } from "@/components/site/ClosingArgumentSection";

export const metadata: Metadata = {
  title: "Clientes",
  description: "Empresas que contam com a NETENG para projetar, instalar e manter sua infraestrutura crítica."
};

export default function ClientsPage() {
  return (
    <>
      <PageHero
        eyebrow="Clientes"
        title="Quem confia na gente"
        description="Operações industriais, prediais e de Óleo & Gás que dependem de infraestrutura elétrica, de telecom e de automação para funcionar."
        image="/images/hero/campo.jpg"
      />

      <PartnersSection showWhenEmpty />
      <ClosingArgumentSection />
    </>
  );
}
