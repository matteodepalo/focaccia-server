import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GraphQLModule } from '@nestjs/graphql'
import { RecipesModule } from './recipes/recipes.module'
import { join } from 'path'
import { ConfigModule } from '@nestjs/config'
import * as Joi from '@hapi/joi'
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      autoLoadEntities: true
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({ req }) => ({ req }),
      cors: {
        origin: ['http://localhost:3000', 'https://focaccia-client.now.sh', 'https://focaccia.app']
      }
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number(),
        AUTH0_DOMAIN: Joi.string().required(),
        GRAPHQL_URL: Joi.string().required(),
        SENTRY_DSN: Joi.string()
      }),
    }),
    RecipesModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}
