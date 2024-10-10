import { Inject } from '@nestjs/common';
import { Medico } from 'src/medicos/domain/entities/medico.entity';
import { IMedicoRepository } from 'src/medicos/domain/interfaces/medico-repository.interface';
import { validateRequestCreateMedico } from 'src/medicos/infra/validators/create-medico.validator';
import { CreateMedicoDto } from 'src/medicos/presentation/dtos/create-medico.dto';
import { MedicoOutputDto } from 'src/medicos/presentation/dtos/medico-output.dto';
import { ErrorCodesEnum } from 'src/shared/enums/error-codes.enum';
import { ErrorMessagesEnum } from 'src/shared/enums/error-messages.enum';
import { BadRequestException } from 'src/shared/exceptions/bad-request-exception';
import { ErrorMessageCode } from 'src/shared/types/error-message-code';
import { clearDocument } from 'src/shared/utils/clear-document';
import { clearPhoneNumber } from 'src/shared/utils/clear-phone-number';
import { dateToString } from 'src/shared/utils/date-to-string';
import { stringToDate } from 'src/shared/utils/stringToDate';

const dateType = 'DD/MM/YYYY';

export class CreateMedicoUseCase {
  constructor(
    @Inject('IMedicoRepository')
    private readonly medicoRepository: IMedicoRepository,
  ) {}

  async execute(dto: CreateMedicoDto): Promise<MedicoOutputDto> {
    await this.validate(dto);

    dto.cpf = clearDocument(dto.cpf);
    const birthDate = stringToDate(dto.dataNascimento);
    dto.telefone = clearPhoneNumber(dto.telefone);

    const newDoctor = new Medico({
      nome: dto.nome,
      cpf: dto.cpf,
      email: dto.email,
      dataNascimento: birthDate,
      estadoCrm: dto.estadoCrm,
      crm: dto.crm,
      especialidade: dto.especialidade,
      telefone: dto.telefone,
      horarios: dto.horarios,
    });

    const createdDr = await this.medicoRepository.insert(newDoctor);

    console.log('createdDr -> ', createdDr);

    return {
      ...createdDr,
      dataNascimento: dateToString(createdDr.dataNascimento, dateType),
      dataCriacao: dateToString(createdDr.dataCriacao, 'DD/MM/YYYY HH:mm:ss'),
      dataAtualizacao: dateToString(
        createdDr.dataAtualizacao,
        'DD/MM/YYYY HH:mm:ss',
      ),
    };
  }

  private async validateBusinessRules(
    dto: CreateMedicoDto,
  ): Promise<ErrorMessageCode[]> {
    const errors: ErrorMessageCode = [];

    // console.log('dto -> ', dto);
    // busca o user pelo email
    const doctor = await this.medicoRepository.findByCpf(dto.cpf);

    if (!doctor) {
      errors.push({
        message: ErrorMessagesEnum.DOCTOR_NOT_FOUND,
        code: ErrorCodesEnum.DOCTOR_NOT_FOUND,
      });
    }

    return errors;
  }

  private async validate(req: CreateMedicoDto): Promise<void> {
    const validateRequest = await validateRequestCreateMedico(req);
    const validateBusinessRules = await this.validateBusinessRules(req);

    const allErrors = [...validateRequest, ...validateBusinessRules];

    if (allErrors.length > 0) {
      throw new BadRequestException(allErrors);
    }
  }
}
