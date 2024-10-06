import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableAdmins1728124497008 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        CREATE TABLE IF NOT EXISTS public.administradores
        (
          id uuid NOT NULL DEFAULT uuid_generate_v4(),
          nome character varying(255) COLLATE pg_catalog."default" NOT NULL,
          cpf character varying(11) COLLATE pg_catalog."default" NOT NULL,
          email character varying(255) COLLATE pg_catalog."default" NOT NULL,
          telefone character varying(14) COLLATE pg_catalog."default" NOT NULL,
          data_nascimento date NOT NULL,
          data_criacao timestamp without time zone NOT NULL DEFAULT now(),
          data_atualizacao timestamp without time zone NOT NULL DEFAULT now(),
          CONSTRAINT "PK_6956c0b545649bba08e4099c81a" PRIMARY KEY (id)
        )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
      drop table public.administradores
    `);
  }
}
