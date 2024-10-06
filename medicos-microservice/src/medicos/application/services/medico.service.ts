import { Injectable } from '@nestjs/common';
import { CreateMedicoDto } from 'src/medicos/presentation/dtos/create-medico.dto';
import { MedicoOutputDto } from 'src/medicos/presentation/dtos/medico-output.dto';
import { IMedicoService } from '../../domain/interfaces/medico-service.interface';
import { CreateMedicoUseCase } from '../usecases/create-medico.usecase';
import { FindMedicoByIdUseCase } from '../usecases/find-medico-by-id.usecase';
import { GetAllMedicosUseCase } from '../usecases/get-all-medicos.usecase';

@Injectable()
export class MedicoService implements IMedicoService {
  constructor(
    private readonly createMedicoUseCase: CreateMedicoUseCase,
    private readonly findMedicoByIdUseCase: FindMedicoByIdUseCase,
    private readonly getAllMedicosUseCase: GetAllMedicosUseCase,
  ) {}

  async create(request: CreateMedicoDto): Promise<MedicoOutputDto> {
    return await this.createMedicoUseCase.execute(request);
  }

  async findById(id: string): Promise<MedicoOutputDto> {
    return await this.findMedicoByIdUseCase.execute(id);
  }

  async getAll(): Promise<MedicoOutputDto[]> {
    return await this.getAllMedicosUseCase.execute();
  }
}