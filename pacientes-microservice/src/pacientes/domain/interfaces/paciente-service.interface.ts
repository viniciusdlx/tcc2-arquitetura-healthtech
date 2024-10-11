import { CreatePacienteDto } from 'src/pacientes/presentation/dtos/create-paciente.dto';
import { PacienteOutputDto } from 'src/pacientes/presentation/dtos/paciente-output.dto';

export interface IPacienteService {
  create(request: CreatePacienteDto): Promise<PacienteOutputDto>;
  findById(id: string): Promise<PacienteOutputDto>;
  getAll(): Promise<PacienteOutputDto[]>;
  findByCpf(cpf: string): Promise<PacienteOutputDto>;
}
