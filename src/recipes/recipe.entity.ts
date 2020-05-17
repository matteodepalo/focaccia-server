import { Entity, Column, Index, OneToMany } from 'typeorm'
import { BaseEntity } from 'src/base.entity'
import { IngredientEntity } from 'src/ingredients/ingredient.entity';

@Entity('recipes')
export class RecipeEntity extends BaseEntity {
  @Column()
  name!: string

  @Index()
  @Column()
  userId!: string

  @OneToMany(_type => IngredientEntity, ingredient => ingredient.recipe, {
    cascade: true,
    onDelete: 'CASCADE',
    eager: true
  })
  ingredients!: IngredientEntity[]
}