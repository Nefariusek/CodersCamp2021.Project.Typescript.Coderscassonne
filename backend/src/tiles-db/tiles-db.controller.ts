import { Controller, Get, Param } from '@nestjs/common';

import { TilesDbService } from './tiles-db.service';

@Controller('apidb/tiles')
export class TilesDbController {
  constructor(private readonly tilesDbService: TilesDbService) {}

  @Get()
  async getAllTiles() {
    const tiles = await this.tilesDbService.getTiles();
    return tiles;
  }

  @Get(':id')
  getTile(@Param('id') tileId: string) {
    return this.tilesDbService.getSingleTile(tileId);
  }
}
