import dayjs from 'dayjs';

/**
 * Função para vericiar se a data informada é a data atual
 * @param date string
 * @returns boolean - true se for a data de hoje
 */
export function isToday(date: string): boolean {
  const inputDate = dayjs(date); // Converter a data informada para um objeto dayjs
  const today = dayjs(); // Obter a data atual

  // Comparar ano, mês e dia
  return inputDate.isSame(today, 'day');
}
