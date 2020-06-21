import { Entity, Column, ManyToOne } from 'typeorm'
import { BaseEntity } from 'src/base.entity'
import { RecipeEntity } from 'src/recipes/recipe.entity'

@Entity('steps')
export class StepEntity extends BaseEntity {
  @Column()
  description!: string

  @Column({ type: 'int' })
  position!: number

  @Column({ type: 'int', nullable: true, default: null })
  duration?: number

  @ManyToOne(_type => RecipeEntity, recipe => recipe.steps, { onDelete: 'CASCADE' })
  recipe!: RecipeEntity
}