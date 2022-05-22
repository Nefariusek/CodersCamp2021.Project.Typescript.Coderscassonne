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
import { GamePhases } from '../components/NextPhaseButton/NextPhaseButton';
import TileState from '../constants/tileState';
import { JSONData } from '../mocks/mocksTiles';
import Tile, { Rotation } from '../model/Tile';
import rootStore from './RootStore';

import { socket } from '../App';
import WebSocketEvent from '../constants/webSocketEvents';
import WebsocketMessageParser from '../model/websocket/WebSocketMessageParser';
import TilePlacementMessage from '../model/websocket/TilePlacementMessage';

class GameStore {
  turnNumber: number;
  boardState: BoardState[] = [];
  drawPile: Tile[];
  recentlyPlacedTile: Tile | undefined;
  tileInHand: Tile | undefined;
  currentPhase: GamePhases;

  constructor() {
    this.boardState = [{ row: 0, column: 0, state: TileState.ACTIVE }];
    this.turnNumber = 0;
    this.currentPhase = GamePhases.TILE_PLACEMENT;
    this.drawPile = GameModeParser(JSONData);
    this.tileInHand = this.drawPile.shift();
    makeAutoObservable(this);
  }

  placeTile(row: number, column: number, fromWebsocket: boolean) {
    const tileToChange = this.boardState.find((tile) => tile.row === row && tile.column === column);
    console.log(`tile to change: `, tileToChange);
    if (tileToChange && this.tileInHand) {
      if (validateTilePlacement(row, column)) {
        tileToChange.state = TileState.TAKEN;
        tileToChange.tile = this.tileInHand;
        if (!fromWebsocket) {
          const websocketMessageParser = new WebsocketMessageParser();
          const tilePlacementMessage = new TilePlacementMessage('');
          tilePlacementMessage.id = this.tileInHand.id;
          tilePlacementMessage.row = row;
          tilePlacementMessage.column = column;
          tilePlacementMessage.rotation = this.tileInHand.rotation;

          websocketMessageParser.parse(tilePlacementMessage, WebSocketEvent.SEND_TILE_PLACED);

          socket.emit(
            WebSocketEvent.SEND_TILE_PLACED,
            `${this.tileInHand.id}_${row}_${column}_${this.tileInHand.rotation}`,
          );
        }

        extendBoard(row, column);
        activateAdjacentTiles(row, column);
        manageProjects(row, column);
        console.log(rootStore.projectStore.allProjects);

        this.recentlyPlacedTile = this.tileInHand;

        if (fromWebsocket) {
          const indexOfTileInHand = this.drawPile.findIndex((tile) => tile.id === this.tileInHand?.id);
          this.drawPile.splice(indexOfTileInHand, 1);
        }

        this.tileInHand = undefined;
        if (this.boardState.length > 9) {
          !fromWebsocket && this.setNextPhase();
        }
      } else {
        openInvalidMoveModal();
      }
    }
  }

  setTileInHandFromWebSocket(id: string, rotation: Rotation) {
    const tiles = GameModeParser(JSONData);
    const foundTileData = tiles.find((tile) => tile.id === id);

    if (foundTileData) {
      const tileFromWebSocket = new Tile(
        foundTileData.edges,
        foundTileData.middle,
        foundTileData.isSpecial,
        foundTileData.id,
      );
      tileFromWebSocket.setRotation(rotation);
      this.tileInHand = tileFromWebSocket;
      return;
    }
    this.tileInHand = undefined;
  }

  setRotationFromWebSocket(rotation: Rotation) {
    this.tileInHand?.setRotation(rotation);
  }

  setNextPhase(fromWebsocket: boolean = false) {
    if (this.currentPhase === GamePhases.TILE_PLACEMENT) {
      this.currentPhase = GamePhases.MEEPLE_PLACEMENT;
    } else if (this.currentPhase === GamePhases.MEEPLE_PLACEMENT) {
      this.currentPhase = GamePhases.SCORE_PHASE;
    } else if (this.currentPhase === GamePhases.SCORE_PHASE) {
      this.endCurrentTurn();
      this.currentPhase = GamePhases.TILE_PLACEMENT;
    }
    !fromWebsocket && socket.emit(WebSocketEvent.SEND_NEXT_PHASE, true);
  }

  placeMeeple() {
    console.log('placeMeeple');
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
    this.turnNumber = 0;
    this.currentPhase = GamePhases.TILE_PLACEMENT;
    this.drawPile = GameModeParser(JSONData);
    this.tileInHand = this.drawPile.shift();
  }
}

export default GameStore;
