import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { ServicesSection } from "@/components/site/ServicesSection";
import { ClosingArgumentSection } from "@/components/site/ClosingArgumentSection";

export const metadata: Metadata = {
  title: "Serviços",
  description:
    "Projetos e instalações elétricas, telecom e fibra óptica, infraestrutura de redes e automação predial — as quatro frentes de atuação da NETENG."
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Serviços"
        title="Soluções integradas de engenharia"
        description="Automação, Elétrica e Telecomunicações sob um único contrato — do projeto executivo ao comissionamento e à manutenção."
        image="/images/servicos/redes.jpg"
      />

      <ServicesSection detailed />
      <ClosingArgumentSection />
    </>
  );
}
