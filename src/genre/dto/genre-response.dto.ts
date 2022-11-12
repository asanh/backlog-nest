import { PartialType } from '@nestjs/mapped-types';
import { GenreRequestDto } from './genre-request.dto';

export class GenreResponseDto extends PartialType(GenreRequestDto) {
    id: number;
}
