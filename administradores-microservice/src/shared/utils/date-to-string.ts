import dayjs from 'dayjs';
import type { FormatDateTypes } from '../types/utils.types';

export function dateToString(date: Date, format?: FormatDateTypes): string {
  if (!format) {
    format = 'YYYY-MM-DD';
  }

  const formated = dayjs(date).format(format);

  return formated;
}
