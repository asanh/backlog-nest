import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import { Strategy } from 'passport-local';
import {AuthService} from "../auth.service";
import {AuthResponseDto} from "../dto/auth-response.dto";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(
        private authService: AuthService
    ) {
        super({ usernameField: 'email' });
    }

    async validate(email: string, password: string): Promise<AuthResponseDto> {
        const userId = await this.authService.validateUser(email, password);

        if (!userId) {
            throw new HttpException('Incorrect credentials', HttpStatus.UNAUTHORIZED);
        }

        return await this.authService.auth(userId);
    }
}