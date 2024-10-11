import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePatientsTable1728621715677 implements MigrationInterface {
  name = 'CreatePatientsTable1728621715677';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "pacientes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying(255) NOT NULL, "cpf" character varying(11) NOT NULL, "data_nascimento" date NOT NULL, "telefone" character varying(11) NOT NULL, "endereco" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "data_criacao" TIMESTAMP NOT NULL DEFAULT now(), "data_atualizacao" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_d6737b831d4e311678dfce056b6" UNIQUE ("cpf"), CONSTRAINT "UQ_9b1d1c80bdf7c29c7187ef8939d" UNIQUE ("email"), CONSTRAINT "PK_aa9c9f624ff22fc06c44d8b1609" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "pacientes"`);
  }
}
