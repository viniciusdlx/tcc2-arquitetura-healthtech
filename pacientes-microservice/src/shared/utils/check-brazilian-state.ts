const brazilianStates: string[] = [
  'AC',
  'AL',
  'AP',
  'AM',
  'BA',
  'CE',
  'DF',
  'ES',
  'GO',
  'MA',
  'MT',
  'MS',
  'MG',
  'PA',
  'PB',
  'PR',
  'PE',
  'PI',
  'RJ',
  'RN',
  'RS',
  'RO',
  'RR',
  'SC',
  'SP',
  'SE',
  'TO',
];

/**
 * Função para verificar se o valor informado é um código de estado brasileiro válido.
 * @param uf - O código de estado a ser verificado (deve ser uma string).
 * @returns boolean - Retorna true se o código for válido, caso contrário retorna false.
 */
export function isValidStateCode(uf: string): boolean {
  // Converte o código para maiúsculo para garantir a comparação correta
  const formattedUf = uf.toUpperCase();

  // Verifica se o valor informado está na lista de estados
  return brazilianStates.includes(formattedUf);
}
