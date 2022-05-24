import { Injectable } from '@nestjs/common';
import { tilesData } from '../constants/tilesData';
import _ from 'lodash';
import { shuffleArray } from '../service/shuffleArray'

@Injectable()
export class TilesService {
  getTiles() {
    // const shuffledTiles = _.shuffle(tilesData);
    const shuffledTiles = shuffleArray(tilesData);
    if (!!shuffledTiles) { 
      console.log(shuffledTiles);
      return shuffledTiles;
    }
    return undefined;
    // return tilesData;
  }

  getSingleTile(id: string) {
    const tile = tilesData.find((tile) => tile.id === id);
    return tile;
  }
}
