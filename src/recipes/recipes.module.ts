import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RecipesService } from './recipes.service'
import { RecipesResolver } from './recipes.resolver'
import { RecipeEntity } from './recipe.entity'

@Module({
  imports: [TypeOrmModule.forFeature([RecipeEntity])],
  providers: [RecipesService, RecipesResolver]
})
export class RecipesModule {}