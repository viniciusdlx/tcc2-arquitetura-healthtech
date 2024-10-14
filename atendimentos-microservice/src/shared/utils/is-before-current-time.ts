import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

/**
 * Verifica se o horário fornecido (HH:mm) é anterior ao horário atual.
 * @param time - Horário no formato HH:mm
 * @returns boolean - true se o horário for anterior ao horário atual, false caso contrário.
 */
export function isBeforeCurrentTime(time: string): boolean {
  // Obtém o horário atual no formato hh:mm
  const currentTime = dayjs().format('HH:mm');

  // Converte ambos os horários para objetos dayjs no formato de hoje
  const inputTime = dayjs(time, 'HH:mm');

  const nowTime = dayjs(currentTime, 'HH:mm');

  // Verifica se o horário informado é anterior ao horário atual
  return inputTime.isBefore(nowTime);
}
