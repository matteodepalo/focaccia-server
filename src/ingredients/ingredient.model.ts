import { ObjectType, Float, Field } from '@nestjs/graphql'
import { BaseModel } from 'src/base.model'

@ObjectType()
export class Ingredient extends BaseModel {
  name!: string
  type!: string
  group!: string
  @Field(_type => Float)
  weight!: number
}