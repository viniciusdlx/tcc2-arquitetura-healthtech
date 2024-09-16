import { AdministradorOutputDto } from 'src/pacientes/presentation/dtos/administrador-output.dto';
import { CreateAdministradorDto } from 'src/pacientes/presentation/dtos/create-administrador.dto';
import { UpdateAdministradorDto } from 'src/pacientes/presentation/dtos/update-administrador.dto';

export interface IAdministradorService {
  create(request: CreateAdministradorDto): Promise<AdministradorOutputDto>;
  findByUserId(id: string): Promise<AdministradorOutputDto[]>;
  updateBalance(id: string, request: UpdateAdministradorDto): Promise<void>;
  findById(id: string): Promise<AdministradorOutputDto>;
}
