import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Game} from "./entities/game.entity";
import {Auth} from "../auth/auth.entity";
import {AuthModule} from "../auth/auth.module";

@Module({
  imports: [TypeOrmModule.forFeature([Game, Auth]), AuthModule],
  controllers: [GameController],
  providers: [GameService],
  exports: [TypeOrmModule, GameService]
})
export class GameModule {}
