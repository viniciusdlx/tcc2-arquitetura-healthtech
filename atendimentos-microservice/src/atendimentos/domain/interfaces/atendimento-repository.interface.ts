import { Atendimento } from '../entities/atendimento.entity';

type FindByDateAndHourParams = {
  date: string;
  hour: string;
};

type FindByDateAndDoctorParams = {
  date: string;
  doctorId: string;
};

export interface IAtendimentoRepository {
  insert(data: Partial<Atendimento>): Promise<Atendimento>;
  findById(id: string): Promise<Atendimento>;
  findAll(): Promise<Atendimento[]>;
  findByDateAndHour(params: FindByDateAndHourParams): Promise<Atendimento>;
  findByDateAndDoctor(
    params: FindByDateAndDoctorParams,
  ): Promise<Atendimento[]>;
}
