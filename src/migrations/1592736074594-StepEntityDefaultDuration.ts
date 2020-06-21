import {MigrationInterface, QueryRunner} from "typeorm";

export class StepEntityDefaultDuration1592736074594 implements MigrationInterface {
    name = 'StepEntityDefaultDuration1592736074594'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "steps" ALTER COLUMN "duration" SET DEFAULT null`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "steps" ALTER COLUMN "duration" DROP DEFAULT`, undefined);
    }

}
