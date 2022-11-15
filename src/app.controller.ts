import { Controller, Get, UseFilters } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from './shared/config/services/config.service'
@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly configService: ConfigService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
