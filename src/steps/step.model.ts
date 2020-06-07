import { ObjectType, Field, Int } from '@nestjs/graphql'
import { BaseModel } from 'src/base.model'

@ObjectType()
export class Step extends BaseModel {
  description!: string
  @Field(_type => Int)
  position!: number
  @Field(_type => Int)
  duration?: number
}