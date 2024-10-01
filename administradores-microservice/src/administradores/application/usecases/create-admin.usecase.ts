import { Inject } from '@nestjs/common';
import { Administrador } from 'src/administradores/domain/entities/administrador.entity';
import { IAdminRepository } from 'src/administradores/domain/interfaces/admin-repository.interface';
import { AdministradorOutputDto } from 'src/administradores/presentation/dtos/administrador-output.dto';
import { CreateAdministradorDto } from 'src/administradores/presentation/dtos/create-administrador.dto';
import { dateToString } from 'src/shared/utils/date-to-string';
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
      cpf: dto.cpf,
      email: dto.email,
      telefone: dto.telefone,
      dataNascimento: dto.dataNascimento,
    });

    const createdAdmin = await this.adminRepository.insert(newAdmin);

    return {
      ...createdAdmin,
      dataNascimento: dateToString(createdAdmin.dataNascimento, dateType),
      dataCriacao: dateToString(createdAdmin.dataCriacao, dateType),
      dataAtualizacao: dateToString(createdAdmin.dataAtualizacao, dateType),
    };
  }
}
