import { AdministradorOutputDto } from 'src/administradores/presentation/dtos/administrador-output.dto';
import { CreateAdministradorDto } from 'src/administradores/presentation/dtos/create-administrador.dto';

export interface IAdminService {
  create(request: CreateAdministradorDto): Promise<AdministradorOutputDto>;
  findById(id: string): Promise<AdministradorOutputDto>;
  getAll(): Promise<AdministradorOutputDto[]>;
}
