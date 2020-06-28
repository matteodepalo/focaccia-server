import { Resolver, Query, Mutation, Args, Int, GqlExecutionContext } from '@nestjs/graphql'
import { RecipesService } from './recipes.service'
import { Recipe } from './recipe.model'
import { RecipeInput } from './dto/recipe.input'
import { ExecutionContext, createParamDecorator, UseGuards } from '@nestjs/common'
import { GetRecipeArgs } from './dto/get-recipe.args'
import { GqlAuthGuard, GqlUserGuard } from 'src/auth/graphql-auth.guard'

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.user;
  },
);

interface User {
  sub: string
}

@Resolver(() => Recipe)
export class RecipesResolver {
  constructor (private readonly recipesService: RecipesService) {}

  @UseGuards(GqlUserGuard)
  @Query(_returns => Recipe, { name: 'recipe' })
  async getRecipe(@CurrentUser() user: User | null, @Args() args: GetRecipeArgs): Promise<Recipe | undefined> {
    return this.recipesService.findOne(user?.sub, args.id, args.token)
  }

  @UseGuards(GqlAuthGuard)
  @Query(_returns => [Recipe], { name: 'recipes' })
  async getRecipes(@CurrentUser() user: User): Promise<Recipe[]> {
    return this.recipesService.findAll(user.sub)
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Recipe)
  async createRecipe(@CurrentUser() user: User, @Args('data') data: RecipeInput): Promise<Recipe> {
    return this.recipesService.createRecipe(data, user.sub)
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Recipe)
  async updateRecipe(@CurrentUser() user: User, @Args('data') data: RecipeInput): Promise<Recipe> {
    return this.recipesService.updateRecipe(data, user.sub)
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Recipe)
  async removeRecipe(@CurrentUser() user: User, @Args('id', { type: () => Int }) id: number): Promise<Recipe> {
    const recipe = await this.recipesService.findOne(user.sub, id)
    await this.recipesService.removeRecipe(recipe!.id)
    return recipe!
  }
}