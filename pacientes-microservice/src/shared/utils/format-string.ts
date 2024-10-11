// Remove acentos, caracteres especiais e converte para snake_case
export function formatSlugFromString(string: string): string {
  if (!string) {
    return string;
  }

  const str = string
    .normalize('NFD') // Normaliza a string, separando caracteres acentuados
    .replace(/[\u0300-\u036f]/g, '') // Remove os acentos
    .replace(/\W+/g, '_') // Substitui caracteres especiais e espaços por _
    .toLowerCase(); // Converte tudo para minúsculas

  return str;
}
