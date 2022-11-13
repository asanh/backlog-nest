import { PartialType } from '@nestjs/mapped-types';
import { PlatformRequestDto } from './platform-request.dto';

export class PlatformResponseDto extends PartialType(PlatformRequestDto) {
    id: number;
}
