import { Inject } from '@nestjs/common';
import { IAtendimentoRepository } from 'src/atendimentos/domain/interfaces/atendimento-repository.interface';
import { AtendimentoOutputDto } from 'src/atendimentos/presentation/dtos/atendimento-output.dto';
import { dateToString } from 'src/shared/utils/date-to-string';

const dateType = 'DD/MM/YYYY';

export class GetAllAtendimentosUseCase {
  constructor(
    @Inject('IAtendimentoRepository')
    private readonly atendimentoRepository: IAtendimentoRepository,
  ) {}

  async execute(): Promise<AtendimentoOutputDto[]> {
    const appointments = await this.atendimentoRepository.findAll();

    return appointments.map((appointment): AtendimentoOutputDto => {
      return {
        ...appointment,
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
