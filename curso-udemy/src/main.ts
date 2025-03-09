import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe(
      {whitelist: true,// remove chaves que nao estão no DTO
      forbidNonWhitelisted: true, // Levanta um erro quando a chave nao existir
      transform: false} // tenta transformar os tipos de dados em parametros e dtos

    ));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
