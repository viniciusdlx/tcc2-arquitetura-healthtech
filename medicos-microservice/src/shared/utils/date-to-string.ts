import dayjs from 'dayjs';
import type { FormatDateTypes } from '../types/utils.types';

export function dateToString(date: Date, format?: FormatDateTypes): string {
  if (!format) {
    format = 'YYYY-MM-DD';
  }

  return dayjs(date).format(format);
}
