import { InputType, Field, Int } from '@nestjs/graphql'
import { CreateRecipeInput } from './create-recipe.input'
import { IngredientInput } from 'src/ingredients/dto/ingredient.input'

@InputType()
export class UpdateRecipeInput extends CreateRecipeInput {
  @Field(_type => Int)
  id!: number

  @Field(_type => [IngredientInput])
  ingredients!: IngredientInput[]
}