import {MigrationInterface, QueryRunner} from "typeorm";

export class IngredientEntityMigration1589649498690 implements MigrationInterface {
    name = 'IngredientEntityMigration1589649498690'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ingredients" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "type" character varying NOT NULL, "name" character varying NOT NULL, "weight" double precision NOT NULL, "group" character varying NOT NULL, "recipeId" integer, CONSTRAINT "PK_9240185c8a5507251c9f15e0649" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "ingredients" ADD CONSTRAINT "FK_f20a9542c7a02105fa40a08d95b" FOREIGN KEY ("recipeId") REFERENCES "recipes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ingredients" DROP CONSTRAINT "FK_f20a9542c7a02105fa40a08d95b"`, undefined);
        await queryRunner.query(`DROP TABLE "ingredients"`, undefined);
    }

}
