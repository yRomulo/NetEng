# Reaproveitamento do site da Track Services

O que veio do repositório `TrackServices` (`apps/frontend`), o que mudou e por quê.

## 1. Mapa de atuação

**Origem**
- `src/components/site/BrazilMapSection.tsx`
- `src/data/brazilMap.ts` (paths SVG dos 27 estados — fonte `@svg-maps/brazil`, MIT)

**Motivo da cópia**: o site de referência (Sistema Engenharia) tem uma seção de mapa
do Brasil que o cliente não aprovou. Ele preferiu o modelo usado no site da Track —
mapa SVG interativo, estados de presença destacados, pino com a marca.

**Adaptações**

| Aspecto | Track | NETENG |
|---|---|---|
| Export de presença | `trackPresence` / tipo `TrackPresence` | `netengPresence` / tipo `PresencePoint` |
| Estados marcados | BA, ES, MG, RJ, RN, RS, SP | RJ, ES |
| Fundo da seção | gradiente grafite→vinho | gradiente grafite→vinho escuro (`#101317` → `#2a1113`) |
| Estado sem presença | `#1f2a3c` (azulado) | `#1f252d` (neutro) |
| Estado com presença | `#39496a` | `#5a2f31` |
| Hover | `#c0392b` | `var(--color-brand)` (`#d83f40`) |
| Pino | `<image href="/images/logo.png">` | `<image href="/images/logo/simbolo.svg">` sobre círculo branco |
| Segmentos | segmentos da Track | O&G, indústria, predial, data centers, órgãos públicos |
| Copy | Rio das Ostras + RJ + Campos, "+100 projetos" | Rio das Ostras, RJ e ES — sem número, que a NETENG ainda não tem |

**Acessibilidade**: `aria-label` do `<svg>` foi reescrito para nomear os estados
efetivamente marcados, e a lista de segmentos virou `<ul>/<li>` (era `div`/`span`).

## 2. Formulário de contato (EmailJS)

**Origem**: `ContactSection.tsx` no commit `7e5a52f` da Track — versão anterior à
migração para o backend Postmark (2026-07-17). Recuperado do histórico do git.

**Mantido**
- dependência `@emailjs/browser`;
- variáveis `NEXT_PUBLIC_EMAILJS_SERVICE_ID` / `_TEMPLATE_ID` / `_PUBLIC_KEY`;
- campos do template: `from_name`, `company`, `email`, `phone`, `service`,
  `message`, `reply_to`, `to_email`, `site_name`;
- honeypot no campo `website`;
- fallback com links diretos de WhatsApp e e-mail já preenchidos.

**Mudado**
- **Validação inline por campo** (`aria-invalid` + `aria-describedby` + mensagem
  abaixo do input) no lugar da mensagem única de status. Alinha com a regra de erro
  por tipo: validação de formulário é inline, junto do campo.
- Estado de sucesso virou um painel próprio com opção de enviar outra mensagem.
- Telefone aceita 10–13 dígitos (era 8–20, largo demais para o formato brasileiro).

## 3. Padrões seguidos, sem cópia de código

Escritos do zero para a NETENG, mas seguindo as mesmas convenções da Track:

- conteúdo em `src/data/`, componentes só consomem;
- header fixo com estado de rolagem e menu mobile;
- `SectionHeading` no papel do `SectionEyebrow` (eyebrow + título + régua da marca);
- `PageHero` para cabeçalho de página interna;
- regra de erro por tipo (inline vs. bloco de operação);
- `<optgroup>`/`<option>` sem decoração no início do label, para preservar o
  typeahead nativo do `<select>`.

## 4. O que deliberadamente **não** veio

- Tokens de cor da Track (`--color-brand: #DC2626` e família) — a NETENG tem paleta
  própria, extraída do PDF dela.
- Barlow / Barlow Condensed — a NETENG usa Montserrat + Open Sans.
- Qualquer código de portal, autenticação, sessão ou chamada de API.
