import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import type { IUser } from '@portfolio/shared';
import { USER_CONSTANTS } from '@portfolio/shared';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('user')
  getUser(): IUser {
    return {
      id: USER_CONSTANTS.USER_ID,
      name: USER_CONSTANTS.USER_NAME,
      email: '',
      password: '',
    };
  }
}
