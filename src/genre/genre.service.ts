import { Injectable } from '@nestjs/common';
import { GenreRequestDto } from './dto/genre-request.dto';
import { GenreResponseDto } from './dto/genre-response.dto';

@Injectable()
export class GenreService {
  create(createGenreDto: GenreRequestDto) {
    return 'This action adds a new genre';
  }

  findAll() {
    return `This action returns all genre`;
  }

  findOne(id: number) {
    return `This action returns a #${id} genre`;
  }

  update(id: number, updateGenreDto: GenreResponseDto) {
    return `This action updates a #${id} genre`;
  }

  remove(id: number) {
    return `This action removes a #${id} genre`;
  }
}
