import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlaythroughService } from './playthrough.service';
import { PlaythroughRequestDto } from './dto/playthrough-request.dto';
import { PlaythroughResponseDto } from './dto/playthrough-response.dto';

@Controller('playthrough')
export class PlaythroughController {
  constructor(private readonly playthroughService: PlaythroughService) {}

  @Post()
  create(@Body() createPlaythroughDto: PlaythroughRequestDto) {
    return this.playthroughService.create(createPlaythroughDto);
  }

  @Get()
  findAll() {
    return this.playthroughService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playthroughService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlaythroughDto: PlaythroughResponseDto) {
    return this.playthroughService.update(+id, updatePlaythroughDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.playthroughService.remove(+id);
  }
}
