import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Auth Backend')
    .setDescription('Swagger customJs example')
    .setVersion('0.1')
    .addTag('app')
    .addOAuth2(
      {
        type: 'oauth2',
        description: 'example for azureAD auth',
        name: 'AzureAD',
        flows: {
          implicit: {
            scopes: { 'User.Read': 'Read user profile' },
            authorizationUrl: `https://login.microsoftonline.com/<yourTenant>/oauth2/v2.0/authorize`,
          },
        },
      },
      'AzureAD',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document, {
    customCss: '.swagger-ui .topbar { display: none }',
    customJs: '../customjs',
    customSiteTitle: 'Swagger customJs example',
  });
  await app.listen(3000);
}
bootstrap();
