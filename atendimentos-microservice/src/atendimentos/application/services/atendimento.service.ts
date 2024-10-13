import { Injectable } from '@nestjs/common';
import { IAtendimentoService } from 'src/atendimentos/domain/interfaces/atendimento-service.interface';
import { AtendimentoOutputDto } from 'src/atendimentos/presentation/dtos/atendimento-output.dto';
import { CreateAtendimentoDto } from 'src/atendimentos/presentation/dtos/create-atendimento.dto';
import { CreateAtendimentoUseCase } from '../usecases/create-atendimento.usecase';
import { FindAtendimentoByIdUseCase } from '../usecases/find-atendimento-by-id.usecase';
import { GetAllAtendimentosUseCase } from '../usecases/get-all-atendimentos.usecase';

@Injectable()
export class AtendimentoService implements IAtendimentoService {
  constructor(
    private readonly createAtendimentoUseCase: CreateAtendimentoUseCase,
    private readonly findAtendimentoByIdUseCase: FindAtendimentoByIdUseCase,
    private readonly getAllAtendimentosUseCase: GetAllAtendimentosUseCase,
  ) {}

  async create(request: CreateAtendimentoDto): Promise<AtendimentoOutputDto> {
    return await this.createAtendimentoUseCase.execute(request);
  }

  async findById(id: string): Promise<AtendimentoOutputDto> {
    return await this.findAtendimentoByIdUseCase.execute(id);
  }

  async getAll(): Promise<AtendimentoOutputDto[]> {
    return await this.getAllAtendimentosUseCase.execute();
  }
}
