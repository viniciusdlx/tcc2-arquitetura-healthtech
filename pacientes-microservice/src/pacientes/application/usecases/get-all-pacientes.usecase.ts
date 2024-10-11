import { Inject } from '@nestjs/common';
import { IPacienteRepository } from 'src/pacientes/domain/interfaces/paciente-repository.interface';
import { PacienteOutputDto } from 'src/pacientes/presentation/dtos/paciente-output.dto';
import { dateToString } from 'src/shared/utils/date-to-string';

const dateType = 'DD/MM/YYYY';

export class GetAllPacientesUseCase {
  constructor(
    @Inject('IPacienteRepository')
    private readonly pacienteRepository: IPacienteRepository,
  ) {}

  async execute(): Promise<PacienteOutputDto[]> {
    const drs = await this.pacienteRepository.findAll();

    return drs.map((dr): PacienteOutputDto => {
      return {
        ...dr,
        dataNascimento: dateToString(dr.dataNascimento, dateType),
        dataCriacao: dateToString(dr.dataCriacao, 'DD/MM/YYYY HH:mm:ss'),
        dataAtualizacao: dateToString(
          dr.dataAtualizacao,
          'DD/MM/YYYY HH:mm:ss',
        ),
      };
    });
  }
}
