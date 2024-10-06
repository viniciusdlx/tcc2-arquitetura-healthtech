import { HorariosMedico } from 'src/medicos/domain/entities/medico.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

const horariosDefault: HorariosMedico = {
  dom: [],
  seg: [],
  ter: [],
  qua: [],
  qui: [],
  sex: [],
  sab: [],
};

@Entity('medicos')
export class MedicoSchema {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'nome', type: 'varchar', length: 255 })
  nome: string;

  @Column({ name: 'cpf', type: 'varchar', length: 11, unique: true })
  cpf: string;

  @Column({ name: 'data_nascimento', type: 'date' })
  dataNascimento: Date;

  @Column({ name: 'estado_crm', type: 'varchar', length: 2 })
  estadoCrm: string;

  @Column({ name: 'crm', type: 'varchar', length: 6, unique: true })
  crm: string;

  @Column({ name: 'especialidade', type: 'varchar', length: 255 })
  especialidade: string;

  @Column({ name: 'telefone', type: 'varchar', length: 11 })
  telefone: string;

  @Column({ name: 'email', type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({
    name: 'horarios',
    type: 'json',
    nullable: true,
    default: horariosDefault,
  })
  horarios: HorariosMedico;

  @CreateDateColumn({ name: 'data_criacao' })
  dataCriacao: Date;

  @UpdateDateColumn({ name: 'data_atualizacao' })
  dataAtualizacao: Date;
}
