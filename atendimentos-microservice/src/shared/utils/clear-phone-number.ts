/**
 * Função que limpa caracteres especiais e inválidos de um número de telefone, retornando apenas os números.
 * - Remove espaços, traços, parênteses e outros caracteres não numéricos.
 * - Retorna null se a string não contiver números suficientes para ser considerada um número de telefone válido.
 *
 * @param {string} phoneNumber - O número de telefone a ser limpo (ex: '(11) 91234-5678').
 * @returns {string | null} - Retorna o número de telefone limpo contendo apenas números. Retorna null se o número for inválido.
 */
export function clearPhoneNumber(phoneNumber: string): string | null {
  // Remove todos os caracteres que não sejam números usando uma expressão regular
  const cleanedPhoneNumber = phoneNumber.replace(/\D/g, '');

  // Verifica se o número de telefone tem entre 10 e 11 dígitos (formato mais comum no Brasil)
  if (cleanedPhoneNumber.length === 10 || cleanedPhoneNumber.length === 11) {
    return cleanedPhoneNumber;
  }

  // Retorna null se o número de telefone for inválido
  return null;
}
