import { InputType, Field, Float, Int } from "@nestjs/graphql"
import { IngredientType, IngredientGroup } from "../ingredient.entity"

@InputType()
export class IngredientInput {
  @Field(_type => Int)
  id?: number
  name?: string
  type!: IngredientType
  group!: IngredientGroup
  @Field(_type => Float)
  weight!: number
}