import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Game} from "./entities/game.entity";
import {Auth} from "../auth/auth.entity";
import {AuthModule} from "../auth/auth.module";
import {PlaythroughModule} from "../playthrough/playthrough.module";

@Module({
  imports: [TypeOrmModule.forFeature([Game, Auth]), AuthModule, PlaythroughModule],
  controllers: [GameController],
  providers: [GameService],
  exports: [TypeOrmModule, GameService]
})
export class GameModule {}
