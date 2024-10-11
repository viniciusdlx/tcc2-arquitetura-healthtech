import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PacienteService } from './application/services/paciente.service';
import { CreatePacienteUseCase } from './application/usecases/create-paciente.usecase';
import { FindPacienteByIdUseCase } from './application/usecases/find-medico-by-id.usecase';
import { FindPacienteByCpfUseCase } from './application/usecases/find-paciente-by-cpf.usecase';
import { GetAllPacientesUseCase } from './application/usecases/get-all-pacientes.usecase';
import { PacienteTypeOrmRepository } from './infra/repositories/paciente.typeorm-repository';
import { PacienteSchema } from './infra/schemas/paciente.schema';
import { PacienteController } from './presentation/controllers/paciente.controller';

export const IPacienteRepository = {
  provide: 'IPacienteRepository',
  useClass: PacienteTypeOrmRepository,
};

export const IPacienteService = {
  provide: 'IPacienteService',
  useClass: PacienteService,
};

@Module({
  imports: [TypeOrmModule.forFeature([PacienteSchema])],
  controllers: [PacienteController],
  providers: [
    PacienteService,
    IPacienteService,
    IPacienteRepository,
    PacienteTypeOrmRepository,
    CreatePacienteUseCase,
    FindPacienteByIdUseCase,
    GetAllPacientesUseCase,
    FindPacienteByCpfUseCase,
  ],
})
export class PacienteModule {}
