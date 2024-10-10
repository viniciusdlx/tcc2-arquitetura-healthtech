import { Inject } from '@nestjs/common';
import { IMedicoRepository } from 'src/medicos/domain/interfaces/medico-repository.interface';
import { validateRequestFindMedico } from 'src/medicos/infra/validators/find-medico.validator';
import { MedicoOutputDto } from 'src/medicos/presentation/dtos/medico-output.dto';
import { ErrorCodesEnum } from 'src/shared/enums/error-codes.enum';
import { ErrorMessagesEnum } from 'src/shared/enums/error-messages.enum';
import { BadRequestException } from 'src/shared/exceptions/bad-request-exception';
import { NotFoundException } from 'src/shared/exceptions/not-found-exception';
import { dateToString } from 'src/shared/utils/date-to-string';

export class FindMedicoByCpfUseCase {
  constructor(
    @Inject('IMedicoRepository')
    private readonly medicoRepository: IMedicoRepository,
  ) {}

  async execute(cpf: string): Promise<MedicoOutputDto> {
    await this.validate(cpf);

    const doctor = await this.medicoRepository.findByCpf(cpf);

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
      dataCriacao: dateToString(doctor.dataCriacao, 'DD/MM/YYYY HH:mm:ss'),
      dataAtualizacao: dateToString(
        doctor.dataAtualizacao,
        'DD/MM/YYYY HH:mm:ss',
      ),
    };
  }

  private async validate(cpf: string): Promise<void> {
    const validateRequest = await validateRequestFindMedico({ cpf: cpf });

    const allErrors = [...validateRequest];

    if (allErrors.length > 0) {
      throw new BadRequestException(allErrors);
    }
  }
}
