# Identidade Visual

## 1. A cor da marca é o vermelho da logo

**Correção de rota (2026-08-20).** A primeira versão deste site usou um laranja
`#FD841F` extraído por contagem de pixels do grafismo diagonal da capa do PDF. Estava
errado: aquele grafismo é **decoração do template do Canva**, não identidade da
NETENG. O cliente apontou o erro.

A cor da marca é a que está **dentro do arquivo da logo**: o `N` do wordmark é
`#D83F40` — um vermelho. É o único fill colorido do SVG (o resto é preto e branco).

## 2. Tokens

Definidos em `src/app/globals.css`. **Nenhum componente usa hex solto.**

```css
/* Marca */
--color-brand:        #d83f40;  /* vermelho do "N" — preenchimento, réguas, ícones */
--color-brand-strong: #bd3234;  /* texto e botões sobre fundo CLARO */
--color-brand-light:  #ef6b6b;  /* texto sobre fundo ESCURO */
--color-brand-hover:  #a72b2d;
--color-brand-deep:   #8e2426;
--color-brand-soft:   #f4caca;
--color-brand-tint:   #fdf3f3;

/* Grafite */
--ink-rgb:            16 19 23;
--color-ink:          rgb(var(--ink-rgb));
--color-ink-a40/80/85/90/95;    /* variantes com alpha — ver §4 */
--color-ink-soft:     #1a1f26;
--color-ink-line:     #2a313a;

/* Superfícies e texto */
--color-surface: #ffffff;  --color-surface-alt: #f7f8fa;
--color-text-1:  #101317;  --color-text-2: #4b5563;  --color-text-3: #9aa3af;
--color-border:  #e5e7eb;
```

### Por que três vermelhos

O vermelho puro `#D83F40` dá **4.46:1** sobre branco e **4.16:1** sobre o grafite.
Isso passa no AA para texto grande (3:1) e **reprova** para texto pequeno (4.5:1) —
e quase todo o vermelho do site está em rótulos `text-xs` em caixa alta.

Por isso a divisão:

| Token | Contraste | Onde usar |
|---|---|---|
| `--color-brand` | — | Preenchimento, réguas, ícones, diagonal do hero, mapa. Nunca em texto pequeno. |
| `--color-brand-strong` | 5.6:1 sobre branco | Texto, links e botões sobre fundo claro. |
| `--color-brand-light` | 6.2:1 sobre grafite | Texto e links sobre fundo escuro. |

`SectionHeading` já escolhe sozinho pelo prop `variant`.

## 3. Tipografia

| Uso | Fonte | Por quê |
|---|---|---|
| Títulos (`h1`–`h4`) | **Montserrat** 600/700/800 | Fonte do site de referência; o peso geométrico casa com o wordmark. |
| Corpo | **Open Sans** 400–700 | Fonte usada no PDF institucional. |

Carregadas por `next/font/google` no `layout.tsx`, expostas como `--font-montserrat`
e `--font-open-sans`, mapeadas no Tailwind como `font-display` e `font-sans`.

## 4. Armadilha do Tailwind 3: opacidade sobre `var()`

**O Tailwind 3 descarta em silêncio** regras como `bg-[var(--color-ink)]/85`. Ele não
consegue injetar alpha num `var()` que carrega um hex, e simplesmente não emite a
declaração — sem erro, sem aviso.

Foi exatamente isso que deixou o header invisível: `bg-[var(--color-ink)]/85` não
gerou nada, o header ficou transparente sobre o `pt-[80px]` branco do `<main>`, e o
texto branco sumiu no branco. O mesmo bug atingia cinco paradas de gradiente.

**Regra:** para overlay e gradiente, usar os tokens `--color-ink-aNN`, que já contêm
o alpha. Nunca escrever `[var(--qualquer-cor)]/NN`.

## 5. Header claro

O header é **branco sólido com texto grafite**, ganhando borda e sombra ao rolar.

Dois motivos: a versão da logo que temos é a clara (arte escura), que precisa de fundo
claro; e um header sólido elimina de vez a classe de bug do §4. O hero e as demais
seções escuras continuam grafite — o contraste entre header claro e hero escuro é
intencional.

## 6. Arquivos da logo

Em `public/images/logo/`:

| Arquivo | O que é | Origem |
|---|---|---|
| `logo.svg` | Wordmark completo, arte escura (preto + `N` vermelho) | **Oficial** — exportado do Canva pelo cliente |
| `logo-dark.svg` | Mesmo wordmark em branco + `N` vermelho, para fundo escuro | **Derivado** — `#000000` → `#ffffff` |
| `simbolo.svg` | Só o `N` com o arco de sinal | **Derivado** — recorte do viewBox |

Dois ajustes feitos no arquivo oficial:

1. **Removidos dois `<rect>` brancos** que cobriam a tela inteira — o SVG do Canva vem
   com fundo opaco, o que produziria uma caixa branca sobre o footer grafite.
2. **viewBox recortado** de `0 0 375 375` para `19 19 345 116`. A arte ocupava só um
   terço do quadrado; sem o recorte a logo renderiza minúscula dentro de um bloco de
   espaço vazio.

`components/site/Logo.tsx` é o **ponto único de troca** — `variant="dark"` (fundo
claro) e `variant="light"` (fundo escuro). As versões oficiais escura e do símbolo
(páginas 3 e 2 do Canva) podem substituir os derivados sem tocar em código.

## 7. Regra de precedência

Identidade visual é decisão do cliente, não efeito colateral de tarefa. Sugestão de
trocar paleta ou tipografia é **rebrand** — vira proposta ao usuário. Regras de
qualidade e acessibilidade (contraste, alvo de toque, foco visível) são outra
categoria e podem ser aplicadas em UI nova sem consulta.
