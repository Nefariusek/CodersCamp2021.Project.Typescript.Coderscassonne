import _ from 'lodash';
import Locations from '../constants/locations';
import Tile, { Edges } from '../model/Tile';

export interface TileType {
  id: string;
  edges: Edges;
  middle: Locations[];
  isSpecial: boolean;
}

const GameModeParser = (jsonData: TileType[]): Tile[] => {
  const tileArray: Tile[] = [];
  jsonData.toString();
  jsonData.forEach((element) => {
    const { edges, middle, isSpecial, id } = element;
    const tile = new Tile(edges, middle, isSpecial, id);
    tileArray.push(tile);
  });
  return tileArray;
};

export default GameModeParser;
