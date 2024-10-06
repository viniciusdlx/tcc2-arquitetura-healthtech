import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicoService } from './application/services/medico.service';
import { CreateMedicoUseCase } from './application/usecases/create-medico.usecase';
import { FindMedicoByIdUseCase } from './application/usecases/find-medico-by-id.usecase';
import { GetAllMedicosUseCase } from './application/usecases/get-all-medicos.usecase';
import { MedicoTypeOrmRepository } from './infra/repositories/medico.typeorm-repository';
import { MedicoSchema } from './infra/schemas/medico.schema';
import { MedicoController } from './presentation/controllers/medico.controller';

export const IMedicoRepository = {
  provide: 'IMedicoRepository',
  useClass: MedicoTypeOrmRepository,
};

export const IMedicoService = {
  provide: 'IMedicoService',
  useClass: MedicoService,
};

@Module({
  imports: [TypeOrmModule.forFeature([MedicoSchema])],
  controllers: [MedicoController],
  providers: [
    MedicoService,
    IMedicoService,
    IMedicoRepository,
    MedicoTypeOrmRepository,
    CreateMedicoUseCase,
    FindMedicoByIdUseCase,
    GetAllMedicosUseCase,
  ],
})
export class MedicoModule {}
