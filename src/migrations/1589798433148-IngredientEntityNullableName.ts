import {MigrationInterface, QueryRunner} from "typeorm";

export class IngredientEntityNullableName1589798433148 implements MigrationInterface {
    name = 'IngredientEntityNullableName1589798433148'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ingredients" ALTER COLUMN "name" DROP NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ingredients" ALTER COLUMN "name" SET NOT NULL`, undefined);
    }

}
