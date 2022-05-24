import { Controller, Get, Param } from '@nestjs/common';

import { TilesService } from './tiles.service';

@Controller('api/tiles')
export class TilesController {
  constructor(private readonly tilesService: TilesService) {}

  @Get()
  async getAllTiles() {
    const tiles = this.tilesService.getTiles();
    return tiles;
  }

  @Get(':id')
  getTile(@Param('id') tileId: string) {
    return this.tilesService.getSingleTile(tileId);
  }
}
