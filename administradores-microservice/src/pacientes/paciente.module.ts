import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PacienteService } from './application/services/paciente.service';
import { AdministradorSchema } from './infra/schemas/administrador.schema';
import { PacienteController } from './presentation/controllers/paciente.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AdministradorSchema])],
  controllers: [PacienteController],
  providers: [PacienteService],
})
export class PacienteModule {}
