import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AtendimentoService } from './application/services/atendimento.service';
import { CreateAtendimentoUseCase } from './application/usecases/create-atendimento.usecase';
import { FindAtendimentoByIdUseCase } from './application/usecases/find-atendimento-by-id.usecase';
import { GetAllAtendimentosUseCase } from './application/usecases/get-all-atendimentos.usecase';
import { MedicosAxiosApi } from './infra/http/medicos-axios-api';
import { PacienteAxiosApi } from './infra/http/paciente-axios.api';
import { AtendimentoTypeOrmRepository } from './infra/repositories/atendimento.typeorm-repository';
import { AtendimentoSchema } from './infra/schemas/atendimento.schema';
import { AtendimentoController } from './presentation/controllers/atendimento.controller';

export const IAtendimentoRepository = {
  provide: 'IAtendimentoRepository',
  useClass: AtendimentoTypeOrmRepository,
};

export const IAtendimentoService = {
  provide: 'IAtendimentoService',
  useClass: AtendimentoService,
};

@Module({
  imports: [TypeOrmModule.forFeature([AtendimentoSchema]), HttpModule],
  controllers: [AtendimentoController],
  providers: [
    AtendimentoService,
    IAtendimentoService,
    IAtendimentoRepository,
    AtendimentoTypeOrmRepository,
    CreateAtendimentoUseCase,
    FindAtendimentoByIdUseCase,
    GetAllAtendimentosUseCase,
    MedicosAxiosApi,
    PacienteAxiosApi,
  ],
})
export class AtendimentoModule {}
