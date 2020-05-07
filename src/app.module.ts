import { Module, MiddlewareConsumer } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GraphQLModule } from '@nestjs/graphql'
import { RecipesModule } from './recipes/recipes.module'
import { join } from 'path'
import { ConfigModule, ConfigService } from '@nestjs/config'
import * as Joi from '@hapi/joi'
import { AuthModule } from './auth/auth.module'
import { cookie as authCookie } from './auth/cookie.middleware'
import cookieParser = require('cookie-parser')

@Module({
  imports: [
    TypeOrmModule.forRoot({
      autoLoadEntities: true
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({ req }) => ({ req }),
      cors: {
        origin: ['http://localhost:3000', 'https://focaccia-client.now.sh'],
        credentials: true
      }
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        SESSION_COOKIE_SECRET: Joi.string().required(),
        PORT: Joi.number()
      }),
    }),
    RecipesModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor (private readonly configService: ConfigService) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(cookieParser(), authCookie(this.configService.get('SESSION_COOKIE_SECRET')!))
      .forRoutes('/graphql');
  }
}
