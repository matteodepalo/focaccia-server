import { InputType, Field, Int } from '@nestjs/graphql'
import { CreateRecipeInput } from './create-recipe.input'

@InputType()
export class UpdateRecipeInput extends CreateRecipeInput {
  @Field(_type => Int)
  id!: number
}