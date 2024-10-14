import dayjs from 'dayjs';
import { Schedule } from '../types/medico-response';

type IsTimeAvailableParams = {
  date: string; // Data no formato "YYYY-MM-DD"
  time: string; // Horário no formato "HH:mm"
  schedule: Schedule; // Objeto com os horários disponíveis
};

export function isTimeAvailable({
  date,
  time,
  schedule,
}: IsTimeAvailableParams): boolean {
  // Usando dayjs para obter o dia da semana da data informada
  const dayOfWeek = dayjs(date).format('ddd').toLowerCase(); // ex: 'seg' (segunda-feira)

  // Mapear o retorno de 'ddd' para o formato do seu objeto de horários
  const daysMapping: { [key: string]: string } = {
    sun: 'dom',
    mon: 'seg',
    tue: 'ter',
    wed: 'qua',
    thu: 'qui',
    fri: 'sex',
    sat: 'sab',
  };

  // Obter o dia correspondente no objeto de horários (ex: 'seg', 'ter')
  const dayKey = daysMapping[dayOfWeek];

  // Verificar se o horário está disponível no dia
  const check = schedule[dayKey].includes(time);

  return check;
}
