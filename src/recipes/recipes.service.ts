import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { RecipeEntity } from './recipe.entity'
import { CreateRecipeInput } from './dto/recipe.input';

@Injectable()
export class RecipesService {
  constructor(@InjectRepository(RecipeEntity) private recipesRepository: Repository<RecipeEntity>) {}

  findAll(userId: RecipeEntity['userId']) {
    return this.recipesRepository
      .createQueryBuilder('recipes')
      .where("recipes.userId = :userId", { userId })
      .getMany()
  }

  findOne(id: RecipeEntity['id'], userId: RecipeEntity['userId']) {
    return this.recipesRepository
      .createQueryBuilder('recipes')
      .where("recipes.userId = :userId AND recipes.id = :id", { id, userId })
      .getOne()
  }

  async createRecipe(data: CreateRecipeInput, userId: RecipeEntity['userId']) {
    let recipe = new RecipeEntity()
    recipe.name = data.name
    recipe.userId = userId

    await this.recipesRepository.save(recipe)

    return recipe
  }

  async removeRecipe(id: RecipeEntity['id']) {
    return this.recipesRepository.delete(id)
  }
}