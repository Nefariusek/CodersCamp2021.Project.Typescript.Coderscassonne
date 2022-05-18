import { makeAutoObservable } from 'mobx';
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
import { JSONData } from '../mocks/mocksTiles';
import Tile from '../model/Tile';

class GameStore {
  turnNumber: number;
  boardState: BoardState[] = [];
  drawPile: Tile[];
  recentlyPlacedTile: Tile | undefined;
  tileInHand: Tile | undefined;

  constructor() {
    this.boardState = [{ row: 0, column: 0, state: TileState.ACTIVE }];
    this.turnNumber = 0;
    this.drawPile = GameModeParser(JSONData);
    this.tileInHand = this.drawPile.shift();
    makeAutoObservable(this);
  }

  placeTile(row: number, column: number) {
    const tileToChange = this.boardState.find((tile) => tile.row === row && tile.column === column);
    console.log(`tile to change: `, tileToChange);
    if (tileToChange && this.tileInHand) {
      if (validateTilePlacement(row, column)) {
        tileToChange.state = TileState.TAKEN;
        tileToChange.tile = this.tileInHand;
        extendBoard(row, column);
        console.log(`extend board `, this.boardState);
        activateAdjacentTiles(row, column);

        manageProjects(row, column);
        this.recentlyPlacedTile = this.tileInHand;
        this.tileInHand = undefined;
      } else {
        openInvalidMoveModal();
      }
    }
  }

  increaseTurnNumber() {
    this.turnNumber++;
  }

  endCurrentTurn() {
    this.increaseTurnNumber();
    this.recentlyPlacedTile = undefined;
    this.tileInHand = this.drawPile.shift();
  }

  initGameStore() {
    console.log('initGameStore');
    this.boardState.length = 0;
    this.boardState.push({ row: 0, column: 0, state: TileState.ACTIVE });
    this.tileInHand = GameModeParser(JSONData)[0];
    this.turnNumber = 0;
    this.drawPile = GameModeParser(JSONData);
  }
}

export default GameStore;
