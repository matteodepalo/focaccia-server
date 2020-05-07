import { Resolver, Query, Mutation, Args, Int, GqlExecutionContext } from '@nestjs/graphql'
import { RecipesService } from './recipes.service'
import { Recipe } from './recipe.model'
import { CreateRecipeInput } from './dto/recipe.input'
import { ExecutionContext, UseGuards, Injectable, createParamDecorator } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class GqlAuthGuard extends AuthGuard('cookie') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context)
    return ctx.getContext().req
  }
}

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.user;
  },
);

@Resolver(() => Recipe)
export class RecipesResolver {
  constructor (private readonly recipesService: RecipesService) {}

  @Query(_returns => Recipe, { name: 'recipe' })
  async getRecipe(@CurrentUser() _user: string, @Args('id', { type: () => Int }) id: number): Promise<Recipe | undefined> {
    return this.recipesService.findOne(id)
  }

  @UseGuards(GqlAuthGuard)
  @Query(_returns => [Recipe], { name: 'recipes' })
  async getRecipes(): Promise<Recipe[]> {
    return this.recipesService.findAll()
  }

  @Mutation(() => Recipe)
  async createRecipe(@Args('data') data: CreateRecipeInput): Promise<Recipe> {
    return this.recipesService.createRecipe(data)
  }

  @Mutation(() => Recipe)
  async removeRecipe(@Args('id', { type: () => Int }) id: number): Promise<Recipe> {
    const recipe = await this.recipesService.findOne(id)
    await this.recipesService.removeRecipe(id)
    return recipe!
  }
}