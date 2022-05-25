import { Injectable } from '@nestjs/common';
import { tilesData } from '../constants/tilesData';
import { shuffleArray } from '../service/shuffleArray';

@Injectable()
export class TilesService {
  getTiles() {
    let tiles = tilesData;
    tiles = shuffleArray(tilesData);
    if (!!tiles) {
      return tiles;
    }
    return undefined;
  }

  getSingleTile(id: string) {
    const tile = tilesData.find((tile) => tile.id === id);
    return tile;
  }
}
