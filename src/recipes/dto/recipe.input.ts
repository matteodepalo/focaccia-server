import { InputType, Field, Int } from '@nestjs/graphql'

@InputType()
export class CreateRecipeInput {
  name!: string
  yeastType?: string
  @Field(_type => Int)
  yeastWeight?: number
}