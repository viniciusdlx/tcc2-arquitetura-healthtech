import { Module } from '@nestjs/common';
import { PacienteModule } from './pacientes/paciente.module';

@Module({
  imports: [PacienteModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
