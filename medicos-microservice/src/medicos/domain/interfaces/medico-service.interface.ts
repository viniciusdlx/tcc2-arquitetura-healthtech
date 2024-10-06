import { CreateMedicoDto } from 'src/medicos/presentation/dtos/create-medico.dto';
import { MedicoOutputDto } from 'src/medicos/presentation/dtos/medico-output.dto';

export interface IMedicoService {
  create(request: CreateMedicoDto): Promise<MedicoOutputDto>;
  findById(id: string): Promise<MedicoOutputDto>;
  getAll(): Promise<MedicoOutputDto[]>;
}
