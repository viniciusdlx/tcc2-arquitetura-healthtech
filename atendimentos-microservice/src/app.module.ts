import { Module } from '@nestjs/common';
import { AtendimentoModule } from './atendimentos/atendimento.module';
import { DatabaseModule } from './config/database/database.module';

@Module({
  imports: [DatabaseModule, AtendimentoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
