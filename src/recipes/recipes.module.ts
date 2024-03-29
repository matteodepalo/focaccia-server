import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RecipesService } from './recipes.service'
import { RecipesResolver } from './recipes.resolver'
import { RecipeEntity } from './recipe.entity'
import { IngredientEntity } from 'src/ingredients/ingredient.entity'
import { StepEntity } from 'src/steps/step.entity'

@Module({
  imports: [TypeOrmModule.forFeature([RecipeEntity, IngredientEntity, StepEntity])],
  providers: [RecipesService, RecipesResolver]
})
export class RecipesModule {}