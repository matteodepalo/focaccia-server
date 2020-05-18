import { ObjectType } from '@nestjs/graphql'
import { BaseModel } from 'src/base.model'
import { Ingredient } from 'src/ingredients/ingredient.model'

@ObjectType()
export class Recipe extends BaseModel {
  userId!: string
  name!: string
  ingredients!: Ingredient[]
}