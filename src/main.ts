import { AppModule } from '#@/app.module';
import { SwaggerUtil } from '#@/utils/swagger.util';
import { RequestMethod } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api', {
    exclude: [{ path: '/', method: RequestMethod.GET }], // for ssllabs test
  });
  app.enableShutdownHooks();

  SwaggerUtil.runtimeSwagger(app);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
