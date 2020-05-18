import { Entity, Column, ManyToOne } from 'typeorm'
import { BaseEntity } from 'src/base.entity'
import { RecipeEntity } from 'src/recipes/recipe.entity'

export enum IngredientGroup {
  starter = 'starter',
  dough = 'dough'
}

export enum IngredientType {
  yeast = 'yeast',
  water = 'water',
  salt = 'salt',
  flour = 'flour',
  other = 'other'
}

@Entity('ingredients')
export class IngredientEntity extends BaseEntity {
  @Column({
    type: "enum",
    enum: IngredientType
  })
  type!: IngredientType

  @Column()
  name!: string

  @Column({ type: 'float' })
  weight!: number

  @Column({
    type: "enum",
    enum: IngredientGroup
  })
  group!: IngredientGroup

  @ManyToOne(_type => RecipeEntity, recipe => recipe.ingredients, { onDelete: 'CASCADE' })
  recipe!: RecipeEntity
}