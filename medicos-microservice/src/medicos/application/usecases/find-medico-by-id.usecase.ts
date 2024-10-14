import { Inject } from '@nestjs/common';
import { IMedicoRepository } from 'src/medicos/domain/interfaces/medico-repository.interface';
import { validateRequestFindMedico } from 'src/medicos/infra/validators/find-medico.validator';
import { MedicoOutputDto } from 'src/medicos/presentation/dtos/medico-output.dto';
import { ErrorCodesEnum } from 'src/shared/enums/error-codes.enum';
import { ErrorMessagesEnum } from 'src/shared/enums/error-messages.enum';
import { BadRequestException } from 'src/shared/exceptions/bad-request-exception';
import { NotFoundException } from 'src/shared/exceptions/not-found-exception';
import { dateToString } from 'src/shared/utils/date-to-string';

const dateType = 'DD/MM/YYYY';

export class FindMedicoByIdUseCase {
  constructor(
    @Inject('IMedicoRepository')
    private readonly medicoRepository: IMedicoRepository,
  ) {}

  async execute(id: string): Promise<MedicoOutputDto> {
    await this.validate(id);

    const doctor = await this.medicoRepository.findById(id);

    if (!doctor) {
      throw new NotFoundException({
        message: ErrorMessagesEnum.DOCTOR_NOT_FOUND,
        code: ErrorCodesEnum.DOCTOR_NOT_FOUND,
      });
    }

    return {
      ...doctor,
      dataNascimento: dateToString(doctor.dataNascimento, dateType),
      dataCriacao: dateToString(doctor.dataCriacao, dateType),
      dataAtualizacao: dateToString(doctor.dataAtualizacao, dateType),
    };
  }

  private async validate(id: string): Promise<void> {
    const validateRequest = await validateRequestFindMedico({ id: id });

    const allErrors = [...validateRequest];

    if (allErrors.length > 0) {
      throw new BadRequestException(allErrors);
    }
  }
}
