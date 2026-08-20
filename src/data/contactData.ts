import { netengContact } from "./companyData";

export const contactServiceOptions = [
  "Projetos e Instalações Elétricas",
  "Projetos e Instalações de Telecom",
  "Projetos e Instalações de Climatização",
  "Automação Predial e Sistemas de Controle",
  "Mais de uma frente / não sei definir"
] as const;

export type ContactServiceOption = (typeof contactServiceOptions)[number];

type ContactLead = {
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

/** Canais diretos usados como alternativa quando o envio pelo formulário falha. */
export function buildCommercialContactLinks(lead: ContactLead) {
  const summary = [
    `Nome: ${lead.name}`,
    `Empresa: ${lead.company}`,
    `E-mail: ${lead.email}`,
    `Telefone: ${lead.phone}`,
    `Interesse: ${lead.service}`,
    "",
    lead.message
  ].join("\n");

  return {
    whatsappUrl: `https://wa.me/${netengContact.phoneDigits}?text=${encodeURIComponent(summary)}`,
    emailUrl: `mailto:${netengContact.email}?subject=${encodeURIComponent(
      `Contato pelo site — ${lead.company || lead.name}`
    )}&body=${encodeURIComponent(summary)}`
  };
}

export const whatsappUrl = `https://wa.me/${netengContact.phoneDigits}`;
