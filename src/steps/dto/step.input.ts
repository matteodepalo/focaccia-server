import { InputType, Field, Int } from "@nestjs/graphql"

@InputType()
export class StepInput {
  @Field(_type => Int)
  id?: number
  description!: string
  @Field(_type => Int)
  position!: number
  @Field(_type => Int)
  duration?: number
}