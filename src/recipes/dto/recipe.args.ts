import { Field, ArgsType } from '@nestjs/graphql'

@ArgsType()
export class CreateRecipeArgs {
  @Field({ nullable: true })
  title?: string

  @Field({ nullable: true })
  description?: string
}