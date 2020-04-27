import { ArgsType } from '@nestjs/graphql'

@ArgsType()
export class CreateRecipeArgs {
  title?: string
  description?: string
}