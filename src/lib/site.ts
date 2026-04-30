export const SITE_NAME = "Meus Contos Eróticos";
export const BRAND_MARK = "Oficina de Contos Eróticos";
export const ORGANIZATION_NAME = "Meus Contos Eróticos";
export const AUTHOR_NAME = "Feminive";
export const DEFAULT_OG_IMAGE = "/oficina.jpg";
export const SITE_DESCRIPTION =
  "Guias editoriais, técnicas e exercícios práticos para escrever contos eróticos com tensão, voz, estilo e responsabilidade adulta.";

export function authorSchema(siteUrl: URL) {
  return {
    "@type": "Person",
    name: AUTHOR_NAME,
    url: new URL("/", siteUrl).href,
    description:
      "Autora e editora de conteúdo sobre escrita erótica, narrativa curta, publicação independente e SEO para nichos adultos.",
  };
}

export function organizationSchema(siteUrl: URL) {
  return {
    "@type": "Organization",
    name: ORGANIZATION_NAME,
    url: new URL("/", siteUrl).href,
    logo: {
      "@type": "ImageObject",
      url: new URL(DEFAULT_OG_IMAGE, siteUrl).href,
    },
  };
}
