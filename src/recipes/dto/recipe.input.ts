import { InputType } from '@nestjs/graphql'

@InputType()
export class CreateRecipeInput {
  title!: string
  description!: string
}