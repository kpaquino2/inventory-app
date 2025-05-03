import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // create new swagger document configuration
  const config = new DocumentBuilder()
    .setTitle('Inventory API')
    .setDescription('Inventory management syst em')
    .setVersion('0.1')
    .build();

  // create swagger document
  const document = SwaggerModule.createDocument(app, config);

  // setup swagger module
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
