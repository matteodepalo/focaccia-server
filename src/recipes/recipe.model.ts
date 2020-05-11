import { Field, ObjectType, Int } from '@nestjs/graphql'

@ObjectType()
export class Recipe {
  @Field(_type => Int)
  id!: number
  userId!: string
  createdAt!: Date
  updatedAt!: Date
  name!: string
  yeastType?: string
  @Field(_type => Int)
  yeastWeight?: number
}