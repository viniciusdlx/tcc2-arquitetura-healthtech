import { Inject } from '@nestjs/common';
import { IMedicoRepository } from 'src/medicos/domain/interfaces/medico-repository.interface';
import { MedicoOutputDto } from 'src/medicos/presentation/dtos/medico-output.dto';
import { UpdateMedicoDto } from 'src/medicos/presentation/dtos/update-medico.dto';
import { ErrorCodesEnum } from 'src/shared/enums/error-codes.enum';
import { ErrorMessagesEnum } from 'src/shared/enums/error-messages.enum';
import { NotFoundException } from 'src/shared/exceptions/not-found-exception';
import { dateToString } from 'src/shared/utils/date-to-string';

export class UpdateMedicoUseCase {
  constructor(
    @Inject('IMedicoRepository')
    private readonly medicoRepository: IMedicoRepository,
  ) {}

  async execute(dto: UpdateMedicoDto): Promise<MedicoOutputDto> {
    if (!dto.id) {
      throw new NotFoundException({
        message: ErrorMessagesEnum.INVALID_ID,
        code: ErrorCodesEnum.INVALID_ID,
      });
    }

    const doctor = await this.medicoRepository.update({
      id: dto.id,
      horarios: dto.horarios,
    });

    if (!doctor) {
      throw new NotFoundException({
        message: ErrorMessagesEnum.DOCTOR_NOT_FOUND,
        code: ErrorCodesEnum.DOCTOR_NOT_FOUND,
      });
    }

    return {
      id: doctor.id,
      nome: doctor.nome,
      cpf: doctor.cpf,
      dataNascimento: dateToString(doctor.dataNascimento, 'DD/MM/YYYY'),
      email: doctor.email,
      telefone: doctor.telefone,
      estadoCrm: doctor.estadoCrm,
      crm: doctor.crm,
      horarios: doctor.horarios,
      dataCriacao: dateToString(doctor.dataCriacao, 'DD/MM/YYYY HH:mm:ss'),
      dataAtualizacao: dateToString(
        doctor.dataAtualizacao,
        'DD/MM/YYYY HH:mm:ss',
      ),
    };
  }
}
