import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Medico } from 'src/medicos/domain/entities/medico.entity';
import { IMedicoRepository } from 'src/medicos/domain/interfaces/medico-repository.interface';
import { clearDocument } from 'src/shared/utils/clear-document';
import { defaultInternalServerError } from 'src/shared/utils/default-internal-server-error';
import { formatDocument } from 'src/shared/utils/format-document';
import { Brackets, Repository } from 'typeorm';
import { MedicoSchema } from '../schemas/medico.schema';

@Injectable()
export class MedicoTypeOrmRepository implements IMedicoRepository {
  constructor(
    @InjectRepository(MedicoSchema)
    private readonly medicoRepository: Repository<MedicoSchema>,
  ) {}

  async insert(data: Partial<Medico>): Promise<Medico> {
    try {
      const query = await this.medicoRepository.save(data);
      return query;
    } catch (error) {
      console.log('error.message -> ', error.message);
      throw defaultInternalServerError();
    }
  }

  async findById(id: string): Promise<Medico> {
    try {
      const query = await this.medicoRepository.findOneBy({ id: id });

      return query;
    } catch (error) {
      console.log('error.message -> ', error.message);
      throw defaultInternalServerError();
    }
  }

  async findAll(): Promise<Medico[]> {
    try {
      const query = await this.medicoRepository.find();

      return query;
    } catch (error) {
      console.log('error.message -> ', error.message);
      throw defaultInternalServerError();
    }
  }

  async findByCpf(cpf: string): Promise<Medico> {
    const formatedCpf = formatDocument(cpf);
    const cleanedCpf = clearDocument(cpf);

    try {
      const query = await this.medicoRepository
        .createQueryBuilder('medicos')
        .select(['medicos'])
        .where(
          new Brackets((qb) => {
            qb.where('medicos.cpf = :cpfWithMask', {
              cpfWithMask: formatedCpf,
            }).orWhere('medicos.cpf = :cpfWithoutMask', {
              cpfWithoutMask: cleanedCpf,
            });
          }),
        )
        .getOne();

      return query;
    } catch (error) {
      console.log('error.message -> ', error.message);
      throw defaultInternalServerError();
    }
  }
  async update(data: Partial<Medico>): Promise<Medico> {
    try {
      const query = await this.medicoRepository.update(data.id, {
        horarios: data.horarios,
      });

      if (query.affected > 0) {
        const doc = await this.medicoRepository.findOneBy({ id: data.id });

        return doc;
      }
    } catch (error) {
      console.log('error.message -> ', error.message);
      throw defaultInternalServerError();
    }
  }
}
