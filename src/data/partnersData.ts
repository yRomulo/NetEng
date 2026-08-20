export type Partner = {
  name: string;
  /** Caminho em /public/images/parceiros. Preferir SVG ou PNG com fundo transparente. */
  logo: string;
};

/**
 * Vazio até o cliente liberar as marcas. A seção de clientes se auto-oculta
 * enquanto esta lista estiver vazia — ver components/site/PartnersSection.tsx.
 */
export const partners: Partner[] = [];
