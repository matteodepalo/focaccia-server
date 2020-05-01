import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { RecipesService } from './recipes.service'
import { Recipe } from './recipe.model'
import { CreateRecipeInput } from './dto/recipe.input';

@Resolver(() => Recipe)
export class RecipesResolver {
    constructor (private readonly recipesService: RecipesService) {}

    @Query(_returns => Recipe, { name: 'recipe' })
    async getRecipe(@Args('id', { type: () => Int }) id: number): Promise<Recipe | undefined> {
      return this.recipesService.findOne(id)
    }

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