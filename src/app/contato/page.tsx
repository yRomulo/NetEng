import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { ContactSection } from "@/components/site/ContactSection";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Fale com o comercial da NETENG. Rio das Ostras - RJ. Telefone, e-mail, WhatsApp e formulário para solicitar proposta."
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contato"
        title="Vamos construir a solução ideal"
        description="Estamos prontos para entender suas necessidades específicas e construir a solução que levará seu negócio ao próximo nível."
        image="/images/servicos/telecom.jpg"
      />

      <ContactSection />
    </>
  );
}
