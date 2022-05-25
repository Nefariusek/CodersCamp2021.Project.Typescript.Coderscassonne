import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tile } from './tile.model';
import { shuffleArray } from '../service/shuffleArray';
@Injectable()
export class TilesDbService {
  constructor(@InjectModel('Tile') private readonly tileModel: Model<Tile>) {}
  async getTiles() {
    let tiles = await this.tileModel.find().exec();
    tiles = shuffleArray(tiles);
    if (!!tiles) {
      return tiles.map((tile) => ({
        id: tile.tileId,
        edges: tile.edges,
        middle: tile.middle,
        isSpecial: tile.isSpecial,
      }));
    }
    return undefined;
  }
  async getSingleTile(id: string) {
    const tile = await this.tileModel.findOne({ tileId: id }).exec();
    return {
      id: tile.tileId,
      edges: tile.edges,
      middle: tile.middle,
      isSpecial: tile.isSpecial,
    };
  }

  private async findTile(id: string): Promise<Tile> {
    let tile;
    try {
      tile = await this.tileModel.find({ tileId: id }).exec();
    } catch (error) {
      throw new NotFoundException('Could not find tile.');
    }
    if (!tile) {
      throw new NotFoundException('Could not find tile.');
    }
    return tile;
  }
}
