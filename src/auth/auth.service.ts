import {Injectable, UnauthorizedException} from '@nestjs/common';
import {User} from "../user/entities/user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Auth} from "./auth.entity";
import {Repository} from "typeorm";
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import {AuthResponseDto} from "./dto/auth-response.dto";
import {UserService} from "../user/user.service";
import {UserRequestDto} from "../user/dto/user-request.dto";
import {UserResponseDto} from "../user/dto/user-response.dto";

@Injectable()
export class AuthService {
    user: User;

    constructor(
        private userService: UserService,
        @InjectRepository(Auth) private authRepository: Repository<Auth>,
    ) {
    }

    async registration(data: UserRequestDto): Promise<boolean> {
        const user = await this.userService.create(data);
        if (user.id) {
            return true;
        }
    }

    async findOne(token: string): Promise<Auth> {
        return await this.authRepository.findOne({
            where: { token: token },
            relations: ['user']
        });
    }

    async findUserByToken(token: string): Promise<UserResponseDto> {
        const auth = await this.findOne(token);
        const user = await this.userService.findOneWithoutRelations(auth.user.id);
        delete user.password;
        return user;
    }

    async putOne(token: string, data: Auth): Promise<Auth> {
        const auth = await this.findOne(token);
        if (auth) {
            await this.authRepository.update(auth.id, data);
            return await this.findOne(token);
        }
        return null;
    }

    async deleteOne(token: string) {
        return await this.authRepository.remove(await this.findOne(token));
    }

    async validateUser(email: string, password: string): Promise<number> {
        const user = await this.userService.findOneByEmail(email);
        if (user && await bcrypt.compare(password, user.password)) {
            return user.id;
        }

        return null;
    }

    async auth(userId: number): Promise<AuthResponseDto> {
        const auth = new Auth();
        auth.user = await this.userService.findOne(userId);
        auth.date = new Date().toDateString();
        auth.token = crypto.randomBytes(20).toString('hex');

        const {token, user} = await this.authRepository.save(auth);
        return { token: token, user: user };
    }

    async validateToken(token: string): Promise<boolean> {
        const auth = await this.findOne(token);
        if (auth) {
            const datesDiff = new Date().getTime() - new Date(auth.date).getTime();
            const daysSinceLastUsed = Math.ceil(datesDiff / (1000 * 3600 *  24));

            if (daysSinceLastUsed < 14) {
                auth.date = new Date().toDateString();
                await this.putOne(token, auth);

                this.user = await this.userService.findOne(auth.user.id);

                return true;
            } else {
                await this.deleteOne(token);
            }
            throw new UnauthorizedException();
        }
    }
}