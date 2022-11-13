import { Injectable } from '@nestjs/common';
import { PlaythroughRequestDto } from './dto/playthrough-request.dto';
import { PlaythroughResponseDto } from './dto/playthrough-response.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Playthrough} from "./entities/playthrough.entity";

@Injectable()
export class PlaythroughService {
  constructor(@InjectRepository(Playthrough) private playthroughRepository: Repository<Playthrough>) {
  }

  async findOneByGameAndUser(gameId: number, userId: number): Promise<Playthrough> {
    return await this.playthroughRepository.findOne({
      where: {
        game: {id: gameId},
        user: {id: userId}
      }
    }
    )
  }

  create(createPlaythroughDto: PlaythroughRequestDto) {
    return 'This action adds a new playthrough';
  }

  findAll() {
    return `This action returns all playthrough`;
  }

  findOne(id: number) {
    return `This action returns a #${id} playthrough`;
  }

  update(id: number, updatePlaythroughDto: PlaythroughResponseDto) {
    return `This action updates a #${id} playthrough`;
  }

  remove(id: number) {
    return `This action removes a #${id} playthrough`;
  }
}
