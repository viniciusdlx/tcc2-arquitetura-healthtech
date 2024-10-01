import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Administrador } from 'src/administradores/domain/entities/administrador.entity';
import { IAdminRepository } from 'src/administradores/domain/interfaces/admin-repository.interface';
import { defaultInternalServerError } from 'src/shared/utils/default-internal-server-error';
import { Repository } from 'typeorm';
import { AdminSchema } from '../schemas/admin.schema';

@Injectable()
export class AdminTypeOrmRepository implements IAdminRepository {
  constructor(
    @InjectRepository(AdminSchema)
    private readonly adminRepo: Repository<AdminSchema>,
  ) {}

  async insert(data: Partial<Administrador>): Promise<Administrador> {
    try {
      const query = await this.adminRepo.save(data);
      return query;
    } catch (error) {
      console.log('error.message -> ', error.message);
      throw defaultInternalServerError();
    }
  }

  async findById(id: string): Promise<Administrador> {
    try {
      const query = await this.adminRepo.findOneBy({ id: id });

      return query;
    } catch (error) {
      console.log('error.message -> ', error.message);
      throw defaultInternalServerError();
    }
  }

  async findAll(): Promise<Administrador[]> {
    try {
      const query = await this.adminRepo.find();

      return query;
    } catch (error) {
      console.log('error.message -> ', error.message);
      throw defaultInternalServerError();
    }
  }
}
