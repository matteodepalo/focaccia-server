import {MigrationInterface, QueryRunner} from "typeorm";

export class RecipeEntityToken1592064569869 implements MigrationInterface {
    name = 'RecipeEntityToken1592064569869'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipes" ADD "token" uuid NOT NULL DEFAULT uuid_generate_v4()`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_3b5e4d579c7f9ff8c4ad0c19e2" ON "recipes" ("token") `, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_3b5e4d579c7f9ff8c4ad0c19e2"`, undefined);
        await queryRunner.query(`ALTER TABLE "recipes" DROP COLUMN "token"`, undefined);
    }

}
