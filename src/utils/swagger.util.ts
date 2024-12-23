import type { INestApplication } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
// import { apiReference } from '@scalar/nestjs-api-reference';
import * as fs from 'node:fs';

export class SwaggerUtil {
  static readonly SWAGGER_URL_PATH = '/swagger';
  static readonly SCALAR_URL_PATH = '/scalar';
  static readonly JSON_PATH = './swagger.json';
  static readonly SWAGGER_UPDATABLE: boolean =
    process.env.npm_lifecycle_event === 'swagger';
  static readonly config = new DocumentBuilder()
    .setTitle('rabbit downloader')
    .setDescription('This is rabbit downloader api spec')
    .setVersion('1.12')
    .build();

  static initSwagger(app: INestApplication) {
    if (SwaggerUtil.SWAGGER_UPDATABLE) {
      SwaggerUtil.saveSwagger(app);
      process.exit(0);
    }
    SwaggerUtil.loadSwagger(app);
  }

  static runtimeSwagger(app: INestApplication) {
    const document = SwaggerModule.createDocument(app, this.config);
    SwaggerModule.setup(SwaggerUtil.SWAGGER_URL_PATH, app, document);
  }

  static saveSwagger(app: INestApplication) {
    const document = SwaggerModule.createDocument(app, this.config);
    const json = JSON.stringify(document, null, 2);
    fs.writeFileSync(SwaggerUtil.JSON_PATH, json);
  }

  static loadSwagger(app: INestApplication) {
    const json = fs.readFileSync(SwaggerUtil.JSON_PATH, 'utf8');
    const document: OpenAPIObject = JSON.parse(json);
    SwaggerModule.setup(SwaggerUtil.SWAGGER_URL_PATH, app, document);
    app.use(
      SwaggerUtil.SCALAR_URL_PATH,
      // apiReference({ spec: { content: document } }),
    );
  }
}
