import { useEffect } from 'react';

import { Rotation } from '../../model/Tile';
import rootStore from '../../stores/RootStore';
import WebSocketEvent from '../../constants/webSocketEvents';
import WebsocketMessageParser from '../../model/websocket/WebSocketMessageParser';

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
      console.log(data);
    });

    //// POWYŻSZE MOŻNA ZAMIENIĆ NA TO (uwzględnia przesyłanie informacji o id, row i kolumnie położonego meepla)
    //// ale trzeba dopisać w GameBoard.tsx funkcję onMeeplPlacement(row: number, column: number, fromWebsocket: boolean) na wzór onTilePlacement()
    // rootStore.websocket?.socket.on(
    //   WebSocketEvent.RECEIVE_MEEPLE_PLACED,
    //   (data: { client: number, text: string }) => {
    //     const websocketMessageParser = new WebsocketMessageParser();
    //     const { text, client } = data;
    //     const { id, row, column } = websocketMessageParser.parse(
    //       text,
    //       WebSocketEvent.RECEIVE_MEEPLE_PLACED,
    //     );

    //     if (row !== 0 || column !== 0) {
    //       onMeeplePlacement(row, column, true);   // czy mamy analogiczną do onTilePlacement() potrzebną tutaj funkcję onMeeplPlacement(row: number, column: number, fromWebsocket: boolean) ?
    //     }

    //     console.log(
    //       `Meeple with id ${id} is placed in ${row} row and ${column} column by client with id ${client}`,
    //     );
    //   },
    // );
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
