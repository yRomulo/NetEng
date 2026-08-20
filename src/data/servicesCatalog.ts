export type ServiceItem = {
  slug: string;
  name: string;
  shortName: string;
  summary: string;
  bullets: string[];
  image: string;
  gallery: string[];
};

/**
 * Elétrica, Telecom e Automação Predial vêm transcritas da apresentação
 * institucional 2026. Climatização substituiu a frente de Infraestrutura de Redes
 * por decisão do cliente e teve o conteúdo redigido aqui — pendente de validação
 * técnica (ver docs/conteudo.md).
 */
export const servicesCatalog: ServiceItem[] = [
  {
    slug: "instalacoes-eletricas",
    name: "Projetos e Instalações Elétricas",
    shortName: "Elétrica",
    summary:
      "Projeto, montagem e manutenção de instalações elétricas em baixa e média tensão, dentro das normas técnicas e de segurança.",
    bullets: [
      "Soluções em engenharia elétrica",
      "Montagem de painéis elétricos",
      "Manutenção de instalações de baixa e média tensão",
      "Atuação de acordo com as normas técnicas e de segurança"
    ],
    image: "/images/servicos/eletrica.jpg",
    gallery: ["/images/servicos/eletrica-paineis.jpg", "/images/servicos/eletrica-ferramentas.jpg"]
  },
  {
    slug: "instalacoes-telecom",
    name: "Projetos e Instalações de Telecom",
    shortName: "Telecom",
    summary:
      "Fibra óptica e rede estruturada do lançamento à fusão, com execução conforme norma e certificação dos enlaces.",
    bullets: [
      "Instalações de fibra óptica",
      "Instalações de rede estruturada",
      "Conectorização e fusões de fibra óptica",
      "Atuação de acordo com as normas técnicas e de segurança"
    ],
    image: "/images/servicos/telecom.jpg",
    gallery: ["/images/servicos/telecom-fibra.jpg", "/images/servicos/telecom-fusao.jpg"]
  },
  {
    slug: "climatizacao",
    name: "Projetos e Instalações de Climatização",
    shortName: "Climatização",
    summary:
      "Projeto, instalação e manutenção de climatização em qualquer porte de ambiente — do escritório à planta industrial.",
    bullets: [
      "Escritórios e ambientes corporativos — conforto térmico com controle de consumo",
      "Residências e condomínios — sistemas dimensionados ambiente a ambiente",
      "Comercial e empresarial — soluções para grandes áreas e ocupação variável",
      "Industrial e salas técnicas — climatização de processo e de equipamento crítico",
      "Projeto, instalação e manutenção preventiva conforme as normas técnicas e de segurança"
    ],
    image: "/images/servicos/climatizacao.jpg",
    gallery: []
  },
  {
    slug: "automacao-predial",
    name: "Automação Predial e Sistemas de Controle",
    shortName: "Automação Predial",
    summary:
      "Integração e controle centralizado dos sistemas do edifício — iluminação, climatização e acessos sob um único supervisório.",
    bullets: [
      "Soluções inteligentes para edifícios comerciais e residenciais",
      "Integração dos sistemas de iluminação, climatização e acesso",
      "Criação de ambientes mais confortáveis, seguros e integrados",
      "Monitoramento e controle"
    ],
    image: "/images/servicos/automacao.jpg",
    gallery: ["/images/sala-de-controle.jpg"]
  }
];

export function findService(slug: string): ServiceItem | undefined {
  return servicesCatalog.find((service) => service.slug === slug);
}
