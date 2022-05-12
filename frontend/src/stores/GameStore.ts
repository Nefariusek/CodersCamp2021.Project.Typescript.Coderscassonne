import { makeAutoObservable } from 'mobx';
import { drawnTiles } from '../components/DataStoreContext/DataStoreContext';
import { BoardState } from '../components/GameBoard/GameBoard';
import TileState from '../constants/tileState';
import Tile from '../model/Tile';

class GameStore {
  //tile in Hand
  tileInHand: Tile | undefined;
  // boardState
  initialBoardState: BoardState[] = [];

  constructor() {
    this.initialBoardState = [{ row: 0, column: 0, state: TileState.ACTIVE }];
    this.tileInHand = drawnTiles[0];
    makeAutoObservable(this);
  }
}

export default GameStore;
