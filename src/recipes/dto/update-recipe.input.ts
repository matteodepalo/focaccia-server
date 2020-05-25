import { InputType, Field } from '@nestjs/graphql'
import { IngredientInput } from 'src/ingredients/dto/ingredient.input'

@InputType()
export class UpdateRecipeInput {
  name!: string
  id!: number

  @Field(_type => [IngredientInput])
  ingredients!: IngredientInput[]
}