import { Module } from '@nestjs/common';
import { DatabaseModule } from './config/database/database.module';
import { MedicoModule } from './medicos/medico.module';

@Module({
  imports: [DatabaseModule, MedicoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
