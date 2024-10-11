import { Inject } from '@nestjs/common';
import { IPacienteRepository } from 'src/pacientes/domain/interfaces/paciente-repository.interface';
import { validateRequestFindPaciente } from 'src/pacientes/infra/validators/find-paciente.validator';
import { PacienteOutputDto } from 'src/pacientes/presentation/dtos/paciente-output.dto';
import { ErrorCodesEnum } from 'src/shared/enums/error-codes.enum';
import { ErrorMessagesEnum } from 'src/shared/enums/error-messages.enum';
import { BadRequestException } from 'src/shared/exceptions/bad-request-exception';
import { NotFoundException } from 'src/shared/exceptions/not-found-exception';
import { dateToString } from 'src/shared/utils/date-to-string';

export class FindPacienteByCpfUseCase {
  constructor(
    @Inject('IPacienteRepository')
    private readonly pacienteRepository: IPacienteRepository,
  ) {}

  async execute(cpf: string): Promise<PacienteOutputDto> {
    await this.validate(cpf);

    const patient = await this.pacienteRepository.findByCpf(cpf);

    if (!patient) {
      throw new NotFoundException({
        message: ErrorMessagesEnum.PATIENT_NOT_FOUND,
        code: ErrorCodesEnum.PATIENT_NOT_FOUND,
      });
    }

    return {
      id: patient.id,
      nome: patient.nome,
      cpf: patient.cpf,
      dataNascimento: dateToString(patient.dataNascimento, 'DD/MM/YYYY'),
      email: patient.email,
      telefone: patient.telefone,
      endereco: patient.endereco,
      dataCriacao: dateToString(patient.dataCriacao, 'DD/MM/YYYY HH:mm:ss'),
      dataAtualizacao: dateToString(
        patient.dataAtualizacao,
        'DD/MM/YYYY HH:mm:ss',
      ),
    };
  }

  private async validate(cpf: string): Promise<void> {
    const validateRequest = await validateRequestFindPaciente({ cpf: cpf });

    const allErrors = [...validateRequest];

    if (allErrors.length > 0) {
      throw new BadRequestException(allErrors);
    }
  }
}
