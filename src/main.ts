import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);



  const config = new DocumentBuilder().
  setTitle('PESQUISA DE VOTACAO MUNICIPAL')
  .setDescription('aplicação em Nestjs para um sistema de pesquisa de votos municipais.')
  .setVersion('0.0.1')
  .build()

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('swagger', app, document);
  app.enableCors();
  await app.listen(3001);
  app.useGlobalPipes( new ValidationPipe());
}
bootstrap();
