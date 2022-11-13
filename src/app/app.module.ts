import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
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
import {Platform} from "../platform/entities/platform.entity";
import {PlatformModule} from "../platform/platform.module";
import {PlatformService} from "../platform/platform.service";
import {PlaythroughModule} from "../playthrough/playthrough.module";
import {Playthrough} from "../playthrough/entities/playthrough.entity";
import {PlaythroughService} from "../playthrough/playthrough.service";

@Module({
    imports: [
        ConfigModule.forRoot({isGlobal: true}),
        TypeOrmModule.forRootAsync({
            imports: [
                ConfigModule,
                AuthModule,
                UserModule,
                GameModule,
                GenreModule,
                PlaythroughModule
            ],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get('DB_HOST'),
                port: +configService.get<number>('DB_PORT'),
                username: configService.get('DB_USERNAME'),
                password: configService.get('DB_PASSWORD'),
                database: configService.get('DB_NAME'),
                entities: [
                    Auth,
                    User,
                    Game,
                    Genre,
                    Platform,
                    Playthrough
                ],
                synchronize: true,
            }),
            inject: [ConfigService],
        }),
        UserModule,
        AuthModule,
        GameModule,
        GenreModule,
        PlatformModule,
        PlaythroughModule
    ],
    controllers: [AppController],
    providers: [
        AppService,
        AuthService,
        UserService,
        GameService,
        GenreService,
        PlatformService,
        PlaythroughService
    ],
})
export class AppModule {
}
