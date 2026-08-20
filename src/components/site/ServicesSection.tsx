import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { servicesCatalog } from "@/data/servicesCatalog";
import { SectionHeading } from "./SectionHeading";

type ServicesSectionProps = {
  /** Na home mostra o resumo; em /servicos mostra também os itens de cada frente. */
  detailed?: boolean;
};

export function ServicesSection({ detailed = false }: ServicesSectionProps) {
  return (
    <section className="bg-[var(--color-surface)] py-20">
      <div className="container-site">
        <SectionHeading
          eyebrow="O que fazemos"
          title="Quatro frentes, uma responsabilidade técnica"
          description="Da infraestrutura física ao sistema de controle, cada frente pode ser contratada isolada ou combinada — com um único interlocutor do projeto à operação."
        />

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {servicesCatalog.map((service) => (
            <article
              key={service.slug}
              className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white transition-shadow hover:shadow-xl hover:shadow-black/5"
            >
              <div className="relative h-52 overflow-hidden bg-[var(--color-ink)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={service.image}
                  alt=""
                  aria-hidden="true"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-1 flex-col p-7">
                <h3 className="font-display text-xl font-bold text-[var(--color-text-1)]">{service.name}</h3>
                <span className="brand-rule my-4 !w-10" />
                <p className="text-sm leading-7 text-[var(--color-text-2)]">{service.summary}</p>

                {detailed && (
                  <ul className="mt-5 space-y-2.5">
                    {service.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3 text-sm leading-6 text-[var(--color-text-2)]">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-brand)]" aria-hidden="true" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}

                <Link
                  href={`/servicos/${service.slug}`}
                  className="mt-auto inline-flex items-center gap-2 pt-7 text-sm font-semibold uppercase tracking-[0.06em] text-[var(--color-brand-strong)] transition-colors hover:text-[var(--color-brand-hover)]"
                >
                  Saiba mais
                  <FiArrowRight aria-hidden="true" />
                  <span className="sr-only">sobre {service.name}</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
