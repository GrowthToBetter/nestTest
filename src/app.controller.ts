import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getdefault(): string {
    if (this.appService.getHello().name === 'Hello World!') {
      return this.appService.getHello().name;
    } else if (this.appService.getNumber() === 1) {
      return this.appService.getNumber().toString();
    } else {
      return this.appService.getNull();
    }
  }
  @Get('helo')
  getHello(): string {
    return 'Hello World!';
  }
}
