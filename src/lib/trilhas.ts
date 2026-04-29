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
  return `Posts marcados com ${tag}, organizados em uma trilha editorial do site.`;
}
