import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('administrador')
export class AdminSchema {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'nome',
    type: 'varchar',
    length: 255,
  })
  nome: string;

  @Column({
    name: 'cpf',
    type: 'varchar',
    length: 11,
  })
  cpf: string;

  @Column({
    name: 'email',
    type: 'varchar',
    length: 255,
  })
  email: string;

  @Column({
    name: 'telefone',
    type: 'varchar',
    length: 14, //+55 48 9 9999 9999
  })
  telefone: string;

  @Column({ name: 'data_nascimento', type: 'date' })
  dataNascimento: Date;

  @CreateDateColumn({ name: 'data_criacao' })
  dataCriacao: Date;

  @UpdateDateColumn({ name: 'data_atualizacao' })
  dataAtualizacao: Date;
}
