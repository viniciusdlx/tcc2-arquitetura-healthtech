import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('pacientes')
export class PacienteSchema {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'nome', type: 'varchar', length: 255 })
  nome: string;

  @Column({ name: 'cpf', type: 'varchar', length: 11, unique: true })
  cpf: string;

  @Column({ name: 'data_nascimento', type: 'date' })
  dataNascimento: Date;

  @Column({ name: 'telefone', type: 'varchar', length: 11 })
  telefone: string;

  @Column({ name: 'endereco', type: 'varchar', length: 255 })
  endereco: string;

  @Column({ name: 'email', type: 'varchar', length: 255, unique: true })
  email: string;

  @CreateDateColumn({ name: 'data_criacao' })
  dataCriacao: Date;

  @UpdateDateColumn({ name: 'data_atualizacao' })
  dataAtualizacao: Date;
}
