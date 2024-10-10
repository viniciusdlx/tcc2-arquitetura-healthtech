import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateMedicosColumns1728243910946 implements MigrationInterface {
    name = 'UpdateMedicosColumns1728243910946'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "medicos" ADD CONSTRAINT "UQ_a8ddfe85a1f640a1ed2cdd6b92e" UNIQUE ("cpf")`);
        await queryRunner.query(`ALTER TABLE "medicos" ADD CONSTRAINT "UQ_c957799fdfd60f35a89f48ef7eb" UNIQUE ("crm")`);
        await queryRunner.query(`ALTER TABLE "medicos" DROP COLUMN "telefone"`);
        await queryRunner.query(`ALTER TABLE "medicos" ADD "telefone" character varying(11) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "medicos" ADD CONSTRAINT "UQ_c12f2495d17fc6428bb6dfdbad7" UNIQUE ("email")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "medicos" DROP CONSTRAINT "UQ_c12f2495d17fc6428bb6dfdbad7"`);
        await queryRunner.query(`ALTER TABLE "medicos" DROP COLUMN "telefone"`);
        await queryRunner.query(`ALTER TABLE "medicos" ADD "telefone" character varying(14) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "medicos" DROP CONSTRAINT "UQ_c957799fdfd60f35a89f48ef7eb"`);
        await queryRunner.query(`ALTER TABLE "medicos" DROP CONSTRAINT "UQ_a8ddfe85a1f640a1ed2cdd6b92e"`);
    }

}
