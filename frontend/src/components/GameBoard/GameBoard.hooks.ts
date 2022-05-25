import { useEffect } from 'react';
import WebSocketEvent from '../../constants/webSocketEvents';
import { Rotation } from '../../model/Tile';
import WebsocketMessageParser from '../../model/websocket/WebSocketMessageParser';
import { placeMeeple } from '../../services/meeplePlacementPhase.functions';
import rootStore from '../../stores/RootStore';

export function useTilePlacementReceiver(
  onTilePlacement: (row: number, column: number, fromWebsocket: boolean) => void,
) {
  useEffect(() => {
    rootStore.websocket?.socket.on(
      WebSocketEvent.RECEIVE_TILE_PLACED,
      (data: { tileData: string; clientId: number }) => {
        const websocketMessageParser = new WebsocketMessageParser();
        const { tileData, clientId } = data;
        const { id, row, column, rotation } = websocketMessageParser.parse(
          tileData,
          WebSocketEvent.RECEIVE_TILE_PLACED,
        );

        if (row !== 0 || column !== 0) {
          rootStore.gameStore.setTileInHandFromWebSocket(id, rotation);
          onTilePlacement(row, column, true);
        }

        console.log(
          `Tile with id ${id} rotated ${rotation} degrees is placed in ${row} row and ${column} column by client with id ${clientId}`,
        );
      },
    );
  }, []);
}

export function useMeeplePlacementReceiver() {
  useEffect(() => {
    rootStore.websocket?.socket.on(WebSocketEvent.RECEIVE_MEEPLE_PLACED, (data) => {
      const websocketMessageParser = new WebsocketMessageParser();
      const { id, column, row } = websocketMessageParser.parse(data.text, WebSocketEvent.RECEIVE_MEEPLE_PLACED);
      const container = rootStore.gameStore.boardState.find(
        (container) => container.row === +row && container.column === +column,
      );
      if (container && container.tile) {
        const project = rootStore.projectStore.allProjects.find(
          (project) => project.tiles.includes(container!.tile!) && project.type === id,
        );
        if (project) {
          placeMeeple(project, true);
        }
      }
    });
  }, []);
}

export function useTileRotationReceiver() {
  useEffect(() => {
    rootStore.websocket?.socket.on(
      WebSocketEvent.RECEIVE_TILE_ROTATED,
      (data: { rotation: number; clientId: number }) => {
        const { rotation, clientId } = data;
        const rotationDegree = rotation as Rotation;
        rootStore.gameStore.setRotationFromWebSocket(rotationDegree);
        console.log(`Client with id ${clientId} rotated tile in hand ${rotationDegree} degrees`);
      },
    );
  }, []);
}

export function useNextPhaseReceiver() {
  useEffect(() => {
    rootStore.websocket?.socket.on(
      WebSocketEvent.RECEIVE_NEXT_PHASE,
      (data: { nextPhase: boolean; clientId: number }) => {
        const { nextPhase, clientId } = data;
        nextPhase && rootStore.gameStore.setNextPhase(true);
        console.log(`Client with id ${clientId} moved to the next phase.`);
      },
    );
  }, []);
}
