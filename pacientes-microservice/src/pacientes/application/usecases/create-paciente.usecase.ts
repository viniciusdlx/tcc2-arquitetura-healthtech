import { Inject } from '@nestjs/common';
import { Paciente } from 'src/pacientes/domain/entities/paciente.entity';
import { IPacienteRepository } from 'src/pacientes/domain/interfaces/paciente-repository.interface';
import { validateRequestCreatePaciente } from 'src/pacientes/infra/validators/create-paciente.validator';
import { CreatePacienteDto } from 'src/pacientes/presentation/dtos/create-paciente.dto';
import { PacienteOutputDto } from 'src/pacientes/presentation/dtos/paciente-output.dto';
import { ErrorCodesEnum } from 'src/shared/enums/error-codes.enum';
import { ErrorMessagesEnum } from 'src/shared/enums/error-messages.enum';
import { BadRequestException } from 'src/shared/exceptions/bad-request-exception';
import { ErrorMessageCode } from 'src/shared/types/error-message-code';
import { clearDocument } from 'src/shared/utils/clear-document';
import { clearPhoneNumber } from 'src/shared/utils/clear-phone-number';
import { dateToString } from 'src/shared/utils/date-to-string';
import { stringToDate } from 'src/shared/utils/stringToDate';

const dateType = 'DD/MM/YYYY';

export class CreatePacienteUseCase {
  constructor(
    @Inject('IPacienteRepository')
    private readonly pacienteRepository: IPacienteRepository,
  ) {}

  async execute(dto: CreatePacienteDto): Promise<PacienteOutputDto> {
    await this.validate(dto);

    dto.cpf = clearDocument(dto.cpf);
    const birthDate = stringToDate(dto.dataNascimento);
    dto.telefone = clearPhoneNumber(dto.telefone);

    const newPatient = new Paciente({
      nome: dto.nome,
      cpf: dto.cpf,
      email: dto.email,
      dataNascimento: birthDate,
      telefone: dto.telefone,
      endereco: dto.endereco,
    });

    const createdPatient = await this.pacienteRepository.insert(newPatient);

    console.log('createdDr -> ', createdPatient);

    return {
      ...createdPatient,
      dataNascimento: dateToString(createdPatient.dataNascimento, dateType),
      dataCriacao: dateToString(
        createdPatient.dataCriacao,
        'DD/MM/YYYY HH:mm:ss',
      ),
      dataAtualizacao: dateToString(
        createdPatient.dataAtualizacao,
        'DD/MM/YYYY HH:mm:ss',
      ),
    };
  }

  private async validateBusinessRules(
    dto: CreatePacienteDto,
  ): Promise<ErrorMessageCode[]> {
    const errors: ErrorMessageCode = [];

    // busca o user pelo cpf
    const patient = await this.pacienteRepository.findByCpf(dto.cpf);

    if (patient) {
      errors.push({
        message: ErrorMessagesEnum.PATIENT_ALREADY_EXIST,
        code: ErrorCodesEnum.PATIENT_ALREADY_EXIST,
      });
    }

    return errors;
  }

  private async validate(req: CreatePacienteDto): Promise<void> {
    const validateRequest = await validateRequestCreatePaciente(req);
    const validateBusinessRules = await this.validateBusinessRules(req);

    const allErrors = [...validateRequest, ...validateBusinessRules];

    if (allErrors.length > 0) {
      throw new BadRequestException(allErrors);
    }
  }
}
