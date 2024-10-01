import { Module } from '@nestjs/common';
import { AdminModule } from './administradores/admin.module';
import { DatabaseModule } from './config/database/database.module';

@Module({
  imports: [DatabaseModule, AdminModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
