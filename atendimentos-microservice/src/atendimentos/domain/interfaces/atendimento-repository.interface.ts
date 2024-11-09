import { Atendimento } from '../entities/atendimento.entity';

type FindByDateAndDoctorParams = {
  date: string;
  doctorId: string;
};

type FindWithQuery = {
  medicoId?: string;
  pacienteId?: string;
};

export interface IAtendimentoRepository {
  insert(data: Partial<Atendimento>): Promise<Atendimento>;
  findById(id: string): Promise<Atendimento>;
  findAll(query?: FindWithQuery): Promise<Atendimento[]>;
  findByDateAndDoctor(
    params: FindByDateAndDoctorParams,
  ): Promise<Atendimento[]>;
}
