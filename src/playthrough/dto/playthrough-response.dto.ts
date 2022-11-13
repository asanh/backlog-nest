import { PartialType } from '@nestjs/mapped-types';
import { PlaythroughRequestDto } from './playthrough-request.dto';

export class PlaythroughResponseDto extends PartialType(PlaythroughRequestDto) {}
