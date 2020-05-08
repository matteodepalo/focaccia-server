import {MigrationInterface, QueryRunner} from "typeorm";

export class RecipeEntityUserId1588946829480 implements MigrationInterface {
    name = 'RecipeEntityUserId1588946829480'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipes" ADD "userId" character varying NOT NULL`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_ad4f881e4b9769d16c0ed2bb3f" ON "recipes" ("userId") `, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_ad4f881e4b9769d16c0ed2bb3f"`, undefined);
        await queryRunner.query(`ALTER TABLE "recipes" DROP COLUMN "userId"`, undefined);
    }

}
