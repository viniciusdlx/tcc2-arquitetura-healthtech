import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableMedicos1728124024600 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
      CREATE TABLE IF NOT EXISTS public.medicos (
        id uuid NOT NULL DEFAULT uuid_generate_v4(),
        horarios json DEFAULT '{"dom":[],"seg":[],"ter":[],"qua":[],"qui":[],"sex":[],"sab":[]}'::json,
        data_criacao timestamp without time zone NOT NULL DEFAULT now(),
        data_atualizacao timestamp without time zone NOT NULL DEFAULT now(),
        estado_crm character varying(2) COLLATE pg_catalog."default" NOT NULL,
        nome character varying(255) COLLATE pg_catalog."default" NOT NULL,
        cpf character varying(11) COLLATE pg_catalog."default" UNIQUE NOT NULL,
        data_nascimento date NOT NULL,
        crm character varying(6) COLLATE pg_catalog."default" UNIQUE NOT NULL,
        especialidade character varying(255) COLLATE pg_catalog."default" NOT NULL,
        telefone character varying(11) COLLATE pg_catalog."default" NOT NULL,
        email character varying(255) COLLATE pg_catalog."default" UNIQUE NOT NULL,
        CONSTRAINT "PK_f16d578e9fd6df731d5e8551725" PRIMARY KEY (id)
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        drop table public.medicos
    `);
  }
}
