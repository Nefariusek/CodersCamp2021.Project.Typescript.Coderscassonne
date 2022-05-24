import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

import { Socket } from 'socket.io';
import WebSocketEvent from '../constants/webSocketEvents';

@WebSocketGateway(5001, { cors: true })
export class TilesGateway {
  @SubscribeMessage(WebSocketEvent.SEND_TILE_PLACED)
  handleTilePlacementMessage(
    client: Socket,
    rec: { room: string; tileData: string },
  ): void {
    const message = { tileData: rec.tileData, clientId: client.id };
    client.to(rec.room).emit(WebSocketEvent.RECEIVE_TILE_PLACED, message);
  }

  @SubscribeMessage(WebSocketEvent.SEND_TILE_ROTATED)
  handleTileInHandRotated(
    client: Socket,
    rec: { room: string; rotation: number },
  ): void {
    const message = { rotation: rec.rotation, clientId: client.id };
    client.to(rec.room).emit(WebSocketEvent.RECEIVE_TILE_ROTATED, message);
  }
}
