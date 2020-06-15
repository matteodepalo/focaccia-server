import { Resolver, Query, Mutation, Args, Int, GqlExecutionContext } from '@nestjs/graphql'
import { RecipesService } from './recipes.service'
import { Recipe } from './recipe.model'
import { RecipeInput } from './dto/recipe.input'
import { ExecutionContext, createParamDecorator } from '@nestjs/common'
import { GetRecipeArgs } from './dto/get-recipe.args'

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.user;
  },
);

interface User {
  sub: string
}

type CurrentUser = User | null

@Resolver(() => Recipe)
export class RecipesResolver {
  constructor (private readonly recipesService: RecipesService) {}

  @Query(_returns => Recipe, { name: 'recipe' })
  async getRecipe(@CurrentUser() user: CurrentUser, @Args() args: GetRecipeArgs): Promise<Recipe | undefined> {
    return this.recipesService.findOne(user?.sub, args.id, args.token)
  }

  @Query(_returns => [Recipe], { name: 'recipes' })
  async getRecipes(@CurrentUser() user: CurrentUser): Promise<Recipe[]> {
    // Bad request data if user is not provided
    return this.recipesService.findAll(user!.sub)
  }

  @Mutation(() => Recipe)
  async createRecipe(@CurrentUser() user: CurrentUser, @Args('data') data: RecipeInput): Promise<Recipe> {
    // Bad request data if user is not provided
    return this.recipesService.createRecipe(data, user!.sub)
  }

  @Mutation(() => Recipe)
  async updateRecipe(@CurrentUser() user: CurrentUser, @Args('data') data: RecipeInput): Promise<Recipe> {
    // Bad request data if user is not provided
    return this.recipesService.updateRecipe(data, user!.sub)
  }

  @Mutation(() => Recipe)
  async removeRecipe(@CurrentUser() user: CurrentUser, @Args('id', { type: () => Int }) id: number): Promise<Recipe> {
    // Bad request data if user is not provided
    const recipe = await this.recipesService.findOne(user!.sub, id)
    // Bad request data if recipe is not found
    await this.recipesService.removeRecipe(recipe!.id)
    return recipe!
  }
}