import { Inject } from '@nestjs/common';
import { IAtendimentoRepository } from 'src/atendimentos/domain/interfaces/atendimento-repository.interface';
import { AtendimentoOutputDto } from 'src/atendimentos/presentation/dtos/atendimento-output.dto';
import { dateToString } from 'src/shared/utils/date-to-string';
import { formatDateString } from 'src/shared/utils/format-date-string';

const dateType = 'DD/MM/YYYY';

export class GetAllAtendimentosUseCase {
  constructor(
    @Inject('IAtendimentoRepository')
    private readonly atendimentoRepository: IAtendimentoRepository,
  ) {}

  async execute(): Promise<AtendimentoOutputDto[]> {
    const appointments = await this.atendimentoRepository.findAll();

    console.log('total appointments -> ', appointments.length);

    return appointments.map((appointment): AtendimentoOutputDto => {
      return {
        ...appointment,
        data: formatDateString(appointment.data, dateType),

        dataCriacao: dateToString(
          appointment.dataCriacao,
          'DD/MM/YYYY HH:mm:ss',
        ),
        dataAtualizacao: dateToString(
          appointment.dataAtualizacao,
          'DD/MM/YYYY HH:mm:ss',
        ),
      };
    });
  }
}
