import { computed, makeAutoObservable } from 'mobx';
import { BoardState } from '../components/GameBoard/GameBoard';
import {
  activateAdjacentTiles,
  extendBoard,
  manageProjects,
  validateTilePlacement,
} from '../components/GameBoard/GameBoard.functions';
import GameModeParser from '../components/GameModeParser';
import { openInvalidMoveModal } from '../components/Modal/InvalidMoveModal';
import TileState from '../constants/tileState';
import { JSONData } from '../mocks/mocks';
import Tile from '../model/Tile';

class GameStore {
  turnNumber: number;
  boardState: BoardState[] = [];
  drawPile: Tile[];
  recentlyPlacedTile: Tile | undefined;
  tileInHand: Tile | undefined;

  // get tileInHand(): Tile | undefined {
  //   if (this.drawPile.length) {
  //     return this.drawPile[this.turnNumber - 1];
  //   } else {
  //     return;
  //   }
  // }

  constructor() {
    this.boardState = [{ row: 0, column: 0, state: TileState.ACTIVE }];
    this.turnNumber = 1;
    this.drawPile = GameModeParser(JSONData);
    makeAutoObservable(this);
  }

  placeTile(row: number, column: number) {
    const tileToChange = this.boardState.find((tile) => tile.row === row && tile.column === column);
    if (tileToChange && this.tileInHand) {
      if (validateTilePlacement(row, column)) {
        tileToChange.state = TileState.TAKEN;
        tileToChange.tile = this.tileInHand;
        extendBoard(row, column, this.boardState);
        activateAdjacentTiles(row, column, this.boardState);
        manageProjects(row, column, this.boardState);
        setEndOfTurn(true);
      } else {
        openInvalidMoveModal();
      }
    }
  }

  increaseTurnNumber() {
    this.turnNumber++;
  }

  setBoardState(state: BoardState[]) {
    this.boardState = state;
  }
}

export default GameStore;
function setEndOfTurn(arg0: boolean) {
  throw new Error('Function not implemented.');
}
