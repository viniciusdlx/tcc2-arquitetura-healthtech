import dayjs from 'dayjs';

/**
 * Verifica se a data fornecida é anterior à data atual, ignorando o tempo.
 * @param date - Data em formato string ou dayjs
 * @returns boolean - true se a data for anterior ao dia atual, false se for o mesmo dia ou posterior.
 */
export function isBeforeToday(date: string | dayjs.Dayjs): boolean {
  // Remove a parte do tempo e compara apenas o dia
  const today = dayjs().startOf('day'); // Pega o início do dia atual (meia-noite)
  const inputDate = dayjs(date).startOf('day'); // Pega o início do dia informado (meia-noite)

  // Verifica se a data informada é anterior ao dia atual
  return inputDate.isBefore(today);
}
