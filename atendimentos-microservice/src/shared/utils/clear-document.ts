/**
 * Função que limpa os caracteres especiais de um CPF ou CNPJ, retornando apenas os números.
 * - Se o documento for um CPF, deve conter 11 dígitos.
 * - Se o documento for um CNPJ, deve conter 14 dígitos.
 *
 * @param {string} document - O CPF ou CNPJ com formatação (ex: '123.456.789-09' ou '12.345.678/0001-99').
 * @returns {string | null} - Retorna o documento limpo contendo apenas números. Retorna null se o tamanho for inválido.
 */
export function clearDocument(document: string): string | null {
  // Remove todos os caracteres que não sejam números usando uma expressão regular
  const cleanedDocument = document.replace(/\D/g, '');

  // Verifica se o documento tem 11 caracteres (CPF) ou 14 caracteres (CNPJ)
  if (cleanedDocument.length === 11 || cleanedDocument.length === 14) {
    return cleanedDocument;
  }

  // Retorna null se o documento não tiver o número de dígitos esperado
  return null;
}
