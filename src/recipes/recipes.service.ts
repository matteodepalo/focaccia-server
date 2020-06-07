import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { RecipeEntity } from './recipe.entity'
import { CreateRecipeInput } from './dto/create-recipe.input'
import { IngredientEntity } from 'src/ingredients/ingredient.entity'
import { UpdateRecipeInput } from './dto/update-recipe.input'
import { StepEntity } from 'src/steps/step.entity'

@Injectable()
export class RecipesService {
  constructor(@InjectRepository(RecipeEntity) private recipesRepository: Repository<RecipeEntity>) {}

  findAll(userId: RecipeEntity['userId']) {
    return this.recipesRepository
      .createQueryBuilder('recipes')
      .where("recipes.userId = :userId", { userId })
      .leftJoinAndSelect("recipes.ingredients", "ingredient")
      .leftJoinAndSelect("recipes.steps", "step")
      .getMany()
  }

  findOne(id: RecipeEntity['id'], userId: RecipeEntity['userId']) {
    return this.recipesRepository
      .createQueryBuilder('recipes')
      .where("recipes.userId = :userId AND recipes.id = :id", { id, userId })
      .leftJoinAndSelect("recipes.ingredients", "ingredient")
      .leftJoinAndSelect("recipes.steps", "step")
      .getOne()
  }

  async createRecipe(data: CreateRecipeInput, userId: RecipeEntity['userId']) {
    let recipe = new RecipeEntity()
    Object.assign(recipe, data)
    recipe.userId = userId

    data.ingredients.map(ingredientInput => {
      return Object.assign(new IngredientEntity(), ingredientInput)
    })

    data.steps.map(stepInput => {
      return Object.assign(new StepEntity(), stepInput)
    })

    await this.recipesRepository.save(recipe)

    return recipe
  }

  async updateRecipe(data: UpdateRecipeInput, userId: RecipeEntity['userId']) {
    const recipe = await this.findOne(data.id, userId)
    Object.assign(recipe, data)

    await this.recipesRepository.save(recipe!)

    return recipe!
  }

  async removeRecipe(id: RecipeEntity['id']) {
    return this.recipesRepository.delete(id)
  }
}