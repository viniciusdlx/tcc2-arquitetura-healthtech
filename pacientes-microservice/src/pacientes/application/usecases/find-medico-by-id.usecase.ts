import { Inject } from '@nestjs/common';
import { IPacienteRepository } from 'src/pacientes/domain/interfaces/paciente-repository.interface';
import { validateRequestFindPaciente } from 'src/pacientes/infra/validators/find-paciente.validator';
import { PacienteOutputDto } from 'src/pacientes/presentation/dtos/paciente-output.dto';
import { ErrorCodesEnum } from 'src/shared/enums/error-codes.enum';
import { ErrorMessagesEnum } from 'src/shared/enums/error-messages.enum';
import { BadRequestException } from 'src/shared/exceptions/bad-request-exception';
import { NotFoundException } from 'src/shared/exceptions/not-found-exception';
import { dateToString } from 'src/shared/utils/date-to-string';

const dateType = 'DD/MM/YYYY';

export class FindPacienteByIdUseCase {
  constructor(
    @Inject('IPacienteRepository')
    private readonly pacienteRepository: IPacienteRepository,
  ) {}

  async execute(id: string): Promise<PacienteOutputDto> {
    await this.validate(id);

    const patient = await this.pacienteRepository.findById(id);

    if (!patient) {
      throw new NotFoundException({
        message: ErrorMessagesEnum.PATIENT_NOT_FOUND,
        code: ErrorCodesEnum.PATIENT_NOT_FOUND,
      });
    }

    return {
      ...patient,
      dataNascimento: dateToString(patient.dataNascimento, dateType),
      dataCriacao: dateToString(patient.dataCriacao, dateType),
      dataAtualizacao: dateToString(patient.dataAtualizacao, dateType),
    };
  }

  private async validate(id: string): Promise<void> {
    const validateRequest = await validateRequestFindPaciente({ id: id });

    const allErrors = [...validateRequest];

    if (allErrors.length > 0) {
      throw new BadRequestException(allErrors);
    }
  }
}
