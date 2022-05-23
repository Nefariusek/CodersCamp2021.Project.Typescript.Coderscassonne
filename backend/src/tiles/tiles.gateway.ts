import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

import { Socket } from 'socket.io';
import WebSocketEvent from '../constants/webSocketEvents';

@WebSocketGateway(5001, { cors: true })
export class TilesGateway {
  @SubscribeMessage(WebSocketEvent.SEND_TILE_PLACED)
  handleTilePlacementMessage(client: Socket, tileData: string): void {
    const message = { tileData: tileData, clientId: client.id };
    client.broadcast.emit(WebSocketEvent.RECEIVE_TILE_PLACED, message);
  }

  @SubscribeMessage(WebSocketEvent.SEND_TILE_ROTATED)
  handleTileInHandRotated(client: Socket, rotation: number): void {
    const message = { rotation: rotation, clientId: client.id };
    client.broadcast.emit(WebSocketEvent.RECEIVE_TILE_ROTATED, message);
  }
}
