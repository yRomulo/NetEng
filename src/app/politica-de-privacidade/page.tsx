import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { netengContact } from "@/data/companyData";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Como a NETENG trata os dados pessoais coletados pelo formulário de contato do site.",
  robots: { index: false, follow: true }
};

const sections = [
  {
    title: "1. Quais dados coletamos",
    body: "Coletamos apenas os dados que você informa voluntariamente no formulário de contato: nome, empresa, e-mail, telefone, frente de interesse e a mensagem enviada. O site não usa cookies de rastreamento nem ferramentas de análise de comportamento."
  },
  {
    title: "2. Para que usamos",
    body: "Os dados são usados exclusivamente para responder ao seu contato e elaborar a proposta comercial solicitada. Não vendemos, alugamos nem compartilhamos seus dados com terceiros para fins de marketing, e não enviamos comunicação em massa não solicitada."
  },
  {
    title: "3. Como os dados trafegam",
    body: "O envio do formulário é processado pelo serviço EmailJS, que encaminha a mensagem para o e-mail comercial da NETENG. O conteúdo não é armazenado em banco de dados do site."
  },
  {
    title: "4. Por quanto tempo guardamos",
    body: "As mensagens permanecem na caixa de e-mail comercial pelo tempo necessário ao atendimento e ao histórico da negociação."
  },
  {
    title: "5. Seus direitos (LGPD)",
    body: "Você pode solicitar a qualquer momento a confirmação do tratamento, o acesso, a correção ou a exclusão dos seus dados. Basta escrever para o e-mail abaixo."
  }
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Política de Privacidade"
        description="Como tratamos os dados pessoais informados no formulário de contato deste site."
      />

      <section className="bg-[var(--color-surface)] py-20">
        <div className="container-site max-w-3xl">
          <div className="space-y-10">
            {sections.map((section) => (
              <article key={section.title}>
                <h2 className="font-display text-lg font-bold text-[var(--color-text-1)]">{section.title}</h2>
                <p className="mt-3 text-sm leading-8 text-[var(--color-text-2)]">{section.body}</p>
              </article>
            ))}

            <article>
              <h2 className="font-display text-lg font-bold text-[var(--color-text-1)]">6. Contato do controlador</h2>
              <p className="mt-3 text-sm leading-8 text-[var(--color-text-2)]">
                {netengContact.legalName} — {netengContact.address.full}. E-mail:{" "}
                <a href={`mailto:${netengContact.email}`} className="text-[var(--color-brand-strong)] underline">
                  {netengContact.email}
                </a>
                .
              </p>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
