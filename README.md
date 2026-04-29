# Meus Contos Eróticos

Site editorial em Astro, publicado como site estatico no Cloudflare Pages.

## Cloudflare Pages

Configuracao recomendada no painel:

- Framework preset: `Astro`
- Build command: `npm run build`
- Build output directory: `dist`
- Node version: `22.22.1`

O arquivo `wrangler.toml` tambem define `pages_build_output_dir = "dist"` para deploys via Wrangler.

## Comandos

```sh
npm install
npm run dev
npm run build
npm run preview
```

## SEO e Crawlers

- `@astrojs/sitemap` gera `sitemap-index.xml`.
- `public/robots.txt` aponta para o sitemap canonico com `www`.
- `public/llms.txt` permite leitura por agentes de IA.
- `public/_headers` configura cache e headers de seguranca no Cloudflare.
- `public/_redirects` redireciona dominio sem `www` para `www`.
