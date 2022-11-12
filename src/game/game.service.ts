import { Injectable } from '@nestjs/common';
import { GameRequestDto } from './dto/game-request.dto';
import { GameResponseDto } from './dto/game-response.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Game} from "./entities/game.entity";
import {AuthService} from "../auth/auth.service";
import {User} from "../../dist/user/user.entity";

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
    return this.authService.user.games.map(game => {
      const result = new GameResponseDto();
      Object.assign(result, game);
      return result;
    });
  }

  async findOne(id: number) {
    return await this.gameRepository.findOneBy({ id: id });
  }

  update(id: number, updateGameDto: GameResponseDto) {
    return `This action updates a #${id} game`;
  }

  remove(id: number) {
    return `This action removes a #${id} game`;
  }
}
