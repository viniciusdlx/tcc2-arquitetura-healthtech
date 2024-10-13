import { AtendimentoOutputDto } from 'src/atendimentos/presentation/dtos/atendimento-output.dto';
import { CreateAtendimentoDto } from 'src/atendimentos/presentation/dtos/create-atendimento.dto';

export interface IAtendimentoService {
  create(request: CreateAtendimentoDto): Promise<AtendimentoOutputDto>;
  findById(id: string): Promise<AtendimentoOutputDto>;
  getAll(): Promise<AtendimentoOutputDto[]>;
}
