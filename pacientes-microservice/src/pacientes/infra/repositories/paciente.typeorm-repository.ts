import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Paciente } from 'src/pacientes/domain/entities/paciente.entity';
import { IPacienteRepository } from 'src/pacientes/domain/interfaces/paciente-repository.interface';
import { clearDocument } from 'src/shared/utils/clear-document';
import { defaultInternalServerError } from 'src/shared/utils/default-internal-server-error';
import { formatDocument } from 'src/shared/utils/format-document';
import { Brackets, Repository } from 'typeorm';
import { PacienteSchema } from '../schemas/paciente.schema';

@Injectable()
export class PacienteTypeOrmRepository implements IPacienteRepository {
  constructor(
    @InjectRepository(PacienteSchema)
    private readonly pacienteRepository: Repository<PacienteSchema>,
  ) {}

  async insert(data: Partial<Paciente>): Promise<Paciente> {
    try {
      const query = await this.pacienteRepository.save(data);
      return query;
    } catch (error) {
      console.log('error.message -> ', error.message);
      throw defaultInternalServerError();
    }
  }

  async findById(id: string): Promise<Paciente> {
    try {
      const query = await this.pacienteRepository.findOneBy({ id: id });

      return query;
    } catch (error) {
      console.log('error.message -> ', error.message);
      throw defaultInternalServerError();
    }
  }

  async findAll(): Promise<Paciente[]> {
    try {
      const query = await this.pacienteRepository.find();

      return query;
    } catch (error) {
      console.log('error.message -> ', error.message);
      throw defaultInternalServerError();
    }
  }

  async findByCpf(cpf: string): Promise<Paciente> {
    const cleanedCpf = clearDocument(cpf);
    const formatedCpf = formatDocument(cpf);

    try {
      const query = await this.pacienteRepository
        .createQueryBuilder('pacientes')
        .select(['pacientes'])
        .where(
          new Brackets((qb) => {
            qb.where('pacientes.cpf = :cpfWithMask', {
              cpfWithMask: formatedCpf,
            }).orWhere('pacientes.cpf = :cpfWithoutMask', {
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
}
