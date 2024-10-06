import { Medico } from '../entities/medico.entity';

export interface IMedicoRepository {
  insert(data: Partial<Medico>): Promise<Medico>;
  findById(id: string): Promise<Medico>;
  findAll(): Promise<Medico[]>;
}
