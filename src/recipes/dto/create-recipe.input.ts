import { InputType, Field } from '@nestjs/graphql'
import { IngredientInput } from 'src/ingredients/dto/ingredient.input'
import { StepInput } from 'src/steps/dto/step.input'

//TODO unify with update

@InputType()
export class CreateRecipeInput {
  name!: string

  @Field(_type => [IngredientInput])
  ingredients!: IngredientInput[]

  @Field(_type => [StepInput])
  steps!: StepInput[]
}