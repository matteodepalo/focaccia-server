import { Field, ObjectType, Int } from '@nestjs/graphql'

@ObjectType()
export class Recipe {
  @Field(_type => Int)
  id!: number
  title?: string
  description?: string
}