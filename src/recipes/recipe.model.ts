import { Field, ObjectType, Int } from '@nestjs/graphql'

@ObjectType()
export class Recipe {
  @Field(_type => Int)
  readonly id!: number

  @Field({ nullable: true })
  readonly title?: string

  @Field({ nullable: true })
  readonly description?: string
}