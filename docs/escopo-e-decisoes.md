# Escopo e Decisões

Data de início: **2026-08-20**.

## 1. O que o site é

Site institucional **estático** da NETENG Engenharia. O público é o cliente
corporativo que está conhecendo a empresa; o usuário interno é o **comercial**, que
precisa de uma peça para apresentar a empresa, mostrar as frentes de atuação e ter
argumento e amostra na hora da proposta.

Fontes do projeto:

- **Conteúdo**: `APRESENTAÇÃO INSTITUCIONAL 2026.pdf` (39 páginas), fornecida pelo
  dono da NETENG.
- **Referência de layout**: [sistemaengenharia.com.br](https://sistemaengenharia.com.br)
  — Sistema Engenharia.
- **Reaproveitamento**: site da Track Services (mapa de atuação e padrão do
  formulário de contato) — ver [reaproveitamento-track.md](reaproveitamento-track.md).

## 2. O que ficou de fora — e por quê

| Item | Motivo |
|---|---|
| **Desenvolvimento de Sistemas** (5ª frente do PDF) | Excluído a pedido do cliente. As fotos e a página correspondentes do PDF foram descartadas. |
| **Área do Cliente / portal / login** | O site não tem backend. Fora de escopo por definição. |
| **Seção "Baixe o APP"** | A NETENG não tem aplicativo; era conteúdo específico do site de referência. |
| **Seção "Líderes"** | Excluída a pedido do cliente. |
| **Seção "Depoimentos"** | Excluída a pedido do cliente. |
| **Mapa do Brasil do site de referência** | O cliente não gostou do modelo. Substituído pelo mapa da Track. |
| **Faixa de contadores animados** | A NETENG é de 2025 e não tem volume histórico (m² construídos, obras entregues). Exibir "+00 anos" seria contraproducente. Substituída por uma faixa de **4 atributos**. |

## 3. Decisões

### 3.1 Repositório próprio, não pacote compartilhado com a Track

O que veio da Track foi **copiado**, não extraído para uma biblioteca comum. A NETENG
é um produto independente com ciclo de vida próprio; um pacote compartilhado criaria
acoplamento entre dois sites que vão evoluir em direções diferentes. O custo é
duplicação de ~2 arquivos; o benefício é que mexer em um site nunca quebra o outro.

### 3.2 Next.js + static export, não HTML puro

O site poderia ser HTML/CSS estático. Optamos por Next.js porque:

- permite copiar o mapa da Track (componente React + dados) sem reescrever;
- é a stack que a equipe já mantém no site da Track — zero curva de aprendizado;
- `output: "export"` entrega o mesmo resultado final: arquivos estáticos, sem
  servidor Node em produção, publicáveis em qualquer host.

Consequências assumidas: sem Server Actions, sem route handlers, sem otimização de
imagem do `next/image`, `trailingSlash: true` nos links internos.

### 3.3 Multi-página com rotas reais, não SPA de rolagem

A primeira proposta foi uma página única com âncoras. **Revertida** a pedido do
usuário: ele quer troca de tela e rotas na navbar. Estrutura final:

| Rota | Conteúdo |
|---|---|
| `/` | Hero, destaques, resumo da empresa, 4 frentes, mapa, clientes, fechamento |
| `/a-neteng` | Sobre, missão, visão, valores, mapa, fechamento |
| `/servicos` | As 4 frentes com os itens de cada uma |
| `/servicos/[slug]` | Página por frente (4 páginas geradas por `generateStaticParams`) |
| `/clientes` | Logos de clientes e parceiros |
| `/contato` | Formulário + telefone, e-mail, endereço, WhatsApp |
| `/politica-de-privacidade` | Exigida pela presença do formulário |

### 3.4 Formulário via EmailJS

Escolhido pelo usuário: é o que a Track usava nas primeiras versões do site e
funcionou bem. Vantagem sobre `mailto:`: o visitante não sai do site nem precisa de
cliente de e-mail configurado — a experiência é formal, adequada a quem está
conhecendo a empresa.

Implementação em `components/site/ContactSection.tsx`, replicando o padrão que
existia na Track (mesmos campos de template, mesmo honeypot). Duas diferenças
deliberadas em relação ao original:

1. **Validação inline por campo**, não uma mensagem única no rodapé — segue a regra
   de erro por tipo (validação de formulário = inline, junto do campo).
2. **Degradação explícita**: sem as variáveis de ambiente, o formulário continua
   validando e oferece WhatsApp e e-mail **já preenchidos** com os dados digitados.
   O visitante nunca fica sem caminho.

### 3.5 Seção de clientes preparada, mas vazia

`data/partnersData.ts` exporta uma lista vazia. A seção some da home enquanto estiver
vazia (`PartnersSection` sem `showWhenEmpty`) e, em `/clientes`, mostra um texto de
espera em vez de um bloco quebrado. Quando as marcas forem liberadas, basta popular a
lista — nenhum componente muda.

### 3.6 Climatização no lugar de Infraestrutura de Redes

Em 2026-08-20 o cliente trocou a frente de **Infraestrutura de Redes e
Conectividade** por **Climatização**, cobrindo escritórios, residências, ambiente
empresarial e industrial.

Consequência a acompanhar: as outras três frentes são transcrição do PDF, esta é
texto redigido e **ainda não validado com a engenharia** — ver
[conteudo.md](conteudo.md#climatização--️-conteúdo-redigido-pendente-de-validação-técnica).
A frente também é a única sem acervo de fotos: o PDF só tinha uma imagem de HVAC.

### 3.7 Header claro sobre hero escuro

O header começou grafite com texto branco e foi trocado para **branco sólido com
texto grafite**. Dois motivos: a versão da logo disponível é a de arte escura, que
exige fundo claro; e o header transparente dependia de um padrão de CSS que o
Tailwind 3 descarta em silêncio — ver
[identidade-visual.md §4](identidade-visual.md#4-armadilha-do-tailwind-3-opacidade-sobre-var).

### 3.8 Estados de atuação: RJ e ES

Definido com o usuário para a primeira versão, coerente com a base em Rio das Ostras.
Editável em `data/brazilMap.ts` (`netengPresence`).
