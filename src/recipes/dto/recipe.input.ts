import { InputType, Field, Int } from '@nestjs/graphql'
import { IngredientInput } from 'src/ingredients/dto/ingredient.input'
import { StepInput } from 'src/steps/dto/step.input'

@InputType()
export class RecipeInput {
  @Field(_type => Int)
  id?: number

  name!: string

  @Field(_type => [IngredientInput])
  ingredients!: IngredientInput[]

  @Field(_type => [StepInput])
  steps!: StepInput[]
}