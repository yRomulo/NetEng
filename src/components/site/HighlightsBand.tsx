import { highlights } from "@/data/companyData";

/**
 * Ocupa o lugar da faixa de contadores do site de referência. A NETENG é de 2025
 * e não tem volume histórico a exibir — a faixa comunica atributos, não números.
 */
export function HighlightsBand() {
  return (
    <section className="border-b border-[var(--color-border)] bg-[var(--color-surface-alt)] py-16">
      <div className="container-site grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {highlights.map((highlight, position) => (
          <div key={highlight.title} className="border-l-2 border-[var(--color-brand)] pl-5">
            <p className="font-display text-3xl font-extrabold text-[var(--color-brand-soft)]">
              {String(position + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-1 font-display text-lg font-bold text-[var(--color-text-1)]">{highlight.title}</h3>
            <p className="mt-2 text-sm leading-7 text-[var(--color-text-2)]">{highlight.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
