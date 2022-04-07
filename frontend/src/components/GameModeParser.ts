import Tile from '../model/Tile';

const GameModeParser = (jsonData: JSON): Tile[] => {
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
