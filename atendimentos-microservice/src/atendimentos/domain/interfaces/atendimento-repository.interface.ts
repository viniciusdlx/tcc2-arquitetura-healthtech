import { Atendimento } from '../entities/atendimento.entity';

export interface IAtendimentoRepository {
  insert(data: Partial<Atendimento>): Promise<Atendimento>;
  findById(id: string): Promise<Atendimento>;
  findAll(): Promise<Atendimento[]>;
  findByDateAndHour(params: {
    date: string;
    hour: string;
  }): Promise<Atendimento>;
}
