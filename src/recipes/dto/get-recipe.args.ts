import { Int } from "@nestjs/graphql";

import { Field, ArgsType } from '@nestjs/graphql';

@ArgsType()
export class GetRecipeArgs {
  @Field(_type => Int)
  id?: number

  token?: string
}