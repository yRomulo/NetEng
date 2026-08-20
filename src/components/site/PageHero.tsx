type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  image?: string;
};

/** Cabeçalho padrão das páginas internas. */
export function PageHero({ eyebrow, title, description, image }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-[var(--color-ink)]">
      {image && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-ink)] via-[var(--color-ink-a85)] to-transparent" />
        </>
      )}
      <div className="container-site relative py-20 md:py-24">
        {eyebrow && (
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-[var(--color-brand-light)]">{eyebrow}</p>
        )}
        <h1 className="font-display text-4xl font-extrabold text-white md:text-5xl">{title}</h1>
        <span className="brand-rule my-5" />
        {description && <p className="max-w-2xl text-base leading-8 text-white/70">{description}</p>}
      </div>
    </section>
  );
}
