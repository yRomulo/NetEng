# NETENG — Guia do Projeto

## Visão Geral

Site institucional **estático** da NETENG Engenharia — vertente de engenharia de
Telecom e Automação ligada à Track Services. O site é uma peça de apoio comercial:
serve para o vendedor apresentar a empresa, as frentes de atuação e capturar contato.

**Não tem** área do cliente, portal, login, backend nem banco de dados. Se aparecer
pedido nesse sentido, é mudança de escopo — levar ao usuário antes de implementar.

- **Stack**: Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS 3.4
- **Build**: static export (`output: "export"`) → HTML/CSS/JS puro em `out/`
- **Formulário**: EmailJS client-side (sem servidor)

> 📌 Este arquivo é o **guia estável de como mexer no repo**. Decisões, conteúdo,
> identidade visual e pendências ficam em [`docs/`](docs/README.md).

---

## Comandos

```bash
npm run dev      # dev server (padrão: http://localhost:3000)
npm run build    # gera o site estático em out/
npm run lint     # eslint do Next
npx tsc --noEmit # checagem de tipos
```

---

## Estrutura

```
src/
  app/                          # rotas (App Router)
    layout.tsx                  # fontes, metadata, JSON-LD, header/footer/whatsapp
    globals.css                 # tokens da marca + utilitários de componente
    page.tsx                    # Home
    a-neteng/page.tsx           # Sobre, missão, visão, valores, mapa
    servicos/page.tsx           # índice das 4 frentes (com bullets)
    servicos/[slug]/page.tsx    # página por frente (SSG via generateStaticParams)
    clientes/page.tsx           # logos de clientes (hoje em estado vazio)
    contato/page.tsx            # formulário + canais diretos
    politica-de-privacidade/page.tsx
    not-found.tsx

  components/site/
    Logo.tsx                    # ⚠ ponto único de troca da identidade visual
    SiteHeader.tsx              # header fixo + menu mobile
    Footer.tsx
    WhatsAppButton.tsx          # botão flutuante
    PageHero.tsx                # cabeçalho padrão das páginas internas
    SectionHeading.tsx          # eyebrow + título + régua da marca
    HomeHero.tsx                # hero com palavras rotativas
    HighlightsBand.tsx          # faixa de 4 atributos
    AboutTeaser.tsx             # resumo da empresa na home
    ServicesSection.tsx         # cards das frentes (prop `detailed`)
    ServiceDetailPage.tsx       # corpo da página de uma frente
    BrazilMapSection.tsx        # mapa de atuação (reaproveitado da Track)
    PartnersSection.tsx         # clientes/parceiros (prop `showWhenEmpty`)
    ClosingArgumentSection.tsx  # bloco de fechamento comercial

  data/                         # todo o conteúdo editável vive aqui
    companyData.ts              # contato, sobre, missão, visão, valores, destaques
    servicesCatalog.ts          # as 4 frentes + bullets + imagens
    contactData.ts              # opções do formulário e links diretos
    partnersData.ts             # logos de clientes (lista vazia hoje)
    siteNavigation.ts           # navegação principal e links legais
    brazilMap.ts                # paths SVG dos estados + pontos de presença

public/images/                  # fotos extraídas da apresentação institucional
```

---

## Convenções

**Conteúdo mora em `src/data/`, não nos componentes.**
Texto, telefone, endereço, bullets de serviço e lista de clientes são dados. Para
trocar um telefone ou um bullet, editar `data/` — nunca caçar string em JSX.

**Cores só por token.**
Nada de hex solto no componente. A paleta está em `globals.css` e sai do vermelho
`#D83F40` do `N` da logo — ver
[docs/identidade-visual.md](docs/identidade-visual.md). Trocar paleta é decisão do
cliente, não efeito colateral de tarefa.

**Vermelho em texto tem token próprio por fundo.**
`--color-brand` (puro) só em preenchimento, régua, ícone e elemento decorativo — em
texto pequeno ele reprova no contraste AA. Para texto: `--color-brand-strong` sobre
fundo claro, `--color-brand-light` sobre fundo escuro.

**⚠ Nunca escrever `[var(--alguma-cor)]/NN`.**
O Tailwind 3 **descarta a regra em silêncio** — não consegue aplicar alpha sobre um
`var()` com hex. Foi o que deixou o header invisível. Para overlay e gradiente sobre
o grafite, usar os tokens prontos `--color-ink-a40/80/85/90/95`.

**A logo tem um único ponto de troca: `components/site/Logo.tsx`.**
`variant="dark"` para fundo claro, `variant="light"` para fundo escuro. Nenhum outro
componente referencia os arquivos, exceto o pino do mapa, que usa `simbolo.svg`.

**Notificação de erro ao usuário — regra por TIPO de erro** (mesma da Track):
- *Validação de formulário* → **inline**, junto do campo. É o que o `ContactSection`
  faz: `errors[campo]` com `aria-invalid` + `aria-describedby`.
- *Erro de operação* (o envio falhou) → bloco `role="alert"` no rodapé do formulário,
  com os canais diretos (WhatsApp/e-mail) já preenchidos como saída.
- Não recriar toast/modal estilizado.

**Static export impõe limites.** Sem Server Actions, sem route handlers, sem
`next/image` otimizado (`images.unoptimized`), sem middleware. Links internos com
barra final (`trailingSlash: true`).

**Acessibilidade não é opcional.** Foco visível já vem do `globals.css`; imagens
decorativas levam `alt=""` + `aria-hidden`; o estado ativo do menu usa
`aria-current="page"`.

---

## Variáveis de Ambiente

Arquivo `.env.local` na raiz (modelo em `.env.local.example`):

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=
```

São chaves públicas por natureza (o EmailJS é client-side). Sem elas o formulário
valida normalmente e cai no fallback de canais diretos — não quebra.

O template do EmailJS deve aceitar: `from_name`, `company`, `email`, `phone`,
`service`, `message`, `reply_to`, `to_email`, `site_name`.

---

## Preferências de Trabalho (IMPORTANTE)

- **NUNCA fazer commit pelo usuário.** Ele verifica manualmente antes de subir.
  Pode preparar/stagear, não rodar `git commit`.

---

## Manutenção da documentação (IMPORTANTE)

`docs/` é fonte de verdade, tratada como código. Ao concluir ou alterar uma
feature, atualizar na mesma leva o documento pertinente. Doc desatualizado é dívida.

---

## Documentação (`docs/`)

- [docs/escopo-e-decisoes.md](docs/escopo-e-decisoes.md) — o que o site é, o que
  ficou de fora e por quê; decisões de stack e arquitetura.
- [docs/identidade-visual.md](docs/identidade-visual.md) — paleta, tipografia e
  a origem do vermelho da marca e a armadilha de opacidade do Tailwind.
- [docs/conteudo.md](docs/conteudo.md) — inventário de conteúdo seção a seção, com
  a origem de cada texto (transcrito do PDF vs. redigido/derivado).
- [docs/reaproveitamento-track.md](docs/reaproveitamento-track.md) — o que veio do
  site da Track Services e o que foi adaptado.
- [docs/pendencias.md](docs/pendencias.md) — o que falta para o site ir ao ar.
