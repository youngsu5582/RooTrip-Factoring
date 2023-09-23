import { INestApplication } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { readFileSync } from 'fs';
import { join } from 'path';
export async function useSwagger(app: INestApplication) {
  const swaggerConfig = readFileSync(
    join(join(process.cwd(), '/bin/swagger.json')),
    'utf-8',
  );
  const swaggerDocument = JSON.parse(swaggerConfig);
  SwaggerModule.setup('/api-docs', app, swaggerDocument);
}
