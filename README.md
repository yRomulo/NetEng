# Site NETENG Engenharia

Site institucional estático da NETENG — engenharia de Telecom e Automação.
Next.js 16 + React 19 + TypeScript + Tailwind CSS, exportado como HTML estático.

## Rodando

```bash
npm install
npm run dev
```

Abre em <http://localhost:3000>.

## Build de produção

```bash
npm run build
```

Gera o site estático em `out/` — publicável em qualquer host de arquivos.

## Configuração

Copie `.env.local.example` para `.env.local` e preencha as chaves do EmailJS
(formulário de contato). Sem elas o formulário continua funcionando e oferece
WhatsApp e e-mail como canais diretos.

## Documentação

- [CLAUDE.md](CLAUDE.md) — como mexer no repo: comandos, estrutura, convenções.
- [docs/](docs/README.md) — escopo, decisões, identidade visual, conteúdo e pendências.
