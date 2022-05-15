import { makeAutoObservable } from 'mobx';
import { drawnTiles } from '../components/DataStoreContext/DataStoreContext';
import { BoardState } from '../components/GameBoard/GameBoard';
import TileState from '../constants/tileState';
import Tile from '../model/Tile';

class GameStore {
  tileInHand: Tile | undefined;
  turnNumber: number;
  initialBoardState: BoardState[] = [];

  constructor() {
    this.initialBoardState = [{ row: 0, column: 0, state: TileState.ACTIVE }];
    this.tileInHand = drawnTiles[0];
    this.turnNumber = 1;
    makeAutoObservable(this);
  }

  increaseTurnNumber() {
    this.turnNumber++;
  }
}

export default GameStore;
