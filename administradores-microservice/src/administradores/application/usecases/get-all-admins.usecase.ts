import { Inject } from '@nestjs/common';
import { IAdminRepository } from 'src/administradores/domain/interfaces/admin-repository.interface';
import { AdministradorOutputDto } from 'src/administradores/presentation/dtos/administrador-output.dto';
import { dateToString } from 'src/shared/utils/date-to-string';

const dateType = 'DD/MM/YYYY';

export class GetAllAdminsUseCase {
  constructor(
    @Inject('IAdminRepository')
    private readonly adminRepository: IAdminRepository,
  ) {}

  async execute(): Promise<AdministradorOutputDto[]> {
    const admins = await this.adminRepository.findAll();

    return admins.map((adm): AdministradorOutputDto => {
      return {
        ...adm,
        dataNascimento: dateToString(adm.dataNascimento, dateType),
        dataCriacao: dateToString(adm.dataCriacao, 'DD/MM/YYYY HH:mm:ss'),
        dataAtualizacao: dateToString(
          adm.dataAtualizacao,
          'DD/MM/YYYY HH:mm:ss',
        ),
      };
    });
  }
}
