import { Inject } from '@nestjs/common';
import { IPacienteRepository } from 'src/pacientes/domain/interfaces/paciente-repository.interface';
import { PacienteOutputDto } from 'src/pacientes/presentation/dtos/paciente-output.dto';
import { dateToString } from 'src/shared/utils/date-to-string';

const dateType = 'DD/MM/YYYY';

export class FindPacienteByIdUseCase {
  constructor(
    @Inject('IPacienteRepository')
    private readonly pacienteRepository: IPacienteRepository,
  ) {}

  async execute(id: string): Promise<PacienteOutputDto> {
    const doctor = await this.pacienteRepository.findById(id);

    return {
      ...doctor,
      dataNascimento: dateToString(doctor.dataNascimento, dateType),
      dataCriacao: dateToString(doctor.dataCriacao, dateType),
      dataAtualizacao: dateToString(doctor.dataAtualizacao, dateType),
    };
  }
}
