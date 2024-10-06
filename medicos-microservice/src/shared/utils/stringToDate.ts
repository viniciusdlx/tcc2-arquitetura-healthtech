import dayjs from 'dayjs';

/**
 * Função que converte uma string de data no formato 'YYYY-DD-MM' para um objeto Date.
 * Utiliza a biblioteca dayjs para fazer a conversão.
 *
 * @param {string} dateString - A string que representa uma data no formato 'YYYY-DD-MM' (ex: '2000-24-01').
 * @returns {Date | null} - Retorna um objeto Date se a conversão for bem-sucedida. Retorna null se a string não for uma data válida.
 */
export function stringToDate(dateString: string): Date | null {
  // Verifica se a string está no formato correto 'YYYY-DD-MM'
  const isValidFormat = /^\d{4}-\d{2}-\d{2}$/.test(dateString);

  if (!isValidFormat) {
    // Retorna null se a string não estiver no formato esperado
    return null;
  }

  // Usa a biblioteca dayjs para converter a string para uma data
  const date = dayjs(dateString);

  // Verifica se a data é válida com o método isValid do dayjs
  if (!date.isValid()) {
    // Retorna null se a data for inválida
    return null;
  }

  // Retorna o objeto Date
  return date.toDate();
}
