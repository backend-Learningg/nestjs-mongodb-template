import { Module, Global } from '@nestjs/common';
import { ConfigService } from './services/config.service';

const providers = [ConfigService];

@Global()
@Module({
  providers,

  exports: [...providers],
})
/**
 * It exports the configService and makes it available for use in the application code.
 */
export class ConfigModule {}
