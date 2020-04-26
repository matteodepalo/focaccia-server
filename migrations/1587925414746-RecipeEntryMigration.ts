import {MigrationInterface, QueryRunner} from "typeorm";

export class RecipeEntryMigration1587925414746 implements MigrationInterface {
    name = 'RecipeEntryMigration1587925414746'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "recipes" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_8f09680a51bf3669c1598a21682" PRIMARY KEY ("id"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "recipes"`, undefined);
    }

}
