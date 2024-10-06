import { Inject } from '@nestjs/common';
import { IMedicoRepository } from 'src/medicos/domain/interfaces/medico-repository.interface';
import { MedicoOutputDto } from 'src/medicos/presentation/dtos/medico-output.dto';
import { dateToString } from 'src/shared/utils/date-to-string';

const dateType = 'DD/MM/YYYY';

export class GetAllMedicosUseCase {
  constructor(
    @Inject('IMedicoRepository')
    private readonly medicoRepository: IMedicoRepository,
  ) {}

  async execute(): Promise<MedicoOutputDto[]> {
    const drs = await this.medicoRepository.findAll();

    return drs.map((dr): MedicoOutputDto => {
      return {
        ...dr,
        dataNascimento: dateToString(dr.dataNascimento, dateType),
        dataCriacao: dateToString(dr.dataCriacao, dateType),
        dataAtualizacao: dateToString(dr.dataAtualizacao, dateType),
      };
    });
  }
}
