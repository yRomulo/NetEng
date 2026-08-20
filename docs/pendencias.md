# Pendências para publicar

Estado em **2026-08-20**. O site está funcional ponta a ponta: `npx tsc --noEmit`
limpo, `next build` gerando 12 páginas estáticas, sem erro de console, sem overflow
horizontal no mobile.

## Bloqueantes

### 1. Chaves do EmailJS
Criar serviço e template em <https://dashboard.emailjs.com/admin> e preencher
`.env.local` (modelo em `.env.local.example`).

Template precisa aceitar: `from_name`, `company`, `email`, `phone`, `service`,
`message`, `reply_to`, `to_email`, `site_name`.

Sem as chaves o formulário não quebra — valida e oferece WhatsApp/e-mail já
preenchidos —, mas o envio formal, que foi o motivo de escolher EmailJS, não funciona.

## Não bloqueantes

### 2. Versões oficiais escura e do símbolo da logo
O cliente exportou a **página 1** do Canva (arte escura, para fundo claro) — é o
`logo.svg`, em uso no header. As outras duas variantes são hoje **derivadas** por
transformação do arquivo oficial:

- `logo-dark.svg` (footer e fundos escuros) — preto trocado por branco;
- `simbolo.svg` (pino do mapa) — recorte do viewBox no `N` + arco.

Se as páginas **3 (escura)** e **2 (símbolo)** forem exportadas, basta sobrescrever
esses dois arquivos — nenhum código muda. Detalhe em
[identidade-visual.md](identidade-visual.md#6-arquivos-da-logo).

### 3. Climatização — validar escopo técnico e conseguir fotos
A frente substituiu Infraestrutura de Redes e **não vem do PDF**: título, resumo e
bullets foram redigidos. Duas coisas a resolver antes de publicar:

- **Validar com a engenharia** se a NETENG atende as quatro verticais descritas
  (escritórios, residências, comercial, industrial/salas técnicas). A última é a de
  escopo mais especializado. Editar em `data/servicesCatalog.ts`.
- **Fotos**: o PDF só tinha uma imagem de HVAC (`servicos/climatizacao.jpg`), então a
  frente ficou com galeria vazia — a página de detalhe mostra uma imagem só, contra
  três das outras. É a frente que mais ganha com fotos reais.

### 4. Logos de clientes
`src/data/partnersData.ts` está vazio de propósito. A seção some da home e mostra
texto de espera em `/clientes`. Popular a lista quando as marcas forem liberadas —
nenhum componente precisa mudar.

### 5. Valores da empresa
Derivados do vocabulário da missão/visão porque o PDF não tem página de valores.
Confirmar ou substituir com o cliente — `data/companyData.ts`, export `values`.
Detalhe em [conteudo.md](conteudo.md#valores--atenção).

### 6. Segmentos de atuação
A lista no mapa (O&G, indústria, predial, data centers, órgãos públicos) foi redigida
a partir do perfil da empresa, não do PDF. Validar com o comercial —
`BrazilMapSection.tsx`, const `segments`.

### 7. Revisão jurídica da Política de Privacidade
Redigida para o caso concreto (formulário via EmailJS, sem cookies de rastreamento,
sem banco de dados). Não passou por advogado.

### 8. Fotos próprias
As 14 fotos em uso vêm do PDF e são de banco de imagens. Fotos reais de obra e de
campo elevariam bastante a peça — especialmente nas páginas de frente, onde hoje há
foto genérica. Substituir em `public/images/servicos/` mantendo os nomes de arquivo.

### 9. Publicação
Falta definir host e apontar `neteng.com.br`. `npm run build` gera `out/` — pasta
estática que sobe em Vercel, Netlify, S3+CloudFront, ou qualquer servidor web.
