import { partners } from "@/data/partnersData";
import { SectionHeading } from "./SectionHeading";

type PartnersSectionProps = {
  /** Em /clientes o vazio precisa aparecer; na home a seção some até haver marcas. */
  showWhenEmpty?: boolean;
};

export function PartnersSection({ showWhenEmpty = false }: PartnersSectionProps) {
  if (partners.length === 0 && !showWhenEmpty) return null;

  return (
    <section className="bg-[var(--color-surface-alt)] py-20">
      <div className="container-site">
        <SectionHeading
          eyebrow="Quem confia na gente"
          title="Clientes e parceiros"
          description="Empresas que contam com a NETENG para projetar, instalar e manter sua infraestrutura crítica."
          align="center"
        />

        {partners.length > 0 ? (
          <ul className="mt-14 grid grid-cols-2 items-center gap-x-8 gap-y-12 sm:grid-cols-3 lg:grid-cols-5">
            {partners.map((partner) => (
              <li key={partner.name} className="flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-14 w-auto opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0"
                />
              </li>
            ))}
          </ul>
        ) : (
          <p className="mx-auto mt-12 max-w-xl rounded-2xl border border-dashed border-[var(--color-border)] bg-white px-8 py-12 text-center text-sm leading-7 text-[var(--color-text-2)]">
            Estamos reunindo as autorizações de uso de marca dos nossos clientes. Enquanto isso, fale com o comercial —
            apresentamos os casos sob acordo de confidencialidade.
          </p>
        )}
      </div>
    </section>
  );
}
