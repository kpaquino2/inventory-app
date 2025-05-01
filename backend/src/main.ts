import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // create new swagger document configuration
  const config = new DocumentBuilder()
    .setTitle('Inventory API')
    .setDescription('Inventory management system')
    .setVersion('0.1')
    .build();

  // create swagger document
  const document = SwaggerModule.createDocument(app, config);

  // setup swagger module
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
