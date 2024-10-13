/**
 * Função para validar um número de telefone no formato brasileiro.
 *
 * Um número de telefone brasileiro pode ter 10 ou 11 dígitos, onde:
 * - Números de 10 dígitos representam números fixos (com DDD).
 * - Números de 11 dígitos representam números móveis, onde o primeiro dígito do número é '9'.
 *
 * A função também valida o DDD para garantir que seja um DDD válido no Brasil.
 *
 * @param telefone - O número de telefone a ser validado (pode conter caracteres especiais).
 * @returns Retorna `true` se o número for válido, e `false` caso contrário.
 */
export function validateBrazilianPhone(telefone: string): boolean {
  // Remove all non-numeric characters
  const cleanNumber = telefone.replace(/\D/g, '');

  // Check if the number has 10 or 11 digits
  if (cleanNumber.length !== 10 && cleanNumber.length !== 11) {
    return false;
  }

  // Extract DDD and the main number
  const ddd = cleanNumber.substring(0, 2);
  const mainNumber = cleanNumber.substring(2);

  // Validate DDD (list of valid DDDs in Brazil)
  const validDDDs = [
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19', // São Paulo
    '21',
    '22',
    '24', // Rio de Janeiro
    '27',
    '28', // Espírito Santo
    '31',
    '32',
    '33',
    '34',
    '35',
    '37',
    '38', // Minas Gerais
    '41',
    '42',
    '43',
    '44',
    '45',
    '46', // Paraná
    '47',
    '48',
    '49', // Santa Catarina
    '51',
    '53',
    '54',
    '55', // Rio Grande do Sul
    '61', // Distrito Federal
    '62',
    '64', // Goiás
    '63', // Tocantins
    '65',
    '66', // Mato Grosso
    '67', // Mato Grosso do Sul
    '68', // Acre
    '69', // Rondônia
    '71',
    '73',
    '74',
    '75',
    '77', // Bahia
    '79', // Sergipe
    '81',
    '87', // Pernambuco
    '82', // Alagoas
    '83', // Paraíba
    '84', // Rio Grande do Norte
    '85',
    '88', // Ceará
    '86',
    '89', // Piauí
    '91',
    '93',
    '94', // Pará
    '92',
    '97', // Amazonas
    '95', // Roraima
    '96', // Amapá
    '98',
    '99', // Maranhão
  ];

  if (!validDDDs.includes(ddd)) {
    return false;
  }

  // Validate mobile and landline numbers
  // Mobile numbers start with 9 and have 11 digits in total
  // Landline numbers start with 2 to 5 and have 10 digits in total
  if (cleanNumber.length === 11) {
    // Mobile number (11 digits)
    if (mainNumber[0] !== '9') {
      return false;
    }
  } else if (cleanNumber.length === 10) {
    // Landline number (10 digits)
    if (!['2', '3', '4', '5'].includes(mainNumber[0])) {
      return false;
    }
  }

  return true;
}
