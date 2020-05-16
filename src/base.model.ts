import { Field, ObjectType, Int } from '@nestjs/graphql'

@ObjectType()
export class BaseModel {
  @Field(_type => Int)
  id!: number
  createdAt!: Date
  updatedAt!: Date
}