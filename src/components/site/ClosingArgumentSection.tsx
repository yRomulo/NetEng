import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { closingArgument } from "@/data/companyData";

/** Página de fechamento comercial da apresentação institucional. */
export function ClosingArgumentSection() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-ink)] py-20">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/hero/campo.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-15"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)] via-[var(--color-ink-a95)] to-[var(--color-ink-a80)]" />

      <div className="container-site relative">
        <div className="max-w-3xl">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-[var(--color-brand-light)]">
            Por que a NETENG
          </p>
          <h2 className="font-display text-3xl font-extrabold text-white md:text-4xl">{closingArgument.title}</h2>
          <span className="brand-rule my-6" />

          <div className="space-y-5 text-base leading-8 text-white/70">
            {closingArgument.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>

          <Link href="/contato" className="btn-primary mt-9">
            Converse com o comercial
            <FiArrowRight aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
