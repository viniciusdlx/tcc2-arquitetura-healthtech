/**
 * Função para formatar CPF ou CNPJ sem máscara.
 * @param document - string contendo apenas os dígitos do CPF (11 dígitos) ou CNPJ (14 dígitos)
 * @returns string - documento formatado com a máscara de CPF ou CNPJ
 */
export function formatDocument(document: string): string {
  // Remove qualquer caractere que não seja número
  document = document.replace(/\D/g, '');

  // Verifica se é CPF (11 dígitos) ou CNPJ (14 dígitos)
  if (document.length === 11) {
    // Formatar como CPF: 000.000.000-00
    return document.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  } else if (document.length === 14) {
    // Formatar como CNPJ: 00.000.000/0000-00
    return document.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      '$1.$2.$3/$4-$5',
    );
  }
}
