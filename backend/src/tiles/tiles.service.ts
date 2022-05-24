import { Injectable } from '@nestjs/common';
import { tilesData } from '../constants/tilesData';
// import _ from 'lodash';

@Injectable()
export class TilesService {
  getTiles() {
    return tilesData;
  }

  getSingleTile(id: string) {
    const tile = tilesData.find((tile) => tile.id === id);
    return tile;
  }
}
