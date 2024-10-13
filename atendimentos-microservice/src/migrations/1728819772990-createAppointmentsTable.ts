import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAppointmentsTable1728819772990 implements MigrationInterface {
    name = 'CreateAppointmentsTable1728819772990'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "pacientes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying(255) NOT NULL, "cpf" character varying(11) NOT NULL, "data_nascimento" date NOT NULL, "telefone" character varying(11) NOT NULL, "endereco" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "data_criacao" TIMESTAMP NOT NULL DEFAULT now(), "data_atualizacao" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_d6737b831d4e311678dfce056b6" UNIQUE ("cpf"), CONSTRAINT "UQ_9b1d1c80bdf7c29c7187ef8939d" UNIQUE ("email"), CONSTRAINT "PK_aa9c9f624ff22fc06c44d8b1609" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."atendimentos_status_enum" AS ENUM('AGENDADA', 'EM_ANDAMENTO', 'CONCLUÍDA', 'CANCELADA')`);
        await queryRunner.query(`CREATE TABLE "atendimentos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "data" date NOT NULL, "hora" TIME NOT NULL, "status" "public"."atendimentos_status_enum" NOT NULL DEFAULT 'AGENDADA', "modalidade" character varying NOT NULL, "local" character varying(255), "url" character varying(255), "medico_id" uuid NOT NULL, "paciente_id" uuid NOT NULL, "admin_id" uuid NOT NULL, "data_criacao" TIMESTAMP NOT NULL DEFAULT now(), "data_atualizacao" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_80a70d057e68924b970871d9089" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "atendimentos" DROP COLUMN "hora"`);
        await queryRunner.query(`ALTER TABLE "atendimentos" ADD "hora" TIME NOT NULL`);
        await queryRunner.query(`ALTER TABLE "atendimentos" ADD "horario" TIME NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "atendimentos" DROP COLUMN "horario"`);
        await queryRunner.query(`ALTER TABLE "atendimentos" DROP COLUMN "hora"`);
        await queryRunner.query(`ALTER TABLE "atendimentos" ADD "hora" TIME NOT NULL`);
        await queryRunner.query(`DROP TABLE "atendimentos"`);
        await queryRunner.query(`DROP TYPE "public"."atendimentos_status_enum"`);
        await queryRunner.query(`DROP TABLE "pacientes"`);
    }

}
