import { InputType, Field } from '@nestjs/graphql'
import { IngredientInput } from 'src/ingredients/dto/ingredient.input'

@InputType()
export class CreateRecipeInput {
  name!: string

  @Field(_type => [IngredientInput])
  ingredients!: IngredientInput[]
}