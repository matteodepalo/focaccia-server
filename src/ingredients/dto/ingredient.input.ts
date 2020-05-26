import { InputType, Field, Float, Int } from "@nestjs/graphql"

@InputType()
export class IngredientInput {
  @Field(_type => Int)
  id?: number
  name?: string
  type!: string
  group!: string
  @Field(_type => Float)
  weight!: number
}