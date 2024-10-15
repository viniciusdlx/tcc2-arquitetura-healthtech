import { Inject } from '@nestjs/common';
import { Administrador } from 'src/administradores/domain/entities/administrador.entity';
import { IAdminRepository } from 'src/administradores/domain/interfaces/admin-repository.interface';
import { validateRequestCreateAdmin } from 'src/administradores/infra/validators/create-admin.validator';
import { AdministradorOutputDto } from 'src/administradores/presentation/dtos/administrador-output.dto';
import { CreateAdministradorDto } from 'src/administradores/presentation/dtos/create-administrador.dto';
import { BadRequestException } from 'src/shared/exceptions/bad-request-exception';
import { clearDocument } from 'src/shared/utils/clear-document';
import { clearPhoneNumber } from 'src/shared/utils/clear-phone-number';
import { dateToString } from 'src/shared/utils/date-to-string';
import { stringToDate } from 'src/shared/utils/stringToDate';
import { validateDocument } from 'src/shared/utils/validate-document';

const dateType = 'DD/MM/YYYY';

export class CreateAdminUseCase {
  constructor(
    @Inject('IAdminRepository')
    private readonly adminRepository: IAdminRepository,
  ) {}

  async execute(dto: CreateAdministradorDto): Promise<AdministradorOutputDto> {
    validateDocument({ doc: dto.cpf });

    const newAdmin = new Administrador({
      nome: dto.nome,
      cpf: clearDocument(dto.cpf),
      email: dto.email,
      telefone: clearPhoneNumber(dto.telefone),
      dataNascimento: stringToDate(dto.dataNascimento),
    });

    const createdAdmin = await this.adminRepository.insert(newAdmin);

    return {
      ...createdAdmin,
      dataNascimento: dateToString(createdAdmin.dataNascimento, dateType),
      dataCriacao: dateToString(
        createdAdmin.dataCriacao,
        'DD/MM/YYYY HH:mm:ss',
      ),
      dataAtualizacao: dateToString(
        createdAdmin.dataAtualizacao,
        'DD/MM/YYYY HH:mm:ss',
      ),
    };
  }

  private async validate(req: CreateAdministradorDto): Promise<void> {
    const validateRequest = await validateRequestCreateAdmin(req);

    const allErrors = [...validateRequest];

    if (allErrors.length > 0) {
      throw new BadRequestException(allErrors);
    }
  }
}
