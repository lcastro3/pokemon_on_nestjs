import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationError, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
   const config = new DocumentBuilder()
    .setTitle('Pokemon API')
    .setDescription('An Pokemon API for testing purposes')
    .setVersion('1.0')
    .addTag('Pokemon')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors: ValidationError[] = []) => {
        const error = {
          messages: errors.map((error) => Object.values(error.constraints)).flat(1),
          statusCode: 400,
        };

        return new BadRequestException(error);
      },
    }),
  );
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
