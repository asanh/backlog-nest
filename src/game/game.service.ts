import { Injectable } from '@nestjs/common';
import { GameRequestDto } from './dto/game-request.dto';
import { GameResponseDto } from './dto/game-response.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Game} from "./entities/game.entity";
import {AuthService} from "../auth/auth.service";
import {PlaythroughService} from "../playthrough/playthrough.service";

@Injectable()
export class GameService {
  constructor(
      @InjectRepository(Game) private gameRepository: Repository<Game>,
      private authService: AuthService,
      private playthroughService: PlaythroughService
  ) {
  }

  async create(data: GameRequestDto) {
    const game = new Game();
    Object.assign(game, data);

    return await this.gameRepository.save(game);
  }

  async findAll(): Promise<GameResponseDto[]> {
    const result = [];
    for (const game of this.authService.user.games) {
      const gameDto = new GameResponseDto();
      const gameWithRelations = await this.findOne(game.id);
      Object.assign(gameDto, gameWithRelations);
      result.push(gameDto);
    }
    return result;
  }

  async findOne(id: number): Promise<GameResponseDto> {
    const result = new GameResponseDto();
    const game = await this.gameRepository.findOne({
      where: {id: id},
      relations: ['genres','platforms']
    });
    Object.assign(result, game);
    result.playthrough = await this.playthroughService.findOneByGameAndUser(
        game.id,
        this.authService.user.id
    );
    return result;
  }

  update(id: number, updateGameDto: GameResponseDto) {
    return `This action updates a #${id} game`;
  }

  remove(id: number) {
    return `This action removes a #${id} game`;
  }
}
