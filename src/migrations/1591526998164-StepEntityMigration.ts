import {MigrationInterface, QueryRunner} from "typeorm";

export class StepEntityMigration1591526998164 implements MigrationInterface {
    name = 'StepEntityMigration1591526998164'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "steps" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "description" character varying NOT NULL, "position" integer NOT NULL, "duration" integer, "recipeId" integer, CONSTRAINT "PK_65f86ac8996204d11f915f66a5b" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "steps" ADD CONSTRAINT "FK_33afb29ffd643b8d79f88cf1954" FOREIGN KEY ("recipeId") REFERENCES "recipes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "steps" DROP CONSTRAINT "FK_33afb29ffd643b8d79f88cf1954"`, undefined);
        await queryRunner.query(`DROP TABLE "steps"`, undefined);
    }

}
