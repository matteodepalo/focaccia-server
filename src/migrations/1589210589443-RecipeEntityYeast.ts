import {MigrationInterface, QueryRunner} from "typeorm";

export class RecipeEntityYeast1589210589443 implements MigrationInterface {
    name = 'RecipeEntityYeast1589210589443'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipes" ADD "yeastType" character varying`, undefined);
        await queryRunner.query(`ALTER TABLE "recipes" ADD "yeastWeight" integer`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipes" DROP COLUMN "yeastWeight"`, undefined);
        await queryRunner.query(`ALTER TABLE "recipes" DROP COLUMN "yeastType"`, undefined);
    }

}
