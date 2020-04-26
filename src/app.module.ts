import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GraphQLModule } from '@nestjs/graphql'
import { RecipesModule } from './recipes/recipes.module'
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      autoLoadEntities: true
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    RecipesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
