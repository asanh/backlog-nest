import { Injectable } from '@nestjs/common';
import { PlaythroughRequestDto } from './dto/playthrough-request.dto';
import { PlaythroughResponseDto } from './dto/playthrough-response.dto';

@Injectable()
export class PlaythroughService {
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
