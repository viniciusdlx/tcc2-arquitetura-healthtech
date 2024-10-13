import {
  AtendimentoModalidadeEnum,
  AtendimentoStatusEnum,
} from 'src/atendimentos/domain/entities/atendimento.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('atendimentos')
export class AtendimentoSchema {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'data', type: 'date' })
  data: string;

  @Column({ name: 'horario', type: 'time' })
  horario: string;

  @Column({
    name: 'status',
    type: 'enum',
    enum: AtendimentoStatusEnum,
    default: AtendimentoStatusEnum.AGENDADA,
  })
  status: AtendimentoStatusEnum;

  @Column({
    name: 'modalidade',
    type: 'varchar',
    enum: AtendimentoModalidadeEnum,
  })
  modalidade: AtendimentoModalidadeEnum;

  @Column({
    name: 'local',
    type: 'varchar',
    length: 255,
    nullable: true,
    default: null,
  })
  local: string;

  @Column({
    name: 'url',
    type: 'varchar',
    length: 255,
    nullable: true,
    default: null,
  })
  url: string;

  @Column({ name: 'medico_id', type: 'uuid' })
  medicoId: string;

  @Column({ name: 'paciente_id', type: 'uuid' })
  pacienteId: string;

  @Column({ name: 'admin_id', type: 'uuid' })
  adminId: string;

  @CreateDateColumn({ name: 'data_criacao' })
  dataCriacao: Date;

  @UpdateDateColumn({ name: 'data_atualizacao' })
  dataAtualizacao: Date;
}
