import { Module, MiddlewareConsumer } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GraphQLModule } from '@nestjs/graphql'
import { RecipesModule } from './recipes/recipes.module'
import { join } from 'path'
import { ConfigModule, ConfigService } from '@nestjs/config'
import * as Joi from '@hapi/joi'
import { jwtMiddleware } from './auth/auth.middleware'

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
    RecipesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor (private readonly configService: ConfigService) {}

  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(jwtMiddleware(this.configService.get('AUTH0_DOMAIN')!, this.configService.get('GRAPHQL_URL')!))
      .forRoutes('/graphql')
  }
}
