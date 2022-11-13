import { Injectable } from '@nestjs/common';
import { PlatformRequestDto } from './dto/platform-request.dto';
import { PlatformResponseDto } from './dto/platform-response.dto';

@Injectable()
export class PlatformService {
  create(createPlatformDto: PlatformRequestDto) {
    return 'This action adds a new platform';
  }

  findAll() {
    return `This action returns all platform`;
  }

  findOne(id: number) {
    return `This action returns a #${id} platform`;
  }

  update(id: number, updatePlatformDto: PlatformResponseDto) {
    return `This action updates a #${id} platform`;
  }

  remove(id: number) {
    return `This action removes a #${id} platform`;
  }
}
