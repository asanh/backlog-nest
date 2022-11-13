import { PartialType } from '@nestjs/mapped-types';
import { GameRequestDto } from './game-request.dto';
import {PlaythroughResponseDto} from "../../playthrough/dto/playthrough-response.dto";
import {GenreResponseDto} from "../../genre/dto/genre-response.dto";
import {PlatformResponseDto} from "../../platform/dto/platform-response.dto";

export class GameResponseDto {
    id: number;
    name: string;
    img: string;
    howLongToBeat: string;
    platforms: PlatformResponseDto[];
    developer: string;
    publisher: string;
    releaseDate: string;
    playthrough: PlaythroughResponseDto;
    genres: GenreResponseDto[];
}
