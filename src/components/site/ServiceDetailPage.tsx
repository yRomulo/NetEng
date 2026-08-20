import Link from "next/link";
import { FiArrowRight, FiCheck } from "react-icons/fi";
import type { ServiceItem } from "@/data/servicesCatalog";
import { servicesCatalog } from "@/data/servicesCatalog";
import { PageHero } from "./PageHero";

export function ServiceDetailPage({ service }: { service: ServiceItem }) {
  const otherServices = servicesCatalog.filter((item) => item.slug !== service.slug);

  return (
    <>
      <PageHero eyebrow="Frente de atuação" title={service.name} description={service.summary} image={service.image} />

      <section className="bg-[var(--color-surface)] py-20">
        <div className="container-site grid gap-14 lg:grid-cols-[1fr_0.85fr]">
          <div>
            <h2 className="font-display text-2xl font-extrabold text-[var(--color-text-1)]">O que entregamos</h2>
            <span className="brand-rule my-5" />

            <ul className="space-y-4">
              {service.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="flex gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-5"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand)] text-white">
                    <FiCheck className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <p className="text-sm leading-7 text-[var(--color-text-1)]">{bullet}</p>
                </li>
              ))}
            </ul>

            <div className="mt-10 rounded-2xl bg-[var(--color-ink)] p-8">
              <h3 className="font-display text-lg font-bold text-white">Precisa desta frente no seu projeto?</h3>
              <p className="mt-2 text-sm leading-7 text-white/70">
                Envie o escopo, o prazo e o local da operação. Retornamos com uma proposta técnica e comercial.
              </p>
              <Link href="/contato" className="btn-primary mt-6">
                Solicite uma proposta
                <FiArrowRight aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="space-y-6">
            {[service.image, ...service.gallery].map((image) => (
              <div key={image} className="overflow-hidden rounded-2xl border border-[var(--color-border)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={image} alt="" aria-hidden="true" className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--color-border)] bg-[var(--color-surface-alt)] py-16">
        <div className="container-site">
          <h2 className="font-display text-xl font-bold text-[var(--color-text-1)]">Outras frentes</h2>
          <span className="brand-rule my-5 !w-10" />

          <div className="grid gap-5 sm:grid-cols-3">
            {otherServices.map((item) => (
              <Link
                key={item.slug}
                href={`/servicos/${item.slug}`}
                className="group rounded-xl border border-[var(--color-border)] bg-white p-6 transition-colors hover:border-[var(--color-brand)]"
              >
                <h3 className="font-display text-base font-bold text-[var(--color-text-1)]">{item.shortName}</h3>
                <p className="mt-2 line-clamp-3 text-sm leading-6 text-[var(--color-text-2)]">{item.summary}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.06em] text-[var(--color-brand-strong)]">
                  Ver frente
                  <FiArrowRight aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
