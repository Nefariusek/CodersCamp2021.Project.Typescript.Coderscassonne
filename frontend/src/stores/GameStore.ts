import { makeAutoObservable } from 'mobx';
import { BoardState } from '../components/GameBoard/GameBoard';
import GameModeParser from '../components/GameModeParser';
import TileState from '../constants/tileState';
import { JSONData } from '../mocks/mocks';
import Tile from '../model/Tile';

export const drawnTiles: Tile[] = GameModeParser(JSONData);
class GameStore {
  tileInHand: Tile | undefined;
  turnNumber: number;
  boardState: BoardState[] = [];

  constructor() {
    this.boardState = [{ row: 0, column: 0, state: TileState.ACTIVE }];
    this.tileInHand = drawnTiles[0];
    this.turnNumber = 1;
    makeAutoObservable(this);
  }

  increaseTurnNumber() {
    this.turnNumber++;
  }

  setTileInHand() {
    this.tileInHand = drawnTiles[this.turnNumber];
  }

  setBoardState(state: BoardState[]) {
    this.boardState = state;
  }
}

export default GameStore;
