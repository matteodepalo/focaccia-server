import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { RecipeEntity } from './recipe.entity'
import { RecipeInput } from './dto/recipe.input'
import { IngredientEntity } from 'src/ingredients/ingredient.entity'
import { StepEntity } from 'src/steps/step.entity'

@Injectable()
export class RecipesService {
  constructor(@InjectRepository(RecipeEntity) private recipesRepository: Repository<RecipeEntity>) {}

  private baseQuery() {
    return this.recipesRepository
      .createQueryBuilder('recipes')
      .leftJoinAndSelect("recipes.ingredients", "ingredient")
      .leftJoinAndSelect("recipes.steps", "step")
  }

  findAll(userId: RecipeEntity['userId']) {
    return this.baseQuery()
      .where("recipes.userId = :userId", { userId })
      .getMany()
  }

  findOne(userId: RecipeEntity['userId'], id?: RecipeEntity['id'], token?: RecipeEntity['token']) {
    let query

    if (id) {
      query = this.baseQuery()
        .where("recipes.userId = :userId AND recipes.id = :id", { id, userId })
    } else if (token) {
      query = this.baseQuery()
        .where("recipes.token = :token", { token })
    }

    return query?.getOne()
  }

  async createRecipe(data: RecipeInput, userId: RecipeEntity['userId']) {
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

  async updateRecipe(data: RecipeInput, userId: RecipeEntity['userId']) {
    const recipe = await this.findOne(userId, data.id!)
    Object.assign(recipe, data)

    await this.recipesRepository.save(recipe!)

    return recipe!
  }

  async removeRecipe(id: RecipeEntity['id']) {
    return this.recipesRepository.delete(id)
  }
}