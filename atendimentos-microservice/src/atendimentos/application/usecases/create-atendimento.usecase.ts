import { Inject } from '@nestjs/common';
import { Atendimento } from 'src/atendimentos/domain/entities/atendimento.entity';
import { IAtendimentoRepository } from 'src/atendimentos/domain/interfaces/atendimento-repository.interface';
import { validateRequestCreateAtendimento } from 'src/atendimentos/infra/validators/create-atendimento.validator';
import { AtendimentoOutputDto } from 'src/atendimentos/presentation/dtos/atendimento-output.dto';
import { CreateAtendimentoDto } from 'src/atendimentos/presentation/dtos/create-atendimento.dto';
import { ErrorCodesEnum } from 'src/shared/enums/error-codes.enum';
import { ErrorMessagesEnum } from 'src/shared/enums/error-messages.enum';
import { BadRequestException } from 'src/shared/exceptions/bad-request-exception';
import { ErrorMessageCode } from 'src/shared/types/error-message-code';
import { dateToString } from 'src/shared/utils/date-to-string';

export class CreateAtendimentoUseCase {
  constructor(
    @Inject('IAtendimentoRepository')
    private readonly atendimentoRepository: IAtendimentoRepository,
  ) {}

  async execute(dto: CreateAtendimentoDto): Promise<AtendimentoOutputDto> {
    await this.validate(dto);

    const newAppointment = new Atendimento({
      data: dto.data,
      horario: dto.horario,
      modalidade: dto.modalidade,
      local: dto.local,
      medicoId: dto.medicoId,
      pacienteId: dto.pacienteId,
      adminId: dto.adminId,
    });

    const createdAppointment =
      await this.atendimentoRepository.insert(newAppointment);

    console.log('createdDr -> ', createdAppointment);

    return {
      ...createdAppointment,
      dataCriacao: dateToString(
        createdAppointment.dataCriacao,
        'DD/MM/YYYY HH:mm:ss',
      ),
      dataAtualizacao: dateToString(
        createdAppointment.dataAtualizacao,
        'DD/MM/YYYY HH:mm:ss',
      ),
    };
  }

  private async validateBusinessRules(
    dto: CreateAtendimentoDto,
  ): Promise<ErrorMessageCode[]> {
    const errors: ErrorMessageCode = [];

    // busca o user pelo cpf
    const appointment = await this.atendimentoRepository.findByDateAndHour({
      date: dto.data,
      hour: dto.horario,
    });

    if (appointment) {
      errors.push({
        message: ErrorMessagesEnum.INVALID_APPOINTMENT_DATE_HOUR,
        code: ErrorCodesEnum.INVALID_APPOINTMENT_DATE_HOUR,
      });
    }

    return errors;
  }

  private async validate(req: CreateAtendimentoDto): Promise<void> {
    const validateRequest = await validateRequestCreateAtendimento(req);
    const validateBusinessRules = await this.validateBusinessRules(req);

    const allErrors = [...validateRequest, ...validateBusinessRules];

    if (allErrors.length > 0) {
      throw new BadRequestException(allErrors);
    }
  }
}
