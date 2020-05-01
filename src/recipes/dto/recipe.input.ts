import { InputType } from '@nestjs/graphql'

@InputType()
export class CreateRecipeInput {
  name!: string
}