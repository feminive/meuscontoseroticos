export function slugifyTag(tag: string) {
  return tag
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function titleFromTag(tag: string) {
  return tag
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function descriptionFromTag(tag: string) {
  const descriptions: Record<string, string> = {
    escrita: "Como escrever contos com mais estrutura, cena, personagem, tensão, estilo e revisão.",
    dicas: "Como construir e manter um site: domínio, SEO, categorias, publicação e ferramentas.",
    blog: "Opiniões, bastidores, reflexões, atualizações e ideias livres sobre escrita e publicação.",
    universo: "Autores, mercado, plataformas, censura, tendências e contexto da literatura erótica.",
  };

  const key = slugifyTag(tag);
  if (descriptions[key]) return descriptions[key];

  return `Posts marcados com ${tag}, organizados em uma trilha editorial do site.`;
}
