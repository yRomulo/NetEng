import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { BrazilMapSection } from "@/components/site/BrazilMapSection";
import { ClosingArgumentSection } from "@/components/site/ClosingArgumentSection";
import { SectionHeading } from "@/components/site/SectionHeading";
import { aboutText, mission, values, vision } from "@/data/companyData";

export const metadata: Metadata = {
  title: "A NETENG",
  description:
    "Fundada em 2025, a NETENG entrega soluções integradas de engenharia em Automação, Elétrica e Telecomunicações. Conheça nossa missão, visão e valores."
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="A NETENG"
        title="Conheça mais sobre a nossa empresa"
        description="Engenharia integrada em Automação, Elétrica e Telecomunicações — do projeto à operação."
        image="/images/sala-de-controle.jpg"
      />

      <section className="bg-[var(--color-surface)] py-20">
        <div className="container-site grid gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SectionHeading eyebrow="Sobre nós" title="Projetamos o amanhã, hoje" />
            <div className="space-y-5 text-base leading-8 text-[var(--color-text-2)]">
              {aboutText.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/sobre-offshore.jpg"
              alt="Profissional com EPI em plataforma offshore"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-ink)] py-20">
        <div className="container-site">
          <div className="grid gap-8 md:grid-cols-2">
            <article className="rounded-2xl border border-white/10 bg-white/5 p-8">
              <h2 className="font-display text-xl font-bold text-[var(--color-brand-light)]">Missão</h2>
              <span className="brand-rule my-4 !w-10" />
              <p className="text-sm leading-8 text-white/75">{mission}</p>
            </article>

            <article className="rounded-2xl border border-white/10 bg-white/5 p-8">
              <h2 className="font-display text-xl font-bold text-[var(--color-brand-light)]">Visão</h2>
              <span className="brand-rule my-4 !w-10" />
              <p className="text-sm leading-8 text-white/75">{vision}</p>
            </article>
          </div>

          <div className="mt-16">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-[var(--color-brand-light)]">
              Identidade se constrói com valores
            </p>
            <h2 className="font-display text-3xl font-extrabold text-white md:text-4xl">Nossos valores</h2>
            <span className="brand-rule my-5" />

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {values.map((value) => (
                <article key={value.title} className="border-l-2 border-[var(--color-brand)] pl-5">
                  <h3 className="font-display text-base font-bold text-white">{value.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-white/65">{value.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <BrazilMapSection />
      <ClosingArgumentSection />
    </>
  );
}
