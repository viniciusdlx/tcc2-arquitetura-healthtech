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
    const patients = await this.pacienteRepository.findAll();

    console.log('total patients -> ', patients.length);

    return patients.map((patient): PacienteOutputDto => {
      return {
        ...patient,
        dataNascimento: dateToString(patient.dataNascimento, dateType),
        dataCriacao: dateToString(patient.dataCriacao, 'DD/MM/YYYY HH:mm:ss'),
        dataAtualizacao: dateToString(
          patient.dataAtualizacao,
          'DD/MM/YYYY HH:mm:ss',
        ),
      };
    });
  }
}
