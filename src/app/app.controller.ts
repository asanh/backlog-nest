import {Controller, Post, Request, UseGuards} from '@nestjs/common';
import { AppService } from './app.service';
import {LocalAuthGuard} from "../auth/guards/local-auth.guard";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('auth/login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() request) {
    return { token: request.user.token };
  }
}
