import { Inject } from '@nestjs/common';
import { IAdminRepository } from 'src/administradores/domain/interfaces/admin-repository.interface';
import { validateRequestFindAdmin } from 'src/administradores/infra/validators/find-admin.validator';
import { AdministradorOutputDto } from 'src/administradores/presentation/dtos/administrador-output.dto';
import { ErrorCodesEnum } from 'src/shared/enums/error-codes.enum';
import { ErrorMessagesEnum } from 'src/shared/enums/error-messages.enum';
import { BadRequestException } from 'src/shared/exceptions/bad-request-exception';
import { NotFoundException } from 'src/shared/exceptions/not-found-exception';
import { dateToString } from 'src/shared/utils/date-to-string';

const dateType = 'DD/MM/YYYY';

export class FindAdminByIdUseCase {
  constructor(
    @Inject('IAdminRepository')
    private readonly adminRepository: IAdminRepository,
  ) {}

  async execute(id: string): Promise<AdministradorOutputDto> {
    await this.validate(id);

    const admin = await this.adminRepository.findById(id);

    if (!admin) {
      throw new NotFoundException({
        message: ErrorMessagesEnum.ADMIN_NOT_FOUND,
        code: ErrorCodesEnum.ADMIN_NOT_FOUND,
      });
    }

    return {
      ...admin,
      dataNascimento: dateToString(admin.dataNascimento, dateType),
      dataCriacao: dateToString(admin.dataCriacao, 'DD/MM/YYYY HH:mm:ss'),
      dataAtualizacao: dateToString(
        admin.dataAtualizacao,
        'DD/MM/YYYY HH:mm:ss',
      ),
    };
  }

  private async validate(id: string): Promise<void> {
    const validateRequest = await validateRequestFindAdmin({ id: id });

    const allErrors = [...validateRequest];

    if (allErrors.length > 0) {
      throw new BadRequestException(allErrors);
    }
  }
}
