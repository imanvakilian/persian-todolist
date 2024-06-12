import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { initSwagger } from './config/swagger.config';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { PORT, COOKIE_SECRET } = process.env;
  app.use(cookieParser(COOKIE_SECRET));
  app.useGlobalPipes(new ValidationPipe());
  initSwagger(app);
  await app.listen(PORT, () => {
    console.log(`server > http://localhost:${PORT}`);
    console.log(`swagger > http://localhost:${PORT}/swagger`);

  });
}
bootstrap();
