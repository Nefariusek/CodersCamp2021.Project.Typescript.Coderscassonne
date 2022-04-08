import Tile, { Edges } from '../model/Tile';

type TileType = {
  edges: Edges;
  placedBy: string;
  placementTurn: number;
};

const GameModeParser = (jsonData: TileType[]): Tile[] => {
  const tileArray: Tile[] = [];
  jsonData.toString();
  jsonData.forEach((element) => {
    const { edges, placedBy, placementTurn } = element;
    const tile = new Tile(edges, placedBy, placementTurn);
    tileArray.push(tile);
  });
  return tileArray;
};

export default GameModeParser;
