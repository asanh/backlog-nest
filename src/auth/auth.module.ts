import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {LocalStrategy} from "./strategies/local.strategy";
import {PassportModule} from "@nestjs/passport";
import {UserModule} from "../user/user.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Auth} from "./auth.entity";
import {User} from "../user/entities/user.entity";

@Module({
  imports: [PassportModule, UserModule, TypeOrmModule.forFeature([Auth, User])],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
  exports: [TypeOrmModule, AuthService]
})
export class AuthModule {}
