import { PartialType } from '@nestjs/mapped-types';
import { GameRequestDto } from './game-request.dto';

export class GameResponseDto extends PartialType(GameRequestDto) {}
