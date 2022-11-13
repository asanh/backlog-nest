import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlatformService } from './platform.service';
import { PlatformRequestDto } from './dto/platform-request.dto';
import { PlatformResponseDto } from './dto/platform-response.dto';

@Controller('platform')
export class PlatformController {
  constructor(private readonly platformService: PlatformService) {}

  @Post()
  create(@Body() createPlatformDto: PlatformRequestDto) {
    return this.platformService.create(createPlatformDto);
  }

  @Get()
  findAll() {
    return this.platformService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.platformService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlatformDto: PlatformResponseDto) {
    return this.platformService.update(+id, updatePlatformDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.platformService.remove(+id);
  }
}
