import { Resolver, Query, Mutation, Args, Int, GqlExecutionContext } from '@nestjs/graphql'
import { RecipesService } from './recipes.service'
import { Recipe } from './recipe.model'
import { CreateRecipeInput } from './dto/create-recipe.input'
import { UpdateRecipeInput } from './dto/update-recipe.input'
import { ExecutionContext, createParamDecorator } from '@nestjs/common'

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.user as CurrentUser;
  },
);

interface CurrentUser {
  sub: string
}

@Resolver(() => Recipe)
export class RecipesResolver {
  constructor (private readonly recipesService: RecipesService) {}

  @Query(_returns => Recipe, { name: 'recipe' })
  async getRecipe(@CurrentUser() user: CurrentUser, @Args('id', { type: () => Int }) id: number): Promise<Recipe | undefined> {
    return this.recipesService.findOne(id, user.sub)
  }

  @Query(_returns => [Recipe], { name: 'recipes' })
  async getRecipes(@CurrentUser() user: CurrentUser): Promise<Recipe[]> {
    return this.recipesService.findAll(user.sub)
  }

  @Mutation(() => Recipe)
  async createRecipe(@CurrentUser() user: CurrentUser, @Args('data') data: CreateRecipeInput): Promise<Recipe> {
    return this.recipesService.createRecipe(data, user.sub)
  }

  @Mutation(() => Recipe)
  async updateRecipe(@CurrentUser() user: CurrentUser, @Args('data') data: UpdateRecipeInput): Promise<Recipe> {
    return this.recipesService.updateRecipe(data, user.sub)
  }

  @Mutation(() => Recipe)
  async removeRecipe(@CurrentUser() user: CurrentUser, @Args('id', { type: () => Int }) id: number): Promise<Recipe> {
    const recipe = await this.recipesService.findOne(id, user.sub)
    await this.recipesService.removeRecipe(recipe!.id)
    return recipe!
  }
}