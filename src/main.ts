import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import * as Sentry from '@sentry/node'
import { SentryInterceptor } from './sentry.interceptor'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  // This will be overridden by the graphql cors configuration for the /graphql route
  app.enableCors({ origin: ['http://localhost:3000', 'https://focaccia-client.now.sh', 'https://focaccia.app'] })
  if (configService.get('SENTRY_DSN')) {
    Sentry.init({ dsn: configService.get('SENTRY_DSN') })
    app.useGlobalInterceptors(new SentryInterceptor())
  }
  await app.listen(configService.get('PORT', 3001))
}
bootstrap();