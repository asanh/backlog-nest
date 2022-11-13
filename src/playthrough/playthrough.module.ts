import { Module } from '@nestjs/common';
import { PlaythroughService } from './playthrough.service';
import { PlaythroughController } from './playthrough.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Playthrough} from "./entities/playthrough.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Playthrough])],
  controllers: [PlaythroughController],
  providers: [PlaythroughService],
  exports: [TypeOrmModule, PlaythroughService]
})
export class PlaythroughModule {}
