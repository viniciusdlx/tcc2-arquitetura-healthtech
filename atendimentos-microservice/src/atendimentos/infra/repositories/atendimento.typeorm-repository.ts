import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Atendimento } from 'src/atendimentos/domain/entities/atendimento.entity';
import { IAtendimentoRepository } from 'src/atendimentos/domain/interfaces/atendimento-repository.interface';
import { defaultInternalServerError } from 'src/shared/utils/default-internal-server-error';
import { Repository } from 'typeorm';
import { AtendimentoSchema } from '../schemas/atendimento.schema';

@Injectable()
export class AtendimentoTypeOrmRepository implements IAtendimentoRepository {
  constructor(
    @InjectRepository(AtendimentoSchema)
    private readonly atendimentoRepository: Repository<AtendimentoSchema>,
  ) {}

  async insert(data: Partial<Atendimento>): Promise<Atendimento> {
    try {
      const query = await this.atendimentoRepository.save(data);
      return query;
    } catch (error) {
      console.log('error.message -> ', error.message);
      throw defaultInternalServerError();
    }
  }

  async findById(id: string): Promise<Atendimento> {
    try {
      const query = await this.atendimentoRepository.findOneBy({ id: id });

      return query;
    } catch (error) {
      console.log('error.message -> ', error.message);
      throw defaultInternalServerError();
    }
  }

  async findAll(params: {
    medicoId?: string;
    pacienteId?: string;
  }): Promise<Atendimento[]> {
    try {
      const query = await this.atendimentoRepository.find({
        where: { medicoId: params.medicoId, pacienteId: params.pacienteId },
      });

      return query;
    } catch (error) {
      console.log('error.message -> ', error.message);
      throw defaultInternalServerError();
    }
  }

  async findByDateAndDoctor(params: {
    date: string;
    doctorId: string;
  }): Promise<Atendimento[]> {
    try {
      const query = await this.atendimentoRepository.findBy({
        data: params.date,
        medicoId: params.doctorId,
      });

      return query;
    } catch (error) {
      console.log('error.message -> ', error.message);
      throw defaultInternalServerError();
    }
  }
}
