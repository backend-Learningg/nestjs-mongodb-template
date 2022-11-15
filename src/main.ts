import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import hpp from 'hpp';
import xss from 'xss-clean';
import * as Sentry from '@sentry/node';
import { ConfigService } from './shared/config/services/config.service';
import { setupSwagger } from './setup-swagger';
import { ValidationPipe } from './shared/pipe/validation.pipe';

/**
 * function for bootstraping the nest application
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });
  app.useGlobalPipes(new ValidationPipe()); //setting up server side validation
  const configService = app.get<ConfigService>(ConfigService);
  Sentry.init({
    dsn: configService.get('SENTRY_DSN'),
  });
  app.setGlobalPrefix('api');
  app.use(helmet());
  app.use(hpp());
  app.use(xss());
  app.enableCors({
    origin: '*',
    methods: 'GET, PUT, POST, DELETE, PATCH',
    allowedHeaders: 'Content-Type, Authorization',
  });

  if (['development', 'staging'].includes(configService.nodeEnv)) {
    setupSwagger(app);
  }

  const port = configService.get('PORT');
  await app.listen(port);
  console.info(`server running on port ${port}`);
}

bootstrap();
