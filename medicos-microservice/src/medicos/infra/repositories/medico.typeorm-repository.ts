import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Medico } from 'src/medicos/domain/entities/medico.entity';
import { IMedicoRepository } from 'src/medicos/domain/interfaces/medico-repository.interface';
import { defaultInternalServerError } from 'src/shared/utils/default-internal-server-error';
import { Repository } from 'typeorm';
import { MedicoSchema } from '../schemas/medico.schema';

@Injectable()
export class MedicoTypeOrmRepository implements IMedicoRepository {
  constructor(
    @InjectRepository(MedicoSchema)
    private readonly adminRepo: Repository<MedicoSchema>,
  ) {}

  async insert(data: Partial<Medico>): Promise<Medico> {
    try {
      const query = await this.adminRepo.save(data);
      return query;
    } catch (error) {
      console.log('error.message -> ', error.message);
      throw defaultInternalServerError();
    }
  }

  async findById(id: string): Promise<Medico> {
    try {
      const query = await this.adminRepo.findOneBy({ id: id });

      return query;
    } catch (error) {
      console.log('error.message -> ', error.message);
      throw defaultInternalServerError();
    }
  }

  async findAll(): Promise<Medico[]> {
    try {
      const query = await this.adminRepo.find();

      return query;
    } catch (error) {
      console.log('error.message -> ', error.message);
      throw defaultInternalServerError();
    }
  }
}
