import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { RecipesService } from './recipes.service'
import { Recipe } from './recipe.model'
import { CreateRecipeArgs } from './dto/recipe.args';

@Resolver(() => Recipe)
export class RecipesResolver {
    constructor (private readonly recipesService: RecipesService) {}

    @Query(_returns => Recipe, { name: 'recipe' })
    async getRecipe(@Args('id', { type: () => Int }) id: number) {
      return this.recipesService.findOne(id)
    }

    @Query(_returns => [Recipe], { name: 'recipes' })
    async getRecipes() {
      return this.recipesService.findAll()
    }

    @Mutation(() => Recipe)
    async createRecipe(@Args() args: CreateRecipeArgs) {
      return this.recipesService.createRecipe(args)
    }
}