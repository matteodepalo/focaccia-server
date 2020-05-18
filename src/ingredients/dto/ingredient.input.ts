import { InputType, Field, Float } from "@nestjs/graphql"

@InputType()
export class IngredientInput {
  name?: string
  type!: string
  group!: string
  @Field(_type => Float)
  weight!: number
}