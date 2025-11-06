import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalErrorFilter } from './common/filters/global-error.filter';
import * as cors from 'cors';
import * as morgan from 'morgan';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Global Middlewares
  app.use(morgan('dev'));
  app.use(cors());

  // Global Filters
  app.useGlobalFilters(new GlobalErrorFilter());

  await app.listen(3000);
  console.log('Server running on http://localhost:3000');
}
bootstrap();
