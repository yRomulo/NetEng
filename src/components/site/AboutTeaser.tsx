import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { aboutText } from "@/data/companyData";
import { SectionHeading } from "./SectionHeading";

/** Resumo da empresa na home — o texto completo vive em /a-neteng. */
export function AboutTeaser() {
  return (
    <section className="bg-[var(--color-surface)] py-20">
      {/* items-stretch: a imagem acompanha a altura da coluna de texto, em vez de
          ficar centralizada e deixar a seção desalinhada. */}
      <div className="container-site grid items-stretch gap-14 lg:grid-cols-2">
        <div className="relative lg:h-full">
          <div className="overflow-hidden rounded-2xl lg:h-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/sobre-offshore.jpg"
              alt="Técnico com EPI em plataforma offshore"
              className="aspect-[4/3] w-full object-cover object-center lg:aspect-auto lg:h-full"
            />
          </div>
          <div
            className="absolute -bottom-5 -right-3 hidden h-28 w-28 rounded-2xl bg-[var(--color-brand)] lg:block"
            aria-hidden="true"
          />
        </div>

        <div>
          <SectionHeading eyebrow="A NETENG" title="Sua parceira estratégica para o futuro da engenharia" />
          <div className="space-y-5 text-base leading-8 text-[var(--color-text-2)]">
            {aboutText.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
          <Link
            href="/a-neteng"
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.06em] text-[var(--color-brand-strong)] hover:text-[var(--color-brand-hover)]"
          >
            Conheça a empresa
            <FiArrowRight aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
