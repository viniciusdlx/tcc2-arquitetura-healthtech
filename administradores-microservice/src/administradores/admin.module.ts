import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminService } from './application/services/admin.service';
import { CreateAdminUseCase } from './application/usecases/create-admin.usecase';
import { FindAdminByIdUseCase } from './application/usecases/find-admin-by-id.usecase';
import { GetAllAdminsUseCase } from './application/usecases/get-all-admins.usecase';
import { AdminTypeOrmRepository } from './infra/repositories/admin.typeorm-repository';
import { AdminSchema } from './infra/schemas/admin.schema';
import { AdminController } from './presentation/controllers/admin.controller';

export const IAdminRepository = {
  provide: 'IAdminRepository',
  useClass: AdminTypeOrmRepository,
};

export const IAdminService = {
  provide: 'IAdminService',
  useClass: AdminService,
};

@Module({
  imports: [TypeOrmModule.forFeature([AdminSchema])],
  controllers: [AdminController],
  providers: [
    AdminService,
    IAdminService,
    IAdminRepository,
    AdminTypeOrmRepository,
    CreateAdminUseCase,
    FindAdminByIdUseCase,
    GetAllAdminsUseCase,
  ],
})
export class AdminModule {}
