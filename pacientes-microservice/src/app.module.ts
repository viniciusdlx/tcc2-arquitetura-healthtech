import { Module } from '@nestjs/common';
import { DatabaseModule } from './config/database/database.module';
import { PacienteModule } from './pacientes/paciente.module';

@Module({
  imports: [DatabaseModule, PacienteModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
