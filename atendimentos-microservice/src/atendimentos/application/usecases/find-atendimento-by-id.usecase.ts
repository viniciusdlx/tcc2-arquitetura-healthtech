import { Inject } from '@nestjs/common';
import { IAtendimentoRepository } from 'src/atendimentos/domain/interfaces/atendimento-repository.interface';
import { validateRequestFindAtendimento } from 'src/atendimentos/infra/validators/find-atendimento.validator';
import { AtendimentoOutputDto } from 'src/atendimentos/presentation/dtos/atendimento-output.dto';
import { ErrorCodesEnum } from 'src/shared/enums/error-codes.enum';
import { ErrorMessagesEnum } from 'src/shared/enums/error-messages.enum';
import { BadRequestException } from 'src/shared/exceptions/bad-request-exception';
import { NotFoundException } from 'src/shared/exceptions/not-found-exception';
import { dateToString } from 'src/shared/utils/date-to-string';
import { formatDateString } from 'src/shared/utils/format-date-string';

const dateType = 'DD/MM/YYYY';

export class FindAtendimentoByIdUseCase {
  constructor(
    @Inject('IAtendimentoRepository')
    private readonly atendimentoRepository: IAtendimentoRepository,
  ) {}

  async execute(id: string): Promise<AtendimentoOutputDto> {
    await this.validate(id);

    const appointment = await this.atendimentoRepository.findById(id);

    if (!appointment) {
      throw new NotFoundException({
        message: ErrorMessagesEnum.APPOINTMENT_NOT_FOUND,
        code: ErrorCodesEnum.APPOINTMENT_NOT_FOUND,
      });
    }

    return {
      ...appointment,
      data: formatDateString(appointment.data, dateType),
      dataCriacao: dateToString(appointment.dataCriacao, 'DD/MM/YYYY HH:mm:ss'),
      dataAtualizacao: dateToString(
        appointment.dataAtualizacao,
        'DD/MM/YYYY HH:mm:ss',
      ),
    };
  }

  private async validate(id: string): Promise<void> {
    const validateRequest = await validateRequestFindAtendimento({ id: id });

    const allErrors = [...validateRequest];

    if (allErrors.length > 0) {
      throw new BadRequestException(allErrors);
    }
  }
}
