import { Entity, Column, ManyToOne } from 'typeorm'
import { BaseEntity } from 'src/base.entity'
import { RecipeEntity } from 'src/recipes/recipe.entity'

@Entity('ingredients')
export class IngredientEntity extends BaseEntity {
  @Column()
  type!: string

  @Column()
  name!: string

  @Column({ type: 'float' })
  weight!: number

  @Column()
  group!: string

  @ManyToOne(_type => RecipeEntity, recipe => recipe.ingredients)
  recipe!: RecipeEntity
}