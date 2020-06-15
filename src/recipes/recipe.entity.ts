import { Entity, Column, Index, OneToMany, Generated } from 'typeorm'
import { BaseEntity } from 'src/base.entity'
import { IngredientEntity } from 'src/ingredients/ingredient.entity';
import { StepEntity } from 'src/steps/step.entity';

@Entity('recipes')
export class RecipeEntity extends BaseEntity {
  @Column()
  name!: string

  @Index()
  @Column()
  userId!: string

  @Index()
  @Column()
  @Generated("uuid")
  token!: string;

  @OneToMany(_type => IngredientEntity, ingredient => ingredient.recipe, {
    cascade: true,
    eager: true
  })
  ingredients!: IngredientEntity[]

  @OneToMany(_type => StepEntity, step => step.recipe, {
    cascade: true,
    eager: true
  })
  steps!: StepEntity[]
}