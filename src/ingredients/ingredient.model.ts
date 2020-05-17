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
  @Field(_type => IngredientType)
  type!: IngredientType
  @Field(_type => IngredientGroup)
  group!: IngredientGroup
  @Field(_type => Float)
  weight!: number
}