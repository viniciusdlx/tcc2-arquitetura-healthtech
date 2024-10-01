import { Inject } from '@nestjs/common';
import { IAdminRepository } from 'src/administradores/domain/interfaces/admin-repository.interface';
import { AdministradorOutputDto } from 'src/administradores/presentation/dtos/administrador-output.dto';
import { dateToString } from 'src/shared/utils/date-to-string';

const dateType = 'DD/MM/YYYY';

export class FindAdminByIdUseCase {
  constructor(
    @Inject('IAdminRepository')
    private readonly adminRepository: IAdminRepository,
  ) {}

  async execute(id: string): Promise<AdministradorOutputDto> {
    const admin = await this.adminRepository.findById(id);

    return {
      ...admin,
      dataNascimento: dateToString(admin.dataNascimento, dateType),
      dataCriacao: dateToString(admin.dataCriacao, dateType),
      dataAtualizacao: dateToString(admin.dataAtualizacao, dateType),
    };
  }
}
