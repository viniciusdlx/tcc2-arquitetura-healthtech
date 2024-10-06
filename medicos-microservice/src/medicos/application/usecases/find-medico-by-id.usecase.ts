import { Inject } from '@nestjs/common';
import { IMedicoRepository } from 'src/medicos/domain/interfaces/medico-repository.interface';
import { MedicoOutputDto } from 'src/medicos/presentation/dtos/medico-output.dto';
import { dateToString } from 'src/shared/utils/date-to-string';

const dateType = 'DD/MM/YYYY';

export class FindMedicoByIdUseCase {
  constructor(
    @Inject('IMedicoRepository')
    private readonly medicoRepository: IMedicoRepository,
  ) {}

  async execute(id: string): Promise<MedicoOutputDto> {
    const doctor = await this.medicoRepository.findById(id);

    return {
      ...doctor,
      dataNascimento: dateToString(doctor.dataNascimento, dateType),
      dataCriacao: dateToString(doctor.dataCriacao, dateType),
      dataAtualizacao: dateToString(doctor.dataAtualizacao, dateType),
    };
  }
}
