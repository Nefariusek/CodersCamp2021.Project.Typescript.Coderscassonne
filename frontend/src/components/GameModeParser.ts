import Locations from '../constants/locations';
import Tile, { Edges } from '../model/Tile';

type TileType = {
  edges: Edges;
  middle: Locations;
  isSpecial: boolean;
};

const GameModeParser = (jsonData: TileType[]): Tile[] => {
  const tileArray: Tile[] = [];
  jsonData.toString();
  jsonData.forEach((element) => {
    const { edges, middle, isSpecial } = element;
    const tile = new Tile(edges, middle, isSpecial);
    tileArray.push(tile);
  });
  return tileArray;
};

export default GameModeParser;
