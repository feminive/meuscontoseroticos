export const SITE_NAME = "Oficina de Contos";
export const ORGANIZATION_NAME = "Meus Contos Eróticos";
export const SITE_DESCRIPTION =
  "Guias editoriais, técnicas e exercícios práticos para escrever contos com mais clareza, tensão e estilo.";

export function organizationSchema(siteUrl: URL) {
  return {
    "@type": "Organization",
    name: ORGANIZATION_NAME,
    url: new URL("/", siteUrl).href,
    logo: {
      "@type": "ImageObject",
      url: new URL("/opengraph.webp", siteUrl).href,
    },
  };
}
