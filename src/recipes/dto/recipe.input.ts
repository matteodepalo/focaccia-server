import { InputType, Field, Float } from '@nestjs/graphql'

@InputType()
class IngredientInput {
  name!: string
  type!: string
  group!: string
  @Field(_type => Float)
  weight!: number
}

@InputType()
export class CreateRecipeInput {
  name!: string

  @Field(_type => [IngredientInput])
  ingredients!: IngredientInput[]
}