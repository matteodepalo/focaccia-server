import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.enableCors({ origin: ['http://localhost:3000', 'https://focaccia-client.now.sh'], credentials: true });
  await app.listen(configService.get('PORT', 3001));
}
bootstrap();