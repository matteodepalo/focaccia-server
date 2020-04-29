import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { RecipeEntity } from './recipe.entity'
import { CreateRecipeInput } from './dto/recipe.input';

@Injectable()
export class RecipesService {
  constructor(@InjectRepository(RecipeEntity) private recipesRepository: Repository<RecipeEntity>) {}

  findAll() {
    return this.recipesRepository.find()
  }

  findOne(id: number) {
    return this.recipesRepository.findOne(id)
  }

  async createRecipe(data: CreateRecipeInput) {
    let recipe = new RecipeEntity()
    recipe.title = data.title
    recipe.description = data.description

    await this.recipesRepository.save(recipe)

    return recipe
  }
}