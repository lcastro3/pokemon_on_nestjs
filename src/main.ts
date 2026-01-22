import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationError, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
