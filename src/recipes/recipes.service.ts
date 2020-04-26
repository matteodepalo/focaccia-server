import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { RecipeEntity } from './recipe.entity'
import { CreateRecipeArgs } from './dto/recipe.args';

@Injectable()
export class RecipesService {
  constructor(@InjectRepository(RecipeEntity) private recipesRepository: Repository<RecipeEntity>) {}

  findAll() {
    return this.recipesRepository.find()
  }

  findOne(id: number) {
    return this.recipesRepository.findOne(id)
  }

  async createRecipe(args: CreateRecipeArgs) {
    let recipe = new RecipeEntity()
    recipe.title = args.title
    recipe.description = args.description

    await this.recipesRepository.save(recipe)

    return recipe
  }
}