import { AtendimentoModalidadeEnum } from 'src/atendimentos/domain/entities/atendimento.entity';

/**
 * Função para verificar se o valor informado é válido no enum AtendimentoModalidadeEnum.
 * @param value - Valor a ser verificado.
 * @returns boolean - true se o valor estiver no enum, false caso contrário.
 */
export function isModalityAppointment(value: string): boolean {
  return Object.values(AtendimentoModalidadeEnum).includes(
    value as AtendimentoModalidadeEnum,
  );
}
