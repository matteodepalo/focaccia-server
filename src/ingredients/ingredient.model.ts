import { ObjectType, Float, Field, registerEnumType } from '@nestjs/graphql'
import { BaseModel } from 'src/base.model'
import { IngredientType, IngredientGroup } from './ingredient.entity';

registerEnumType(IngredientType, {
  name: 'IngredientType',
});

registerEnumType(IngredientGroup, {
  name: 'IngredientGroup',
});

@ObjectType()
export class Ingredient extends BaseModel {
  name!: string
  type!: IngredientType
  group!: IngredientGroup
  @Field(_type => Float)
  weight!: number
}