import {MigrationInterface, QueryRunner} from "typeorm";

export class IngredientEntityMigration1589721463839 implements MigrationInterface {
    name = 'IngredientEntityMigration1589721463839'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ingredients" DROP COLUMN "type"`, undefined);
        await queryRunner.query(`CREATE TYPE "ingredients_type_enum" AS ENUM('yeast', 'water', 'salt', 'flour', 'other')`, undefined);
        await queryRunner.query(`ALTER TABLE "ingredients" ADD "type" "ingredients_type_enum" NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "ingredients" DROP COLUMN "group"`, undefined);
        await queryRunner.query(`CREATE TYPE "ingredients_group_enum" AS ENUM('starter', 'dough')`, undefined);
        await queryRunner.query(`ALTER TABLE "ingredients" ADD "group" "ingredients_group_enum" NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ingredients" DROP COLUMN "group"`, undefined);
        await queryRunner.query(`DROP TYPE "ingredients_group_enum"`, undefined);
        await queryRunner.query(`ALTER TABLE "ingredients" ADD "group" character varying NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "ingredients" DROP COLUMN "type"`, undefined);
        await queryRunner.query(`DROP TYPE "ingredients_type_enum"`, undefined);
        await queryRunner.query(`ALTER TABLE "ingredients" ADD "type" character varying NOT NULL`, undefined);
    }

}
