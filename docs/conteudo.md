# Inventário de Conteúdo

Procedência de cada texto do site. Importa porque quem revisar precisa saber o que é
**palavra do cliente** (não mexer sem consultar) e o que foi **redigido/derivado**
(revisável livremente).

Legenda:
- 📄 **PDF** — transcrito da apresentação institucional, literal ou com correção de
  ortografia/acentuação.
- ✍️ **Redigido** — escrito para o site, a partir de fatos que estão no PDF.
- ⚠️ **A validar** — precisa de confirmação do cliente.

---

## Home (`/`)

| Bloco | Texto | Origem |
|---|---|---|
| Hero — sobretítulo | "Engenharia de Telecom e Automação" | 📄 subtítulo da capa |
| Hero — palavras rotativas | Automação · Elétrica · Telecom · Conectividade | ✍️ (padrão do site de referência; palavras vêm do PDF) |
| Hero — parágrafo | "Projetos, instalação e manutenção…" + slogan | ✍️ + 📄 "Projetamos o amanhã, hoje" |
| Faixa de destaques | 4 atributos | ✍️ derivado — ver §Destaques |
| Resumo da empresa | 2 parágrafos de "Sobre nós" | 📄 literal |
| O que fazemos | 4 cards | 📄 títulos; ✍️ resumos de uma linha |
| Onde atuamos | copy do mapa e segmentos | ✍️ ⚠️ segmentos a validar |
| Por que a NETENG | 3 parágrafos | 📄 condensado da página "Um futuro conectado e eficiente" |

## A NETENG (`/a-neteng`)

| Bloco | Origem |
|---|---|
| Sobre nós | 📄 literal |
| Missão | 📄 literal |
| Visão | 📄 literal (removidas as aspas soltas do original) |
| **Valores** | ⚠️ **derivado** — ver abaixo |

### Valores — atenção

**O PDF não tem uma página de valores.** O site de referência tem, e a seção ficou
no layout. Para não inventar, os cinco valores foram construídos **a partir de
palavras que aparecem literalmente na missão e na visão** do PDF:

> "…máxima **eficiência**, **segurança** e **conectividade**, e impulsionando seu
> desenvolvimento **sustentável**" · "…transformação digital…" → **Inovação**

Os títulos (Eficiência, Segurança, Conectividade, Inovação, Sustentabilidade) vêm do
texto do cliente; as frases de uma linha sob cada um foram redigidas. **Levar ao
cliente para confirmar ou substituir** — em `data/companyData.ts`, export `values`.

## Serviços (`/servicos` e `/servicos/[slug]`)

As frentes hoje são quatro: **Elétrica**, **Telecom**, **Climatização** e
**Automação Predial**.

Elétrica, Telecom e Automação Predial têm os bullets em 📄 **transcrição literal** das
páginas do PDF. Correções aplicadas: "ertificação" → "certificação", capitalização e
acentuação normalizadas. Os resumos de uma linha de cada frente são ✍️.

### Climatização — ⚠️ conteúdo redigido, pendente de validação técnica

**Substituiu a frente de Infraestrutura de Redes** por decisão do cliente
(2026-08-20). Não existe no PDF: título, resumo e os cinco bullets foram **redigidos
aqui** a partir da instrução "projetos de climatização de ambientes em várias
vertentes: escritórios, residências, empresarial, industrial".

Os bullets descrevem as quatro verticais pedidas mais uma linha de execução. **Não
foram validados com a engenharia** — antes de publicar, confirmar que a NETENG de
fato atende cada vertical, em especial "industrial e salas técnicas — climatização de
processo e de equipamento crítico", que é a de escopo mais especializado.

Dois ajustes de borda feitos junto:

- **Automação Predial** dizia "integração de sistemas de iluminação e climatização".
  Com Climatização virando frente própria, o texto passou a "iluminação, climatização
  e acesso sob um único supervisório" — Automação fica com integração e controle, e
  Climatização com o sistema físico. Sem isso as duas frentes se sobrepunham.
- O bloco de fechamento (`closingArgument`) citava "Infraestrutura de Redes e
  Sistemas de Comunicação". Trocado para "Projetos Elétricos e de Climatização, até
  os Sistemas de Comunicação" — é 📄 texto do PDF com edição mínima para não
  anunciar uma frente que saiu do site.

A quinta frente do PDF — **Desenvolvimento de Sistemas** — foi excluída a pedido do
cliente e não está em nenhum arquivo.

## Clientes (`/clientes`)

Sem conteúdo real ainda. Texto de espera é ✍️ e sai assim que houver logos.

## Contato (`/contato`)

| Dado | Valor | Origem |
|---|---|---|
| Telefone | +55 22 99732-1619 | 📄 |
| E-mail | comercial@neteng.com.br | 📄 |
| Site | www.neteng.com.br | 📄 |
| Endereço | Rua Aristóteles da Cunha, 179 — Chácara Mariléa, Rio das Ostras - RJ | 📄 (grafia de "Aristóteles" e "Mariléa" acentuada) |
| Chamada | "Estamos prontos para entender suas necessidades específicas…" | 📄 |

## Política de Privacidade

✍️ Redigida para o caso concreto (formulário via EmailJS, sem cookies de rastreamento,
sem banco). ⚠️ **Não passou por revisão jurídica** — ver [pendencias.md](pendencias.md).

---

## Destaques da home (a faixa de 4 atributos)

Substitui os contadores animados do site de referência. Cada atributo é rastreável ao
PDF:

| Atributo | Base no PDF |
|---|---|
| Engenharia integrada | "soluções integradas", as 3 áreas listadas na capa e na missão |
| Foco em Óleo & Gás | missão: "Fornecer à indústria de O&G…" + endereço em Rio das Ostras |
| Conformidade e segurança | "Atuação de acordo com as normas técnicas e segurança", repetido em 3 das 4 frentes |
| Do projeto à operação | "Projetos e Instalações" + "Manutenção" + "Monitoramento e controle" |

Editáveis em `data/companyData.ts`, export `highlights`.

---

## Imagens

Todas as fotos foram extraídas dos objetos internos do PDF (o chefe do cliente
selecionou o material). 35 JPEGs embutidos; 14 aproveitados.

| Arquivo | Uso |
|---|---|
| `hero/offshore.jpg` | Hero da home (2555×3845) |
| `hero/campo.jpg` | Fundo do bloco de fechamento e hero de `/clientes` |
| `sobre-offshore.jpg` | Bloco "A NETENG" (técnico de laranja em plataforma) |
| `sala-de-controle.jpg` | Hero de `/a-neteng` e galeria de automação |
| `servicos/eletrica*.jpg` (3) | Frente Elétrica |
| `servicos/telecom*.jpg` (3) | Frente Telecom |
| `servicos/climatizacao.jpg` | Frente Climatização — **única foto de HVAC do PDF** |
| `servicos/automacao.jpg` | Frente Automação Predial |
| `servicos/redes.jpg` | Cabeçalho de `/servicos` |
| `servicos/redes-switch.jpg` | **Sem uso** desde a troca da frente de Redes por Climatização |

**Descartadas**: 8 miniaturas de ~300px (eletrocalha, certificador Fluke, casa
inteligente) — resolução insuficiente para qualquer uso na tela; 5 fotos de
desenvolvimento de software (frente excluída); 3 fundos lavados de baixo contraste;
4 imagens de banco corporativo genérico (reunião, gráficos, escada de blocos) que não
mostram o serviço.
