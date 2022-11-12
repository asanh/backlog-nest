import { Injectable } from '@nestjs/common';
import { GameRequestDto } from './dto/game-request.dto';
import { GameResponseDto } from './dto/game-response.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Game} from "./entities/game.entity";
import {AuthService} from "../auth/auth.service";

@Injectable()
export class GameService {
  constructor(
      @InjectRepository(Game) private gameRepository: Repository<Game>,
      private authService: AuthService,
  ) {
  }

  async create(data: GameRequestDto) {
    const game = new Game();
    Object.assign(game, data);

    return await this.gameRepository.save(game);
  }

  async findAll() {
    const result = [];
    for (const game of this.authService.user.games) {
      const gameDto = new GameResponseDto();
      const gameWithRelations = await this.findOne(game.id);
      Object.assign(gameDto, gameWithRelations);
      result.push(gameDto);
    }
    return result;
  }

  async findOne(id: number) {
    return await this.gameRepository.findOne({
      where: {id: id},
      relations: ['genres']
    });
  }

  update(id: number, updateGameDto: GameResponseDto) {
    return `This action updates a #${id} game`;
  }

  remove(id: number) {
    return `This action removes a #${id} game`;
  }
}
