import { Injectable } from '@nestjs/common';
import { IPacienteService } from 'src/pacientes/domain/interfaces/paciente-service.interface';
import { CreatePacienteDto } from 'src/pacientes/presentation/dtos/create-paciente.dto';
import { PacienteOutputDto } from 'src/pacientes/presentation/dtos/paciente-output.dto';
import { CreatePacienteUseCase } from '../usecases/create-paciente.usecase';
import { FindPacienteByIdUseCase } from '../usecases/find-medico-by-id.usecase';
import { FindPacienteByCpfUseCase } from '../usecases/find-paciente-by-cpf.usecase';
import { GetAllPacientesUseCase } from '../usecases/get-all-pacientes.usecase';

@Injectable()
export class PacienteService implements IPacienteService {
  constructor(
    private readonly createPacienteUseCase: CreatePacienteUseCase,
    private readonly findPacienteByIdUseCase: FindPacienteByIdUseCase,
    private readonly getAllPacientesUseCase: GetAllPacientesUseCase,
    private readonly findPacienteByCpfUseCase: FindPacienteByCpfUseCase,
  ) {}

  async create(request: CreatePacienteDto): Promise<PacienteOutputDto> {
    return await this.createPacienteUseCase.execute(request);
  }

  async findById(id: string): Promise<PacienteOutputDto> {
    return await this.findPacienteByIdUseCase.execute(id);
  }

  async getAll(): Promise<PacienteOutputDto[]> {
    return await this.getAllPacientesUseCase.execute();
  }

  async findByCpf(cpf: string): Promise<PacienteOutputDto> {
    return await this.findPacienteByCpfUseCase.execute(cpf);
  }
}
