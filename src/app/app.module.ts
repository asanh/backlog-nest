import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import {AuthModule} from "../auth/auth.module";
import {UserModule} from "../user/user.module";
import {Auth} from "../auth/auth.entity";
import {User} from "../user/entities/user.entity";
import {AuthService} from "../auth/auth.service";
import {UserService} from "../user/user.service";
import {Game} from "../game/entities/game.entity";
import {GameService} from "../game/game.service";
import {GameModule} from "../game/game.module";
import {GenreModule} from "../genre/genre.module";
import {Genre} from "../genre/entities/genre.entity";
import {GenreService} from "../genre/genre.service";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule, AuthModule, UserModule, GameModule, GenreModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [Auth, User, Game, Genre],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
    GameModule,
    GenreModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthService, UserService, GameService, GenreService],
})
export class AppModule {}
