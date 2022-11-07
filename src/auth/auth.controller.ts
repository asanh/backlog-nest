import {Body, Controller, Post, UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service';
import {UserResponseDto} from "../user/dto/user-response.dto";
import {AuthGuard} from "./guards/auth.guard";
import {UserRequestDto} from "../user/dto/user-request.dto";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('registration')
  async registration(@Body() data: UserRequestDto): Promise<boolean> {
    return await this.authService.registration(data);
  }

  @Post('by-token')
  @UseGuards(AuthGuard)
  async userByToken(@Body() data: { token: string }): Promise<UserResponseDto> {
    return await this.authService.findUserByToken(data.token);
  }
}
