import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      // exceptionFactory: (errors) => new UnprocessableEntityException(errors.map(error => { return error.constraints })),
    }),
  );
  const whitelist = ['http://localhost:3000', 'http://localhost:3001'];
  app.enableCors({
    origin: function (origin, callback) {
      if (!origin || whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: 'GET,PATCH,POST,DELETE',
    preflightContinue: false,
  });
  const config = new DocumentBuilder()
    .setTitle(process.env.APP_NAME + ' v' + process.env.APP_VERSION)
    .setDescription(process.env.APP_DESC)
    .setVersion(process.env.APP_VERSION)
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'JWT',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      defaultModelsExpandDepth: -1,
      customSiteTitle:
        process.env.APP_NAME + ' documentation v' + process.env.APP_VERSION,
    },
  });
  await app.listen(process.env.APP_PORT || 3001);
}
bootstrap();
