import { Paciente } from '../entities/paciente.entity';

export interface IPacienteRepository {
  insert(data: Partial<Paciente>): Promise<Paciente>;
  findById(id: string): Promise<Paciente>;
  findAll(): Promise<Paciente[]>;
  findByCpf(cpf: string): Promise<Paciente>;
}
