import { Injectable } from '@nestjs/common';
import { IAdminService } from 'src/administradores/domain/interfaces/admin-service.interface';
import { AdministradorOutputDto } from 'src/administradores/presentation/dtos/administrador-output.dto';
import { CreateAdministradorDto } from 'src/administradores/presentation/dtos/create-administrador.dto';
import { CreateAdminUseCase } from '../usecases/create-admin.usecase';
import { GetAllAdminsUseCase } from '../usecases/get-all-admins.usecase';
import { FindAdminByIdUseCase } from './../usecases/find-admin-by-id.usecase';

@Injectable()
export class AdminService implements IAdminService {
  constructor(
    private readonly createAdminUseCase: CreateAdminUseCase,
    private readonly findAdminByIdUseCase: FindAdminByIdUseCase,
    private readonly getAllAdminsUseCase: GetAllAdminsUseCase,
  ) {}

  async create(
    request: CreateAdministradorDto,
  ): Promise<AdministradorOutputDto> {
    return await this.createAdminUseCase.execute(request);
  }

  async findById(id: string): Promise<AdministradorOutputDto> {
    return await this.findAdminByIdUseCase.execute(id);
  }

  async getAll(): Promise<AdministradorOutputDto[]> {
    return await this.getAllAdminsUseCase.execute();
  }
}
