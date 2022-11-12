import {GenreResponseDto} from "../../genre/dto/genre-response.dto";

export class GameRequestDto {
    name: string;
    img: string;
    genres: GenreResponseDto[];
}
