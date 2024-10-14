import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateAtendimentosColumnHorario1728824470476
  implements MigrationInterface
{
  name = 'UpdateAtendimentosColumnHorario1728824470476';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "atendimentos" DROP COLUMN "hora"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "atendimentos" ADD "hora" TIME NOT NULL`,
    );
  }
}
