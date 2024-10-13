import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './datasource';

@Module({
  imports: [TypeOrmModule.forRoot(AppDataSource.options)],
})
export class DatabaseModule {}
